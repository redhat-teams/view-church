import { useNavigate } from "react-router-dom";

/**
 * Lit et gère la session admin stockée en localStorage.
 * Compatible avec plusieurs clés de token (SimpleJWT, DRF Token Auth, etc.)
 */
export default function useAdminAuth() {
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    null;

  const getUser = () => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const isAuthenticated = () => Boolean(getToken());

  const logout = () => {
    ["access_token", "refresh_token", "token", "authToken", "user"].forEach(
      (k) => localStorage.removeItem(k)
    );
    navigate("/login");
  };

  return { getToken, getUser, isAuthenticated, logout };
}
