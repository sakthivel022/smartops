import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * BarChartCard — reusable bar chart in a card
 *
 * Props:
 *   title         {string}    required
 *   data          {Array}     required — [{ name, value }]
 *   dataKey       {string}    default "value"
 *   color         {string}    default "#6900e0"
 *   height        {number}    default 150  — chart area height in px
 *   tickFormatter {function}  default formats as $Xk
 *   className     {string}    extra classes for the card wrapper
 */
export default function BarChartCard({
  title,
  data,
  dataKey = "value",
  color = "#6900e0",
  height = 150,
  tickFormatter = (val) => `$${val / 1000}k`,
  className = "",
}) {
  return (
    <div className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}>

      <h3 className="text-[13px] font-semibold">{title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>

          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />

          <XAxis
            dataKey="name"
            interval={0}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={tickFormatter}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => tickFormatter(value)}
            contentStyle={{
              fontSize: 11,
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #e6e8f0",
            }}
          />

          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
