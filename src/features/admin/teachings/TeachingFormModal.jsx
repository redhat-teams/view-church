import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { TextField, TextAreaField, SelectField, ImageField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";

const CATEGORY_OPTIONS = [
  { value: "enseignement", label: "Enseignement" },
  { value: "predication", label: "Prédication" },
  { value: "etude_biblique", label: "Étude biblique" },
  { value: "temoignage", label: "Témoignage" },
  { value: "autre", label: "Autre" },
];

const emptyForm = {
  title: "",
  speaker: "",
  description: "",
  date: "",
  category: "enseignement",
  video_url: "",
  audio_url: "",
};

export default function TeachingFormModal({ open, teaching, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teaching) {
      setForm({
        title: teaching.title || "",
        speaker: teaching.speaker || "",
        description: teaching.description || "",
        date: teaching.date ? teaching.date.slice(0, 10) : "",
        category: teaching.category || "enseignement",
        video_url: teaching.video_url || "",
        audio_url: teaching.audio_url || "",
      });
      setThumbnail(teaching.thumbnail || null);
    } else {
      setForm(emptyForm);
      setThumbnail(null);
    }
    setError(null);
  }, [teaching, open]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (thumbnail instanceof File) {
        const fd = new FormData();
        Object.entries(form).forEach(([key, value]) => fd.append(key, value));
        fd.append("thumbnail", thumbnail);
        await onSubmit(fd);
      } else {
        await onSubmit(form);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <FormModal
      open={open}
      title={teaching ? "Modifier l'enseignement" : "Nouvel enseignement"}
      description="Ajoutez une prédication, un enseignement audio ou vidéo."
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      size="lg"
      submitLabel={teaching ? "Enregistrer" : "Publier"}
    >
      <Alert type="error" message={error} onClose={() => setError(null)} />

      <ImageField
        label="Miniature"
        value={thumbnail}
        onChange={setThumbnail}
        hint="Image affichée sur la carte de l'enseignement"
      />

      <TextField
        label="Titre"
        required
        value={form.title}
        onChange={handleChange("title")}
        placeholder="Ex: La Foi sans les Œuvres"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Orateur / Prédicateur"
          required
          value={form.speaker}
          onChange={handleChange("speaker")}
          placeholder="Ex: Pasteur Jean Kouassi"
        />
        <TextField label="Date" type="date" required value={form.date} onChange={handleChange("date")} />
      </div>

      <TextAreaField
        label="Description"
        required
        value={form.description}
        onChange={handleChange("description")}
        placeholder="Résumé de l'enseignement..."
      />

      <SelectField
        label="Catégorie"
        options={CATEGORY_OPTIONS}
        value={form.category}
        onChange={handleChange("category")}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Lien vidéo"
          value={form.video_url}
          onChange={handleChange("video_url")}
          placeholder="https://youtube.com/..."
        />
        <TextField
          label="Lien audio"
          value={form.audio_url}
          onChange={handleChange("audio_url")}
          placeholder="https://..."
        />
      </div>
    </FormModal>
  );
}
