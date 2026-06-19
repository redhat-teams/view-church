import { useState } from "react";
import { Plus, Pencil, Trash2, Calendar, MapPin, Tag } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import EventFormModal from "./EventFormModal";
import useAdminResource from "../hooks/useAdminResource";
import { formatDate } from "../../../shared/utils";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../api/adminApi";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80";

export default function EventsAdmin() {
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
    list: getEvents,
    create: createEvent,
    update: updateEvent,
    remove: deleteEvent,
    pageSize: 9,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const openCreate = () => {
    setEditEvent(null);
    setFormOpen(true);
  };

  const openEdit = (event) => {
    setEditEvent(event);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditEvent(null);
  };

  const handleSubmit = async (payload) => {
    setError(null);
    if (editEvent) {
      await updateItem(editEvent.id, payload);
      setSuccess("Événement mis à jour avec succès.");
    } else {
      await createItem(payload);
      setSuccess("Événement publié avec succès.");
    }
    closeForm();
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await removeItem(deleteTarget.id);
      setSuccess("Événement supprimé avec succès.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de supprimer cet événement."));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Événements"
        description="Créez et gérez les événements affichés sur le site public."
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#F0B51B] hover:bg-[#d89f0d] text-[#071F5A] font-bold px-5 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Plus size={18} />
            Nouvel événement
          </button>
        }
      />

      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un événement..." />

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
          <p className="text-gray-400">Aucun événement trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((event) => (
            <article
              key={event.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,31,90,0.1)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image || FALLBACK_IMAGE}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {event.category && (
                  <span className="absolute top-3 left-3 bg-[#F0B51B] text-[#071F5A] text-xs font-bold uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Tag size={11} />
                    {event.category}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={() => openEdit(event)}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#071F5A] transition"
                    title="Modifier"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(event)}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-red-600 transition"
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[#071F5A] text-lg leading-snug line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">
                  {event.description}
                </p>
                <div className="mt-4 flex flex-col gap-1.5 text-sm text-gray-600">
                  {event.date && (
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#071F5A]" />
                      {formatDate(event.date)}
                      {event.time && ` à ${event.time.slice(0, 5)}`}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-2 truncate">
                      <MapPin size={14} className="text-[#071F5A]" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} count={count} onChange={setPage} />

      <EventFormModal
        open={formOpen}
        event={editEvent}
        onClose={closeForm}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Supprimer cet événement ?"
        message={`L'événement "${deleteTarget?.title}" sera définitivement supprimé du site.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
