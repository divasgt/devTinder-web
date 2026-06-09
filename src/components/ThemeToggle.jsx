import { useTheme } from "next-themes";

const OPTIONS = [
  { value: "system", icon: "◐", label: "Follow system theme" },
  { value: "light", icon: "☀", label: "Light theme" },
  { value: "dark", icon: "☾", label: "Dark theme" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-3 py-2 text-sm rounded hover:bg-surface-2 transition-colors duration-150 flex items-center justify-between">
      <span>Theme</span>
      <div
        role="group"
        aria-label="Color theme"
        className="flex h-7 border border-border rounded overflow-hidden"
      >
        {OPTIONS.map((opt, i) => {
          const active = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-label={opt.label}
              aria-pressed={active}
              onClick={() => setTheme(opt.value)}
              className={`w-7 inline-flex items-center justify-center text-xs leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer ${
                i > 0 ? "border-l border-border" : ""
              } ${
                active
                  ? "bg-primary text-white"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {opt.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeToggle;
