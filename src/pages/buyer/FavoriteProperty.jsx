import {
    Heart,
    MapPin,
    BedDouble,
    Bath,
    ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { formatPrice } from "../../utils/formatPrice";

function FavoriteProperty({
    property,
    onRemove,
}) {
    const propertyId =
        property?._id || property?.id;

    const image =
        property?.image ||
        property?.images?.[0] ||
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80";

    return (
        <article className="group overflow-hidden rounded-xl border border-primary/10 bg-white">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={property?.title || "Property"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() =>
                        onRemove(propertyId)
                    }
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow"
                    aria-label="Remove favorite"
                >
                    <Heart
                        size={17}
                        fill="currentColor"
                    />
                </button>
            </div>

            <div className="p-5">
                <p className="flex items-center gap-1.5 font-body text-xs text-primary/45">
                    <MapPin size={13} />
                    {property?.location ||
                        [property?.city, property?.state].filter(Boolean).join(", ") ||
                        property?.address ||
                        "Location unavailable"}
                </p>

                <h3 className="mt-2 font-body text-base font-semibold text-primary">
                    {property?.title || "Property"}
                </h3>

                <p className="mt-3 font-heading text-xl font-bold text-primary">
                    {formatPrice(property?.price)}
                </p>

                <div className="mt-4 flex items-center gap-4 font-body text-xs text-primary/45">
                    {property?.bedrooms !== undefined && (
                        <span className="flex items-center gap-1">
                            <BedDouble size={14} />
                            {property.bedrooms}
                        </span>
                    )}

                    {property?.bathrooms !== undefined && (
                        <span className="flex items-center gap-1">
                            <Bath size={14} />
                            {property.bathrooms}
                        </span>
                    )}
                </div>

                <Link
                    to={`/properties/${propertyId}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-body text-xs font-semibold text-white"
                >
                    View Property
                    <ArrowUpRight size={14} />
                </Link>
            </div>
        </article>
    );
}

export default FavoriteProperty;