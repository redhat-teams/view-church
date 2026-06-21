import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { TextField, TextAreaField, ImageField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";

const emptyForm = {
  name: "",
  text: "",
  order: "0",
  is_active: "true",
};

export default function TestimonialFormModal({ open, testimonial, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (testimonial) {
      setForm({
        name: testimonial.name || "",
        text: testimonial.text || "",
        order: String(testimonial.order ?? 0),
        is_active: String(testimonial.is_active ?? true),
      });
      setImage(testimonial.image || null);
    } else {
      setForm(emptyForm);
      setImage(null);
    }
    setError(null);
  }, [testimonial, open]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      name: form.name,
      text: form.text,
      order: Number(form.order) || 0,
      is_active: form.is_active === "true",
    };

    try {
      if (image instanceof File) {
        const fd = new FormData();
        Object.entries(payload).forEach(([key, value]) => fd.append(key, value));
        fd.append("image", image);
        await onSubmit(fd);
      } else {
        await onSubmit(payload);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <FormModal
      open={open}
      title={testimonial ? "Modifier le témoignage" : "Nouveau témoignage"}
      description="Ajoutez le témoignage d'un membre, affiché sur la page d'accueil."
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={testimonial ? "Enregistrer" : "Publier"}
    >
      <Alert type="error" message={error} onClose={() => setError(null)} />

      <ImageField
        label="Photo"
        value={image}
        onChange={setImage}
        hint="Photo de la personne (format carré recommandé)"
      />

      <TextField
        label="Nom"
        required
        value={form.name}
        onChange={handleChange("name")}
        placeholder="Ex: Marie Théa"
      />

      <TextAreaField
        label="Témoignage"
        required
        rows={5}
        value={form.text}
        onChange={handleChange("text")}
        placeholder="Le témoignage de la personne..."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Ordre d'affichage"
          type="number"
          min="0"
          value={form.order}
          onChange={handleChange("order")}
          hint="0 = en premier"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#071F5A]">Statut</label>
          <select
            value={form.is_active}
            onChange={handleChange("is_active")}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition"
          >
            <option value="true">Visible sur le site</option>
            <option value="false">Masqué</option>
          </select>
        </div>
      </div>
    </FormModal>
  );
}
