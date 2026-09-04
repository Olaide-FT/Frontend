import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getPendingProperties } from "../../services/adminService";

function DashboardHeader({ workspace, title, onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user?.role !== "admin") {
      setPendingCount(0);
      return;
    }

    const fetchPendingCount = async () => {
      try {
        const data = await getPendingProperties();
        const items = data?.properties || data?.data || data || [];
        setPendingCount(Array.isArray(items) ? items.length : 0);
      } catch (error) {
        console.error("Failed to load admin pending count:", error);
        setPendingCount(0);
      }
    };

    fetchPendingCount();
    const intervalId = setInterval(fetchPendingCount, 15000);

    return () => clearInterval(intervalId);
  }, [user?.role]);

  const profilePath =
    user?.role === "admin"
      ? "/admin/profile"
      : user?.role === "owner"
        ? "/owner/profile"
        : "/buyer/profile";

  const notificationPath =
    user?.role === "admin"
      ? "/admin/properties/pending"
      : user?.role === "owner"
        ? "/owner/inquiries"
        : "/buyer/messages";

  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-background/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={onMenuClick}
          className="text-primary lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={23} />
        </button>

        <div className="hidden lg:block">
          <p className="font-body text-xs text-primary/40">{workspace}</p>
          <p className="mt-0.5 font-body text-sm font-semibold text-primary">
            {title || `Welcome back, ${user?.firstName || ""}`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(notificationPath)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary/60 transition hover:bg-primary/5"
            aria-label="View notifications"
          >
            <Bell size={18} />
            {pendingCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-dark">
                {pendingCount > 99 ? "99+" : pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(profilePath)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-body text-sm font-semibold text-accent transition hover:opacity-90"
            aria-label="Open profile"
          >
            {user?.firstName?.charAt(0) || "U"}
            {user?.lastName?.charAt(0) || ""}
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
