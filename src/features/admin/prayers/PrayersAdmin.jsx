import { useState } from "react";
import {
  Check,
  X,
  Eye,
  Trash2,
  HeartHandshake,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";
import Alert, { getErrorMessage } from "../components/Alert";
import FormModal from "../components/FormModal";
import useAdminResource from "../hooks/useAdminResource";
import { formatDate } from "../../../shared/utils";
import {
  getPrayerRequests,
  updatePrayerRequest,
  deletePrayerRequest,
} from "../api/adminApi";
import { PRAYER_REQUESTS_UPDATED_EVENT } from "../components/AdminTopbar";

const STATUS_FILTERS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "approved", label: "Approuvées" },
  { value: "rejected", label: "Refusées" },
];

export default function PrayersAdmin() {
  const {
    items,
    count,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    extraParams,
    setExtraParams,
    loading,
    actionLoading,
    updateItem,
    removeItem,
  } = useAdminResource({
    list: getPrayerRequests,
    update: updatePrayerRequest,
    remove: deletePrayerRequest,
    pageSize: 10,
  });

  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rowLoadingId, setRowLoadingId] = useState(null);

  const pendingCount  = items.filter((p) => p.status === "pending").length;
  const approvedCount = items.filter((p) => p.status === "approved").length;
  const rejectedCount = items.filter((p) => p.status === "rejected").length;

  const handleStatusChange = async (prayer, status) => {
    setError(null);
    setRowLoadingId(prayer.id);
    try {
      await updateItem(prayer.id, { status });
      setSuccess(
        status === "approved"
          ? "Demande de prière approuvée."
          : "Demande de prière refusée."
      );
      if (viewTarget?.id === prayer.id) {
        setViewTarget({ ...viewTarget, status });
      }
      // Notifie le reste de l'admin (badge de la cloche) pour un rafraîchissement immédiat
      window.dispatchEvent(new CustomEvent(PRAYER_REQUESTS_UPDATED_EVENT));
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de mettre à jour cette demande."));
    } finally {
      setRowLoadingId(null);
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Demande de prière supprimée avec succès.");
      setDeleteTarget(null);
      // Notifie le reste de l'admin (badge de la cloche) pour un rafraîchissement immédiat
      window.dispatchEvent(new CustomEvent(PRAYER_REQUESTS_UPDATED_EVENT));
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer cette demande."));
    }
  };

  const columns = [
    {
      key: "person",
      label: "Demandeur",
      render: (row) => (
        <div>
          <p className="font-semibold text-[#071F5A]">
            {row.prenom} {row.nom}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
            <Phone size={11} /> {row.tel}
            {row.ville && (
              <>
                <span className="mx-0.5">·</span>
                <MapPin size={11} /> {row.ville}
              </>
            )}
          </p>
        </div>
      ),
    },
    {
      key: "situation",
      label: "Situation",
      render: (row) => (
        <span className="text-sm text-gray-700">{row.situation}</span>
      ),
    },
    {
      key: "priere",
      label: "Message",
      render: (row) => (
        <p className="text-sm text-gray-500 max-w-xs truncate">
          {row.priere || "—"}
        </p>
      ),
    },
    {
      key: "status",
      label: "Statut",
      render: (row) => (
        <StatusBadge
          status={
            row.status === "approved"
              ? "completed"
              : row.status === "rejected"
              ? "failed"
              : "pending"
          }
          label={
            row.status === "approved"
              ? "Approuvée"
              : row.status === "rejected"
              ? "Refusée"
              : "En attente"
          }
        />
      ),
    },
    {
      key: "created_at",
      label: "Reçue le",
      render: (row) => (row.created_at ? formatDate(row.created_at) : "—"),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          {row.status !== "approved" && (
            <button
              onClick={() => handleStatusChange(row, "approved")}
              disabled={rowLoadingId === row.id}
              className="p-2 rounded-xl text-green-600 hover:bg-green-50 transition disabled:opacity-40"
              title="Approuver"
            >
              <Check size={16} />
            </button>
          )}
          {row.status !== "rejected" && (
            <button
              onClick={() => handleStatusChange(row, "rejected")}
              disabled={rowLoadingId === row.id}
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition disabled:opacity-40"
              title="Refuser"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setViewTarget(row)}
            className="p-2 rounded-xl text-[#071F5A] hover:bg-[#071F5A]/10 transition"
            title="Voir le détail"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-red-600 transition"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Demandes de prière"
        description="Approuvez ou refusez les demandes de prière soumises par les membres."
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={Clock} label="En attente (page actuelle)" value={pendingCount} accent="#F0B51B" />
        <StatCard icon={Check} label="Approuvées" value={approvedCount} accent="#22C55E" />
        <StatCard icon={X} label="Refusées" value={rejectedCount} accent="#EF4444" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher par nom, téléphone, ville..."
        />
        <select
          value={extraParams.status || ""}
          onChange={(e) =>
            setExtraParams({ ...extraParams, status: e.target.value || undefined })
          }
          className="h-12 px-4 rounded-2xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] w-full sm:w-56"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        emptyMessage="Aucune demande de prière pour le moment."
      />

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      {/* Détail de la demande */}
      {viewTarget && (
        <FormModal
          open
          title="Demande de prière"
          description={`Reçue le ${viewTarget.created_at ? formatDate(viewTarget.created_at) : "—"}`}
          onClose={() => setViewTarget(null)}
          onSubmit={(e) => {
            e.preventDefault();
            setViewTarget(null);
          }}
          submitLabel="Fermer"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#071F5A]/10 text-[#071F5A] flex items-center justify-center font-bold uppercase shrink-0">
              <HeartHandshake size={20} />
            </div>
            <div>
              <p className="font-bold text-[#071F5A] text-lg">
                {viewTarget.prenom} {viewTarget.nom}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Phone size={13} /> {viewTarget.tel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Ville</p>
              <p className="font-semibold text-[#071F5A]">{viewTarget.ville || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400">Situation</p>
              <p className="font-semibold text-[#071F5A]">{viewTarget.situation}</p>
            </div>
          </div>

          {viewTarget.priere && (
            <div>
              <p className="text-gray-400 text-sm mb-1.5">Sujet de prière</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 leading-relaxed">
                {viewTarget.priere}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <StatusBadge
              status={
                viewTarget.status === "approved"
                  ? "completed"
                  : viewTarget.status === "rejected"
                  ? "failed"
                  : "pending"
              }
              label={
                viewTarget.status === "approved"
                  ? "Approuvée"
                  : viewTarget.status === "rejected"
                  ? "Refusée"
                  : "En attente"
              }
            />
            <div className="flex gap-2">
              {viewTarget.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(viewTarget, "approved")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition"
                >
                  <Check size={15} /> Approuver
                </button>
              )}
              {viewTarget.status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(viewTarget, "rejected")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition"
                >
                  <X size={15} /> Refuser
                </button>
              )}
            </div>
          </div>
        </FormModal>
      )}

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer cette demande ?"
        message={`La demande de prière de "${deleteTarget?.prenom} ${deleteTarget?.nom}" sera définitivement supprimée.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
