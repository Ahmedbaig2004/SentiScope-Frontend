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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate('/surveys')}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer mb-1"
          >
            &larr; Back to surveys
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{analytics.surveyTitle}</h1>
        </div>
        <Link
          to={`/surveys/${id}/edit`}
          className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Edit Survey
        </Link>
      </div>

      {/* Summary card */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center">
          <p className="text-3xl font-bold text-indigo-600">{analytics.totalResponses}</p>
          <p className="text-sm text-gray-500 mt-1">Total Responses</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center">
          <p className="text-3xl font-bold text-gray-900">{analytics.questions.length}</p>
          <p className="text-sm text-gray-500 mt-1">Questions</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 text-center">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            analytics.surveyStatus === 'active' ? 'bg-green-100 text-green-700' :
            analytics.surveyStatus === 'closed' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {analytics.surveyStatus}
          </span>
          <p className="text-sm text-gray-500 mt-2">Status</p>
        </div>
      </div>

      {/* Per-question analytics */}
      {analytics.totalResponses === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">No responses yet. Share your survey to start collecting data.</p>
          {analytics.surveyStatus === 'active' && (
            <button
              onClick={() => {
                const url = `${window.location.origin}/survey/${id}`;
                navigator.clipboard.writeText(url);
                alert('Link copied!');
              }}
              className="mt-4 text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              Copy Share Link
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {analytics.questions.map((q, i) => {
            const ChartComponent = chartComponents[q.questionType];
            return (
              <div key={q.questionId} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Q{i + 1} &middot; {typeLabels[q.questionType]}
                    </p>
                    <p className="font-medium text-gray-900">{q.questionText}</p>
                  </div>
                </div>
                {ChartComponent ? (
                  <ChartComponent {...q} />
                ) : (
                  <p className="text-sm text-gray-400">No chart available for this question type.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
