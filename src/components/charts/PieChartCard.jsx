import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const DEFAULT_COLORS = ["#4C1D95", "#7C3AED", "#A78BFA", "#C4B5FD"];

/**
 * PieChartCard — reusable full pie chart (no inner hole) with 2-col legend
 *
 * Props:
 *   title          {string}   required
 *   data           {Array}    required — [{ name, value }]
 *   colors         {Array}    default purple palette
 *   valueFormatter {function} formats legend value, receives (item, total)
 *                             default shows percentage e.g. "40%"
 *   className      {string}   extra wrapper classes
 */
export default function PieChartCard({
  title,
  data,
  colors = DEFAULT_COLORS,
  valueFormatter,
  className = "",
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const format = valueFormatter ?? ((item) => {
    const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
    return `${pct}%`;
  });

  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full h-full p-3 flex flex-col gap-2 ${className}`}
    >
      <h3 className="text-[13px] font-semibold flex-shrink-0">{title}</h3>

      {/* Pie + legend side by side */}
      <div className="flex items-center gap-4 flex-1 min-h-0">

        {/* PIE — full circle, no inner radius */}
        <div className="flex-shrink-0" style={{ width: 160, height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value, name) => {
                  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                  return [`${pct}%`, name];
                }}
                contentStyle={{
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "1px solid #e6e8f0",
                }}
              />
              <Pie
                data={data}
                dataKey="value"
                innerRadius={0}
                outerRadius={75}
                stroke="white"
                strokeWidth={2}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND — 2 columns grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 min-w-0">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span className="text-[12px] text-gray-700 font-medium">
                  {item.name}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 font-semibold pl-4">
                {format(item)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}