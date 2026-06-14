import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/redhatteams@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "Nouvelle inscription à la Newsletter",
          message: `Nouvelle inscription newsletter de : ${email}`,
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#071F5A] via-[#0A3C90] to-[#1260D6]">
      {/* Décorations arrière-plan */}
      <div className="absolute left-0 bottom-0 opacity-10">
        <div className="w-64 h-64 bg-white rounded-full absolute -left-16 bottom-0" />
        <div className="w-40 h-40 bg-white rounded-full absolute left-20 bottom-10" />
        <div className="w-56 h-56 bg-white rounded-full absolute left-52 -bottom-16" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Partie gauche */}
          <div className="text-white py-8 lg:pr-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed mb-12">
              Faites partie d'une famille spirituelle vivante.
              Ensemble, grandissons dans la foi et impactons
              notre génération pour Christ.
            </p>
            <Link
              to="/contact"
              className="
                bg-[#F0B51B] hover:bg-yellow-400
                text-[#071F5A] font-bold text-lg md:text-1xl
                px-10 md:px-9 py-3 rounded-full
                transition-all duration-300 hover:scale-105 shadow-xl
              "
            >
              Rejoindre la communauté
            </Link>
          </div>

          {/* Partie droite */}
          <div
            className="
              bg-[#F8F8F8] p-8 md:p-12
              rounded-tl-[80px] rounded-bl-[80px]
              rounded-tr-none rounded-br-none
              shadow-2xl
            "
          >
            <h3 className="text-[#071F5A] text-3xl md:text-4xl font-extrabold mb-10">
              Abonnez-vous à la Newsletter
            </h3>

            {/* Input */}
            <div className="relative mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Entrer votre adresse e-mail"
                className="
                  w-full h-16 rounded-full
                  border border-[#F0B51B] bg-white
                  px-8 pr-24 outline-none
                  focus:ring-2 focus:ring-[#F0B51B]
                "
              />
              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="
                  absolute top-0 right-0
                  h-16 w-16 bg-[#F0B51B] rounded-full
                  flex items-center justify-center
                  hover:bg-yellow-400 transition
                  disabled:opacity-60
                "
              >
                <FaPaperPlane size={24} className="text-[#071F5A]" />
              </button>
            </div>

            {/* Messages de statut */}
            {status === "invalid" && (
              <p className="text-red-500 text-sm mb-4 px-2">
                Veuillez entrer une adresse e-mail valide.
              </p>
            )}
            {status === "sending" && (
              <p className="text-gray-500 text-sm mb-4 px-2">Envoi en cours...</p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-sm mb-4 px-2">
                ✅ Merci ! Vous êtes bien inscrit à la newsletter.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm mb-4 px-2">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}

            <p className="text-gray-800 text-lg leading-relaxed">
              Nous accueillons toute personne avec amour et
              respect, quelle que soit son histoire, son origine,
              sa couleur, sa langue ou sa nation tout en annonçant
              fidèlement la vérité de l'Évangile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}