export default function StatCard({ icon: Icon, label, value, hint, accent = "#071F5A" }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(7,31,90,0.06)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,31,90,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          <Icon size={22} />
        </div>
      </div>
      <p className="mt-5 text-3xl font-extrabold text-[#071F5A]">{value}</p>
      <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
      {hint && <p className="mt-3 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
