import api from "./api";

const toPropertyFormData = (propertyData) => {
  const formData = new FormData();

  Object.entries(propertyData).forEach(([key, value]) => {
    if (key === "images" || value === undefined || value === null) return;
    if (key === "amenities") {
      formData.append(key, JSON.stringify(value));
      return;
    }
    formData.append(key, value);
  });

  (propertyData.images || []).forEach((image) => {
    formData.append("images", image);
  });

  return formData;
};

export const getMyProperties = async () => {
  const response = await api.get("/properties/owner/my-properties");

  return response.data;
};

export const getOwnerPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);

  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await api.post("/properties/create", toPropertyFormData(propertyData));

  return response.data;
};

export const updateProperty = async (id,propertyData) => {
  const response = await api.put(`/properties/${id}`,toPropertyFormData(propertyData));

  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/delete/${id}`);

  return response.data;
};

export const updateAvailabilityStatus = async (id, availabilityStatus) =>
  (await api.put(`/properties/${id}/availability`, { availabilityStatus })).data;
