import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl h-12 px-4 shadow-sm w-full sm:w-72">
      <Search size={18} className="text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-gray-700"
      />
    </div>
  );
}
