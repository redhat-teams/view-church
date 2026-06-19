import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

const baseClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition";

export function TextField({ label, required, hint, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[#071F5A]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input className={baseClass} required={required} {...props} />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function TextAreaField({ label, required, hint, rows = 4, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[#071F5A]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea className={`${baseClass} resize-none`} rows={rows} required={required} {...props} />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function SelectField({ label, required, options = [], hint, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[#071F5A]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select className={baseClass} required={required} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

/**
 * Champ d'upload d'image avec aperçu.
 * - `value` peut être une URL existante (string) ou un File
 * - `onChange(file)` reçoit le File sélectionné
 */
export function ImageField({ label, value, onChange, hint }) {
  const [preview, setPreview] = useState(
    typeof value === "string" ? value : null
  );

  const handleFile = (file) => {
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };

  const clear = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-[#071F5A]">{label}</label>}

      {preview ? (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-200 group">
          <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 w-full h-32 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 cursor-pointer hover:border-[#F0B51B] hover:text-[#F0B51B] transition">
          <UploadCloud size={24} />
          <span className="text-xs font-medium">Cliquez pour choisir une image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
