import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../pages/admin/AdminSidebar";
import DashboardHeader from "../components/common/DashboardHeader";
import Footer from "../components/common/Footer";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <DashboardHeader
          workspace="Administration"
          title="Platform Control Center"
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

export default AdminLayout;