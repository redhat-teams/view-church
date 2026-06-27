import { Send, MapPin, Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../shared/services/api";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, subject, message } = formData;
    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      setToast({ type: "error", text: "Tous les champs sont obligatoires." });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setToast({ type: "error", text: "Adresse email invalide." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setShootingStar(true);

    try {
      await api.post("/contacts/", formData);

      setTimeout(() => {
        setShootingStar(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setToast({ type: "success", text: "Votre message a été envoyé avec succès." });
        setLoading(false);
      }, 1400);
    } catch (error) {
      console.error(error);
      setShootingStar(false);
      setLoading(false);
      setToast({ type: "error", text: "Erreur lors de l'envoi. Réessayez." });
    }
  };

  const infos = [
    {
      icon: <MapPin size={22} />,
      title: "Localisation",
      value: "Dans le monde entier",
      href: null,
    },
    {
      icon: <Mail size={22} />,
      title: "Email",
      value: "prayerwinofficiel@gmail.com",
      href: "mailto:prayerwinofficiel@gmail.com",
    },
    {
      icon: <Phone size={22} />,
      title: "Téléphone",
      value: "+225 0705755230",
      href: "tel:+2250705755230",
    },
  ];

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/15 outline-none text-white text-sm sm:text-base placeholder:text-white/30 focus:border-[#E5B10E]/60 transition-colors duration-300 py-3";

  return (
    <section className="relative overflow-hidden py-16 sm:py-28 bg-[#071F5A]">

      <style>{`
        @keyframes starFly {
          0% { transform: translate(120px, 0) scale(0.6); opacity: 0; }
          15% { opacity: 1; }
          50% { transform: translate(0, -40px) scale(1.1); }
          100% { transform: translate(-40px, 0) scale(0.4); opacity: 0; }
        }
        @keyframes starSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(720deg); }
        }
        @keyframes toast-in {
          from { transform: translateY(-16px) translateX(-50%); opacity: 0; }
          to { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .info-card {
          animation: floatCard 4s ease-in-out infinite;
        }
        .info-card:nth-child(2) { animation-delay: 0.6s; }
        .info-card:nth-child(3) { animation-delay: 1.2s; }
      `}</style>

      {/* Halos discrets */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[120px]" style={{ background: "#E5B10E" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[140px]" style={{ background: "#E5B10E" }} />
      </div>

      {/* Étoile filante plein écran au clic d'envoi */}
      {shootingStar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ animation: "starFly 1.4s ease-in-out forwards" }}>
            <div
              className="w-16 h-16 rounded-full bg-[#E5B10E] flex items-center justify-center shadow-[0_0_60px_rgba(229,177,14,0.9)]"
              style={{ animation: "starSpin 1.4s linear forwards" }}
            >
              <Send size={28} className="text-[#071F5A]" />
            </div>
            <div className="absolute top-1/2 right-full -translate-y-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent to-[#E5B10E]" />
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 left-1/2 z-[70] -translate-x-1/2 flex items-center gap-3 px-5 py-3.5 rounded-xl max-w-[90vw] sm:max-w-md"
          style={{
            background: toast.type === "error" ? "#FEF2F2" : "#ECFDF5",
            border: `1px solid ${toast.type === "error" ? "#FCA5A5" : "#6EE7B7"}`,
            animation: "toast-in 0.3s ease-out",
          }}
        >
          {toast.type === "error" ? (
            <AlertCircle size={18} className="text-red-500 shrink-0" />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          )}
          <p className={`text-sm font-semibold ${toast.type === "error" ? "text-red-700" : "text-emerald-700"}`}>
            {toast.text}
          </p>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#E5B10E] text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
            Correspondance
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            Envoyez-nous un message
          </h2>
          <p className="mt-5 text-white/60 text-sm sm:text-base leading-relaxed px-2 max-w-xl mx-auto">
            Une question, un besoin de prière, un mot pour notre équipe —
            chaque message reçoit une réponse attentive.
          </p>
        </div>

        {/* Cartes de coordonnées — flottantes et cliquables */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {infos.map((item, index) => {
            const Wrapper = item.href ? "a" : "div";
            return (
              <Wrapper
                key={index}
                href={item.href || undefined}
                className="info-card group relative rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-[#E5B10E]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ animationPlayState: "running" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#E5B10E]/15 flex items-center justify-center text-[#E5B10E] shrink-0 group-hover:bg-[#E5B10E] group-hover:text-[#071F5A] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest">
                      {item.title}
                    </p>
                    <p className="mt-1 text-white text-sm sm:text-base font-semibold break-words group-hover:text-[#E5B10E] transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </div>

                {item.href && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#E5B10E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Wrapper>
            );
          })}
        </div>

        {/* La lettre, avec vidéo autour */}
        <div className="relative mt-14 sm:mt-20 max-w-2xl mx-auto">

          {/* Vidéo de fond — uniquement derrière la lettre */}
          <div className="absolute -inset-6 sm:-inset-10 rounded-[24px] overflow-hidden -z-10">
            <video
              src="contact.mp4"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-[6px] brightness-[0.4]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-[#071F5A]/60" />
          </div>

          {/* Enveloppe (silhouette décorative en arrière-plan) */}
          <div
            className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] h-16 sm:h-20 pointer-events-none rounded-t-[4px]"
            style={{
              background: "linear-gradient(135deg, #0B2E7F 50%, transparent 50%), linear-gradient(225deg, #0B2E7F 50%, transparent 50%)",
              backgroundSize: "50% 100%",
              backgroundPosition: "left, right",
              backgroundRepeat: "no-repeat",
              border: "1px solid rgba(229,177,14,0.15)",
              borderBottom: "none",
            }}
          />

          {/* Papier à lettre */}
          <div
            className="relative rounded-[4px] sm:rounded-[6px] p-6 sm:p-10 md:p-14"
            style={{
              background: "#0B2E7F",
              border: "1px solid rgba(229,177,14,0.15)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Liseré doré en haut */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E5B10E]/50 to-transparent" />

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              <div>
                <label className="block text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-0">
                  De la part de
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre nom complet"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-0">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="votre@email.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 mt-5 sm:mt-6">
              <div>
                <label className="block text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-0">
                  Téléphone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="+225 00 00 00 00"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-0">
                  Objet
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Sujet de votre message"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <label className="block text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mb-0">
                Votre message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Écrivez ce que vous avez sur le cœur..."
                className={`${fieldClass} resize-none`}
                style={{ lineHeight: 1.8 }}
              />
            </div>

            {/* Ligne de signature + bouton */}
            <div className="flex items-end justify-between mt-8 sm:mt-12 pt-6 border-t border-white/10">
              <p className="text-white/40 text-[11px] sm:text-xs italic">
                Réponse sous 24 à 48 heures ouvrées.
              </p>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-105"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #F0C84A, #E5B10E 70%)",
                }}
                aria-label="Envoyer le message"
              >
                <Send size={18} className="text-[#071F5A]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}