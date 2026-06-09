export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="float-right text-gray-400">✕</button>
        {children}
      </div>
    </div>
  );
}
