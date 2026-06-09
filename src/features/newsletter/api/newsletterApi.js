import api from "../../../shared/services/api";
export const getnewsletter = () => api.get("/newsletter/");
