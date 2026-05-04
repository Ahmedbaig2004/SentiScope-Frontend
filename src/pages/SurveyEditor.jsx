import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import QuestionTypeSelector from '../components/builder/QuestionTypeSelector';
import QuestionEditor from '../components/builder/QuestionEditor';
import SurveySettings from '../components/builder/SurveySettings';

const defaultQuestion = (type, order) => {
  const base = { type, text: '', required: false, order };
  if (type === 'mcq') return { ...base, options: ['Option 1', 'Option 2'] };
  if (type === 'rating') return { ...base, maxRating: 5 };
  if (type === 'nps') return { ...base, npsLabels: { low: 'Not likely', high: 'Extremely likely' } };
  return base;
};

export default function SurveyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error' | null
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    api.get(`/surveys/${id}`)
      .then((res) => setSurvey(res.data.survey))
      .catch(() => navigate('/surveys'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      await api.put(`/surveys/${id}`, {
        title: survey.title,
        description: survey.description,
        questions: survey.questions,
        settings: survey.settings,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      setSaveStatus('error');
      console.error('Save failed:', err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = (type) => {
    const newQ = defaultQuestion(type, survey.questions.length);
    setSurvey({ ...survey, questions: [...survey.questions, newQ] });
  };

  const updateQuestion = (index, updated) => {
    const questions = [...survey.questions];
    questions[index] = updated;
    setSurvey({ ...survey, questions });
  };

  const deleteQuestion = (index) => {
    const questions = survey.questions
      .filter((_, i) => i !== index)
      .map((q, i) => ({ ...q, order: i }));
    setSurvey({ ...survey, questions });
  };

  const moveQuestion = (index, direction) => {
    const questions = [...survey.questions];
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    [questions[index], questions[target]] = [questions[target], questions[index]];
    questions.forEach((q, i) => (q.order = i));
    setSurvey({ ...survey, questions });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!survey) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-0 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 bg-white/20 p-6 rounded-[32px] border border-white/20 backdrop-blur-md lg:bg-transparent lg:p-0 lg:border-none lg:backdrop-blur-none">
        <button
          onClick={() => navigate('/surveys')}
          className="group flex items-center gap-2 text-sm font-black text-violet-800 hover:text-violet-950 transition-all cursor-pointer uppercase tracking-widest opacity-70"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back <span className="hidden xs:inline">to surveys</span>
        </button>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {saveStatus === 'saved' && (
            <span className="text-xs text-green-600 font-black uppercase tracking-widest animate-pulse mr-auto sm:mr-0">Saved!</span>
          )}
          {saveStatus === 'error' && (
            <span className="text-xs text-red-500 font-black uppercase tracking-widest mr-auto sm:mr-0">Save failed</span>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex-1 sm:flex-none text-[10px] sm:text-xs px-4 sm:px-5 py-3 sm:py-2.5 bg-white/40 text-violet-900 rounded-xl hover:bg-white/60 transition-all font-black uppercase tracking-widest border border-white/20 shadow-sm cursor-pointer"
          >
            Settings
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-[2] sm:flex-none text-[10px] sm:text-xs px-5 sm:px-6 py-3 sm:py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 transition-all font-black uppercase tracking-widest shadow-lg shadow-violet-900/30 border-none cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Title & Description Container */}
      <div className="bg-gradient-to-br from-violet-100/90 via-violet-200/80 to-violet-300/70 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] sm:rounded-3xl border border-violet-400/20 shadow-xl mb-8 group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <input
          type="text"
          value={survey.title}
          onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
          className="w-full text-2xl sm:text-4xl font-black text-violet-950 border-none focus:outline-none bg-transparent tracking-tighter placeholder:text-violet-300"
          placeholder="Survey title..."
        />
        <textarea
          rows={1}
          value={survey.description || ''}
          onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
          className="w-full text-md sm:text-lg font-bold text-violet-800 border-none focus:outline-none bg-transparent mt-3 placeholder:text-violet-300 resize-none opacity-80"
          placeholder="Add a compelling description for your respondents..."
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="mb-6">
          <SurveySettings
            settings={survey.settings}
            onChange={(settings) => setSurvey({ ...survey, settings })}
          />
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-4 mb-6">
        {survey.questions.map((q, i) => (
          <QuestionEditor
            key={q._id || i}
            question={q}
            index={i}
            onChange={updateQuestion}
            onDelete={deleteQuestion}
            onMoveUp={() => moveQuestion(i, -1)}
            onMoveDown={() => moveQuestion(i, 1)}
            isFirst={i === 0}
            isLast={i === survey.questions.length - 1}
          />
        ))}
      </div>

      {/* Add question */}
      <div className="bg-white/30 backdrop-blur-md border-2 border-dashed border-violet-400/30 rounded-3xl p-10 transition-all hover:bg-white/40 group/add">
        <p className="text-xs font-black text-violet-800 mb-6 text-center uppercase tracking-[0.3em] opacity-60 group-hover/add:opacity-100 transition-opacity">
          Add a new question
        </p>
        <QuestionTypeSelector onSelect={addQuestion} />
      </div>
    </div>
  );
}
