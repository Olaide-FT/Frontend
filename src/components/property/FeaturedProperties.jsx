import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropertyGrid from "./PropertyGrid";
import PropertyEmptyState from "./PropertyEmptyState";

import { getProperties } from "../../services/propertyService";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProperties({ limit: 6, featured: true });

        setProperties(data?.properties || data?.data || data || []);
      } catch (error) {
        console.error("Featured properties error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Curated Selection
            </p>

            <h2 className="mt-3 font-body text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured properties
            </h2>

            <p className="mt-3 font-body text-sm leading-6 text-primary/45">
              Explore some of the most exceptional properties currently available on Nestora.
            </p>
          </div>

          <Link
            to="/properties"
            className="font-body text-sm font-semibold text-primary underline decoration-accent underline-offset-4"
          >
            Explore all
          </Link>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="overflow-hidden rounded-xl bg-white">
                  <div className="aspect-[4/3] animate-pulse bg-primary/10" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/3 animate-pulse bg-primary/10" />
                    <div className="h-5 w-2/3 animate-pulse bg-primary/10" />
                    <div className="h-6 w-1/2 animate-pulse bg-primary/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length ? (
            <PropertyGrid
              properties={properties}
            />
          ) : (
            <PropertyEmptyState />
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;