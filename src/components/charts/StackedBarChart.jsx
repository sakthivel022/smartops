import { useState } from "react";

/**
 * StackedBarChart — single horizontal stacked percentage bar with hover tooltip
 *
 * Props:
 *   title      {string}   required
 *   segments   {Array}    required — [{ label, value, color }]
 *                           value: numeric percentage (e.g. 83.33)
 *                           color: hex color string
 *   showLabels {boolean}  show % labels inside segments, default true
 *   className  {string}   extra wrapper classes
 */
export default function StackedBarChart({
  title,
  segments,
  showLabels = true,
  className = "",
}) {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div
      className={`bg-white border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(0,0,0,0.08)] rounded-[4px] w-full p-3 flex flex-col ${className}`}
      style={{ height: "236px" }}
    >
      {/* TITLE */}
      <h3 className="text-[13px] font-semibold flex-shrink-0">{title}</h3>

      {/* Bar + Legend — vertically centered */}
      <div className="flex flex-1 flex-col items-stretch justify-center gap-4">

        {/* Stacked bar */}
        <div className="relative">
          <div className="flex w-full h-10 rounded overflow-visible">
            {segments.map((seg, i) => (
              <div
                key={i}
                style={{ width: `${seg.value}%`, backgroundColor: seg.color }}
                className="relative flex items-center justify-center flex-shrink-0 cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const parentRect = e.currentTarget.parentElement.getBoundingClientRect();
                  setTooltip({
                    label: seg.label,
                    value: seg.value,
                    x: rect.left - parentRect.left + rect.width / 2,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {showLabels && seg.value >= 8 && (
                  <span className="text-white text-[10px] font-medium truncate px-1 select-none">
                    {seg.value}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Hover tooltip */}
          {tooltip && (
            <div
              className="absolute -top-9 bg-white border border-gray-200 rounded shadow-md px-2 py-1 text-[11px] text-gray-700 whitespace-nowrap pointer-events-none z-50"
              style={{ left: tooltip.x, transform: "translateX(-50%)" }}
            >
              <span className="font-medium">{tooltip.label}:</span> {tooltip.value}%
            </div>
          )}
        </div>

        {/* Legend — centered */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-[11px] text-gray-600">{seg.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}