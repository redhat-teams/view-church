export default function Badge({ children, color = "blue" }) {
  return <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-${color}-100 text-${color}-800`}>{children}</span>;
}
