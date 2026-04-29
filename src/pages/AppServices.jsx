import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import Insights from "../components/common/Insights";
import PieChartCard from "../components/charts/PieChartCard";
import DataTable from "../components/common/DataTable";

// ─── KPIs ─────────────────────────────────────────────────────────────────────
const kpis = [
  { title: "Over Provisioned Apps", value: "27",    subtitle: "8.5% vs last month", trend: "up" },
  { title: "App Service Cost",      value: "$2.11K" },
  { title: "App Service Savings",   value: "$2.11K" },
  { title: "Optimization Rate %",   value: "59.45"  },
];

// ─── Pie chart data ───────────────────────────────────────────────────────────
const currentPricingData = [
  { name: "On Demand",   value: 60 },
  { name: "Reserved",    value: 25 },
  { name: "Savings Plan",value: 15 },
];

const recommendedPricingData = [
  { name: "Savings Plan", value: 70 },
  { name: "Reserved",     value: 30 },
];

const CURRENT_COLORS     = ["#6900e0", "#4C1D95", "#C4B5FD"];
const RECOMMENDED_COLORS = ["#6900e0", "#4C1D95"];

// ─── Insights ─────────────────────────────────────────────────────────────────
const appInsights = [
  "Identify unused or low-utilization resources (VMs, storage, services) to reduce unnecessary costs.",
  "Detect over-provisioned resources and recommend optimal configurations to improve cost efficiency.",
  "Highlight services with the highest spend and suggest targeted actions to reduce usage or optimize configurations.",
  "Identify resources running on on-demand pricing and suggest switching to reserved or cost-efficient pricing models.",
];

// ─── Table ────────────────────────────────────────────────────────────────────
const TABLE_COLUMNS = [
  { key: "subscription",        label: "Subscriptions"           },
  { key: "appService",          label: "App Service"             },
  { key: "currentSku",          label: "Current SKU"             },
  { key: "eventType",           label: "Event Type"              },
  { key: "currentPricing",      label: "Current Pricing Model"   },
  { key: "recommendedPricing",  label: "Recommended Pricing Model"},
  { key: "recommendation",      label: "Recommendation"          },
];

const tableData = Array(10).fill({
  subscription:       "PnO-Dev-Sub",
  appService:         "app-pno-dev-001",
  currentSku:         "p1 v3",
  eventType:          "Cost Optimization",
  currentPricing:     "On Demand",
  recommendedPricing: "Savings Plan",
  recommendation:     "Switch pricing from On demand to Savings plan",
});

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AppServices() {
  return (
    <div className="w-full px-4 lg:px-6 xl:px-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-[18px] font-semibold leading-tight">App services</h1>
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

      {/* KPI row — 4 cards */}
      <div className="grid grid-cols-4 gap-2">
        {kpis.map((k, i) => <KPIcard key={i} {...k} />)}
      </div>

      {/* Charts row: CurrentPie | RecommendedPie | Insights */}
      <div className="grid grid-cols-3 gap-3 mt-3 items-stretch">
        <PieChartCard
          title="Current Pricing Model"
          data={currentPricingData}
          colors={CURRENT_COLORS}
        />
        <PieChartCard
          title="Recommended Pricing Model"
          data={recommendedPricingData}
          colors={RECOMMENDED_COLORS}
        />
        <Insights title="Insights" items={appInsights} className="h-full" />
      </div>

      {/* Table */}
      <div className="mt-3">
        <DataTable
          title="Tier Recommendations"
          columns={TABLE_COLUMNS}
          data={tableData}
          height={300}
        />
      </div>

    </div>
  );
}