import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Martin Scurbi",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    text:
      "À travers les enseignements du ministère, j'ai retrouvé une nouvelle force dans ma foi. Les moments de prière et les messages partagés m'ont beaucoup encouragé et m'ont aidé à avancer avec confiance.",
  },
  {
    id: 2,
    name: "Marie Théa",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    text:
      "À travers les enseignements du ministère, j'ai retrouvé une nouvelle force dans ma foi. Les moments de prière et les messages partagés m'ont beaucoup encouragé et m'ont aidé à avancer avec confiance.",
  },
  {
    id: 3,
    name: "Jean Koffi",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    text:
      "Le Seigneur a transformé ma vie grâce aux enseignements et à la communion fraternelle. Je recommande ce ministère à toute personne désirant grandir spirituellement.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section className="py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}

        <div className="text-center mb-16">
          <h2 className="text-[#071F5A] text-4xl md:text-5xl font-extrabold mb-6">
            Ce que disent nos fidèles
          </h2>

          <p className="text-xl text-gray-700">
            Nous recevons de nouveaux témoignages à tout moment
          </p>
        </div>

        {/* CARDS */}

        <div className="grid lg:grid-cols-2 gap-10">
          {visibleTestimonials.map((item) => (
            <div
              key={item.id}
              className="
                relative
                bg-white
                rounded-lg
                shadow-lg
                p-8
                min-h-[260px]
              "
            >
              {/* Pointe bulle */}

              <div
                className="
                  absolute
                  bottom-[-18px]
                  left-8
                  w-0
                  h-0
                  border-l-[18px]
                  border-r-[18px]
                  border-t-[18px]
                  border-l-transparent
                  border-r-transparent
                  border-t-white
                "
              />

              {/* Header */}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-16
                      h-16
                      rounded-full
                      object-cover
                    "
                  />

                  <h3 className="font-bold text-3xl text-black">
                    {item.name}
                  </h3>
                </div>

                <FaQuoteRight
                  className="text-[#071F5A]"
                  size={42}
                />
              </div>

              <div className="border-t my-6" />

              {/* Texte */}

              <p className="text-gray-800 leading-relaxed text-lg">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Soutenez notre mission */}

        <div className="text-center mt-20">
          <div className="w-12 h-2 bg-[#071F5A] mx-auto mt-4 rounded-full" />

          {/* DOTS */}

          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  w-4 h-4 rounded-full transition
                  ${
                    index === current
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}