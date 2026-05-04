export default function QuestionEditor({ question, index, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const update = (field, value) => {
    onChange(index, { ...question, [field]: value });
  };

  const updateOption = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    update('options', newOptions);
  };

  const addOption = () => {
    update('options', [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`]);
  };

  const removeOption = (optIndex) => {
    update('options', question.options.filter((_, i) => i !== optIndex));
  };

  return (
    <div className="bg-gradient-to-br from-violet-50/95 via-white/90 to-violet-100/80 backdrop-blur-xl border border-violet-400/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all relative group/q overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -mr-12 -mt-12" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-violet-800 opacity-60 uppercase tracking-widest">Q{index + 1}</span>
          <span className="text-[10px] px-2.5 py-1 rounded-lg bg-violet-600 text-white font-black uppercase tracking-widest shadow-md shadow-violet-900/20">
            {question.type}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className="text-violet-400 hover:text-violet-700 disabled:opacity-20 p-2 transition-colors cursor-pointer"
          >
            Up
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="text-violet-400 hover:text-violet-700 disabled:opacity-20 p-2 transition-colors cursor-pointer"
          >
            Down
          </button>
          <button
            onClick={() => onDelete(index)}
            className="text-red-400 hover:text-red-600 p-2 ml-1 transition-colors cursor-pointer font-bold text-xs uppercase tracking-widest"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Question text */}
      <input
        type="text"
        value={question.text}
        onChange={(e) => update('text', e.target.value)}
        placeholder="Enter your question here..."
        className="w-full px-4 py-3 bg-white/40 border border-violet-200 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-lg font-black text-violet-950 placeholder:text-violet-300 transition-all shadow-inner"
      />

      {/* MCQ options */}
      {question.type === 'mcq' && (
        <div className="space-y-3 mb-6">
          {(question.options || []).map((opt, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-xl border-2 border-violet-200 flex-shrink-0 bg-white/50"></span>
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/40 border border-violet-100 rounded-xl text-sm font-bold text-violet-900 focus:outline-none focus:ring-1 focus:ring-violet-500 placeholder:text-violet-200"
              />
              {question.options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  className="text-red-400 hover:text-red-600 p-1 cursor-pointer transition-all hover:scale-110"
                >
                  <span className="text-xl">&times;</span>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-xs font-black text-violet-600 hover:text-violet-800 cursor-pointer uppercase tracking-widest pl-9 transition-all hover:translate-x-1"
          >
            + Add another option
          </button>
        </div>
      )}

      {/* Rating max */}
      {question.type === 'rating' && (
        <div className="mb-6 bg-white/40 p-4 rounded-2xl border border-violet-100">
          <label className="text-[10px] font-black text-violet-800 block mb-2 uppercase tracking-widest opacity-60">Max Rating Value</label>
          <select
            value={question.maxRating || 5}
            onChange={(e) => update('maxRating', Number(e.target.value))}
            className="px-4 py-2 bg-white/60 border border-violet-200 rounded-xl text-sm font-black text-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n} Stars</option>
            ))}
          </select>
        </div>
      )}

      {/* NPS labels */}
      {question.type === 'nps' && (
        <div className="grid grid-cols-2 gap-4 mb-6 bg-white/40 p-4 rounded-2xl border border-violet-100">
          <div>
            <label className="text-[10px] font-black text-violet-800 block mb-2 uppercase tracking-widest opacity-60">Low label (0)</label>
            <input
              type="text"
              value={question.npsLabels?.low || 'Not likely'}
              onChange={(e) => update('npsLabels', { ...question.npsLabels, low: e.target.value })}
              className="w-full px-3 py-2 bg-white/60 border border-violet-200 rounded-xl text-sm font-bold text-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-violet-800 block mb-2 uppercase tracking-widest opacity-60">High label (10)</label>
            <input
              type="text"
              value={question.npsLabels?.high || 'Extremely likely'}
              onChange={(e) => update('npsLabels', { ...question.npsLabels, high: e.target.value })}
              className="w-full px-3 py-2 bg-white/60 border border-violet-200 rounded-xl text-sm font-bold text-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      )}

      {/* Required toggle */}
      <div className="flex items-center justify-between border-t border-violet-200/50 pt-4 mt-2">
        <label className="flex items-center gap-3 text-xs font-black text-violet-900 cursor-pointer uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">
          <input
            type="checkbox"
            checked={question.required || false}
            onChange={(e) => update('required', e.target.checked)}
            className="w-4 h-4 rounded-lg border-2 border-violet-300 text-violet-600 focus:ring-violet-500 bg-white/50 cursor-pointer"
          />
          Mandatory Question
        </label>
        <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest italic">SentiScope Builder</span>
      </div>
    </div>
  );
}
