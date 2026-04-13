import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import QuestionRenderer from '../components/survey/QuestionRenderer';

export default function PublicSurvey() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [notAvailable, setNotAvailable] = useState(false);

  useEffect(() => {
    api.get(`/public/survey/${id}`)
      .then((res) => setSurvey(res.data.survey))
      .catch((err) => {
        if (err.response?.status === 403 || err.response?.status === 404) {
          setNotAvailable(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Build answers array
    const answersArray = survey.questions.map((q) => ({
      questionId: q._id,
      value: answers[q._id] ?? null,
    })).filter((a) => a.value !== null && a.value !== '');

    setSubmitting(true);
    try {
      await api.post('/responses', {
        surveyId: id,
        answers: answersArray,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (notAvailable) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <p className="text-4xl mb-4">🔒</p>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Survey Unavailable</h1>
          <p className="text-gray-500">This survey is not currently active or does not exist.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <p className="text-4xl mb-4">🎉</p>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Response Submitted!</h1>
          <p className="text-gray-500">
            {survey?.settings?.endingMessage || 'Thank you for your response!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{survey?.title}</h1>
          {survey?.description && (
            <p className="text-gray-500 mt-2">{survey.description}</p>
          )}
          {survey?.settings?.welcomeMessage && (
            <p className="text-gray-600 mt-3 italic">{survey.settings.welcomeMessage}</p>
          )}
        </div>

        {/* Progress bar */}
        {survey?.settings?.showProgressBar && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all"
              style={{
                width: `${Object.keys(answers).length / (survey?.questions?.length || 1) * 100}%`,
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {survey?.questions.map((q) => (
            <QuestionRenderer
              key={q._id}
              question={q}
              value={answers[q._id]}
              onChange={(val) => handleAnswer(q._id, val)}
            />
          ))}

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 font-medium cursor-pointer"
          >
            {submitting ? 'Submitting...' : 'Submit Response'}
          </button>
        </form>
      </div>
    </div>
  );
}
