import { useState } from "react";
import { Outlet } from "react-router-dom";

import BuyerSidebar from "../pages/buyer/BuyerSidebar";
import DashboardHeader from "../components/common/DashboardHeader";
import Footer from "../components/common/Footer";

function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <BuyerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <DashboardHeader
          workspace="Buyer Workspace"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default BuyerLayout;
