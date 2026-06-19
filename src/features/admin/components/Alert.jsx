import { CheckCircle2, AlertCircle, X } from "lucide-react";

const styles = {
  success: "bg-green-50 text-green-700 border-green-100",
  error: "bg-red-50 text-red-700 border-red-100",
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
};

export default function Alert({ type = "error", message, onClose }) {
  if (!message) return null;
  const Icon = icons[type] || AlertCircle;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-2xl border text-sm mb-4 ${styles[type] || styles.error}`}
    >
      <Icon size={18} className="shrink-0 mt-0.5" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onClose && (
        <button onClick={onClose} className="shrink-0">
          <X size={16} />
        </button>
      )}
    </div>
  );
}

/**
 * Extrait un message d'erreur lisible depuis une erreur axios.
 */
export function getErrorMessage(error, fallback = "Une erreur est survenue. Veuillez réessayer.") {
  if (!error) return fallback;
  const data = error?.response?.data;
  if (!data) return error?.message || fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  // Erreurs de validation DRF : { champ: ["message"] }
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    const msg = Array.isArray(val) ? val[0] : val;
    return `${firstKey}: ${msg}`;
  }
  return fallback;
}
