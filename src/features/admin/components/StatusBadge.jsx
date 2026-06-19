const presets = {
  // Statuts génériques
  active: { label: "Actif", cls: "bg-green-100 text-green-700" },
  inactive: { label: "Inactif", cls: "bg-gray-100 text-gray-600" },

  // Rôles utilisateurs
  admin: { label: "Administrateur", cls: "bg-[#071F5A]/10 text-[#071F5A]" },
  staff: { label: "Staff", cls: "bg-[#F0B51B]/20 text-[#9a6c00]" },
  member: { label: "Membre", cls: "bg-blue-100 text-blue-700" },

  // Statuts de dons
  pending: { label: "En attente", cls: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Validé", cls: "bg-green-100 text-green-700" },
  success: { label: "Validé", cls: "bg-green-100 text-green-700" },
  failed: { label: "Échoué", cls: "bg-red-100 text-red-700" },
  refunded: { label: "Remboursé", cls: "bg-purple-100 text-purple-700" },
};

export default function StatusBadge({ status, label }) {
  const key = (status || "").toString().toLowerCase();
  const preset = presets[key] || {
    label: label || status || "—",
    cls: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${preset.cls}`}
    >
      {label || preset.label}
    </span>
  );
}
