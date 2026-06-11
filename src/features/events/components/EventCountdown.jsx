import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function EventCountdown() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("Toutes les dates");
  const [openDateFilter, setOpenDateFilter] = useState(false);

  const events = [
    {
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
      title: "Conférence Ministérielle Internationale",
      description:
        "Trois jours d'enseignements, d'adoration et de formation pour les leaders et serviteurs de Dieu.",
      date: "20 Mars 2026",
      location: "Temple Principal",
      url: "https://www.youtube.com/live/jfKfPfyJRdk",
    },

    {
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80",
      title: "Soirée de Réveil Spirituel",
      description:
        "Une nuit de louange, de prière et de restauration dans la présence de Dieu.",
      date: "24 Mars 2026",
      location: "Salle de culte",
      url: "https://www.youtube.com/live/21X5lGlDOfg",
    },

    {
      image:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
      title: "La Foi Sans les Œuvres",
      description:
        "Enseignement biblique approfondi sur la foi active et l'obéissance à Dieu.",
      date: "28 Mars 2026",
      location: "Auditorium",
      url: "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    },

    {
      image:
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80",
      title: "Retraite Spirituelle",
      description:
        "Trois jours de communion fraternelle, de méditation et de prière.",
      date: "10 Avril 2026",
      location: "Centre Chrétien",
      url: "https://www.youtube.com/watch?v=Q2cD4w4kP8Q",
    },

    {
      image:
        "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80",
      title: "Camp Jeunesse 2026",
      description:
        "Un rassemblement exceptionnel pour la jeunesse chrétienne autour de la Parole.",
      date: "18 Avril 2026",
      location: "Centre Chrétien",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },

    {
      image:
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200&q=80",
      title: "Grande Nuit de Prière",
      description:
        "Veillée de prière, intercession et prophétie pour les nations.",
      date: "25 Avril 2026",
      location: "Temple Principal",
      url: "https://www.youtube.com/live/XcrucHc6z2w",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const searchMatch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const dateMatch =
      selectedDate === "Toutes les dates" ||
      event.date.includes(selectedDate);

    return searchMatch && dateMatch;
  });

  return (
    <section
      className="
      min-h-screen
      py-24
      bg-gradient-to-b
      from-[#F8F9FC]
      via-white
      to-[#F4F6FB]
    "
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="
            inline-block
            bg-[#E5B10E]/10
            text-[#E5B10E]
            px-5
            py-2
            rounded-full
            text-sm
            font-bold
            uppercase
            tracking-widest
            mb-6
          "
          >
            Agenda Spirituel
          </span>

          <h1
            className="
            text-5xl
            md:text-6xl
            font-extrabold
            text-[#071F5A]
            leading-tight
          "
          >
            Nos Événements
          </h1>

          <p
            className="
            mt-8
            text-lg
            md:text-xl
            text-gray-600
            leading-relaxed
            max-w-3xl
            mx-auto
          "
          >
            Participez à des rencontres spirituelles riches en enseignements,
            en prière et en partage pour grandir ensemble dans la foi.
          </p>
        </div>

        {/* FILTRES */}
        <div className="flex flex-col xl:flex-row justify-center gap-6 mt-20">
          <div
            className="
            flex items-center gap-4
            bg-white
            border border-gray-200
            rounded-2xl
            h-16
            px-6
            w-full xl:w-[450px]
            shadow-sm
          "
          >
            <Search size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="relative w-full xl:w-[320px]">
            <button
              onClick={() => setOpenDateFilter(!openDateFilter)}
              className="
                flex items-center justify-between
                h-16
                w-full
                px-6
                bg-white
                border border-gray-200
                rounded-2xl
                shadow-sm
              "
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>{selectedDate}</span>
              </div>

              <ChevronDown
                className={`transition-transform ${
                  openDateFilter ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDateFilter && (
              <div
                className="
                absolute top-full mt-2
                w-full
                bg-white
                rounded-2xl
                shadow-xl
                border
                overflow-hidden
                z-50
              "
              >
                {[
                  "Toutes les dates",
                  "Mars 2026",
                  "Avril 2026",
                ].map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setOpenDateFilter(false);
                    }}
                    className="
                      w-full
                      text-left
                      px-5
                      py-4
                      hover:bg-gray-50
                    "
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COMPTEUR */}
        <div className="text-center mt-10">
          <span
            className="
            inline-flex
            items-center
            bg-white
            px-5
            py-3
            rounded-full
            shadow-md
            text-[#071F5A]
            font-semibold
          "
          >
            {filteredEvents.length} événement(s) disponible(s)
          </span>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {filteredEvents.map((event, index) => (
            <article
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border border-gray-100
                shadow-[0_4px_24px_rgba(7,31,90,0.08)]
                hover:-translate-y-3
                hover:shadow-[0_20px_60px_rgba(7,31,90,0.15)]
                transition-all
                duration-500
              "
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    h-[260px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div
                  className="
                  absolute top-4 left-4
                  bg-[#E5B10E]
                  text-[#071F5A]
                  px-4 py-2
                  rounded-full
                  text-xs
                  font-bold
                  uppercase
                "
                >
                  Événement
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#071F5A]">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[#071F5A]">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[#071F5A]">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>

                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    bg-[#E5B10E]
                    hover:bg-[#d4a40d]
                    text-[#071F5A]
                    font-semibold
                    px-6
                    py-3
                    rounded-xl
                    transition-all
                    duration-300
                    hover:gap-4
                  "
                >
                  Participer
                  <ArrowRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-500">
              Aucun événement trouvé.
            </p>
          </div>
        )}

        {/* FOOTER BUTTON */}
        <div className="flex justify-center mt-20">
          <button
            className="
              bg-[#071F5A]
              hover:bg-[#0A2D7A]
              text-white
              px-10
              py-4
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              hover:-translate-y-1
              shadow-lg
            "
          >
            Voir tous les événements
          </button>
        </div>
      </div>
    </section>
  );
}