import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange, count }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, start + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-4">
      {typeof count === "number" && (
        <p className="text-sm text-gray-500">
          {count} résultat{count > 1 ? "s" : ""} · page {page} / {totalPages}
        </p>
      )}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-[#071F5A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          <ChevronLeft size={16} />
        </button>

        {start > 1 && (
          <span className="px-2 text-gray-400 text-sm">…</span>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition ${
              p === page
                ? "bg-[#071F5A] text-white"
                : "border border-gray-200 text-[#071F5A] hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <span className="px-2 text-gray-400 text-sm">…</span>
        )}

        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-[#071F5A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
