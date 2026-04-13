import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    api.get('/surveys')
      .then((res) => setSurveys(res.data.surveys))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium cursor-pointer"
        >
          + New Survey
        </button>
      </div>

      {surveys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 mb-4">No surveys yet</p>
          <button
            onClick={handleCreate}
            className="text-indigo-600 hover:underline text-sm cursor-pointer"
          >
            Create your first survey
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {surveys.map((survey) => (
            <div
              key={survey._id}
              className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/surveys/${survey._id}/edit`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {survey.title}
                  </Link>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[survey.status]}`}>
                    {survey.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {survey.questions.length} questions &middot; {survey.responseCount} responses &middot;{' '}
                  {new Date(survey.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {survey.status === 'draft' && (
                  <button
                    onClick={() => handleStatusChange(survey._id, 'active')}
                    className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 cursor-pointer"
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
                      className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer"
                    >
                      Share Link
                    </button>
                    <button
                      onClick={() => handleStatusChange(survey._id, 'closed')}
                      className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 cursor-pointer"
                    >
                      Close
                    </button>
                  </>
                )}
                <Link
                  to={`/surveys/${survey._id}/analytics`}
                  className="text-xs px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  Analytics
                </Link>
                <Link
                  to={`/surveys/${survey._id}/edit`}
                  className="text-xs px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(survey._id)}
                  className="text-xs px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
