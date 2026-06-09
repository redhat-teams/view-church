export default function AboutSection() {
  return (
    <section className="bg-[#F3F3F3] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* IMAGE */}
          <div className="relative group">
            <div className="overflow-hidden rounded-[25px] shadow-xl">
              <img
                src="/images/about.jpg"
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
                <h3 className="text-5xl font-bold text-[#F38B00]">+8</h3>
                <p className="mt-2 text-gray-700">Existence</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-bold text-[#F38B00]">07</h3>
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
              Nous sommes une plateforme de prière, d’évangélisation et de
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
                <h3 className="text-5xl font-bold text-[#F38B00]">+5000</h3>
                <p className="text-xl text-gray-900">Vies impactées</p>
              </div>

              <div className="hidden md:block h-20 border-l border-[#F38B00]" />

              <div className="transition duration-300 hover:scale-110">
                <h3 className="text-5xl font-bold text-[#F38B00]">+120</h3>
                <p className="text-xl text-gray-900">
                  Actions spirituelles
                </p>
              </div>
            </div>

            {/* Bouton */}
            <button
              className="
                relative
                overflow-hidden
                bg-[#D49A13]
                hover:bg-[#c58d0f]
                text-white
                font-bold
                text-xl
                md:text-2xl
                px-10
                py-5
                rounded-xl
                transition-all
                duration-500
                hover:scale-105
                hover:shadow-[0_15px_35px_rgba(212,154,19,0.4)]
              "
            >
              Découvrez le Ministère
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}