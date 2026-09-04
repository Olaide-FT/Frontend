import api from "./api";


export const getAdminStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};

export const getAllUsers = async (params = {}) => {
  const response = await api.get("/admin/users",{params});

  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);

  return response.data;
};

export const updateUserStatus = async (id) => {
  const response = await api.put(`/admin/users/${id}/toggle`);

  return response.data;
};


export const getAllAdminProperties = async ( params = {}) => {
  const response = await api.get("/admin/properties",{params});

  return response.data;
};

export const getPendingProperties = async () => {
  const response = await api.get("/admin/properties/pending");

  return response.data;
};

export const approveProperty = async (propertyId) => {
  const response = await api.put(`/admin/properties/${propertyId}/approve`);

  return response.data;
};

export const rejectProperty = async (propertyId,reason = "") => {
  const response = await api.put(`/admin/properties/${propertyId}/reject`,{ rejectionReason: reason, reason });

  return response.data;
};

export const deleteAdminProperty = async (propertyId) => {
  const response = await api.delete(`/admin/properties/${propertyId}`);

  return response.data;
};