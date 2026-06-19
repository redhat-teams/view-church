import { useEffect, useState, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";

/**
 * À placer à la racine de PublicLayout, autour de <Outlet />.
 * Affiche PageLoader pendant 5 secondes à chaque changement de route,
 * puis révèle le contenu de la page.
 *
 * Usage dans PublicLayout.jsx :
 *
 *   import RouteLoader from "../components/RouteLoader";
 *
 *   export default function PublicLayout() {
 *     return (
 *       <>
 *         <Header />
 *         <RouteLoader />
 *         <Footer />
 *       </>
 *     );
 *   }
 */
export default function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    const timer = setTimeout(() => {
      setLoading(false);
      isFirstLoad.current = false;
    }, 4000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>{loading && <PageLoader key={location.pathname} />}</AnimatePresence>

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {!loading && <Outlet />}
      </div>
    </>
  );
}