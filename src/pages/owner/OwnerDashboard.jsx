import { useEffect, useState } from "react";
import {
  Building2,
  Clock3,
  CheckCircle2,
  MessageSquare,
  Plus,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import OwnerStatCard from "../../components/owner/OwnerStatCard";
import { getMyProperties } from "../../services/ownerPropertyService";
import { getReceivedInquiries } from "../../services/inquiryService";
import { formatPrice } from "../../utils/formatPrice";

function OwnerDashboard() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propData, inquiryData] = await Promise.all([
          getMyProperties(),
          getReceivedInquiries(),
        ]);

        setProperties(
          propData?.properties || propData?.data || propData || []
        );
        setInquiryCount(
          inquiryData?.count ?? (inquiryData?.inquiries?.length || 0)
        );
      } catch (error) {
        console.error("Failed to load owner dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const approvedCount = properties.filter(
    (property) =>
      ["approved", "active"].includes(
        String(property.approvalStatus || property.status || "pending").toLowerCase()
      )
  ).length;

  const pendingCount = properties.filter(
    (property) =>
      String(property.approvalStatus || property.status || "pending").toLowerCase() ===
      "pending"
  ).length;

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Owner Workspace
            </p>

            <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
              Welcome, {user?.firstName}
            </h1>

            <p className="mt-2 font-body text-sm text-primary/45">
              Manage your properties and stay on top of inquiries.
            </p>
          </div>

          <Link
            to="/owner/properties/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-body text-sm font-semibold text-white"
          >
            <Plus size={17} />
            Add Property
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <OwnerStatCard
            label="Total Properties"
            value={loading ? "—" : properties.length}
            description="Your current listings"
            icon={Building2}
          />

          <OwnerStatCard
            label="Approved"
            value={loading ? "—" : approvedCount}
            description="Active listings"
            icon={CheckCircle2}
          />

          <OwnerStatCard
            label="Pending"
            value={loading ? "—" : pendingCount}
            description="Awaiting moderation"
            icon={Clock3}
          />

          <OwnerStatCard
            label="Inquiries"
            value={loading ? "—" : inquiryCount}
            description="Property inquiries"
            icon={MessageSquare}
          />
        </div>

        <div className="mt-10 rounded-xl border border-primary/10 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-primary/10 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Your Properties
              </h2>

              <p className="mt-1 font-body text-sm text-primary/40">
                Manage your latest property listings.
              </p>
            </div>

            <Link
              to="/owner/properties"
              className="flex items-center gap-2 font-body text-xs font-semibold text-accent"
            >
              View all
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
          ) : properties.length ? (
            <div className="divide-y divide-primary/10">
              {properties.slice(0, 5).map((property) => (
                <div
                  key={property._id || property.id}
                  className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-body text-sm font-semibold text-primary">
                      {property.title ||
                        "Untitled Property"}
                    </h3>

                    <p className="mt-1 font-body text-xs text-primary/40">
                      {property.location ||
                        "Location unavailable"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-heading text-lg font-bold text-primary">
                      {formatPrice(property.price)}
                    </span>

                    <Link
                      to={`/owner/properties/${
                        property._id || property.id
                      }/edit`}
                      className="rounded-lg border border-primary/10 px-4 py-2 font-body text-xs font-semibold text-primary"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <Building2
                size={28}
                className="mx-auto text-primary/20"
              />

              <h3 className="mt-4 font-heading text-xl font-bold text-primary">
                No properties yet
              </h3>

              <p className="mt-2 font-body text-sm text-primary/40">
                Add your first property to get started.
              </p>

              <Link
                to="/owner/properties/add"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-body text-xs font-semibold text-white"
              >
                <Plus size={15} />
                Add Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OwnerDashboard;