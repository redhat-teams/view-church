import api from "../../../shared/services/api";
export const gethome = () => api.get("/home/");
