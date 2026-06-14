import { useEffect, useState } from "react";
import {
  FaHeart,
  FaCross,
  FaPrayingHands,
  FaPeace,
} from "react-icons/fa";

export default function AboutValuesSection() {
  const initialValues = [
    {
      icon: <FaHeart />,
      title: "Amour",
      desc: "Nous accueillons chacun avec compassion et bienveillance.",
    },
    {
      icon: <FaCross />,
      title: "Foi",
      desc: "Nous croyons en la puissance de Dieu et Sa parole.",
    },
    {
      icon: <FaPrayingHands />,
      title: "Prière",
      desc: "La prière est le fondement de notre relation avec Dieu.",
    },
    {
      icon: <FaPeace />,
      title: "Paix",
      desc: "Nous cultivons l'unité, l'espérance et la réconciliation.",
    },
  ];

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) => {
        const copy = [...prev];
        const last = copy.pop();
        return [last, ...copy];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* LEFT */}
          <div>
            <span className="text-[#071F5A] font-semibold uppercase text-sm sm:text-base">
              Nos valeurs
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-8 sm:mb-12 leading-tight">
              Des principes qui guident
              <br />
              notre foi et nos actions.
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="
                    bg-white
                    border-2
                    border-[#071F5A]
                    rounded-2xl
                    sm:rounded-3xl
                    p-4
                    sm:p-8
                    text-center
                    shadow-md
                    transition-all
                    duration-1000
                  "
                >
                  <div className="text-[#071F5A] text-3xl sm:text-5xl flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="mt-3 sm:mt-5 text-lg sm:text-3xl font-bold text-[#071F5A]">
                    {value.title}
                  </h3>
                  <p className="mt-2 sm:mt-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute right-0 top-0 w-4 sm:w-6 h-full bg-[#071F5A]" />
            <div className="absolute left-0 bottom-0 w-full h-4 sm:h-6 bg-[#071F5A]" />
            <img
              src="/fid1.png"
              alt="Nos valeurs"
              className="w-full h-[280px] sm:h-[420px] lg:h-[650px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}