import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * DualLineChart — reusable multi-line chart
 *
 * Props:
 *   title   {string}  required
 *   data    {Array}   required — e.g. [{ name, total, amortized }]
 *   lines   {Array}   required — [{ dataKey, color, label }]
 *             e.g. [
 *               { dataKey: "total",     color: "#22c55e", label: "Total Cost" },
 *               { dataKey: "amortized", color: "#6900e0", label: "Amortized"  },
 *             ]
 *   height  {number}  default 160 — chart area height in px
 *   tickFormatter {function} default formats as $Xk
 *   className {string} extra wrapper classes
 */
export default function DualLineChart({
  title,
  data,
  lines,
  height = 160,
  tickFormatter = (v) => `$${v / 1000}k`,
  className = "",
}) {
  return (
    <div className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}>

      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 12, left: -12, bottom: 0 }}>

            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />

            <YAxis
              tickFormatter={tickFormatter}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />

            <Tooltip
              formatter={(value) => tickFormatter(value)}
              contentStyle={{
                fontSize: "11px",
                borderRadius: "6px",
                border: "1px solid #e6e8f0",
              }}
            />

            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-5 text-[11px]">
        {lines.map((line) => (
          <div key={line.dataKey} className="flex items-center gap-1.5 text-gray-600">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: line.color }}
            />
            {line.label ?? line.dataKey}
          </div>
        ))}
      </div>

    </div>
  );
}
