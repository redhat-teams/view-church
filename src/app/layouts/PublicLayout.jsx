import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from "../../features/home/components/Footer";
import {
  FaFacebookF, FaTwitter, FaYoutube, FaInstagram,
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt,
  FaHandHoldingHeart, FaWhatsapp,
  FaHome, FaInfoCircle, FaBookOpen, FaCalendarAlt,
  FaBars, FaTimes, FaPrayingHands, FaChurch,
} from "react-icons/fa";
import QRCode from "react-qr-code";

const navLinks = [
  { to: "/",              end: true,  icon: <FaHome />,         label: "Accueil" },
  { to: "/ccm",           end: true,  icon: <FaHome />,         label: "Ministère" },
  { to: "/apropos",       end: false, icon: <FaInfoCircle />,   label: "À propos" },
  { to: "/teachings",     end: false, icon: <FaBookOpen />,     label: "Enseignements" },
  { to: "/events",        end: false, icon: <FaCalendarAlt />,  label: "Évènements" },
  { to: "/cellule",       end: false, icon: <FaPrayingHands />, label: "Prayer win" },
  { to: "/evangelisation",end: false, icon: <FaChurch />,       label: "Evangelism" },
  { to: "/contact",       end: false, icon: <FaEnvelope />,     label: "Contact" },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [donModal, setDonModal]           = useState(false);
  const [copied, setCopied]               = useState(false);

  const copyNumber = async () => {
    await navigator.clipboard.writeText("0706836722");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openDon = () => { setDonModal(true); setMenuOpen(false); };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== TOP BAR ===== */}
      <div className="bg-[#F0B51B] text-[#071F5A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">

          {/* Mobile */}
          <div className="flex flex-col gap-1 md:hidden">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="shrink-0" />France</span>
              <span className="flex items-center gap-1 min-w-0"><FaEnvelope className="shrink-0" /><span className="truncate">contact@moministere.com</span></span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1"><FaPhoneAlt className="shrink-0" />+225 0705755230</span>
                <span>+336 74 38 61 52</span>
              </div>
              <div className="flex items-center gap-3 text-sm shrink-0">
                {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map((Icon, i) => (
                  <Icon key={i} className="cursor-pointer hover:scale-110 transition" />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex justify-between items-center text-sm">
            <div className="flex flex-wrap gap-5">
              <span className="flex items-center gap-2"><FaMapMarkerAlt />France</span>
              <span className="flex items-center gap-2"><FaEnvelope />contact@moministere.com</span>
              <span className="flex items-center gap-2"><FaPhoneAlt />+225 0705755230</span>
              <span>+336 74 38 61 52</span>
            </div>
            <div className="flex items-center gap-4 text-base">
              {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram].map((Icon, i) => (
                <Icon key={i} className="cursor-pointer hover:scale-110 transition" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <header className="bg-[#071F5A] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src="/logo.png" alt="Logo" className="h-12 md:h-16 w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-white text-sm xl:text-base">
              {navLinks.map(({ to, end, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 border-b-2 pb-0.5 transition whitespace-nowrap ${
                      isActive ? "text-[#F0B51B] border-[#F0B51B]" : "border-transparent hover:text-[#F0B51B]"
                    }`
                  }
                >
                  {icon}{label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Bouton Don desktop */}
              <button
                onClick={openDon}
                className="
                  hidden md:flex items-center gap-2
                  bg-[#F0B51B] text-[#071F5A] font-bold
                  px-4 py-2 rounded-xl
                  hover:scale-105 hover:-translate-y-0.5
                  transition-all duration-300 whitespace-nowrap text-sm
                "
              >
                <FaHandHoldingHeart />
                Faire un don
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-white text-2xl p-1"
                aria-label="Menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden bg-[#071F5A] overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-[800px] pb-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-4 text-white text-sm">
            {navLinks.map(({ to, end, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 border-b border-white/10 ${isActive ? "text-[#F0B51B]" : ""}`
                }
              >
                {icon}{label}
              </NavLink>
            ))}
            <button
              onClick={openDon}
              className="
                mt-4 flex items-center justify-center gap-2
                bg-[#F0B51B] text-[#071F5A] font-bold
                py-3 rounded-xl
              "
            >
              <FaHandHoldingHeart />Faire un don
            </button>
          </nav>
        </div>
      </header>

      {/* ===== PAGE ===== */}
      <main className="flex-1"><Outlet /></main>

      {/* ===== MODAL DON ===== */}
      {donModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setDonModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative w-full max-w-2xl
              rounded-3xl bg-white
              shadow-2xl
              flex flex-col
              max-h-[90vh]
              overflow-hidden
            "
          >
            {/* Close */}
            <button
              onClick={() => setDonModal(false)}
              className="
                absolute top-4 right-4 z-50
                w-9 h-9 rounded-full bg-gray-100
                flex items-center justify-center
                hover:bg-gray-200 transition text-lg font-bold
              "
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-6 sm:p-10">

              {/* Header */}
              <div className="text-center mb-8 pr-8">
                <h2 className="text-3xl sm:text-4xl font-black text-[#071F5A]">Faire un Don</h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Soutenez l'œuvre et participez à la propagation de l'Évangile.
                </p>
              </div>

              {selectedPayment ? (
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-50 p-5 rounded-2xl inline-block">
                      <QRCode
                        value={selectedPayment.link || `tel:${selectedPayment.number}`}
                        size={180}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#071F5A] mb-4">{selectedPayment.type}</h3>

                  <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-2xl">
                      <span className="text-xl font-bold text-[#071F5A]">{selectedPayment.number}</span>
                      <button
                        onClick={copyNumber}
                        className="px-4 py-1.5 bg-[#071F5A] text-white rounded-lg text-sm font-medium"
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
                      className="inline-block px-7 py-3 rounded-2xl bg-blue-500 text-white font-bold hover:scale-105 transition mb-4"
                    >
                      Ouvrir le lien Wave
                    </a>
                  )}

                  <div className="mt-2">
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm"
                    >
                      ← Retour
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Wave */}
                  <div className="rounded-2xl border border-gray-100 bg-blue-50 p-6 text-center hover:-translate-y-1 transition-all duration-300 shadow-sm">
                    <img src="/wave.png" alt="Wave" className="h-14 mx-auto object-contain mb-4" />
                    <h3 className="text-xl font-bold text-[#071F5A]">Wave</h3>
                    <p className="text-gray-600 text-sm mt-1 mb-5">+225 07 06 83 67 22</p>
                    <button
                      onClick={() => setSelectedPayment({
                        type: "Wave",
                        number: "0706836722",
                        link: "https://pay.wave.com/m/M_ci_rpkTnEMdLOa-/c/ci/",
                      })}
                      className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-bold hover:scale-105 transition"
                    >
                      Donner via Wave
                    </button>
                  </div>

                  {/* Orange Money */}
                  <div className="rounded-2xl border border-gray-100 bg-orange-50 p-6 text-center hover:-translate-y-1 transition-all duration-300 shadow-sm">
                    <img src="/orange.png" alt="Orange Money" className="h-14 mx-auto object-contain mb-4" />
                    <h3 className="text-xl font-bold text-[#071F5A]">Orange Money</h3>
                    <p className="text-gray-600 text-sm mt-1 mb-5">+225 07 06 83 67 22</p>
                    <button
                      onClick={() => setSelectedPayment({
                        type: "Orange Money",
                        number: "0706836722",
                        link: null,
                      })}
                      className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-bold hover:scale-105 transition"
                    >
                      Donner via Orange
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* ===== BOUTONS FLOTTANTS ===== */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/2250705755230"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition"
        >
          <FaWhatsapp size={24} className="text-green-500" />
        </a>
        <a
          href="tel:+2250705755230"
          className="w-12 h-12 rounded-full bg-red-600 shadow-xl flex items-center justify-center hover:scale-110 transition"
        >
          <FaPhoneAlt size={18} className="text-white" />
        </a>
      </div>

    </div>
  );
}