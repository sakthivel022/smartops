import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import Insights from "../components/common/Insights";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import PieChartCard from "../components/charts/PieChartCard";
import TreeMapChart from "../components/charts/TreeMapChart";
import DataTable from "../components/common/DataTable";

// ─── KPI data ─────────────────────────────────────────────────────────────────
const kpis = [
    { title: "Space Acquired (GB)", value: "27", subtitle: "8.5% vs last month", trend: "down" },
    { title: "Stale Data (GB)", value: "27" },
    { title: "Hot Date %", value: "27" },
    { title: "Files Needing Optimization", value: "12%" },
    { title: "Estimated Storage Savings", value: "$2.11K" },
];

// ─── Horizontal bar chart data ────────────────────────────────────────────────
const sqlSavingsData = [
    { name: "Storage Account 1", value: 2.3 },
    { name: "Storage Account 2", value: 1.2 },
    { name: "Storage Account 3", value: 1.7 },
    { name: "Storage Account 4", value: 0.6 },
    { name: "Storage Account 5", value: 1.6 },
];

// ─── Insights ─────────────────────────────────────────────────────────────────
const storageInsights = [
    "Identify unused or low-utilization resources (VMs, storage, services) to reduce unnecessary costs.",
    "Detect over-provisioned resources and recommend optimal configurations to improve cost efficiency.",
    "Highlight services with the highest spend and suggest targeted actions to reduce usage or optimize configurations.",
    "Identify resources running on on-demand pricing and suggest switching to reserved or cost-efficient pricing models.",
];

// ─── TreeMap data ─────────────────────────────────────────────────────────────
const accessTierData = [
    { name: "Hot", value: 5000.56 },
    { name: "Cool", value: 2500.34 },
    { name: "Archive", value: 1500.34 },
];

// ─── Donut data ───────────────────────────────────────────────────────────────
const accessFrequencyData = [
    { name: "Warm", value: 40 },
    { name: "Active", value: 25 },
    { name: "Inactive", value: 20 },
    { name: "Cold", value: 15 },
];

const ACCESS_COLORS = ["#7C3AED", "#4C1D95", "#A78BFA", "#C4B5FD"];

// ─── Table ────────────────────────────────────────────────────────────────────
const TABLE_COLUMNS = [
    { key: "subscription", label: "Subscription Name" },
    { key: "resourceGroup", label: "Resource Group" },
    { key: "storageAccount", label: "Storage Account Name" },
    { key: "fileName", label: "File Name" },
    { key: "folderName", label: "Folder Name" },
    { key: "fullPath", label: "Full Path" },
    { key: "fileSizeGb", label: "File Size GB" },
    { key: "accessTier", label: "Access Tier" },
    { key: "accessFrequency", label: "Access Frequency" },
    { key: "recommendedTier", label: "Recommended Tier" },
    { key: "daysSinceLastAccess", label: "Days Since Last Access" },
    { key: "needsOptimization", label: "Needs Optimization" },
    { key: "estimatedSavings", label: "Estimated SQL DB Savings" },
];

const tableData = Array(10).fill({
    subscription: "PnO-Dev-Sub",
    resourceGroup: "rg-pno-test-b",
    storageAccount: "st-pno-test-001",
    fileName: "deployment 0001.zip",
    folderName: "Backup",
    fullPath: "backup/deployment_001.zip",
    fileSizeGb: "1.34",
    accessTier: "Hot",
    accessFrequency: "Warm",
    recommendedTier: "Cool",
    daysSinceLastAccess: "45",
    needsOptimization: "1",
    estimatedSavings: "0.56%",
});

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Storage() {
    return (
        <div className="w-full px-4 lg:px-6 xl:px-8">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h1 className="text-[18px] font-semibold leading-tight">Storage</h1>
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

            {/* KPI row — 5 cards */}
            <div className="grid grid-cols-5 gap-2">
                {kpis.map((k, i) => <KPIcard key={i} {...k} />)}
            </div>

            {/* Row 2: Horizontal bar (col-2) | Insights (col-1) */}
            <div className="grid grid-cols-3 gap-3 mt-3 items-stretch">
                <div className="col-span-2">
                    <HorizontalBarChart
                        title="Estimated SQL DB Savings by Storage Account Name"
                        data={sqlSavingsData}
                        labelFormatter={(v) => `${v} %`}
                        height={220}
                    />
                </div>
                <Insights title="Insights" items={storageInsights} className="h-full" />
            </div>

            {/* Row 3: TreeMap (col-2) | Donut (col-1) */}
            <div className="grid grid-cols-3 gap-3 mt-3 items-stretch">
                <div className="col-span-2">
                    <TreeMapChart
                        title="Total Storage DB by Access Tier"
                        data={accessTierData}
                        colors={["#3b008f", "#6900e0", "#4f00b8"]}
                        height={200}
                    />
                </div>
                <div className="col-span-1 h-full">
                    <PieChartCard
                        title="File Count by Access Frequency"
                        data={accessFrequencyData}
                        colors={ACCESS_COLORS}
                    />
                </div>
            </div>

            {/* Row 4: Full-width table */}
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