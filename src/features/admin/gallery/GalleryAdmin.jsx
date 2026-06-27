import { useState } from "react";
import { Plus, Pencil, Trash2, EyeOff, LayoutGrid } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import GalleryImageFormModal from "./GalleryImageFormModal";
import useAdminResource from "../hooks/useAdminResource";
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../api/adminApi";

const CATEGORY_LABELS = {
  cultes:      "Cultes",
  evenements:  "Événements",
  jeunesse:    "Jeunesse",
  conferences: "Conférences",
  baptemes:    "Baptêmes",
  autre:       "Autre",
};

const CATEGORY_FILTERS = [
  { value: "", label: "Toutes" },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
];

export default function GalleryAdmin() {
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
    list: getGalleryImages,
    create: createGalleryImage,
    update: updateGalleryImage,
    remove: deleteGalleryImage,
    pageSize: 12,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCreate = () => { setEditItem(null); setFormOpen(true); };
  const openEdit   = (item) => { setEditItem(item); setFormOpen(true); };
  const closeForm  = () => { setFormOpen(false); setEditItem(null); };

  const handleSubmit = async (payload) => {
    setError(null);
    if (editItem) {
      await updateItem(editItem.id, payload);
      setSuccess("Photo mise à jour.");
    } else {
      await createItem(payload);
      setSuccess("Photo ajoutée à la galerie.");
    }
    closeForm();
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Photo supprimée.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer cette photo."));
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
            Ajouter une photo
          </button>
        }
      />

      <Alert type="error"   message={error}   onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      {/* Barre de filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher une photo..."
        />
        <select
          value={extraParams.category || ""}
          onChange={(e) =>
            setExtraParams({ ...extraParams, category: e.target.value || undefined })
          }
          className="h-12 px-4 rounded-2xl border border-gray-200 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] w-full sm:w-56"
        >
          {CATEGORY_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Compteur */}
      {!loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LayoutGrid size={15} />
          {count} photo{count > 1 ? "s" : ""} dans la galerie
        </div>
      )}

      {/* Grille masonry-style */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
          <p className="text-gray-400">Aucune photo dans la galerie.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_16px_rgba(7,31,90,0.07)] hover:shadow-[0_8px_32px_rgba(7,31,90,0.12)] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.caption || item.category}
                className="w-full h-auto object-cover block"
                loading="lazy"
              />

              {/* Overlay au survol */}
              <div className="absolute inset-0 bg-[#071F5A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#F0B51B] text-[#071F5A] text-[10px] font-bold uppercase px-2 py-1 rounded-full">
                    {CATEGORY_LABELS[item.category] || item.category}
                  </span>
                  {!item.is_active && (
                    <span className="bg-white/20 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1">
                      <EyeOff size={10} /> Masquée
                    </span>
                  )}
                </div>

                {/* Légende */}
                {item.caption && (
                  <p className="text-white text-xs font-medium line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => openEdit(item)}
                    className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
                    title="Modifier"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="w-9 h-9 rounded-xl bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      <GalleryImageFormModal
        open={formOpen}
        item={editItem}
        onClose={closeForm}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer cette photo ?"
        message="Cette photo sera définitivement supprimée de la galerie."
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
