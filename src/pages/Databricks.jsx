import { useState } from "react";
import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import Insights from "../components/common/Insights";
import BarChartCard from "../components/charts/BarChartCard";
import DonutChart from "../components/charts/DonutChart";
import DataTable from "../components/common/DataTable";
import GroupedBarChart from "../components/charts/GroupedBarChart";
import SankeyChart from "../components/charts/SankeyChart";

/* ─── Tabs ─── */
const TABS = ["Cluster", "SQL Warehouse", "Orphan Tables"];

/* ─── Cluster Data ─── */
const clusterKpis = [
    { title: "Cluster Savings Opportunity ($)", value: "$127,845", subtitle: "8.5% vs last month" },
    { title: "Underutilized Clusters (%)", value: "12" },
    { title: "Estimated Compute Savings ($)", value: "48" },
    { title: "Critical Waste %", value: "1,247" },
];

const clusterKpisRow2 = [
    { title: "High Value Recommendations (%)", value: "$127,845", subtitle: "8.5% vs last month" },
    { title: "Low Impact Recommendations (%)", value: "12" },
    { title: "Avg Savings per Recommendation ($)", value: "48" },
];

const workloadCategoryData = [
    { name: "Jobs Compute", totalSavings: 35000, clusterCount: 13000 },
    { name: "All Purpose Compute", totalSavings: 35000, clusterCount: 27000 },
];

const workloadTypeData = [
    { name: "Jobs Compute", value: 60 },
    { name: "All Purpose Compute", value: 40 },
];

const top10WorkspaceData = [
    { name: "Workspace_1", value: 38000 },
    { name: "Workspace_2", value: 18000 },
    { name: "Workspace_3", value: 9000 },
    { name: "Workspace_4", value: 23000 },
    { name: "Workspace_5", value: 30000 },
    { name: "Workspace_6", value: 9000 },
    { name: "Workspace_7", value: 3000 },
    { name: "Workspace_8", value: 34000 },
    { name: "Workspace_9", value: 18000 },
    { name: "Workspace_10", value: 36000 },
];

const distributionData = [
    { name: "0-10", value: 4000 },
    { name: "10-50", value: 2000 },
    { name: "100-500", value: 900 },
    { name: "1000+", value: 2500 },
    { name: "50-100", value: 3000 },
    { name: "500-1000", value: 900 },
];

const clusterInsights = [
    "Identify unused or low-utilization resources (VMs, storage, services) to reduce unnecessary costs.",
    "Detect over-provisioned resources and recommend optimal configurations to improve cost efficiency.",
    "Highlight services with the highest spend and suggest targeted actions to reduce usage or optimize configurations.",
    "Identify resources running on on-demand pricing and suggest switching to reserved or cost-efficient pricing models.",
];

const clusterTableColumns = [
    { key: "subscription", label: "Subscription" },
    { key: "service", label: "Service Name" },
    { key: "resourceGroup", label: "Resource Group" },
    { key: "resourceName", label: "Resource Name" },
    { key: "resourceType", label: "Resource Type" },
    { key: "region", label: "Region" },
    { key: "owner", label: "Owner" },
    { key: "environment", label: "Environment" },
    { key: "costCenter", label: "Cost Center" },
    { key: "chargeType", label: "Charge Type" },
    { key: "pricingModel", label: "Pricing Model" },
    { key: "amortizedCost", label: "Amortized Cost", align: "right" },
    { key: "totalCost", label: "Total Cost", align: "right" },
];

const clusterTableData = Array(20).fill({
    subscription: "PnO-Dev-Sub",
    service: "App Service",
    resourceGroup: "rg-pno-dev-eng",
    resourceName: "rg-pno-dev-eng-001",
    resourceType: "App Service",
    region: "Region 1",
    owner: "owner@c5i.ai",
    environment: "Development",
    costCenter: "CC-001",
    chargeType: "Usage",
    pricingModel: "On Demand",
    amortizedCost: "$225.29",
    totalCost: "$225.29",
});

/* ─── SQL Warehouse Data ─── */
const sqlKpis = [
    {
        title: "Cost per Query",
        value: "$127,845",
        subtitle: "8.5% vs last month",
    },
    {
        title: "DBU per Second of Execution",
        value: "12",
    },
    {
        title: "Warehouse Savings Opportunity ($)",
        value: "48",
    },
    {
        title: "Over-Provisioned Warehouses (%)",
        value: "1,247",
    },
    {
        title: "Query Success Rate",
        value: "$127,845",
        subtitle: "8.5% vs last month",
    },
    {
        title: "P95 Latency (Critical KPI)",
        value: "12",
    },
    {
        title: "Throughput (Queries per Day)",
        value: "48",
    },
];

