// =============================================
// DESIGN PATTERN: Factory (Frontend)
// Purpose: Mirrors the backend QuestionFactory.
// Given a question type, renders the correct
// React component. Adding a new type = one
// import and one entry in the map.
// =============================================

import MCQQuestion from './MCQQuestion';
import TextQuestion from './TextQuestion';
import RatingQuestion from './RatingQuestion';
import NPSQuestion from './NPSQuestion';

const questionComponents = {
  mcq: MCQQuestion,
  text: TextQuestion,
  rating: RatingQuestion,
  nps: NPSQuestion,
};

export default function QuestionRenderer({ question, value, onChange }) {
  const Component = questionComponents[question.type];

  if (!Component) {
    return <p className="text-red-500 text-sm">Unknown question type: {question.type}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="mb-4">
        <p className="font-medium text-gray-900">
          {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </p>
      </div>
      <Component question={question} value={value} onChange={onChange} />
    </div>
  );
}
