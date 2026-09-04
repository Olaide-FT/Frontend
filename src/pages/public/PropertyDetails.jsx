import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
} from "react-router-dom";

import {
  ArrowLeft,
  BedDouble,
  Bath,
  MapPin,
  Maximize,
  Heart,
  MessageCircle,
  UserRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getPropertyById,
} from "../../services/propertyService";

import {
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";

import {
  createInquiry,
  getReceivedInquiries,
} from "../../services/inquiryService";

import { formatPrice } from "../../utils/formatPrice";

function PropertyDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } =
    useAuth();

  const [property, setProperty] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeImage, setActiveImage] =
    useState(0);

  const [favorite, setFavorite] =
    useState(false);

  const [inquiryMessage, setInquiryMessage] =
    useState("");

  const [inquiryLoading, setInquiryLoading] =
    useState(false);

  const [inquirySuccess, setInquirySuccess] =
    useState("");

  const [inquiryError, setInquiryError] =
    useState("");

  // owner inquiries shown on this property page (read-only)
  const [ownerInquiries, setOwnerInquiries] = useState([]);
  const [ownerInquiriesLoading, setOwnerInquiriesLoading] = useState(false);
  const [ownerInquiriesError, setOwnerInquiriesError] = useState("");

  // determine if the current signed-in user is the owner of this property
  // declared early because some effects depend on it
  const ownerId = property?.owner?._id || property?.owner;
  const currentUserId = user?._id || user?.userId;
  const isOwner = Boolean(
    user &&
      user.role === "owner" &&
      ownerId &&
      currentUserId &&
      ownerId.toString() === currentUserId.toString()
  );

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const data =
          await getPropertyById(id);

        const result =
          data?.property ||
          data?.data ||
          data;

        setProperty(result);

        setFavorite(
          Boolean(result?.isFavorite)
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

  // When property is loaded and the viewer is the owner, fetch received inquiries and filter to this property
  useEffect(() => {
    const fetchOwnerInquiries = async () => {
      if (!isOwner) return;

      try {
        setOwnerInquiriesLoading(true);
        const data = await getReceivedInquiries();
        const inquiries = data?.inquiries || data?.data || data || [];
        const filtered = inquiries.filter(
          (inq) => (inq.property?._id || inq.property)?.toString() === (property?._id || property?.id)?.toString()
        );
        setOwnerInquiries(filtered);
      } catch (error) {
        console.error(error);
        setOwnerInquiriesError(
          error.response?.data?.message ||
            "Unable to load inquiries for this property."
        );
      } finally {
        setOwnerInquiriesLoading(false);
      }
    };

    fetchOwnerInquiries();
  }, [isOwner, property]);

  // owner view: fetch and display inquiries for this property in read-only mode
  const renderOwnerInquiryAside = () => {
    if (ownerInquiriesLoading) {
      return (
        <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="space-y-4">
            {[1,2].map(i => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-primary/5" />
            ))}
          </div>
        </aside>
      );
    }

    if (ownerInquiriesError) {
      return (
        <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <p className="font-body text-sm text-red-600">{ownerInquiriesError}</p>
        </aside>
      );
    }

    if (!ownerInquiries.length) {
      return (
        <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h3 className="font-heading text-lg font-semibold text-primary">Inquiries</h3>
          <p className="mt-3 font-body text-sm text-primary/45">No inquiries yet for this property.</p>
        </aside>
      );
    }

    return (
      <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
        <h3 className="font-heading text-lg font-semibold text-primary">Inquiries for this property</h3>

        <div className="mt-4 space-y-4">
          {ownerInquiries.map((inq) => (
            <div key={inq._id || inq.id} className="rounded-lg border border-primary/10 bg-white p-4">
              <p className="font-body text-sm text-primary/55">{inq.message}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-body text-xs text-primary/40">From: <span className="font-semibold text-primary/70">{inq.buyer?.firstName} {inq.buyer?.lastName}</span></p>
                <span className="rounded-full bg-amber-50 px-3 py-1 font-body text-[10px] font-semibold capitalize text-amber-700">{inq.status || 'new'}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  };


  const images =
    property?.images?.length
      ? property.images
      : property?.image
        ? [property.image]
        : [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
          ];

  const handleFavorite = async () => {
    // owners should not be able to favorite their own properties
    if (isOwner) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location,
        },
      });

      return;
    }

    try {
      if (favorite) {
        await removeFavorite(id);
        setFavorite(false);
      } else {
        await addFavorite(id);
        setFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInquiry = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location,
        },
      });

      return;
    }

    setInquiryLoading(true);
    setInquiryError("");
    setInquirySuccess("");

    const message = inquiryMessage.trim();
    if (!message) {
      setInquiryError("Please write a message before sending your inquiry.");
      setInquiryLoading(false);
      return;
    }

    try {
      await createInquiry({
        propertyId: id,
        message,
      });

      setInquirySuccess(
        "Your inquiry has been sent successfully."
      );

      setInquiryMessage("");
    } catch (error) {
      console.error("Create Inquiry Error:", error);

      const msg = error.response?.data?.message || error.message || "Unable to send inquiry.";

      // If the backend says phone/email is missing, direct the buyer to their profile
      if (error.response?.status === 400 && msg.toLowerCase().includes("profile")) {
        navigate("/buyer/profile", {
          state: {
            from: location,
            notice: msg,
          },
        });
        return;
      }

      setInquiryError(msg);
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-background px-5 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="aspect-[16/7] animate-pulse rounded-xl bg-primary/10" />
        </div>
      </section>
    );
  }

  if (error || !property) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-primary">
            Property unavailable
          </h1>

          <p className="mt-3 font-body text-sm text-primary/40">
            {error ||
              "We couldn't find this property."}
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-body text-sm font-semibold text-white"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Back */}

        <Link
          to="/properties"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary/50 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to properties
        </Link>

        {/* Gallery */}

        <div className="mt-7 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/8] overflow-hidden bg-primary/5">
            <img
              src={images[activeImage]}
              alt={
                property.title ||
                "Property"
              }
              className="h-full w-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (activeImage -
                        1 +
                        images.length) %
                        images.length
                    )
                  }
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (activeImage + 1) %
                        images.length
                    )
                  }
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {images
                .slice(0, 6)
                .map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`aspect-[4/3] overflow-hidden rounded-lg ${
                      activeImage === index
                        ? "ring-2 ring-accent"
                        : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Main */}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* Details */}

          <div>
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {property.listingType ||
                    property.type ||
                    "Property"}
                </p>

                <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
                  {property.title ||
                    "Untitled Property"}
                </h1>

                <p className="mt-4 flex items-center gap-2 font-body text-sm text-primary/45">
                  <MapPin size={16} />
                  {property.location ||
                    property.address ||
                    [property.city, property.state].filter(Boolean).join(", ") ||
                    "Location unavailable"}
                </p>
              </div>

              {!isOwner ? (
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                    favorite
                      ? "border-red-200 text-red-500"
                      : "border-primary/10 text-primary/50"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={
                      favorite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to={`/owner/properties/${id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/10 px-4 py-2 font-body text-sm font-semibold text-primary"
                  >
                    Edit Listing
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      const initialData = {
                        title: property.title,
                        description: property.description,
                        price: property.price,
                        propertyType: property.propertyType || property.type,
                        listingType: property.listingType,
                        address: property.address,
                        city: property.city,
                        state: property.state,
                        bedrooms: property.bedrooms,
                        bathrooms: property.bathrooms,
                        area: property.squareFootage || property.area,
                        images: property.images || [],
                        amenities: property.amenities || [],
                      };

                      navigate("/owner/properties/add", {
                        state: { initialData },
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/10 px-4 py-2 font-body text-sm font-semibold text-primary/50 hover:text-primary"
                  >
                    Create Again
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 font-heading text-3xl font-bold text-primary">
              {formatPrice(
                property.price
              )}
            </div>

            {property.availabilityStatus && property.availabilityStatus !== "available" && (
              <div className="mt-4 inline-flex rounded-lg bg-primary/10 px-4 py-2 font-body text-sm font-semibold capitalize text-primary">
                Property {property.availabilityStatus}
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {property.bedrooms !==
                undefined && (
                <div className="rounded-lg border border-primary/10 bg-white p-4">
                  <BedDouble
                    size={18}
                    className="text-accent"
                  />

                  <p className="mt-3 font-heading text-xl font-bold text-primary">
                    {property.bedrooms}
                  </p>

                  <p className="mt-1 font-body text-xs text-primary/40">
                    Bedrooms
                  </p>
                </div>
              )}

              {property.bathrooms !==
                undefined && (
                <div className="rounded-lg border border-primary/10 bg-white p-4">
                  <Bath
                    size={18}
                    className="text-accent"
                  />

                  <p className="mt-3 font-heading text-xl font-bold text-primary">
                    {property.bathrooms}
                  </p>

                  <p className="mt-1 font-body text-xs text-primary/40">
                    Bathrooms
                  </p>
                </div>
              )}

              {(property.squareFootage || property.area) && (
                <div className="rounded-lg border border-primary/10 bg-white p-4">
                  <Maximize
                    size={18}
                    className="text-accent"
                  />

                  <p className="mt-3 font-heading text-xl font-bold text-primary">
                    {property.squareFootage || property.area}
                  </p>

                  <p className="mt-1 font-body text-xs text-primary/40">
                    Area
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-primary/10 bg-white p-4">
                <Building2Icon />

                <p className="mt-3 font-heading text-xl font-bold capitalize text-primary">
                  {property.propertyType ||
                    property.type ||
                    "Home"}
                </p>

                <p className="mt-1 font-body text-xs text-primary/40">
                  Property Type
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-heading text-2xl font-bold text-primary">
                About this property
              </h2>

              <p className="mt-4 whitespace-pre-line font-body text-sm leading-7 text-primary/55">
                {property.description ||
                  "No description provided for this property."}
              </p>
            </div>

            {!isOwner && ownerId && (
              <div className="mt-10 flex flex-col gap-4 rounded-xl border border-primary/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <UserRound size={19} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-primary/40">Listed by</p>
                    <p className="font-body text-sm font-semibold text-primary">
                      {property.owner?.firstName} {property.owner?.lastName}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/sellers/${ownerId}`}
                  className="inline-flex justify-center rounded-lg border border-primary/10 px-4 py-2.5 font-body text-sm font-semibold text-primary hover:border-accent"
                >
                  View Seller Profile
                </Link>
              </div>
            )}
          </div>

          {/* Inquiry: only show for non-owner viewers */}

          {!isOwner && property.availabilityStatus === "available" ? (
            <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="font-heading text-2xl font-bold text-primary">
                Interested in this property?
              </h2>

              <p className="mt-3 font-body text-sm leading-6 text-primary/45">
                Send an inquiry to the property owner.
              </p>

              <textarea
                value={inquiryMessage}
                onChange={(e) =>
                  setInquiryMessage(
                    e.target.value
                  )
                }
                rows="6"
                maxLength={1000}
                required
                placeholder="Write your message..."
                className="mt-6 w-full resize-none rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />

              {inquiryError && (
                <p className="mt-3 font-body text-xs text-red-500">
                  {inquiryError}
                </p>
              )}

              {inquirySuccess && (
                <p className="mt-3 font-body text-xs text-green-600">
                  {inquirySuccess}
                </p>
              )}

              <button
                type="button"
                onClick={handleInquiry}
                disabled={inquiryLoading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-body text-sm font-semibold text-white disabled:opacity-60"
              >
                <MessageCircle
                  size={17}
                />

                {inquiryLoading
                  ? "Sending..."
                  : isAuthenticated
                    ? "Make an Inquiry"
                    : "Sign in to Inquire"}
              </button>
            </aside>
          ) : !isOwner ? (
            <aside className="h-fit rounded-xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="font-heading text-2xl font-bold capitalize text-primary">
                Property {property.availabilityStatus || "unavailable"}
              </h2>
              <p className="mt-3 font-body text-sm leading-6 text-primary/45">
                This property is no longer available for new inquiries.
              </p>
            </aside>
          ) : (
            renderOwnerInquiryAside()
          )}
        </div>
      </div>
    </section>
  );
}

function Building2Icon() {
  return (
    <div className="h-[18px] w-[18px] text-accent">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-full w-full"
      >
        <path d="M3 21h18" />
        <path d="M6 21V3h12v18" />
        <path d="M9 7h1" />
        <path d="M14 7h1" />
        <path d="M9 11h1" />
        <path d="M14 11h1" />
        <path d="M9 15h1" />
        <path d="M14 15h1" />
      </svg>
    </div>
  );
}

export default PropertyDetails;
