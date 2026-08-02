// Reusable dropdown body for location filtering (City & Country)

export default function LocationFilterContent({
  cityValue,
  countryValue,
  onCityChange,
  onCountryChange,
  presets = [],
}) {
  const handlePresetClick = (presetStr) => {
    if (presetStr === "Remote") {
      onCityChange("");
      onCountryChange("Remote");
      return;
    }
    
    // Split "Mumbai, India" into City and Country
    const parts = presetStr.split(",");
    if (parts.length >= 2) {
      onCityChange(parts[0].trim());
      onCountryChange(parts[1].trim());
    } else {
      onCityChange(presetStr.trim());
      onCountryChange("");
    }
  };

  return (
    <div className="flex flex-col space-y-4 px-2.5 py-2">
      {/* Inputs */}
      <div className="space-y-2.5">
        <div className="relative">
          <input
            type="text"
            value={cityValue}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="City (e.g. Bengaluru)"
            className="w-full bg-surface-2/60 border border-border/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-fg placeholder:text-fg/40"
          />
          {cityValue && (
            <button
              type="button"
              onClick={() => onCityChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100 p-0.5 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={countryValue}
            onChange={(e) => onCountryChange(e.target.value)}
            placeholder="Country (e.g. India)"
            className="w-full bg-surface-2/60 border border-border/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-fg placeholder:text-fg/40"
          />
          {countryValue && (
            <button
              type="button"
              onClick={() => onCountryChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100 p-0.5 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Popular Presets */}
      {presets && presets.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-border/40">
          <div className="text-[10px] uppercase tracking-wider text-fg/50 font-semibold mb-2">
            Popular Hubs
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              // Determine if this preset is currently fully active
              const parts = preset === "Remote" ? ["", "Remote"] : preset.split(",");
              const presetCity = parts[0]?.trim() || "";
              const presetCountry = parts[1]?.trim() || "";
              
              const isActive =
                cityValue.toLowerCase() === presetCity.toLowerCase() &&
                countryValue.toLowerCase() === presetCountry.toLowerCase();

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-surface border-border hover:bg-surface-2 text-fg/70"
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
