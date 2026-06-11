import {
  Heart,
  Target,
  Eye,
  Globe,
  BookOpen,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import {
  FaHandsPraying,
  FaBookBible,
  FaFire,
  FaCross,
  FaDove,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function EvangelisationPage() {
  const pilliers = [
    {
      icon: <Heart size={32} />,
      title: "La Grâce",
      desc: "Dieu t'aime inconditionnellement. Sa grâce est disponible pour chacun, sans exception.",
    },
    {
      icon: <FaCross size={32} />,
      title: "Le Salut",
      desc: "Jésus est mort et ressuscité pour que tu aies la vie éternelle. C'est un don gratuit.",
    },
    {
      icon: <FaDove size={32} />,
      title: "La Paix",
      desc: "Il offre une paix qui surpasse toute intelligence, au-delà des circonstances de la vie.",
    },
  ];

  const stats = [
    { value: "2000+", label: "Âmes touchées" },
    { value: "12+", label: "Villes atteintes" },
    { value: "50+", label: "Évangélistes formés" },
    { value: "100%", label: "Amour de Dieu" },
  ];

  const promesses = [
    "Découvrir le sens et le but de ta vie",
    "Être libéré de la culpabilité et du passé",
    "Rejoindre une famille spirituelle aimante",
    "Vivre une transformation durable par Christ",
  ];

  const etapes = [
    {
      num: "01",
      titre: "Reconnais",
      texte: "Nous avons tous péché et sommes séparés de Dieu. Reconnaître ce besoin est le premier pas.",
      icon: <BookOpen size={28} />,
    },
    {
      num: "02",
      titre: "Crois",
      texte: "Jésus-Christ est mort pour tes péchés et est ressuscité le troisième jour. Il est le Chemin.",
      icon: <FaBookBible size={28} />,
    },
    {
      num: "03",
      titre: "Reçois",
      texte: "Accepte-Le comme ton Seigneur et Sauveur. Une simple prière sincère change tout.",
      icon: <FaHandsPraying size={28} />,
    },
    {
      num: "04",
      titre: "Grandis",
      texte: "Rejoins une famille de foi, lis la Parole, prie chaque jour — ta vie sera transformée.",
      icon: <FaFire size={28} />,
    },
  ];

  const temoignages = [
    {
      nom: "Marie K.",
      ville: "Abidjan",
      texte: "J'étais perdue, sans espoir. Depuis que j'ai accepté Jésus, ma vie a complètement changé. La paix que je ressentais, je ne savais même pas qu'elle existait.",
    },
    {
      nom: "David O.",
      ville: "Bouaké",
      texte: "L'Évangile m'a libéré d'une addiction de 10 ans. Ce que les médecins n'ont pas pu faire, Jésus l'a accompli en un instant.",
    },
    {
      nom: "Grace A.",
      ville: "San Pedro",
      texte: "Ma famille était déchirée. Depuis que nous avons tous rencontré Christ, nous sommes réconciliés et plus unis que jamais.",
    },
  ];

  return (
    <div className="bg-[#F8F8F8] overflow-hidden">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#071F5A] overflow-hidden">

        {/* Fond dégradé profond */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F5A] via-[#0A2470] to-[#020814]" />

        {/* Étoiles scintillantes */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2.5 + 0.5,
              height: Math.random() * 2.5 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 2 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}

        {/* Étoiles filantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shoot-${i}`}
            className="absolute h-px w-48 bg-gradient-to-r from-white/80 to-transparent"
            style={{ top: `${10 + i * 10}%` }}
            initial={{ x: -300, opacity: 0, rotate: -20 }}
            animate={{ x: 2400, opacity: [0, 1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 2.5 }}
          />
        ))}

        {/* Halo doré central pulsant */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute w-[700px] h-[700px] rounded-full bg-[#F0B51B] blur-[250px]"
        />

        {/* Colombe flottante en fond */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            animate={{
              x: [0, 280, 500, 280, 0, -280, -500, -280, 0],
              y: [0, -120, 0, 120, 0, -120, 0, 120, 0],
              rotate: [-4, 4, -4],
            }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="opacity-[0.07]"
          >
            <FaDove className="text-white text-[280px]" />
          </motion.div>
        </div>

        {/* Particules montantes */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1.5 h-1.5 bg-[#F0B51B]/60 rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: 900, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.8, 0] }}
            transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        {/* Contenu */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaDove className="mx-auto text-8xl text-[#F0B51B] drop-shadow-[0_0_30px_rgba(240,181,27,0.7)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-black mt-8 leading-tight drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]"
          >
            Jésus-Christ
            <span className="block text-[#F0B51B] drop-shadow-[0_0_40px_rgba(240,181,27,0.5)]">
              t'appelle aujourd'hui
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/80 max-w-2xl mx-auto mt-8 text-xl leading-relaxed"
          >
            Tu n'es pas ici par hasard. Dieu t'aime profondément et désire
            une relation personnelle avec toi. Découvre la vie abondante
            qu'Il t'a préparée.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <button
              onClick={() =>
                document.getElementById("priere")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#F0B51B] text-[#071F5A] px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_40px_rgba(240,181,27,0.55)]"
            >
              Faire la prière
            </button>
            <button
              onClick={() =>
                document.getElementById("etapes")?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white/70 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#071F5A] transition-all duration-300 backdrop-blur-sm"
            >
              En savoir plus
            </button>
          </motion.div>
        </div>

        {/* Vague bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8F8F8" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════ BONNE NOUVELLE ═══════════════════════ */}
      <section className="py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#0B63CE] border border-[#0B63CE]/30 bg-[#0B63CE]/8 px-4 py-2 rounded-full">
                La Bonne Nouvelle
              </span>

              <h2 className="text-5xl font-black text-[#071F5A] mt-6 leading-tight">
                Un message qui change tout.
              </h2>

              <p className="mt-8 text-gray-600 leading-relaxed text-lg">
                L'Évangile — du grec « bonne nouvelle » — est le message le plus transformateur
                de l'histoire humaine : Dieu, dans Son amour infini, a envoyé Son Fils
                Jésus-Christ pour réconcilier l'humanité avec Lui.
              </p>

              <p className="mt-5 text-gray-600 leading-relaxed text-lg">
                Ce n'est pas une religion de règles, mais une relation vivante avec
                le Créateur de l'univers. Une relation qui commence par un simple oui à Jésus-Christ.
              </p>

              <blockquote className="mt-10 border-l-4 border-[#F0B51B] pl-6 italic text-[#071F5A] font-medium text-lg bg-white rounded-r-2xl py-5 pr-6 shadow-md">
                « Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que
                quiconque croit en lui ne périsse pas, mais qu'il ait la vie éternelle. »
                <span className="block mt-3 text-sm not-italic text-gray-400 font-normal">— Jean 3:16</span>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -top-5 -right-5 w-full h-full border-4 border-[#0B63CE]/40 rounded-[40px]" />
              <div className="absolute -bottom-5 -left-5 w-full h-full border-2 border-[#F0B51B]/30 rounded-[40px]" />
              <img
                src="/etern.png"
                alt="La Bonne Nouvelle"
                className="relative rounded-[40px] h-[500px] w-full object-cover shadow-[0_30px_80px_rgba(7,31,90,0.18)]"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4 ÉTAPES ═══════════════════════ */}
      <section className="py-28 bg-white" id="etapes">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#0B63CE] border border-[#0B63CE]/30 bg-[#0B63CE]/8 px-4 py-2 rounded-full">
              Comment être sauvé
            </span>
            <h2 className="text-5xl font-black text-[#071F5A] mt-6">
              4 étapes vers la vie éternelle
            </h2>
            <p className="mt-5 text-gray-500 text-lg">
              Le chemin du salut est simple et accessible à tous,
              quel que soit ton passé ou tes erreurs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {etapes.map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative bg-[#F8F8F8] p-10 rounded-[32px] shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Numéro en fond */}
                <span className="text-7xl font-black text-[#071F5A]/8 absolute top-4 right-6 select-none leading-none">
                  {etape.num}
                </span>

                {/* Icône avec cercle bleu */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B63CE] to-[#071F5A] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(11,99,206,0.35)] group-hover:shadow-[0_8px_40px_rgba(11,99,206,0.5)] transition-all duration-500">
                  {etape.icon}
                </div>

                <h3 className="mt-7 text-2xl font-black text-[#071F5A]">{etape.titre}</h3>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{etape.texte}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════ MISSION / VISION / IMPACT ═══════════════════════ */}
      <section className="py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#071F5A]">Notre raison d'être</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={36} />,
                title: "Mission",
                desc: "Partager l'Évangile à toute créature et faire de toutes les nations des disciples de Christ.",
              },
              {
                icon: <Eye size={36} />,
                title: "Vision",
                desc: "Voir chaque homme, femme et enfant rencontrer Jésus-Christ personnellement.",
                featured: true,
              },
              {
                icon: <Globe size={36} />,
                title: "Impact",
                desc: "Transformer la société de l'intérieur, une vie à la fois, par la puissance de l'Évangile.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 rounded-[32px] shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                  item.featured
                    ? "bg-gradient-to-br from-[#071F5A] to-[#0B63CE] text-white shadow-[0_20px_60px_rgba(11,99,206,0.35)]"
                    : "bg-white text-[#071F5A]"
                }`}
              >
                <div className={`${item.featured ? "text-[#F0B51B]" : "text-[#0B63CE]"}`}>
                  {item.icon}
                </div>
                <h3 className="mt-6 text-3xl font-black">{item.title}</h3>
                <p className={`mt-4 leading-relaxed ${item.featured ? "text-white/80" : "text-gray-500"}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ LES 3 PILIERS ═══════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#0B63CE] border border-[#0B63CE]/30 bg-[#0B63CE]/8 px-4 py-2 rounded-full">
              Les fondements
            </span>
            <h2 className="text-5xl font-black text-[#071F5A] mt-6">Ce que Dieu t'offre</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pilliers.map((pillier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[32px] bg-[#F8F8F8] shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Halo hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B63CE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />

                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B63CE] to-[#071F5A] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(11,99,206,0.3)]">
                  {pillier.icon}
                </div>
                <h3 className="mt-7 text-2xl font-black text-[#071F5A]">{pillier.title}</h3>
                <p className="mt-4 text-gray-500 leading-relaxed">{pillier.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════ STATISTIQUES ═══════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#071F5A] to-[#0B2E7F] relative overflow-hidden">

        {/* Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[300px] bg-[#F0B51B]/15 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center py-10 px-6 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-5xl font-black text-[#F0B51B] drop-shadow-[0_0_20px_rgba(240,181,27,0.5)]">
                  {stat.value}
                </h3>
                <p className="mt-3 text-white/80 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PRIÈRE DU SALUT ═══════════════════════ */}
      <section className="py-28 bg-[#071F5A] relative overflow-hidden" id="priere">

        {/* Halo pulsant */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#F0B51B] blur-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <FaHandsPraying className="mx-auto text-6xl text-[#F0B51B] drop-shadow-[0_0_30px_rgba(240,181,27,0.6)] mb-4" />
          </motion.div>

          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#F0B51B] border border-[#F0B51B]/40 px-4 py-2 rounded-full mb-6">
            Prière du Salut
          </span>

          <h2 className="text-white text-5xl font-black leading-tight">
            Prie cette prière maintenant
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/10 backdrop-blur-md rounded-[40px] p-10 md:p-14 text-left border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
          >
            <FaHandsPraying className="text-[#F0B51B] text-4xl mb-6" />
            <p className="text-white text-xl leading-relaxed italic">
              « Seigneur Jésus, je reconnais que je suis pécheur et que j'ai besoin de toi.
              Je crois que tu es mort pour mes péchés et que tu es ressuscité d'entre les morts.
              Je te reçois aujourd'hui comme mon Seigneur et mon Sauveur.
              Viens dans mon cœur, pardonne mes péchés et fais de moi un enfant de Dieu.
              À partir d'aujourd'hui, je décide de te suivre. Amen. »
            </p>
          </motion.div>

          <p className="text-white/60 mt-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Si tu viens de prier cette prière sincèrement, tu es maintenant né de nouveau.
            Bienvenue dans la famille de Dieu !
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <NavLink
              to="/contact"
              className="bg-[#F0B51B] text-[#071F5A] px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_40px_rgba(240,181,27,0.5)]"
            >
              Je viens de prier — contactez-moi
            </NavLink>
            <NavLink
              to="/apropos"
              className="border-2 border-white/70 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#071F5A] transition-all duration-300"
            >
              Trouver une église
            </NavLink>
          </div>

        </div>
      </section>

      {/* ═══════════════════════ POURQUOI ACCEPTER JÉSUS ═══════════════════════ */}
      <section className="py-28 bg-[#F8F8F8]">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#0B63CE] border border-[#0B63CE]/30 bg-[#0B63CE]/8 px-4 py-2 rounded-full">
            Ses promesses
          </span>
          <h2 className="text-[#071F5A] text-5xl font-black mt-6 mb-16">
            Pourquoi accepter Jésus ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {promesses.map((promesse, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 text-[#071F5A] flex items-center gap-5 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#0B63CE]/10 flex items-center justify-center">
                  <CheckCircle2 className="text-[#0B63CE]" size={22} />
                </div>
                <span className="font-semibold text-left text-lg">{promesse}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════ TÉMOIGNAGES ═══════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#0B63CE] border border-[#0B63CE]/30 bg-[#0B63CE]/8 px-4 py-2 rounded-full">
              Témoignages
            </span>
            <h2 className="text-5xl font-black text-[#071F5A] mt-6">Des vies transformées</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {temoignages.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F8F8F8] p-8 rounded-[32px] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Guillemet décoratif */}
                <div>
                  <span className="text-6xl text-[#0B63CE]/20 font-black leading-none select-none">"</span>
                  <p className="text-gray-600 leading-relaxed -mt-4">
                    {t.texte}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B63CE] to-[#071F5A] flex items-center justify-center shadow-md">
                    <Heart className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#071F5A]">{t.nom}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {t.ville}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════ CTA FINAL ═══════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-[#071F5A] to-[#020814] relative overflow-hidden">

        {/* Halo pulsant */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute w-[700px] h-[700px] rounded-full bg-[#F0B51B] blur-[220px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Étoiles légères */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <FaHandsPraying className="mx-auto text-7xl text-[#F0B51B] drop-shadow-[0_0_40px_rgba(240,181,27,0.7)] mb-8" />
          </motion.div>

          <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
            Ton heure est
            <span className="text-[#F0B51B] block drop-shadow-[0_0_30px_rgba(240,181,27,0.5)]">maintenant.</span>
          </h2>

          <p className="text-white/70 mt-8 text-xl max-w-2xl mx-auto leading-relaxed">
            Ne remets pas à demain ce que Dieu veut accomplir dans ta vie aujourd'hui.
            Fais le pas. Une seule décision peut tout changer.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <NavLink
              to="/priere-salut"
              className="bg-[#F0B51B] text-[#071F5A] px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_8px_50px_rgba(240,181,27,0.55)]"
            >
              Je veux connaître Jésus
            </NavLink>
            <NavLink
              to="/contact"
              className="border-2 border-white/70 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#071F5A] transition-all duration-300"
            >
              Parler à quelqu'un
            </NavLink>
          </div>

        </div>
      </section>

    </div>
  );
}