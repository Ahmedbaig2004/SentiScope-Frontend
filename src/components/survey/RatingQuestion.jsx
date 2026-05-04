export default function RatingQuestion({ question, value, onChange }) {
  const max = question.maxRating || 5;
  return (
    <div className="flex gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-full border-2 font-medium text-sm transition-colors cursor-pointer ${
            value >= n
              ? 'bg-violet-600 border-violet-600 text-white'
              : 'border-gray-300 text-gray-500 hover:border-violet-400'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
