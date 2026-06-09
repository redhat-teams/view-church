import api from "../../../shared/services/api";
export const getauth = () => api.get("/auth/");
