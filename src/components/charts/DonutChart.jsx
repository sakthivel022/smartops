import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DEFAULT_COLORS = ["#7C3AED", "#C4B5FD"];

export default function DonutChart({
  title,
  data,
  colors = DEFAULT_COLORS,
  innerRadius = 45,
  outerRadius = 65,
  height,
  className = "",
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}
      style={height ? { height: `${height}px` } : undefined}
    >
      {/* TITLE */}
      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div className="flex items-center justify-center flex-1 gap-6">

        {/* DONUT */}
        <div className="flex-shrink-0">
  <PieChart width={140} height={140}>
    <Tooltip
      formatter={(value, name) => [`${value}%`, name]}
      contentStyle={{
        fontSize: "11px",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
      }}
    />

    <Pie
      data={data}
      dataKey="value"
      innerRadius={45}
      outerRadius={65}
      stroke="none"
      startAngle={90}
      endAngle={-270}
    >
      {data.map((_, i) => (
        <Cell key={i} fill={colors[i % colors.length]} />
      ))}
    </Pie>
  </PieChart>
</div>

        {/* LEGEND */}
        <div className="flex flex-col gap-3">
          {data.map((item, i) => {
            const pct =
              total > 0 ? Math.round((item.value / total) * 100) : 0;

            return (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-gray-700 font-medium">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}