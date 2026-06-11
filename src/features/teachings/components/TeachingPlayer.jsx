import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CalendarDays,
  Clock3,
  Play,
  Pause,
  Headphones,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────
function parseDur(str) {
  const [m, s] = str.split(":").map(Number);
  return m * 60 + s;
}
function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

// ── data ─────────────────────────────────────────────────────────────────────
const messages = [
  {
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    title: "La puissance de la foi qui déplace les montagnes",
    date: "5 Mars 2026",
    duration: "45:30",
    author: "Evg. Pascal Huiler",
    type: "Vidéo",
    tag: "Foi",
  },
  {
    image: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?w=800&q=80",
    title: "Marcher dans la grâce de Dieu chaque jour",
    date: "12 Mars 2026",
    duration: "38:15",
    author: "Pasteur Claude Ope",
    type: "Audio",
    tag: "Grâce",
  },
  {
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80",
    title: "Vivre une vie de prière efficace et constante",
    date: "20 Mars 2026",
    duration: "52:10",
    author: "Pasteur Claude Ope",
    type: "Vidéo",
    tag: "Prière",
  },
  {
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
    title: "L'espérance qui transforme le cœur de l'homme",
    date: "28 Mars 2026",
    duration: "41:05",
    author: "Evg. Pascal Huiler",
    type: "Audio",
    tag: "Espérance",
  },
  {
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80",
    title: "La parole de Dieu : lumière sur mon chemin",
    date: "4 Avril 2026",
    duration: "49:00",
    author: "Pasteur Claude Ope",
    type: "Vidéo",
    tag: "Parole",
  },
  {
    image: "https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?w=800&q=80",
    title: "Trouver la paix dans les tempêtes de la vie",
    date: "11 Avril 2026",
    duration: "36:45",
    author: "Evg. Pascal Huiler",
    type: "Audio",
    tag: "Paix",
  },
];

// ── AudioPlayer ───────────────────────────────────────────────────────────────
function AudioPlayer({ message }) {
  const total = parseDur(message.duration);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const speeds = [1, 1.25, 1.5, 2, 0.75];
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const togglePlay = () => {
    if (!playing) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => {
          if (prev >= total) {
            clearInterval(timerRef.current);
            setPlaying(false);
            return prev;
          }
          return prev + speeds[speedIdx];
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    setPlaying((p) => !p);
  };

  const seek = (val) => {
    setCurrent(Number(val));
  };

  const skip = (delta) => {
    setCurrent((p) => Math.min(total, Math.max(0, p + delta)));
  };

  const cycleSpeed = () => {
    if (playing) {
      clearInterval(timerRef.current);
      setPlaying(false);
    }
    setSpeedIdx((i) => (i + 1) % speeds.length);
  };

  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="bg-[#F4F6FB] rounded-2xl p-4">
      {/* mini header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={message.image}
          alt=""
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-[#071F5A] leading-snug line-clamp-1">
            {message.title}
          </p>
          <p className="text-xs text-gray-500">{message.author}</p>
        </div>
      </div>

      {/* progress */}
      <div className="mb-3">
        <input
          type="range"
          min={0}
          max={total}
          step={1}
          value={current}
          onChange={(e) => seek(e.target.value)}
          className="w-full h-1.5 accent-[#071F5A] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{fmtTime(current)}</span>
          <span>{message.duration}</span>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-5 mb-4">
        <button
          onClick={() => skip(-15)}
          className="text-[#071F5A] hover:opacity-70 transition-opacity"
          aria-label="Reculer 15 secondes"
        >
          <SkipBack size={22} />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#071F5A] flex items-center justify-center text-white hover:bg-[#0a2d7a] transition-colors"
          aria-label={playing ? "Pause" : "Lire"}
        >
          {playing ? (
            <Pause size={20} fill="white" />
          ) : (
            <Play size={20} fill="white" className="ml-0.5" />
          )}
        </button>
        <button
          onClick={() => skip(15)}
          className="text-[#071F5A] hover:opacity-70 transition-opacity"
          aria-label="Avancer 15 secondes"
        >
          <SkipForward size={22} />
        </button>
      </div>

      {/* volume + speed */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMuted((m) => !m)}
          className="text-[#071F5A] hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label={muted ? "Activer le son" : "Couper le son"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            if (muted) setMuted(false);
          }}
          className="flex-1 h-1 accent-[#071F5A] cursor-pointer"
          aria-label="Volume"
        />
        <button
          onClick={cycleSpeed}
          className="text-xs font-bold text-[#071F5A] bg-[#071F5A]/10 px-2.5 py-1 rounded-lg hover:bg-[#071F5A]/20 transition-colors flex-shrink-0"
          aria-label="Vitesse de lecture"
        >
          {speeds[speedIdx]}×
        </button>
      </div>
    </div>
  );
}

