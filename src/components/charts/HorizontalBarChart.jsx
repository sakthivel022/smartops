import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";

/**
 * HorizontalBarChart — reusable horizontal bar chart in a card
 *
 * Props:
 *   title          {string}    required
 *   data           {Array}     required — [{ name, value }]
 *   dataKey        {string}    default "value"
 *   color          {string}    default "#6900e0"
 *   height         {number}    default 220
 *   tickStep       {number}    interval between x-axis ticks, default 0.5
 *                              e.g. 0.5 → 0.0, 0.5, 1.0 ... auto-scales to data max
 *   tickFormatter  {function}  formats x-axis ticks, default shows "X.X%"
 *   showLabel      {boolean}   show end-of-bar label, default true
 *   labelFormatter {function}  formats the bar end label
 *   className      {string}    extra wrapper classes
 */
export default function HorizontalBarChart({
  title,
  data,
  dataKey = "value",
  color = "#6900e0",
  height = 220,
  tickStep = 0.5,
  tickFormatter = (v) => `${Number(v).toFixed(1)}%`,
  showLabel = true,
  labelFormatter = (v) => `${v} %`,
  className = "",
}) {
  // Dynamically compute domain and ticks from actual data
  const maxValue = Math.max(...data.map((d) => d[dataKey] ?? 0));

  // Round max up to nearest tickStep for a clean axis end
  const domainMax = Math.ceil(maxValue / tickStep) * tickStep;

  // Generate ticks from 0 to domainMax in tickStep increments
  const ticks = [];
  for (let t = 0; t <= domainMax + 1e-9; t = Math.round((t + tickStep) * 1e9) / 1e9) {
    ticks.push(t);
  }

  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}
    >
      <h3 className="text-[13px] font-semibold flex-shrink-0">{title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 64, left: 8, bottom: 8 }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            horizontal={false}
          />

          <XAxis
            type="number"
            domain={[0, domainMax]}
            ticks={ticks}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={115}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [labelFormatter(value), ""]}
            contentStyle={{
              fontSize: 11,
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #e6e8f0",
            }}
          />

          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[0, 4, 4, 0]}
            barSize={20}
          >
            {showLabel && (
              <LabelList
                dataKey={dataKey}
                position="right"
                formatter={labelFormatter}
                style={{ fontSize: 10, fill: "#6b7280" }}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}