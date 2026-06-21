import { useEffect, useState } from "react";
import {
  Sparkles,
  Save,
  CalendarClock,
  MapPin,
  Link2,
  Church,
} from "lucide-react";
import { TextField, TextAreaField } from "../components/FormFields";
import Alert, { getErrorMessage } from "../components/Alert";
import Spinner from "../../../shared/ui/Spinner";
import { getChurchSettings, updateChurchSettings } from "../api/adminApi";

/**
 * Convertit une date ISO (renvoyée par Django) au format attendu
 * par <input type="datetime-local"> : "YYYY-MM-DDTHH:mm"
 */
const toDateTimeLocal = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

const emptyForm = {
  name: "",
  tagline: "",
  email: "",
  phone: "",
  address: "",

  major_event_enabled: true,
  major_event_badge: "",
  major_event_title: "",
  major_event_description: "",
  major_event_date: "",
  major_event_location: "",
  major_event_cta_label: "",
  major_event_cta_link: "",
};

export default function SettingsAdmin() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getChurchSettings()
      .then(({ data }) => {
        if (cancelled) return;
        setForm({
          name: data.name || "",
          tagline: data.tagline || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",

          major_event_enabled: data.major_event_enabled ?? true,
          major_event_badge: data.major_event_badge || "",
          major_event_title: data.major_event_title || "",
          major_event_description: data.major_event_description || "",
          major_event_date: toDateTimeLocal(data.major_event_date),
          major_event_location: data.major_event_location || "",
          major_event_cta_label: data.major_event_cta_label || "",
          major_event_cta_link: data.major_event_cta_link || "",
        });
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleToggle = () =>
    setForm((f) => ({ ...f, major_event_enabled: !f.major_event_enabled }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const payload = {
        ...form,
        // Le backend attend un ISO complet ou null
        major_event_date: form.major_event_date
          ? new Date(form.major_event_date).toISOString()
          : null,
      };
      await updateChurchSettings(payload);
      setSuccess("Paramètres enregistrés avec succès.");
    } catch (err) {
      setError(getErrorMessage(err, "Impossible d'enregistrer les paramètres."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">
      <Alert type="error" message={error} onClose={() => setError(null)} />
      <Alert type="success" message={success} onClose={() => setSuccess(null)} />

      {/* ===== INFOS GÉNÉRALES ===== */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#071F5A]/10 text-[#071F5A] flex items-center justify-center shrink-0">
            <Church size={18} />
          </div>
          <div>
            <h3 className="font-bold text-[#071F5A] text-lg">Informations générales</h3>
            <p className="text-sm text-gray-500">Nom, contact et coordonnées de l'église</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Nom de l'église" value={form.name} onChange={handleChange("name")} />
          <TextField label="Slogan" value={form.tagline} onChange={handleChange("tagline")} />
          <TextField label="E-mail" type="email" value={form.email} onChange={handleChange("email")} />
          <TextField label="Téléphone" value={form.phone} onChange={handleChange("phone")} />
        </div>
        <div className="mt-4">
          <TextField label="Adresse" value={form.address} onChange={handleChange("address")} />
        </div>
      </div>

      {/* ===== ÉVÉNEMENT MAJEUR ===== */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(7,31,90,0.06)] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0B51B]/15 text-[#F0B51B] flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#071F5A] text-lg">Événement majeur</h3>
              <p className="text-sm text-gray-500">
                Section compte à rebours affichée sur la page d'accueil
              </p>
            </div>
          </div>

          {/* Toggle activer/désactiver */}
          <button
            type="button"
            onClick={handleToggle}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 shrink-0 ${
              form.major_event_enabled ? "bg-[#071F5A]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                form.major_event_enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div
          className={`flex flex-col gap-4 transition-opacity duration-300 ${
            form.major_event_enabled ? "opacity-100" : "opacity-40 pointer-events-none"
          }`}
        >
          <TextField
            label="Badge"
            value={form.major_event_badge}
            onChange={handleChange("major_event_badge")}
            placeholder="Évènement Majeur - Église"
          />

          <TextField
            label="Titre de l'événement"
            value={form.major_event_title}
            onChange={handleChange("major_event_title")}
            placeholder="Conférence Internationale du Réveil 2026"
          />

          <TextAreaField
            label="Description"
            value={form.major_event_description}
            onChange={handleChange("major_event_description")}
            rows={3}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <TextField
              label="Date et heure"
              type="datetime-local"
              value={form.major_event_date}
              onChange={handleChange("major_event_date")}
              hint="Le compte à rebours s'arrête automatiquement à cette date"
            />
            <TextField
              label="Lieu"
              value={form.major_event_location}
              onChange={handleChange("major_event_location")}
              placeholder="Salle de conférence de l'église"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <TextField
              label="Texte du bouton"
              value={form.major_event_cta_label}
              onChange={handleChange("major_event_cta_label")}
              placeholder="Rejoindre maintenant"
            />
            <TextField
              label="Lien du bouton"
              value={form.major_event_cta_link}
              onChange={handleChange("major_event_cta_link")}
              placeholder="/contact"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#071F5A] hover:bg-[#0A2D7A] text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  );
}
