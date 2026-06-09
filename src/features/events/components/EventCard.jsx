import { Link } from "react-router-dom";

export default function EventCard() {
  return (
    <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src="/images/about/hero.jpg"
        alt="Église"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#071F5A]/75" />

      {/* Gold Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F0B51B]/45 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-white font-bold leading-tight text-4xl md:text-6xl lg:text-7xl">
          Grandir à travers la parole
          
        </h1>
          <br /><br />

        <p className="mt-8 max-w-4xl mx-auto text-white/95 text-lg md:text-2xl leading-relaxed">
          Des enseignements inspirées pour transformer votre vie au  quotidien 
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/"
            className="
              bg-[#F0B51B]
              hover:bg-[#d89f0d]
              text-white
              font-bold
              px-10
              py-5
              rounded-lg
              text-lg
              transition-all
              duration-300
              shadow-xl
              hover:scale-105
            "
          >
            Découvrez l’église
          </Link>

          <Link
            to="/contact"
            className="
              bg-[#071F5A]
              hover:bg-[#0b2d7e]
              text-[#F0B51B]
              font-bold
              px-10
              py-5
              rounded-lg
              text-lg
              transition-all
              duration-300
              shadow-xl
              hover:scale-105
            "
          >
            Participer à un culte
          </Link>
        </div>
      </div>
    </section>
  );
}