import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, LogOut, ChevronDown, UserCircle } from "lucide-react";
import useAdminAuth from "../hooks/useAdminAuth";

const titles = {
  "/admin": "Tableau de bord",
  "/admin/users": "Utilisateurs",
  "/admin/events": "Événements",
  "/admin/teachings": "Enseignements",
  "/admin/donations": "Dons",
};

const subtitles = {
  "/admin": "Vue d'ensemble de l'activité de l'église",
  "/admin/users": "Gérez les membres et leurs rôles",
  "/admin/events": "Planifiez et publiez les événements",
  "/admin/teachings": "Gérez les enseignements et médias",
  "/admin/donations": "Suivez les dons reçus",
};

export default function AdminTopbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const { getUser, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const user = getUser();
  const title = titles[pathname] || "Administration";
  const subtitle = subtitles[pathname] || "";

  const displayName =
    user?.first_name || user?.username || user?.email || "Administrateur";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          <button
            className="relative p-2.5 rounded-xl text-[#071F5A] hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#F0B51B]" />
          </button>

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
