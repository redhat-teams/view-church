import { useState, useEffect, useRef, useCallback } from "react";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const services = [
  { id: 1, title: "Culte du Dimanche",      date: "10 Mars", hour: "10h:00", description: "Un moment de louange, d'adoration et d'enseignement biblique pour toute la famille." },
  { id: 2, title: "Soirée de Réveil",        date: "12 Mars", hour: "20h:00", description: "Une soirée puissante de prière, intercession et miracles. Venez recevoir votre guérison." },
  { id: 3, title: "Étude Biblique",          date: "15 Mars", hour: "19h:00", description: "Approfondissez votre connaissance de la Parole de Dieu dans une ambiance fraternelle." },
  { id: 4, title: "Veillée Prophétique",     date: "18 Mars", hour: "22h:00", description: "Une nuit de prière intense, d'intercession et de manifestations du Saint-Esprit." },
  { id: 5, title: "Formation des Disciples", date: "20 Mars", hour: "18h:00", description: "Programme spécial de croissance spirituelle et d'enseignement biblique." },
  { id: 6, title: "Réveil des Nations",      date: "25 Mars", hour: "17h:00", description: "Un rassemblement international pour prier pour les nations et annoncer l'Évangile." },
];

function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-row items-stretch w-full">
      {/* COLONNE DATE */}
      <div className="flex flex-col flex-shrink-0 w-[72px] sm:w-20">
        <div className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-gray-100 px-1 py-3">
          <div className="w-8 h-8 rounded-full bg-[#F0B51B] flex items-center justify-center">
            <FaMapMarkerAlt className="text-[#071F5A] text-xs" />
          </div>
          <span className="font-semibold text-[10px] sm:text-xs text-center leading-tight">
            {service.date}
          </span>
        </div>
        <div className="bg-[#071F5A] text-white flex items-center justify-center font-bold text-xs sm:text-sm py-2 px-1 text-center">
          {service.hour}
        </div>
      </div>

      {/* CONTENU */}
      <div className="flex-1 p-3 sm:p-5 min-w-0">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#071F5A] mb-1 leading-tight">
          {service.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* BOUTON */}
      <div className="flex items-center pr-3 sm:pr-4 flex-shrink-0">
        <button className="bg-[#F0B51B] hover:bg-yellow-400 w-9 h-9 rounded-full flex items-center justify-center text-[#071F5A] transition">
          <FaArrowRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}

export default function WorshipSection() {
  const [current, setCurrent]     = useState(0);
  const [paused, setPaused]       = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  const startX      = useRef(null);
  const startY      = useRef(null);
  const isHoriz     = useRef(null);
  const intervalRef = useRef(null);

  // Détecter mobile (< 1024px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sur mobile : 1 service par slide. Sur desktop : 2 par slide.
  const slides = isMobile
    ? services.map((s) => [s])
    : services.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(services.slice(i, i + 2));
        return acc;
      }, []);

  const TOTAL = slides.length;

  // Remettre current dans les bornes si on change de mode
  useEffect(() => {
    setCurrent((c) => Math.min(c, TOTAL - 1));
  }, [TOTAL]);

  // Auto-play
  const startAuto = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL);
    }, 5000);
  }, [TOTAL]);

  useEffect(() => {
    if (!paused) startAuto();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [paused, startAuto]);

  const goTo = (i) => { setCurrent(i); setPaused(false); startAuto(); };

  const snap = (dx) => {
    if (dx < -40)      setCurrent((p) => (p + 1) % TOTAL);
    else if (dx > 40)  setCurrent((p) => (p - 1 + TOTAL) % TOTAL);
    setDragOffset(0);
    setDragging(false);
  };

  // Touch
  const onTouchStart = (e) => {
    startX.current  = e.touches[0].clientX;
    startY.current  = e.touches[0].clientY;
    isHoriz.current = null;
    setPaused(true);
  };
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (isHoriz.current === null) isHoriz.current = Math.abs(dx) > Math.abs(dy);
    if (!isHoriz.current) return;
    e.preventDefault();
    setDragging(true);
    setDragOffset(dx);
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    snap(isHoriz.current ? dx : 0);
    startX.current = null;
    setPaused(false);
  };

  // Mouse
  const onMouseDown = (e) => { startX.current = e.clientX; setPaused(true); setDragging(true); };
  const onMouseMove = (e) => {
    if (startX.current === null || !dragging) return;
    setDragOffset(e.clientX - startX.current);
  };
  const onMouseUp = (e) => {
    snap(e.clientX - startX.current);
    startX.current = null;
    setPaused(false);
  };
  const onMouseLeave = () => {
    if (startX.current !== null) {
      setDragOffset(0); setDragging(false);
      startX.current = null; setPaused(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* TITRE */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[#071F5A] text-3xl md:text-5xl font-extrabold mb-4 md:mb-8">
            Nos cultes et réveils
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-xl">
            Rejoignez-nous lors de nos rassemblements spirituels pour vivre des
            moments puissants de prière, d'adoration et d'enseignement biblique.
          </p>
        </div>

        {/* SLIDER */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
              transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            {slides.map((slide, si) => (
              <div key={si} className="w-full flex-shrink-0">
                {/* Desktop : 2 cartes côte à côte | Mobile : 1 carte pleine largeur */}
                <div className={`flex gap-4 md:gap-8 ${slide.length === 2 ? "" : ""}`}>
                  {slide.map((service) => (
                    <div key={service.id} className="flex-1 min-w-0">
                      <ServiceCard service={service} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center items-center gap-3 mt-8 md:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-[#071F5A] w-6 h-3"
                  : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}