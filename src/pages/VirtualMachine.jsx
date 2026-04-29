import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import DonutCountChart from "../components/charts/DonutCountChart";
import StackedBarChart from "../components/charts/StackedBarChart";
import DataTable from "../components/common/DataTable";

/* ─── KPI Data ─── */
const vmKpis = [
  { title: "Total Virtual Machines", value: "24" },
  { title: "Total Savings",          value: "$4.5k" },
  { title: "Reservation Waste",      value: "$1.48k" },
  { title: "Reservation Utilization",value: "41.38%" },
];

/* ─── VM Status ─── */
const vmStatusData = [
  { name: "Operational", value: 18 },
  { name: "Idle",        value: 6  },
];

/* ─── Stacked bar data ─── */
const currentDistribution = [
  { label: "OnDemand",    value: 83.33, color: "#6900e0" },
  { label: "Reserved",    value: 8.33,  color: "#C4B5FD" },
  { label: "SavingsPlan", value: 8.33,  color: "#1e1b6e" },
];

const recommendedDistribution = [
  { label: "Reserved",    value: 91.07, color: "#C4B5FD" },
  { label: "SavingsPlan", value: 8.33,  color: "#1e1b6e" },
];

/* ─── Table ─── */
const tableColumns = [
  { key: "subscription",       label: "Subscription"          },
  { key: "resource",           label: "Resource"               },
  { key: "vmFamily",           label: "VM Family"              },
  { key: "vmSeries",           label: "VM Series"              },
  { key: "vmSku",              label: "VM SKU"                 },
  { key: "currentVmType",      label: "Current VM Type"        },
  { key: "currentVmVersion",   label: "Current VM Version"     },
  { key: "avgCpu",             label: "AvgCPU %",    align: "right" },
  { key: "avgMemory",          label: "AvgMemory %", align: "right" },
  { key: "pricingModel",       label: "Current Pricing Model"  },
  { key: "recommendation",     label: "Recommendation"         },
  { key: "recommendationSize", label: "Recommendation size"    },
];

const tableData = Array(10).fill({
  subscription:       "PnO-Dev-Sub",
  resource:           "vm-pno-dev-003",
  vmFamily:           "Ed",
  vmSeries:           "d",
  vmSku:              "E8d v4",
  currentVmType:      "Standard_E8d_v4",
  currentVmVersion:   "v4",
  avgCpu:             "46.46",
  avgMemory:          "52.08",
  pricingModel:       "SavingsPlan",
  recommendation:     "ScaleUp",
  recommendationSize: "small",
});

/* ─── Page ─── */
export default function VirtualMachine() {
  return (
    <div className="w-full px-4 lg:px-6 xl:px-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-[18px] font-semibold">Virtual Machine</h1>
          <p className="text-[11px] text-gray-500">FinOps cost intelligence overview</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <FilterDropdown label="Change Period" />
          <FilterDropdown label="VM Family" />
          <FilterDropdown label="VM Series" />
          <FilterDropdown label="VM Version" />
          <FilterDropdown label="SKU" />
        </div>
      </div>

      <div className="space-y-3">

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-2">
          {vmKpis.map((k, i) => <KPIcard key={i} {...k} />)}
        </div>

        {/* Charts Row — col ratio 2:3:3 matches Figma 300:412:408px */}
        <div className="grid grid-cols-8 gap-3">
          <div className="col-span-2">
            <DonutCountChart
              title="VM Status"
              data={vmStatusData}
              colors={["#6900e0", "#C4B5FD"]}
              innerRadius={35}
              outerRadius={55}
              centerLabel="Total VMs"
            />
          </div>
          <div className="col-span-3">
            <StackedBarChart
              title="VM Current Distribution based on the pricing model"
              segments={currentDistribution}
            />
          </div>
          <div className="col-span-3">
            <StackedBarChart
              title="VM Recommended Distribution"
              segments={recommendedDistribution}
            />
          </div>
        </div>

        {/* Table */}
        <DataTable
          title="Utilization Based Recommendations"
          columns={tableColumns}
          data={tableData}
          height={320}
        />

      </div>
    </div>
  );
}