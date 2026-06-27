import { motion } from "framer-motion";
import { Quote, Users, Heart, Church, Award } from "lucide-react";

export default function Leadership() {
  const leaders = [
    { name: "Marie Kouassi", role: "Responsable Intercession" },
    { name: "Christian Toto", role: "Responsable Jeunesse" },
    { name: "Esther Yao", role: "Responsable Louange" },
    { name: "Samuel Konan", role: "Responsable Discipulat" },
  ];

  const stats = [
    { icon: Church, value: "20+", label: "Années de l'église" },
    { icon: Users, value: "5000+", label: "Vies impactées" },
    { icon: Award, value: "100+", label: "Leaders formés" },
    { icon: Heart, value: "∞", label: "Passion pour Christ" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,transparent_60%)]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-0 h-[420px] w-[420px] sm:h-[700px] sm:w-[700px] -translate-x-1/2"
        >
          <div className="absolute left-1/2 top-12 sm:top-20 h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[100px] sm:blur-[160px]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 text-center">
          <span className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-yellow-400">
            Leadership CCM
          </span>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
            Une équipe engagée
            <span className="block text-yellow-400">au service de Dieu</span>
          </h1>

          <p className="mx-auto mt-5 sm:mt-8 max-w-3xl text-base sm:text-lg text-slate-400 px-2">
            Des hommes et des femmes passionnés qui accompagnent la vision,
            servent avec excellence et bâtissent une communauté centrée sur
            Jésus-Christ.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-10 sm:-mt-14 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl sm:rounded-[32px] border border-white/20 bg-white/80 backdrop-blur-xl p-5 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,.06)] sm:shadow-[0_20px_60px_rgba(0,0,0,.08)]"
                >
                  <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#071F5A]/10">
                    <Icon className="text-[#071F5A]" size={20} />
                  </div>

                  <h3 className="mt-3 sm:mt-5 text-2xl sm:text-4xl font-bold text-[#071F5A]">
                    {item.value}
                  </h3>

                  <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADER PRINCIPAL */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-3 sm:-inset-4 rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20 blur-2xl sm:blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] border border-slate-200 bg-white p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,.08)] sm:shadow-[0_30px_80px_rgba(0,0,0,.08)]">
                <img
                  src="/bo.png"
                  alt="Pasteur Principal"
                  loading="lazy"
                  className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[650px] rounded-[22px] sm:rounded-[32px] object-cover object-top"
                />
              </div>
            </motion.div>

            {/* TEXTE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-medium text-yellow-500 text-sm sm:text-base">
                Fondateur & Pasteur Principal
              </span>

              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071F5A]">
                Michaud Christine
              </h2>

              <div className="mt-6 sm:mt-8 h-1 w-20 sm:w-24 rounded-full bg-yellow-400" />

              <p className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-slate-600">
                Depuis 2001, Christine Michaud conduit la vision de MCM avec 
                passion, zèle, fidélité et excellence.
                
              </p>

              <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                Son ministère est centré sur évangélisation des nations, le réveil spirituel, 
                l'enseignement de la Parole de Dieu,
                la formation de disciples et la transformation durable des vies.
              </p>

              <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                Son désir est de voir les nations vivre un véritable réveil spirituel 
                et des disciples marcher dans la puissance,
                l'autorité et la dimension spirituelle des premiers apôtres.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                {["Enseignement Biblique", "Leadership", "Formation"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#071F5A]/10 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-[#071F5A]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            {/* <span className="font-medium text-yellow-500 text-sm sm:text-base">
              ÉQUIPE PASTORALE
            </span> */}

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071F5A]">
              Une vision portée ensemble
            </h2>
          </div>

          {/* <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,.05)] sm:shadow-[0_20px_60px_rgba(0,0,0,.06)]"
              >
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-[#071F5A] to-[#153c9d]" />

                <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-bold text-[#071F5A]">
                  {leader.name}
                </h3>

                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-500">
                  {leader.role}
                </p>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>

      {/* CITATION */}
      <section className="pb-20 sm:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-gradient-to-br from-[#071F5A] via-[#0d2b7c] to-[#153c9d] p-7 sm:p-10 md:p-20">
            <div className="absolute right-0 top-0 h-[180px] w-[180px] sm:h-[300px] sm:w-[300px] rounded-full bg-yellow-400/10 blur-[80px] sm:blur-[120px]" />

            <Quote
              size={40}
              className="relative z-10 text-yellow-400 sm:hidden"
            />
            <Quote
              size={60}
              className="relative z-10 text-yellow-400 hidden sm:block"
            />

            <h3 className="relative z-10 mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-5xl font-bold leading-snug sm:leading-relaxed text-white">
              Servir Dieu et Son peuple demeure notre plus grand privilège et
              notre plus belle mission.
            </h3>

            <div className="relative z-10 mt-8 sm:mt-12 border-t border-white/10 pt-6 sm:pt-8">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-400">
                Pasteur Michaud Christine
              </h4>

              <p className="mt-2 text-sm sm:text-base text-white/60">
                fondateur et pasteur principal ccm
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}