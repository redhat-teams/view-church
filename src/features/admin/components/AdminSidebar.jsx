import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  HandCoins,
  HeartHandshake,
  Church,
  ArrowLeftToLine,
  X,
} from "lucide-react";

const links = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/admin/users", end: false, icon: Users, label: "Utilisateurs" },
  { to: "/admin/events", end: false, icon: CalendarDays, label: "Événements" },
  { to: "/admin/teachings", end: false, icon: BookOpen, label: "Enseignements" },
  { to: "/admin/donations", end: false, icon: HandCoins, label: "Dons" },
  { to: "/admin/prayers", end: false, icon: HeartHandshake, label: "Demandes de prière" },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-[#071F5A] text-white
          flex flex-col
          transform transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <div className="leading-tight">
              <p className="font-bold text-base">Administration</p>
              <p className="text-xs text-[#F0B51B]">Espace gestion</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/70 hover:text-white p-1"
            aria-label="Fermer le menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1.5">
          {links.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#F0B51B] text-[#071F5A] shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-5 border-t border-white/10 flex flex-col gap-1.5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 mb-1">
            <Church size={18} className="text-[#F0B51B]" />
            <p className="text-xs text-white/70 leading-snug">
              Plateforme de gestion de l'église
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <ArrowLeftToLine size={19} />
            Retour au site
          </Link>
        </div>
      </aside>
    </>
  );
}