const sqlInsights = [
    "Identify unused or low-utilization resources (VMs, storage, services) to reduce unnecessary costs.",
    "Detect over-provisioned resources and recommend optimal configurations to improve cost efficiency.",
    "Highlight services with the highest spend and suggest targeted actions to reduce usage or optimize configurations.",
    "Identify resources running on on-demand pricing and suggest switching to reserved or cost-efficient pricing models.",
];

const sqlWarehouseChartData = [
    { name: "Small", totalSavings: 3600000, clusterCount: 1500000 },
    { name: "Medium", totalSavings: 3600000, clusterCount: 1500000 },
    { name: "Large", totalSavings: 3600000, clusterCount: 1500000 },
    { name: "X_Large", totalSavings: 3600000, clusterCount: 1500000 },
    { name: "X_Small", totalSavings: 3600000, clusterCount: 1500000 },
    { name: "2X_Small", totalSavings: 3600000, clusterCount: 1500000 },
];

const sqlTableColumns = [
    { key: "subscription", label: "Subscription" },
    { key: "service", label: "Service Name" },
    { key: "resourceGroup", label: "Resource Group" },
    { key: "resourceName", label: "Resource Name" },
    { key: "resourceType", label: "Resource Type" },
    { key: "region", label: "Region" },
    { key: "owner", label: "Owner" },
    { key: "environment", label: "Environment" },
    { key: "costCenter", label: "Cost Center" },
    { key: "chargeType", label: "Charge Type" },
    { key: "pricingModel", label: "Pricing Model" },
    { key: "amortizedCost", label: "Amortized Cost", align: "right" },
    { key: "totalCost", label: "Total Cost", align: "right" },
];

const sqlTableData = Array(20).fill({
    subscription: "PnO-Dev-Sub",
    service: "App Service",
    resourceGroup: "rg-pno-dev-eng",
    resourceName: "rg-pno-dev-eng-001",
    resourceType: "App Service",
    region: "Region 1",
    owner: "owner@c5i.ai",
    environment: "Development",
    costCenter: "CC-001",
    chargeType: "Usage",
    pricingModel: "On Demand",
    amortizedCost: "$225.29",
    totalCost: "$225.29",
});

/* ─── Orphan Tables Data ─── */
const orphanKpis = [
  {
    title: "Storage Savings Opportunity ($)",
    value: "$127,845",
    subtitle: "8.5% vs last month",
  },
  {
    title: "Idle Storage (%)",
    value: "12",
  },
  {
    title: "Unused Pipeline Cost (%)",
    value: "48",
  },
  {
    title: "High Impact Savings (%)",
    value: "1,247",
  },
  {
    title: "High Value Recommendations (%)",
    value: "1,247",
  },
];


/* ─── Tabs ─── */
function ClusterTab() {
    return (
        <div className="space-y-3">

            <div className="grid grid-cols-4 gap-2">
                {clusterKpis.map((k, i) => <KPIcard key={i} {...k} />)}
            </div>

            <div className="grid grid-cols-4 gap-2">
                {clusterKpisRow2.map((k, i) => (
                    <KPIcard key={i} {...k} />
                ))}
            </div>

            <div className="flex gap-3">
                <GroupedBarChart
                    title="Savings Potential by Workload Category"
                    data={workloadCategoryData}
                    xLabel="Workload Category ($)"
                    yLabel="Workload Category ($)"
                    bars={[
                        { dataKey: "totalSavings", label: "Total Savings", color: "#6900e0" },
                        { dataKey: "clusterCount", label: "Cluster Count", color: "#C4B5FD" },
                    ]}
                />

                <DonutChart
                    title="Savings Distribution by Workload Type"
                    data={workloadTypeData}
                />
                <Insights items={clusterInsights} />
            </div>

            <div className="grid grid-cols-5 gap-4">

                {/* 🔥 BIG chart (2/3 width) */}
                <div className="col-span-3">
                    <BarChartCard
                        title="Top 10 Workspace by Savings Potential"
                        data={top10WorkspaceData}
                        height={200}
                        xLabel="Workload Space"
                        yLabel="Total Savings ($)"
                        xAxisProps={{
                            angle: -35,
                            textAnchor: "end",
                            height: 60,
                            tick: { fontSize: 10, fill: "#6b7280" },
                        }}
                    />
                </div>

                {/* 🔥 SMALL chart (1/3 width) */}
                <div className="col-span-2">
                    <BarChartCard
                        title="Distribution of Savings Opportunities"
                        data={distributionData}
                        height={200}
                        xLabel="Workload Space"
                        yLabel="Number of Clusters"
                    />
                </div>

            </div>

            <DataTable columns={clusterTableColumns} data={clusterTableData} />
        </div>
    );
}

