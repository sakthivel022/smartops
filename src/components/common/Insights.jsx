/**
 * Insights — reusable AI insights panel
 *
 * Props:
 *   title   {string}    default "Insights"
 *   items   {string[]}  list of insight strings
 *                       defaults to generic FinOps insights if omitted
 *   className {string}  extra wrapper classes
 */

const DEFAULT_ITEMS = [
  "Identify unused or low-utilization resources (VMs, storage, services) to reduce unnecessary costs.",
  "Detect over-provisioned resources and recommend optimal configurations to improve cost efficiency.",
  "Highlight services with the highest spend and suggest targeted actions to reduce usage or optimize configurations.",
  "Identify resources running on on-demand pricing and suggest switching to reserved or cost-efficient pricing models.",
];

export default function Insights({
  title = "Insights",
  items = DEFAULT_ITEMS,
  className = "",
}) {
  return (
    <div className={`bg-[#F3EFF9] rounded-[4px] w-full p-3 flex flex-col gap-2 ${className}`}>

      <div className="flex items-center gap-1.5">
        <span className="text-[#6900e0] text-[12px]">✨</span>
        <h3 className="text-[12px] font-semibold text-[#6900e0]">{title}</h3>
      </div>

      <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-gray-600 leading-snug">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>

    </div>
  );
}
