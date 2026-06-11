import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutLeadersSection() {
  const leaders = [
    {
      image: "/oratrice.png",
      name: "Christine Michaud",
      role: "Fondateur & Pasteur principal",
    },
    {
      image: "/p1.png",
      name: "Pasteur Jean Doe",
      role: "Pasteur associé",
    },
    {
      image: "/p2.png",
      name: "Pasteur Marc Doe",
      role: "Responsable ministère",
    },
    {
      image: "/p3.png",
      name: "Pasteur jeremie Doue",
      role: "Responsable prière",
    },
    {
      image: "/p5.png",
      name: "Pasteur Ruth Doe",
      role: "Responsable jeunesse",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch / drag refs
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % leaders.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [leaders.length, isPaused]);

  const goNext = () => setCurrent((prev) => (prev + 1) % leaders.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + leaders.length) % leaders.length);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (diffX > diffY && diffX > 5) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (isDragging.current) {
      if (diffX < -50) goNext();
      else if (diffX > 50) goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
    setIsPaused(false);
  };

  // Mouse drag handlers (desktop)
  const mouseStartX = useRef(null);
  const isMouseDragging = useRef(false);

  const handleMouseDown = (e) => {
    mouseStartX.current = e.clientX;
    isMouseDragging.current = false;
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (mouseStartX.current === null) return;
    if (Math.abs(e.clientX - mouseStartX.current) > 5) {
      isMouseDragging.current = true;
    }
  };

  const handleMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;
    if (isMouseDragging.current) {
      if (diffX < -50) goNext();
      else if (diffX > 50) goPrev();
    }
    mouseStartX.current = null;
    isMouseDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    mouseStartX.current = null;
    isMouseDragging.current = false;
    setIsPaused(false);
  };

  const getVisibleCards = () => [
    leaders[current % leaders.length],
    leaders[(current + 1) % leaders.length],
    leaders[(current + 2) % leaders.length],
  ];

  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-28">

      {/* Halo jaune animé */}
      <motion.div
        animate={{ x: [0, 250, -150, 0], y: [0, -100, 120, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="
          absolute
          w-[700px]
          h-[700px]
          rounded-full
          bg-[#F0B51B]
          opacity-30
          blur-[180px]
          -left-40
          top-20
        "
      />

      {/* Halo bleu */}
      <div
        className="
          absolute
          right-0
          bottom-0
          w-[600px]
          h-[600px]
          rounded-full
          bg-blue-500/20
          blur-[180px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-white font-semibold text-xl">
            Nos Leaders/Pasteurs
          </span>
          <h2 className="text-white font-bold text-5xl mt-6 max-w-4xl mx-auto">
            Des serviteurs engagés pour guider, enseigner
            et accompagner.
          </h2>
        </div>

        {/* Carousel */}
        <div className="mt-20">

          {/* Zone swipeable */}
          <div
            className="cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {getVisibleCards().map((leader, index) => (
                  <motion.div
                    key={leader.image}
                    animate={{ scale: index === 1 ? 1.05 : 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="
                      border-2
                      border-[#F0B51B]
                      rounded-3xl
                      overflow-hidden
                      bg-white/95
                      backdrop-blur
                    "
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      draggable={false}
                      className="h-[380px] w-full object-cover pointer-events-none"
                    />
                    <div className="bg-white text-center py-6 px-4">
                      <h3 className="font-bold text-2xl text-[#071F5A]">
                        {leader.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{leader.role}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flèches de navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={goPrev}
              className="
                w-12 h-12
                rounded-full
                border-2 border-white/30
                text-white
                flex items-center justify-center
                hover:bg-white/10
                transition-all duration-300
                text-xl
              "
              aria-label="Précédent"
            >
              ←
            </button>

            {/* Pagination */}
            <div className="flex gap-4">
              {leaders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`
                    w-4 h-4 rounded-full transition-all duration-300
                    ${index === current ? "bg-[#F0B51B] scale-125" : "bg-white"}
                  `}
                  aria-label={`Aller au leader ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="
                w-12 h-12
                rounded-full
                border-2 border-white/30
                text-white
                flex items-center justify-center
                hover:bg-white/10
                transition-all duration-300
                text-xl
              "
              aria-label="Suivant"
            >
              →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}