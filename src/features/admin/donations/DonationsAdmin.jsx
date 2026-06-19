import { useState } from "react";
import { Trash2, Eye, HandCoins, Wallet, Smartphone, Banknote } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";
import Alert, { getErrorMessage } from "../components/Alert";
import FormModal from "../components/FormModal";
import { SelectField } from "../components/FormFields";
import useAdminResource from "../hooks/useAdminResource";
import { formatDate } from "../../../shared/utils";
import { getDonations, updateDonation, deleteDonation } from "../api/adminApi";

const STATUS_FILTERS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "completed", label: "Validés" },
  { value: "failed", label: "Échoués" },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "En attente" },
  { value: "completed", label: "Validé" },
  { value: "failed", label: "Échoué" },
  { value: "refunded", label: "Remboursé" },
];

const METHOD_ICONS = {
  wave: Wallet,
  orange_money: Smartphone,
  "orange money": Smartphone,
  bank: Banknote,
  cash: Banknote,
};

const formatAmount = (value, currency = "FCFA") =>
  `${Number(value || 0).toLocaleString("fr-FR")} ${currency}`;

export default function DonationsAdmin() {
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
    list: getDonations,
    update: updateDonation,
    remove: deleteDonation,
    pageSize: 10,
  });

  const [viewTarget, setViewTarget] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);
  const [newStatus, setNewStatus] = useState("pending");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const totalAmount = items.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const completedCount = items.filter((d) => (d.status || "").toLowerCase() === "completed").length;
  const pendingCount = items.filter((d) => (d.status || "").toLowerCase() === "pending").length;

  const openStatus = (don) => {
    setStatusTarget(don);
    setNewStatus(don.status || "pending");
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updateItem(statusTarget.id, { status: newStatus });
      setSuccess("Statut du don mis à jour avec succès.");
      setStatusTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de mettre à jour ce don."));
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Don supprimé avec succès.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer ce don."));
    }
  };

  const columns = [
    {
      key: "donor",
      label: "Donateur",
      render: (row) => (
        <div>
          <p className="font-semibold text-[#071F5A]">
            {row.donor_name || row.full_name || "Anonyme"}
          </p>
          <p className="text-xs text-gray-500">{row.email || row.phone || "—"}</p>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Montant",
      render: (row) => (
        <span className="font-bold text-[#071F5A]">
          {formatAmount(row.amount, row.currency || "FCFA")}
        </span>
      ),
    },
    {
      key: "method",
      label: "Méthode",
      render: (row) => {
        const key = (row.payment_method || "").toLowerCase();
        const Icon = METHOD_ICONS[key] || HandCoins;
        return (
          <span className="flex items-center gap-2 text-sm text-gray-600 capitalize">
            <Icon size={15} className="text-[#071F5A]" />
            {row.payment_method || "—"}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Statut",
      render: (row) => (
        <button onClick={() => openStatus(row)} className="cursor-pointer">
          <StatusBadge status={row.status || "pending"} />
        </button>
      ),
    },
    {
      key: "created_at",
      label: "Date",
      render: (row) => (row.created_at ? formatDate(row.created_at) : "—"),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setViewTarget(row)}
            className="p-2 rounded-xl text-[#071F5A] hover:bg-[#071F5A]/10 transition"
            title="Voir le détail"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
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
        title="Dons"
        description="Suivez et gérez les dons effectués via la plateforme."
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={HandCoins}
          label="Total (page actuelle)"
          value={formatAmount(totalAmount)}
          accent="#22C55E"
        />
        <StatCard icon={Wallet} label="Dons validés" value={completedCount} accent="#071F5A" />
        <StatCard icon={Banknote} label="Dons en attente" value={pendingCount} accent="#F0B51B" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un donateur..." />
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
        emptyMessage="Aucun don ne correspond à votre recherche."
      />

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      {/* Détail du don */}
      {viewTarget && (
        <FormModal
          open
          title="Détail du don"
          onClose={() => setViewTarget(null)}
          onSubmit={(e) => {
            e.preventDefault();
            setViewTarget(null);
          }}
          submitLabel="Fermer"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Donateur</p>
              <p className="font-semibold text-[#071F5A]">
                {viewTarget.donor_name || viewTarget.full_name || "Anonyme"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Montant</p>
              <p className="font-semibold text-[#071F5A]">
                {formatAmount(viewTarget.amount, viewTarget.currency || "FCFA")}
              </p>
            </div>
            <div>
              <p className="text-gray-400">E-mail</p>
              <p className="font-semibold text-[#071F5A]">{viewTarget.email || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400">Téléphone</p>
              <p className="font-semibold text-[#071F5A]">{viewTarget.phone || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400">Méthode</p>
              <p className="font-semibold text-[#071F5A] capitalize">
                {viewTarget.payment_method || "—"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Statut</p>
              <StatusBadge status={viewTarget.status || "pending"} />
            </div>
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-semibold text-[#071F5A]">
                {viewTarget.created_at ? formatDate(viewTarget.created_at) : "—"}
              </p>
            </div>
          </div>
          {viewTarget.message && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Message</p>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                {viewTarget.message}
              </p>
            </div>
          )}
        </FormModal>
      )}

      {/* Changement de statut */}
      <FormModal
        open={Boolean(statusTarget)}
        title="Mettre à jour le statut"
        description={`Don de ${statusTarget?.donor_name || statusTarget?.full_name || "Anonyme"} — ${formatAmount(statusTarget?.amount, statusTarget?.currency || "FCFA")}`}
        onClose={() => setStatusTarget(null)}
        onSubmit={handleStatusSubmit}
        loading={actionLoading}
        size="sm"
      >
        <SelectField
          label="Statut"
          options={STATUS_OPTIONS}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
      </FormModal>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer ce don ?"
        message="Cette action est irréversible et supprimera définitivement cet enregistrement."
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
