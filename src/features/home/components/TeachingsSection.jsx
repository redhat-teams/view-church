import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlayCircle,
} from "react-icons/fa";

const teachings = [
  {
    id: 1,
    image: "/images/teaching1.jpg",
    title: "La puissance de la foi qui déplace les montagnes",
    date: "5 Mars 2026",
    duration: "45:30",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 2,
    image: "/images/teaching2.jpg",
    title: "La puissance de la Croix de Jésus-Christ",
    date: "7 Mars 2026",
    duration: "45:30",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 3,
    image: "/images/teaching3.jpg",
    title: "Le Saint-Esprit notre consolateur",
    date: "10 Mars 2026",
    duration: "38:12",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 4,
    image: "/images/teaching4.jpg",
    title: "Marcher dans la victoire de Christ",
    date: "12 Mars 2026",
    duration: "52:08",
    author: "Evg. Pascal Huilier",
  },
];

export default function TeachingsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [];

  for (let i = 0; i < teachings.length; i += 2) {
    slides.push(teachings.slice(i, i + 2));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-24 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}

        <div className="text-center mb-20">
          <h2 className="text-[#071F5A] text-4xl md:text-5xl font-extrabold mb-8">
            Derniers enseignements
          </h2>

          <p className="text-xl text-gray-700">
            Nourrissez votre foi avec nos messages inspirants
          </p>
        </div>

        {/* CARROUSEL */}

        <div className="overflow-hidden">
          <div
            className="flex transition-all duration-700"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                <div className="grid lg:grid-cols-2 gap-10">
                  {slide.map((item) => (
                    <div
                      key={item.id}
                      className="
                        bg-white
                        rounded-3xl
                        overflow-hidden
                        border
                        border-[#F0B51B]
                        shadow-xl
                        hover:-translate-y-2
                        transition
                      "
                    >
                      {/* IMAGE */}

                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                            w-full
                            h-[280px]
                            object-cover
                          "
                        />

                        {/* DURÉE */}

                        <div
                          className="
                            absolute
                            bottom-4
                            right-4
                            bg-[#F0B51B]
                            text-[#071F5A]
                            px-4
                            py-2
                            rounded
                            font-bold
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <FaPlayCircle />
                          {item.duration}
                        </div>
                      </div>

                      {/* CONTENU */}

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-gray-600 text-sm mb-5">
                          <FaCalendarAlt className="text-[#F0B51B]" />

                          {item.date}
                        </div>

                        <h3
                          className="
                            text-2xl
                            font-bold
                            text-[#071F5A]
                            leading-tight
                            mb-8
                          "
                        >
                          {item.title}
                        </h3>

                        <div className="border-t pt-4 flex items-center gap-3">
                          <img
                            src="/images/profile.jpg"
                            alt=""
                            className="
                              w-10
                              h-10
                              rounded-full
                              object-cover
                            "
                          />

                          <span className="text-sm font-medium">
                            {item.author}
                          </span>
                        </div>
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
              onClick={() =>
                setCurrentSlide(index)
              }
              className={`
                w-4 h-4 rounded-full transition
                ${
                  currentSlide === index
                    ? "bg-[#0B63CE] scale-125"
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