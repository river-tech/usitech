"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { mockWorkflows } from "../../../lib/search/mockData";
import SearchHero from "../../../components/search/SearchHero";
import ResultsHeader from "../../../components/search/ResultsHeader";
import ResultsList from "../../../components/search/ResultsList";
import PaginationBar from "../../../components/search/PaginationBar";

interface SearchClientProps {
  initialQuery: string;
  initialTags: string[];
  initialPage: number;
}

const PAGE_SIZE = 9;

export default function SearchClient({ initialQuery, initialTags, initialPage }: SearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  // Filter workflows based on query and tags
  const filteredWorkflows = useMemo(() => {
    let filtered = mockWorkflows;

    // Filter by query
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(workflow => 
        workflow.title.toLowerCase().includes(searchTerm) ||
        workflow.description.toLowerCase().includes(searchTerm) ||
        workflow.category.toLowerCase().includes(searchTerm) ||
        workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(workflow =>
        selectedTags.some(tag => workflow.tags.includes(tag))
      );
    }

    return filtered;
  }, [query, selectedTags]);

  // Paginate results
  const paginatedWorkflows = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredWorkflows.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredWorkflows, currentPage]);

  const totalPages = Math.ceil(filteredWorkflows.length / PAGE_SIZE);

  // Update URL when search parameters change
  const updateURL = (newQuery: string, newTags: string[], newPage: number) => {
    const params = new URLSearchParams();
    
    if (newQuery.trim()) {
      params.set('q', newQuery.trim());
    }
    
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    }
    
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }
    
    const queryString = params.toString();
    const newURL = queryString ? `/search?${queryString}` : '/search';
    
    router.push(newURL);
  };

  // Handle search
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    updateURL(newQuery, selectedTags, 1);
    
    // Simulate loading
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    setCurrentPage(1);
    updateURL(query, newTags, 1);
    
    // Simulate loading
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL(query, selectedTags, page);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const urlPage = parseInt(searchParams.get('page') || '1');
    
    if (urlQuery !== query || JSON.stringify(urlTags) !== JSON.stringify(selectedTags) || urlPage !== currentPage) {
      setQuery(urlQuery);
      setSelectedTags(urlTags);
      setCurrentPage(urlPage);
    }
  }, [searchParams, query, selectedTags, currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Hero Section */}
      <SearchHero
        defaultQuery={query}
        onSearch={handleSearch}
        onTagToggle={handleTagToggle}
        selectedTags={selectedTags}
      />

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-12"
      >
        <ResultsHeader
          query={query}
          total={filteredWorkflows.length}
          selectedTags={selectedTags}
        />

        <ResultsList
          workflows={paginatedWorkflows}
          loading={loading}
          query={query}
          selectedTags={selectedTags}
        />

        {!loading && filteredWorkflows.length > 0 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </motion.div>
    </div>
  );
}
