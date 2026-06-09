
import {
  Send,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import { useState } from "react";
import api from "../../../shared/services/api";

export default function ContactForm() {


  // backend form 
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
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};




  const handleSubmit = async () => {
  try {
    setLoading(true);

    await api.post("/contacts/", formData);

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

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

  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-b from-white via-[#F8FAFD] to-[#EEF4FF]">

      {/* BLOBS PREMIUM */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#E5B10E]/15 blur-[140px]" />

        <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-[#071F5A]/10 blur-[160px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center max-w-4xl mx-auto">

          <button 
          onClick={() =>
                document
                  .getElementById("1")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
          className="inline-flex items-center 
          shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]
          gap-2 px-6 py-3 rounded-full bg-white border
           border-white text-[#E5B10E]
           font-semibold">

            ✨ Envoyez nous un message maintenant

          </button>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#071F5A] leading-tight">

            Prenons contact
            <br />
            ensemble

          </h2>

          <p className="mt-8 text-xl text-slate-600 leading-relaxed">

            Une question, un besoin de prière, une demande
            d'information ou un accompagnement spirituel ?
            Notre équipe reste disponible pour vous répondre.

          </p>

        </div>

        {/* CARTES */}

        <div className="grid lg:grid-cols-3 gap-10 mt-24">

          {infos.map((item, index) => (
            <div
              key={index}
              className="
              group
              relative
              overflow-hidden

              rounded-[40px]

              bg-white/70
              backdrop-blur-2xl

              border
              border-white/80

              p-10

              hover:-translate-y-5
              hover:scale-[1.02]

              transition-all
              duration-700

              shadow-[0_15px_60px_rgba(0,0,0,0.06),0_40px_120px_rgba(7,31,90,0.10)]
            "
            >

              {/* HALOS */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">

                <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#E5B10E]/25 blur-[100px]" />

                <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-blue-500/20 blur-[120px]" />

              </div>

              {/* REFLET */}

              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">

                <div
                  className="
                  relative

                  w-20
                  h-20

                  rounded-full

                  flex
                  items-center
                  justify-center

                  bg-gradient-to-br
                  from-[#FFE07A]
                  to-[#E5B10E]

                  text-[#071F5A]

                  shadow-[0_0_35px_rgba(229,177,14,0.5)]

                  animate-pulse
                "
                >

                  {item.icon}

                  <span className="absolute inset-0 rounded-full bg-[#E5B10E]/40 blur-xl scale-125" />

                </div>

                <h3 className="mt-8 text-3xl font-bold text-[#071F5A]">
                  {item.title}
                </h3>

                <h4 className="mt-3 text-lg font-semibold text-[#E5B10E]">
                  {item.subtitle}
                </h4>

                <p className="mt-5 text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* FORMULAIRE PREMIUM */}

        <div
          className="
          relative

          mt-28

          overflow-hidden

          rounded-[50px]

          bg-white/75
          backdrop-blur-3xl

          border
          border-white

          p-8
          md:p-16

          shadow-[0_25px_100px_rgba(0,0,0,0.08),0_60px_180px_rgba(7,31,90,0.10)]
        "
        >

          {/* REFLET */}

          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />

          {/* HALO */}

          <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-[#E5B10E]/15 rounded-full blur-[140px]" />

          <div className="absolute -bottom-32 left-0 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[160px]" />

          <div className="relative z-10">

            <div className="text-center mb-14">

              <h3 className="text-4xl md:text-5xl font-black text-[#071F5A]">

                Envoyez-nous un message

              </h3>

              <p className="mt-4 text-slate-600 
              shadow-[0_0_25px_rgba(255,80,0,0.8),0_0_50px_rgba(255,140,0,0.7),0_0_80px_rgba(255,215,0,0.5)]
              
              ">

                Nous vous répondrons dans les meilleurs délais.

              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-8" id="1">

              <input
                
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Nom complet"
                className="
                h-20

                rounded-3xl

                px-8

                bg-white/80

                border
                border-white

                outline-none

                shadow-lg

                focus:ring-4
                focus:ring-[#E5B10E]/30

                transition-all
              "
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Adresse email"
                className="
                h-20

                rounded-3xl

                px-8

                bg-white/80

                border
                border-white

                outline-none

                shadow-lg

                focus:ring-4
                focus:ring-[#E5B10E]/30

                transition-all
              "
              />
              <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Téléphone"
                  className="mt-8 w-full h-20 rounded-3xl px-8"
                />

            </div>

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              type="text"
              placeholder="Objet du message"

              className="
              mt-8

              w-full
              h-20

              rounded-3xl

              px-8

              bg-white/80

              border
              border-white

              outline-none

              shadow-lg

              focus:ring-4
              focus:ring-[#E5B10E]/30

              transition-all
            "
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={8}
              placeholder="Décrivez votre préoccupation..."
                          className="
              mt-8

              w-full

              rounded-[32px]

              p-8

              resize-none

              bg-white/80

              border
              border-white

              outline-none

              shadow-lg

              focus:ring-4
              focus:ring-[#E5B10E]/30

              transition-all
            "
            />

            <div className="flex justify-center mt-10">

              <button

                onClick={handleSubmit}
                disabled={loading}
                className="
                group

                relative

                overflow-hidden

                flex
                items-center
                gap-4

                px-10
                py-5

                rounded-full

                bg-gradient-to-r
                from-[#E5B10E]
                to-[#FFD75A]

                text-[#071F5A]

                font-bold
                text-lg

                shadow-[0_20px_60px_rgba(229,177,14,0.45)]

                hover:scale-105

                transition-all
                duration-500
              "
              >
                {success && (
                  <div className="mt-6 text-center text-green-600 font-bold">
                    Votre message a été envoyé avec succès.
                  </div>
                )}

                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />

                <span className="relative z-10">
                  {loading
                    ? "Envoi..."
                    : "Envoyer le message"}
                </span>

                <Send
                  size={22}
                  className="relative z-10"
                />

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

