import { useState } from "react";
import {
  Database,
  HardDrive,
  Server,
  Box,
  Layers,
  Activity,
  GitBranch,
  Cpu,
  Boxes,
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("finops");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="w-60 h-screen bg-white flex flex-col shadow-[6px_0_18px_rgba(0,0,0,0.08)]">

      {/* LOGO */}
      <div className="px-4 py-5 border-b border-[#f0f1f6] flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 bg-[#6900e0]/10 rounded-md flex items-center justify-center text-[#6900e0] font-bold">
          C5i
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        <div>
          <h2 className="text-[20px] font-semibold text-[#6900e0]">
            SmartOps
          </h2>
          <p className="text-[12px] text-gray-400">
            Cloud Intelligence
          </p>
        </div>
      </div>

      {/* ✅ SCROLLABLE MENU */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-[13px]">

        {/* FinOps */}
        <div>
          <div
            onClick={() => toggleMenu("finops")}
            className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-[#6900e0] text-white font-medium cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>$</span>
              FinOps
            </div>

            <span
              className={`text-sm transition-transform duration-300 ${
                openMenu === "finops" ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </div>

          {/* ✅ NO HEIGHT LIMIT */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openMenu === "finops"
                ? "max-h-[500px] opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-1 pl-2">
              <MenuItem icon={<Layers size={16} />} label="Databricks" />
              <MenuItem icon={<HardDrive size={16} />} label="Storage" />
              <MenuItem icon={<Server size={16} />} label="Virtual Machines" />
              <MenuItem icon={<Box size={16} />} label="App Services" />
              <MenuItem icon={<Database size={16} />} label="SQL Database" />
            </div>
          </div>
        </div>

        {/* IT Ops */}
        <div>
          <div
            onClick={() => toggleMenu("itops")}
            className="flex justify-between items-center px-3 py-2.5 rounded-lg text-gray-700 font-medium cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <Activity size={16} />
              IT Ops
            </div>

            <span
              className={`text-sm transition-transform duration-300 ${
                openMenu === "itops" ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </div>

          {/* ✅ FIX: increased height */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openMenu === "itops"
                ? "max-h-[700px] opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-1 pl-2">
              <MenuItem icon={<Boxes size={16} />} label="ADF" />
              <MenuItem icon={<HardDrive size={16} />} label="Storage Metrics" />
              <MenuItem icon={<Box size={16} />} label="App Services" />
              <MenuItem icon={<Layers size={16} />} label="Databricks" />
              <MenuItem icon={<Server size={16} />} label="Virtual Machines" />
              <MenuItem icon={<Cpu size={16} />} label="ML Ops" />
              <MenuItem icon={<GitBranch size={16} />} label="Dev Ops" />
              <MenuItem icon={<Database size={16} />} label="Orphan Table" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f6f4ff] cursor-pointer transition">
      <div className="text-gray-500">{icon}</div>
      <span>{label}</span>
    </div>
  );
}