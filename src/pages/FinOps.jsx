import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import TrendChart from "../components/charts/TrendChart";
import Insights from "../components/common/Insights";
import BarChartCard from "../components/charts/BarChartCard";
import DonutChart from "../components/charts/DonutChart";
import TreeMapChart from "../components/charts/TreeMapChart";
import DualLineChart from "../components/charts/DualLineChart";
import DataTable from "../components/common/DataTable";

// ─── KPI data (was in finopsService.js) ───────────────────────────────────────
const kpis = {
  totalCost:      127845,
  subscriptions:  12,
  resourceGroups: 48,
  resources:      1247,
  savings:        18234,
};

// ─── Chart data ────────────────────────────────────────────────────────────────
const trendData = [
  { name: "P01", value: 22000 },
  { name: "P02", value: 27000 },
  { name: "P03", value: 13000 },
  { name: "P04", value: 33000 },
];

const subscriptionData = [
  { name: "Pn-Dev-Sub",  value: 32000 },
  { name: "Pn-Prod-Sub", value: 21000 },
  { name: "Pn-Test-Sub", value: 14000 },
];

const envData = [
  { name: "Development", value: 32000 },
  { name: "Production",  value: 21000 },
  { name: "QA",          value: 14000 },
];

const serviceData = [
  { name: "Databricks",      value: 3000 },
  { name: "Virtual Machine", value: 3000 },
  { name: "App Service",     value: 3000 },
  { name: "Storage Account", value: 3000 },
];

const resourceGroupData = [
  { name: "rg-pno-dev-api",   value: 22240 },
  { name: "rg-pno-app-prod",  value: 17110 },
  { name: "rg-pno-test-b",    value: 14160 },
  { name: "rg-pno-app-prod2", value: 12230 },
  { name: "rg-pno-test-a",    value: 11320 },
  { name: "rg-pno-dev-eng",   value: 9950  },
];

const amortizedData = [
  { name: "P01", total: 38000, amortized: 20000 },
  { name: "P02", total: 33000, amortized: 26000 },
  { name: "P03", total: 15000, amortized: 4000  },
  { name: "P04", total: 22000, amortized: 24000 },
  { name: "P05", total: 23000, amortized: 34000 },
];

const amortizedLines = [
  { dataKey: "total",     color: "#22c55e", label: "Total Cost" },
  { dataKey: "amortized", color: "#6900e0", label: "Amortized"  },
];

// ─── Table ─────────────────────────────────────────────────────────────────────
const TABLE_COLUMNS = [
  { key: "subscription",  label: "Subscription"   },
  { key: "service",       label: "Service Name"   },
  { key: "resourceGroup", label: "Resource Group" },
  { key: "resourceName",  label: "Resource Name"  },
  { key: "resourceType",  label: "Resource Type"  },
  { key: "region",        label: "Region"         },
  { key: "owner",         label: "Owner"          },
  { key: "environment",   label: "Environment"    },
  { key: "costCenter",    label: "Cost Center"    },
  { key: "chargeType",    label: "Charge Type"    },
  { key: "pricingModel",  label: "Pricing Model"  },
  { key: "amortizedCost", label: "Amortized Cost", align: "right" },
  { key: "totalCost",     label: "Total Cost",     align: "right" },
];

const tableData = Array(20).fill({
  subscription:  "PnO-Dev-Sub",
  service:       "App Service",
  resourceGroup: "rg-pno-dev-eng",
  resourceName:  "rg-pno-dev-eng-001",
  resourceType:  "App Service",
  region:        "Region 1",
  owner:         "owner@c5i.ai",
  environment:   "Development",
  costCenter:    "CC-001",
  chargeType:    "Usage",
  pricingModel:  "On Demand",
  amortizedCost: "$225.29",
  totalCost:     "$225.29",
});

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function FinOps() {
  return (
    <div className="w-full px-4 lg:px-6 xl:px-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-[18px] font-semibold leading-tight">Executive Summary</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">FinOps cost intelligence overview</p>
        </div>
        <div className="flex gap-2 items-center flex-nowrap">
          <FilterDropdown label="Change Period" />
          <FilterDropdown label="Cloud Type" />
          <FilterDropdown label="Subscription" />
          <FilterDropdown label="Resource Group" />
          <FilterDropdown label="Resource Name" />
          <FilterDropdown label="Project Name" />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-2">
        <KPIcard title="Total Cost"          value={`$${kpis.totalCost.toLocaleString()}`} subtitle="8.5% vs last month" trend="down" />
        <KPIcard title="Total Subscriptions" value={kpis.subscriptions} />
        <KPIcard title="Resource Groups"     value={kpis.resourceGroups} />
        <KPIcard title="Total Resources"     value={kpis.resources.toLocaleString()} />
        <KPIcard title="Estimated Savings →" value={`$${kpis.savings.toLocaleString()}`}  subtitle="8.5% vs last month" trend="up" />
      </div>

      {/* Trend + Insights */}
      <div className="grid grid-cols-3 gap-2 mt-3 items-stretch">
        <div className="col-span-2 bg-white rounded-[4px] border border-[#BC9BEC] shadow-[1px_1px_24px_rgba(12,12,12,0.08)] p-3 flex flex-col gap-2">
          <h3 className="text-[13px] font-semibold flex-shrink-0">Periodic Trend Analysis</h3>
          <div className="flex-1 min-h-0">
            <TrendChart data={trendData} />
          </div>
        </div>
        <Insights />
      </div>

      {/* Bar charts + Donut */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <BarChartCard title="Cost by Subscription" data={subscriptionData} />
        <BarChartCard title="Spend by Environment"  data={envData} />
        <DonutChart   title="Spend by Service"      data={serviceData} />
      </div>

      {/* TreeMap + DualLine */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <TreeMapChart  title="Spent by Resource Group" data={resourceGroupData} />
        <DualLineChart title="Amortized vs Total Cost" data={amortizedData} lines={amortizedLines} />
      </div>

      {/* Table */}
      <div className="mt-3">
        <DataTable title="Cost Breakdown" columns={TABLE_COLUMNS} data={tableData} />
      </div>

    </div>
  );
}