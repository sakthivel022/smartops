export default function DataTable({ data }) {
  return (
    <div className="bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] p-[12px] grid gap-[12px] mt-3">

      {/* HEADER */}
      <div>
        <h3 className="text-[14px] font-semibold">
          Table
        </h3>
      </div>

      {/* TABLE CONTAINER */}
      <div className="h-[320px] overflow-hidden">

        {/* SCROLL AREA */}
        <div className="h-full w-full overflow-x-auto overflow-y-auto">

          <table className="min-w-[1500px] w-max text-[12px]">

            {/* HEADER */}
            <thead className="bg-[#f3f2f8] sticky top-0 z-10">
              <tr className="text-left text-gray-700">

                <th className="px-3 py-2 whitespace-nowrap">Subscriptions</th>
                <th className="px-3 py-2 whitespace-nowrap">Service Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Resource Group</th>
                <th className="px-3 py-2 whitespace-nowrap">Resource Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Resource Type</th>
                <th className="px-3 py-2 whitespace-nowrap">Region</th>

                <th className="px-3 py-2 whitespace-nowrap">Owner</th>
                <th className="px-3 py-2 whitespace-nowrap">Environment</th>
                <th className="px-3 py-2 whitespace-nowrap">Cost Center</th>
                <th className="px-3 py-2 whitespace-nowrap">Charge Type</th>
                <th className="px-3 py-2 whitespace-nowrap">Pricing Model</th>

                <th className="px-3 py-2 whitespace-nowrap text-right">Amortized Cost</th>
                <th className="px-3 py-2 whitespace-nowrap text-right">Total Cost</th>

              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-gray-700">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-[#eef0f5] hover:bg-[#f7f5ff]"
                >

                  <td className="px-3 py-2 whitespace-nowrap">{row.subscription}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.service}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.resourceGroup}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.resourceName}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.resourceType}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.region}</td>

                  <td className="px-3 py-2 whitespace-nowrap">{row.owner}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.environment}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.costCenter}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.chargeType}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.pricingModel}</td>

                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    ${row.amortizedCost}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    ${row.totalCost}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}