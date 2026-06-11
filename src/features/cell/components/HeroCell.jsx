
import {
  Heart,
  Users,
  Church,
  Target,
  Eye,
  Gem,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft,
  Send,
} from "lucide-react";
import {
  FaHandsPraying,
  FaBookBible,
  FaFire,
} from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import api from "../../../shared/services/api";
import { useState, useEffect } from "react";


// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT MODAL
// ─────────────────────────────────────────────────────────────────────────────

function CelluleModal({ onClose }) {


  const [approved, setApproved] = useState(false);

  // backend requests 

  const submitForm = async () => {

  if (!validateStep2()) return;

  try {

    setErrors({});

    const response = await api.post(
      "/prayer-requests/",
      form
    );

    localStorage.setItem(
      "prayerRequestId",
      response.data.id
    );

    setStep(3);

  } catch (error) {

    console.error(error);

    alert("Erreur lors de l'envoi");

  }
};


useEffect(() => {

  const id = localStorage.getItem(
    "prayerRequestId"
  );

  if (!id) return;

  const interval = setInterval(async () => {

    try {

      const res = await api.get(
        `/prayer-requests/${id}/status/`
      );

      if (res.data.status === "approved") {

            clearInterval(interval);

            setApproved(true);

            localStorage.removeItem(
              "prayerRequestId"
            );

            setTimeout(() => {

              window.open(
                "https://chat.whatsapp.com/XXXXXXXXXXXXXXXX",
                "_blank"
              );

              return () => clearTimeout(timeout);
            }, 1500);
}

    } catch (err) {
      console.log(err);
    }

  }, 5000);

  return () => clearInterval(interval);

}, []);





  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    prenom:    "",
    nom:       "",
    tel:       "",
    ville:     "",
    situation: "",
    priere:    "",
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function validateStep1() {
    const errs = {};
    if (!form.prenom.trim())         errs.prenom = "Champ requis";
    if (!form.nom.trim())            errs.nom    = "Champ requis";
    if (form.tel.trim().length < 8)  errs.tel    = "Numéro invalide";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs = {};
    if (!form.situation) errs.situation = "Veuillez choisir une option";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goStep2() {
    if (validateStep1()) { setErrors({}); setStep(2); }
  }

 






  const inputCls = (field) =>
    `w-full h-11 px-4 rounded-xl border text-sm bg-white/10 text-white placeholder-white/40 outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-white/20 focus:border-[#E5B10E]"
    }`;

  const labelCls =
    "block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wide";

  const errCls = "text-red-400 text-xs mt-1";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(2,8,20,0.75)",
        backdropFilter:  "blur(6px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{    opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md rounded-[32px] overflow-hidden"
        style={{
          background:  "linear-gradient(135deg, #0B2E7F 0%, #071F5A 60%, #020814 100%)",
          border:      "1px solid rgba(229,177,14,0.3)",
          boxShadow:   "0 0 80px rgba(229,177,14,0.15), 0 40px 80px rgba(0,0,0,0.6)",
        }}
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Halo décoratif */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(229,177,14,0.18) 0%, transparent 70%)",
          }}
        />

        {/* En-tête */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
              <FaWhatsapp className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight">
                Intégrer la cellule
              </p>
              <p className="text-white/50 text-xs">
                Prayer Winner — Groupe WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Barre de progression */}
        <div className="flex gap-2 px-8 mb-8">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{
                background: step >= n ? "#E5B10E" : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>

        {/* Corps */}
        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">

            {/* ── Étape 1 ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{    opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-white font-bold text-lg mb-6">
                  Tes informations
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Prénom</label>
                    <input
                      className={inputCls("prenom")}
                      placeholder="Marie"
                      value={form.prenom}
                      onChange={set("prenom")}
                    />
                    {errors.prenom && (
                      <p className={errCls}>{errors.prenom}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>Nom</label>
                    <input
                      className={inputCls("nom")}
                      placeholder="Kouassi"
                      value={form.nom}
                      onChange={set("nom")}
                    />
                    {errors.nom && (
                      <p className={errCls}>{errors.nom}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelCls}>Numéro WhatsApp</label>
                  <input
                    className={inputCls("tel")}
                    placeholder="+225 07 00 00 00 00"
                    type="tel"
                    value={form.tel}
                    onChange={set("tel")}
                  />
                  {errors.tel && <p className={errCls}>{errors.tel}</p>}
                </div>

                <div className="mb-8">
                  <label className={labelCls}>Ville</label>
                  <input
                    className={inputCls("ville")}
                    placeholder="Abidjan"
                    value={form.ville}
                    onChange={set("ville")}
                  />
                </div>

                <button
                  onClick={goStep2}
                  className="w-full h-12 rounded-2xl font-bold text-[#071F5A] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "#E5B10E",
                    boxShadow:  "0 0 24px rgba(229,177,14,0.4)",
                  }}
                >
                  Continuer <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* ── Étape 2 ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{    opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-white font-bold text-lg mb-6">
                  Ton profil spirituel
                </p>

                <div className="mb-4">
                  <label className={labelCls}>Situation spirituelle</label>
                  <select
                    className={`${inputCls("situation")} appearance-none cursor-pointer`}
                    value={form.situation}
                    onChange={set("situation")}
                  >
                    <option value="" disabled>-- Sélectionner --</option>
                    <option value="nouveau">Nouveau converti</option>
                    <option value="engage">Chrétien engagé</option>
                    <option value="recherche">En recherche spirituelle</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.situation && (
                    <p className={errCls}>{errors.situation}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label className={labelCls}>
                    Sujet de prière (facultatif)
                  </label>
                  <input
                    className={inputCls("priere")}
                    placeholder="Ex : famille, guérison, emploi…"
                    value={form.priere}
                    onChange={set("priere")}
                  />
                </div>

                <button
                  onClick={submitForm}
                  className="w-full h-12 rounded-2xl font-bold text-[#071F5A] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-3"
                  style={{
                    background: "#E5B10E",
                    boxShadow:  "0 0 24px rgba(229,177,14,0.4)",
                  }}
                >
                  <Send size={16} /> Envoyer et intégrer le groupe
                </button>

                <button
                  onClick={() => { setErrors({}); setStep(1); }}
                  className="w-full h-10 rounded-2xl text-white/60 text-sm flex items-center justify-center gap-2 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <ArrowLeft size={15} /> Retour
                </button>
              </motion.div>
            )}

            {/* ── Succès ── */}

           {step === 3 && (
  <motion.div
    key="step3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-4"
  >
    {!approved ? (
      <>
        <div className="w-16 h-16 border-4 border-[#E5B10E] border-t-transparent rounded-full animate-spin mx-auto mb-6" />

        <h3 className="text-white text-xl font-bold mb-3">
          Demande envoyée
        </h3>

        <p className="text-white/70">
          Votre demande est en cours de validation
          par un administrateur.
        </p>

        <p className="text-[#E5B10E] mt-4 text-sm">
          Veuillez patienter...
        </p>
      </>
    ) : (
      <>
        <CheckCircle2
          className="mx-auto text-green-500 mb-4"
          size={60}
        />

        <h3 className="text-white text-xl font-bold">
          Validation acceptée
        </h3>

        <p className="text-white/70 mt-3">
          Redirection vers WhatsApp...
        </p>
      </>
    )}
  </motion.div>
)}





          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroCell() {

  const [modalOpen, setModalOpen] = useState(false);

  const values = [
    {
      icon:  <Heart size={32} />,
      title: "Amour",
      desc:  "Nous accueillons chacun avec compassion, grâce et bienveillance.",
    },
    {
      icon:  <Church size={32} />,
      title: "Foi",
      desc:  "Nous croyons fermement à la puissance de Dieu et de Sa parole.",
    },
    {
      icon:  <Users size={32} />,
      title: "Communauté",
      desc:  "Grandir ensemble dans l'unité et le service.",
    },
  ];

  const stats = [
    { value: "1200+", label: "Membres"           },
    { value: "20+",   label: "Ministères"         },
    { value: "15+",   label: "Années d'existence" },
    { value: "300+",  label: "Jeunes engagés"     },
  ];

  const reasons = [
    "Une communauté chaleureuse",
    "Des enseignements bibliques solides",
    "Des événements pour toute la famille",
    "Une croissance spirituelle continue",
  ];

  return (
    <section className="bg-[#F8F8F8] overflow-hidden">


      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                             */}
      {/* ============================================================ */}

      <section className="relative min-h-screen flex items-center justify-center bg-[#071F5A] overflow-hidden">
        {/* Fond dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F5A] via-[#0B2E7F] to-[#020814]" />
         
  {/* Vidéo */}
          <video
  src="preawin.mp4"
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    scale-110
  "
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
/>

{/* Overlay sombre */}
<div className="absolute inset-0 bg-[#071F5A]/40" />

{/* Glass bleu */}
<div
  className="
    absolute
    inset-0
    backdrop-blur-[10px]
    bg-gradient-to-br
    from-[#0B63CE]/25
    via-[#071F5A]/20
    to-[#0B63CE]/15
  "
/>

{/* Lumière bleue */}
<div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_top_right,rgba(11,99,206,0.35),transparent_40%)]
  "
/>

        {/* Étoiles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width:  Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top:    `${Math.random() * 100}%`,
              left:   `${Math.random() * 100}%`,
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

        {/* Particules spirituelles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: 900,
            }}
            animate={{ y: -200, opacity: [0, 1, 0] }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat:   Infinity,
              delay:    i * 0.3,
            }}
          />
        ))}

        {/* Flamme spirituelle */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{
              scaleY: [1, 1.25, 0.95, 1.2, 1],
              scaleX: [1, 0.95, 1.05, 0.9,  1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[180px] h-[280px]"
          > */}
            {/* Flamme extérieure */}
            {/* <div className="absolute inset-0 rounded-[100%_100%_70%_70%] bg-gradient-to-t from-red-700 via-orange-500 to-yellow-300 blur-md" /> */}

            {/* Cœur de la flamme */}
            {/* <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[90px] h-[170px] rounded-[100%_100%_70%_70%] bg-gradient-to-t from-orange-400 via-yellow-300 to-white" /> */}

            {/* Lumière */}
            {/* <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-24 h-24 bg-white rounded-full blur-2xl opacity-60" />
          </motion.div>
        </div> */}

        {/* Bible flottante en fond */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10">
          <motion.div
            animate={{
              x:       [0, 500, 900, 500, 0, -500, -900, -500, 0],
              y:       [0, -200, 0, 200, 0, -200, 0, 200, 0],
              rotateZ: [-8, 5, -5, 8, -8],
              scale:   [1, 1.05, 1, 1.08, 1],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative w-[320px] h-[220px]"
            style={{ perspective: "1200px" }}
          >
            {/* Lumière divine */}
            <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-[80px] scale-125" />

            {/* Livre */}
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

              {/* Couverture gauche */}
              <motion.div
                animate={{ rotateY: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-1/2 h-full bg-[#4a2f1a] rounded-l-xl shadow-2xl"
                style={{ transformOrigin: "right center" }}
              />

              {/* Couverture droite */}
              <motion.div
                animate={{ rotateY: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-0 w-1/2 h-full bg-[#4a2f1a] rounded-r-xl shadow-2xl"
                style={{ transformOrigin: "left center" }}
              />

              {/* Pages */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotateY: [0, -180, 0] }}
                  transition={{
                    duration: 4,
                    repeat:   Infinity,
                    delay:    i * 0.8,
                    ease:     "easeInOut",
                  }}
                  className="absolute left-1/2 top-2 h-[95%] w-[46%] bg-[#fffaf0] border-l border-gray-200 shadow-lg"
                  style={{
                    transformOrigin: "left center",
                    transformStyle:  "preserve-3d",
                    zIndex:          20 - i,
                  }}
                >
                  <div className="p-4 text-[8px] text-gray-400 leading-3">
                    Le Seigneur est mon refuge et ma force, un secours qui ne manque jamais dans 
                    la détresse. Lorsque mon cœur est troublé, je me confie en Sa parole, car elle
                     éclaire mon chemin et fortifie mon âme. Sa paix surpasse toute intelligence et 
                     Son amour demeure éternellement pour ceux qui Le cherchent avec foi et sincérité.
                    
                  </div>
                </motion.div>
              ))}

              {/* Tranche dorée */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-full bg-[#d4af37] shadow-lg" />

              {/* Croix dorée */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="w-3 h-12 bg-yellow-400 rounded-full" />
                <div className="w-10 h-3 bg-yellow-400 rounded-full absolute top-4 -left-3.5" />
              </div>

            </div>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">

          {/* Icône mains */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaHandsPraying className="mx-auto text-7xl text-[#F0B51B]" />
          </motion.div>

          {/* Titre + sous-titre */}
          <motion.div
            animate={{
              y:      [0, -20, 10, -15, 0],
              x:      [0, 10, -10, 5, 0],
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
              Bienvenue à
              <span className="block text-[#F0B51B]">Prayer Win</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 max-w-3xl mx-auto mt-8 text-xl leading-relaxed"
            >
              Une famille spirituelle centrée sur Jésus-Christ,
              engagée à transformer des vies par la foi,
              l'amour et le service.
            </motion.p>
          </motion.div>

          {/* Boutons */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">

            {/* Bouton déclencheur du modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#E5B10E]
               text-[#071F5A] px-10 py-4 rounded-2xl 
               font-bold hover:scale-105 transition-all 
               shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]"
            >
              Intégrer la cellule
            </button>

            <NavLink
              to="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-[#071F5A] transition-all duration-300"
            >
              Nous contacter
            </NavLink>

          </div>
        </div>

        {/* Modal WhatsApp */}
        <AnimatePresence>
          {modalOpen && (
            <CelluleModal onClose={() => setModalOpen(false)} />
          )}
        </AnimatePresence>

      </section>


      {/* ============================================================ */}
      {/* SECTION 2 — HISTOIRE + MISSION / VISION / VALEURS + CHIFFRES */}
      {/* ============================================================ */}

      <section className="py-24 space-y-24">

        {/* — Histoire — */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>
              <span className="text-[#E5B10E] font-semibold">NOTRE HISTOIRE</span>
              <h2 className="text-5xl font-bold text-[#071F5A] mt-4">
                Une église bâtie sur la foi et la mission.
              </h2>
              <p className="mt-8 text-gray-600 leading-relaxed">
                Depuis plusieurs années, CCM accompagne des hommes,
                des femmes et des familles dans leur croissance
                spirituelle à travers l'enseignement de la Parole,
                la prière et la communion fraternelle.
              </p>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Notre désir est de voir chaque personne découvrir
                son identité en Christ et accomplir son appel.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full border-4 border-[#E5B10E] rounded-[40px]" />
              <img
                src="fid2.png"
                alt="Notre histoire"
                className="relative rounded-[40px] h-[500px] w-full object-cover shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
              />
            </div>

          </div>
        </div>

        {/* — Mission / Vision / Valeurs — */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Target className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Mission</h3>
              <p className="mt-4 text-gray-600">
                Conduire les âmes à Christ et les former comme disciples.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Eye className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Vision</h3>
              <p className="mt-4 text-gray-600">
                Transformer les vies et impacter la société.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-xl">
              <Gem className="text-[#E5B10E]" size={42} />
              <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">Valeurs</h3>
              <p className="mt-4 text-gray-600">
                Foi, amour, intégrité et excellence dans le service.
              </p>
            </div>

          </div>
        </div>

        {/* — Chiffres — */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-[32px] text-center shadow-xl"
              >
                <h3 className="text-5xl font-bold text-[#E5B10E]">
                  {stat.value}
                </h3>
                <p className="mt-4 text-[#071F5A] font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>


      {/* ============================================================ */}
      {/* SECTION 3 — NOS VALEURS FONDAMENTALES                        */}
      {/* ============================================================ */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#071F5A]">
              Nos valeurs fondamentales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-10 rounded-[32px] shadow-xl hover:-translate-y-3 transition-all duration-500 bg-[#F8F8F8]"
              >
                <div className="text-[#E5B10E]">{value.icon}</div>
                <h3 className="mt-6 text-3xl font-bold text-[#071F5A]">
                  {value.title}
                </h3>
                <p className="mt-4 text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* SECTION 4 — POURQUOI NOUS REJOINDRE                          */}
      {/* ============================================================ */}

      <section className="py-24 bg-[#071F5A]">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-white text-5xl font-bold">
            Pourquoi rejoindre CCM ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-white flex items-center gap-4"
              >
                <CheckCircle2 className="text-[#E5B10E]" size={28} />
                {reason}
              </div>
            ))}
          </div>
          <br />
            {/* Bouton déclencheur du modal */}
            <button
                onClick={() => setModalOpen(true)}
                className="
                    bg-[#E5B10E]
                    text-[#071F5A]
                    px-10
                    py-4
                    rounded-2xl
                    font-bold
                    transition-all
                    duration-300
                    shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]

                    hover:scale-105
                    hover:shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]
                "
                >
                🔥 Intégrer la cellule
                </button>
        </div>
      </section>


    </section>
  );
}