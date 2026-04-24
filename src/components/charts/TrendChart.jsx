import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/**
 * TrendChart — reusable single-line chart
 *
 * Props:
 *   data      {Array}   required — [{ name, value }]
 *   dataKey   {string}  default "value"
 *   color     {string}  default "#6900e0"
 *   height    {number}  default 180
 */
export default function TrendChart({
  data,
  dataKey = "value",
  color = "#6900e0",
  height = 180,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 12, left: -12, bottom: 0 }}>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 10, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            fontSize: 11,
            padding: "6px 8px",
            borderRadius: "6px",
            border: "1px solid #e6e8f0",
          }}
        />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
