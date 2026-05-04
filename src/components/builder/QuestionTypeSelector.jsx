const questionTypes = [
  { type: 'mcq', label: 'Multiple Choice', icon: '[ ]', description: 'Pick from options' },
  { type: 'text', label: 'Text', icon: 'Aa', description: 'Free-form text' },
  { type: 'rating', label: 'Rating', icon: '#', description: 'Star rating scale' },
  { type: 'nps', label: 'NPS', icon: '0-10', description: 'Net Promoter Score' },
];

export default function QuestionTypeSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {questionTypes.map((qt) => (
        <button
          key={qt.type}
          onClick={() => onSelect(qt.type)}
          className="flex flex-col items-center gap-2 p-4 bg-white/40 backdrop-blur-sm border border-violet-200 rounded-2xl hover:border-violet-500 hover:bg-violet-600 hover:text-white transition-all text-center cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
          <span className="text-2xl font-black text-violet-600 group-hover:text-white transition-colors">{qt.icon}</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest">{qt.label}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
