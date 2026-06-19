import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { TextField, SelectField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";

const ROLE_OPTIONS = [
  { value: "member", label: "Membre" },
  { value: "staff", label: "Staff" },
  { value: "admin", label: "Administrateur" },
];

const STATUS_OPTIONS = [
  { value: "true", label: "Actif" },
  { value: "false", label: "Inactif" },
];

const emptyForm = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "member",
  is_active: "true",
  password: "",
};

export default function UserFormModal({ open, user, onClose, onSubmit, loading }) {
  const isEdit = Boolean(user);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "member",
        is_active: String(user.is_active ?? true),
        password: "",
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [user, open]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await onSubmit({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          is_active: form.is_active === "true",
        });
      } else {
        await onSubmit({
          username: form.username,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          is_active: form.is_active === "true",
          password: form.password,
        });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <FormModal
      open={open}
      title={isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
      description={
        isEdit
          ? "Mettez à jour les informations et le rôle du membre."
          : "Créez un nouveau compte membre, staff ou administrateur."
      }
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={isEdit ? "Enregistrer" : "Créer le compte"}
    >
      <Alert type="error" message={error} onClose={() => setError(null)} />

      {!isEdit && (
        <TextField
          label="Nom d'utilisateur"
          required
          value={form.username}
          onChange={handleChange("username")}
          placeholder="ex: jean.kouassi"
          autoComplete="off"
        />
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Prénom"
          value={form.first_name}
          onChange={handleChange("first_name")}
        />
        <TextField
          label="Nom"
          value={form.last_name}
          onChange={handleChange("last_name")}
        />
      </div>

      <TextField
        label="Adresse e-mail"
        type="email"
        required
        value={form.email}
        onChange={handleChange("email")}
      />

      <TextField
        label="Téléphone"
        value={form.phone}
        onChange={handleChange("phone")}
        placeholder="+225 07 00 00 00 00"
      />

      {!isEdit && (
        <TextField
          label="Mot de passe"
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={handleChange("password")}
          placeholder="6 caractères minimum"
          autoComplete="new-password"
        />
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField
          label="Rôle"
          options={ROLE_OPTIONS}
          value={form.role}
          onChange={handleChange("role")}
        />
        <SelectField
          label="Statut"
          options={STATUS_OPTIONS}
          value={form.is_active}
          onChange={handleChange("is_active")}
        />
      </div>
    </FormModal>
  );
}
