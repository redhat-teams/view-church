import api from "../../../shared/services/api";
export const getprayer = () => api.get("/prayer/");
