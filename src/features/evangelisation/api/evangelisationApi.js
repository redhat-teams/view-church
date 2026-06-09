import api from "../../../shared/services/api";
export const getevangelisation = () => api.get("/evangelisation/");
