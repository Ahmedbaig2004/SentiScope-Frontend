import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  closed: 'bg-red-100 text-red-700',
};

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isAnalyticsMode = location.pathname === '/surveys/analytics';

  useEffect(() => {
    api.get('/surveys')
      .then((res) => {
        let data = res.data.surveys;
        if (isAnalyticsMode) {
          data = data.filter(s => s.status !== 'draft');
        }
        setSurveys(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAnalyticsMode]);

  const handleCreate = async () => {
    try {
      const res = await api.post('/surveys', { title: 'Untitled Survey' });
      navigate(`/surveys/${res.data.survey._id}/edit`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this survey?')) return;
    try {
      await api.delete(`/surveys/${id}`);
      setSurveys(surveys.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.patch(`/surveys/${id}/status`, { status });
      setSurveys(surveys.map((s) => (s._id === id ? res.data.survey : s)));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-violet-950 tracking-tighter uppercase italic">
          {isAnalyticsMode ? 'Survey Analytics' : 'My Surveys'}
        </h1>
        {!isAnalyticsMode && (
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto bg-violet-600 text-white px-6 py-3 rounded-2xl hover:bg-violet-700 text-xs font-black uppercase tracking-widest cursor-pointer shadow-xl shadow-violet-900/30 transition-all active:scale-95"
          >
            + New Survey
          </button>
        )}
      </div>

      {surveys.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl rounded-[40px] border border-violet-400/20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)]" />
          <p className="text-violet-800 mb-4 font-black uppercase tracking-[0.3em] opacity-70 relative z-10">No surveys yet</p>
          <button
            onClick={handleCreate}
            className="text-violet-950 hover:text-violet-700 underline text-sm cursor-pointer font-black tracking-tight relative z-10"
          >
            Create your first survey
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {surveys.map((survey) => (
            <div
              key={survey._id}
              className="bg-gradient-to-r from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] sm:rounded-3xl border border-violet-400/20 shadow-xl hover:border-violet-500 hover:shadow-2xl transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="flex-1 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={`/surveys/${survey._id}/edit`}
                    className="text-xl font-black text-violet-950 hover:text-violet-700 transition-colors tracking-tight uppercase italic"
                  >
                    {survey.title}
                  </Link>
                  <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest shadow-sm ${statusColors[survey.status]}`}>
                    {survey.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-violet-900 font-bold mt-2 opacity-80">
                  {survey.questions.length} questions &middot; {survey.responseCount} responses &middot;{' '}
                  {new Date(survey.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 relative z-10">
                {isAnalyticsMode ? (
                  <Link
                    to={`/surveys/${survey._id}/analytics`}
                    className="w-full sm:w-auto text-center text-xs px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-900/30 transition-all font-black uppercase tracking-widest"
                  >
                    View Insights
                  </Link>
                ) : (
                  <>
                    {survey.status === 'draft' && (
                      <button
                        onClick={() => handleStatusChange(survey._id, 'active')}
                        className="text-[10px] px-4 py-2.5 bg-green-500/20 text-green-900 border border-green-500/20 rounded-xl hover:bg-green-500/30 cursor-pointer font-black uppercase tracking-widest transition-colors"
                      >
                        Publish
                      </button>
                    )}
                    {survey.status === 'active' && (
                      <>
                        <button
                          onClick={() => {
                            const url = `${window.location.origin}/survey/${survey._id}`;
                            navigator.clipboard.writeText(url);
                            alert('Link copied!');
                          }}
                          className="text-[10px] px-4 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 cursor-pointer font-black uppercase tracking-widest shadow-lg shadow-violet-900/30 transition-all"
                        >
                          Share
                        </button>
                        <button
                          onClick={() => handleStatusChange(survey._id, 'closed')}
                          className="text-[10px] px-4 py-2.5 bg-red-500/20 text-red-900 border border-red-500/20 rounded-xl hover:bg-red-500/30 cursor-pointer font-black uppercase tracking-widest transition-colors"
                        >
                          Close
                        </button>
                      </>
                    )}
                    <Link
                      to={`/surveys/${survey._id}/analytics`}
                      className="text-[10px] px-4 py-2.5 bg-white/40 text-violet-950 rounded-xl hover:bg-white/60 font-black uppercase tracking-widest border border-white/20 transition-colors"
                    >
                      Analytics
                    </Link>
                    <Link
                      to={`/surveys/${survey._id}/edit`}
                      className="text-[10px] px-4 py-2.5 bg-white/40 text-violet-950 rounded-xl hover:bg-white/60 font-black uppercase tracking-widest border border-white/20 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(survey._id)}
                      className="text-[10px] px-4 py-2.5 text-red-600 hover:bg-red-500/10 rounded-xl cursor-pointer font-black uppercase tracking-widest transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
