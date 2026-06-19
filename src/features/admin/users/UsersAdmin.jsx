import { useState } from "react";
import { Pencil, Trash2, ShieldCheck, Mail, Phone, Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";
import Alert, { getErrorMessage } from "../components/Alert";
import UserFormModal from "./UserFormModal";
import useAdminResource from "../hooks/useAdminResource";
import { formatDate } from "../../../shared/utils";
import { getUsers, createUser, updateUser, deleteUser } from "../api/adminApi";

const ROLE_FILTERS = [
  { value: "", label: "Tous les rôles" },
  { value: "member", label: "Membres" },
  { value: "staff", label: "Staff" },
  { value: "admin", label: "Administrateurs" },
];

export default function UsersAdmin() {
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
    createItem,
    updateItem,
    removeItem,
  } = useAdminResource({
    list: getUsers,
    create: createUser,
    update: updateUser,
    remove: deleteUser,
    pageSize: 10,
  });

  const [editUser, setEditUser] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCreate = () => {
    setEditUser(null);
    setFormOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditUser(null);
  };

  const handleSubmit = async (payload) => {
    setError(null);
    if (editUser) {
      await updateItem(editUser.id, payload);
      setSuccess("Utilisateur mis à jour avec succès.");
    } else {
      await createItem(payload);
      setSuccess("Utilisateur créé avec succès.");
    }
    closeForm();
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Utilisateur supprimé avec succès.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer cet utilisateur."));
    }
  };

  const columns = [
    {
      key: "name",
      label: "Membre",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#071F5A]/10 text-[#071F5A] flex items-center justify-center font-bold uppercase shrink-0">
            {(row.first_name || row.username || "?").charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#071F5A] truncate">
              {row.first_name || row.last_name
                ? `${row.first_name || ""} ${row.last_name || ""}`.trim()
                : row.username || "—"}
            </p>
            <p className="text-xs text-gray-500 truncate">@{row.username || "—"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (row) => (
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          {row.email && (
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-gray-400" /> {row.email}
            </span>
          )}
          {row.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-gray-400" /> {row.phone}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "role",
      label: "Rôle",
      render: (row) => <StatusBadge status={row.role || "member"} />,
    },
    {
      key: "is_active",
      label: "Statut",
      render: (row) => <StatusBadge status={row.is_active ? "active" : "inactive"} />,
    },
    {
      key: "date_joined",
      label: "Inscrit le",
      render: (row) => (row.date_joined ? formatDate(row.date_joined) : "—"),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEdit(row)}
            className="p-2 rounded-xl text-[#071F5A] hover:bg-[#071F5A]/10 transition"
            title="Modifier"
          >
            <Pencil size={16} />
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
        title="Utilisateurs"
        description="Gérez les membres, le staff et les administrateurs de la plateforme."
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#071F5A]/5 text-[#071F5A] text-sm font-semibold">
              <ShieldCheck size={16} />
              {count} utilisateur{count > 1 ? "s" : ""}
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold px-5 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Plus size={18} />
              Nouvel utilisateur
            </button>
          </div>
        }
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un utilisateur..."
        />
        <select
          value={extraParams.role || ""}
          onChange={(e) =>
            setExtraParams({ ...extraParams, role: e.target.value || undefined })
          }
          className="h-12 px-4 rounded-2xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] w-full sm:w-56"
        >
          {ROLE_FILTERS.map((f) => (
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
        emptyMessage="Aucun utilisateur ne correspond à votre recherche."
      />

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      <UserFormModal
        open={formOpen}
        user={editUser}
        onClose={closeForm}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer cet utilisateur ?"
        message={`Cette action est irréversible. Le compte de "${deleteTarget?.username || deleteTarget?.email}" sera définitivement supprimé.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
