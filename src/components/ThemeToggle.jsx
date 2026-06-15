import { useTheme } from "next-themes";

const ICON_SIZE = 16;

function Icon({ name }) {
  switch (name) {
    case "sun":
      return (
        <svg
          width={ICON_SIZE}
          height={ICON_SIZE}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "moon":
      return (
        <svg
          width={ICON_SIZE}
          height={ICON_SIZE}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "monitor":
      return (
        <svg
          width={ICON_SIZE}
          height={ICON_SIZE}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    default:
      return null;
  }
}

const OPTIONS = [
  { value: "system", icon: "monitor", label: "System theme" },
  { value: "light", icon: "sun", label: "Light theme" },
  { value: "dark", icon: "moon", label: "Dark theme" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="pl-3 pr-1 py-1 text-sm rounded-lg flex items-center justify-between group hover:bg-surface-2 transition-colors duration-150">
      <span className="text-fg font-medium">Theme</span>
      <div role="group" aria-label="Color theme" className="flex gap-0.5">
        {OPTIONS.map((opt) => {
          const active = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-label={opt.label}
              aria-pressed={active}
              onClick={() => setTheme(opt.value)}
              className={`p-1.75 inline-flex items-center justify-center rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-fg-muted/60 hover:bg-surface"
              }`}
            >
              <Icon name={opt.icon} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeToggle;
