// Generic FilterChipWrapper: Wraps any individual filter chip and its dropdown panel

export default function FilterChipWrapper({
  name,
  label,
  icon,
  isActive,
  activeSummary,
  isOpen,
  onToggle,
  onClearSingle,
  onReset,
  onApply,
  dropdownWidth = "w-72",
  children,
}) {
  return (
    <div className={`relative ${isOpen ? "z-50" : isActive ? "z-10" : ""}`}>
      {/* Pill chip button */}
      <button
        type="button"
        onClick={() => onToggle(name)}
        className={`px-3 py-1.5 rounded-full border text-xs transition-all flex items-center gap-1 cursor-pointer select-none shadow-2xs ${
          isActive
            ? "bg-primary border-primary text-white shadow-sm"
            : "bg-surface hover:bg-surface-2 border-border text-fg"
        }`}
      >
        {isActive ? (
          <>
            {icon && <span>{icon}</span>}
            <span className="font-semibold">{activeSummary || label}</span>
            {/* Quick Clear 'X' on the chip */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClearSingle?.();
              }}
              className="hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-0.5 transition-colors"
              title="Clear this filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            <span>{label}</span>
            {/* Subtle Chevron indicator */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`opacity-60 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 ${dropdownWidth} rounded-2xl border border-border bg-surface shadow-2xl z-50 overflow-hidden animate-fade-in flex flex-col`}
        >
          {/* Main content area (e.g. checkboxes, search box, sliders) */}
          <div className="max-h-80 overflow-y-auto space-y-2">{children}</div>

          {/* Footer with Reset and Apply buttons */}
          <div className="px-2 py-1.5 bg-surface-2/60 border-t border-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onReset}
              className="btn-ghost h-9 text-xs px-4 py-1 rounded-xl border border-border/60 hover:bg-surface transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onApply}
              className="btn-primary h-9 text-xs px-4 py-1 rounded-xl shadow-sm cursor-pointer font-medium"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
