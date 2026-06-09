import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CalendarDays,
  Clock3,
} from "lucide-react";

export default function TeachingPlayer() {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedType, setSelectedType] = useState("Tous");

  const messages = [
    {
      image: "/images/messages/message1.jpg",
      title: "La puissance de la foi qui déplace les montagnes",
      date: "5 Mars 2026",
      duration: "45:30",
      author: "Evg. Pascal Huiler",
      type: "Vidéo",
    },
    {
      image: "/images/messages/message2.jpg",
      title: "La puissance de la foi qui déplace les montagnes",
      date: "5 Mars 2026",
      duration: "45:30",
      author: "Evg. Pascal Huiler",
      type: "Audio",
    },
    {
      image: "/images/messages/message3.jpg",
      title: "La puissance de la foi qui déplace les montagnes",
      date: "5 Mars 2026",
      duration: "45:30",
      author: "Evg. Pascal Huiler",
      type: "Vidéo",
    },
    {
      image: "/images/messages/message4.jpg",
      title: "Marcher dans la grâce de Dieu",
      date: "12 Mars 2026",
      duration: "38:15",
      author: "Pasteur Claude Ope",
      type: "Audio",
    },
    {
      image: "/images/messages/message5.jpg",
      title: "Vivre une vie de prière efficace",
      date: "20 Mars 2026",
      duration: "52:10",
      author: "Pasteur Claude Ope",
      type: "Vidéo",
    },
    {
      image: "/images/messages/message6.jpg",
      title: "L'espérance qui transforme",
      date: "28 Mars 2026",
      duration: "41:05",
      author: "Pasteur Claude Ope",
      type: "Audio",
    },
  ];

  const filteredMessages = messages.filter((message) => {
    const matchSearch =
      message.title.toLowerCase().includes(search.toLowerCase()) ||
      message.author.toLowerCase().includes(search.toLowerCase());

    const matchType =
      selectedType === "Tous" || message.type === selectedType;

    return matchSearch && matchType;
  });

  return (
    <section className="bg-[#F8F8F8] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* INTRO */}
        <div className="text-center max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold text-[#071F5A]">
            Messages
          </h1>

          <p className="mt-8 text-2xl font-medium text-gray-800 leading-relaxed">
            Découvrez des messages puissants, accessibles et ancrés dans la
            Parole de Dieu, pour vous accompagner dans votre croissance
            spirituelle et renforcer votre foi.
          </p>

        </div>

        {/* FILTRES */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 mt-20">

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
              lg:w-[500px]
            "
          >
            <Search size={28} className="text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par thème, prédicateur"
              className="
                w-full
                bg-transparent
                outline-none
                text-gray-700
              "
            />
          </div>

          {/* Dropdown */}
          <div className="relative w-full lg:w-[500px]">

            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="
                flex items-center justify-between
                bg-white
                border-2 border-[#071F5A]
                rounded-3xl
                h-20
                px-8
                w-full
              "
            >
              <div className="flex items-center gap-5">
                <Filter size={24} />

                <span className="text-gray-600">
                  {selectedType === "Tous"
                    ? "Filtrer par type (Audio & Vidéo)"
                    : selectedType}
                </span>
              </div>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  openFilter ? "rotate-180" : ""
                }`}
              />
            </button>

            {openFilter && (
              <div
                className="
                  absolute
                  top-full
                  left-0
                  mt-3
                  w-full
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  overflow-hidden
                  z-50
                "
              >
                {["Tous", "Audio", "Vidéo"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedType(option);
                      setOpenFilter(false);
                    }}
                    className="
                      w-full
                      text-left
                      px-6
                      py-4
                      hover:bg-gray-100
                      transition-colors
                    "
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* LISTE DES MESSAGES */}
        <div className="grid lg:grid-cols-3 gap-8 mt-24">

          {filteredMessages.map((message, index) => (
            <article
              key={index}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-[#F3D8DE]
                shadow-sm
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="relative">

                <img
                  src={message.image}
                  alt={message.title}
                  className="w-full h-[280px] object-cover"
                />

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    bg-[#E6B012]
                    px-4
                    py-2
                    flex items-center gap-2
                    text-sm
                    font-medium
                  "
                >
                  <Clock3 size={14} />
                  {message.duration}
                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center gap-3 text-sm text-gray-500">

                  <div className="w-7 h-7 rounded-full bg-[#E6B012] flex items-center justify-center">
                    <CalendarDays size={12} />
                  </div>

                  {message.date}

                </div>

                <h3 className="mt-5 text-3xl font-bold text-gray-800 leading-tight">
                  {message.title}
                </h3>

                <div className="mt-8 pt-5 border-t flex items-center gap-3">

                  <img
                    src="/images/avatar.jpg"
                    alt={message.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <span className="text-sm font-medium">
                    {message.author}
                  </span>

                </div>

              </div>
            </article>
          ))}

        </div>

        {/* Aucun résultat */}
        {filteredMessages.length === 0 && (
          <div className="text-center mt-20 text-gray-500 text-xl">
            Aucun message trouvé.
          </div>
        )}

        {/* Charger plus */}
        <div className="flex justify-center mt-24">

          <button
            className="
              bg-[#E6B012]
              hover:bg-[#d9a50f]
              text-[#071F5A]
              font-bold
              text-2xl
              px-20
              py-6
              rounded-2xl
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