import { SlidersHorizontal } from "lucide-react";

function PropertyFilters({
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="rounded-xl border border-primary/10 bg-white p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal
          size={17}
          className="text-accent"
        />

        <h2 className="font-body text-sm font-semibold text-primary">
          Filter Properties
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Listing Type */}

        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Listing
          </label>

          <select
            name="listingType"
            value={filters.listingType}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-3 py-3 font-body text-sm outline-none focus:border-accent"
          >
            <option value="">
              Any
            </option>

            <option value="sale">
              For Sale
            </option>

            <option value="rent">
              For Rent
            </option>

            <option value="lease">
              For Lease
            </option>
          </select>
        </div>

        {/* Property Type */}

        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Property Type
          </label>

          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-3 py-3 font-body text-sm outline-none focus:border-accent"
          >
            <option value="">
              Any
            </option>

            <option value="apartment">
              Apartment
            </option>

            <option value="house">
              House
            </option>

            <option value="duplex">
              Duplex
            </option>

            <option value="land">
              Land
            </option>

            <option value="commercial">
              Commercial
            </option>
          </select>
        </div>

        {/* Bedrooms */}

        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Bedrooms
          </label>

          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-3 py-3 font-body text-sm outline-none focus:border-accent"
          >
            <option value="">
              Any
            </option>

            <option value="1">
              1+
            </option>

            <option value="2">
              2+
            </option>

            <option value="3">
              3+
            </option>

            <option value="4">
              4+
            </option>

            <option value="5">
              5+
            </option>
          </select>
        </div>

        {/* Sort */}

        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Sort By
          </label>

          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-3 py-3 font-body text-sm outline-none focus:border-accent"
          >
            <option value="">
              Recommended
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="oldest">
              Oldest First
            </option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Minimum Price
          </label>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="₦ Minimum"
            className="mt-2 w-full rounded-lg border border-primary/10 px-3 py-3 font-body text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="font-body text-xs font-semibold text-primary/60">
            Maximum Price
          </label>

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="₦ Maximum"
            className="mt-2 w-full rounded-lg border border-primary/10 px-3 py-3 font-body text-sm outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyFilters;