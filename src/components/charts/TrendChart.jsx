import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TrendChart({ data }) {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full max-w-[685px] h-[248px] p-[12px] pb-[6px] flex flex-col gap-3 opacity-80">

      {/* TITLE */}
      <h3 className="text-[14px] font-semibold">
        Periodic Trend Analysis
      </h3>

      {/* CHART AREA */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

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
              dataKey="value"
              stroke="#6900e0"   // ✅ primary color
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}