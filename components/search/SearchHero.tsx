"use client";

import { motion } from "framer-motion";
import SearchBar from "../search/SearchBar";
import TagPills from "../search/TagPills";

interface SearchHeroProps {
  defaultQuery?: string;
  onSearch: (query: string, tags: string[]) => void;
  onTagToggle: (tag: string) => void;
  selectedTags: string[];
}

export default function SearchHero({ 
  defaultQuery = "", 
  onSearch, 
  onTagToggle, 
  selectedTags 
}: SearchHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12 md:py-16"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4"
        >
          Find Your Perfect Workflow
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Discover powerful automation workflows to streamline your business processes. 
          Search by keywords, categories, or browse popular tags.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <SearchBar 
            defaultValue={defaultQuery}
            onSearch={(query) => onSearch(query, selectedTags)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TagPills 
            selectedTags={selectedTags}
            onTagToggle={onTagToggle}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
