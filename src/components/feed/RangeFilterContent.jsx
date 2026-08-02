// Reusable dropdown body for min/max range filters (e.g., Age, Experience).

export default function RangeFilterContent({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  unit = "",
  presets = [], // e.g., [{label: "0-2 years", min: 0, max: 2}]
}) {
  return (
    <div className="flex flex-col space-y-4 px-2.5 py-2">
      {/* Dual Number Inputs */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min="0"
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
            placeholder={minPlaceholder}
            className="w-full bg-surface-2/60 border border-border/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-fg placeholder:text-fg/40"
          />
        </div>
        <span className="text-fg/50 text-xs font-medium px-1">to</span>
        <div className="relative flex-1">
          <input
            type="number"
            min="0"
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
            placeholder={maxPlaceholder}
            className="w-full bg-surface-2/60 border border-border/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-fg placeholder:text-fg/40"
          />
        </div>
        {unit && <span className="text-xs text-fg/70 ml-1">{unit}</span>}
      </div>

      {/* Optional Presets */}
      {presets && presets.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-border/40">
          <div className="text-[10px] uppercase tracking-wider text-fg/50 font-semibold mb-2">
            Quick Select
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const isActive =
                String(minValue) === String(preset.min) && String(maxValue) === String(preset.max);
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onMinChange(String(preset.min));
                    onMaxChange(String(preset.max));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-surface border-border hover:bg-surface-2 text-fg/70"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
