/**
 * SankeyChart — custom SVG Sankey diagram
 *
 * Props:
 *   title    {string}   required
 *   data     {object}   { nodes: [{id, label, color}], links: [{source, target, value}] }
 *   className {string}  extra wrapper classes
 */

const NODE_WIDTH = 12;
const PAD = 18;       // vertical padding between nodes on same side

function layout(nodes, links, width, height) {
  // Split into source (left) and target (right) nodes
  const sourceIds = [...new Set(links.map((l) => l.source))];
  const targetIds = [...new Set(links.map((l) => l.target))];

  // compute total value per node
  const srcTotals = {};
  const tgtTotals = {};
  links.forEach(({ source, target, value }) => {
    srcTotals[source] = (srcTotals[source] || 0) + value;
    tgtTotals[target] = (tgtTotals[target] || 0) + value;
  });

  const totalValue = Object.values(srcTotals).reduce((a, b) => a + b, 0);
  const availH = height - PAD * (Math.max(sourceIds.length, targetIds.length) - 1);
  const scale = availH / totalValue;

  // layout source nodes
  let y = 0;
  const srcLayout = {};
  sourceIds.forEach((id) => {
    const h = srcTotals[id] * scale;
    srcLayout[id] = { x: 0, y, h };
    y += h + PAD;
  });

  // layout target nodes
  y = 0;
  const tgtLayout = {};
  targetIds.forEach((id) => {
    const h = (tgtTotals[id] || 0) * scale;
    tgtLayout[id] = { x: width - NODE_WIDTH, y, h };
    y += h + PAD;
  });

  return { srcLayout, tgtLayout, scale };
}

function SankeyPath({ sx, sy, sh, tx, ty, th, color, opacity = 0.35 }) {
  // cubic bezier from right edge of source to left edge of target
  const x0 = sx + NODE_WIDTH;
  const x1 = tx;
  const mx = (x0 + x1) / 2;
  const d = `M${x0},${sy} C${mx},${sy} ${mx},${ty} ${x1},${ty}
             L${x1},${ty + th} C${mx},${ty + th} ${mx},${sy + sh} ${x0},${sy + sh} Z`;
  return <path d={d} fill={color} opacity={opacity} />;
}

export default function SankeyChart({ title, data, className = "" }) {
  const W = 560;
  const H = 340;

  const { nodes, links } = data;
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const { srcLayout, tgtLayout, scale } = layout(nodes, links, W, H);

  // track current offset per source/target for stacking flows
  const srcOffsets = {};
  const tgtOffsets = {};

  return (
    <div
      className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] w-full p-3 flex flex-col gap-2 ${className}`}
    >
      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block" }}
        >
          {/* ── Flows ── */}
          {links.map((link, i) => {
            const src = srcLayout[link.source];
            const tgt = tgtLayout[link.target];
            if (!src || !tgt) return null;

            const sh = link.value * scale;
            const th = link.value * scale;

            if (!srcOffsets[link.source]) srcOffsets[link.source] = 0;
            if (!tgtOffsets[link.target]) tgtOffsets[link.target] = 0;

            const sy = src.y + srcOffsets[link.source];
            const ty = tgt.y + tgtOffsets[link.target];

            srcOffsets[link.source] += sh;
            tgtOffsets[link.target] += th;

            const color = nodeMap[link.source]?.color || "#6900e0";

            return (
              <SankeyPath
                key={i}
                sx={src.x}
                sy={sy}
                sh={sh}
                tx={tgt.x}
                ty={ty}
                th={th}
                color={color}
              />
            );
          })}

          {/* ── Source nodes (left) ── */}
          {Object.entries(srcLayout).map(([id, { x, y, h }]) => {
            const node = nodeMap[id];
            return (
              <g key={id}>
                <rect
                  x={x}
                  y={y}
                  width={NODE_WIDTH}
                  height={Math.max(h, 2)}
                  fill={node?.color || "#6900e0"}
                  rx={2}
                />
                <text
                  x={x + NODE_WIDTH + 6}
                  y={y + h / 2}
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="#374151"
                  fontFamily="inherit"
                >
                  {node?.label || id}
                </text>
              </g>
            );
          })}

          {/* ── Target nodes (right) ── */}
          {Object.entries(tgtLayout).map(([id, { x, y, h }]) => {
            const node = nodeMap[id];
            return (
              <g key={id}>
                <rect
                  x={x}
                  y={y}
                  width={NODE_WIDTH}
                  height={Math.max(h, 2)}
                  fill="#6900e0"
                  rx={2}
                />
                {/* label left of target node */}
                <text
                  x={x - 6}
                  y={y + h / 2}
                  dominantBaseline="middle"
                  textAnchor="end"
                  fontSize={11}
                  fill="#374151"
                  fontFamily="inherit"
                >
                  {node?.label || id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}