// ── VideoPlayer ───────────────────────────────────────────────────────────────
function VideoPlayer({ message }) {
  const total = parseDur(message.duration);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const speeds = [1, 1.25, 1.5, 2];
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const togglePlay = () => {
    if (!playing) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => {
          if (prev >= total) {
            clearInterval(timerRef.current);
            setPlaying(false);
            return prev;
          }
          return prev + speeds[speedIdx];
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0a1540]">
      {/* placeholder screen */}
      <div className="relative h-[200px] flex items-center justify-center bg-[#071F5A]/90">
        <img
          src={message.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          <Play size={48} className="text-[#E6B012] mx-auto mb-2" />
          <p className="text-white/70 text-sm">Aperçu · {message.duration}</p>
          <p className="text-white/40 text-xs mt-1">
            Connectez votre source vidéo pour la lecture réelle
          </p>
        </div>
      </div>

      {/* controls bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0a1540]">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-[#E6B012] flex items-center justify-center flex-shrink-0"
          aria-label={playing ? "Pause" : "Lire"}
        >
          {playing ? (
            <Pause size={14} fill="#071F5A" className="text-[#071F5A]" />
          ) : (
            <Play size={14} fill="#071F5A" className="text-[#071F5A] ml-0.5" />
          )}
        </button>

        <input
          type="range"
          min={0}
          max={total}
          step={1}
          value={current}
          onChange={(e) => setCurrent(Number(e.target.value))}
          className="flex-1 h-1 accent-[#E6B012] cursor-pointer"
          aria-label="Progression"
        />

        <span className="text-white/60 text-xs whitespace-nowrap">
          {fmtTime(current)} / {message.duration}
        </span>

        <button
          onClick={() => setMuted((m) => !m)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={muted ? "Activer le son" : "Couper le son"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          onClick={() =>
            setSpeedIdx((i) => (i + 1) % speeds.length)
          }
          className="text-[#E6B012] text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Vitesse"
        >
          {speeds[speedIdx]}×
        </button>
      </div>
    </div>
  );
}

// ── PlayerModal ───────────────────────────────────────────────────────────────
function PlayerModal({ message, onClose }) {
  const isVideo = message.type === "Vidéo";

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Lecteur : ${message.title}`}
    >
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* header image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={message.image}
            alt=""
            className="w-full h-full object-cover brightness-50"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span
              className={`flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-full ${
                isVideo
                  ? "bg-[#071F5A]/80 text-white"
                  : "bg-[#E6B012]/90 text-[#071F5A]"
              }`}
            >
              {isVideo ? (
                <Play size={11} fill="currentColor" />
              ) : (
                <Headphones size={11} />
              )}
              {message.type}
            </span>
            <span className="text-xs font-semibold bg-white/20 text-white border border-white/30 px-3 py-1.5 rounded-full">
              {message.tag}
            </span>
          </div>
        </div>

        {/* body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <CalendarDays size={12} className="text-[#E6B012]" />
            {message.date}
            <span className="mx-1">·</span>
            <Clock3 size={12} className="text-[#E6B012]" />
            {message.duration}
          </div>
          <h2 className="text-lg font-bold text-[#071F5A] leading-snug mb-1">
            {message.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{message.author}</p>

          {isVideo ? (
            <VideoPlayer message={message} />
          ) : (
            <AudioPlayer message={message} />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TeachingPlayer() {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedType, setSelectedType] = useState("Tous");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);

  const filteredMessages = messages.filter((message) => {
    const matchSearch =
      message.title.toLowerCase().includes(search.toLowerCase()) ||
      message.author.toLowerCase().includes(search.toLowerCase());
    const matchType =
      selectedType === "Tous" || message.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <section className="bg-[#F4F6FB] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── INTRO ── */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#E6B012] bg-[#E6B012]/10 px-4 py-2 rounded-full mb-6">
            Bibliothèque spirituelle
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071F5A] leading-tight">
            Messages &amp; Enseignements
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Découvrez des messages puissants, ancrés dans la Parole de Dieu,
            pour accompagner votre croissance spirituelle et renforcer votre foi.
          </p>
        </div>

        {/* ── FILTRES ── */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-14">
          {/* Recherche */}
          <div className="flex items-center gap-4 bg-white border-2 border-[#071F5A]/10 focus-within:border-[#071F5A] rounded-2xl h-14 sm:h-16 px-5 w-full sm:w-[420px] shadow-sm transition-all duration-300">
            <Search size={20} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Thème, prédicateur…"
              className="w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base placeholder:text-gray-400"
            />
          </div>

          {/* Dropdown */}
          <div className="relative w-full sm:w-[280px]">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="flex items-center justify-between bg-white border-2 border-[#071F5A]/10 focus:border-[#071F5A] rounded-2xl h-14 sm:h-16 px-5 w-full shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-[#071F5A]" />
                <span className="text-gray-600 text-sm sm:text-base">
                  {selectedType === "Tous" ? "Tous les types" : selectedType}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-[#071F5A] transition-transform duration-300 ${openFilter ? "rotate-180" : ""}`}
              />
            </button>

            {openFilter && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {["Tous", "Audio", "Vidéo"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedType(option);
                      setOpenFilter(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm hover:bg-[#071F5A]/5 transition-colors flex items-center gap-3
                      ${selectedType === option ? "text-[#071F5A] font-bold bg-[#071F5A]/5" : "text-gray-700"}`}
                  >
                    {option === "Audio" && <Headphones size={15} />}
                    {option === "Vidéo" && <Play size={15} />}
                    {option === "Tous" && <Filter size={15} />}
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── COMPTEUR ── */}
        {filteredMessages.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-5">
            {filteredMessages.length} message{filteredMessages.length > 1 ? "s" : ""} trouvé{filteredMessages.length > 1 ? "s" : ""}
          </p>
        )}

        {/* ── GRILLE ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredMessages.map((message, index) => (
            <article
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveMessage(message)}
              className={`
                group relative bg-white rounded-3xl overflow-hidden
                border border-gray-100
                shadow-[0_4px_24px_rgba(7,31,90,0.06)]
                transition-all duration-500 cursor-pointer
                ${hoveredIndex === index ? "-translate-y-2 shadow-[0_20px_60px_rgba(7,31,90,0.15)]" : ""}
              `}
            >
              {/* IMAGE */}
              <div className="relative h-[220px] sm:h-[240px] overflow-hidden">
                <img
                  src={message.image}
                  alt={message.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className={`
                  absolute top-4 left-4 flex items-center gap-1.5
                  text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full backdrop-blur-sm
                  ${message.type === "Vidéo" ? "bg-[#071F5A]/80 text-white" : "bg-[#E6B012]/90 text-[#071F5A]"}
                `}>
                  {message.type === "Vidéo" ? <Play size={11} fill="currentColor" /> : <Headphones size={11} />}
                  {message.type}
                </div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                  {message.tag}
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <Clock3 size={12} />
                  {message.duration}
                </div>

                <div className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-300
                  ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
                `}>
                  <div className="w-16 h-16 rounded-full bg-[#E6B012] flex items-center justify-center shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-300">
                    <Play size={22} fill="#071F5A" className="text-[#071F5A] ml-1" />
                  </div>
                </div>
              </div>

              {/* CONTENU */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <CalendarDays size={13} className="text-[#E6B012]" />
                  {message.date}
                </div>

                <h3 className={`
                  mt-3 text-lg font-bold leading-snug transition-colors duration-300
                  ${hoveredIndex === index ? "text-[#071F5A]" : "text-gray-800"}
                `}>
                  {message.title}
                </h3>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#071F5A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {initials(message.author)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {message.author}
                    </span>
                  </div>
                  <span className={`
                    text-xs font-bold text-[#071F5A] transition-all duration-300
                    ${hoveredIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                  `}>
                    {message.type === "Vidéo" ? "Regarder" : "Écouter"} →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── AUCUN RÉSULTAT ── */}
        {filteredMessages.length === 0 && (
          <div className="text-center mt-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">Aucun message trouvé.</p>
            <p className="text-gray-400 text-sm mt-2">Essayez un autre terme ou retirez le filtre.</p>
          </div>
        )}

        {/* ── CHARGER PLUS ── */}
        <div className="flex justify-center mt-16 sm:mt-20">
          <button className="
            group flex items-center gap-3
            bg-[#071F5A] hover:bg-[#0a2d7a]
            text-white font-bold text-base
            px-8 py-4 rounded-2xl
            shadow-[0_8px_32px_rgba(7,31,90,0.25)]
            hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(7,31,90,0.3)]
            transition-all duration-300
          ">
            Charger plus de messages
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* ── PLAYER MODAL ── */}
      {activeMessage && (
        <PlayerModal
          message={activeMessage}
          onClose={() => setActiveMessage(null)}
        />
      )}
    </section>
  );
}