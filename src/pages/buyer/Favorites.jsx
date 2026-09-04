import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import FavoriteProperty from "../../pages/buyer/FavoriteProperty";
import {
  getFavorites,
  removeFavorite,
} from "../../services/favoriteService";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();

        const favoriteItems = data?.favorites || data?.data || data || [];
        const validFavorites = Array.isArray(favoriteItems)
          ? favoriteItems.filter((item) => item?.property?._id || item?.property?.id || item?._id || item?.id)
          : [];

        setFavorites(validFavorites.filter((item) => item?.property));
      } catch (error) {
        console.error(
          "Failed to load favorites:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (propertyId) => {
    try {
      await removeFavorite(propertyId);

      setFavorites((prev) =>
        prev.filter((item) => {
          const property = item.property || item;
          return (property._id || property.id) !== propertyId;
        })
      );
    } catch (error) {
      console.error(
        "Failed to remove favorite:",
        error
      );
    }
  };

  return (
    <section className="bg-background px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Your Collection
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
            Favorite Properties
          </h1>

          <p className="mt-2 font-body text-sm text-primary/45">
            Properties you've saved for later.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-xl bg-white"
              >
                <div className="aspect-[4/3] bg-primary/10" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 bg-primary/10" />
                  <div className="h-5 w-2/3 bg-primary/10" />
                  <div className="h-6 w-1/2 bg-primary/10" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => {
              // The API returns Favorite documents with the property nested
              // under a `property` field. Unwrap it so FavoriteProperty gets
              // a plain property object with the correct _id.
              const property = item.property || item;
              const key = property._id || property.id || item._id;
              return (
                <FavoriteProperty
                  key={key}
                  property={property}
                  onRemove={handleRemove}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-primary/10 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary/40">
              <Heart size={22} />
            </div>

            <h2 className="mt-5 font-heading text-2xl font-bold text-primary">
              No favorites yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm font-body text-sm leading-6 text-primary/40">
              When you find a property you love, save it
              here so you can easily come back to it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Favorites;