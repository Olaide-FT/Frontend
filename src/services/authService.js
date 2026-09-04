import api from "./api";

export const registerUser = async (data) =>
  (await api.post("/auth/register", data)).data;

export const loginUser = async (data) =>
  (await api.post("/auth/login", data)).data;


export const getCurrentUser = async () =>
  (await api.get("/auth/profile")).data;

export const updateProfile = async (data) =>
  (await api.put("/auth/profile", data)).data;

export const verifyEmail = async (data) =>
  (await api.post("/auth/verify-email", data)).data;

export const resendOtp = async (email) =>
  (await api.post("/auth/regenerate-otp", { email })).data;

export const logoutUser = async () => {
  try { await api.post("/auth/logout"); } catch {}
};
