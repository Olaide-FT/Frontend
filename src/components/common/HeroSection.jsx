import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import PropertySearch from "../property/PropertySearch";

function HeroSection({
  filters,
  setFilters,
  onSearch,
}) {
  return (
    <section className="relative min-h-[780px] bg-dark">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury modern home"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1713]/20 via-[#0D1713]/65 to-[#0D1713]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1713]/20 via-transparent to-[#0D1713]/20" />
      </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-[780px] max-w-[1440px] items-center px-5 pb-28 pt-36 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Find Your Place
            </p>

            <h1 className="mt-5 font-body text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Find a home
              <br />
              that fits your
              <br />
              <span className="text-accent">
                lifestyle.
              </span>
            </h1>

            <p className="mt-7 max-w-xl font-body text-base leading-7 text-white/65 sm:text-lg">
              Discover exceptional properties in the locations
              you love. From contemporary apartments to
              sophisticated family homes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/properties"
                className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-body text-sm font-semibold text-dark"
              >
                Explore Properties
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/about"
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 font-body text-sm font-semibold text-white backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="absolute bottom-0 left-1/2 z-30 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 translate-y-1/2 sm:w-[calc(100%-4rem)]">
          <PropertySearch
            filters={filters}
            setFilters={setFilters}
            onSearch={onSearch}
          />
        </div>
    </section>
  );
}

export default HeroSection;