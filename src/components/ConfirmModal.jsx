import { useEffect } from "react";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "btn-primary",
}) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up transform transition-all">
        <div className="p-6">
          <h3 className="text-xl font-bold text-fg mb-2">{title}</h3>
          <p className="text-sm text-fg-muted leading-relaxed">{message}</p>
        </div>

        <div className="px-6 py-4 bg-surface-2/50 border-t border-border flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg bg-surface hover:bg-surface-2 border border-border rounded-lg transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all cursor-pointer ${
              confirmColor === "btn-primary"
                ? "bg-primary text-primary-fg hover:bg-primary/90"
                : confirmColor === "danger"
                  ? "bg-rose-600 text-white hover:bg-rose-700"
                  : "bg-surface text-fg hover:bg-surface-2 border border-border"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
