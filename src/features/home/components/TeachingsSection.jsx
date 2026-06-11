import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaPlayCircle } from "react-icons/fa";

const teachings = [
  {
    id: 1,
    video: "/pfm.mp4",
    title: "La puissance de la foi qui déplace les montagnes",
    date: "5 Mars 2026",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 2,
    video: "/cr.mp4",
    title: "La puissance de la Croix de Jésus-Christ",
    date: "7 Mars 2026",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 3,
    video: "/sec.mp4",
    title: "Le Saint-Esprit notre consolateur",
    date: "10 Mars 2026",
    author: "Evg. Pascal Huilier",
  },
  {
    id: 4,
    video: "/mvc.mp4",
    title: "Marcher dans la victoire de Christ",
    date: "12 Mars 2026",
    author: "Evg. Pascal Huilier",
  },
];

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState("00:00");

  const handleMouseEnter = async () => {
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    const totalSeconds = Math.floor(videoRef.current.duration);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    setDuration(
      `${minutes}:${seconds.toString().padStart(2, "0")}`
    );
  };

  const handleWatch = async () => {
    if (!videoRef.current) return;

    videoRef.current.controls = true;

    try {
      await videoRef.current.play();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-[#F0B51B]/20
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* VIDEO */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <video
          ref={videoRef}
          src={item.video}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="
            w-full
            aspect-video
            object-cover
            transition-all
            duration-700
            group-hover:scale-[1.02]
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            transition-opacity
            duration-300
            group-hover:opacity-0
          "
        >
          <div
            className="
              w-20
              h-20
              rounded-full
              bg-white/90
              backdrop-blur-sm
              flex
              items-center
              justify-center
              shadow-xl
            "
          >
            <FaPlayCircle className="text-[#F0B51B] text-5xl" />
          </div>
        </div>

        {/* Durée */}
        <div
          className="
            absolute
            bottom-4
            right-4
            bg-black/80
            text-white
            px-3
            py-1
            rounded-lg
            text-sm
            font-semibold
          "
        >
          {duration}
        </div>

        {/* Auteur */}
        <div
          className="
            absolute
            bottom-4
            left-4
            text-white
            text-sm
            font-medium
            max-w-[70%]
            truncate
          "
        >
          {item.author}
        </div>
      </div>

      {/* CONTENU */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <FaCalendarAlt className="text-[#F0B51B]" />
          {item.date}
        </div>

        <h3
          className="
            text-xl
            font-bold
            text-[#071F5A]
            leading-snug
            min-h-[64px]
            mb-4
            line-clamp-2
          "
        >
          {item.title}
        </h3>

        <button
          onClick={handleWatch}
          className="
            inline-flex
            items-center
            gap-2
            text-[#F0B51B]
            font-semibold
            transition-all
            duration-300
            hover:gap-3
          "
        >
          <FaPlayCircle />
          Regarder maintenant
        </button>
      </div>
    </div>
  );
}

export default function TeachingsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const slides = [];

  for (let i = 0; i < teachings.length; i += 2) {
    slides.push(teachings.slice(i, i + 2));
  }

  const handleStart = (e) => {
    setDragging(true);

    setStartX(
      e.touches
        ? e.touches[0].clientX
        : e.clientX
    );
  };

  const handleEnd = (e) => {
    if (!dragging) return;

    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX - endX;

    if (diff > 50) {
      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );
    }

    if (diff < -50) {
      setCurrentSlide((prev) =>
        prev === 0
          ? slides.length - 1
          : prev - 1
      );
    }

    setDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-24 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}
        <div className="text-center mb-20">
          <h2 className="text-[#071F5A] text-4xl md:text-5xl font-extrabold mb-8">
            Derniers enseignements
          </h2>

          <p className="text-xl text-gray-700">
            Nourrissez votre foi avec nos messages inspirants
          </p>
        </div>

        {/* CARROUSEL */}
        <div
          className="
            overflow-hidden
            cursor-grab
            active:cursor-grabbing
            select-none
          "
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(-${
                currentSlide * 100
              }%, 0, 0)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                <div className="grid lg:grid-cols-2 gap-10">
                  {slide.map((item) => (
                    <VideoCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  currentSlide === index
                    ? "bg-[#0B63CE] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}