import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PropertyForm from "../../components/forms/PropertyForm";

import {
  createProperty,
} from "../../services/ownerPropertyService";

function AddProperty() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const parsedLocation = String(data.location || "").trim();
      const locationParts = parsedLocation
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      const payload = {
        ...data,
        address: data.address || locationParts[0] || parsedLocation || "N/A",
        city: data.city || locationParts[1] || locationParts[0] || "Lagos",
        state: data.state || locationParts[2] || "Lagos State",
        price: Number(data.price),
        bedrooms: data.bedrooms
          ? Number(data.bedrooms)
          : 0,
        bathrooms: data.bathrooms
          ? Number(data.bathrooms)
          : 0,
        squareFootage: data.squareFootage
          ? Number(data.squareFootage)
          : undefined,
        propertyType: String(data.propertyType || "house").toLowerCase(),
        listingType: String(data.listingType || "sale").toLowerCase(),
        amenities: Array.isArray(data.amenities) ? data.amenities : [],
      };

      delete payload.location;

      await createProperty(payload);

      navigate("/owner/properties");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to create property."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/owner/properties"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary/50 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to properties
        </Link>

        <div className="mt-7">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            New Listing
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
            Add a Property
          </h1>

          <p className="mt-2 font-body text-sm text-primary/45">
            Provide accurate details to help buyers discover your property.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-8">
          <PropertyForm
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Create Property"
            initialData={initialData}
          />
        </div>
      </div>
    </section>
  );
}

export default AddProperty;