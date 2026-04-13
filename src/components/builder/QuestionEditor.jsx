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
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">Q{index + 1}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-medium">
            {question.type.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-1 cursor-pointer"
          >
            Up
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 p-1 cursor-pointer"
          >
            Down
          </button>
          <button
            onClick={() => onDelete(index)}
            className="text-red-400 hover:text-red-600 p-1 ml-2 cursor-pointer"
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
        placeholder="Enter your question..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
      />

      {/* MCQ options */}
      {question.type === 'mcq' && (
        <div className="space-y-2 mb-3">
          {(question.options || []).map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></span>
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {question.options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  className="text-red-400 hover:text-red-600 text-sm cursor-pointer"
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-sm text-indigo-600 hover:underline cursor-pointer"
          >
            + Add option
          </button>
        </div>
      )}

      {/* Rating max */}
      {question.type === 'rating' && (
        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1">Max Rating</label>
          <select
            value={question.maxRating || 5}
            onChange={(e) => update('maxRating', Number(e.target.value))}
            className="px-2 py-1 border border-gray-200 rounded text-sm"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}

      {/* NPS labels */}
      {question.type === 'nps' && (
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Low label (0)</label>
            <input
              type="text"
              value={question.npsLabels?.low || 'Not likely'}
              onChange={(e) => update('npsLabels', { ...question.npsLabels, low: e.target.value })}
              className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">High label (10)</label>
            <input
              type="text"
              value={question.npsLabels?.high || 'Extremely likely'}
              onChange={(e) => update('npsLabels', { ...question.npsLabels, high: e.target.value })}
              className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Required toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={question.required || false}
          onChange={(e) => update('required', e.target.checked)}
          className="rounded border-gray-300"
        />
        Required
      </label>
    </div>
  );
}
