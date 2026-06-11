import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function AnimatedCounter({ target, prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString("fr-FR")}
    </>
  );
}

export default function AboutSection() {
  return (
    <section className="bg-[#F3F3F3] py-24 overflow-hidden" id="ministere-about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* IMAGE */}
          <div className="relative group">
            <div className="overflow-hidden rounded-[25px] shadow-xl">
              <img
                src="/ado.png"
                alt="Qui sommes-nous"
                className="
                  w-full
                  h-[620px]
                  object-cover
                  transition-all
                  duration-700
                  group-hover:scale-110
                "
              />
            </div>

            {/* Rectangle décoratif */}
            <div className="absolute top-10 left-8 w-40 h-12 border border-white rounded-xl backdrop-blur-md bg-white/10" />

            {/* Carte flottante */}
            <div
              className="
                absolute
                -bottom-12
                right-0
                bg-white
                rounded-[22px]
                shadow-2xl
                px-12
                py-8
                flex
                gap-16
                border
                border-[#D49A13]/20
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
              "
            >
              <div className="text-center">
                <h3 className="text-5xl font-bold text-[#F38B00]">
                  <AnimatedCounter target={8} prefix="+" duration={1400} />
                </h3>
                <p className="mt-2 text-gray-700">Existence</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-bold text-[#F38B00]">
                  <AnimatedCounter target={7} duration={1200} />
                </h3>
                <p className="mt-2 text-gray-700">Annexes</p>
              </div>
            </div>
          </div>

          {/* TEXTE */}
          <div className="animate-fadeIn">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#D49A13] mb-8">
              Qui sommes-nous ?
            </h2>

            <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
              Nous sommes une plateforme de prière, d'évangélisation et de
              réveil spirituel, inspirée et instituée par le Seigneur Jésus et
              motivée par le désir de voir des vies transformées par
              Jésus-Christ et des nations revenir à Dieu.
            </p>

            <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
              Cette page existe pour annoncer l'Évangile avec vérité, amour et
              puissance afin que les âmes soient sauvées, restaurées, guéries
              et établies dans une relation vivante avec le Seigneur.
            </p>

            <p className="italic text-gray-500 text-lg mb-14">
              "Allez, faites de toutes les nations des disciples..." — La Bible
            </p>

            {/* STATS */}
            <div className="flex flex-wrap items-center gap-10 mb-14">
              <div className="transition duration-300 hover:scale-110">
                <h3 className="text-5xl font-bold text-[#F38B00]">
                  <AnimatedCounter target={5000} prefix="+" duration={2200} />
                </h3>
                <p className="text-xl text-gray-900">Vies impactées</p>
              </div>

              <div className="hidden md:block h-20 border-l border-[#F38B00]" />

              <div className="transition duration-300 hover:scale-110">
                <h3 className="text-5xl font-bold text-[#F38B00]">
                  <AnimatedCounter target={120} prefix="+" duration={1800} />
                </h3>
                <p className="text-xl text-gray-900">Actions spirituelles</p>
              </div>
            </div>

            {/* Bouton */}
            <a
              href="#ministere"
              className="
                inline-flex
                items-center
                gap-3
                bg-[#D49A13]
                text-white
                font-semibold
                px-7
                py-3
                rounded-lg
                transition-all
                duration-300
                hover:bg-[#c58d0f]
                hover:translate-y-[-3px]
                hover:shadow-lg
                group
              "
            >
              Découvrez le Ministère
              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}