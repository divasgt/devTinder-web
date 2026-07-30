import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { parseToArray } from "../utils/filterHelpers";

export default function FeedAISearch({
  filters,
  setFilters,
  showManualFilters,
  setShowManualFilters,
}) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const EXAMPLE_PROMPTS = ["frontend developers with 3+ years experience in Delhi"];

  return (
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

        <div className="flex items-center gap-1 shrink-0">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-fg/50 hover:text-red-500 hover:bg-red-500/10 transition-colors py-1 px-2.5 rounded-lg border border-transparent cursor-pointer hover:border-red-500/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
  );
}
