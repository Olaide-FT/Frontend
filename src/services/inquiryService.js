import api from "./api";

// For buyers — fetches inquiries the buyer has sent
export const getMySentInquiries = async () => {
  const response = await api.get("/inquiries/sent");

  return response.data;
};

// For owners — fetches inquiries received on their properties
export const getReceivedInquiries = async () => {
  const response = await api.get("/inquiries/received");

  return response.data;
};

// Alias kept for backwards compatibility — owner pages use this
export const getMyInquiries = getReceivedInquiries;

export const createInquiry = async (inquiryData) => {
  const response = await api.post("/inquiries",inquiryData);

  return response.data;
};

export const getInquiryById = async (id) => {
  const response = await api.get(`/inquiries/${id}`);

  return response.data;
};

export const respondToInquiry = async (id, response) =>
  (await api.put(`/inquiries/${id}/respond`, { response })).data;

export const closeInquiry = async (id) =>
  (await api.put(`/inquiries/${id}/close`)).data;
