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
 *   height        {number}    default 220 — chart area height in px (applied to ResponsiveContainer)
 *   tickFormatter {function}  default formats as $Xk
 *   xLabel        {string}    optional x-axis label
 *   yLabel        {string}    optional y-axis label (rotated)
 *   xAxisProps    {object}    extra props spread onto <XAxis>
 *   xLabelProps   {object}    overrides for x label style
 *   yLabelProps   {object}    overrides for y label style
 *   className     {string}    extra wrapper classes
 */
export default function BarChartCard({
  title,
  data,
  dataKey = "value",
  color = "#6900e0",
  height = 220,
  tickFormatter = (val) => `$${val / 1000}k`,
  className = "",
  xAxisProps = {},
  xLabel,
  yLabel,
  xLabelProps = {},
  yLabelProps = {},
}) {
  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full h-full p-3 flex flex-col gap-2 ${className}`}
    >
      <h3 className="text-[13px] font-semibold flex-shrink-0">{title}</h3>

      {/* Key fix: use explicit pixel height on ResponsiveContainer, not "100%" */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 12, left: 10, bottom: 30 }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            interval={0}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            {...xAxisProps}
            label={
              xLabel
                ? {
                    value: xLabel,
                    position: "insideBottom",
                    offset: -10,
                    style: { fontSize: 11, fill: "#6b7280" },
                    ...xLabelProps,
                  }
                : undefined
            }
          />

          <YAxis
            width={48}
            tickFormatter={tickFormatter}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: "insideLeft",
                    dx: -5,
                    dy: 20,
                    style: { fontSize: 11, fill: "#6b7280" },
                    ...yLabelProps,
                  }
                : undefined
            }
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