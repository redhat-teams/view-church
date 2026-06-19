import { Inbox } from "lucide-react";

/**
 * Table générique pour l'admin.
 *
 * @param {Array} columns - [{ key, label, render?(row), className? }]
 * @param {Array} data
 * @param {boolean} loading
 * @param {string} emptyMessage
 * @param {Function} [rowKey] - (row) => string|number
 */
export default function DataTable({
  columns,
  data,
  loading,
  emptyMessage = "Aucune donnée trouvée.",
  rowKey = (row) => row.id,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#071F5A] text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left font-semibold px-4 py-3.5 whitespace-nowrap ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Inbox size={36} />
                  <p className="text-sm">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          )}

          {!loading &&
            data.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-[#F4F6FB] transition">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 align-middle ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
