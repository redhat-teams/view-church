import { FaChurch, FaBible } from "react-icons/fa";

export default function AboutVisionSection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div className="relative">

            <div className="absolute -bottom-5 -left-5 bg-[#071F5A] w-full h-full" />

            <img
              src="/enfant.png"
              alt=""
              className="relative z-10 w-full h-[650px] object-cover"
            />

          </div>

          <div>

            <span className="text-[#071F5A] font-semibold">
              Qui Sommes-Nous ?
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#071F5A]">
              Nous avançons chaque jour pour transformer des vies par la puissance de Dieu.
            </h2>

            <p className="mt-8 text-gray-600 text-lg leading-relaxed">
              Nous sommes une communauté chrétienne composée d'hommes et
              de femmes ayant répondu à l'appel de Dieu pour prier, intercéder, évangéliser, 
              enseigner la Parole et accompagner spirituellement ceux qui désirent marcher avec Dieu. (Actes 1:8)
            </p>
            <br />
            <p>
              Notre désir n'est pas de bâtir une plateforme centrée sur les hommes,
              mais de glorifier Jésus-Christ et d'amener les cœurs à Lui.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-12">

              <div>

                <div className="w-16 h-16 rounded-full bg-[#071F5A] text-[#F0B51B] flex items-center justify-center">
                  <FaChurch size={28} />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Maison de Dieu
                </h3>

                <p className="mt-3 text-gray-600">
                  Un espace d'accueil, d'adoration et de croissance spirituelle.
                </p>

              </div>

              <div>

                <div className="w-16 h-16 rounded-full bg-[#071F5A] text-[#F0B51B] flex items-center justify-center">
                  <FaBible size={28} />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Parole de Dieu
                </h3>

                <p className="mt-3 text-gray-600">
                  Des enseignements inspirés pour transformer les vies.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}