import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

export default function NPSChart({ data, total, npsScore }) {
  const chartData = data.filter((d) => d.count > 0);

  return (
    <div>
      <div className="flex items-center gap-6 mb-3">
        <div>
          <p className={`text-3xl font-bold ${npsScore >= 50 ? 'text-green-600' : npsScore >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {npsScore > 0 ? '+' : ''}{npsScore}
          </p>
          <p className="text-xs text-gray-400">NPS Score</p>
        </div>
        <p className="text-sm text-gray-500">{total} response{total !== 1 ? 's' : ''}</p>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={70} label={({ label, percentage }) => `${percentage}%`}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} />
            <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-400">No responses yet</p>
      )}
    </div>
  );
}
