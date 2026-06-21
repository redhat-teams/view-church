import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../shared/services/api";

function CountdownCard({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 backdrop-blur-md shadow-lg w-[68px] h-[68px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px]">
      <span className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-none tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-[10px] sm:text-sm md:text-lg">
        {label}
      </span>
    </div>
  );
}

const DEFAULTS = {
  major_event_enabled: true,
  major_event_badge: "Évènement Majeur - Église",
  major_event_title: "Conférence Internationale du Réveil 2026",
  major_event_description:
    "Rejoignez-nous pour un moment exceptionnel de réveil spirituel, de prière, d'adoration et d'enseignement.",
  major_event_date: null,
  major_event_location: "Salle de conférence de l'église",
  major_event_cta_label: "Rejoindre maintenant",
  major_event_cta_link: "/contact",
};

const formatDateFr = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export default function MajorEventSection() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [expired, setExpired] = useState(false);

  // Récupère le contenu personnalisé depuis l'admin
  useEffect(() => {
    let cancelled = false;

    api
      .get("/settings/")
      .then(({ data }) => {
        if (cancelled) return;
        setSettings({
          major_event_enabled: data.major_event_enabled ?? true,
          major_event_badge: data.major_event_badge || DEFAULTS.major_event_badge,
          major_event_title: data.major_event_title || DEFAULTS.major_event_title,
          major_event_description:
            data.major_event_description || DEFAULTS.major_event_description,
          major_event_date: data.major_event_date || null,
          major_event_location:
            data.major_event_location || DEFAULTS.major_event_location,
          major_event_cta_label:
            data.major_event_cta_label || DEFAULTS.major_event_cta_label,
          major_event_cta_link:
            data.major_event_cta_link || DEFAULTS.major_event_cta_link,
        });
      })
      .catch(() => {
        // En cas d'erreur, on garde les valeurs par défaut (section toujours fonctionnelle)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Compte à rebours basé sur la date configurée dans l'admin
  useEffect(() => {
    if (!settings.major_event_date) return;

    const targetDate = new Date(settings.major_event_date).getTime();
    const update = () => {
      const distance = targetDate - Date.now();
      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setExpired(true);
        return;
      }
      setTimeLeft({
        days:    String(Math.floor(distance / 86400000)).padStart(2, "0"),
        hours:   String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((distance % 60000) / 1000)).padStart(2, "0"),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [settings.major_event_date]);

  // Section désactivée depuis l'admin → on n'affiche rien
  if (loaded && !settings.major_event_enabled) return null;

  const isInternalLink = settings.major_event_cta_link?.startsWith("/");

  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-14 md:py-24">
      {/* Fond décoratif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
          <span className="font-semibold text-sm sm:text-base text-white">
            {settings.major_event_badge}
          </span>
        </div>

        {/* Titre */}
        <h2 className="mt-5 md:mt-8 text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight max-w-5xl text-white">
          {settings.major_event_title}
        </h2>

        {/* Description */}
        <p className="mt-4 md:mt-6 text-base sm:text-xl md:text-2xl text-white/90 max-w-4xl">
          {settings.major_event_description}
        </p>

        {/* Infos date + lieu — toujours sur une ligne */}
        <div className="flex flex-row flex-wrap gap-4 sm:gap-8 mt-6 md:mt-10">
          {settings.major_event_date && (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <FaCalendarAlt size={16} className="text-white sm:text-[20px]" />
              </div>
              <span className="text-base sm:text-2xl text-white font-semibold whitespace-nowrap">
                {formatDateFr(settings.major_event_date)}
              </span>
            </div>
          )}

          {settings.major_event_location && (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt size={16} className="text-white sm:text-[20px]" />
              </div>
              <span className="text-base sm:text-2xl text-white font-semibold">
                {settings.major_event_location}
              </span>
            </div>
          )}
        </div>

        {/* Countdown + CTA — compteur toujours sur une ligne */}
        <div className="mt-10 md:mt-16 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 text-white">

          {!settings.major_event_date ? null : expired ? (
            <p className="text-xl font-semibold text-yellow-300">
              L'événement a eu lieu. Merci pour votre participation !
            </p>
          ) : (
            <div className="flex flex-row gap-2 sm:gap-4 md:gap-6">
              <CountdownCard value={timeLeft.days}    label="Jours" />
              <CountdownCard value={timeLeft.hours}   label="Heures" />
              <CountdownCard value={timeLeft.minutes} label="Minutes" />
              <CountdownCard value={timeLeft.seconds} label="Secondes" />
            </div>
          )}

          {!expired && settings.major_event_cta_label && (
            isInternalLink ? (
              <Link
                to={settings.major_event_cta_link}
                className="
                  bg-[#F0B51B] hover:bg-yellow-400
                  text-[#071F5A] font-semibold
                  text-sm sm:text-base
                  px-5 sm:px-6 py-3
                  rounded-lg
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  whitespace-nowrap
                "
              >
                {settings.major_event_cta_label}
              </Link>
            ) : (
              <a
                href={settings.major_event_cta_link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[#F0B51B] hover:bg-yellow-400
                  text-[#071F5A] font-semibold
                  text-sm sm:text-base
                  px-5 sm:px-6 py-3
                  rounded-lg
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  whitespace-nowrap
                "
              >
                {settings.major_event_cta_label}
              </a>
            )
          )}
        </div>

      </div>
    </section>
  );
}
