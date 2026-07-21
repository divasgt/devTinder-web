import { useState, useEffect } from "react";
import FilterChipWrapper from "./FilterChipWrapper";
import MultiSelectFilterContent from "./MultiSelectFilterContent";
import RangeFilterContent from "./RangeFilterContent";
import LocationFilterContent from "./LocationFilterContent";
import {
  SPECIALIZATION_OPTIONS,
  SKILL_OPTIONS,
  EXPERIENCE_OPTIONS,
  POPULAR_LOCATIONS,
  EMPLOYMENT_STATUS_OPTIONS,
} from "../utils/filterOptions";

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
  // Draft state for status multi-select
  const [draftStatus, setDraftStatus] = useState(() => parseToArray(filters.status));

  // Draft states for ranges
  const [draftMinExp, setDraftMinExp] = useState(filters.minExp || "");
  const [draftMaxExp, setDraftMaxExp] = useState(filters.maxExp || "");
  const [draftMinAge, setDraftMinAge] = useState(filters.minAge || "");
  const [draftMaxAge, setDraftMaxAge] = useState(filters.maxAge || "");

  // Draft states for location
  const [draftCity, setDraftCity] = useState(filters.city || "");
  const [draftCountry, setDraftCountry] = useState(filters.country || "");

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
    if (activeDropdown === "experience") {
      const timer = setTimeout(() => {
        setDraftMinExp(filters.minExp || "");
        setDraftMaxExp(filters.maxExp || "");
      }, 0);
      return () => clearTimeout(timer);
    }
    if (activeDropdown === "age") {
      const timer = setTimeout(() => {
        setDraftMinAge(filters.minAge || "");
        setDraftMaxAge(filters.maxAge || "");
      }, 0);
      return () => clearTimeout(timer);
    }
    if (activeDropdown === "location") {
      const timer = setTimeout(() => {
        setDraftCity(filters.city || "");
        setDraftCountry(filters.country || "");
      }, 0);
      return () => clearTimeout(timer);
    }
    if (activeDropdown === "status") {
      const timer = setTimeout(() => {
        setDraftStatus(parseToArray(filters.status));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [
    activeDropdown,
    filters.specialization,
    filters.skills,
    filters.minExp,
    filters.maxExp,
    filters.minAge,
    filters.maxAge,
    filters.city,
    filters.country,
    filters.status,
  ]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Handlers

  const handleApplySpecialization = () => {
    setFilters((prev) => ({ ...prev, specialization: draftSpecializations.join(", ") }));
    setActiveDropdown(null);
  };
  const handleResetSpecialization = () => {
    setDraftSpecializations([]);
    setFilters((prev) => ({ ...prev, specialization: "" }));
    setActiveDropdown(null);
  };

  const handleApplySkills = () => {
    setFilters((prev) => ({ ...prev, skills: draftSkills.join(", ") }));
    setActiveDropdown(null);
  };
  const handleResetSkills = () => {
    setDraftSkills([]);
    setFilters((prev) => ({ ...prev, skills: "" }));
    setActiveDropdown(null);
  };

  const handleApplyExperience = () => {
    setFilters((prev) => ({ ...prev, minExp: draftMinExp, maxExp: draftMaxExp }));
    setActiveDropdown(null);
  };
  const handleResetExperience = () => {
    setDraftMinExp("");
    setDraftMaxExp("");
    setFilters((prev) => ({ ...prev, minExp: "", maxExp: "" }));
    setActiveDropdown(null);
  };

  const handleApplyAge = () => {
    setFilters((prev) => ({ ...prev, minAge: draftMinAge, maxAge: draftMaxAge }));
    setActiveDropdown(null);
  };
  const handleResetAge = () => {
    setDraftMinAge("");
    setDraftMaxAge("");
    setFilters((prev) => ({ ...prev, minAge: "", maxAge: "" }));
    setActiveDropdown(null);
  };

  const handleApplyLocation = () => {
    setFilters((prev) => ({ ...prev, city: draftCity, country: draftCountry }));
    setActiveDropdown(null);
  };
  const handleResetLocation = () => {
    setDraftCity("");
    setDraftCountry("");
    setFilters((prev) => ({ ...prev, city: "", country: "" }));
    setActiveDropdown(null);
  };

  const handleApplyStatus = () => {
    setFilters((prev) => ({ ...prev, status: draftStatus.join(", ") }));
    setActiveDropdown(null);
  };
  const handleResetStatus = () => {
    setDraftStatus([]);
    setFilters((prev) => ({ ...prev, status: "" }));
    setActiveDropdown(null);
  };

  // Summary Helpers
  const getArraySummary = (strArray) => {
    if (!strArray || strArray.length === 0) return null;
    if (strArray.length === 1) return strArray[0];
    return `${strArray.length} Selected`;
  };

  const getRangeSummary = (min, max, unit = "") => {
    if (min !== "" && max !== "") return `${min} - ${max} ${unit}`;
    if (min !== "") return `${min}+ ${unit}`;
    if (max !== "") return `Up to ${max} ${unit}`;
    return null;
  };

  const getLocationSummary = (city, country) => {
    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    if (country) return country;
    return null;
  };

  const specsArray = parseToArray(filters.specialization);
  const skillsArray = parseToArray(filters.skills);
  const statusArray = parseToArray(filters.status);

  return (
    <div className="flex items-center flex-wrap gap-2.5 relative">
      {/* Specialization filter chip */}
      <FilterChipWrapper
        name="specialization"
        label="Specialization"
        isActive={specsArray.length > 0}
        activeSummary={getArraySummary(specsArray)}
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

      {/* Experience filter chip */}
      <FilterChipWrapper
        name="experience"
        label="Experience"
        isActive={Boolean(filters.minExp || filters.maxExp)}
        activeSummary={getRangeSummary(filters.minExp, filters.maxExp, "Yrs")}
        isOpen={activeDropdown === "experience"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, minExp: "", maxExp: "" }))}
        onReset={handleResetExperience}
        onApply={handleApplyExperience}
        dropdownWidth="w-72"
      >
        <RangeFilterContent
          minValue={draftMinExp}
          maxValue={draftMaxExp}
          onMinChange={setDraftMinExp}
          onMaxChange={setDraftMaxExp}
          minPlaceholder="Min Yrs"
          maxPlaceholder="Max Yrs"
          unit="Years"
          presets={EXPERIENCE_OPTIONS}
        />
      </FilterChipWrapper>

      {/* Employment Status chip */}
      <FilterChipWrapper
        name="status"
        label="Status"
        isActive={statusArray.length > 0}
        activeSummary={getArraySummary(statusArray)}
        isOpen={activeDropdown === "status"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, status: "" }))}
        onReset={handleResetStatus}
        onApply={handleApplyStatus}
        dropdownWidth="w-56"
      >
        <MultiSelectFilterContent
          options={EMPLOYMENT_STATUS_OPTIONS}
          selectedValues={draftStatus}
          onChange={setDraftStatus}
          placeholder="Search status..."
          allowCustom={false}
        />
      </FilterChipWrapper>

      {/* Skills filter chip */}
      <FilterChipWrapper
        name="skills"
        label="Skills"
        isActive={skillsArray.length > 0}
        activeSummary={getArraySummary(skillsArray)}
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

      {/* Location filter chip */}
      <FilterChipWrapper
        name="location"
        label="Location"
        isActive={Boolean(filters.city || filters.country)}
        activeSummary={getLocationSummary(filters.city, filters.country)}
        isOpen={activeDropdown === "location"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, city: "", country: "" }))}
        onReset={handleResetLocation}
        onApply={handleApplyLocation}
        dropdownWidth="w-72"
      >
        <LocationFilterContent
          cityValue={draftCity}
          countryValue={draftCountry}
          onCityChange={setDraftCity}
          onCountryChange={setDraftCountry}
          presets={POPULAR_LOCATIONS}
        />
      </FilterChipWrapper>

      {/* Age filter chip */}
      <FilterChipWrapper
        name="age"
        label="Age"
        isActive={Boolean(filters.minAge || filters.maxAge)}
        activeSummary={getRangeSummary(filters.minAge, filters.maxAge, "Yrs")}
        isOpen={activeDropdown === "age"}
        onToggle={toggleDropdown}
        onClearSingle={() => setFilters((prev) => ({ ...prev, minAge: "", maxAge: "" }))}
        onReset={handleResetAge}
        onApply={handleApplyAge}
        dropdownWidth="w-60"
      >
        <RangeFilterContent
          minValue={draftMinAge}
          maxValue={draftMaxAge}
          onMinChange={setDraftMinAge}
          onMaxChange={setDraftMaxAge}
          minPlaceholder="Min"
          maxPlaceholder="Max"
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
