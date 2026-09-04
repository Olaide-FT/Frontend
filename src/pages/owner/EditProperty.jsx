import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PropertyForm from "../../components/forms/PropertyForm";

import {
  getOwnerPropertyById,
  updateProperty,
} from "../../services/ownerPropertyService";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data =
          await getOwnerPropertyById(id);

        setProperty(
          data?.property ||
            data?.data ||
            data
        );
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load property."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...data,
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
      };

      await updateProperty(id, payload);

      navigate("/owner/properties");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to update property."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

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
            Manage Listing
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
            Edit Property
          </h1>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
            {error}
          </div>
        )}

        {property && (
          <div className="mt-8">
            <PropertyForm
              initialData={property}
              onSubmit={handleSubmit}
              submitting={submitting}
              submitLabel="Save Changes"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default EditProperty;