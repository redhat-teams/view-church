import { useEffect, useRef, useState } from "react";
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
  Loader2,
} from "lucide-react";
import api from "../../../shared/services/api";
import { formatDate } from "../../../shared/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80";

// ── helpers ──────────────────────────────────────────────────────────────────
function initials(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/**
 * Extrait l'ID YouTube depuis n'importe quel format d'URL courant
 * (watch?v=, youtu.be/, /live/, /embed/).
 */
function extractYoutubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return null;
}

/** Détermine le type d'affichage : Vidéo (YouTube) ou Audio */
function getTeachingType(teaching) {
  if (teaching.video_url && extractYoutubeId(teaching.video_url)) return "Vidéo";
  if (teaching.audio_url) return "Audio";
  return teaching.video_url ? "Vidéo" : "Audio";
}

// ── AudioPlayer ───────────────────────────────────────────────────────────────
function AudioPlayer({ teaching }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const speeds = [1, 1.25, 1.5, 2, 0.75];
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume / 100;
    audio.playbackRate = speeds[speedIdx];
  }, [volume, muted, speedIdx]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying((p) => !p);
  };

  const seek = (val) => {
    if (audioRef.current) audioRef.current.currentTime = Number(val);
    setCurrent(Number(val));
  };

  const skip = (delta) => {
    if (!audioRef.current) return;
    const next = Math.min(duration, Math.max(0, audioRef.current.currentTime + delta));
    audioRef.current.currentTime = next;
    setCurrent(next);
  };

  const fmtTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#F4F6FB] rounded-2xl p-4">
      <audio
        ref={audioRef}
        src={teaching.audio_url}
        onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration || 0)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-3 mb-4">
        <img
          src={teaching.thumbnail || FALLBACK_IMAGE}
          alt=""
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-[#071F5A] leading-snug line-clamp-1">
            {teaching.title}
          </p>
          <p className="text-xs text-gray-500">{teaching.speaker}</p>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="range" min={0} max={duration || 0} step={1} value={current}
          onChange={(e) => seek(e.target.value)}
          className="w-full h-1.5 accent-[#071F5A] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{fmtTime(current)}</span>
          <span>{fmtTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mb-4">
        <button onClick={() => skip(-15)} className="text-[#071F5A] hover:opacity-70 transition-opacity" aria-label="Reculer 15s">
          <SkipBack size={22} />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#071F5A] flex items-center justify-center text-white hover:bg-[#0a2d7a] transition-colors"
          aria-label={playing ? "Pause" : "Lire"}
        >
          {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
        </button>
        <button onClick={() => skip(15)} className="text-[#071F5A] hover:opacity-70 transition-opacity" aria-label="Avancer 15s">
          <SkipForward size={22} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setMuted((m) => !m)} className="text-[#071F5A] hover:opacity-70 transition-opacity flex-shrink-0">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range" min={0} max={100} step={1} value={muted ? 0 : volume}
          onChange={(e) => { setVolume(Number(e.target.value)); if (muted) setMuted(false); }}
          className="flex-1 h-1 accent-[#071F5A] cursor-pointer"
        />
        <button
          onClick={() => setSpeedIdx((i) => (i + 1) % speeds.length)}
          className="text-xs font-bold text-[#071F5A] bg-[#071F5A]/10 px-2.5 py-1 rounded-lg hover:bg-[#071F5A]/20 transition-colors flex-shrink-0"
        >
          {speeds[speedIdx]}×
        </button>
      </div>
    </div>
  );
}

