import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutLeadersSection() {
  const leaders = [
    {
      image: "/images/about/pastor1.jpg",
      name: "Pasteur Claude Ope",
      role: "Fondateur & Pasteur principal",
    },
    {
      image: "/images/about/pastor2.jpg",
      name: "Pasteur Jean Doe",
      role: "Pasteur associé",
    },
    {
      image: "/images/about/pastor3.jpg",
      name: "Pasteur Marc Doe",
      role: "Responsable ministère",
    },
    {
      image: "/images/about/pastor4.jpg",
      name: "Pasteur Sarah Doe",
      role: "Responsable prière",
    },
    {
      image: "/images/about/pastor5.jpg",
      name: "Pasteur Ruth Doe",
      role: "Responsable jeunesse",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % leaders.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [leaders.length]);

  const getVisibleCards = () => {
    return [
      leaders[current % leaders.length],
      leaders[(current + 1) % leaders.length],
      leaders[(current + 2) % leaders.length],
    ];
  };

  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-28">

      {/* Halo jaune animé */}
      <motion.div
        animate={{
          x: [0, 250, -150, 0],
          y: [0, -100, 120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
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

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {getVisibleCards().map((leader, index) => (
                <motion.div
                  key={leader.image}
                  animate={{
                    scale: index === 1 ? 1.05 : 0.95,
                  }}
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
                    className="h-[380px] w-full object-cover"
                  />

                  <div className="bg-white text-center py-6 px-4">

                    <h3 className="font-bold text-2xl text-[#071F5A]">
                      {leader.name}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {leader.role}
                    </p>

                  </div>

                </motion.div>
              ))}
            </motion.div>

          </AnimatePresence>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-14">

            {leaders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  w-4 h-4 rounded-full transition-all duration-300
                  ${
                    index === current
                      ? "bg-[#F0B51B] scale-125"
                      : "bg-white"
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