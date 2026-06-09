import { useEffect, useState } from "react";
import {
  FaHeart,
  FaBookOpen,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

const donationCards = [
  {
    icon: FaBookOpen,
    title: "Enseignement",
    description:
      "Financez la production de contenus spirituels",
  },
  {
    icon: FaUsers,
    title: "Missions",
    description:
      "Soutenez l'évangélisation et les croisades",
  },
  {
    icon: FaHandsHelping,
    title: "Actions Sociales",
    description:
      "Participez à l'aide des familles et personnes vulnérables",
  },
];

export default function DonationSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % donationCards.length
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const visibleCards = [
    donationCards[activeIndex],
    donationCards[(activeIndex + 1) % donationCards.length],
  ];

  return (
    <section className="bg-[#f5f5f5] py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* TITRE */}

        <div className="text-center">

          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-black">
            Soutenez notre mission
          </h2>

          {/* DÉCORATION */}

          <div className="flex justify-center items-center gap-3 mt-5">

            <div className="w-14 h-2 bg-[#0B4A87]" />

            {donationCards.map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-[#0B4A87]"
                    : "bg-slate-300"
                }`}
              />
            ))}

          </div>

          <p className="mt-8 text-lg md:text-2xl text-gray-800 max-w-5xl mx-auto leading-relaxed">
            Votre générosité permet de répandre l'évangile,
            de former des disciples et de transformer des vies.
            Chaque don compte dans l'avancement du Royaume de Dieu.
          </p>

        </div>

        {/* CARTES */}

        <div className="mt-24 flex flex-col lg:flex-row justify-center items-center gap-12">

          {visibleCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="relative animate-fadeIn"
              >

                {/* ICON BOX */}

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-[22px] shadow-xl flex items-center justify-center z-10">

                  <Icon
                    size={36}
                    className="text-[#071F5A]"
                  />

                </div>

                {/* CARD */}

                <div className="w-[320px] md:w-[360px] h-[260px] rounded-[25px] bg-gradient-to-br from-[#071F5A] to-[#2F8BEA] text-white shadow-xl flex flex-col justify-center items-center text-center px-10">

                  <h3 className="text-3xl font-bold mb-6">
                    {card.title}
                  </h3>

                  <p className="text-xl leading-relaxed">
                    {card.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* BOUTON DON */}

        <div className="flex justify-center mt-20">

          <button className="bg-[#E7B116] hover:bg-[#d7a10f] transition-all duration-300 rounded-full px-10 md:px-20 py-5 flex items-center gap-5 shadow-lg">

            <FaHeart
              size={30}
              className="text-[#071F5A]"
            />

            <span className="text-[#071F5A] text-xl md:text-3xl font-bold">
              Faire un don maintenant
            </span>

          </button>

        </div>

      </div>

    </section>
  );
}