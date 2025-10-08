"use client";

import { motion } from "framer-motion";

interface ResultsHeaderProps {
  query: string;
  total: number;
  selectedTags: string[];
}

export default function ResultsHeader({ query, total, selectedTags }: ResultsHeaderProps) {
  const hasFilters = query || selectedTags.length > 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {hasFilters ? (
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results
              </h2>
              <div className="text-sm text-gray-600">
                {query && (
                  <span>for &quot;<span className="font-medium text-[#007BFF]">{query}</span>&quot;</span>
                )}
                {selectedTags.length > 0 && (
                  <span className="ml-2">
                    with tags: <span className="font-medium text-[#007BFF]">{selectedTags.join(", ")}</span>
                  </span>
                )}
                <span className="ml-2 font-medium">
                  — {total} {total === 1 ? 'workflow' : 'workflows'} found
                </span>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                All Workflows
              </h2>
              <p className="text-sm text-gray-600">
                {total} {total === 1 ? 'workflow' : 'workflows'} available
              </p>
            </div>
          )}
        </div>
        
        {hasFilters && (
          <div className="text-sm text-gray-500">
            <span aria-live="polite">
              Showing {total} result{total !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
