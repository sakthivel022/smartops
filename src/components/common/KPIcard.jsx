/**
 * KPIcard — reusable KPI metric card
 *
 * Figma CSS spec:
 *   box-sizing: border-box
 *   width: 276px; height: 108px
 *   background: #FFFFFF
 *   border: 0.5px solid #BC9BEC
 *   box-shadow: 1px 1px 24px rgba(12, 12, 12, 0.08)
 *   border-radius: 4px
 *   flex: none; order: 0; flex-grow: 1
 *
 * Props:
 *   title     {string}         required
 *   value     {string|number}  required
 *   subtitle  {string}         optional — trend text e.g. "8.5% vs last month"
 *   trend     {string}         "up" | "down" (default "down")
 *   className {string}         extra wrapper classes
 */
export default function KPIcard({
  title,
  value,
  subtitle,
  trend = "down",
  className = "",
}) {
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  const trendArrow = trend === "up" ? "↑" : "↓";

  return (
    <div
      className={`relative flex flex-col justify-center px-3 ${className}`}
      style={{
        boxSizing:    "border-box",
        height:       "108px",
        flexGrow:     1,
        flexShrink:   0,
        background:   "#FFFFFF",
        border:       "0.5px solid #BC9BEC",
        boxShadow:    "1px 1px 24px rgba(12, 12, 12, 0.08)",
        borderRadius: "4px",
      }}
    >
      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height:       "3px",
          background:   "#6900e0",
          borderRadius: "0 0 4px 4px",
        }}
      />

      <p className="text-[11px] text-gray-500 font-medium leading-tight">
        {title}
      </p>

      <h2 className="text-[20px] font-semibold text-[#6900e0] mt-1 leading-tight">
        {value}
      </h2>

      {subtitle && (
        <p className={`text-[10px] mt-1 flex items-center gap-1 ${trendColor}`}>
          {trendArrow} {subtitle}
        </p>
      )}
    </div>
  );
}