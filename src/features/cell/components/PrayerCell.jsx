import {
  FaHandsPraying,
  FaBookBible,
  FaFire,
} from "react-icons/fa6";

export default function PrayerCell() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-[#020814]">

      {/* Halo principal */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] sm:w-[1000px] h-[600px] sm:h-[1000px] rounded-full bg-[#E5B10E]/10 blur-[220px]" />
      </div>

      {/* Lumière centrale */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none">
        <div className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-500/20 blur-[150px] rounded-full" />
      </div>

      {/* Flammes décoratives */}
      <div className="absolute left-10 bottom-20 w-40 h-40 bg-orange-500/10 blur-[90px] rounded-full" />
      <div className="absolute right-10 top-20 w-52 h-52 bg-yellow-400/10 blur-[100px] rounded-full" />

      {/* Particules */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-300 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">

          <div className="
            mx-auto w-20 h-20 sm:w-28 sm:h-28
            rounded-full flex items-center justify-center
            bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-600
            shadow-[0_0_80px_rgba(255,140,0,0.9)]
          ">
            <FaFire className="text-white text-4xl sm:text-6xl" />
          </div>

          <h2 className="mt-8 text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight px-2">
            Programme de
            <span className="block text-[#F0B51B]">
              Prière & Intercession
            </span>
          </h2>

          <p className="mt-6 text-white/70 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Rejoignez des moments puissants de communion,
            d'intercession et de croissance spirituelle dans
            la présence de Dieu.
          </p>

        </div>

        {/* Grande carte */}
        <div className="
          relative overflow-hidden
          rounded-[24px] sm:rounded-[40px]
          border border-[#F0B51B]/20
          backdrop-blur-xl bg-white/[0.04]
          shadow-[0_0_100px_rgba(229,177,14,0.15)]
          p-4 sm:p-8 md:p-14
        ">

          {/* Effets lumineux */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F0B51B]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">

            {/* Bloc 1 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center shrink-0">
                  <FaHandsPraying className="text-[#F0B51B] text-2xl sm:text-3xl" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-2xl leading-snug">
                    Lundi au Samedi
                  </h3>
                  <p className="text-white/70 mt-1 text-sm sm:text-base">
                    Prière Matinale
                  </p>
                  <span className="inline-block mt-2 sm:mt-3 text-[#F0B51B] font-bold text-base sm:text-lg">
                    À partir de 06h00
                    <span className="block text-white/50 font-normal text-xs sm:text-sm mt-0.5">
                      Heure de Paris
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bloc 2 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center shrink-0">
                  <FaHandsPraying className="text-[#F0B51B] text-2xl sm:text-3xl" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-2xl leading-snug">
                    Lundi au Vendredi
                  </h3>
                  <p className="text-white/70 mt-1 text-sm sm:text-base">
                    Prière du Soir
                  </p>
                  <span className="inline-block mt-2 sm:mt-3 text-[#F0B51B] font-bold text-base sm:text-lg">
                    À partir de 21h00
                    <span className="block text-white/50 font-normal text-xs sm:text-sm mt-0.5">
                      Heure de Paris
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bloc 3 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center shrink-0">
                  <FaBookBible className="text-[#F0B51B] text-2xl sm:text-3xl" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-2xl leading-snug">
                    Vendredi
                  </h3>
                  <p className="text-white/70 mt-1 text-sm sm:text-base">
                    Étude Biblique
                  </p>
                  <span className="inline-block mt-2 sm:mt-3 text-[#F0B51B] font-bold text-base sm:text-lg">
                    À partir de 21h00
                    <span className="block text-white/50 font-normal text-xs sm:text-sm mt-0.5">
                      Heure de Paris
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bloc 4 */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 transition-all duration-500 hover:border-[#F0B51B]/40 hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#F0B51B]/15 flex items-center justify-center shrink-0">
                  <FaHandsPraying className="text-[#F0B51B] text-2xl sm:text-3xl" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-2xl leading-snug">
                    Chaque Mercredi
                  </h3>
                  <p className="text-white/70 mt-1 text-sm sm:text-base">
                    Journée de Jeûne & Prière
                  </p>
                  <span className="inline-block mt-2 sm:mt-3 text-[#F0B51B] font-bold text-base sm:text-lg">
                    Toute la journée
                  </span>
                </div>
              </div>
            </div>

            {/* Bloc principal */}
            <div className="col-span-1 sm:col-span-2">
              <div className="
                relative overflow-hidden
                rounded-2xl sm:rounded-3xl
                bg-gradient-to-r from-orange-500/10 via-[#F0B51B]/10 to-orange-500/10
                border border-orange-400/20
                p-6 sm:p-10
              ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">

                  <div className="
                    w-16 h-16 sm:w-24 sm:h-24 shrink-0
                    rounded-full flex items-center justify-center
                    bg-gradient-to-b from-yellow-300 to-orange-500
                    shadow-[0_0_60px_rgba(255,140,0,0.8)]
                  ">
                    <FaFire className="text-white text-3xl sm:text-5xl" />
                  </div>

                  <div>
                    <h3 className="text-white font-black text-xl sm:text-3xl leading-snug">
                      Programme Mensuel de Feu
                    </h3>
                    <p className="text-white/80 mt-2 sm:mt-3 text-base sm:text-lg">
                      3 jours de Jeûne & Prière
                    </p>
                    <p className="text-[#F0B51B] font-bold mt-1 sm:mt-2 text-base sm:text-xl leading-snug">
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