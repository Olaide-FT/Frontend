import { SearchX } from "lucide-react";

function PropertyEmptyState() {
  return (
    <div className="rounded-xl border border-primary/10 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary/30">
        <SearchX size={24} />
      </div>

      <h2 className="mt-5 font-heading text-2xl font-bold text-primary">
        No properties found
      </h2>

      <p className="mx-auto mt-2 max-w-md font-body text-sm leading-6 text-primary/40">
        We couldn't find properties matching your current
        search. Try adjusting your filters or searching another
        location.
      </p>
    </div>
  );
}

export default PropertyEmptyState;