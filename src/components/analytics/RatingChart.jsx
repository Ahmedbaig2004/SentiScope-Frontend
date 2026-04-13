import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RatingChart({ data, total, average, max }) {
  return (
    <div>
      <div className="flex items-center gap-6 mb-3">
        <div>
          <p className="text-3xl font-bold text-indigo-600">{average}</p>
          <p className="text-xs text-gray-400">avg out of {max}</p>
        </div>
        <p className="text-sm text-gray-500">{total} response{total !== 1 ? 's' : ''}</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, 'Responses']} />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
