/**
 * DataTable — reusable scrollable data table
 *
 * Props:
 *   title    {string}    default "Table"
 *   columns  {Array}     required — [{ key, label, align }]
 *              key    — matches row object key
 *              label  — header display text
 *              align  — "left" (default) | "right"
 *   data     {Array}     required — array of row objects
 *   height   {number}    default 320 — scroll area height in px
 *   className {string}   extra wrapper classes
 *
 * Example columns:
 *   [
 *     { key: "subscription", label: "Subscription" },
 *     { key: "totalCost",    label: "Total Cost", align: "right" },
 *   ]
 */
export default function DataTable({
  title = "Table",
  columns,
  data,
  height = 320,
  className = "",
}) {
  return (
    <div className={`bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] p-3 flex flex-col gap-2 ${className}`}>

      <h3 className="text-[13px] font-semibold">{title}</h3>

      <div style={{ height }} className="overflow-hidden">
        <div className="h-full w-full overflow-x-auto overflow-y-auto">

          <table className="min-w-full w-max text-[11px]">

            <thead className="bg-[#f3f2f8] sticky top-0 z-10">
              <tr className="text-left text-gray-700">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-2 whitespace-nowrap font-semibold ${col.align === "right" ? "text-right" : "text-left"}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {data.map((row, i) => (
                <tr key={i} className="border-t border-[#eef0f5] hover:bg-[#f7f5ff]">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-3 py-1.5 whitespace-nowrap ${col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {row[col.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
