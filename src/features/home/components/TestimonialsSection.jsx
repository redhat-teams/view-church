import { useEffect, useRef, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Martin Bogo",
    image: "/t1.png",
    text: "À travers les enseignements du ministère, j'ai retrouvé une nouvelle force dans ma foi. Les moments de prière et les messages partagés m'ont beaucoup encouragé et m'ont aidé à avancer avec confiance.",
  },
  {
    id: 2,
    name: "Marie Théa",
    image: "/t3.png",
    text: "À travers les enseignements du ministère, j'ai retrouvé une nouvelle force dans ma foi. Les moments de prière et les messages partagés m'ont beaucoup encouragé et m'ont aidé à avancer avec confiance.",
  },
  {
    id: 3,
    name: "Jean Koffi",
    image: "/t2.png",
    text: "Le Seigneur a transformé ma vie grâce aux enseignements et à la communion fraternelle. Je recommande ce ministère à toute personne désirant grandir spirituellement.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = prev === testimonials.length - 1 ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const handleDotClick = (index) => {
    setCurrent(index);
    scrollToIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.offsetWidth + 24;
    const index = Math.round(track.scrollLeft / cardWidth);
    setCurrent(index);
  };

  // Drag-to-scroll souris
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
  };

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
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="
            flex gap-6
            overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 cursor-grab
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="
                relative bg-white rounded-lg shadow-lg p-8 min-h-[260px]
                flex-none w-[85%] snap-start
                lg:flex-none lg:w-[45%]
              "
            >
              {/* Pointe bulle */}
              <div
                className="
                  absolute bottom-[-18px] left-8
                  w-0 h-0
                  border-l-[18px] border-r-[18px] border-t-[18px]
                  border-l-transparent border-r-transparent border-t-white
                "
              />

              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="font-bold text-3xl text-black">{item.name}</h3>
                </div>
                <FaQuoteRight className="text-[#071F5A]" size={42} />
              </div>

              <div className="border-t my-6" />

              {/* Texte */}
              <p className="text-gray-800 leading-relaxed text-lg">{item.text}</p>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                w-4 h-4 rounded-full transition
                ${index === current ? "bg-blue-500" : "bg-gray-300"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}