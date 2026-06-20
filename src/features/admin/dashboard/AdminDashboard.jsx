import { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  BookOpen,
  HandCoins,
  ArrowRight,
  MapPin,
  User,
  PlayCircle,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate } from "../../../shared/utils";
import {
  getDashboardStats,
  getUsers,
  getEvents,
  getTeachings,
  getDonations,
  normalizeList,
} from "../api/adminApi";

const formatAmount = (value, currency = "FCFA") => {
  const num = Number(value || 0);
  return `${num.toLocaleString("fr-FR")} ${currency}`;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentTeachings, setRecentTeachings] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) On tente l'endpoint de statistiques dédié
        const { data } = await getDashboardStats();
        if (!cancelled) {
          setStats(data);
          setUpcomingEvents(data?.upcoming_events || []);
          setRecentDonations(data?.recent_donations || []);
          setRecentUsers(data?.recent_users || []);

          // L'endpoint /auth/stats/ ne renvoie pas encore les enseignements récents
          // → on les récupère séparément dans tous les cas.
          try {
            const teachingsRes = await getTeachings({ page: 1, page_size: 5 });
            const teachingsList = normalizeList(teachingsRes.data);
            if (!cancelled) setRecentTeachings(teachingsList.items.slice(0, 5));
          } catch {
            // silencieux : la section sera simplement vide
          }
        }
      } catch {
        // 2) Repli : on reconstitue les statistiques depuis les listes existantes
        try {
          const [usersRes, eventsRes, teachingsRes, donationsRes] = await Promise.all([
            getUsers({ page: 1, page_size: 1 }),
            getEvents({ page: 1, page_size: 5 }),
            getTeachings({ page: 1, page_size: 5 }),
            getDonations({ page: 1, page_size: 5 }),
          ]);

          const usersList = normalizeList(usersRes.data);
          const eventsList = normalizeList(eventsRes.data);
          const teachingsList = normalizeList(teachingsRes.data);
          const donationsList = normalizeList(donationsRes.data);

          const donationsTotal = donationsList.items.reduce(
            (sum, d) => sum + Number(d.amount || 0),
            0
          );

          if (!cancelled) {
            setStats({
              users_count: usersList.count,
              events_count: eventsList.count,
              teachings_count: teachingsList.count,
              donations_count: donationsList.count,
              donations_total: donationsTotal,
            });
            setUpcomingEvents(eventsList.items.slice(0, 5));
            setRecentTeachings(teachingsList.items.slice(0, 5));
            setRecentDonations(donationsList.items.slice(0, 5));
          }
        } catch (err2) {
          if (!cancelled) setError(err2);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert
          type="error"
          message={`Impossible de charger certaines données du tableau de bord : ${getErrorMessage(error)}`}
        />
      )}

      {/* ===== CARTES STATISTIQUES ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={Users}
          label="Utilisateurs"
          value={stats?.users_count ?? 0}
          hint="Membres enregistrés"
          accent="#071F5A"
        />
        <StatCard
          icon={CalendarDays}
          label="Événements"
          value={stats?.events_count ?? 0}
          hint="Événements publiés"
          accent="#F0B51B"
        />
        <StatCard
          icon={BookOpen}
          label="Enseignements"
          value={stats?.teachings_count ?? 0}
          hint="Prédications disponibles"
          accent="#0EA5E9"
        />
        <StatCard
          icon={HandCoins}
          label="Dons reçus"
          value={formatAmount(stats?.donations_total)}
          hint={`${stats?.donations_count ?? 0} transaction(s)`}
          accent="#22C55E"
        />
      </div>

      {/* ===== LISTES ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Événements à venir */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#071F5A] text-lg">Événements à venir</h3>
            <Link
              to="/admin/events"
              className="text-sm font-semibold text-[#F0B51B] hover:text-[#d89f0d] flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              Aucun événement à venir.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {upcomingEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F4F6FB] transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#071F5A]/5 flex items-center justify-center text-[#071F5A] shrink-0">
                    <CalendarDays size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-[#071F5A] truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      {event.date && <span>{formatDate(event.date)}</span>}
                      {event.location && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={12} /> {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Enseignements récents */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#071F5A] text-lg">Enseignements récents</h3>
            <Link
              to="/admin/teachings"
              className="text-sm font-semibold text-[#F0B51B] hover:text-[#d89f0d] flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {recentTeachings.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              Aucun enseignement publié.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentTeachings.map((teaching) => {
                const isVideo = Boolean(teaching.video_url);
                return (
                  <li
                    key={teaching.id}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F4F6FB] transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9] shrink-0">
                      {isVideo ? <PlayCircle size={20} /> : <Headphones size={18} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-[#071F5A] truncate">
                        {teaching.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        {teaching.speaker && (
                          <span className="flex items-center gap-1 truncate">
                            <User size={12} /> {teaching.speaker}
                          </span>
                        )}
                        {teaching.date && <span>{formatDate(teaching.date)}</span>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Dons récents */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#071F5A] text-lg">Dons récents</h3>
            <Link
              to="/admin/donations"
              className="text-sm font-semibold text-[#F0B51B] hover:text-[#d89f0d] flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {recentDonations.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              Aucun don enregistré.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentDonations.map((don) => (
                <li
                  key={don.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-[#F4F6FB] transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                      <HandCoins size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#071F5A] truncate">
                        {don.donor_name || don.full_name || "Anonyme"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {don.created_at ? formatDate(don.created_at) : ""}
                        {don.payment_method ? ` · ${don.payment_method}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#071F5A] text-sm whitespace-nowrap">
                    {formatAmount(don.amount, don.currency || "FCFA")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
