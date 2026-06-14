import {
  Heart,
  Users,
  Church,
  Target,
  Eye,
  Gem,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function ChurchPresentation() {
  const values = [
    {
      icon: <Heart size={32} />,
      title: "Amour",
      desc: "Nous accueillons chacun avec compassion, grâce et bienveillance.",
    },
    {
      icon: <Church size={32} />,
      title: "Foi",
      desc: "Nous croyons fermement à la puissance de Dieu et de Sa parole.",
    },
    {
      icon: <Users size={32} />,
      title: "Communauté",
      desc: "Grandir ensemble dans l'unité et le service.",
    },
  ];

  const stats = [
    { value: "1200+", label: "Membres" },
    { value: "20+", label: "Ministères" },
    { value: "15+", label: "Années d'existence" },
    { value: "300+", label: "Jeunes engagés" },
  ];

  const reasons = [
    "Une communauté chaleureuse",
    "Des enseignements bibliques solides",
    "Des événements pour toute la famille",
    "Une croissance spirituelle continue",
  ];

  return (
    <section className="bg-[#F8F8F8] overflow-hidden">

      {/* HERO */}

      <section className="relative py-32 bg-[#071F5A] overflow-hidden">
       <div className="absolute inset-0 overflow-hidden">
  {/* Vidéo principale */}
  <video
    src="/ccm-fond-evangile.mp4"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      scale-110
    "
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />

  {/* Overlay bleu principal */}
  <div className="absolute inset-0 bg-[#071F5A]/70" />

  {/* Gradient subtil pour profondeur */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[#071F5A]/80
      via-[#071F5A]/40
      to-transparent
    "
  />
</div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[1500px]
            h-[1500px]
          "
        >
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[500px]
              h-[500px]
              bg-[#E5B10E]
              opacity-30
              blur-[180px]
              rounded-full
            "
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-white text-6xl font-bold mt-6">
            Bienvenue au Ministère
          </h1>

          <p className="text-white/80 max-w-3xl mx-auto mt-8 text-xl leading-relaxed">
            Une famille spirituelle centrée sur Jésus-Christ,
            engagée à transformer des vies par la foi,
            l'amour et le service.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">


<NavLink
  to="/"
  className="
    inline-flex
    items-center
    justify-center
    bg-[#E5B10E]
    text-[#071F5A]
    px-10
    py-4
    rounded-2xl
    font-bold
    hover:scale-105
    transition-all
    duration-300
  "
>
  Découvrir CCM
</NavLink>

            <NavLink
            to="/contact"
              className="
                border-2 border-white
                text-white
                px-10
                py-4
                rounded-2xl
    font-bold
    hover:scale-105
    transition-all
    duration-300
   
              "
            >
              Nous contacter
            </NavLink>

          </div>

        </div>

      </section>

      {/* HISTOIRE */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <span className="text-[#E5B10E] font-semibold">
                NOTRE HISTOIRE
              </span>

              <h2 className="text-5xl font-bold text-[#071F5A] mt-4">
                Une église bâtie sur la foi et la mission.
              </h2>

              <p className="mt-8 text-gray-600 leading-relaxed">
                Depuis plusieurs années, CCM accompagne des hommes,
                des femmes et des familles dans leur croissance
                spirituelle à travers l'enseignement de la Parole,
                la prière et la communion fraternelle.
              </p>

              <p className="mt-6 text-gray-600 leading-relaxed">
                Notre désir est de voir chaque personne découvrir
                son identité en Christ et accomplir son appel.
              </p>

            </div>

            <div className="relative">

              <div
                className="
                  absolute
                  -top-6
                  -right-6
                  w-full
                  h-full
                  border-4
                  border-[#E5B10E]
                  rounded-[40px]
                "
              />

              <img
                src="/p4.png"
                alt=""
                className="
                  relative
                  rounded-[40px]
                  h-[500px]
                  w-full
                  object-cover
                  shadow-[0_20px_80px_rgba(0,0,0,0.12)]
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* MISSION VISION VALEURS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Target className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">
                Mission
              </h3>
              <p className="mt-4 text-gray-600">
                Conduire les âmes à Christ et les former comme disciples.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Eye className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">
                Vision
              </h3>
              <p className="mt-4 text-gray-600">
                Transformer les vies et impacter la société.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Gem className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">
                Valeurs
              </h3>
              <p className="mt-4 text-gray-600">
                Foi, amour, intégrité et excellence dans le service.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* NOS VALEURS */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-[#071F5A]">
              Nos valeurs fondamentales
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {values.map((value, index) => (
              <div
  key={index}
  className="
    h-full
    rounded-2xl
    md:rounded-[32px]

    bg-[#F8F8F8]

    p-6
    sm:p-8
    lg:p-10

    shadow-lg
    hover:shadow-2xl

    transition-all
    duration-500

    md:hover:-translate-y-3
  "
>
  <div className="text-[#E5B10E]">
    <div className="scale-90 sm:scale-100 origin-left">
      {value.icon}
    </div>
  </div>

  <h3
    className="
      mt-4
      sm:mt-6

      text-2xl
      sm:text-3xl

      font-bold
      text-[#071F5A]
    "
  >
    {value.title}
  </h3>

  <p
    className="
      mt-3
      sm:mt-4

      text-sm
      sm:text-base

      leading-relaxed
      text-gray-600
    "
  >
    {value.desc}
  </p>
</div>
            ))}

          </div>

        </div>

      </section>

      {/* CHIFFRES */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((stat, index) => (
              <div
                key={index}
                className="
                  bg-white
                  p-10
                  rounded-[32px]
                  text-center
                  shadow-xl
                "
              >
                <h3 className="text-5xl font-bold text-[#E5B10E]">
                  {stat.value}
                </h3>

                <p className="mt-4 text-[#071F5A] font-semibold">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* POURQUOI NOUS REJOINDRE */}

      <section className="py-24 bg-[#071F5A]">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-white text-5xl font-bold">
            Pourquoi rejoindre CCM ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-16">

            {reasons.map((reason, index) => (
              <div
                key={index}
                className="
                  bg-white/10
                  backdrop-blur-md
                  rounded-3xl
                  p-6
                  text-white
                  flex
                  items-center
                  gap-4
                "
              >
                <CheckCircle2
                  className="text-[#E5B10E]"
                  size={28}
                />

                {reason}
              </div>
            ))}

          </div>

        </div>

      </section>

    </section>
  );
}