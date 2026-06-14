import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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

export default function MajorEventSection() {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(2026, 6, 22, 23, 59, 59).getTime();
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
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-14 md:py-24">
      {/* Fond décoratif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
          <span className="font-semibold text-sm sm:text-base text-white">Évènement Majeur - Église</span>
        </div>

        {/* Titre */}
        <h2 className="mt-5 md:mt-8 text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight max-w-5xl text-white">
          Conférence Internationale du Réveil 2026
        </h2>

        {/* Description */}
        <p className="mt-4 md:mt-6 text-base sm:text-xl md:text-2xl text-white/90 max-w-4xl">
          Rejoignez-nous pour un moment exceptionnel de réveil spirituel, de prière, d'adoration et d'enseignement.
        </p>

        {/* Infos date + lieu — toujours sur une ligne */}
        <div className="flex flex-row flex-wrap gap-4 sm:gap-8 mt-6 md:mt-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <FaCalendarAlt size={16} className="text-white sm:text-[20px]" />
            </div>
            <span className="text-base sm:text-2xl text-white font-semibold whitespace-nowrap">22/07/2026</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <FaMapMarkerAlt size={16} className="text-white sm:text-[20px]" />
            </div>
            <span className="text-base sm:text-2xl text-white font-semibold">Salle de conférence de l'église</span>
          </div>
        </div>

        {/* Countdown + CTA — compteur toujours sur une ligne */}
        <div className="mt-10 md:mt-16 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 text-white">

          {expired ? (
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

          {!expired && (
            <Link
              to="/contact"
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
              Rejoindre maintenant
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}