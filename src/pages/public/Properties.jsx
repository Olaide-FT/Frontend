import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import PropertySearch from "../../components/property/PropertySearch";
import PropertyFilters from "../../components/property/PropertyFilters";
import PropertyGrid from "../../components/property/PropertyGrid";
import PropertyEmptyState from "../../components/property/PropertyEmptyState";

function PropertyPagination({ currentPage = 1, totalPages = 1, onPageChange = () => {} }) {
  if (!totalPages || totalPages <= 1) return null;

  const prev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const next = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={prev}
        disabled={currentPage === 1}
        className="rounded-md border border-primary/10 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Previous
      </button>

      <div className="px-3 text-sm text-primary/60">
        Page {currentPage} of {totalPages}
      </div>

      <button
        type="button"
        onClick={next}
        disabled={currentPage === totalPages}
        className="rounded-md border border-primary/10 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}


import {
  getProperties,
} from "../../services/propertyService";

function Properties() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [pagination, setPagination] =
    useState({
      currentPage: 1,
      totalPages: 1,
    });

  const [filters, setFilters] = useState(() => ({
    location: searchParams.get("location") || searchParams.get("search") || "",
    listingType: searchParams.get("listingType") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
  }));

  const fetchProperties = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const params = { page, limit: 9};

      Object.entries(filters).forEach(
        ([key, value]) => {
          if (
            value !== "" &&
            value !== null &&
            value !== undefined
          ) {
            // The search field is named location in the UI, while the API
            // uses search to match property title, city, and state.
            params[key === "location" ? "search" : key] = value;
          }
        }
      );

      const data =
        await getProperties(params);

      const results =
        data?.properties ||
        data?.data ||
        data ||
        [];

      setProperties(results);

      const currentPage =
        data?.currentPage ||
        data?.page ||
        page;

      const totalPages =
        data?.totalPages ||
        Math.ceil(
          (data?.total || results.length) /
            9
        ) ||
        1;

      setPagination({
        currentPage,
        totalPages,
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleSearch = () => {
    fetchProperties(1);
  };

  const handlePageChange = (page) => {
    fetchProperties(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}

        <div className="max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Property Collection
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Find a property that feels like home.
          </h1>

          <p className="mt-4 font-body text-sm leading-7 text-primary/50">
            Explore verified properties and discover spaces
            that fit your lifestyle, location and budget.
          </p>
        </div>

        {/* Search */}

        <div className="relative z-10 mt-8">
          <PropertySearch
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Filters Toggle */}

        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() =>
              setShowFilters(!showFilters)
            }
            className="flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-3 font-body text-sm font-semibold text-primary"
          >
            <SlidersHorizontal size={16} />
            {showFilters
              ? "Hide Filters"
              : "Show Filters"}
          </button>
        </div>

        {/* Filters */}

        <div
          className={`mt-6 ${
            showFilters
              ? "block"
              : "hidden lg:block"
          }`}
        >
          <PropertyFilters
            filters={filters}
            setFilters={setFilters}
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-lg bg-primary px-5 py-3 font-body text-xs font-semibold text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}

        <div className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-body text-xs text-primary/40">
                Property results
              </p>

              <h2 className="mt-1 font-heading text-2xl font-bold text-primary">
                Discover Properties
              </h2>
            </div>

            {!loading && (
              <p className="font-body text-xs text-primary/40">
                {properties.length}{" "}
                results
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-xl bg-white"
                  >
                    <div className="aspect-[4/3] animate-pulse bg-primary/10" />

                    <div className="space-y-3 p-5">
                      <div className="h-3 w-1/3 animate-pulse bg-primary/10" />

                      <div className="h-5 w-2/3 animate-pulse bg-primary/10" />

                      <div className="h-6 w-1/2 animate-pulse bg-primary/10" />

                      <div className="h-10 animate-pulse bg-primary/10" />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : properties.length ? (
            <>
              <PropertyGrid
                properties={properties}
              />

              <PropertyPagination
                currentPage={
                  pagination.currentPage
                }
                totalPages={
                  pagination.totalPages
                }
                onPageChange={
                  handlePageChange
                }
              />
            </>
          ) : (
            <PropertyEmptyState />
          )}
        </div>
      </div>
    </section>
  );
}

export default Properties;