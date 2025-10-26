"use client";

import { motion } from "framer-motion";
import { Category } from "../../lib/models/workflow";

interface TagPillsProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  categories: Category[];
}

export default function TagPills({ selectedTags, onTagToggle, categories }: TagPillsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Popular Tags
      </h3>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.slice(0, 12).map((tag, index) => {
          const isSelected = selectedTags.includes(tag.name);
          
          return (
            <motion.button
              key={tag.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagToggle(tag.name)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${isSelected 
                  ? 'bg-[#E6F0FF] text-[#002B6B] border-2 border-[#BBD4FF] shadow-sm' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                }
              `}
            >
              {tag.name}
              <span className="ml-1 text-xs opacity-60">({tag.workflows_count})</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
