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
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    api.get(`/surveys/${id}`)
      .then((res) => setSurvey(res.data.survey))
      .catch(() => navigate('/surveys'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/surveys/${id}`, {
        title: survey.title,
        description: survey.description,
        questions: survey.questions,
        settings: survey.settings,
      });
      setSurvey(res.data.survey);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save');
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
    const questions = survey.questions.filter((_, i) => i !== index)
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

  if (loading || !survey) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/surveys')}
          className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          &larr; Back to surveys
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            Settings
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer font-medium"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <input
          type="text"
          value={survey.title}
          onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
          className="w-full text-2xl font-bold text-gray-900 border-none focus:outline-none bg-transparent"
          placeholder="Survey title..."
        />
        <input
          type="text"
          value={survey.description}
          onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
          className="w-full text-sm text-gray-500 border-none focus:outline-none bg-transparent mt-1"
          placeholder="Add a description..."
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
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-500 mb-3 text-center">Add a question</p>
        <QuestionTypeSelector onSelect={addQuestion} />
      </div>
    </div>
  );
}
