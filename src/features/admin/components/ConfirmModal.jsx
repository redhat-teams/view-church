import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Confirmer l'action",
  message,
  confirmLabel = "Supprimer",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative animate-[modal_0.25s_ease-out]">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <X size={16} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle size={26} />
        </div>

        <h3 className="text-xl font-bold text-[#071F5A]">{title}</h3>
        {message && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{message}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Suppression..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
