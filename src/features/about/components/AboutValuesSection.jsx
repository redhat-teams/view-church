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
    <section className="py-24 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <span className="text-[#071F5A] font-semibold uppercase">
              Nos valeurs
            </span>

            <h2 className="text-5xl font-bold mt-4 mb-12 leading-tight">
              Des principes qui guident
              <br />
              notre foi et nos actions.
            </h2>

            <div className="grid grid-cols-2 gap-6">

              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="
                    bg-white
                    border-2
                    border-[#071F5A]
                    rounded-3xl
                    p-8
                    text-center
                    shadow-md
                    transition-all
                    duration-1000
                  "
                >
                  <div className="text-[#071F5A] text-5xl flex justify-center">
                    {value.icon}
                  </div>

                  <h3 className="mt-5 text-3xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-gray-600 text-sm">
                    {value.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute right-0 top-0 w-6 h-full bg-[#071F5A]" />

            <div className="absolute left-0 bottom-0 w-full h-6 bg-[#071F5A]" />

            <img
              src="/fid1.png"
              alt="Nos valeurs"
              className="w-full h-[650px] object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}