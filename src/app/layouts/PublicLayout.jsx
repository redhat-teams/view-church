import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from "../../features/home/components/Footer";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaHandHoldingHeart,
  FaWhatsapp,
  FaHome,
  FaInfoCircle,
  FaBookOpen,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaPrayingHands,
  FaChurch,
} from "react-icons/fa";
import QRCode from "react-qr-code";

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [donModal, setDonModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    await navigator.clipboard.writeText("0706836722");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ================= TOP BAR ================= */}
      <div className="bg-[#F0B51B] text-[#071F5A]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3">

          {/* Mobile : deux lignes compactes */}
          <div className="flex flex-col gap-1 md:hidden">
            {/* Ligne 1 : localisation + email */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="shrink-0" />
                <span>France</span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <FaEnvelope className="shrink-0" />
                <span className="truncate">contact@moministere.com</span>
              </div>
            </div>
            {/* Ligne 2 : téléphones + réseaux */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <FaPhoneAlt className="shrink-0" />
                  <span>+225 0705755230</span>
                </div>
                <span>+336 74 38 61 52</span>
              </div>
              {/* Réseaux sociaux - mobile */}
              <div className="flex items-center gap-3 text-base shrink-0">
                <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
                <FaTwitter className="cursor-pointer hover:scale-110 transition" />
                <FaYoutube className="cursor-pointer hover:scale-110 transition" />
                <FaInstagram className="cursor-pointer hover:scale-110 transition" />
              </div>
            </div>
          </div>

          {/* Desktop : une ligne */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>France</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span>contact@moministere.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>+225 0705755230</span>
              </div>
              <span>+336 74 38 61 52</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
              <FaTwitter className="cursor-pointer hover:scale-110 transition" />
              <FaYoutube className="cursor-pointer hover:scale-110 transition" />
              <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="bg-[#071F5A] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex justify-between items-center h-16 sm:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/public/logo.png"
                alt="Logo"
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-white">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaHome />
                Accueil
              </NavLink>

              <NavLink
                to="/apropos"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaInfoCircle />
                À propos
              </NavLink>

              <NavLink
                to="/teachings"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaBookOpen />
                Enseignements
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaCalendarAlt />
                Évènements
              </NavLink>

              <NavLink
                to="/cellule"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaPrayingHands />
                Prayer win
              </NavLink>

              <NavLink
                to="/evangelisation"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaChurch />
                Evangelism
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center gap-2 transition border-b-2 pb-1 ${
                    isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                  }`
                }
              >
                <FaEnvelope />
                Contact
              </NavLink>
            </nav>

            {/* Bouton Don — desktop */}
            <button
              id="don"
              onClick={() => setDonModal(true)}
              className="
                hidden md:flex
                items-center gap-3
                bg-[#F0B51B]
                text-[#071F5A]
                font-bold
                px-5 py-2.5
                rounded-2xl
                shadow-[0_10px_40px_rgba(240,181,27,0.4)]
                hover:scale-105
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <FaHandHoldingHeart />
              Faire un don
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white text-2xl sm:text-3xl p-1"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden
            bg-[#071F5A]
            overflow-hidden
            transition-all
            duration-500
            ${menuOpen ? "max-h-[700px] py-4" : "max-h-0"}
          `}
        >
          <nav className="flex flex-col px-4 sm:px-6 text-white">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaHome />
              Accueil
            </NavLink>

            <NavLink
              to="/apropos"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaInfoCircle />
              À propos
            </NavLink>

            <NavLink
              to="/teachings"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaBookOpen />
              Enseignements
            </NavLink>

            <NavLink
              to="/events"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaCalendarAlt />
              Évènements
            </NavLink>

            <NavLink
              to="/cellule"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaPrayingHands />
              Prayer win
            </NavLink>

            <NavLink
              to="/evangelisation"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaChurch />
              Evangelism
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 ${isActive ? "text-[#F0B51B]" : ""}`
              }
            >
              <FaEnvelope />
              Contact
            </NavLink>

            <button
              onClick={() => { setDonModal(true); setMenuOpen(false); }}
              className="
                mt-4
                flex items-center justify-center gap-3
                bg-[#F0B51B]
                text-[#071F5A]
                font-bold
                py-4
                rounded-2xl
              "
            >
              <FaHandHoldingHeart />
              Faire un don
            </button>
          </nav>
        </div>
      </header>

      {/* ================= PAGE ================= */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ================= MODAL DON ================= */}
      {donModal && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black/50 backdrop-blur-xl
            p-4 sm:p-5
          "
          onClick={() => setDonModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full max-w-3xl
              rounded-[32px] sm:rounded-[40px]
              bg-white/80 backdrop-blur-3xl
              border border-white/50
              shadow-[0_40px_120px_rgba(0,0,0,0.25)]
              animate-[modal_0.35s_ease]
              flex flex-col
              max-h-[90vh]
            "
          >
            {/* CLOSE — toujours visible, hors du scroll */}
            <button
              onClick={() => setDonModal(false)}
              className="
                absolute top-4 right-4 sm:top-5 sm:right-5
                z-50
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full bg-white shadow-lg
                text-lg sm:text-xl
                hover:rotate-90 transition
                flex items-center justify-center
              "
            >
              ✕
            </button>

            {/* ZONE SCROLLABLE */}
            <div className="overflow-y-auto overflow-x-hidden rounded-[32px] sm:rounded-[40px]">

            {/* HALOS */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F0B51B]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            {/* HEADER */}
            <div className="relative z-10 px-6 sm:px-10 pt-8 sm:pt-10 pb-4 pr-14 sm:pr-16 text-center">
              <h2 className="text-3xl sm:text-5xl font-black text-[#071F5A]">
                Faire un Don
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Soutenez l'œuvre et participez à la propagation de l'Évangile.
              </p>
            </div>

            {/* MOYENS DE PAIEMENT */}
            <div className="relative z-10 px-6 sm:px-10 pb-10 sm:pb-12">
              {selectedPayment ? (
                <div className="text-center">
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xl">
                      <QRCode
                        value={selectedPayment.link || `tel:${selectedPayment.number}`}
                        size={200}
                        className="sm:!w-[260px] sm:!h-[260px]"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#071F5A] mb-4">
                    {selectedPayment.type}
                  </h3>

                  <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-3 bg-slate-100 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl">
                      <span className="text-lg sm:text-2xl font-bold text-[#071F5A]">
                        {selectedPayment.number}
                      </span>
                      <button
                        onClick={copyNumber}
                        className="px-3 sm:px-4 py-2 bg-[#071F5A] text-white rounded-lg text-sm sm:text-base"
                      >
                        {copied ? "Copié !" : "Copier"}
                      </button>
                    </div>
                  </div>

                  {selectedPayment.link && (
                    <a
                      href={selectedPayment.link}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-block px-6 sm:px-8 py-3
                        rounded-2xl bg-blue-500 text-white font-bold
                        shadow-lg hover:scale-105 transition
                      "
                    >
                      Ouvrir le lien de paiement Wave
                    </a>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="px-6 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* WAVE */}
                  <div className="
                    group relative overflow-hidden rounded-[28px] sm:rounded-[32px]
                    bg-white p-6 sm:p-8 border
                    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    hover:-translate-y-3 hover:scale-[1.03]
                    transition-all duration-500
                  ">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
                    <div className="relative z-10 text-center">
                      <img
                        src="/wave.png"
                        alt="Wave"
                        className="h-16 sm:h-20 mx-auto object-contain"
                      />
                      <h3 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold text-[#071F5A]">
                        Wave
                      </h3>
                      <p className="mt-2 sm:mt-3 text-slate-600 text-sm sm:text-base">
                        +225 07 06 83 67 22
                      </p>
                      <button
                        onClick={() =>
                          setSelectedPayment({
                            type: "Wave",
                            number: "0706836722",
                            link: "https://pay.wave.com/m/M_ci_rpkTnEMdLOa-/c/ci/",
                            color: "bg-blue-500",
                          })
                        }
                        className="
                          mt-5 sm:mt-6 px-5 sm:px-6 py-3
                          rounded-full bg-blue-500 text-white font-bold
                          shadow-lg hover:scale-105 transition
                        "
                      >
                        Donner via Wave
                      </button>
                    </div>
                  </div>

                  {/* ORANGE MONEY */}
                  <div className="
                    group relative overflow-hidden rounded-[28px] sm:rounded-[32px]
                    bg-white p-6 sm:p-8 border
                    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    hover:-translate-y-3 hover:scale-[1.03]
                    transition-all duration-500
                  ">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white" />
                    <div className="relative z-10 text-center">
                      <img
                        src="/orange.png"
                        alt="Orange Money"
                        className="h-16 sm:h-20 mx-auto object-contain"
                      />
                      <h3 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold text-[#071F5A]">
                        Orange Money
                      </h3>
                      <p className="mt-2 sm:mt-3 text-slate-600 text-sm sm:text-base">
                        +225 07 06 83 67 22
                      </p>
                      <button
                        onClick={() =>
                          setSelectedPayment({
                            type: "Orange Money",
                            number: "0706836722",
                            link: null,
                            color: "bg-orange-500",
                          })
                        }
                        className="
                          mt-5 sm:mt-6 px-5 sm:px-6 py-3
                          rounded-full bg-orange-500 text-white font-bold
                          shadow-lg hover:scale-105 transition
                        "
                      >
                        Donner via Orange
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            </div>{/* fin zone scrollable */}
          </div>
        </div>
      )}

      <Footer />

      {/* ================= BOUTONS FLOTTANTS ================= */}
      <div className="fixed bottom-6 right-4 md:right-6 flex flex-col gap-4 z-50">
        <a
          href="https://wa.me/2250705755230"
          target="_blank"
          rel="noreferrer"
          className="
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-full bg-white shadow-xl
            flex items-center justify-center
            hover:scale-110 transition
          "
        >
          <FaWhatsapp size={26} className="text-green-500 sm:text-[30px]" />
        </a>

        <a
          href="tel:+2250705755230"
          className="
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-full bg-red-600 shadow-xl
            flex items-center justify-center
            hover:scale-110 transition
          "
        >
          <FaPhoneAlt size={18} className="text-white sm:text-[22px]" />
        </a>
      </div>
    </div>
  );
}