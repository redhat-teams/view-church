import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Smartphone,
  X,
} from "lucide-react";
import { createDonation, initCinetpayCheckout } from "../api/donationsApi";

// ─── Méthodes de paiement ──────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "wave",
    label: "Wave",
    currency: "FCFA",
    color: "#1B9CE3",
    textColor: "#fff",
    logo: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect width="40" height="40" rx="10" fill="#1B9CE3" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">W</text>
      </svg>
    ),
    hint: "Paiement instantané via Wave CI",
  },
  {
    id: "orange_money",
    label: "Orange Money",
    currency: "FCFA",
    color: "#FF7900",
    textColor: "#fff",
    logo: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect width="40" height="40" rx="10" fill="#FF7900" />
        <circle cx="20" cy="20" r="10" fill="white" />
        <circle cx="20" cy="20" r="6" fill="#FF7900" />
      </svg>
    ),
    hint: "Mobile money Orange CI",
  },
  {
    id: "moov",
    label: "Moov Money",
    currency: "FCFA",
    color: "#00AEEF",
    textColor: "#fff",
    logo: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect width="40" height="40" rx="10" fill="#00AEEF" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">M</text>
      </svg>
    ),
    hint: "Mobile money Moov Africa",
  },
  {
    id: "visa",
    label: "Carte Visa",
    currency: "FCFA",
    color: "#1A1F71",
    textColor: "#fff",
    logo: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect width="40" height="40" rx="10" fill="#1A1F71" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VISA</text>
      </svg>
    ),
    hint: "Carte bancaire Visa / Mastercard",
  },
  {
    id: "google_pay",
    label: "Google Pay",
    currency: "FCFA",
    color: "#fff",
    textColor: "#3c4043",
    border: "1px solid #dadce0",
    logo: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <rect width="40" height="40" rx="10" fill="white" stroke="#dadce0" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#4285F4" fontSize="8" fontWeight="bold">GPay</text>
      </svg>
    ),
    hint: "Google Wallet",
  },
];

const PRESET_AMOUNTS = [1000, 2000, 5000, 10000, 25000, 50000];

// ─── Étape 1 : Montant + méthode ──────────────────────────────────────────
function StepAmount({ form, setForm, onNext }) {
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.amount || Number(form.amount) < 100) {
      setError("Le montant minimum est de 100 FCFA.");
      return false;
    }
    if (!form.method) {
      setError("Veuillez choisir un moyen de paiement.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* Montants prédéfinis */}
      <p className="text-sm font-semibold text-[#071F5A] mb-3">Choisir un montant</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => setForm((f) => ({ ...f, amount: String(amt) }))}
            className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border ${
              form.amount === String(amt)
                ? "bg-[#071F5A] text-white border-[#071F5A] shadow-lg"
                : "bg-white text-[#071F5A] border-gray-200 hover:border-[#071F5A]"
            }`}
          >
            {amt.toLocaleString("fr-FR")} <span className="text-xs font-normal">FCFA</span>
          </button>
        ))}
      </div>

      {/* Montant personnalisé */}
      <div className="relative mb-6">
        <input
          type="number"
          min="100"
          placeholder="Autre montant..."
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 pr-20 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
          FCFA
        </span>
      </div>

      {/* Méthodes de paiement */}
      <p className="text-sm font-semibold text-[#071F5A] mb-3">Moyen de paiement</p>
      <div className="flex flex-col gap-2 mb-6">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setForm((f) => ({ ...f, method: method.id }))}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all duration-200 ${
              form.method === method.id
                ? "border-[#071F5A] bg-[#071F5A]/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {method.logo}
            <div className="text-left flex-1">
              <p className="font-semibold text-sm text-[#071F5A]">{method.label}</p>
              <p className="text-xs text-gray-500">{method.hint}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              form.method === method.id ? "border-[#071F5A]" : "border-gray-300"
            }`}>
              {form.method === method.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#071F5A]" />
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 px-4 py-3 rounded-xl">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={() => validate() && onNext()}
        className="w-full bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg"
      >
        Continuer
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}

