import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background-overlay)] backdrop-blur-sm animate-fade-in">
      <div className="relative bg-[var(--color-background)] rounded-xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-modal-in p-6">
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
        >
          ×
        </button>
        <div className="py-6">{children}</div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s; }
        @keyframes modal-in { from { transform: translateY(40px) scale(0.96); opacity:0; } to { transform: none; opacity:1; } }
        .animate-modal-in { animation: modal-in 0.2s; }
      `}</style>
    </div>
  );
}
