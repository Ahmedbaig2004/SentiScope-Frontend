const questionTypes = [
  { type: 'mcq', label: 'Multiple Choice', icon: '[ ]', description: 'Pick from options' },
  { type: 'text', label: 'Text', icon: 'Aa', description: 'Free-form text' },
  { type: 'rating', label: 'Rating', icon: '#', description: 'Star rating scale' },
  { type: 'nps', label: 'NPS', icon: '0-10', description: 'Net Promoter Score' },
];

export default function QuestionTypeSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {questionTypes.map((qt) => (
        <button
          key={qt.type}
          onClick={() => onSelect(qt.type)}
          className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left cursor-pointer"
        >
          <span className="text-lg font-mono text-indigo-600 w-10 text-center">{qt.icon}</span>
          <div>
            <p className="text-sm font-medium text-gray-900">{qt.label}</p>
            <p className="text-xs text-gray-500">{qt.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