// ─── Étape 2 : Informations du donateur ──────────────────────────────────
function StepInfo({ form, setForm, onBack, onSubmit, loading }) {
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.donor_name.trim()) {
      setError("Veuillez renseigner votre nom.");
      return false;
    }
    setError("");
    return true;
  };

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === form.method);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* Résumé */}
      <div className="bg-[#071F5A]/5 rounded-2xl p-4 mb-6 flex items-center gap-4">
        {selectedMethod?.logo}
        <div>
          <p className="text-xs text-gray-500">Votre don via {selectedMethod?.label}</p>
          <p className="text-2xl font-extrabold text-[#071F5A]">
            {Number(form.amount).toLocaleString("fr-FR")} FCFA
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#071F5A] mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Votre nom et prénom"
            value={form.donor_name}
            onChange={(e) => setForm((f) => ({ ...f, donor_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#071F5A] mb-1.5">
            Téléphone <span className="text-gray-400 text-xs">(facultatif)</span>
          </label>
          <input
            type="tel"
            placeholder="+225 07 00 00 00 00"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#071F5A] mb-1.5">
            E-mail <span className="text-gray-400 text-xs">(facultatif)</span>
          </label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#071F5A] mb-1.5">
            Message <span className="text-gray-400 text-xs">(facultatif)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Un message d'encouragement..."
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] transition resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 px-4 py-3 rounded-xl">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} /> Retour
        </button>
        <button
          type="button"
          onClick={() => validate() && onSubmit()}
          disabled={loading}
          className="flex-1 bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Traitement...</>
          ) : (
            <><Heart size={18} fill="currentColor" /> Valider le don</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Étape 3 : Succès ─────────────────────────────────────────────────────
function StepSuccess({ amount, method, onReset }) {
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="text-center py-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-2xl font-extrabold text-[#071F5A] mb-2">
        Merci pour votre don ! 🙏
      </h3>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-bold text-[#071F5A]">
          {Number(amount).toLocaleString("fr-FR")} FCFA
        </span>{" "}
        via {selectedMethod?.label}
      </p>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
        Votre générosité contribue à l'avancement du Royaume de Dieu. Que Dieu
        bénisse votre offrande.
      </p>
      <button
        onClick={onReset}
        className="bg-[#071F5A] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#0A2D7A] transition-all duration-300 hover:scale-105"
      >
        Faire un autre don
      </button>
    </motion.div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────
const emptyForm = {
  amount: "",
  method: "",
  donor_name: "",
  phone: "",
  email: "",
  message: "",
};

export default function DonationsPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const reset = () => {
    setForm(emptyForm);
    setStep(1);
    setGlobalError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGlobalError(null);
    try {
      // 1. Enregistrement du don dans notre base de données
      await createDonation({
        donor_name: form.donor_name,
        email: form.email || "",
        phone: form.phone || "",
        amount: Number(form.amount),
        currency: "FCFA",
        payment_method: form.method,
        message: form.message || "",
        status: "pending",
      });

      // 2. Initiation du paiement CinetPay (redirige vers la page de paiement CinetPay)
      const { data } = await initCinetpayCheckout({
        amount: Number(form.amount),
        email: form.email || "don@eglise.ci",
        description: `Don de ${form.donor_name} — ${form.method}`,
      });

      // 3. CinetPay renvoie une payment_url → on redirige l'utilisateur
      if (data?.data?.payment_url) {
        window.location.href = data.data.payment_url;
        return; // on ne va pas à l'étape succès ici, CinetPay gère la confirmation
      }

      // Si CinetPay n'est pas encore configuré (CINETPAY_API_KEY vide),
      // on passe quand même en mode succès pour que le flux soit visible.
      setStep(3);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Une erreur est survenue. Veuillez réessayer.";
      setGlobalError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FC] via-white to-[#F4F6FB] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── HERO ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#F0B51B]/15 text-[#d89f0d] px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-5">
            Offrande & Dîme
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#071F5A] leading-tight">
            Soutenez notre mission
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Votre générosité permet de répandre l'évangile, former des disciples
            et transformer des vies. Chaque don compte dans l'avancement du
            Royaume de Dieu.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">

          {/* ── FORMULAIRE ── */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div
              className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(7,31,90,0.1)] border border-gray-100 p-6 sm:p-8"
            >
              {/* Barre de progression */}
              {step < 3 && (
                <div className="flex gap-2 mb-7">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className="flex-1 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        background:
                          step >= n ? "#071F5A" : "rgba(7,31,90,0.1)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Titre étape */}
              {step < 3 && (
                <div className="mb-6">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Étape {step} / 2
                  </p>
                  <h2 className="text-xl font-extrabold text-[#071F5A] mt-1">
                    {step === 1 ? "Montant & paiement" : "Vos informations"}
                  </h2>
                </div>
              )}

              {globalError && (
                <div className="flex items-start gap-2 text-red-600 text-sm mb-5 bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{globalError}</p>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepAmount
                    form={form}
                    setForm={setForm}
                    onNext={() => setStep(2)}
                  />
                )}
                {step === 2 && (
                  <StepInfo
                    form={form}
                    setForm={setForm}
                    onBack={() => setStep(1)}
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                )}
                {step === 3 && (
                  <StepSuccess
                    amount={form.amount}
                    method={form.method}
                    onReset={reset}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Logos des méthodes */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {PAYMENT_METHODS.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-xs font-semibold text-gray-600"
                >
                  {m.logo}
                  {m.label}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              Paiements sécurisés via CinetPay 🔒
            </p>
          </div>

          {/* ── POURQUOI DONNER ── */}
          <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-5">
            {[
              {
                emoji: "📖",
                title: "Enseignement & Formation",
                desc: "Financez la production de contenus spirituels et la formation des disciples.",
              },
              {
                emoji: "🌍",
                title: "Missions & Évangélisation",
                desc: "Soutenez l'évangélisation, les croisades et l'expansion du Royaume.",
              },
              {
                emoji: "🤝",
                title: "Actions Sociales",
                desc: "Participez à l'aide aux familles vulnérables et aux personnes dans le besoin.",
              },
              {
                emoji: "⛪",
                title: "Infrastructure",
                desc: "Contribuez à la construction et l'entretien des lieux de culte.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6 flex items-start gap-4 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,31,90,0.1)] transition-all duration-300"
              >
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#071F5A] text-base">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Verset */}
            <div className="bg-[#071F5A] text-white rounded-3xl p-6">
              <p className="text-lg font-bold leading-snug mb-2">
                « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte »
              </p>
              <p className="text-[#F0B51B] text-sm font-semibold">
                — 2 Corinthiens 9:7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
