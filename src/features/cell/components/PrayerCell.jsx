import {
  FaHandsPraying,
  FaBookBible,
  FaFire,
} from "react-icons/fa6";

export default function PrayerCell() {
  return (
    <section className="relative overflow-hidden py-28 bg-[#020814]">

      {/* Halo principal */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[1000px] h-[1000px] rounded-full bg-[#E5B10E]/10 blur-[220px]" />
      </div>

      {/* Lumière centrale */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none">
        <div className="w-[450px] h-[450px] bg-orange-500/20 blur-[150px] rounded-full" />
      </div>

      {/* Flammes décoratives */}
      <div className="absolute left-10 bottom-20 w-40 h-40 bg-orange-500/10 blur-[90px] rounded-full" />
      <div className="absolute right-10 top-20 w-52 h-52 bg-yellow-400/10 blur-[100px] rounded-full" />

      {/* Particules */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-300 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">

          <div
            className="
              mx-auto
              w-28
              h-28
              rounded-full
              flex
              items-center
              justify-center
              bg-gradient-to-b
              from-yellow-300
              via-orange-400
              to-orange-600
              shadow-[0_0_80px_rgba(255,140,0,0.9)]
            "
          >
            <FaFire className="text-white text-6xl" />
          </div>

          <h2 className="mt-10 text-5xl md:text-7xl font-black text-white leading-tight">
            Programme de
            <span className="block text-[#F0B51B]">
              Prière & Intercession
            </span>
          </h2>

          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Rejoignez des moments puissants de communion,
            d'intercession et de croissance spirituelle dans
            la présence de Dieu.
          </p>

        </div>

        {/* Grande carte */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-[#F0B51B]/20
            backdrop-blur-xl
            bg-white/[0.04]
            shadow-[0_0_100px_rgba(229,177,14,0.15)]
            p-8
            md:p-14
          "
        >

          {/* Effets lumineux */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F0B51B]/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px]" />

          <div className="grid md:grid-cols-2 gap-8">

            {/* Bloc 1 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center">
                  <FaHandsPraying className="text-[#F0B51B] text-3xl" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-2xl">
                    Lundi au Samedi
                  </h3>

                  <p className="text-white/70 mt-2">
                    Prière Matinale
                  </p>

                  <span className="inline-block mt-3 text-[#F0B51B] font-bold text-lg">
                    06h00 (Heure de Paris)
                  </span>
                </div>

              </div>

            </div>

            {/* Bloc 2 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center">
                  <FaHandsPraying className="text-[#F0B51B] text-3xl" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-2xl">
                    Lundi au Vendredi
                  </h3>

                  <p className="text-white/70 mt-2">
                    Prière du Soir
                  </p>

                  <span className="inline-block mt-3 text-[#F0B51B] font-bold text-lg">
                    21h00 (Heure de Paris)
                  </span>
                </div>

              </div>

            </div>

            {/* Bloc 3 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center">
                  <FaBookBible className="text-[#F0B51B] text-3xl" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-2xl">
                    Vendredi
                  </h3>

                  <p className="text-white/70 mt-2">
                    Étude Biblique
                  </p>

                  <span className="inline-block mt-3 text-[#F0B51B] font-bold text-lg">
                    21h00
                  </span>
                </div>

              </div>

            </div>

            {/* Bloc 4 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center">
                  <FaHandsPraying className="text-[#F0B51B] text-3xl" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-2xl">
                    Chaque Mercredi
                  </h3>

                  <p className="text-white/70 mt-2">
                    Journée de Jeûne & Prière
                  </p>
                </div>

              </div>

            </div>

            {/* Bloc principal */}
            <div className="md:col-span-2">

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-gradient-to-r
                  from-orange-500/10
                  via-[#F0B51B]/10
                  to-orange-500/10
                  border
                  border-orange-400/20
                  p-10
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative flex flex-col md:flex-row items-center gap-6">

                  <div
                    className="
                      w-24
                      h-24
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-gradient-to-b
                      from-yellow-300
                      to-orange-500
                      shadow-[0_0_60px_rgba(255,140,0,0.8)]
                    "
                  >
                    <FaFire className="text-white text-5xl" />
                  </div>

                  <div>
                    <h3 className="text-white font-black text-3xl">
                      Programme Mensuel de Feu
                    </h3>

                    <p className="text-white/80 mt-3 text-lg">
                      3 jours de Jeûne & Prière
                    </p>

                    <p className="text-[#F0B51B] font-bold mt-2 text-xl">
                      Chaque 1er Mercredi, Jeudi et Vendredi du mois
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}