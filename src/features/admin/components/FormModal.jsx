import { X } from "lucide-react";

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export default function FormModal({
  open,
  title,
  description,
  onClose,
  onSubmit,
  loading = false,
  submitLabel = "Enregistrer",
  size = "md",
  children,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        className={`bg-white rounded-3xl shadow-2xl w-full ${sizes[size] || sizes.md} max-h-[90vh] flex flex-col overflow-hidden animate-[modal_0.25s_ease-out]`}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-[#071F5A]">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {children}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-[#071F5A] text-white font-semibold hover:bg-[#0A2D7A] transition disabled:opacity-60"
          >
            {loading ? "Enregistrement..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
