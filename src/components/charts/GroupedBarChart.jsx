import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function GroupedBarChart({
  title,
  data,
  bars,
  xLabel,
  yLabel,
  height = 150, // ✅ same pattern as BarChartCard
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}
    >
      {/* TITLE */}
      <h3 className="text-[13px] font-semibold">{title}</h3>

      {/* CHART */}
      <div className="flex-1 min-h-0 flex">

        {/* Y AXIS LABEL */}
        {yLabel && (
          <div className="flex items-center justify-center w-[16px]">
            <span
              className="text-[10px] text-gray-500 whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {yLabel}
            </span>
          </div>
        )}

        <div className="flex-1">
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
              barCategoryGap="25%"
            >
              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(v) => `$${v / 1000}k`}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                contentStyle={{
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                }}
              />

              {bars.map((b) => (
                <Bar
                  key={b.dataKey}
                  dataKey={b.dataKey}
                  fill={b.color}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* X LABEL */}
      {xLabel && (
        <p className="text-[10px] text-gray-500 text-center mt-1">
          {xLabel}
        </p>
      )}

      {/* LEGEND */}
      <div className="flex items-center justify-center gap-6 mt-1">
        {bars.map((b) => (
          <div key={b.dataKey} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            <span className="text-[10px] text-gray-600">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}