import { useState } from "react";
import { Plus, Pencil, Trash2, PlayCircle, Headphones, User, Calendar } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import TeachingFormModal from "./TeachingFormModal";
import useAdminResource from "../hooks/useAdminResource";
import { formatDate } from "../../../shared/utils";
import { getTeachings, createTeaching, updateTeaching, deleteTeaching } from "../api/adminApi";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80";

export default function TeachingsAdmin() {
  const {
    items,
    count,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    loading,
    actionLoading,
    createItem,
    updateItem,
    removeItem,
  } = useAdminResource({
    list: getTeachings,
    create: createTeaching,
    update: updateTeaching,
    remove: deleteTeaching,
    pageSize: 9,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editTeaching, setEditTeaching] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCreate = () => {
    setEditTeaching(null);
    setFormOpen(true);
  };

  const openEdit = (teaching) => {
    setEditTeaching(teaching);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTeaching(null);
  };

  const handleSubmit = async (payload) => {
    setError(null);
    if (editTeaching) {
      await updateItem(editTeaching.id, payload);
      setSuccess("Enseignement mis à jour avec succès.");
    } else {
      await createItem(payload);
      setSuccess("Enseignement publié avec succès.");
    }
    closeForm();
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Enseignement supprimé avec succès.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer cet enseignement."));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Enseignements"
        description="Publiez les prédications, études bibliques et témoignages."
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold px-5 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Plus size={18} />
            Nouvel enseignement
          </button>
        }
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un enseignement..." />

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
          <p className="text-gray-400">Aucun enseignement trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((teaching) => (
            <article
              key={teaching.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,31,90,0.1)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={teaching.thumbnail || FALLBACK_IMAGE}
                  alt={teaching.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute top-3 left-3 flex gap-2">
                  {teaching.video_url && (
                    <span className="w-8 h-8 rounded-full bg-[#F0B51B] text-[#071F5A] flex items-center justify-center">
                      <PlayCircle size={16} />
                    </span>
                  )}
                  {teaching.audio_url && (
                    <span className="w-8 h-8 rounded-full bg-white/90 text-[#071F5A] flex items-center justify-center">
                      <Headphones size={15} />
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={() => openEdit(teaching)}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#071F5A] transition"
                    title="Modifier"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(teaching)}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-red-600 transition"
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[#071F5A] text-lg leading-snug line-clamp-2">
                  {teaching.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">
                  {teaching.description}
                </p>
                <div className="mt-4 flex flex-col gap-1.5 text-sm text-gray-600">
                  {teaching.speaker && (
                    <span className="flex items-center gap-2">
                      <User size={14} className="text-[#071F5A]" />
                      {teaching.speaker}
                    </span>
                  )}
                  {teaching.date && (
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#071F5A]" />
                      {formatDate(teaching.date)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      <TeachingFormModal
        open={formOpen}
        teaching={editTeaching}
        onClose={closeForm}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer cet enseignement ?"
        message={`L'enseignement "${deleteTarget?.title}" sera définitivement supprimé du site.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
