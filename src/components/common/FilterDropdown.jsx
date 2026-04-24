export default function FilterDropdown({ label }) {
  return (
    <div className="flex h-8 px-3 items-center justify-between border border-[#6900e0]/40 text-[#6900e0] rounded-lg text-[12px] font-medium bg-white hover:bg-[#6900e0]/10 transition cursor-pointer whitespace-nowrap flex-shrink-0">

      <span className="whitespace-nowrap">
        {label}
      </span>

      <span className="ml-2 text-[10px] flex-shrink-0">
        ▾
      </span>

    </div>
  );
}