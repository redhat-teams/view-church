/**
 * Zone d'action en haut de chaque page admin.
 *
 * Le titre et la description de la page sont déjà affichés dans
 * AdminTopbar (toujours visible, sticky) — ce composant ne gère donc
 * plus que le bouton d'action à droite (ex: "Nouvel événement"),
 * pour éviter d'afficher le même titre deux fois sur la page.
 *
 * Les props `title` et `description` sont conservées dans la signature
 * pour ne pas casser les appels existants, mais ne sont plus rendues.
 */
export default function PageHeader({ action }) {
  if (!action) return null;

  return (
    <div className="flex justify-end mb-2">
      <div className="shrink-0">{action}</div>
    </div>
  );
}
