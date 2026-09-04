import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  UserRound,
  LogOut,
  Home,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import NestoraLogo from "../../components/common/NestoraLogo";

const navigation = [
  {
    label: "Overview",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    path: "/admin/properties",
    icon: Building2,
  },
  {
    label: "Pending Approvals",
    path: "/admin/properties/pending",
    icon: ShieldCheck,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Profile",
    path: "/admin/profile",
    icon: UserRound,
  },
];

function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-dark/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 w-72 bg-dark text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <NavLink
              to="/"
              className="font-heading text-2xl font-bold"
            >
              <NestoraLogo dark />
            </NavLink>

            <button
              type="button"
              onClick={onClose}
              className="text-white/50 hover:text-white lg:hidden"
            >
              <X size={21} />
            </button>
          </div>

          {/* Admin */}

          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-body font-semibold text-dark">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>

              <div className="min-w-0">
                <p className="truncate font-body text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>

                <p className="mt-0.5 font-body text-xs capitalize text-white/40">
                  Administrator
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}

          <nav className="flex-1 px-4 py-6">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Administration
            </p>

            <div className="mt-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-3 font-body text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-accent"
                          : "text-white/55 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Bottom */}

          <div className="border-t border-white/10 p-4">
            <NavLink
              to="/properties"
              className="mb-2 flex items-center gap-3 rounded-lg px-3 py-3 font-body text-sm text-white/55 hover:bg-white/5 hover:text-white"
            >
              <Home size={18} />
              View Platform
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 font-body text-sm text-white/55 hover:bg-white/5 hover:text-red-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;