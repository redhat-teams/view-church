import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const events = [
  {
    title: "Conférence Ministérielle",
    description:
      "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
    date: "20 Mars 2026",
    location: "Salle de culte",
    image: "/images/event1.jpg",
  },
  {
    title: "Soirée de réveil",
    description:
      "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
    date: "24 Mars 2026",
    location: "Salle de culte",
    image: "/images/event2.jpg",
  },
  {
    title: "La foi sans les oeuvres",
    description:
      "Formation approfondie sur le leadership spirituel et l'évangélisation moderne.",
    date: "28 Mars 2026",
    location: "Salle de culte",
    image: "/images/event3.jpg",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#071F5A]">
            Evènements à venir
          </h2>

          <p className="mt-6 text-xl text-gray-700">
            Rejoignez-nous pour nos prochains rassemblements spirituels
          </p>
        </div>

        {/* CARTES */}

        <div className="grid lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="
                bg-white
                rounded-3xl
                border
                border-gray-200
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition
                duration-300
              "
            >
              {/* IMAGE */}

              <div className="p-3 pb-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    w-full
                    h-56
                    object-cover
                    rounded-2xl
                  "
                />
              </div>

              {/* CONTENU */}

              <div className="p-5">
                <h3 className="text-2xl font-bold text-black">
                  {event.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {event.description}
                </p>

                {/* DATE */}

                <div className="flex items-center gap-2 mt-5 text-[#071F5A]">
                  <FaCalendarAlt />
                  <span className="text-sm">{event.date}</span>
                </div>
              </div>

              {/* FOOTER */}

              <div className="border-t flex">
                <div className="flex-1 px-5 py-4 flex items-center gap-2 text-[#071F5A]">
                  <FaMapMarkerAlt />
                  <span className="text-sm">
                    {event.location}
                  </span>
                </div>

                <button
                  className="
                    bg-[#E8B10F]
                    hover:bg-[#d7a40d]
                    px-8
                    text-[#071F5A]
                    font-semibold
                    flex
                    items-center
                    gap-3
                    transition
                  "
                >
                  Lire plus
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOUTON BAS */}

        <div className="flex justify-center mt-16">
          <button
            className="
              bg-[#E8B10F]
              hover:bg-[#d7a40d]
              text-[#071F5A]
              font-bold
              text-xl
              px-12
              py-5
              rounded-2xl
              border-2
              border-[#071F5A]
              transition
            "
          >
            Accéder à tous les enseignements
          </button>
        </div>
      </div>
    </section>
  );
}