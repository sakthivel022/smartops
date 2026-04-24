import KPIcard from "../components/common/KPIcard";
import FilterDropdown from "../components/common/FilterDropdown";
import TrendChart from "../components/charts/TrendChart";
import Insights from "../components/common/Insights";
import BarChartCard from "../components/charts/BarChartCard";
import DonutChart from "../components/charts/DonutChart";
import TreeMapChart from "../components/charts/TreeMapChart";
import DualLineChart from "../components/charts/DualLineChart";
import DataTable from "../components/common/DataTable";
import { useEffect, useState } from "react";
import { getFinopsData } from "../services/finopsService";

export default function FinOps() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getFinopsData().then(setData);
  }, []);

  if (!data) {
    return <div className="p-4 text-xs text-gray-500">Loading...</div>;
  }

  const subscriptionData = [
    { name: "Pn-Dev-Sub", value: 32000 },
    { name: "Pn-Prod-Sub", value: 21000 },
    { name: "Pn-Test-Sub", value: 14000 },
  ];

  const envData = [
    { name: "Development", value: 32000 },
    { name: "Production", value: 21000 },
    { name: "QA", value: 14000 },
  ];

  const resourceGroupData = [
    { name: "rg-pno-dev-api", value: 22240 },
    { name: "rg-pno-app-prod", value: 17110 },
    { name: "rg-pno-test-b", value: 14160 },
    { name: "rg-pno-app-prod2", value: 12230 },
    { name: "rg-pno-test-a", value: 11320 },
    { name: "rg-pno-dev-eng", value: 9950 },
  ];

  const amortizedData = [
    { name: "P01", total: 38000, amortized: 20000 },
    { name: "P02", total: 33000, amortized: 26000 },
    { name: "P03", total: 15000, amortized: 4000 },
    { name: "P04", total: 22000, amortized: 24000 },
    { name: "P05", total: 23000, amortized: 34000 },
  ];

  const tableData = Array(20).fill({
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
    amortizedCost: "225.29",
    totalCost: "225.29",
  });

  return (
    <div className="w-full px-4 lg:px-6 xl:px-8">

      {/* 🔥 HEADER FIXED */}
      <div className="flex justify-between items-start mb-2">

        {/* LEFT */}
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold whitespace-nowrap leading-tight">
            Executive Summary
          </h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            FinOps cost intelligence overview
          </p>
        </div>

        {/* RIGHT - NO WRAP */}
        <div className="flex gap-2 items-center flex-nowrap overflow-x-auto">
          <FilterDropdown label="Change Period" />
          <FilterDropdown label="Cloud Type" />
          <FilterDropdown label="Subscription" />
          <FilterDropdown label="Resource Group" />
          <FilterDropdown label="Resource Name" />
          <FilterDropdown label="Project Name" />
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-5 gap-2">
        <KPIcard title="Total Cost" value={`$${data.kpis.totalCost.toLocaleString()}`} subtitle="8.5% vs last month" />
        <KPIcard title="Total Subscriptions" value={data.kpis.subscriptions} />
        <KPIcard title="Resource Groups" value={data.kpis.resourceGroups} />
        <KPIcard title="Total Resources" value={data.kpis.resources.toLocaleString()} />
        <KPIcard title="Estimated Savings →" value={`$${data.kpis.savings.toLocaleString()}`} subtitle="8.5% vs last month" />
      </div>

      {/* Trend + Insights */}
      <div className="grid grid-cols-3 gap-2 mt-3 items-stretch">

        <div className="col-span-2">
          <TrendChart data={data.trend} />
        </div>

        <Insights />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <BarChartCard title="Cost by Subscription" data={subscriptionData} />
        <BarChartCard title="Spend by Environment" data={envData} />
        <DonutChart />

      </div>

      {/* Advanced */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <TreeMapChart data={resourceGroupData} />
        <DualLineChart data={amortizedData} />
      </div>

      {/* Table */}
      <div className="mt-3">
        <DataTable data={tableData} />
      </div>

    </div>
  );
}