import PropertyCard from "./PropertyCard";

function PropertyGrid({
  properties = [],
}) {
  const propertyList = Array.isArray(properties)
    ? properties
    : [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {propertyList.map(
        (property) => (
          <PropertyCard
            key={
              property._id ||
              property.id
            }
            property={property}
          />
        )
      )}
    </div>
  );
}

export default PropertyGrid;