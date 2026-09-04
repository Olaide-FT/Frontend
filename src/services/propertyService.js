import api from "./api";

export const getProperties = async (params = {}) =>
  (await api.get("/properties", { params })).data;

export const getPropertyById = async (id) =>
  (await api.get(`/properties/${id}`)).data;

export const getSellerProfile = async (ownerId) => {
  const endpoints = [
    `/properties/owners/${ownerId}`,
    `/properties/owner/${ownerId}`,
    `/properties/seller/${ownerId}`,
  ];

  let lastError;

  for (const endpoint of endpoints) {
    try {
      return (await api.get(endpoint)).data;
    } catch (error) {
      lastError = error;

      const status = error?.response?.status;
      if (status !== 404) {
        throw error;
      }
    }
  }

  throw lastError;
};

export const searchProperties = async (params = {}) =>
  getProperties(params);
