import api from "../../../shared/services/api";
export const getteachings = () => api.get("/teachings/");
