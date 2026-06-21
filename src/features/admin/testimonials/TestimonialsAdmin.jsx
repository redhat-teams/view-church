import { useState } from "react";
import { Plus, Pencil, Trash2, Quote, EyeOff } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import TestimonialFormModal from "./TestimonialFormModal";
import useAdminResource from "../hooks/useAdminResource";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../api/adminApi";

export default function TestimonialsAdmin() {
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
    list: getTestimonials,
    create: createTestimonial,
    update: updateTestimonial,
    remove: deleteTestimonial,
    pageSize: 9,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCreate = () => {
    setEditTestimonial(null);
    setFormOpen(true);
  };

  const openEdit = (testimonial) => {
    setEditTestimonial(testimonial);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTestimonial(null);
  };

  const handleSubmit = async (payload) => {
    setError(null);
    if (editTestimonial) {
      await updateItem(editTestimonial.id, payload);
      setSuccess("Témoignage mis à jour avec succès.");
    } else {
      await createItem(payload);
      setSuccess("Témoignage publié avec succès.");
    }
    closeForm();
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Témoignage supprimé avec succès.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer ce témoignage."));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold px-5 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Plus size={18} />
            Nouveau témoignage
          </button>
        }
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un témoignage..." />

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
          <p className="text-gray-400">Aucun témoignage trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <article
              key={t.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,31,90,0.1)] transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#071F5A]/10 text-[#071F5A] flex items-center justify-center font-bold uppercase shrink-0 overflow-hidden">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        t.name?.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#071F5A] truncate">{t.name}</p>
                      {!t.is_active && (
                        <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                          <EyeOff size={11} /> Masqué
                        </span>
                      )}
                    </div>
                  </div>
                  <Quote size={28} className="text-[#071F5A]/15 shrink-0" />
                </div>

                <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-4 flex-1">
                  {t.text}
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Ordre : {t.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="p-2 rounded-xl text-[#071F5A] hover:bg-[#071F5A]/10 transition"
                      title="Modifier"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(t)}
                      className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      <TestimonialFormModal
        open={formOpen}
        testimonial={editTestimonial}
        onClose={closeForm}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer ce témoignage ?"
        message={`Le témoignage de "${deleteTarget?.name}" sera définitivement supprimé du site.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
