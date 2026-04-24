import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-[240px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#f5f6fa] overflow-hidden">

        {/* THIS FIXES PAGE SCROLL ISSUE */}
        <div className="p-6 h-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>

      </div>
    </div>
  );
}