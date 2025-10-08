"use client";

import { motion } from "framer-motion";
import { Workflow } from "../../lib/search/types";
import WorkflowCard from "../shared/WorkflowCard";
import EmptyState from "./EmptyState";
import SkeletonCard from "./SkeletonCard";

interface ResultsListProps {
  workflows: Workflow[];
  loading: boolean;
  query: string;
  selectedTags: string[];
}

export default function ResultsList({ workflows, loading, query, selectedTags }: ResultsListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return <EmptyState query={query} selectedTags={selectedTags} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {workflows.map((workflow, index) => (
        <WorkflowCard 
          key={workflow.id} 
          workflow={workflow}
        />
      ))}
    </motion.div>
  );
}
