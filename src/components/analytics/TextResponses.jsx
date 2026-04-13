export default function TextResponses({ data, total }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">{total} response{total !== 1 ? 's' : ''}</p>
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No text responses yet.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {data.map((text, i) => (
            <div key={i} className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
