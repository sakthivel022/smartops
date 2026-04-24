export default function KPIcard({ title, value, subtitle }) {
  return (
    <div className="relative bg-white rounded-[4px] p-2.5 border border-[0.5px] border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)]">

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6900e0] rounded-b-[4px]" />

      <p className="text-[11px] text-gray-500 font-medium">
        {title}
      </p>

      <h2 className="text-[15px] font-semibold text-[#6900e0] mt-0.5">
        {value}
      </h2>

      {subtitle && (
        <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
          ↓ {subtitle}
        </p>
      )}
    </div>
  );
}