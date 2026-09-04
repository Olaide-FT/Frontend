import { useState } from "react";
import { Outlet } from "react-router-dom";

import OwnerSidebar from "../pages/owner/OwnerSidebar";
import DashboardHeader from "../components/common/DashboardHeader";
import Footer from "../components/common/Footer";

function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <OwnerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

      <div className="lg:pl-72">
        <DashboardHeader workspace="Owner Workspace" onMenuClick={() => setSidebarOpen(true)}/>

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default OwnerLayout;
