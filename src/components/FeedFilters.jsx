import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
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
  const [showManualFilters, setShowManualFilters] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const activeCount =
    (specsArray.length > 0 ? 1 : 0) +
    (skillsArray.length > 0 ? 1 : 0) +
    (statusArray.length > 0 ? 1 : 0) +
    (filters.minExp || filters.maxExp ? 1 : 0) +
    (filters.minAge || filters.maxAge ? 1 : 0) +
    (filters.city || filters.country ? 1 : 0);

  const handleAISearch = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/feed/ai-search`,
        { prompt: aiPrompt },
        { withCredentials: true }
      );

      const newFilters = res.data.data;
      if (newFilters) {
        setFilters(newFilters);
      }
    } catch (err) {
      console.error("AI Search failed:", err);
      alert(
        err.response?.data?.message ||
          "AI Search failed. You may have hit the API rate limit (please wait a few seconds and try again)."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      specialization: "",
      minExp: "",
      maxExp: "",
      status: "",
      skills: "",
      city: "",
      country: "",
      minAge: "",
      maxAge: "",
    });
    setAiPrompt("");
  };

  const handleExampleClick = (prompt) => {
    setAiPrompt(prompt);
  };

  const EXAMPLE_PROMPTS = ["Frontend developers with 3+ years experience in Delhi"];

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <form onSubmit={handleAISearch} className="w-full relative flex items-center mb-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe ideal dev (e.g. 'Frontend dev in Mumbai with 2+ yrs exp knowing React')..."
            className="w-full bg-surface-2 dark:bg-surface-2/60 text-fg placeholder:text-fg/40 text-sm md:text-base pl-4 pr-32 py-3.5 rounded-2xl border border-border/80 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all shadow-inner"
            disabled={isAnalyzing}
          />
          <button
            type="submit"
            disabled={isAnalyzing || !aiPrompt.trim()}
            className="absolute right-1.5 btn-primary text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-primary/30 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin text-base">✦</span>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Search</span>
              </>
            )}
          </button>
        </form>

        <div className="w-full flex justify-between items-start px-1">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-[11px] font-medium text-fg/50 mr-1">Try:</span>
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(prompt)}
                disabled={isAnalyzing}
                className="text-xs bg-surface hover:bg-surface-2 text-fg/80 hover:text-primary px-2.5 py-1 rounded-lg border border-border/60 transition-all hover:border-primary/40 cursor-pointer shadow-2xs truncate max-w-50 sm:max-w-none"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-fg/50 hover:text-red-500 hover:bg-red-500/10 transition-colors py-1 px-2.5 rounded-lg border border-transparent cursor-pointer"
              >
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
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span>Clear All</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowManualFilters(!showManualFilters)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-fg/80 hover:text-primary transition-colors py-1 px-2.5 rounded-lg hover:bg-surface-2 border border-transparent hover:border-border cursor-pointer"
            >
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
              >
                <path d="M21 4h-6m-4 0H3m18 8h-2m-4 0H3m18 8h-10m-4 0H3" />
                <circle cx="13" cy="4" r="2" />
                <circle cx="17" cy="12" r="2" />
                <circle cx="7" cy="20" r="2" />
              </svg>
              <span>{showManualFilters ? "Hide Filters" : "Manual Filters"}</span>
              {activeCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showManualFilters && (
        <div className="flex items-center flex-wrap gap-2.5 relative justify-center animate-fade-in">
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
      )}
    </div>
  );
}
