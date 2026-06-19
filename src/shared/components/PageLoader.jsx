import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Écran de chargement plein écran, affiché à chaque navigation.
 * Look "rêveur" : fond nuit étoilée, halo doré pulsant, croix qui
 * se dessine, particules flottantes, barre de progression sur 4s.
 */
export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000;
    const start = performance.now();

    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  // Étoiles générées une seule fois
  const stars = useMemoStars();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Fond radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e3a8a_0%,transparent_65%)]" />

      {/* Halo doré pulsant */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] rounded-full bg-yellow-400/20 blur-[90px] sm:blur-[130px]"
      />

      {/* Anneau orbital lent */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute h-[260px] w-[260px] sm:h-[380px] sm:w-[380px] rounded-full border border-yellow-400/10"
      >
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-400 shadow-[0_0_20px_4px_rgba(250,204,21,0.6)]" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full border border-white/5"
      >
        <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-white/60 shadow-[0_0_14px_3px_rgba(255,255,255,0.4)]" />
      </motion.div>

      {/* Étoiles flottantes */}
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.1, s.peak, 0.1] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Contenu central */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Croix tracée */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="mb-7 sm:mb-8"
        >
          <motion.path
            d="M28 6 V50 M10 22 H46"
            stroke="#facc15"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </svg>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs sm:text-sm font-medium tracking-[0.3em] text-yellow-400 uppercase"
        >
          CCM
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-3 text-2xl sm:text-4xl font-bold text-white leading-tight"
        >
          Un instant
          <span className="block text-yellow-400">de communion</span>
        </motion.h1>

        {/* Barre de progression */}
        <div className="mt-9 sm:mt-10 h-[3px] w-52 sm:w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-xs sm:text-sm text-slate-400"
        >
          Préparation de votre page…
        </motion.p>
      </div>
    </motion.div>
  );
}

// Petites étoiles flottantes, mémorisées pour ne pas se régénérer à chaque render
function useMemoStars() {
  const [stars] = useState(() =>
    Array.from({ length: 26 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      peak: Math.random() * 0.5 + 0.4,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }))
  );
  return stars;
}