import api from "../../../shared/services/api";
export const getdonations = () => api.get("/donations/");
