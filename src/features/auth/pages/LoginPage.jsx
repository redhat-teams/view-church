import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2, AlertCircle } from "lucide-react";
import { login, getMe } from "../api/authApi";

/**
 * LoginPage complète :
 *  - Appelle le backend Django (SimpleJWT)
 *  - Stocke access_token + refresh_token + user dans localStorage
 *  - Redirige vers /admin (ou la page demandée) après succès
 */
export default function LoginPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/admin";

  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login({ email: form.email, password: form.password });

      // Stockage du token JWT
      const accessToken  = data.access  || data.access_token  || data.token;
      const refreshToken = data.refresh || data.refresh_token;

      if (!accessToken) throw new Error("Aucun token reçu du serveur.");

      localStorage.setItem("access_token",  accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);

      // Récupération du profil utilisateur (optionnel — on ignore les erreurs)
      try {
        const meRes = await getMe();
        localStorage.setItem("user", JSON.stringify(meRes.data));
      } catch {
        // Si /auth/me/ n'existe pas, on stocke les infos du payload token
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      navigate(from, { replace: true });
    } catch (err) {
      const data = err?.response?.data;
      if (data?.detail)                  setError(data.detail);
      else if (data?.non_field_errors)   setError(data.non_field_errors[0]);
      else if (typeof data === "string") setError(data);
      else                               setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F4F6FB]">

      {/* ====== PANNEAU GAUCHE ====== */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-[#071F5A] text-white p-12 xl:p-16 relative overflow-hidden">

        {/* Cercles décoratifs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F0B51B]/10 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#F0B51B]/10 pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Texte central */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Espace<br />
            <span className="text-[#F0B51B]">Administration</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            Gérez les événements, les enseignements, les utilisateurs et
            les dons de l'église depuis un seul espace sécurisé.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {[
              "Tableau de bord en temps réel",
              "Gestion des événements & enseignements",
              "Suivi des dons et des membres",
            ].map((txt) => (
              <div key={txt} className="flex items-center gap-3 text-white/80">
                <span className="w-6 h-6 rounded-full bg-[#F0B51B]/20 border border-[#F0B51B]/40 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#F0B51B]" />
                </span>
                {txt}
              </div>
            ))}
          </div>
        </div>

        {/* Footer gauche */}
        <p className="relative z-10 text-white/40 text-sm">
          © {new Date().getFullYear()} — Plateforme de l'église
        </p>
      </div>

      {/* ====== PANNEAU DROIT — FORMULAIRE ====== */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">

          {/* Header mobile */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-14 mx-auto" />
            </Link>
          </div>

          <h2 className="text-3xl font-extrabold text-[#071F5A]">Connexion</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Accédez à votre espace d'administration.
          </p>

          {/* Erreur globale */}
          {error && (
            <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">

            {/* E-mail ou username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#071F5A]">
                Identifiant <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                autoComplete="username"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="email ou nom d'utilisateur"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition"
              />
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#071F5A]">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-[#071F5A] hover:bg-[#0A2D7A] text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Connexion en cours…
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Se connecter
                </>
              )}
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            <Link to="/" className="text-[#071F5A] font-semibold hover:text-[#F0B51B] transition">
              ← Retour au site public
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
