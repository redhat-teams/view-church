import { useState, useEffect, useRef, useCallback } from "react";
import { FaCalendarAlt, FaPlayCircle } from "react-icons/fa";

const teachings = [
  { id: 1, video: "/pfm.mp4",  title: "La puissance de la foi qui déplace les montagnes", date: "5 Mars 2026",  author: "Evg. Pascal Huilier" },
  { id: 2, video: "/cr.mp4",   title: "La puissance de la Croix de Jésus-Christ",          date: "7 Mars 2026",  author: "Evg. Pascal Huilier" },
  { id: 3, video: "/sec.mp4",  title: "Le Saint-Esprit notre consolateur",                  date: "10 Mars 2026", author: "Evg. Pascal Huilier" },
  { id: 4, video: "/mvc.mp4",  title: "Marcher dans la victoire de Christ",                 date: "12 Mars 2026", author: "Evg. Pascal Huilier" },
];

// Contexte partagé pour notifier le parent
function VideoCard({ item, onPlaying }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState("00:00");
  const [playing, setPlaying]   = useState(false);

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const s = Math.floor(videoRef.current.duration);
    setDuration(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`);
  };

  const handleMouseEnter = async () => {
    if (playing) return;
    try { await videoRef.current?.play(); } catch (_) {}
  };
  const handleMouseLeave = () => {
    if (playing) return;
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleWatch = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted    = false;
    videoRef.current.controls = true;
    setPlaying(true);
    onPlaying(true);           // ← signale au parent : slider figé
    try { await videoRef.current.play(); } catch (_) {}
  };

  const stopPlaying = () => {
    setPlaying(false);
    onPlaying(false);          // ← signale au parent : slider libre
    if (videoRef.current) {
      videoRef.current.controls    = false;
      videoRef.current.muted       = true;
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white rounded-3xl overflow-hidden border border-[#F0B51B]/20 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        <video
          ref={videoRef}
          src={item.video}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={stopPlaying}
          onPause={stopPlaying}
          className="w-full aspect-video object-cover transition-all duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <FaPlayCircle className="text-[#F0B51B] text-4xl md:text-5xl" />
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold pointer-events-none">
          {duration}
        </div>
        <div className="absolute bottom-4 left-4 text-white text-xs sm:text-sm font-medium max-w-[65%] truncate pointer-events-none">
          {item.author}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm mb-2">
          <FaCalendarAlt className="text-[#F0B51B]" />
          {item.date}
        </div>
        <h3 className="text-base sm:text-xl font-bold text-[#071F5A] leading-snug min-h-[48px] sm:min-h-[64px] mb-3 line-clamp-2">
          {item.title}
        </h3>
        <button
          onClick={handleWatch}
          className="inline-flex items-center gap-2 text-[#F0B51B] font-semibold text-sm sm:text-base transition-all duration-300 hover:gap-3"
        >
          <FaPlayCircle />
          Regarder maintenant
        </button>
      </div>
    </div>
  );
}

export default function TeachingsSection() {
  const [current, setCurrent]       = useState(0);
  const [locked, setLocked]         = useState(false); // true = vidéo en lecture
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging]     = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  const startX      = useRef(null);
  const startY      = useRef(null);
  const isHoriz     = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slides = isMobile
    ? teachings.map((t) => [t])
    : teachings.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(teachings.slice(i, i + 2));
        return acc;
      }, []);
  const TOTAL = slides.length;

  useEffect(() => { setCurrent((c) => Math.min(c, TOTAL - 1)); }, [TOTAL]);

  // Auto-play : s'arrête quand locked, reprend sinon
  useEffect(() => {
    if (locked) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % TOTAL);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, [locked, TOTAL]);

  const snap = (dx) => {
    if (!locked) {
      if (dx < -40)     setCurrent((p) => (p + 1) % TOTAL);
      else if (dx > 40) setCurrent((p) => (p - 1 + TOTAL) % TOTAL);
    }
    setDragOffset(0);
    setDragging(false);
  };

  /* ── TOUCH ── */
  const onTouchStart = (e) => {
    startX.current  = e.touches[0].clientX;
    startY.current  = e.touches[0].clientY;
    isHoriz.current = null;
  };
  const onTouchMove = (e) => {
    if (startX.current === null || locked) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (isHoriz.current === null) isHoriz.current = Math.abs(dx) > Math.abs(dy);
    if (!isHoriz.current) return;
    e.preventDefault();
    setDragging(true);
    setDragOffset(dx);
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    snap(isHoriz.current ? dx : 0);
    startX.current = null;
  };

  /* ── MOUSE ── */
  const onMouseDown = (e) => {
    if (locked) return;
    startX.current = e.clientX;
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (startX.current === null || !dragging || locked) return;
    setDragOffset(e.clientX - startX.current);
  };
  const onMouseUp = (e) => {
    if (startX.current === null) return;
    snap(e.clientX - startX.current);
    startX.current = null;
  };
  const onMouseLeave = () => {
    if (startX.current !== null) {
      setDragOffset(0); setDragging(false);
      startX.current = null;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[#071F5A] text-3xl md:text-5xl font-extrabold mb-4 md:mb-8">
            Derniers enseignements
          </h2>
          <p className="text-base md:text-xl text-gray-700">
            Nourrissez votre foi avec nos messages inspirants
          </p>
        </div>

        <div
          className={`overflow-hidden select-none ${locked ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
              transition: dragging ? "none" : "transform 0.55s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            {slides.map((slide, si) => (
              <div key={si} className="w-full flex-shrink-0">
                <div className="flex gap-6 md:gap-10">
                  {slide.map((item) => (
                    <div key={item.id} className="flex-1 min-w-0">
                      <VideoCard item={item} onPlaying={setLocked} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10 md:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!locked) setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                current === i ? "bg-[#071F5A] w-6 h-3" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}