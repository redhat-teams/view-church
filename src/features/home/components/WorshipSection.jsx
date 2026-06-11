import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Culte du Dimanche",
    date: "10 Mars",
    hour: "10h:00",
    description:
      "Un moment de louange, d'adoration et d'enseignement biblique pour toute la famille.",
  },
  {
    id: 2,
    title: "Soirée de Réveil",
    date: "12 Mars",
    hour: "20h:00",
    description:
      "Une soirée puissante de prière, intercession et miracles. Venez recevoir votre guérison.",
  },
  {
    id: 3,
    title: "Étude Biblique",
    date: "15 Mars",
    hour: "19h:00",
    description:
      "Approfondissez votre connaissance de la Parole de Dieu dans une ambiance fraternelle.",
  },
  {
    id: 4,
    title: "Veillée Prophétique",
    date: "18 Mars",
    hour: "22h:00",
    description:
      "Une nuit de prière intense, d'intercession et de manifestations du Saint-Esprit.",
  },
  {
    id: 5,
    title: "Formation des Disciples",
    date: "20 Mars",
    hour: "18h:00",
    description:
      "Programme spécial de croissance spirituelle et d'enseignement biblique.",
  },
  {
    id: 6,
    title: "Réveil des Nations",
    date: "25 Mars",
    hour: "17h:00",
    description:
      "Un rassemblement international pour prier pour les nations et annoncer l'Évangile.",
  },
];

export default function WorshipSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [];

  for (let i = 0; i < services.length; i += 2) {
    slides.push(services.slice(i, i + 2));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-24 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}

        <div className="text-center mb-20">
          <h2 className="text-[#071F5A] text-4xl md:text-5xl font-extrabold mb-8">
            Nos cultes et réveils
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700 text-lg md:text-xl">
            Rejoignez-nous lors de nos rassemblements spirituels
            pour vivre des moments puissants de prière,
            d'adoration et d'enseignement biblique.
          </p>
        </div>

        {/* SLIDER */}

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {slide.map((service) => (
                    <div
                      key={service.id}
                      className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        overflow-hidden
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        hover:-translate-y-2
                        transition-all
                        duration-300
                      "
                    >
                      {/* DATE */}

                      <div className="flex md:flex-col">
                        <div
                          className="
                            bg-white
                            w-24
                            h-24
                            flex
                            flex-col
                            items-center
                            justify-center
                            border-r
                          "
                        >
                          <div
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-[#F0B51B]
                              flex
                              items-center
                              justify-center
                              mb-2
                            "
                          >
                            <FaMapMarkerAlt className="text-[#071F5A]" />
                          </div>

                          <span className="font-semibold">
                            {service.date}
                          </span>
                        </div>

                        <div
                          className="
                            bg-[#071F5A]
                            text-white
                            w-24
                            h-14
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-xl
                          "
                        >
                          {service.hour}
                        </div>
                      </div>

                      {/* CONTENU */}

                      <div className="flex-1 p-8">
                        <h3 className="text-2xl font-bold text-[#071F5A] mb-3">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* BOUTON */}

                      <div className="px-8 pb-8 md:pb-0">
                        <button
                          className="
                            bg-[#F0B51B]
                            hover:bg-yellow-400
                            px-4
                            py-3
                            rounded-full
                            font-bold
                            text-[#071F5A]
                            flex
                            items-center
                            gap-3
                            transition
                          "
                        >
                          Voir plus
                          <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}

        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-4 h-4 rounded-full transition-all
                ${
                  currentSlide === index
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}