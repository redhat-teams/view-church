import { Eye, Target } from "lucide-react";

export default function FoundationsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#07235D] via-[#0B4FAE] to-[#1E90FF] py-24">
      {/* Décorations arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-[40px] border-blue-300/20" />
      <div className="absolute top-8 right-8 w-72 h-72 rounded-full border-[30px] border-blue-200/20" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-[35px] border-white/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Titre */}
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Fondements
          </h2>

          <p className="max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed">
            Notre Communauté repose sur des valeurs spirituelles solides et une
            mission centrée sur l'annonce de l'Évangile, l'édification des
            croyants et l'encouragement des communautés.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          {/* Vision */}
          <div
            className="
              group
              bg-[#F5F5F5]
              rounded-[24px]
              border border-blue-500
              p-10 pt-16
              relative
              shadow-lg
              transition-all
              duration-700
              ease-out
              hover:scale-105
              hover:-translate-y-4
              hover:-rotate-2
              hover:shadow-2xl
            "
          >
            {/* Icône */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10">
              <div className="w-24 h-24 rounded-full bg-[#F3E8C0] flex items-center justify-center shadow-md">
                <div
                  className="
                    w-16 h-16
                    rounded-full
                    bg-[#D8B11E]
                    flex
                    items-center
                    justify-center
                    transition-transform
                    duration-700
                    group-hover:rotate-180
                  "
                >
                  <Eye className="w-8 h-8 text-[#061D58]" />
                </div>
              </div>
            </div>

            <h3 className="text-center text-black text-5xl font-bold font-serif mb-8">
              Vision
            </h3>

            <p className="text-gray-800 leading-relaxed text-lg">
              Former une génération de disciples passionnés par Dieu,
              enracinés dans Sa Parole, remplis du Saint-Esprit et engagés
              pour le salut des âmes et le réveil spirituel des nations.
              <br />
              <span className="font-semibold text-[#061D58]">
                Matthieu 6 v 33
              </span>
            </p>
          </div>

          {/* Mission */}
          <div
            className="
              group
              bg-[#F5F5F5]
              rounded-[24px]
              border border-blue-500
              p-10 pt-16
              relative
              shadow-lg
              transition-all
              duration-700
              ease-out
              hover:scale-105
              hover:-translate-y-4
              hover:rotate-2
              hover:shadow-2xl
            "
          >
            {/* Icône */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10">
              <div className="w-24 h-24 rounded-full bg-[#F3E8C0] flex items-center justify-center shadow-md">
                <div
                  className="
                    w-16 h-16
                    rounded-full
                    bg-[#D8B11E]
                    flex
                    items-center
                    justify-center
                    transition-transform
                    duration-700
                    group-hover:-rotate-180
                  "
                >
                  <Target className="w-8 h-8 text-[#061D58]" />
                </div>
              </div>
            </div>

            <h3 className="text-center text-black text-5xl font-bold font-serif mb-8">
              Mission
            </h3>

            <p className="text-gray-800 leading-relaxed text-lg">
              Notre vision est de voir des vies transformées par la puissance
              de Dieu et des hommes et des femmes marcher dans leur destinée.
              Nous voulons bâtir une communauté forte, enracinée dans la
              Parole, engagée dans la prière et active dans l'amour du prochain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}