const categoryColors = {
  customer_feedback: 'bg-blue-50 text-blue-700',
  employee: 'bg-purple-50 text-purple-700',
  product: 'bg-green-50 text-green-700',
  education: 'bg-yellow-50 text-yellow-700',
  general: 'bg-gray-50 text-gray-700',
};

export default function TemplateCard({ template, onPreview, onUse }) {
  return (
    <div className="bg-gradient-to-br from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl border border-violet-400/20 rounded-3xl p-6 flex flex-col gap-4 shadow-xl hover:shadow-2xl hover:border-violet-500 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/20 transition-all" />
      <div className="flex items-start justify-between">
        <span className="text-3xl">{template.icon}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[template.category] || 'bg-gray-50 text-gray-700'}`}>
          {template.category.replace('_', ' ')}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{template.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{template.description}</p>
      </div>
      <p className="text-xs text-gray-400">{template.questions.length} questions</p>
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => onPreview(template)}
          className="flex-1 text-sm py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 cursor-pointer"
        >
          Preview
        </button>
        <button
          onClick={() => onUse(template._id)}
          className="flex-1 text-sm py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 cursor-pointer font-medium"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}
