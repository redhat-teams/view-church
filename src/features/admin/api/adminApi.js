import api from "../../../shared/services/api";

/**
 * Normalise une réponse Django REST Framework (paginée ou non)
 * en { items: [...], count: n }
 */
export const normalizeList = (data) => {
  if (Array.isArray(data)) return { items: data, count: data.length };
  return {
    items: data?.results ?? [],
    count: data?.count ?? (data?.results?.length || 0),
  };
};

const multipart = (payload) =>
  payload instanceof FormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : undefined;

/* ============================================================
 * DASHBOARD
 * ========================================================== */
export const getDashboardStats = () => api.get("/admin/stats/");

/* ============================================================
 * UTILISATEURS
 * ========================================================== */
export const getUsers = (params) => api.get("/users/", { params });
export const getUser = (id) => api.get(`/users/${id}/`);
export const createUser = (payload) => api.post("/users/", payload);
export const updateUser = (id, payload) => api.patch(`/users/${id}/`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}/`);

/* ============================================================
 * EVENEMENTS
 * ========================================================== */
export const getEvents = (params) => api.get("/events/", { params });
export const getEvent = (id) => api.get(`/events/${id}/`);
export const createEvent = (payload) =>
  api.post("/events/", payload, multipart(payload));
export const updateEvent = (id, payload) =>
  api.patch(`/events/${id}/`, payload, multipart(payload));
export const deleteEvent = (id) => api.delete(`/events/${id}/`);

/* ============================================================
 * ENSEIGNEMENTS
 * ========================================================== */
export const getTeachings = (params) => api.get("/teachings/", { params });
export const getTeaching = (id) => api.get(`/teachings/${id}/`);
export const createTeaching = (payload) =>
  api.post("/teachings/", payload, multipart(payload));
export const updateTeaching = (id, payload) =>
  api.patch(`/teachings/${id}/`, payload, multipart(payload));
export const deleteTeaching = (id) => api.delete(`/teachings/${id}/`);

/* ============================================================
 * DONS
 * ========================================================== */
export const getDonations = (params) => api.get("/donations/", { params });
export const getDonation = (id) => api.get(`/donations/${id}/`);
export const updateDonation = (id, payload) =>
  api.patch(`/donations/${id}/`, payload);
export const deleteDonation = (id) => api.delete(`/donations/${id}/`);
