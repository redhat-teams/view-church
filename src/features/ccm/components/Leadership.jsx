import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Leadership() {
  return (
    <main className="bg-[#F8F8F8] min-h-screen overflow-hidden">

      {/* HERO */}

      <section className="relative bg-[#071F5A] py-24 md:py-32 overflow-hidden">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[1200px]
            h-[1200px]
          "
        >
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[400px]
              h-[400px]
              rounded-full
              bg-[#E5B10E]
              opacity-20
              blur-[140px]
            "
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <span className="text-[#E5B10E] font-semibold uppercase tracking-[4px]">
            Notre Leadership
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Des leaders engagés
            <br />
            au service de Dieu
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-white/80 leading-relaxed">
            Une équipe passionnée qui accompagne, enseigne et inspire
            chaque croyant à grandir dans sa relation avec Jésus-Christ.
          </p>

        </div>

      </section>

      {/* PASTEUR PRINCIPAL */}

      <section className="py-20 md:py-28">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* IMAGE */}

            <div className="relative">

              <div
                className="
                  absolute
                  -top-4
                  -right-4
                  w-full
                  h-full
                  border-4
                  border-[#E5B10E]
                  rounded-[32px]
                "
              />

              <img
                src="/images/leadership/pastor-principal.jpg"
                alt="Pasteur Principal"
                className="
                  relative
                  z-10
                  w-full
                  rounded-[32px]
                  object-cover
                  h-[450px]
                  md:h-[650px]
                  shadow-[0_25px_80px_rgba(0,0,0,.12)]
                "
              />

            </div>

            {/* TEXTE */}

            <div>

              <span className="text-[#E5B10E] font-semibold uppercase tracking-wider">
                Pasteur Principal
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#071F5A]">
                Pasteur Claude Ope
              </h2>

              <div className="w-24 h-1 bg-[#E5B10E] rounded-full mt-6" />

              <p className="mt-8 text-gray-600 text-lg leading-relaxed">
                Depuis plusieurs années, le Pasteur Claude Ope conduit
                la vision de CCM avec passion, fidélité et excellence.
                Son ministère est centré sur l'enseignement biblique,
                la formation des disciples et la transformation des vies.
              </p>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                À travers son leadership, de nombreuses personnes ont
                découvert leur appel, développé leur foi et trouvé leur
                place dans l'œuvre de Dieu.
              </p>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Son désir est de voir une génération passionnée pour
                Christ, engagée dans la mission et porteuse d'un impact
                durable dans la société.
              </p>

              <div className="mt-10">

                <h3 className="text-2xl font-bold text-[#071F5A]">
                  Claude Ope
                </h3>

                <p className="text-[#E5B10E] font-medium mt-2">
                  Fondateur & Pasteur Principal
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CITATION */}

      <section className="pb-24 md:pb-28">

        <div className="max-w-5xl mx-auto px-6">

          <div
            className="
              relative
              overflow-hidden
              bg-white
              rounded-[40px]
              p-10 md:p-20
              shadow-[0_20px_80px_rgba(0,0,0,.08)]
            "
          >

            <div
              className="
                absolute
                top-0
                right-0
                w-[250px]
                h-[250px]
                bg-[#E5B10E]/10
                rounded-full
                blur-[120px]
              "
            />

            <Quote
              size={60}
              className="relative z-10 text-[#E5B10E]"
            />

            <h3
              className="
                relative
                z-10
                mt-8
                text-2xl
                md:text-4xl
                lg:text-5xl
                font-bold
                text-[#071F5A]
                leading-relaxed
              "
            >
              Servir Dieu et Son peuple demeure
              notre plus grand privilège et
              notre plus belle mission.
            </h3>

            <div className="relative z-10 mt-10">

              <h4 className="font-bold text-xl text-[#071F5A]">
                Pasteur Claude Ope
              </h4>

              <p className="text-gray-500 mt-2">
                Fondateur de CCM
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}