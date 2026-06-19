import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react";
import api from "../../../shared/services/api";
import { formatDate } from "../../../shared/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80";

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export default function EventCountdown() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("Toutes les dates");
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/events/", { params: { page_size: 100 } })
      .then((res) => {
        if (cancelled) return;
        const data = res.data;
        const list = Array.isArray(data) ? data : data?.results || [];
        setEvents(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Liste des "Mois Année" réellement présents dans les événements (pour le filtre)
  const dateOptions = [
    "Toutes les dates",
    ...Array.from(
      new Set(
        events.map((e) => {
          const d = new Date(e.date);
          return `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
        })
      )
    ),
  ];

  const filteredEvents = events.filter((event) => {
    const title = event.title || "";
    const description = event.description || "";
    const location = event.location || "";

    const searchMatch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase());

    let dateMatch = true;
    if (selectedDate !== "Toutes les dates") {
      const d = new Date(event.date);
      const label = `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
      dateMatch = label === selectedDate;
    }

    return searchMatch && dateMatch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

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
                max-h-64
                overflow-y-auto
              "
              >
                {dateOptions.map((date) => (
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
        {!loading && (
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
        )}

        {/* ÉTAT DE CHARGEMENT */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <Loader2 size={36} className="text-[#071F5A] animate-spin" />
            <p className="text-gray-400">Chargement des événements...</p>
          </div>
        )}

        {/* ERREUR */}
        {!loading && error && (
          <div className="text-center mt-20">
            <p className="text-lg text-red-500">
              Impossible de charger les événements pour le moment.
            </p>
          </div>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {visibleEvents.map((event) => (
              <article
                key={event.id}
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
                    src={event.image || FALLBACK_IMAGE}
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
                    {event.category || "Événement"}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#071F5A]">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mt-4 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[#071F5A]">
                    <Calendar size={16} />
                    <span>
                      {formatDate(event.date)}
                      {event.time && ` à ${event.time.slice(0, 5)}`}
                    </span>
                  </div>

                  {event.location && (
                    <div className="mt-3 flex items-center gap-2 text-[#071F5A]">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  )}

                  <button
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
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-500">
              Aucun événement trouvé.
            </p>
          </div>
        )}

        {/* FOOTER BUTTON */}
        {!loading && hasMore && (
          <div className="flex justify-center mt-20">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
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
              Voir plus d'événements
            </button>
          </div>
        )}
      </div>
    </section>
  );
}