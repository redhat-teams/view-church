import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ChurchGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState(null);

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
      image: "/images/gallery/gallery1.jpg",
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
  ];

  const filteredImages =
    selectedCategory === "Tous"
      ? gallery
      : gallery.filter(
          (item) => item.category === selectedCategory
        );

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

  return (
    <section className="bg-[#F8F8F8] overflow-hidden">

      {/* HERO */}

      <section className="relative bg-[#071F5A] py-28 overflow-hidden">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[1500px]
            h-[1500px]
          "
        >
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[500px]
              h-[500px]
              bg-[#E5B10E]
              opacity-30
              blur-[180px]
              rounded-full
            "
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <span className="text-[#E5B10E] font-semibold">
            GALERIE CCM
          </span>

          <h1 className="text-6xl font-bold text-white mt-6">
            Revivez nos moments forts
          </h1>

          <p className="text-white/80 text-xl mt-8 max-w-3xl mx-auto">
            Découvrez les moments marquants de la vie
            de notre communauté à travers des images
            inspirantes.
          </p>

        </div>

      </section>

      {/* FILTRES */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap justify-center gap-4">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`
                  px-8 py-4 rounded-2xl font-semibold transition-all
                  ${
                    selectedCategory === category
                      ? "bg-[#E5B10E] text-[#071F5A]"
                      : "bg-white shadow-lg"
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

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="columns-1 md:columns-2 lg:columns-4 gap-6">

            {filteredImages.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  mb-6
                  break-inside-avoid
                  cursor-pointer
                "
                onClick={() =>
                  setSelectedImage(item.image)
                }
              >
                <img
                  src={item.image}
                  alt=""
                  className="
                    rounded-[30px]
                    shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)]
                    transition-all
                    duration-500
                  "
                />
              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* VIDEOS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-[#071F5A]">
              Nos vidéos
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

            {[1, 2, 3].map((video) => (
              <div
                key={video}
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  group
                  shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                "
              >
                <img
                  src={`/images/gallery/video${video}.jpg`}
                  alt=""
                  className="
                    h-[300px]
                    w-full
                    object-cover
                    group-hover:scale-110
                    transition-all
                    duration-700
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >
                  <button
                    className="
                      w-20
                      h-20
                      rounded-full
                      bg-[#E5B10E]
                      flex
                      items-center
                      justify-center
                      shadow-2xl
                    "
                  >
                    <Play
                      fill="#071F5A"
                      className="text-[#071F5A]"
                    />
                  </button>
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
            className="
              fixed
              inset-0
              bg-black/90
              backdrop-blur-xl
              z-[999]
              flex
              items-center
              justify-center
            "
          >

            <button
              onClick={() =>
                setSelectedImage(null)
              }
              className="
                absolute
                top-8
                right-8
                text-white
              "
            >
              <X size={40} />
            </button>

            <button
              onClick={prevImage}
              className="
                absolute
                left-8
                text-white
              "
            >
              <ChevronLeft size={50} />
            </button>

            <img
              src={selectedImage}
              alt=""
              className="
                max-w-[90vw]
                max-h-[90vh]
                rounded-[30px]
              "
            />

            <button
              onClick={nextImage}
              className="
                absolute
                right-8
                text-white
              "
            >
              <ChevronRight size={50} />
            </button>

          </motion.div>
        )}

      </AnimatePresence>

      {/* LOAD MORE */}

      <div className="pb-24 flex justify-center">

        <button
          className="
            bg-[#E5B10E]
            text-[#071F5A]
            font-bold
            px-12
            py-5
            rounded-2xl
            hover:scale-105
            transition-all
          "
        >
          Charger plus
        </button>

      </div>

    </section>
  );
}