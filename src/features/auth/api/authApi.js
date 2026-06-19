import api from "../../../shared/services/api";

/**
 * Login via Django SimpleJWT.
 * Endpoint : POST /api/auth/token/
 * Body     : { username, password }
 * Réponse  : { access, refresh }
 */
export const login = async ({ email, password }) => {
  const res = await api.post("/auth/token/", {
    username: email,   // Django utilise "username" par défaut
    password,
  });
  return res.data;
};

/**
 * Profil utilisateur connecté.
 * Ajoute l'endpoint /api/auth/me/ dans ton backend si besoin.
 */
export const getMe = () => api.get("/users/me/");

/**
 * Rafraîchit l'access token.
 * Endpoint : POST /api/auth/token/refresh/
 */
export const refreshToken = (refresh) =>
  api.post("/auth/token/refresh/", { refresh });
