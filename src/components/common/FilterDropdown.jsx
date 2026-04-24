/**
 * FilterDropdown — reusable filter pill button
 *
 * Props:
 *   label     {string}    required — button text
 *   onClick   {function}  optional click handler
 *   active    {boolean}   optional — filled style when active
 *   className {string}    extra wrapper classes
 */
export default function FilterDropdown({
  label,
  onClick,
  active = false,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-8 px-3 items-center justify-between gap-2 border rounded-lg text-[12px] font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0
        ${active
          ? "bg-[#6900e0] text-white border-[#6900e0]"
          : "border-[#6900e0]/40 text-[#6900e0] bg-white hover:bg-[#6900e0]/10"
        } ${className}`}
    >
      <span>{label}</span>
      <span className="text-[10px]">▾</span>
    </button>
  );
}
