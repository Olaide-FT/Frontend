import api from "./api";

export const notifyFavoritesUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nestora:favorites:updated"));
  }
};

export const getFavorites = async () => {
  const response = await api.get("/favorites");

  return response.data;
};

export const addFavorite = async (propertyId) => {
  const response = await api.post(`/favorites`,{ propertyId });

  notifyFavoritesUpdated();

  return response.data;
};

export const removeFavorite = async (propertyId) => {
  const response = await api.delete(`/favorites/${propertyId}`);

  notifyFavoritesUpdated();

  return response.data;
};