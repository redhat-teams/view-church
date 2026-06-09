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
      image: "/images/events/event1.jpg",
      title: "Conférence Ministérielle",
      description:
        "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
      date: "20 Mars 2026",
      location: "Salle de culte",
    },
    {
      image: "/images/events/event2.jpg",
      title: "Soirée de réveil",
      description:
        "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
      date: "24 Mars 2026",
      location: "Salle de culte",
    },
    {
      image: "/images/events/event3.jpg",
      title: "La foi sans les oeuvres",
      description:
        "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
      date: "28 Mars 2026",
      location: "Salle de culte",
    },
    {
      image: "/images/events/event4.jpg",
      title: "Retraite Spirituelle",
      description:
        "Trois jours de communion, d'enseignement et de prière.",
      date: "10 Avril 2026",
      location: "Centre Chrétien",
    },
    {
      image: "/images/events/event5.jpg",
      title: "Camp Jeunesse",
      description:
        "Un moment exceptionnel pour la jeunesse chrétienne.",
      date: "18 Avril 2026",
      location: "Centre Chrétien",
    },
    {
      image: "/images/events/event6.jpg",
      title: "Nuit de Prière",
      description:
        "Veillée de prière et d'intercession.",
      date: "25 Avril 2026",
      location: "Salle de culte",
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
    <section className="bg-[#F8F8F8] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl font-bold text-[#071F5A]">
            Événements
          </h1>

          <p className="mt-8 text-2xl font-medium leading-relaxed">
            Participez à des rencontres spirituelles riches en enseignements,
            en prière et en partage, pour grandir ensemble dans la foi.
          </p>

        </div>

        {/* Filtres */}
        <div className="flex flex-col xl:flex-row justify-center gap-6 mt-20">

          {/* Recherche */}
          <div
            className="
              flex items-center gap-5
              bg-white
              border-2 border-[#071F5A]
              rounded-3xl
              h-20
              px-8
              w-full
              xl:w-[500px]
            "
          >
            <Search size={28} className="text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher par thème, prédicateur"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                outline-none
                bg-transparent
              "
            />
          </div>

          {/* Filtre Date */}
          <div className="relative w-full xl:w-[470px]">

            <button
              onClick={() => setOpenDateFilter(!openDateFilter)}
              className="
                flex items-center justify-between
                h-20
                w-full
                px-8
                bg-white
                border-2 border-[#071F5A]
                rounded-3xl
              "
            >
              <div className="flex items-center gap-5">

                <Calendar size={24} />

                <span className="text-gray-600">
                  {selectedDate}
                </span>

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
                  absolute
                  top-full
                  mt-3
                  w-full
                  bg-white
                  rounded-2xl
                  border
                  shadow-xl
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
                      px-6
                      py-4
                      hover:bg-gray-100
                    "
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Bouton filtre */}
          <button
            className="
              bg-[#E5B10E]
              text-[#071F5A]
              font-bold
              px-10
              rounded-2xl
              h-20
              hover:bg-[#d7a50d]
              transition-all
            "
          >
            Appliquer le filtre
          </button>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {filteredEvents.map((event, index) => (
            <article
              key={index}
              className="
                bg-white
                rounded-3xl
                border
                overflow-hidden
                shadow-sm
                hover:-translate-y-2
                transition-all
              "
            >
              <img
                src={event.image}
                alt={event.title}
                className="
                  h-[280px]
                  w-full
                  object-cover
                  p-3
                  rounded-[25px]
                "
              />

              <div className="px-5 pb-5">

                <h3 className="text-3xl font-bold text-[#071F5A]">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {event.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[#071F5A]">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-[#071F5A]">
                    <MapPin size={18} />
                    <span>{event.location}</span>
                  </div>

                  <button
                    className="
                      bg-[#E5B10E]
                      px-8
                      py-3
                      rounded-xl
                      flex items-center
                      gap-3
                      hover:bg-[#d7a50d]
                    "
                  >
                    Lire plus
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center mt-20 text-xl text-gray-500">
            Aucun événement trouvé.
          </div>
        )}

        {/* Charger plus */}
        <div className="flex justify-center mt-24">

          <button
            className="
              bg-[#E5B10E]
              text-[#071F5A]
              font-bold
              text-2xl
              px-20
              py-6
              rounded-2xl
              hover:bg-[#d7a50d]
              transition-all
            "
          >
            Charger plus
          </button>

        </div>

      </div>
    </section>
  );
}