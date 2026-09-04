import {
  Edit3,
  Trash2,
  Eye,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";
import PropertyStatusBadge from "./PropertyStatusBadge";
import { formatPrice } from "../../utils/formatPrice";

function OwnerPropertyCard({
  property,
  onDelete,
  onAvailabilityChange,
}) {
  const propertyId =
    property?._id || property?.id;

  const image =
    property?.image ||
    property?.images?.[0] ||
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80";

  const status = property?.approvalStatus || property?.status || "pending";
  const location =
    property?.location ||
    property?.address ||
    [property?.city, property?.state].filter(Boolean).join(", ") ||
    "Location unavailable";

  return (
    <article className="overflow-hidden rounded-xl border border-primary/10 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={property?.title || "Property"}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-4 top-4">
          <PropertyStatusBadge status={status} />
        </div>
      </div>

      <div className="p-5">
        <p className="flex items-center gap-1.5 font-body text-xs text-primary/45">
          <MapPin size={13} />
          {location}
        </p>

        <h3 className="mt-2 line-clamp-1 font-body text-lg font-semibold text-primary">
          {property?.title || "Untitled Property"}
        </h3>

        {status === "rejected" && property?.rejectionReason && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 font-body text-[11px] leading-5 text-red-700">
            Rejected: {property.rejectionReason}
          </p>
        )}

        <p className="mt-2 font-heading text-xl font-bold text-primary">
          {formatPrice(property?.price)}
        </p>

        {property?.approvalStatus === "approved" && (
          <label className="mt-4 block font-body text-xs font-semibold text-primary/55">
            Availability
            <select
              value={property?.availabilityStatus || "available"}
              onChange={(event) => onAvailabilityChange(propertyId, event.target.value)}
              className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2 font-body text-sm text-primary outline-none focus:border-accent"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </label>
        )}

        <div className="mt-5 flex items-center gap-2 border-t border-primary/10 pt-4">
          <Link
            to={`/properties/${propertyId}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/10 px-3 py-2.5 font-body text-xs font-semibold text-primary"
          >
            <Eye size={14} />
            View
          </Link>

          <Link
            to={`/owner/properties/${propertyId}/edit`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 text-primary/60 hover:border-accent hover:text-primary"
          >
            <Edit3 size={15} />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(propertyId)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default OwnerPropertyCard;
