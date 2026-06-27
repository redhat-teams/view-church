import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { TextField, SelectField, ImageField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";

const CATEGORY_OPTIONS = [
  { value: "cultes",      label: "Cultes" },
  { value: "evenements",  label: "Événements" },
  { value: "jeunesse",    label: "Jeunesse" },
  { value: "conferences", label: "Conférences" },
  { value: "baptemes",    label: "Baptêmes" },
  { value: "autre",       label: "Autre" },
];

const emptyForm = {
  category:  "cultes",
  caption:   "",
  order:     "0",
  is_active: "true",
};

export default function GalleryImageFormModal({ open, item, onClose, onSubmit, loading }) {
  const isEdit = Boolean(item);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) {
      setForm({
        category:  item.category || "cultes",
        caption:   item.caption || "",
        order:     String(item.order ?? 0),
        is_active: String(item.is_active ?? true),
      });
      setImage(item.image || null);
    } else {
      setForm(emptyForm);
      setImage(null);
    }
    setError(null);
  }, [item, open]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isEdit && !(image instanceof File)) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("category",  form.category);
      fd.append("caption",   form.caption);
      fd.append("order",     Number(form.order) || 0);
      fd.append("is_active", form.is_active === "true");
      if (image instanceof File) fd.append("image", image);
      await onSubmit(fd);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <FormModal
      open={open}
      title={isEdit ? "Modifier la photo" : "Ajouter une photo"}
      description="Les photos actives apparaissent automatiquement dans la galerie du site."
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={isEdit ? "Enregistrer" : "Ajouter"}
    >
      <Alert type="error" message={error} onClose={() => setError(null)} />

      <ImageField
        label={isEdit ? "Changer l'image" : "Image *"}
        value={image}
        onChange={setImage}
        hint="JPG, PNG, WEBP — recommandé : rapport 4/3 ou carré"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="Catégorie"
          options={CATEGORY_OPTIONS}
          value={form.category}
          onChange={handleChange("category")}
        />
        <TextField
          label="Légende"
          value={form.caption}
          onChange={handleChange("caption")}
          placeholder="Description courte (facultatif)"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Ordre"
          type="number"
          min="0"
          value={form.order}
          onChange={handleChange("order")}
          hint="0 = affiché en premier"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#071F5A]">Visibilité</label>
          <select
            value={form.is_active}
            onChange={handleChange("is_active")}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0B51B] focus:border-transparent transition"
          >
            <option value="true">Visible sur le site</option>
            <option value="false">Masquée</option>
          </select>
        </div>
      </div>
    </FormModal>
  );
}
