import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import c5iLogo from "../../assets/c5i-primary-logo.svg";
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
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="w-60 h-screen bg-white flex flex-col shadow-[6px_0_18px_rgba(0,0,0,0.08)]">

      {/* LOGO */}
      <div className="px-4 py-5 border-b border-[#f0f1f6] flex items-center gap-3 flex-shrink-0">
        <img src={c5iLogo} alt="C5i" className="w-16 h-16 object-contain" />

        <div className="border-l border-gray-300 h-8" />
        <div>
          <h2 className="text-[20px] font-semibold text-[#6900e0]">SmartOps</h2>
          <p className="text-[12px] text-gray-400">Cloud Intelligence</p>
        </div>
      </div>

      {/* SCROLLABLE MENU */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-[13px]">

        {/* FinOps */}
        <div>
          <div className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-[#6900e0] text-white font-medium">

            {/* LEFT → NAVIGATION */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <span>$</span> FinOps
            </div>

            {/* RIGHT → TOGGLE */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu("finops");
              }}
              className={`text-sm cursor-pointer transition-transform duration-300 ${
                openMenu === "finops" ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>

          </div>

          <div className={`overflow-hidden transition-all duration-300 ${openMenu === "finops" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            <div className="space-y-1 pl-2">
              <MenuItem icon={<Layers size={16} />}   label="Databricks"       path="/databricks"       active={location.pathname === "/databricks"} navigate={navigate} />
              <MenuItem icon={<HardDrive size={16} />} label="Storage"          path="/storage"          active={location.pathname === "/storage"} navigate={navigate} />
              <MenuItem icon={<Server size={16} />}    label="Virtual Machines" path="/virtual-machines" active={location.pathname === "/virtual-machines"} navigate={navigate} />
              <MenuItem icon={<Box size={16} />}       label="App Services"     path="/app-services"     active={location.pathname === "/app-services"} navigate={navigate} />
              <MenuItem icon={<Database size={16} />}  label="SQL Database"     path="/sql-database"     active={location.pathname === "/sql-database"} navigate={navigate} />
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
              <Activity size={16} /> IT Ops
            </div>
            <span className={`text-sm transition-transform duration-300 ${openMenu === "itops" ? "rotate-180" : ""}`}>
              ▾
            </span>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${openMenu === "itops" ? "max-h-[700px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            <div className="space-y-1 pl-2">
              <MenuItem icon={<Boxes size={16} />}     label="ADF"              path="/adf"              active={location.pathname === "/adf"} navigate={navigate} />
              <MenuItem icon={<HardDrive size={16} />} label="Storage Metrics"  path="/storage-metrics"  active={location.pathname === "/storage-metrics"} navigate={navigate} />
              <MenuItem icon={<Box size={16} />}       label="App Services"     path="/itops-app"        active={location.pathname === "/itops-app"} navigate={navigate} />
              <MenuItem icon={<Layers size={16} />}    label="Databricks"       path="/itops-databricks" active={location.pathname === "/itops-databricks"} navigate={navigate} />
              <MenuItem icon={<Server size={16} />}    label="Virtual Machines" path="/itops-vms"        active={location.pathname === "/itops-vms"} navigate={navigate} />
              <MenuItem icon={<Cpu size={16} />}       label="ML Ops"           path="/ml-ops"           active={location.pathname === "/ml-ops"} navigate={navigate} />
              <MenuItem icon={<GitBranch size={16} />} label="Dev Ops"          path="/dev-ops"          active={location.pathname === "/dev-ops"} navigate={navigate} />
              <MenuItem icon={<Database size={16} />}  label="Orphan Table"     path="/orphan-table"     active={location.pathname === "/orphan-table"} navigate={navigate} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MenuItem({ icon, label, path, active, navigate }) {
  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${
          active
            ? "bg-[#6900e0]/10 text-[#6900e0] font-semibold"
            : "text-gray-600 hover:bg-[#f6f4ff]"
        }`}
    >
      <div className={active ? "text-[#6900e0]" : "text-gray-500"}>{icon}</div>
      <span>{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6900e0]" />}
    </div>
  );
}