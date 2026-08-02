import { useState } from "react";

// Reusable dropdown body for multi-select list filters with search & custom addition

export default function MultiSelectFilterContent({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Search options...",
  allowCustom = true,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle selection of any item
  const handleToggle = (val) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((item) => item !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const getLabel = (opt) => (typeof opt === "string" ? opt : opt.label);
  const getValue = (opt) => (typeof opt === "string" ? opt : opt.value);

  // Filter existing options based on search query
  const trimmedQuery = searchQuery.trim();
  const filteredOptions = options.filter((opt) =>
    getLabel(opt).toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  // Check if custom option row should be shown
  const exactMatchExists =
    options.some((opt) => getLabel(opt).toLowerCase() === trimmedQuery.toLowerCase()) ||
    selectedValues.some((val) => val.toLowerCase() === trimmedQuery.toLowerCase());

  const showCustomOption = allowCustom && trimmedQuery.length > 0 && !exactMatchExists;

  // Ensure any selected custom items that aren't in the base `options` array are also displayed at the top
  const customSelectedItems = selectedValues.filter(
    (val) => !options.some((opt) => getValue(opt) === val)
  );

  return (
    <div className="flex flex-col space-y-1 pb-1">
      {/* Search Input Bar */}
      <div className="relative">
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
          className="absolute left-3 -mt-px top-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full border-b border-border px-9 py-3.5 text-xs focus:outline-none text-fg placeholder:text-fg/40"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60 hover:opacity-100 p-0.5 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Options List */}
      <div className="px-1.5 space-y-1 max-h-56 overflow-y-auto">
        {/* Render selected custom options first so they are easy to see uncheck */}
        {customSelectedItems.map((customVal) => (
          <button
            key={customVal}
            type="button"
            onClick={() => handleToggle(customVal)}
            className="w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer bg-primary/10 text-primary font-semibold"
          >
            <span className="truncate pr-2">{customVal}</span>
            <div className="w-4 h-4 rounded shrink-0 flex items-center justify-center border transition-colors bg-primary border-primary text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </button>
        ))}

        {/* Render filtered standard options */}
        {filteredOptions.map((opt) => {
          const val = getValue(opt);
          const lbl = getLabel(opt);
          const isSelected = selectedValues.includes(val);
          return (
            <button
              key={val}
              type="button"
              onClick={() => handleToggle(val)}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                isSelected
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-surface-2 text-fg/80"
              }`}
            >
              <span className="truncate pr-2">{lbl}</span>
              <div
                className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border transition-colors ${
                  isSelected
                    ? "bg-primary border-primary text-white"
                    : "border-border/80 bg-surface"
                }`}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}

        {/* Empty state if nothing matches and custom is not ready */}
        {filteredOptions.length === 0 && !showCustomOption && (
          <div className="py-4 text-center text-xs opacity-50">No matching options found</div>
        )}

        {/* + Add Custom Option Row */}
        {showCustomOption && (
          <button
            type="button"
            onClick={() => {
              handleToggle(trimmedQuery);
              setSearchQuery("");
            }}
            className="w-full text-left px-2.5 py-2 mb-1 rounded-lg text-xs transition-colors flex items-center gap-1.5 text-primary hover:bg-primary/10 cursor-pointer font-medium border-t border-border/40 mt-1 pt-2"
          >
            <span className="text-sm leading-none">+</span>
            <span>Add "{trimmedQuery}"</span>
          </button>
        )}
      </div>
    </div>
  );
}
