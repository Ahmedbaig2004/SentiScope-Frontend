import QuestionRenderer from '../survey/QuestionRenderer';

export default function TemplatePreview({ template, onClose, onUse }) {
  if (!template) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{template.icon}</span>
            <div>
              <h2 className="font-semibold text-gray-900">{template.name}</h2>
              <p className="text-xs text-gray-500">{template.questions.length} questions</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
        </div>

        {/* Questions preview (read-only) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {template.questions.map((q, i) => (
            <QuestionRenderer key={i} question={q} value={null} onChange={() => {}} />
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200">
          <button
            onClick={() => onUse(template._id)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium cursor-pointer"
          >
            Use this template
          </button>
        </div>
      </div>
    </div>
  );
}
