import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Bell, LogOut, ChevronDown, UserCircle, HeartHandshake } from "lucide-react";
import useAdminAuth from "../hooks/useAdminAuth";
import { getPrayerRequests } from "../api/adminApi";

const titles = {
  "/admin":               "Tableau de bord",
  "/admin/users":         "Utilisateurs",
  "/admin/events":        "Événements",
  "/admin/teachings":     "Enseignements",
  "/admin/donations":     "Dons",
  "/admin/prayers":       "Demandes de prière",
  "/admin/testimonials":  "Témoignages",
  "/admin/gallery":       "Galerie",
  "/admin/settings":      "Paramètres",
};

const subtitles = {
  "/admin":               "Vue d'ensemble de l'activité de l'église",
  "/admin/users":         "Gérez les membres et leurs rôles",
  "/admin/events":        "Planifiez et publiez les événements",
  "/admin/teachings":     "Gérez les enseignements et médias",
  "/admin/donations":     "Suivez les dons reçus",
  "/admin/prayers":       "Approuvez ou refusez les demandes de prière",
  "/admin/testimonials":  "Gérez les témoignages affichés sur l'accueil",
  "/admin/gallery":       "Ajoutez et organisez les photos de la galerie",
  "/admin/settings":      "Personnalisez le site et l'événement majeur",
};

// Nom de l'événement global déclenché dès qu'une demande de prière
// change de statut (ou est supprimée) ailleurs dans l'admin.
export const PRAYER_REQUESTS_UPDATED_EVENT = "prayer-requests-updated";

export default function AdminTopbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const { getUser, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const ref = useRef(null);
  const notifRef = useRef(null);

  const user = getUser();
  const title = titles[pathname] || "Administration";
  const subtitle = subtitles[pathname] || "";

  const displayName =
    user?.first_name || user?.username || user?.email || "Administrateur";

  const fetchPendingCount = useCallback(() => {
    getPrayerRequests({ status: "pending", page_size: 1 })
      .then(({ data }) => {
        const count = Array.isArray(data) ? data.length : data?.count ?? 0;
        setPendingCount(count);
      })
      .catch(() => {
        // silencieux : pas bloquant pour le reste de l'admin
      });
  }, []);

  // Chargement initial + rafraîchissement à chaque changement de page
  // + rafraîchissement périodique de sécurité (60s)
  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 60000);
    return () => clearInterval(interval);
  }, [pathname, fetchPendingCount]);

  // Rafraîchissement immédiat dès qu'une demande de prière est
  // approuvée / refusée / supprimée depuis n'importe quelle page.
  useEffect(() => {
    window.addEventListener(PRAYER_REQUESTS_UPDATED_EVENT, fetchPendingCount);
    return () =>
      window.removeEventListener(PRAYER_REQUESTS_UPDATED_EVENT, fetchPendingCount);
  }, [fetchPendingCount]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayCount = pendingCount > 99 ? "99+" : pendingCount;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-[#071F5A] hover:bg-gray-100 transition shrink-0"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-[#071F5A] truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden sm:block text-sm text-gray-500 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="relative p-2.5 rounded-xl text-[#071F5A] hover:bg-gray-100 transition"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#F0B51B] text-[#071F5A] text-[10px] font-bold leading-none ring-2 ring-white">
                  {displayCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#071F5A]">Notifications</p>
                </div>
                {pendingCount > 0 ? (
                  <Link
                    to="/admin/prayers"
                    onClick={() => setNotifOpen(false)}
                    className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F0B51B]/15 text-[#F0B51B] flex items-center justify-center shrink-0">
                      <HeartHandshake size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#071F5A]">
                        {pendingCount} demande{pendingCount > 1 ? "s" : ""} de prière en attente
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        À approuver ou refuser
                      </p>
                    </div>
                  </Link>
                ) : (
                  <p className="px-4 py-6 text-sm text-gray-400 text-center">
                    Aucune nouvelle notification.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#071F5A] flex items-center justify-center text-[#F0B51B] font-bold uppercase shrink-0">
                {displayName.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-[#071F5A] max-w-[120px] truncate">
                {displayName}
              </span>
              <ChevronDown size={16} className="hidden sm:block text-gray-400" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#071F5A] truncate">
                    {displayName}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
                <button
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition"
                  onClick={() => setOpen(false)}
                >
                  <UserCircle size={17} />
                  Mon profil
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={17} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
