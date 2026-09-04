import {
  Search,
  MapPin,
} from "lucide-react";

function PropertySearch({
  filters,
  setFilters,
  onSearch,
}) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-xl sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 px-3">
        <MapPin
          size={18}
          className="shrink-0 text-accent"
        />

        <input
          type="text"
          value={filters.location}
          onChange={handleChange}
          placeholder="Search by location"
          className="w-full bg-transparent py-3 font-body text-sm text-primary outline-none placeholder:text-primary/35"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white"
      >
        <Search size={17} />
        Search
      </button>
    </form>
  );
}

export default PropertySearch;