// ── YouTubePlayer ─────────────────────────────────────────────────────────────
function YouTubePlayer({ youtubeId }) {
  return (
    <div className="rounded-2xl overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

// ── PlayerModal ───────────────────────────────────────────────────────────────
function PlayerModal({ teaching, onClose }) {
  const type = getTeachingType(teaching);
  const isVideo = type === "Vidéo";
  const youtubeId = extractYoutubeId(teaching.video_url);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header image — seulement pour audio */}
        {!isVideo && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={teaching.thumbnail || FALLBACK_IMAGE}
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
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-full bg-[#E6B012]/90 text-[#071F5A]">
                <Headphones size={11} /> {type}
              </span>
              {teaching.category && (
                <span className="text-xs font-semibold bg-white/20 text-white border border-white/30 px-3 py-1.5 rounded-full capitalize">
                  {teaching.category.replace("_", " ")}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bouton fermer pour vidéo */}
        {isVideo && (
          <div className="flex justify-end px-4 pt-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className={`p-4 sm:p-5 ${isVideo ? "pt-2" : ""}`}>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <CalendarDays size={12} className="text-[#E6B012]" />
            {formatDate(teaching.date)}
          </div>
          <h2 className="text-lg font-bold text-[#071F5A] leading-snug mb-1">{teaching.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{teaching.speaker}</p>

          {isVideo && youtubeId ? (
            <YouTubePlayer youtubeId={youtubeId} />
          ) : isVideo ? (
            <div className="rounded-2xl overflow-hidden bg-[#0a1540] flex items-center justify-center h-48">
              <p className="text-white/50 text-sm text-center px-4">Aucune vidéo YouTube associée.</p>
            </div>
          ) : teaching.audio_url ? (
            <AudioPlayer teaching={teaching} />
          ) : (
            <div className="rounded-2xl overflow-hidden bg-[#0a1540] flex items-center justify-center h-32">
              <p className="text-white/50 text-sm text-center px-4">Aucun média associé à cet enseignement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TeachingPlayer() {
  const [teachings, setTeachings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedType, setSelectedType] = useState("Tous");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let cancelled = false;

    api
      .get("/teachings/", { params: { page_size: 100 } })
      .then((res) => {
        if (cancelled) return;
        const data = res.data;
        const list = Array.isArray(data) ? data : data?.results || [];
        setTeachings(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTeachings = teachings.filter((teaching) => {
    const title = teaching.title || "";
    const speaker = teaching.speaker || "";
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      speaker.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "Tous" || getTeachingType(teaching) === selectedType;
    return matchSearch && matchType;
  });

  const visibleTeachings = filteredTeachings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachings.length;

  return (
    <section className="bg-[#F4F6FB] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── INTRO ── */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#E6B012] bg-[#E6B012]/10 px-4 py-2 rounded-full mb-6">
            Bibliothèque spirituelle
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#071F5A] leading-tight">
            Messages &amp; Enseignements
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed px-2">
            Découvrez des messages puissants, ancrés dans la Parole de Dieu,
            pour accompagner votre croissance spirituelle et renforcer votre foi.
          </p>
        </div>

        {/* ── FILTRES ── */}
        <div className="flex flex-col gap-3 mt-10 sm:mt-14 sm:flex-row sm:justify-center sm:gap-4">
          {/* Recherche */}
          <div className="flex items-center gap-3 bg-white border-2 border-[#071F5A]/10 focus-within:border-[#071F5A] rounded-2xl h-14 px-4 w-full sm:w-[420px] shadow-sm transition-all duration-300">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Thème, prédicateur…"
              className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Dropdown */}
          <div className="relative w-full sm:w-[220px]">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="flex items-center justify-between bg-white border-2 border-[#071F5A]/10 rounded-2xl h-14 px-4 w-full shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Filter size={16} className="text-[#071F5A]" />
                <span className="text-gray-600 text-sm">
                  {selectedType === "Tous" ? "Tous les types" : selectedType}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#071F5A] transition-transform duration-300 ${openFilter ? "rotate-180" : ""}`}
              />
            </button>

            {openFilter && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {["Tous", "Audio", "Vidéo"].map((option) => (
                  <button
                    key={option}
                    onClick={() => { setSelectedType(option); setOpenFilter(false); }}
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
        {!loading && filteredTeachings.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            {filteredTeachings.length} message{filteredTeachings.length > 1 ? "s" : ""} trouvé{filteredTeachings.length > 1 ? "s" : ""}
          </p>
        )}

        {/* ── CHARGEMENT ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <Loader2 size={36} className="text-[#071F5A] animate-spin" />
            <p className="text-gray-400">Chargement des enseignements...</p>
          </div>
        )}

        {/* ── ERREUR ── */}
        {!loading && error && (
          <div className="text-center mt-20">
            <p className="text-lg text-red-500">
              Impossible de charger les enseignements pour le moment.
            </p>
          </div>
        )}

        {/* ── GRILLE ── */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-12">
            {visibleTeachings.map((teaching, index) => {
              const type = getTeachingType(teaching);
              return (
                <article
                  key={teaching.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveTeaching(teaching)}
                  className={`
                    group relative bg-white rounded-3xl overflow-hidden
                    border border-gray-100
                    shadow-[0_4px_24px_rgba(7,31,90,0.06)]
                    transition-all duration-500 cursor-pointer
                    ${hoveredIndex === index ? "-translate-y-2 shadow-[0_20px_60px_rgba(7,31,90,0.15)]" : ""}
                  `}
                >
                  {/* IMAGE */}
                  <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
                    <img
                      src={teaching.thumbnail || FALLBACK_IMAGE}
                      alt={teaching.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${hoveredIndex === index ? "scale-110" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className={`
                      absolute top-4 left-4 flex items-center gap-1.5
                      text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full backdrop-blur-sm
                      ${type === "Vidéo" ? "bg-[#071F5A]/80 text-white" : "bg-[#E6B012]/90 text-[#071F5A]"}
                    `}>
                      {type === "Vidéo" ? <Play size={11} fill="currentColor" /> : <Headphones size={11} />}
                      {type}
                    </div>

                    {teaching.category && (
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 capitalize">
                        {teaching.category.replace("_", " ")}
                      </div>
                    )}

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
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <CalendarDays size={13} className="text-[#E6B012]" />
                      {formatDate(teaching.date)}
                    </div>

                    <h3 className={`
                      mt-3 text-base sm:text-lg font-bold leading-snug transition-colors duration-300 line-clamp-2
                      ${hoveredIndex === index ? "text-[#071F5A]" : "text-gray-800"}
                    `}>
                      {teaching.title}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#071F5A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {initials(teaching.speaker)}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                          {teaching.speaker}
                        </span>
                      </div>
                      <span className={`
                        text-xs font-bold text-[#071F5A] transition-all duration-300 shrink-0
                        ${hoveredIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                      `}>
                        {type === "Vidéo" ? "Regarder" : "Écouter"} →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── AUCUN RÉSULTAT ── */}
        {!loading && !error && filteredTeachings.length === 0 && (
          <div className="text-center mt-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">Aucun message trouvé.</p>
            <p className="text-gray-400 text-sm mt-2">Essayez un autre terme ou retirez le filtre.</p>
          </div>
        )}

        {/* ── CHARGER PLUS ── */}
        {!loading && hasMore && (
          <div className="flex justify-center mt-12 sm:mt-20">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="
                group flex items-center gap-3
                bg-[#071F5A] hover:bg-[#0a2d7a]
                text-white font-bold text-base
                px-8 py-4 rounded-2xl
                shadow-[0_8px_32px_rgba(7,31,90,0.25)]
                hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(7,31,90,0.3)]
                transition-all duration-300
              "
            >
              Charger plus de messages
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* ── PLAYER MODAL ── */}
      {activeTeaching && (
        <PlayerModal teaching={activeTeaching} onClose={() => setActiveTeaching(null)} />
      )}
    </section>
  );
}