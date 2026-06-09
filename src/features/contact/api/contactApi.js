import api from "../../../shared/services/api";
export const getcontacts = () => api.get("/contacts/");
