import {
  Heart,
  Users,
  BookOpen,
  Target,
  Eye,
  Gem,
  CheckCircle2,
  Globe,
  Mic2,
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

  return (
    <section className="bg-[#F8F8F8] overflow-hidden">

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#071F5A] overflow-hidden">

        {/* Fond dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F5A] via-[#0B2E7F] to-[#020814]" />

        {/* Étoiles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
          />
        ))}

        {/* Étoiles filantes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shoot-${i}`}
            className="absolute h-[2px] w-[180px] bg-gradient-to-r from-white to-transparent"
            initial={{ x: -300, y: Math.random() * 400, opacity: 0, rotate: -25 }}
            animate={{ x: 2200, opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 2 }}
          />
        ))}

        {/* Halo central */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-[800px] h-[800px] rounded-full bg-[#E5B10E] blur-[220px] opacity-40"
        />

        {/* Particules */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            initial={{ x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200), y: 900 }}
            animate={{ y: -200, opacity: [0, 1, 0] }}
            transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Colombe animée en fond */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            animate={{
              x: [0, 300, 600, 300, 0, -300, -600, -300, 0],
              y: [0, -150, 0, 150, 0, -150, 0, 150, 0],
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="opacity-10"
          >
            <FaDove className="text-white text-[220px]" />
          </motion.div>
        </div>

        {/* Flamme spirituelle */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{
              scaleY: [1, 1.25, 0.95, 1.2, 1],
              scaleX: [1, 0.95, 1.05, 0.9, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[180px] h-[280px]"
          >
            <div className="absolute inset-0 rounded-[100%_100%_70%_70%] bg-gradient-to-t from-red-700 via-orange-500 to-yellow-300 blur-md" />
            <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[90px] h-[170px] rounded-[100%_100%_70%_70%] bg-gradient-to-t from-orange-400 via-yellow-300 to-white" />
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-24 h-24 bg-white rounded-full blur-2xl opacity-60" />
          </motion.div>
        </div> */}

        {/* Contenu principal */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaDove className="mx-auto text-7xl text-[#F0B51B]" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 10, -15, 0],
              x: [0, 10, -10, 5, 0],
              rotate: [0, 1, -1, 0.5, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-5xl md:text-7xl font-black mt-8 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              Jésus-Christ
              <span className="block text-[#F0B51B]">
                t'appelle aujourd'hui
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 max-w-3xl mx-auto mt-8 text-xl leading-relaxed"
            >
              Tu n'es pas ici par hasard. Dieu t'aime profondément
              et désire une relation personnelle avec toi.
              Découvre la vie abondante qu'Il t'a préparée.
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <button
              onClick={() =>
                document
                  .getElementById("priere")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
                bg-[#E5B10E]
                text-[#071F5A]
                px-10
                py-4
                rounded-2xl
                font-bold
                shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]

              "
            >
              Faire la prière
            </button>

            <button
             onClick={() =>
                document
                  .getElementById("1")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="border-2 border-white text-white px-10 py-4 
              rounded-2xl font-bold
               hover:bg-white hover:text-[#071F5A] transition-all duration-300
              shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]"

            >
              En savoir plus
            </button>
          </div>

        </div>
      </section>

      {/* ===================== MESSAGE DE L'ÉVANGILE ===================== */}
      <section className="py-24" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>
              <span className="text-[#E5B10E] font-semibold">
                LA BONNE NOUVELLE
              </span>

              <h2 className="text-5xl font-bold text-[#071F5A] mt-4">
                Un message qui change tout.
              </h2>

              <p className="mt-8 text-gray-600 leading-relaxed">
                L'Évangile — du grec « bonne nouvelle » — est le message
                le plus transformateur de l'histoire humaine : Dieu, dans
                Son amour infini, a envoyé Son Fils Jésus-Christ pour
                réconcilier l'humanité avec Lui.
              </p>

              <p className="mt-6 text-gray-600 leading-relaxed">
                Ce n'est pas une religion de règles, mais une relation
                vivante avec le Créateur de l'univers. Une relation qui
                commence par un simple oui à Jésus-Christ.
              </p>

              <blockquote className="mt-8 border-l-4 border-[#E5B10E] pl-6 italic text-[#071F5A] font-medium text-lg">
                « Car Dieu a tant aimé le monde qu'il a donné son Fils unique,
                afin que quiconque croit en lui ne périsse pas,
                mais qu'il ait la vie éternelle. »
                <span className="block mt-2 text-sm not-italic text-gray-500">Jean 3:16</span>
              </blockquote>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full border-4 border-[#E5B10E] rounded-[40px]" />
              <img
                src="/images/evangelisation/bonne-nouvelle.jpg"
                alt="La Bonne Nouvelle"
                className="relative rounded-[40px] h-[500px] w-full object-cover shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ===================== 4 ÉTAPES DU SALUT ===================== */}
      <section className="py-24 bg-white" id="1">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="text-[#E5B10E] font-semibold">COMMENT ÊTRE SAUVÉ</span>
            <h2 className="text-5xl font-bold text-[#071F5A] mt-4">
              4 étapes vers la vie éternelle
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
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
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-[#F8F8F8] p-10 rounded-[32px] shadow-xl hover:-translate-y-3 transition-all duration-500"
              >
                <span className="text-6xl font-black text-[#E5B10E]/20 absolute top-4 right-6">
                  {etape.num}
                </span>
                <div className="text-[#E5B10E] relative z-10">
                  {etape.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-[#071F5A]">
                  {etape.titre}
                </h3>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {etape.texte}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== MISSION VISION VALEURS ===================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Target className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Mission</h3>
              <p className="mt-4 text-gray-600">
                Partager l'Évangile à toute créature et faire de toutes les nations des disciples de Christ.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Eye className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Vision</h3>
              <p className="mt-4 text-gray-600">
                Voir chaque homme, femme et enfant rencontrer Jésus-Christ personnellement.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Globe className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Impact</h3>
              <p className="mt-4 text-gray-600">
                Transformer la société de l'intérieur, une vie à la fois, par la puissance de l'Évangile.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== LES 3 PILIERS ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#071F5A]">
              Ce que Dieu t'offre
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {pilliers.map((pillier, index) => (
              <div
                key={index}
                className="p-10 rounded-[32px] shadow-xl hover:-translate-y-3 transition-all duration-500 bg-[#F8F8F8]"
              >
                <div className="text-[#E5B10E]">{pillier.icon}</div>
                <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">{pillier.title}</h3>
                <p className="mt-4 text-gray-600">{pillier.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== CHIFFRES ===================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-[32px] text-center shadow-xl"
              >
                <h3 className="text-5xl font-bold text-[#E5B10E]">{stat.value}</h3>
                <p className="mt-4 text-[#071F5A] font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRIÈRE DU SALUT ===================== */}
      <section className="py-24 bg-[#071F5A]" id="priere">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <span className="text-[#E5B10E] font-semibold">PRIÈRE DU SALUT</span>
          <h2 className="text-white text-5xl font-bold mt-4">
            Prie cette prière maintenant
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/10 backdrop-blur-md rounded-[40px] p-10 text-white text-left border border-white/20"
          >
            <FaHandsPraying className="text-[#E5B10E] text-4xl mb-6" />
            <p className="text-xl leading-relaxed italic">
              « Seigneur Jésus, je reconnais que je suis pécheur et que j'ai besoin de toi.
              Je crois que tu es mort pour mes péchés et que tu es ressuscité d'entre les morts.
              Je te reçois aujourd'hui comme mon Seigneur et mon Sauveur.
              Viens dans mon cœur, pardonne mes péchés et fais de moi un enfant de Dieu.
              À partir d'aujourd'hui, je décide de te suivre. Amen. »
            </p>
          </motion.div>

          <p className="text-white/60 mt-8 text-lg">
            Si tu viens de prier cette prière sincèrement, tu es maintenant né de nouveau. Bienvenue dans la famille de Dieu !
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <NavLink
              to="/contact"
              className="bg-[#E5B10E] text-[#071F5A] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(229,177,14,0.5)]"
            >
              Je viens de prier — contactez-moi
            </NavLink>
            <NavLink
              to="/apropos"
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-[#071F5A] transition-all duration-300"
            >
              Trouver une église
            </NavLink>
          </div>

        </div>
      </section>

      {/* ===================== POURQUOI ACCEPTER JESUS ===================== */}
      <section className="py-24 bg-[#F8F8F8]">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-[#071F5A] text-5xl font-bold">
            Pourquoi accepter Jésus ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {promesses.map((promesse, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 text-[#071F5A] flex items-center gap-4 shadow-xl"
              >
                <CheckCircle2 className="text-[#E5B10E] shrink-0" size={28} />
                <span className="font-medium">{promesse}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== TÉMOIGNAGES ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="text-[#E5B10E] font-semibold">TÉMOIGNAGES</span>
            <h2 className="text-5xl font-bold text-[#071F5A] mt-4">
              Des vies transformées
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((temoignage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F8F8F8] p-8 rounded-[32px] shadow-xl"
              >
                <p className="text-gray-600 italic leading-relaxed">
                  "{temoignage.texte}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5B10E]/20 flex items-center justify-center">
                    <Heart className="text-[#E5B10E]" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#071F5A]">{temoignage.nom}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {temoignage.ville}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="py-24 bg-gradient-to-b from-[#071F5A] to-[#020814] relative overflow-hidden">

        {/* Halo */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#E5B10E] blur-[200px] opacity-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FaHandsPraying className="mx-auto text-7xl text-[#F0B51B] mb-8" />
          </motion.div>

          <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
            Ton heure est
            <span className="text-[#F0B51B] block">maintenant.</span>
          </h2>

          <p className="text-white/70 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Ne remets pas à demain ce que Dieu veut accomplir dans ta vie aujourd'hui.
            Fais le pas. Une seule décision peut tout changer.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <NavLink
              to="/priere-salut"
              className="bg-[#E5B10E] text-[#071F5A] px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(229,177,14,0.6)]"
            >
              Je veux connaître Jésus
            </NavLink>
            <NavLink
              to="/contact"
              className="border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#071F5A] transition-all duration-300"
            >
              Parler à quelqu'un
            </NavLink>
          </div>

        </div>
      </section>

    </section>
  );
}