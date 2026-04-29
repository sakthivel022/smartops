import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";

// ─── KPI Row 1 ────────────────────────────────────────────────────────────────
const kpisRow1 = [
  { title: "Estimated Waste Cost ($)",   value: "$127,845" },
  { title: "Underutilized Pipelines (%)",value: "12%"      },
  { title: "Critical Waste (%)",         value: "48%"      },
  { title: "Retry Waste Indicator (%)",  value: "16%"      },
];

// ─── KPI Row 2 ────────────────────────────────────────────────────────────────
const kpisRow2 = [
  { title: "Average Pipeline Duration Trend", value: "--"   },
  { title: "Idle Trigger Rate (%)",            value: "25%" },
  { title: "Avg Savings per Optimization ($)", value: "48%" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Others() {
  return (
    <div className="w-full px-4 lg:px-6 xl:px-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-[18px] font-semibold leading-tight">Databricks</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">FinOps cost intelligence overview</p>
        </div>
        <div className="flex gap-2 items-center flex-nowrap">
          <FilterDropdown label="Change Period" />
          <FilterDropdown label="Subscription" />
          <FilterDropdown label="Resource Group" />
          <FilterDropdown label="Resource Name" />
          <FilterDropdown label="Project Name" />
        </div>
      </div>

      {/* KPI Row 1 — 4 cards */}
      <div className="grid grid-cols-4 gap-2">
        {kpisRow1.map((k, i) => <KPIcard key={i} {...k} />)}
      </div>

      {/* KPI Row 2 — 3 cards in 4-col grid so same width as row 1 */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {kpisRow2.map((k, i) => <KPIcard key={i} {...k} />)}
      </div>

    </div>
  );
}