import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import api from "../../../shared/services/api";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("/contacts/", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const infos = [
    {
      icon: <MapPin size={30} />,
      title: "Localisation",
      subtitle: "Partout dans le monde",
      desc: "Nos cultes, enseignements et programmes sont accessibles en ligne à tout moment.",
    },
    {
      icon: <Mail size={30} />,
      title: "Adresse Email",
      subtitle: "support@eglise.org",
      desc: "Notre équipe est disponible pour répondre à toutes vos préoccupations.",
    },
    {
      icon: <Phone size={30} />,
      title: "Téléphone",
      subtitle: "+225 07 90 89 98 09",
      desc: "Échangez directement avec notre équipe d'accueil et d'accompagnement.",
    },
  ];

  const inputClass =
    "w-full h-20 rounded-3xl px-8 bg-white/90 border border-white/60 outline-none shadow-md text-[#071F5A] placeholder:text-slate-400 focus:ring-4 focus:ring-[#4F8EF7]/30 transition-all";

  return (
    <section className="relative overflow-hidden py-32">
      {/* Vidéo de fond */}
      <video
        src="contact.mp4"
        className="absolute inset-0 w-full h-full object-cover blur-[8px] scale-110 brightness-75"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Couvertures de fond */}
      <div className="absolute inset-0 bg-[#071F5A]/55" />
      <div className="absolute inset-0 bg-[#0B63CE]/20 mix-blend-overlay" />

      {/* Blobs décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-blue-400/15 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-blue-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-[#071F5A]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* En-tête */}
        <div className="text-center max-w-4xl mx-auto">
          <button
            onClick={() =>
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            ✨ Envoyez-nous un message maintenant
          </button>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            Prenons contact
            <br />
            ensemble
          </h2>

          <p className="mt-8 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Une question, un besoin de prière, une demande d'information ou un
            accompagnement spirituel ? Notre équipe reste disponible pour vous répondre.
          </p>
        </div>

        {/* Cartes d'information */}
        <div className="grid lg:grid-cols-3 gap-10 mt-24">
          {infos.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[40px] bg-white/80 backdrop-blur-2xl border border-white/80 p-10 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-700 shadow-[0_15px_60px_rgba(0,0,0,0.10),0_40px_120px_rgba(7,31,90,0.12)]"
            >
              {/* Halos au survol */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-blue-400/25 blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#0B63CE]/20 blur-[120px]" />
              </div>

              {/* Reflet */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none rounded-[40px]" />

              <div className="relative z-10">
                {/* Icône */}
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4F8EF7] to-[#071F5A] text-white shadow-[0_0_35px_rgba(79,142,247,0.5)]">
                  {item.icon}
                  <span className="absolute inset-0 rounded-full bg-[#4F8EF7]/30 blur-xl scale-125" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#071F5A]">{item.title}</h3>
                <h4 className="mt-2 text-base font-semibold text-[#0B63CE]">{item.subtitle}</h4>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div
          id="contact-form"
          className="relative mt-28 overflow-hidden rounded-[50px] bg-white/80 backdrop-blur-3xl border border-white/70 p-8 md:p-16 shadow-[0_25px_100px_rgba(0,0,0,0.10),0_60px_180px_rgba(7,31,90,0.12)]"
        >
          {/* Reflet */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none rounded-[50px]" />

          {/* Halos */}
          <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 left-0 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="relative z-10">
            {/* Titre */}
            <div className="text-center mb-14">
              <h3 className="text-4xl md:text-5xl font-black text-[#071F5A]">
                Envoyez-nous un message
              </h3>
              <p className="mt-4 text-slate-500 text-lg">
                Nous vous répondrons dans les meilleurs délais.
              </p>
            </div>

            {/* Champs nom + email */}
            <div className="grid md:grid-cols-2 gap-8">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Nom complet"
                className={inputClass}
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Adresse email"
                className={inputClass}
              />
            </div>

            {/* Téléphone */}
            <div className="mt-8">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Téléphone"
                className={inputClass}
              />
            </div>

            {/* Objet */}
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              type="text"
              placeholder="Objet du message"
              className={`mt-8 ${inputClass}`}
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={8}
              placeholder="Décrivez votre préoccupation..."
              className="mt-8 w-full rounded-[32px] p-8 resize-none bg-white/90 border border-white/60 outline-none shadow-md text-[#071F5A] placeholder:text-slate-400 focus:ring-4 focus:ring-[#4F8EF7]/30 transition-all"
            />

            {/* Message succès */}
            {success && (
              <div className="mt-6 text-center text-emerald-600 font-semibold text-lg">
                ✅ Votre message a été envoyé avec succès.
              </div>
            )}

            {/* Bouton */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative overflow-hidden flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-[#0B63CE] to-[#4F8EF7] text-white font-bold text-lg shadow-[0_20px_60px_rgba(11,99,206,0.45)] hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500"
              >
                <span className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                <span className="relative z-10">
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </span>
                <Send size={22} className="relative z-10" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}