/* ── extra data for SQL Warehouse bottom charts ── */
const sankeyData = {
    nodes: [
        { id: "Small",    label: "Small",    color: "#7C3AED" },
        { id: "2x_Small", label: "2x_Small", color: "#1D4ED8" },
        { id: "X_Small",  label: "X_Small",  color: "#EA580C" },
        { id: "Medium",   label: "Medium",   color: "#CA8A04" },
        { id: "X_Large",  label: "X_Large",  color: "#DC2626" },
        { id: "Large",    label: "Large",    color: "#16A34A" },
        { id: "keep",              label: "Keep in current warehouse",         color: "#6900e0" },
        { id: "already_smallest",  label: "Already Smallest",                  color: "#6900e0" },
        { id: "dedicated",         label: "Move client to dedicated warehouse", color: "#6900e0" },
        { id: "downsize_small_xs", label: "Downsize:small X-small",            color: "#6900e0" },
        { id: "upscale_sm",        label: "Upscale:small medium",              color: "#6900e0" },
        { id: "already_max",       label: "Already max size",                  color: "#6900e0" },
        { id: "upscale_ml",        label: "Upscale medium large",              color: "#6900e0" },
        { id: "downsize_ms",       label: "Downsize:medium small",             color: "#6900e0" },
        { id: "downsize_lxl",      label: "Downsize: large X-large",           color: "#6900e0" },
    ],
    links: [
        { source: "Small",    target: "keep",              value: 40 },
        { source: "Small",    target: "already_smallest",  value: 20 },
        { source: "Small",    target: "dedicated",         value: 15 },
        { source: "2x_Small", target: "keep",              value: 20 },
        { source: "2x_Small", target: "dedicated",         value: 15 },
        { source: "X_Small",  target: "dedicated",         value: 25 },
        { source: "X_Small",  target: "downsize_small_xs", value: 10 },
        { source: "Medium",   target: "downsize_small_xs", value: 15 },
        { source: "Medium",   target: "upscale_sm",        value: 15 },
        { source: "Medium",   target: "already_max",       value: 10 },
        { source: "X_Large",  target: "upscale_ml",        value: 20 },
        { source: "X_Large",  target: "downsize_ms",       value: 10 },
        { source: "Large",    target: "downsize_lxl",      value: 20 },
    ],
};

const recommendationCategoryData = [
    { name: "Move to\nDedicated",    value: 1500000 },
    { name: "Keep\nCurrent",         value: 300000  },
    { name: "Other",                 value: 150000  },
    { name: "Downsize\nOpportunity", value: 100000  },
    { name: "Upscale\nNeeded",       value: 120000  },
];

const clientAppData = [
    { name: "Client Application_1",  value: 38000 },
    { name: "Client Application_2",  value: 18000 },
    { name: "Client Application_3",  value: 9000  },
    { name: "Client Application_4",  value: 23000 },
    { name: "Client Application_5",  value: 30000 },
    { name: "Client Application_6",  value: 9000  },
    { name: "Client Application_7",  value: 3000  },
    { name: "Client Application_8",  value: 34000 },
    { name: "Client Application_9",  value: 18000 },
    { name: "Client Application_10", value: 38000 },
];

const productCategoryData = [
    { name: "Editor",        value: 60 },
    { name: "Visualization", value: 25 },
    { name: "ETL",           value: 15 },
];

function MultiLineTick({ x, y, payload }) {
    const lines = payload.value.split("\n");
    return (
        <g transform={`translate(${x},${y})`}>
            {lines.map((line, i) => (
                <text key={i} x={0} y={0} dy={14 + i * 13}
                    textAnchor="middle" fontSize={10} fill="#6b7280">
                    {line}
                </text>
            ))}
        </g>
    );
}

