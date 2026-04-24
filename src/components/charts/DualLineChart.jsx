import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function DualLineChart({ data }) {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full max-w-[572px] h-[248px] p-[12px] flex flex-col gap-[12px] opacity-80">

      {/* TITLE */}
      <h3 className="text-[14px] font-semibold">
        Amortized vs Total Cost
      </h3>

      {/* CHART */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
          >

            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />

            <YAxis
              tickFormatter={(v) => `$${v / 1000}k`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
            />

            <Tooltip
              formatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              contentStyle={{
                fontSize: "11px",
                borderRadius: "6px",
                border: "1px solid #e6e8f0",
              }}
            />

            {/* TOTAL */}
            <Line
              type="monotone"
              dataKey="total"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />

            {/* AMORTIZED */}
            <Line
              type="monotone"
              dataKey="amortized"
              stroke="#6900e0" // primary
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 text-[12px]">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2.5 h-2.5 bg-[#22c55e] rounded-full"></span>
          Total Cost
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2.5 h-2.5 bg-[#6900e0] rounded-full"></span>
          Amortized
        </div>
      </div>

    </div>
  );
}