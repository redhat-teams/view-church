import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
function CountdownCard({ value, label }) {
  return (
    <div
      className="
        w-[95px]
        h-[95px]
        md:w-[120px]
        md:h-[120px]
        rounded-xl
        border
        border-white/20
        backdrop-blur-md
        flex
        flex-col
        justify-center
        items-center
        shadow-lg
      "
    >
      <span
        className="
          text-4xl
          md:text-6xl
          font-extrabold
          leading-none
          tabular-nums
        "
      >
        {value}
      </span>

      <span className="mt-2 text-sm md:text-lg">
        {label}
      </span>
    </div>
  );
}

export default function MajorEventSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // 22 juillet 2026 à 23:59:59
    const targetDate = new Date(2026, 6, 22, 23, 59, 59).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-24">
      {/* Motif fond */}
      <div
        className="
          absolute
          inset-0
          opacity-10
          bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]
          bg-[length:30px_30px]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            px-10
            py-4
            rounded-full
            bg-white/10
            border
            border-white/10
            backdrop-blur-sm
          "
        >
          <span className="font-semibold text-lg text-white">
            Évènement Majeur - Église
          </span>
        </div>

        {/* Titre */}
        <h2
          className="
            mt-8
            text-4xl
            md:text-6xl
            font-extrabold
            leading-tight
            max-w-5xl
            text-white
          "
        >
          Conférence Internationale du Réveil 2026
        </h2>

        {/* Description */}
        <p
          className="
            mt-6
            text-xl
            md:text-2xl
            text-white/90
            max-w-4xl
          "
        >
          Rejoignez-nous pour un moment exceptionnel
          de réveil spirituel, de prière,
          d'adoration et d'enseignement.
        </p>

        {/* Infos */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          <div className="flex items-center gap-4">
            <div
              className="
                w-12
                h-12
                rounded-lg
                bg-white/10
                flex
                items-center
                justify-center
              "
            >
              <FaCalendarAlt size={20} className="text-white" />
            </div>
            <span className="text-2xl text-white font-semibold">
              22/07/2026
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                w-12
                h-12
                rounded-lg
                bg-white/10
                flex
                items-center
                justify-center
              "
            >
              <FaMapMarkerAlt size={20} className="text-white" />
            </div>
            <span className="text-2xl text-white font-semibold">
              Salle de conférence de l'église
            </span>
          </div>
        </div>

        {/* Countdown + CTA */}
        <div
          className="
            mt-16
            flex
            flex-col
            xl:flex-row
            justify-between
            items-start
            xl:items-center
            gap-10
            text-white
          "
        >
          {/* Compteur */}
          {expired ? (
            <p className="text-2xl font-semibold text-yellow-300">
              L'événement a eu lieu. Merci pour votre participation !
            </p>
          ) : (
            <div className="flex flex-wrap gap-6">
              <CountdownCard value={timeLeft.days} label="Jours" />
              <CountdownCard value={timeLeft.hours} label="Heures" />
              <CountdownCard value={timeLeft.minutes} label="Minutes" />
              <CountdownCard value={timeLeft.seconds} label="Secondes" />
            </div>
          )}

          {/* Bouton */}
          {!expired && (
            <Link
              to='/contact'
              className="
                bg-[#F0B51B]
                hover:bg-yellow-400
                text-[#071F5A]
                font-semibold
                text-base
                px-6
                py-3
                rounded-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
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