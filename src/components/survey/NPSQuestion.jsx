export default function NPSQuestion({ question, value, onChange }) {
  const labels = question.npsLabels || { low: 'Not likely', high: 'Extremely likely' };
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => i).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded border font-medium text-sm transition-colors cursor-pointer ${
              value === n
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-gray-300 text-gray-500 hover:border-indigo-400'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>0 – {labels.low}</span>
        <span>10 – {labels.high}</span>
      </div>
    </div>
  );
}
