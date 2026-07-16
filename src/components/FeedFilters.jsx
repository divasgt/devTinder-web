import { useState, useEffect } from "react";
import FilterChipWrapper from "./FilterChipWrapper";
import { SPECIALIZATION_OPTIONS } from "../utils/filterOptions";

export default function FeedFilters({ filters, setFilters }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Draft state for specialization (only applied on clicking "Apply")
  const [draftSpecialization, setDraftSpecialization] = useState(filters.specialization || "");

  // Sync draft state when dropdown opens or when applied filters change externally
  useEffect(() => {
    if (activeDropdown === "specialization") {
      const timer = setTimeout(() => {
        setDraftSpecialization(filters.specialization || "");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeDropdown, filters.specialization]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleApplySpecialization = () => {
    setFilters((prev) => ({ ...prev, specialization: draftSpecialization }));
    setActiveDropdown(null);
  };

  const handleResetSpecialization = () => {
    setDraftSpecialization("");
    setFilters((prev) => ({ ...prev, specialization: "" }));
    setActiveDropdown(null);
  };

  return (
    <div className="flex items-center flex-wrap gap-2.5 relative">
      {/* Specialization filter chip */}
      <FilterChipWrapper
        name="specialization"
        label="Specialization"
        isActive={Boolean(filters.specialization)}
        activeSummary={filters.specialization}
        isOpen={activeDropdown === "specialization"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, specialization: "" }))}
        onReset={handleResetSpecialization}
        onApply={handleApplySpecialization}
      >
        {/* Content - Options */}
        <div className="space-y-1">
          {SPECIALIZATION_OPTIONS.map((spec) => (
            <button
              key={spec}
              type="button"
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                draftSpecialization === spec
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-surface-2 text-fg/80"
              }`}
              onClick={() => setDraftSpecialization((prev) => (prev === spec ? "" : spec))}
            >
              <span>{spec}</span>
              {draftSpecialization === spec && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </FilterChipWrapper>

      {/* Fullscreen overlay - click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
