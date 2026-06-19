import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Protège les routes admin.
 * Vérifie la présence d'un access token dans le localStorage,
 * quelle que soit la clé utilisée par le backend Django.
 */
function getStoredToken() {
  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    null
  );
}

export default function RequireAdmin() {
  const location = useLocation();

  if (!getStoredToken()) {
    // Redirige vers /login en mémorisant la page demandée
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
