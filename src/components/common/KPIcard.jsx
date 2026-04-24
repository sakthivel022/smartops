/**
 * KPIcard — reusable KPI metric card
 *
 * Props:
 *   title     {string}  required
 *   value     {string|number} required
 *   subtitle  {string}  optional — trend text e.g. "8.5% vs last month"
 *   trend     {string}  "up" | "down" | null — controls arrow color
 *                       default "down" (red) when subtitle present
 *   className {string}  extra wrapper classes
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
    <div className={`relative bg-white rounded-[4px] p-2.5 border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] ${className}`}>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6900e0] rounded-b-[4px]" />

      <p className="text-[11px] text-gray-500 font-medium">{title}</p>

      <h2 className="text-[15px] font-semibold text-[#6900e0] mt-0.5">{value}</h2>

      {subtitle && (
        <p className={`text-[10px] mt-0.5 flex items-center gap-1 ${trendColor}`}>
          {trendArrow} {subtitle}
        </p>
      )}
    </div>
  );
}
