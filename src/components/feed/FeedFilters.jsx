import { useState } from "react";
import FeedAISearch from "./FeedAISearch";
import FeedManualFilters from "./FeedManualFilters";

export default function FeedFilters({ filters, setFilters }) {
  const [showManualFilters, setShowManualFilters] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <FeedAISearch
        filters={filters}
        setFilters={setFilters}
        showManualFilters={showManualFilters}
        setShowManualFilters={setShowManualFilters}
      />
      {showManualFilters && <FeedManualFilters filters={filters} setFilters={setFilters} />}
    </div>
  );
}
