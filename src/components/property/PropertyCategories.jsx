import {
  Briefcase,
  Building2,
  Home,
  LandPlot,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    title: "Apartments",
    description:
      "Modern apartments in prime locations.",
    icon: Building2,
    type: "apartment",
  },
  {
    title: "Houses",
    description:
      "Beautiful homes for every lifestyle.",
    icon: Home,
    type: "house",
  },
  {
    title: "Land",
    description:
      "Premium land opportunities.",
    icon: LandPlot,
    type: "land",
  },
  {
    title: "Commercial",
    description:
      "Spaces built for businesses.",
    icon: Briefcase,
    type: "commercial",
  },
];

function PropertyCategories() {
  return (
    <section className="relative bg-background pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Explore
            </p>

            <h2 className="mt-3 font-body text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Find what you're looking for
            </h2>
          </div>

          <Link
            to="/properties"
            className="font-body text-sm font-semibold text-primary underline decoration-accent underline-offset-4"
          >
            View all properties
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(
            ({
              title,
              description,
              icon: Icon,
              type,
            }) => (
              <Link
                key={title}
                to={`/properties?propertyType=${type}`}
                className="group rounded-xl border border-primary/10 bg-white p-6 transition hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
                  <Icon size={21} />
                </div>

                <h3 className="mt-7 font-body text-lg font-semibold text-primary">
                  {title}
                </h3>

                <p className="mt-2 font-body text-sm leading-6 text-primary/45">
                  {description}
                </p>

                <span className="mt-6 block font-body text-xs font-semibold text-accent">
                  Explore →
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default PropertyCategories;