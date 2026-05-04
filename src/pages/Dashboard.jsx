import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/surveys')
      .then((res) => setSurveys(res.data.surveys))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalResponses = surveys.reduce((sum, s) => sum + (s.responseCount || 0), 0);
  const activeSurveys = surveys.filter((s) => s.status === 'active').length;
  const recentSurveys = surveys.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-violet-950 mb-6">
        Welcome back, {user?.name}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70">Total Surveys</p>
          <p className="text-4xl font-black text-violet-950 mt-2 tracking-tight">
            {loading ? '—' : surveys.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70">Total Responses</p>
          <p className="text-4xl font-black text-violet-800 mt-2 tracking-tight">
            {loading ? '—' : totalResponses}
          </p>
        </div>
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70">Active Surveys</p>
          <p className="text-4xl font-black text-indigo-800 mt-2 tracking-tight">
            {loading ? '—' : activeSurveys}
          </p>
        </div>
      </div>

      {/* Recent surveys */}
      <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl rounded-3xl border border-violet-400/20 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-violet-950">Recent Surveys</h2>
          <Link to="/surveys" className="text-sm text-violet-700 hover:text-violet-900 hover:underline">View all</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-600"></div>
          </div>
        ) : recentSurveys.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-violet-800 mb-3">No surveys yet.</p>
            <Link to="/templates" className="text-sm text-violet-600 hover:underline">
              Start from a template
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentSurveys.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <Link to={`/surveys/${s._id}/edit`} className="text-sm font-medium text-gray-900 hover:text-violet-600">
                    {s.title}
                  </Link>
                  <p className="text-xs text-gray-400">{s.responseCount} responses</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.status === 'active' ? 'bg-green-100 text-green-700' :
                    s.status === 'closed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {s.status}
                  </span>
                  <Link to={`/surveys/${s._id}/analytics`} className="text-xs text-violet-600 hover:underline">
                    Analytics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
