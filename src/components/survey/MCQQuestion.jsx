export default function MCQQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-2">
      {(question.options || []).map((opt, i) => (
        <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name={question._id}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="text-violet-600"
          />
          <span className="text-sm text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}
