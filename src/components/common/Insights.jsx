export default function Insights() {
  return (
    <div className="bg-[#F3EFF9] rounded-[4px] w-full max-w-[451px] p-[12px] flex flex-col gap-[12px]">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <span className="text-[#6900e0] text-[14px]">✨</span>
        <h3 className="text-[14px] font-semibold text-[#6900e0]">
          Insights
        </h3>
      </div>

      {/* LIST */}
      <ol className="list-decimal pl-4 space-y-2 text-[12px] text-gray-600 leading-snug">
        <li>
          Identify unused or low-utilization resources (VMs, storage, services)
          to reduce unnecessary costs.
        </li>
        <li>
          Detect over-provisioned resources and recommend optimal configurations
          to improve cost efficiency.
        </li>
        <li>
          Highlight services with the highest spend and suggest targeted actions
          to reduce usage or optimize configurations.
        </li>
        <li>
          Identify resources running on on-demand pricing and suggest switching
          to reserved or cost-efficient pricing models.
        </li>
      </ol>

    </div>
  );
}