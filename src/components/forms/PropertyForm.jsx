import { useEffect, useMemo, useState } from "react";
import {
  Upload,
  X,
  ImagePlus,
} from "lucide-react";

function PropertyForm({
  initialData = {},
  onSubmit,
  submitting = false,
  submitLabel = "Create Property",
}) {
  // defensive: initialData may be explicitly passed as null from navigation state
  const safeInitial = initialData || {};

  const [formData, setFormData] = useState({
    title: safeInitial.title || "",
    description: safeInitial.description || "",
    // keep underlying price as a number (or empty string)
    price: safeInitial.price !== undefined && safeInitial.price !== null ? Number(safeInitial.price) : "",
    propertyType: safeInitial.propertyType || "",
    listingType: safeInitial.listingType || "sale",
    address: safeInitial.address || "",
    city: safeInitial.city || "",
    state: safeInitial.state || "",
    location: safeInitial.location || "",
    bedrooms: safeInitial.bedrooms || "",
    bathrooms: safeInitial.bathrooms || "",
    squareFootage: safeInitial.squareFootage !== undefined && safeInitial.squareFootage !== null
      ? String(safeInitial.squareFootage).replace(/[^0-9.]/g, "")
      : safeInitial.area
        ? String(safeInitial.area).replace(/[^0-9.]/g, "")
        : "",
  });

  const [images, setImages] = useState(
    safeInitial.images || []
  );
  const [imageUrl, setImageUrl] = useState("");

  // displayPrice shows the formatted string to the user (e.g. 1,000,000)
  const [displayPrice, setDisplayPrice] = useState(
    formData.price !== "" && formData.price !== undefined && formData.price !== null
      ? Number(formData.price).toLocaleString()
      : ""
  );

  const [error, setError] = useState("");

  const imagePreviews = useMemo(
    () => images.map((image) => (
      typeof image === "string" ? image : URL.createObjectURL(image)
    )),
    [images]
  );

  useEffect(() => () => {
    imagePreviews.forEach((preview, index) => {
      if (typeof images[index] !== "string") URL.revokeObjectURL(preview);
    });
  }, [imagePreviews, images]);

  const handleChange = (e) => {
    const value = e.target.name === "squareFootage"
      ? e.target.value.replace(/[^0-9.]/g, "")
      : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  // Price input handler: accept user input, keep numeric value in formData.price,
  // and show localized string in displayPrice
  const handlePriceChange = (e) => {
    const raw = e.target.value || "";

    // Remove any non-numeric except dot
    const cleaned = raw.replace(/[^0-9.]/g, "");

    // Allow empty
    if (cleaned === "") {
      setFormData((prev) => ({ ...prev, price: "" }));
      setDisplayPrice("");
      return;
    }

    // Parse to number (float) and keep value
    const parsed = parseFloat(cleaned);

    if (Number.isNaN(parsed)) {
      // If parse failed, keep the raw cleaned string in display but don't set number
      setDisplayPrice(cleaned);
      setFormData((prev) => ({ ...prev, price: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, price: parsed }));

    // Format with locale separators
    try {
      setDisplayPrice(parsed.toLocaleString());
    } catch (err) {
      setDisplayPrice(String(parsed));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    setImages((prev) => {
      const next = [...prev, ...files].slice(0, 10);
      if (next.length < prev.length + files.length) {
        setError("A property can have at most 10 images.");
      }
      return next;
    });
  };

  const handleAddImageFromUrl = () => {
    const trimmedUrl = imageUrl.trim();

    if (!trimmedUrl) {
      setError("Please enter an image URL.");
      return;
    }

    if (!/^https?:\/\//i.test(trimmedUrl)) {
      setError("Please enter a valid image URL starting with http:// or https://");
      return;
    }

    setError("");
    if (images.length >= 10) {
      setError("A property can have at most 10 images.");
      return;
    }

    setImages((prev) => [...prev, trimmedUrl]);
    setImageUrl("");
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Property title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Property description is required.");
      return;
    }

    if (!formData.propertyType) {
      setError("Property type is required.");
      return;
    }

    if (!formData.price && formData.price !== 0) {
      setError("Property price is required.");
      return;
    }

    if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim()) {
      setError("Address, city, and state are required.");
      return;
    }

    onSubmit({
      ...formData,
      images,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Basic Information
          </p>

          <h2 className="mt-2 font-heading text-2xl font-bold text-primary">
            Tell us about the property
          </h2>
        </div>

        <div className="mt-7 grid gap-5">
          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Property Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Modern 4 Bedroom Detached Duplex"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe the property..."
              className="mt-2 w-full resize-none rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="font-body text-sm font-semibold text-primary">
                Property Type
              </label>

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-4 py-3 font-body text-sm outline-none focus:border-accent"
              >
                <option value="">
                  Select type
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

            <div>
              <label className="font-body text-sm font-semibold text-primary">
                Listing Type
              </label>

              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-primary/10 bg-white px-4 py-3 font-body text-sm outline-none focus:border-accent"
              >
                <option value="sale">
                  For Sale
                </option>
                <option value="rent">
                  For Rent
                </option>
                <option value="shortlet">
                  Shortlet
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Price
            </label>

            <input
              type="text"
              name="price"
              value={displayPrice}
              onChange={handlePriceChange}
              inputMode="numeric"
              placeholder="Enter property price"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />

            {formData.price !== "" && formData.price !== null && formData.price !== undefined && (
              <div className="mt-2 text-sm text-primary/60">
                Formatted: {Number(formData.price).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Location & Details
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-primary">
          Property details
        </h2>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="font-body text-sm font-semibold text-primary">
              Street Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 12 Admiralty Way"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Lekki"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g. Lagos State"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Bedrooms
            </label>

            <input
              type="number"
              min="0"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Bathrooms
            </label>

            <input
              type="number"
              min="0"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="font-body text-sm font-semibold text-primary">
              Area
            </label>

            <input
              type="text"
              name="squareFootage"
              value={formData.squareFootage}
              onChange={handleChange}
              inputMode="decimal"
              placeholder="e.g. 450 sqm"
              className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6 sm:p-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Property Gallery
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-primary">
          Add property images
        </h2>

        <div className="mt-7 space-y-4">
          <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/20 bg-background px-6 text-center transition hover:border-accent">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary/50">
              <ImagePlus size={22} />
            </div>

            <p className="mt-4 font-body text-sm font-semibold text-primary">
              Upload property images
            </p>

            <p className="mt-1 font-body text-xs text-primary/40">
              PNG, JPG or WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="rounded-xl border border-primary/10 bg-background p-4">
            <p className="font-body text-sm font-semibold text-primary">
              Or add an image by URL
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/property-image.jpg"
                className="w-full rounded-lg border border-primary/10 bg-white px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />

              <button
                type="button"
                onClick={handleAddImageFromUrl}
                className="rounded-lg bg-primary px-4 py-3 font-body text-sm font-semibold text-white"
              >
                Add URL
              </button>
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {images.map((image, index) => {
              const preview = imagePreviews[index];
              return (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={preview}
                    alt={`Property ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 opacity-0 shadow transition group-hover:opacity-100"
                  >
                    <X size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-body text-sm font-semibold text-white disabled:opacity-60"
        >
          <Upload size={17} />

          {submitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default PropertyForm;
