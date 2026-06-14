import { motion } from "framer-motion";
import {
  Quote,
  Users,
  Heart,
  Church,
  Award,
} from "lucide-react";

export default function Leadership() {
  const leaders = [
    {
      name: "Marie Kouassi",
      role: "Responsable Intercession",
    },
    {
      name: "Christian Toto",
      role: "Responsable Jeunesse",
    },
    {
      name: "Esther Yao",
      role: "Responsable Louange",
    },
    {
      name: "Samuel Konan",
      role: "Responsable Discipulat",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen overflow-hidden">
      {/* HERO */}

      <section className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,transparent_60%)]" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-0
            h-[700px]
            w-[700px]
            -translate-x-1/2
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-20
              h-[350px]
              w-[350px]
              -translate-x-1/2
              rounded-full
              bg-yellow-400/20
              blur-[160px]
            "
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-yellow-500/20
              bg-yellow-500/10
              px-5
              py-2
              text-sm
              font-medium
              text-yellow-400
            "
          >
            Leadership CCM
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white">
            Une équipe engagée
            <span className="block text-yellow-400">
              au service de Dieu
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-400">
            Des hommes et des femmes passionnés qui
            accompagnent la vision, servent avec
            excellence et bâtissent une communauté
            centrée sur Jésus-Christ.
          </p>
        </div>
      </section>

      {/* STATS */}

      <section className="relative -mt-14 z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-6
            "
          >
            {[
              {
                icon: Church,
                value: "20+",
                label: "Années de ministère",
              },
              {
                icon: Users,
                value: "5000+",
                label: "Vies impactées",
              },
              {
                icon: Award,
                value: "100+",
                label: "Leaders formés",
              },
              {
                icon: Heart,
                value: "∞",
                label: "Passion pour Christ",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                    rounded-[32px]
                    border
                    border-white/20
                    bg-white/80
                    backdrop-blur-xl
                    p-8
                    shadow-[0_20px_60px_rgba(0,0,0,.08)]
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#071F5A]/10
                    "
                  >
                    <Icon className="text-[#071F5A]" />
                  </div>

                  <h3 className="mt-5 text-4xl font-bold text-[#071F5A]">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADER PRINCIPAL */}

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="relative"
            >
              <div
                className="
                  absolute
                  -inset-4
                  rounded-[40px]
                  bg-gradient-to-r
                  from-yellow-400
                  to-yellow-500
                  opacity-20
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[40px]
                  border
                  border-slate-200
                  bg-white
                  p-3
                  shadow-[0_30px_80px_rgba(0,0,0,.08)]
                "
              >
                <img
                  src="/Oratrice.jpeg"
                  alt="Pasteur Principal"
                  className="
                    h-[650px]
                    w-full
                    rounded-[32px]
                    object-cover
                  "
                />
              </div>
            </motion.div>

            {/* TEXTE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="font-medium text-yellow-500">
                Fondateur & Pasteur Principal
              </span>

              <h2 className="mt-4 text-5xl font-bold text-[#071F5A]">
                Michaud Christine
              </h2>

              <div className="mt-8 h-1 w-24 rounded-full bg-yellow-400" />

              <p className="mt-8 text-lg leading-relaxed text-slate-600">
                Depuis plusieurs années, le Pasteur
                Claude Ope conduit la vision de CCM
                avec passion, fidélité et excellence.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Son ministère est centré sur
                l'enseignement biblique, la formation
                des disciples et la transformation
                durable des vies.
              </p>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Son désir est de voir une génération
                passionnée pour Christ, engagée dans
                la mission et porteuse d'un impact
                spirituel profond dans la société.
              </p>

              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-4
                "
              >
                <span
                  className="
                    rounded-full
                    bg-[#071F5A]/10
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-[#071F5A]
                  "
                >
                  Enseignement Biblique
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#071F5A]/10
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-[#071F5A]
                  "
                >
                  Leadership
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#071F5A]/10
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-[#071F5A]
                  "
                >
                  Formation
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EQUIPE */}

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="font-medium text-yellow-500">
              ÉQUIPE PASTORALE
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#071F5A]">
              Une vision portée ensemble
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-[32px]
                  bg-white
                  p-8
                  border
                  border-slate-100
                  shadow-[0_20px_60px_rgba(0,0,0,.06)]
                "
              >
                <div
                  className="
                    h-24
                    w-24
                    rounded-full
                    bg-gradient-to-br
                    from-[#071F5A]
                    to-[#153c9d]
                  "
                />

                <h3 className="mt-6 text-xl font-bold text-[#071F5A]">
                  {leader.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  {leader.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION */}

      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="
              relative
              overflow-hidden
              rounded-[40px]
              bg-gradient-to-br
              from-[#071F5A]
              via-[#0d2b7c]
              to-[#153c9d]
              p-10
              md:p-20
            "
          >
            <div
              className="
                absolute
                right-0
                top-0
                h-[300px]
                w-[300px]
                rounded-full
                bg-yellow-400/10
                blur-[120px]
              "
            />

            <Quote
              size={60}
              className="relative z-10 text-yellow-400"
            />

            <h3
              className="
                relative
                z-10
                mt-8
                text-3xl
                md:text-5xl
                font-bold
                leading-relaxed
                text-white
              "
            >
              Servir Dieu et Son peuple demeure
              notre plus grand privilège et notre
              plus belle mission.
            </h3>

            <div className="relative z-10 mt-12 border-t border-white/10 pt-8">
              <h4 className="text-xl font-semibold text-yellow-400">
                Pasteur Michaud Christine
              </h4>

              <p className="mt-2 text-white/60">
                Fondateur & Pasteur Principal
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}