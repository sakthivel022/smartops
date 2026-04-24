import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DEFAULT_COLORS = ["#6D28D9", "#4C1D95", "#7C3AED", "#C4B5FD"];

/**
 * DonutChart — reusable donut chart with legend
 *
 * Props:
 *   title         {string}    required
 *   data          {Array}     required — [{ name, value }]
 *   colors        {Array}     default purple palette
 *   valueFormatter {function} formats legend value, default "$X.XXK (X%)"
 *   innerRadius   {number}    default 30
 *   outerRadius   {number}    default 45
 *   className     {string}    extra classes for card wrapper
 */
export default function DonutChart({
  title,
  data,
  colors = DEFAULT_COLORS,
  valueFormatter,
  innerRadius = 30,
  outerRadius = 45,
  className = "",
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const defaultFormatter = (item) => {
    const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
    return `$${(item.value / 1000).toFixed(2)}K (${pct}%)`;
  };

  const format = valueFormatter ?? defaultFormatter;

  return (
    <div className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}>

      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div className="flex items-center gap-4">

        {/* DONUT */}
        <div className="w-[90px] h-[90px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value, name) => [`$${(value / 1000).toFixed(2)}K`, name]}
                contentStyle={{
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "1px solid #e6e8f0",
                }}
              />
              <Pie
                data={data}
                dataKey="value"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={1}
                cornerRadius={2}
                stroke="none"
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

        {/* LEGEND — vertical, no wrapping */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2 min-w-0">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <div className="flex justify-between w-full min-w-0 gap-1">
                <p className="text-[11px] text-gray-700 font-medium truncate">
                  {item.name}
                </p>
                <p className="text-[10px] text-gray-500 whitespace-nowrap">
                  {format(item)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
