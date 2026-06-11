import { FaPaperPlane } from "react-icons/fa";

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#071F5A] via-[#0A3C90] to-[#1260D6]">
      {/* Décorations arrière-plan */}

      <div className="absolute left-0 bottom-0 opacity-10">
        <div className="w-64 h-64 bg-white rounded-full absolute -left-16 bottom-0" />
        <div className="w-40 h-40 bg-white rounded-full absolute left-20 bottom-10" />
        <div className="w-56 h-56 bg-white rounded-full absolute left-52 -bottom-16" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Partie gauche */}

          <div className="text-white py-8 lg:pr-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
              Rejoignez notre communauté
            </h2>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed mb-12">
              Faites partie d'une famille spirituelle vivante.
              Ensemble, grandissons dans la foi et impactons
              notre génération pour Christ.
            </p>

            <a
            href="contact"
              className="
                bg-[#F0B51B]
                hover:bg-yellow-400
                text-[#071F5A]
                font-bold
                text-lg
                md:text-1xl
                px-10
                md:px-9
                py-3
                rounded-full
                transition-all
                duration-300
                hover:scale-105
                shadow-xl
              "
            >
              Rejoindre la communauté
            </a>
          </div>

          {/* Partie droite */}

          <div
            className="
              bg-[#F8F8F8]
              p-8 md:p-12
              rounded-tl-[80px]
              rounded-bl-[80px]
              rounded-tr-none
              rounded-br-none
              shadow-2xl
            "
          >
            <h3 className="text-[#071F5A] text-3xl md:text-4xl font-extrabold mb-10">
              Abonnez-vous à la Newsletter
            </h3>

            {/* Input */}

            <div className="relative mb-10">
              <input
                type="email"
                placeholder="Entrer votre adresse e-mail"
                className="
                  w-full
                  h-16
                  rounded-full
                  border
                  border-[#F0B51B]
                  bg-white
                  px-8
                  pr-24
                  outline-none
                  focus:ring-2
                  focus:ring-[#F0B51B]
                "
              />

              <button
                className="
                  absolute
                  top-0
                  right-0
                  h-16
                  w-16
                  bg-[#F0B51B]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-yellow-400
                  transition
                "
              >
                <FaPaperPlane
                  size={24}
                  className="text-[#071F5A]"
                />
              </button>
            </div>

            <p className="text-gray-800 text-lg leading-relaxed">
              Nous accueillons toute personne avec amour et
              respect, quelle que soit son histoire, son origine,
              sa couleur, sa langue ou sa nation tout en annonçant
              fidèlement la vérité de l'Évangile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}