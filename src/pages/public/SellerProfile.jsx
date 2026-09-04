import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { getSellerProfile } from "../../services/propertyService";
import PropertyGrid from "../../components/property/PropertyGrid";

function SellerProfile() {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const data = await getSellerProfile(id);
        setSeller(data?.owner || null);
        setProperties(data?.properties || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load this seller profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  if (loading) {
    return <section className="min-h-screen bg-background px-5 py-32"><div className="mx-auto h-56 max-w-6xl animate-pulse rounded-xl bg-primary/10" /></section>;
  }

  if (error || !seller) {
    return (
      <section className="min-h-screen bg-background px-5 py-32 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary">Seller unavailable</h1>
        <p className="mt-3 font-body text-sm text-primary/50">{error || "This seller has no public listings."}</p>
        <Link to="/properties" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-body text-sm font-semibold text-white">Browse Properties</Link>
      </section>
    );
  }

  const name = `${seller.firstName || ""} ${seller.lastName || ""}`.trim() || "Property Seller";

  return (
    <section className="min-h-screen bg-background px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link to="/properties" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary/55 hover:text-primary">
          <ArrowLeft size={16} /> Back to properties
        </Link>

        <div className="mt-6 rounded-2xl bg-primary p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10"><UserRound size={30} /></div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">Seller profile</p>
              <h1 className="mt-2 font-heading text-3xl font-bold">{name}</h1>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-body text-sm text-white/70">
                {seller.email && <span className="flex items-center gap-1.5"><Mail size={15} />{seller.email}</span>}
                {seller.phone && <span className="flex items-center gap-1.5"><Phone size={15} />{seller.phone}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">Available listings</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-primary">Properties by {seller.firstName || "this seller"}</h2>
          </div>
          <span className="flex items-center gap-1.5 font-body text-sm text-primary/45"><MapPin size={15} />{properties.length} listing{properties.length === 1 ? "" : "s"}</span>
        </div>

        <div className="mt-7"><PropertyGrid properties={properties} /></div>
      </div>
    </section>
  );
}

export default SellerProfile;
