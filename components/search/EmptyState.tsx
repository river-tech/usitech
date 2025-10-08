"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  query: string;
  selectedTags: string[];
}

export default function EmptyState({ query, selectedTags }: EmptyStateProps) {
  const hasFilters = query || selectedTags.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <Search className="w-8 h-8 text-gray-400" />
        </motion.div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No workflows found
        </h3>

        {hasFilters ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              We couldn't find any workflows matching your search criteria.
            </p>
            
            <div className="space-y-2">
              {query && (
                <p className="text-sm text-gray-500">
                  Search term: &quot;<span className="font-medium">{query}</span>&quot;
                </p>
              )}
              {selectedTags.length > 0 && (
                <p className="text-sm text-gray-500">
                  Selected tags: {selectedTags.join(", ")}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Try these suggestions:
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Check your spelling</li>
                <li>• Use different keywords</li>
                <li>• Try broader search terms</li>
                <li>• Remove some filters</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Start by searching for workflows or browsing popular tags.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={() => window.location.href = '/search'}
            className="bg-gradient-to-r from-[#002B6B] to-[#007BFF] hover:brightness-110 text-white font-semibold px-6 py-2 rounded-xl shadow-md"
          >
            <X className="w-4 h-4 mr-2" />
            Clear all filters
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