function SQLWarehouseTab() {
    return (
        <div className="space-y-3">

            {/* KPI ROW 1 */}
            <div className="grid grid-cols-4 gap-2">
                {sqlKpis.slice(0, 4).map((k, i) => <KPIcard key={i} {...k} />)}
            </div>

            {/* KPI ROW 2 */}
            <div className="grid grid-cols-4 gap-2">
                {sqlKpis.slice(4).map((k, i) => <KPIcard key={i} {...k} />)}
            </div>

            {/* ROW 1: Grouped bar (col-3) | Insights (col-2) */}
            <div className="grid grid-cols-5 gap-3 items-stretch">
                <div className="col-span-3">
                    <GroupedBarChart
                        title="Cost and DBUs by Warehouse Size"
                        data={sqlWarehouseChartData}
                        xLabel="Warehouse Size"
                        yLabel="Total Cost (USD)"
                        bars={[
                            { dataKey: "totalSavings", label: "Total Savings", color: "#6900e0" },
                            { dataKey: "clusterCount", label: "Cluster Count", color: "#C4B5FD" },
                        ]}
                    />
                </div>
                <div className="col-span-2 h-full">
                    <Insights items={sqlInsights} className="h-full" />
                </div>
            </div>

            {/* ROW 2: Sankey (col-3) | Recommendation bar (col-2) */}
            <div className="grid grid-cols-5 gap-3 items-stretch">
                <div className="col-span-3">
                    <SankeyChart
                        title="Warehouse Size to Recommendation Flow"
                        data={sankeyData}
                    />
                </div>
                <div className="col-span-2">
                    <BarChartCard
                        title="Cost Distribution by Recommendation Category"
                        data={recommendationCategoryData}
                        tickFormatter={(v) => {
                            if (Math.abs(v) >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
                            if (Math.abs(v) >= 1000)    return `${(v / 1000).toFixed(0)}k`;
                            return `${v}`;
                        }}
                        yLabel="Total Cost (USD)"
                        xLabel="Recommendation Category"
                        xAxisProps={{
                            interval: 0,
                            tick: <MultiLineTick />,
                            height: 44,
                        }}
                        height={280}
                    />
                </div>
            </div>

            {/* ROW 3: Client apps bar (col-3) | Product donut (col-2) */}
            <div className="grid grid-cols-5 gap-3 items-start">

                <div className="col-span-3">
                    <BarChartCard
                        title="Top 10 Client Applications by Cost"
                        data={clientAppData}
                        tickFormatter={(v) => `${v / 1000}k`}
                        yLabel="Total Cost (USD)"
                        xLabel="Client Application"
                        xAxisProps={{
                            angle: -35,
                            textAnchor: "end",
                            height: 75,
                            tick: { fontSize: 9, fill: "#6b7280" },
                            interval: 0,
                        }}
                        height={240}
                    />
                </div>
                <div className="col-span-2">
                    <DonutChart
                        title="Cost Distribution by Product Category"
                        data={productCategoryData}
                        colors={["#6900e0", "#1e1b6e", "#C4B5FD"]}
                        innerRadius={55}
                        outerRadius={85}
                        height={293}
                    />
                </div>
            </div>

                <DataTable columns={sqlTableColumns} data={sqlTableData} />


        </div>
    );
}

function OrphanTablesTab() {
  return (
    <div className="space-y-3">

      {/* KPI ROW (5 CARDS like screenshot) */}
      <div className="grid grid-cols-5 gap-2">
        {orphanKpis.map((k, i) => (
          <KPIcard key={i} {...k} />
        ))}
      </div>

    </div>
  );
}

/* ─── Main ─── */
export default function Databricks() {
    const [activeTab, setActiveTab] = useState("Cluster");

    return (
        <div className="w-full px-4 lg:px-6 xl:px-8">

            <div className="flex justify-between items-start mb-3">
                <div>
                    <h1 className="text-[18px] font-semibold">Databricks</h1>
                    <p className="text-[11px] text-gray-500">FinOps cost intelligence overview</p>
                </div>

                <div className="flex gap-2">
                    <FilterDropdown label="Change Period" />
                    <FilterDropdown label="Cloud Type" />
                    <FilterDropdown label="Subscription" />
                    <FilterDropdown label="Resource Group" />
                    <FilterDropdown label="Resource Name" />
                    <FilterDropdown label="Project Name" />
                </div>
            </div>

            <div className="flex items-end gap-1 border-b-2 border-[#6900e0] mb-3">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-[13px] ${activeTab === tab ? "bg-[#6900e0] text-white" : "bg-black text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Cluster" && <ClusterTab />}
            {activeTab === "SQL Warehouse" && <SQLWarehouseTab />}
            {activeTab === "Orphan Tables" && <OrphanTablesTab />}
        </div>
    );
}