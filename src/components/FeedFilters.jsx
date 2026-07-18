import { useState, useEffect } from "react";
import FilterChipWrapper from "./FilterChipWrapper";
import MultiSelectFilterContent from "./MultiSelectFilterContent";
import { SPECIALIZATION_OPTIONS, SKILL_OPTIONS } from "../utils/filterOptions";

export default function FeedFilters({ filters, setFilters }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Helper to parse comma-separated string into array
  const parseToArray = (str) =>
    str
      ? str
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  // Draft states for multi-select arrays
  const [draftSpecializations, setDraftSpecializations] = useState(() =>
    parseToArray(filters.specialization)
  );
  const [draftSkills, setDraftSkills] = useState(() => parseToArray(filters.skills));

  // Sync draft states when dropdowns open
  useEffect(() => {
    if (activeDropdown === "specialization") {
      const timer = setTimeout(() => {
        setDraftSpecializations(parseToArray(filters.specialization));
      }, 0);
      return () => clearTimeout(timer);
    }
    if (activeDropdown === "skills") {
      const timer = setTimeout(() => {
        setDraftSkills(parseToArray(filters.skills));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeDropdown, filters.specialization, filters.skills]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Specialization handlers
  const handleApplySpecialization = () => {
    setFilters((prev) => ({
      ...prev,
      specialization: draftSpecializations.join(", "),
    }));
    setActiveDropdown(null);
  };

  const handleResetSpecialization = () => {
    setDraftSpecializations([]);
    setFilters((prev) => ({ ...prev, specialization: "" }));
    setActiveDropdown(null);
  };

  // Skills handlers
  const handleApplySkills = () => {
    setFilters((prev) => ({
      ...prev,
      skills: draftSkills.join(", "),
    }));
    setActiveDropdown(null);
  };

  const handleResetSkills = () => {
    setDraftSkills([]);
    setFilters((prev) => ({ ...prev, skills: "" }));
    setActiveDropdown(null);
  };

  // Helper for active summary text on chips
  const getSummary = (strArray) => {
    if (!strArray || strArray.length === 0) return null;
    if (strArray.length === 1) return strArray[0];
    return `${strArray.length} Selected`;
  };

  const specsArray = parseToArray(filters.specialization);
  const skillsArray = parseToArray(filters.skills);

  return (
    <div className="flex items-center flex-wrap gap-2.5 relative">
      {/* Specialization filter chip */}
      <FilterChipWrapper
        name="specialization"
        label="Specialization"
        isActive={specsArray.length > 0}
        activeSummary={getSummary(specsArray)}
        isOpen={activeDropdown === "specialization"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, specialization: "" }))}
        onReset={handleResetSpecialization}
        onApply={handleApplySpecialization}
      >
        <MultiSelectFilterContent
          options={SPECIALIZATION_OPTIONS}
          selectedValues={draftSpecializations}
          onChange={setDraftSpecializations}
          placeholder="Search specializations..."
          allowCustom={true}
        />
      </FilterChipWrapper>

      {/* Skills filter chip */}
      <FilterChipWrapper
        name="skills"
        label="Skills"
        isActive={skillsArray.length > 0}
        activeSummary={getSummary(skillsArray)}
        isOpen={activeDropdown === "skills"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, skills: "" }))}
        onReset={handleResetSkills}
        onApply={handleApplySkills}
      >
        <MultiSelectFilterContent
          options={SKILL_OPTIONS}
          selectedValues={draftSkills}
          onChange={setDraftSkills}
          placeholder="Search skills (e.g. React, Node)..."
          allowCustom={true}
        />
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
