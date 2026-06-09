export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-[#071F5A] py-20">
      {/* Cercle décoratif haut droite */}

      <div className="absolute -top-24 right-20 w-72 h-72 border-[30px] border-[#D8B11E]/30 rounded-full" />

      <div className="absolute top-20 right-40 w-48 h-48 border-[20px] border-[#D8B11E]/20 rounded-full" />

      {/* Courbe bas */}

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-32
          bg-white/15
          rounded-t-[100%]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}

          <div>
            <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-6">
              Vous êtes les bienvenus
            </h2>

            <p className="text-white/90 text-lg md:text-2xl leading-relaxed max-w-3xl">
              Nous serions heureux de vous accueillir lors de
              l'un de nos prochains cultes. Venez découvrir
              une communauté chaleureuse, animée par la foi
              et l'amour de Dieu.
            </p>
          </div>

          {/* Bouton */}

          <div className="flex justify-center lg:justify-end">
            <button
              className="
                bg-[#F0B51B]
                hover:bg-yellow-400
                text-[#071F5A]
                font-bold
                text-xl
                md:text-2xl
                px-12
                md:px-20
                py-6
                rounded-lg
                transition-all
                duration-300
                hover:scale-105
                shadow-xl
              "
            >
              Rejoignez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}