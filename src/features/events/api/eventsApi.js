import api from "../../../shared/services/api";
export const getevents = () => api.get("/events/");
