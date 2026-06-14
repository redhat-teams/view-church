import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

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
    {
      image: "/oratrice.jpg",
      category: "Cultes",
    },
    {
      image: "/images/gallery/gallery2.jpg",
      category: "Événements",
    },
    {
      image: "/images/gallery/gallery3.jpg",
      category: "Jeunesse",
    },
    {
      image: "/images/gallery/gallery4.jpg",
      category: "Conférences",
    },
    {
      image: "/images/gallery/gallery5.jpg",
      category: "Baptêmes",
    },
    {
      image: "/images/gallery/gallery6.jpg",
      category: "Cultes",
    },
    {
      image: "/images/gallery/gallery7.jpg",
      category: "Jeunesse",
    },
    {
      image: "/images/gallery/gallery8.jpg",
      category: "Événements",
    },
    {
      image: "/images/gallery/gallery9.jpg",
      category: "Cultes",
    },
    {
      image: "/images/gallery/gallery10.jpg",
      category: "Conférences",
    },
    {
      image: "/images/gallery/gallery11.jpg",
      category: "Jeunesse",
    },
    {
      image: "/images/gallery/gallery12.jpg",
      category: "Baptêmes",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredImages = useMemo(() => {
    const data =
      selectedCategory === "Tous"
        ? gallery
        : gallery.filter(
            (item) => item.category === selectedCategory
          );

    return data.slice(0, visibleItems);
  }, [selectedCategory, visibleItems]);

  useEffect(() => {
    setVisibleItems(8);
  }, [selectedCategory]);

  const currentIndex = gallery.findIndex(
    (item) => item.image === selectedImage
  );

  const nextImage = () => {
    const next =
      (currentIndex + 1) % gallery.length;

    setSelectedImage(gallery[next].image);
  };

  const prevImage = () => {
    const prev =
      (currentIndex - 1 + gallery.length) %
      gallery.length;

    setSelectedImage(gallery[prev].image);
  };

  const SkeletonCard = () => (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-slate-200
        h-[340px]
      "
    >
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_2s_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent
        "
      />
    </div>
  );

  return (
    <main className="bg-slate-50 min-h-screen overflow-hidden">
      {/* HERO */}

      <section className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,transparent_60%)]" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-0
            h-[700px]
            w-[700px]
            -translate-x-1/2
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-20
              h-[350px]
              w-[350px]
              -translate-x-1/2
              rounded-full
              bg-yellow-400/20
              blur-[140px]
            "
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-yellow-500/20
              bg-yellow-500/10
              px-5
              py-2
              text-sm
              font-medium
              text-yellow-400
            "
          >
            Galerie CCM
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white">
            Revivez nos
            <span className="block text-yellow-400">
              moments forts
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400">
            Découvrez les événements, cultes,
            baptêmes et moments marquants de notre
            communauté.
          </p>
        </div>
      </section>

      {/* FILTRES */}

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`
                  rounded-full
                  px-6
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${
                    selectedCategory === category
                      ? "bg-[#071F5A] text-white shadow-xl"
                      : "bg-white border border-slate-200 hover:border-[#071F5A]/20 hover:shadow-lg"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                columns-1
                md:columns-2
                xl:columns-4
                gap-6
              "
            >
              {loading ? (
                [...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="mb-6 break-inside-avoid"
                  >
                    <SkeletonCard />
                  </div>
                ))
              ) : (
                <>
                  {filteredImages.map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        layout
                        whileHover={{
                          y: -8,
                        }}
                        onClick={() =>
                          setSelectedImage(
                            item.image
                          )
                        }
                        className="
                          group
                          relative
                          mb-6
                          break-inside-avoid
                          cursor-pointer
                          overflow-hidden
                          rounded-[32px]
                          bg-white
                          shadow-[0_20px_60px_rgba(0,0,0,.08)]
                        "
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="
                            w-full
                            object-cover
                            transition-all
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/10
                            to-transparent
                            opacity-0
                            transition-all
                            duration-500
                            group-hover:opacity-100
                          "
                        />

                        <div
                          className="
                            absolute
                            bottom-5
                            left-5
                            translate-y-6
                            opacity-0
                            transition-all
                            duration-500
                            group-hover:translate-y-0
                            group-hover:opacity-100
                          "
                        >
                          <span
                            className="
                              rounded-full
                              bg-white/15
                              px-4
                              py-2
                              text-sm
                              text-white
                              backdrop-blur-xl
                            "
                          >
                            {item.category}
                          </span>
                        </div>
                      </motion.div>
                    )
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {!loading &&
            filteredImages.length <
              (selectedCategory === "Tous"
                ? gallery.length
                : gallery.filter(
                    (item) =>
                      item.category ===
                      selectedCategory
                  ).length) && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() =>
                    setVisibleItems(
                      (prev) => prev + 8
                    )
                  }
                  className="
                    rounded-2xl
                    bg-[#071F5A]
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                  "
                >
                  Charger plus
                </button>
              </div>
            )}
        </div>
      </section>

      {/* VIDEOS PLACEHOLDER */}

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-yellow-500 font-medium">
              MÉDIAS
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
              Messages & Vidéos
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  bg-gradient-to-br
                  from-[#071F5A]
                  via-[#0d2b7c]
                  to-[#153c9d]
                  p-10
                  min-h-[280px]
                "
              >
                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-48
                    w-48
                    rounded-full
                    bg-yellow-400/10
                    blur-[100px]
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/10
                      backdrop-blur-xl
                    "
                  >
                    <ImageIcon className="text-white" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-white">
                    Message inspirant
                  </h3>

                  <p className="mt-4 text-white/70">
                    Ajoutez ici vos vidéos
                    YouTube, Facebook ou Vimeo.
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              bg-black/95
              backdrop-blur-2xl
            "
          >
            <button
              onClick={() =>
                setSelectedImage(null)
              }
              className="
                absolute
                right-8
                top-8
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/10
                text-white
                backdrop-blur-xl
              "
            >
              <X />
            </button>

            <button
              onClick={prevImage}
              className="
                absolute
                left-8
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/10
                text-white
                backdrop-blur-xl
              "
            >
              <ChevronLeft />
            </button>

            <motion.img
              src={selectedImage}
              alt=""
              initial={{
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.85,
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-[32px]
                shadow-[0_30px_100px_rgba(0,0,0,.5)]
              "
            />

            <button
              onClick={nextImage}
              className="
                absolute
                right-8
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/10
                text-white
                backdrop-blur-xl
              "
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}