import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { TextField, TextAreaField, SelectField, ImageField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";

const CATEGORY_OPTIONS = [
  { value: "culte", label: "Culte" },
  { value: "conference", label: "Conférence" },
  { value: "formation", label: "Formation" },
  { value: "evangelisation", label: "Évangélisation" },
  { value: "jeunesse", label: "Jeunesse" },
  { value: "priere", label: "Prière" },
  { value: "autre", label: "Autre" },
];

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "culte",
};

export default function EventFormModal({ open, event, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? event.date.slice(0, 10) : "",
        time: event.time ? event.time.slice(0, 5) : "",
        location: event.location || "",
        category: event.category || "culte",
      });
      setImage(event.image || null);
    } else {
      setForm(emptyForm);
      setImage(null);
    }
    setError(null);
  }, [event, open]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (image instanceof File) {
        const fd = new FormData();
        Object.entries(form).forEach(([key, value]) => fd.append(key, value));
        fd.append("image", image);
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
      title={event ? "Modifier l'événement" : "Nouvel événement"}
      description="Renseignez les informations de l'événement à publier sur le site."
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      size="lg"
      submitLabel={event ? "Enregistrer" : "Publier"}
    >
      <Alert type="error" message={error} onClose={() => setError(null)} />

      <ImageField label="Image de couverture" value={image} onChange={setImage} hint="Format recommandé : 1200x800px" />

      <TextField
        label="Titre"
        required
        value={form.title}
        onChange={handleChange("title")}
        placeholder="Ex: Conférence Ministérielle Internationale"
      />

      <TextAreaField
        label="Description"
        required
        value={form.description}
        onChange={handleChange("description")}
        placeholder="Décrivez l'événement..."
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <TextField label="Date" type="date" required value={form.date} onChange={handleChange("date")} />
        <TextField label="Heure" type="time" value={form.time} onChange={handleChange("time")} />
        <SelectField
          label="Catégorie"
          options={CATEGORY_OPTIONS}
          value={form.category}
          onChange={handleChange("category")}
        />
      </div>

      <TextField
        label="Lieu"
        required
        value={form.location}
        onChange={handleChange("location")}
        placeholder="Ex: Temple Principal"
      />
    </FormModal>
  );
}
