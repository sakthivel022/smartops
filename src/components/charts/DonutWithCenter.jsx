import { PieChart, Pie, Cell, Tooltip } from "recharts";

const DEFAULT_COLORS = ["#6900e0", "#C4B5FD"];

/**
 * DonutCountChart — Donut chart with total count in the center hole
 *                   and raw counts in the legend (not percentages)
 *
 * Props:
 *   title        {string}   required
 *   data         {Array}    required — [{ name, value }]
 *   colors       {Array}    default ["#6900e0", "#C4B5FD"]
 *   innerRadius  {number}   default 45
 *   outerRadius  {number}   default 65
 *   centerLabel  {string}   text under the total number, e.g. "Total VMs"
 *   className    {string}   extra wrapper classes
 */
export default function DonutCountChart({
  title,
  data,
  colors = DEFAULT_COLORS,
  innerRadius = 45,
  outerRadius = 65,
  centerLabel = "",
  className = "",
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      className={`bg-white border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(0,0,0,0.08)] rounded-[4px] w-full p-3 flex flex-col ${className}`}
      style={{ height: "236px" }}
    >
      {/* TITLE */}
      <h3 className="text-[13px] font-semibold flex-shrink-0">{title}</h3>

      {/* Donut — centered in remaining space */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex-shrink-0" style={{ width: 130, height: 130 }}>
          <PieChart width={130} height={130}>
            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                fontSize: "11px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
              }}
              wrapperStyle={{ zIndex: 50 }}
            />
            <Pie
              data={data}
              dataKey="value"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>

          {/* Center label */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <span className="text-[22px] font-bold text-gray-800 leading-tight">{total}</span>
            {centerLabel && (
              <span className="text-[10px] text-gray-500 leading-tight">{centerLabel}</span>
            )}
          </div>
        </div>
      </div>

      {/* LEGEND — below donut, centered as a row */}
      <div className="flex items-center justify-center gap-4 flex-wrap pb-1">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-[11px] text-gray-700 font-medium">{item.name}</span>
            <span className="text-[11px] font-bold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}