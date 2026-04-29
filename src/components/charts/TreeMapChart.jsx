import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const DEFAULT_COLORS = ["#3b008f", "#4f00b8", "#6900e0", "#8c3cff", "#c7a6ff"];

const makeContent = (colors) => {
  const Content = ({ x, y, width, height, index, name, value }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={colors[index % colors.length]}
        stroke="#fff"
        strokeWidth={2}
      />
      {width > 80 && height > 40 && (
        <>
          <text x={x + 8} y={y + 18} fill="#fff" fontSize={11} fontWeight={400}>
            {name}
          </text>
          <text x={x + 8} y={y + height - 10} fill="#fff" fontSize={11} fontWeight={300}>
            ${(value / 1000).toFixed(2)}k
          </text>
        </>
      )}
    </g>
  );
  Content.displayName = "TreeMapContent";
  return Content;
};

// Custom tooltip shown on hover
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e6e8f0",
        borderRadius: 6,
        padding: "6px 10px",
        fontSize: 11,
        color: "#374151",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 2 }}>{name}</p>
      <p style={{ color: "#6900e0" }}>${(value / 1000).toFixed(2)}k</p>
    </div>
  );
}

/**
 * TreeMapChart — reusable treemap with hover tooltip
 *
 * Props:
 *   title          {string}    required
 *   data           {Array}     required — [{ name, value }]
 *   dataKey        {string}    default "value"
 *   colors         {Array}     default purple palette
 *   height         {number}    default 190
 *   valueFormatter {function}  optional — formats tooltip value, receives raw value
 *   className      {string}    extra wrapper classes
 */
export default function TreeMapChart({
  title,
  data,
  dataKey = "value",
  colors = DEFAULT_COLORS,
  height = 190,
  valueFormatter,
  className = "",
}) {
  const CustomContent = makeContent(colors);

  return (
    <div className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}>

      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey={dataKey}
            stroke="#fff"
            content={<CustomContent />}
          >
            <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

    </div>
  );
}