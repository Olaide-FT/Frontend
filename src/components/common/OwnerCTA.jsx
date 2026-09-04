import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function OwnerCTA() {
  const { user } = useAuth();
  const isBuyer = user?.role?.toLowerCase() === "buyer";

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-dark">
        <div className="relative px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {isBuyer ? "Find your next home" : "For Property Owners"}
            </p>

            <h2 className="mt-4 font-body text-4xl font-bold tracking-tight text-white sm:text-3xl">
              {isBuyer ? "Ready to discover a place you love?" : "Have a property to list?"}
            </h2>

            <p className="mt-5 max-w-xl font-body text-sm leading-7 text-white/50">
              {isBuyer
                ? "Explore verified properties, save your favourites and find a space that fits your lifestyle."
                : "Put your property in front of people actively searching for their next home or investment."}
            </p>

            <Link
              to={isBuyer ? "/properties" : "/register?role=owner"}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-body text-sm font-semibold text-dark"
            >
              {isBuyer ? "Explore Properties" : "List Your Property"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerCTA;