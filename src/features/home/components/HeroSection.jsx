import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1920",
      title: (
        <>
          Expérimenter la{" "}
          <span className="text-[#F0B51B]">
            puissance de la Parole de Vie
          </span>{" "}
          et de la
          <br />
          <span className="text-[#F0B51B]">prière exaucée</span>
        </>
      ),
      buttonText: "Découvrir le Ministère",
      buttonLink: "#ministere-about",
    },

    {
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920",
      title: (
        <>
          Vivre la{" "}
          <span className="text-[#F0B51B]">
            puissance de la Parole de Vie
          </span>
          <br />
          à travers la{" "}
          <span className="text-[#F0B51B]">
            prière exaucée
          </span>
        </>
      ),
      buttonText: "Nos Programmes",
      buttonLink: "/cellule",
    },

    {
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1920",
      title: (
        <>
          Découvrir la{" "}
          <span className="text-[#F0B51B]">
            puissance de la Parole de Vie
          </span>
          <br />
          et expérimenter la{" "}
          <span className="text-[#F0B51B]">
            prière exaucée
          </span>
        </>
      ),
      buttonText: "Rejoindre la Communauté",
      buttonLink: "/contact",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      onClick={nextSlide}
      className="relative min-h-screen overflow-hidden cursor-pointer"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-105"
        style={{
          backgroundImage: `url(${slides[activeSlide].image})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

      {/* Décorations */}
      <div className="absolute left-16 top-40 text-7xl text-gray-300 opacity-40 select-none">
        ×
      </div>

      <div className="absolute left-72 bottom-48 text-6xl text-gray-300 opacity-30 select-none">
        ×
      </div>

      <div className="absolute right-72 top-32 text-6xl text-white opacity-70 select-none">
        +
      </div>

      <div className="absolute right-52 bottom-32 text-7xl text-white opacity-70 select-none">
        +
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="max-w-4xl">
          {/* Titre */}
          <h1
            key={activeSlide}
            className="
              text-4xl
              md:text-6xl
              font-extrabold
              leading-tight
              text-gray-900
              animate-[fadeIn_0.8s_ease]
            "
          >
            {slides[activeSlide].title}
          </h1>

          {/* Sous-titre */}
          <p
            key={`subtitle-${activeSlide}`}
            className="
              mt-8
              text-2xl
              text-gray-700
              animate-[fadeIn_1s_ease]
            "
          >
            Porter la parole de Dieu et impacter les vies.
          </p>

          <p className="mt-4 text-lg text-gray-600 max-w-xl leading-relaxed">
            Rejoignez une communauté vivante dédiée à la transformation
            spirituelle, à l'enseignement de la Parole de Dieu et au service
            du Royaume.
          </p>

          {/* Bouton dynamique */}
          <a
              href={slides[activeSlide].buttonLink}
              onClick={(e) => e.stopPropagation()}
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                bg-[#F0B51B]
                hover:bg-[#dca20f]
                text-[#071F5A]
                px-7
                py-3
                rounded-lg
                font-semibold
                text-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                group
              "
            >
              {slides[activeSlide].buttonText}

              <span className="transition-transform duration-300 group-hover:translate-y-1">
                +
              </span>
            </a>

          {/* Indicateurs */}
          <div className="flex gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeSlide === index
                    ? "w-12 bg-[#F0B51B]"
                    : "w-3 bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}