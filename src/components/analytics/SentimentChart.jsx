import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  neutral:  '#9ca3af',
  negative: '#ef4444',
};

const SENTIMENT_LABEL_CLASSES = {
  positive: 'bg-green-100 text-green-700',
  neutral:  'bg-gray-100 text-gray-600',
  negative: 'bg-red-100 text-red-700',
};

function ScoreLabel({ averageScore }) {
  let colorClass = 'text-gray-500';
  if (averageScore > 0.05)  colorClass = 'text-green-600';
  if (averageScore < -0.05) colorClass = 'text-red-600';

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <p className={`text-2xl font-bold ${colorClass}`}>{averageScore}</p>
      <p className="text-xs text-gray-400 mt-0.5">avg score</p>
    </div>
  );
}

export default function SentimentChart({ data, total, averageScore, distribution }) {
  const pieData = [
    { name: 'Positive', value: distribution.positive, key: 'positive' },
    { name: 'Neutral',  value: distribution.neutral,  key: 'neutral'  },
    { name: 'Negative', value: distribution.negative, key: 'negative' },
  ].filter((d) => d.value > 0);

  const isEmpty = total === 0 || pieData.length === 0;

  return (
    <div className="space-y-5">

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-500">{total} response{total !== 1 ? 's' : ''}</span>
      </div>

      {/* Pie chart */}
      {isEmpty ? (
        <p className="text-sm italic text-gray-400">No responses yet.</p>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">

          {/* Donut with centre label */}
          <div className="relative shrink-0" style={{ width: 200, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={pieData.length > 1 ? 3 : 0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={SENTIMENT_COLORS[entry.key]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} (${total > 0 ? Math.round((value / total) * 100) : 0}%)`,
                    name,
                  ]}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ScoreLabel averageScore={averageScore} />
          </div>

          {/* Legend + percentages */}
          <div className="flex flex-col justify-center gap-3 sm:mt-10">
            {pieData.map((entry) => {
              const pct = total > 0 ? Math.round((entry.value / total) * 100) : 0;
              return (
                <div key={entry.key} className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: SENTIMENT_COLORS[entry.key] }}
                  />
                  <span className="text-sm text-gray-700 capitalize w-16">{entry.name}</span>
                  <span className="text-sm font-medium text-gray-900 w-6 text-right">{entry.value}</span>
                  <span className="text-xs text-gray-400 w-10">{pct}%</span>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Per-response list */}
      <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
        {data.length === 0 ? (
          <p className="text-sm italic text-gray-400">No text responses yet.</p>
        ) : (
          data.map((item, i) => {
            const label = item.sentiment?.label;
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
              >
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    SENTIMENT_LABEL_CLASSES[label] ?? 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {label ?? '—'}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}