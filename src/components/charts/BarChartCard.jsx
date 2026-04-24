import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function BarChartCard({ title, data }) {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full max-w-[337px] p-3 flex flex-col gap-3">

      {/* TITLE */}
      <h3 className="text-[14px] font-semibold">
        {title}
      </h3>

      {/* CHART */}
      <div className="w-full h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
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
            />

            <YAxis
              tickFormatter={(val) => `$${val / 1000}k`}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => `$${value / 1000}k`}
              contentStyle={{
                fontSize: 11,
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid #e6e8f0",
              }}
            />

            <Bar
              dataKey="value"
              fill="#6900e0"   // ✅ your primary color
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}