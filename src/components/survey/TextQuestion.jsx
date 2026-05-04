export default function TextQuestion({ question, value, onChange }) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here..."
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none text-sm"
    />
  );
}
