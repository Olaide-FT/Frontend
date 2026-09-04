import { useEffect, useState } from "react";
import {
  Heart,
  MessageSquare,
  Search,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../pages/buyer/StatCard";
import { getFavorites } from "../../services/favoriteService";
import { getMySentInquiries } from "../../services/inquiryService";

function BuyerDashboard() {
  const { user } = useAuth();
  const [favCount, setFavCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [favData, inquiryData] = await Promise.all([
          getFavorites(),
          getMySentInquiries(),
        ]);
        setFavCount(favData?.count ?? (favData?.favorites?.length || 0));
        setInquiryCount(
          inquiryData?.count ?? (inquiryData?.inquiries?.length || 0)
        );
      } catch (error) {
        console.error("Failed to load buyer stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="lg:hidden">
          <p className="font-body text-xs text-primary/40">
            Buyer Workspace
          </p>

          <h1 className="mt-1 font-heading text-3xl font-bold text-primary">
            Welcome, {user?.firstName}
          </h1>
        </div>

        <div className="rounded-xl bg-primary p-7 text-white sm:p-10">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Find your next place
            </p>

            <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              What kind of property are you looking for?
            </h1>

            <p className="mt-3 font-body text-sm leading-6 text-white/60">
              Explore available properties and save the ones
              that catch your eye.
            </p>

            <Link
              to="/properties"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-body text-sm font-semibold text-dark"
            >
              Browse Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Saved Properties"
            value={statsLoading ? "—" : favCount}
            description="Properties you've saved"
            icon={Heart}
          />

          <StatCard
            label="Active Inquiries"
            value={statsLoading ? "—" : inquiryCount}
            description="Awaiting a response"
            icon={MessageSquare}
          />

          <StatCard
            label="Properties Viewed"
            value="—"
            description="Recently explored"
            icon={Search}
          />
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-primary/10 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary">
                  Recent Inquiries
                </h2>

                <p className="mt-1 font-body text-sm text-primary/40">
                  Keep track of your property conversations.
                </p>
              </div>

              <Link
                to="/buyer/messages"
                className="font-body text-xs font-semibold text-accent"
              >
                View all
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary/40">
                <MessageSquare size={22} />
              </div>

              <h3 className="mt-4 font-body text-sm font-semibold text-primary">
                No inquiries yet
              </h3>

              <p className="mt-1 max-w-sm font-body text-xs leading-5 text-primary/40">
                When you contact an owner about a property,
                your conversations will appear here.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 bg-white p-6">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Quick Search
            </h2>

            <p className="mt-1 font-body text-sm text-primary/40">
              Start exploring properties.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/properties"
                className="flex items-center justify-between rounded-lg border border-primary/10 p-4 transition hover:border-accent"
              >
                <span className="flex items-center gap-3">
                  <MapPin
                    size={18}
                    className="text-accent"
                  />

                  <span className="font-body text-sm font-medium text-primary">
                    Properties in Lagos
                  </span>
                </span>

                <ArrowRight size={16} />
              </Link>

              <Link
                to="/properties"
                className="flex items-center justify-between rounded-lg border border-primary/10 p-4 transition hover:border-accent"
              >
                <span className="flex items-center gap-3">
                  <Search
                    size={18}
                    className="text-accent"
                  />

                  <span className="font-body text-sm font-medium text-primary">
                    Browse all properties
                  </span>
                </span>

                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuyerDashboard;