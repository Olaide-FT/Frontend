import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  UserCheck,
  Clock3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import AdminStatCard from "../../pages/admin/AdminStatCard";
import ApprovalBadge from "../../pages/admin/ApprovalBadge";

import {
  getAdminStats,
  getPendingProperties,
} from "../../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    buyers: 0,
    owners: 0,
    properties: 0,
    pendingProperties: 0,
  });

  const [pendingProperties, setPendingProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          statsData,
          pendingData,
        ] = await Promise.all([
          getAdminStats(),
          getPendingProperties(),
        ]);

        const normalizedStats =
          statsData?.stats ||
          statsData?.data ||
          statsData ||
          {};

        setStats({
          users:
            normalizedStats.users ??
            normalizedStats.totalUsers ??
            0,
          buyers:
            normalizedStats.buyers ??
            normalizedStats.totalBuyers ??
            0,
          owners:
            normalizedStats.owners ??
            normalizedStats.totalOwners ??
            0,
          properties:
            normalizedStats.properties ??
            normalizedStats.totalProperties ??
            0,
          pendingProperties:
            normalizedStats.pendingProperties ??
            normalizedStats.pending ??
            0,
        });

        setPendingProperties(
          pendingData?.properties ||
            pendingData?.data ||
            pendingData ||
            []
        );
      } catch (error) {
        console.error(
          "Failed to load admin dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    const refreshInterval = setInterval(() => {
      loadDashboard();
    }, 15000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Platform Overview
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
            Admin Dashboard
          </h1>

          <p className="mt-2 font-body text-sm text-primary/45">
            Monitor and manage Nestora from one place.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label="Total Users"
            value={
              loading ? "—" : stats.users ?? 0}
            description="Registered platform users"
            icon={Users}
          />

          <AdminStatCard
            label="Properties"
            value={
              loading
                ? "—"
                : stats.properties ?? 0
            }
            description="Total property listings"
            icon={Building2}
          />

          <AdminStatCard
            label="Owners"
            value={
              loading ? "—" : stats.owners ?? 0
            }
            description="Registered property owners"
            icon={UserCheck}
          />

          <AdminStatCard
            label="Pending"
            value={
              loading
                ? "—"
                : stats.pendingProperties ?? 0
            }
            description="Awaiting approval"
            icon={Clock3}
          />
        </div>

        <div className="mt-10 rounded-xl border border-primary/10 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-primary/10 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Pending Approvals
              </h2>

              <p className="mt-1 font-body text-sm text-primary/40">
                Listings waiting for moderation.
              </p>
            </div>

            <Link
              to="/admin/properties/pending"
              className="flex items-center gap-2 font-body text-xs font-semibold text-accent"
            >
              Review all
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-lg bg-primary/5"
                />
              ))}
            </div>
          ) : pendingProperties.length ? (
            <div className="divide-y divide-primary/10">
              {pendingProperties
                .slice(0, 5)
                .map((property) => (
                  <div
                    key={
                      property._id ||
                      property.id
                    }
                    className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="font-body text-sm font-semibold text-primary">
                        {property.title || "Untitled Property"}
                      </h3>

                      <p className="mt-1 font-body text-xs text-primary/40">
                        {property.location ||
                          property.address ||
                          [property.city, property.state].filter(Boolean).join(", ") ||
                          "Location unavailable"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <ApprovalBadge
                        status={
                          property.approvalStatus || property.status || "pending"
                        }
                      />

                      <Link
                        to={`/admin/properties/pending`}
                        className="rounded-lg border border-primary/10 px-4 py-2 font-body text-xs font-semibold text-primary"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <ShieldCheck
                size={30}
                className="mx-auto text-primary/20"
              />

              <h3 className="mt-4 font-heading text-xl font-bold text-primary">All caught up </h3>

              <p className="mt-2 font-body text-sm text-primary/40">
                There are no properties waiting for approval.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;