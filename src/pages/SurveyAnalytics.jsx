import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import MCQChart from '../components/analytics/MCQChart';
import RatingChart from '../components/analytics/RatingChart';
import NPSChart from '../components/analytics/NPSChart';
import SentimentChart from '../components/analytics/SentimentChart';

// Frontend mirror of the Strategy pattern:
// Maps question type -> correct chart component
const chartComponents = {
  mcq: MCQChart,
  rating: RatingChart,
  nps: NPSChart,
  text: SentimentChart,
};

const typeLabels = {
  mcq: 'Multiple Choice',
  rating: 'Rating',
  nps: 'Net Promoter Score',
  text: 'Text',
};

export default function SurveyAnalytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/analytics/survey/${id}`)
      .then((res) => setAnalytics(res.data))
      .catch(() => navigate('/surveys'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-0 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 bg-white/20 p-6 rounded-[32px] border border-white/20 backdrop-blur-md lg:bg-transparent lg:p-0 lg:border-none lg:backdrop-blur-none">
        <div>
          <button
            onClick={() => navigate('/surveys')}
            className="group flex items-center gap-2 text-sm font-black text-violet-800 hover:text-violet-950 transition-all cursor-pointer uppercase tracking-widest opacity-70 mb-3"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back <span className="hidden xs:inline">to surveys</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-black text-violet-950 tracking-tighter uppercase italic break-words">{analytics.surveyTitle}</h1>
        </div>
        <Link
          to={`/surveys/${id}/edit`}
          className="w-full sm:w-auto text-center text-[10px] sm:text-xs px-6 py-3 sm:py-2.5 bg-white/40 text-violet-900 rounded-xl hover:bg-white/60 transition-all font-black uppercase tracking-widest border border-white/20 shadow-sm"
        >
          Edit Survey
        </Link>
      </div>

      {/* Summary card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <p className="text-4xl font-black text-violet-950 tracking-tight">{analytics.totalResponses}</p>
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70 mt-2">Total Responses</p>
        </div>
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <p className="text-4xl font-black text-violet-800 tracking-tight">{analytics.questions.length}</p>
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70 mt-2">Questions Analysed</p>
        </div>
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl p-6 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
          <div className="mb-2">
            <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-md ${
              analytics.surveyStatus === 'active' ? 'bg-green-600 text-white' :
              analytics.surveyStatus === 'closed' ? 'bg-red-600 text-white' :
              'bg-violet-600 text-white'
            }`}>
              {analytics.surveyStatus}
            </span>
          </div>
          <p className="text-[10px] text-violet-900 font-black uppercase tracking-[0.2em] opacity-70 mt-4">Current Status</p>
        </div>
      </div>

      {/* Per-question analytics */}
      {analytics.totalResponses === 0 ? (
        <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl rounded-3xl border border-violet-400/20 p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
          <p className="text-6xl mb-6 animate-bounce">📭</p>
          <p className="text-xl font-black text-violet-950 uppercase tracking-tighter mb-2">No responses captured yet</p>
          <p className="text-violet-800 font-bold opacity-70 mb-8">Share your survey to start collecting and analyzing data.</p>
          {analytics.surveyStatus === 'active' && (
            <button
              onClick={() => {
                const url = `${window.location.origin}/survey/${id}`;
                navigator.clipboard.writeText(url);
                alert('Link copied!');
              }}
              className="text-xs px-8 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all font-black uppercase tracking-[0.2em] shadow-lg shadow-violet-900/30 border-none cursor-pointer"
            >
              Copy Public Share Link
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {analytics.questions.map((q, i) => {
            const ChartComponent = chartComponents[q.questionType];
            return (
              <div key={q.questionId} className="bg-gradient-to-br from-violet-50/95 via-white/90 to-violet-100/80 backdrop-blur-xl rounded-3xl border border-violet-400/20 p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />
                <div className="flex items-start justify-between mb-8 border-b border-violet-200/50 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black text-violet-800 opacity-60 uppercase tracking-[0.2em]">Q{i + 1}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-lg bg-violet-600 text-white font-black uppercase tracking-widest shadow-md">
                        {typeLabels[q.questionType]}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-violet-950 tracking-tight">{q.questionText}</h3>
                  </div>
                </div>
                <div className="bg-white/40 rounded-2xl p-6 border border-white/20">
                  {ChartComponent ? (
                    <ChartComponent {...q} />
                  ) : (
                    <p className="text-sm font-bold text-violet-400 italic text-center py-4">No visualization available for this metric.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
