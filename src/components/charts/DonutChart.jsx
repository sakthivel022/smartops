import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Databricks", value: 3000 },
  { name: "Virtual Machine", value: 3000 },
  { name: "App Service", value: 3000 },
  { name: "Storage Account", value: 3000 },
];

const COLORS = [
  "#6D28D9",
  "#4C1D95",
  "#7C3AED",
  "#C4B5FD",
];

export default function DonutChart() {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-3">

      {/* TITLE */}
      <h3 className="text-[14px] font-semibold">
        Spend by Service
      </h3>

      {/* CONTENT */}
      <div className="flex items-center gap-6">

        {/* DONUT */}
        <div className="w-[95px] h-[95px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Tooltip
                formatter={(value, name) => [
                  `$${(value / 1000).toFixed(2)}K`,
                  name,
                ]}
                contentStyle={{
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "1px solid #e6e8f0",
                }}
              />

              <Pie
                data={data}
                dataKey="value"
                innerRadius={30}
                outerRadius={45}
                paddingAngle={1}
                cornerRadius={2}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ VERTICAL LEGEND */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">

          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">

              {/* color dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />

              {/* text row */}
              <div className="flex justify-between w-full min-w-0">
                <p className="text-[12px] text-gray-700 font-medium truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-500 whitespace-nowrap ml-2">
                  $0.03K (7.8%)
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}