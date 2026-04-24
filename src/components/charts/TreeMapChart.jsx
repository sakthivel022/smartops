import { Treemap, ResponsiveContainer } from "recharts";

const COLORS = [
  "#3b008f",
  "#4f00b8",
  "#6900e0",
  "#8c3cff",
  "#c7a6ff",
];

const CustomContent = ({ x, y, width, height, index, name, value }) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        stroke="#fff"
      />

      {width > 80 && height > 40 && (
        <>
          {/* NAME */}
          <text
            x={x + 8}
            y={y + 18}
            fill="#fff"
            fontSize={11}
            fontWeight={400}
          >
            {name}
          </text>

          {/* VALUE */}
          <text
            x={x + 8}
            y={y + height - 10}
            fill="#fff"
            fontSize={11}
            fontWeight={300}
          >
            ${(value / 1000).toFixed(2)}k
          </text>
        </>
      )}
    </g>
  );
};

export default function TreeMapChart({ data }) {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full max-w-[564px] h-[248px] p-[12px] flex flex-col gap-[12px]">

      {/* TITLE */}
      <h3 className="text-[14px] font-semibold">
        Spent by Resource Group
      </h3>

      {/* CHART */}
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            stroke="#fff"
            content={<CustomContent />}
          />
        </ResponsiveContainer>
      </div>

    </div>
  );
}