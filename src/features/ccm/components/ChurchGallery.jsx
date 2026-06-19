import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export default function ChurchGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  const categories = [
    "Tous",
    "Cultes",
    "Événements",
    "Jeunesse",
    "Conférences",
    "Baptêmes",
  ];

  const gallery = [
    { image: "/oratrice.jpg", category: "Cultes" },
    { image: "/images/gallery/gallery2.jpg", category: "Événements" },
    { image: "/images/gallery/gallery3.jpg", category: "Jeunesse" },
    { image: "/images/gallery/gallery4.jpg", category: "Conférences" },
    { image: "/images/gallery/gallery5.jpg", category: "Baptêmes" },
    { image: "/images/gallery/gallery6.jpg", category: "Cultes" },
    { image: "/images/gallery/gallery7.jpg", category: "Jeunesse" },
    { image: "/images/gallery/gallery8.jpg", category: "Événements" },
    { image: "/images/gallery/gallery9.jpg", category: "Cultes" },
    { image: "/images/gallery/gallery10.jpg", category: "Conférences" },
    { image: "/images/gallery/gallery11.jpg", category: "Jeunesse" },
    { image: "/images/gallery/gallery12.jpg", category: "Baptêmes" },
  ];

  // Simulate progressive loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleItems(8);
  }, [selectedCategory]);

  const categoryFiltered = useMemo(() => {
    return selectedCategory === "Tous"
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const filteredImages = categoryFiltered.slice(0, visibleItems);

  const currentIndex = gallery.findIndex((item) => item.image === selectedImage);

  const nextImage = () => {
    const next = (currentIndex + 1) % gallery.length;
    setSelectedImage(gallery[next].image);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[prev].image);
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImage, currentIndex]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const SkeletonCard = ({ tall }) => (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-200 ${
        tall ? "h-[280px] sm:h-[340px]" : "h-[200px] sm:h-[260px]"
      }`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );

  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,transparent_60%)]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-0 h-[420px] w-[420px] sm:h-[700px] sm:w-[700px] -translate-x-1/2"
        >
          <div className="absolute left-1/2 top-12 sm:top-20 h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[90px] sm:blur-[140px]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 text-center">
          <span className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-yellow-400">
            Galerie CCM
          </span>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
            Revivez nos
            <span className="block text-yellow-400">moments forts</span>
          </h1>

          <p className="mx-auto mt-5 sm:mt-8 max-w-2xl text-base sm:text-lg text-slate-400 px-2">
            Découvrez les événements, cultes, baptêmes et moments marquants de
            notre communauté.
          </p>
        </div>
      </section>

      {/* FILTRES — scrollable on mobile, wraps on desktop */}
      <section className="py-8 sm:py-14 sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 snap-start rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#071F5A] text-white shadow-xl"
                    : "bg-white border border-slate-200 hover:border-[#071F5A]/20 hover:shadow-lg"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="columns-1 xs:columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6"
            >
              {loading
                ? [...Array(8)].map((_, index) => (
                    <div key={index} className="mb-4 sm:mb-6 break-inside-avoid">
                      <SkeletonCard tall={index % 3 === 0} />
                    </div>
                  ))
                : filteredImages.map((item, index) => (
                    <motion.div
                      key={item.image + index}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (index % 8) * 0.04 }}
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedImage(item.image)}
                      className="group relative mb-4 sm:mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl sm:rounded-[32px] bg-white shadow-[0_10px_30px_rgba(0,0,0,.06)] sm:shadow-[0_20px_60px_rgba(0,0,0,.08)]"
                    >
                      <img
                        src={item.image}
                        alt={item.category}
                        loading="lazy"
                        className="w-full object-cover transition-all duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                      <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 translate-y-0 sm:translate-y-6 opacity-100 sm:opacity-0 transition-all duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <span className="rounded-full bg-white/15 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white backdrop-blur-xl">
                          {item.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
            </motion.div>
          </AnimatePresence>

          {!loading && filteredImages.length < categoryFiltered.length && (
            <div className="mt-12 sm:mt-16 flex justify-center">
              <button
                onClick={() => setVisibleItems((prev) => prev + 8)}
                className="rounded-2xl bg-[#071F5A] px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
              >
                Charger plus
              </button>
            </div>
          )}

          {!loading && filteredImages.length === 0 && (
            <p className="text-center text-slate-500 py-16">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* VIDEOS PLACEHOLDER */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-yellow-500 font-medium text-sm sm:text-base">
              MÉDIAS
            </span>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
              Messages & Vidéos
            </h2>
          </div>

          <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#071F5A] via-[#0d2b7c] to-[#153c9d] p-7 sm:p-10 min-h-[220px] sm:min-h-[280px]"
              >
                <div className="absolute right-0 top-0 h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-yellow-400/10 blur-[80px] sm:blur-[100px]" />

                <div className="relative z-10">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                    <ImageIcon className="text-white" size={22} />
                  </div>

                  <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-bold text-white">
                    Message inspirant
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/70">
                    Ajoutez ici vos vidéos YouTube, Facebook ou Vimeo.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-2xl px-3 sm:px-0"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Fermer"
              className="absolute right-4 top-4 sm:right-8 sm:top-8 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl active:scale-95 transition-transform"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Image précédente"
              className="absolute left-2 sm:left-8 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.img
              src={selectedImage}
              alt=""
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-[85vw] sm:max-h-[90vh] sm:max-w-[90vw] rounded-2xl sm:rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,.5)] object-contain"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Image suivante"
              className="absolute right-2 sm:right-8 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl active:scale-95 transition-transform"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}