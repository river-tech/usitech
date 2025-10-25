"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { useWorkflow } from "../../../lib/contexts/WorkflowContext"; // context ở dây nè nha cha!
import { Search, Star } from "lucide-react";
import SearchBar from "../../../components/search/SearchBar";
import TagPills from "../../../components/search/TagPills";
import WorkflowCard from "../../../components/shared/WorkflowCard";
import SortDropdown from "../../../components/shared/Dropdown";
import { EFilter } from "@/app/modal/EFilter";

export default function WorkflowsPage() {
  // Context use ở dây nè nha ông nội!
  const { allWorkflows, isLoading, error, categories } = useWorkflow();

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    search: "",
    categoryIds: categoryFromUrl ? [categoryFromUrl] : [] as string[],
    priceRange: [] as EFilter[],
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  // Bỏ workflow filter vô đây nè! Filter với sort xài context ở trên
  const filteredWorkflows = useMemo(() => {
    return allWorkflows
      .filter((workflow) => {
        // Filter search
        if (
          filters.search &&
          !workflow.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !workflow.description.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        // Filter category
        if (filters.categoryIds.length > 0) {
          if (!workflow.categories.some(category => filters.categoryIds.includes(category))) return false;
        }
        // Filter price (VND)
        if (filters.priceRange.length > 0) {
          const price = Number(workflow.price);
          const matchesRange = filters.priceRange.some(range => {
            switch (range) {
              case EFilter.FREE: return price === 0;
              case EFilter.UNDER_50: return price > 0 && price < 1200000; // Under 1,200,000₫
              case EFilter._50_100: return price >= 1200000 && price <= 2400000; // 1,200,000₫ - 2,400,000₫
              case EFilter.OVER_100: return price > 2400000; // Over 2,400,000₫
            }
          });
          if (!matchesRange) return false;
        }
        // Filter rating
        if (filters.minRating > 0 && (workflow.rating_avg || 0) < filters.minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        switch (sortBy) {
          case "newest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "rating": return (b.rating_avg || 0) - (a.rating_avg || 0);
          case "price-low": return priceA - priceB;
          case "price-high": return priceB - priceA;
          case "name": return a.title.localeCompare(b.title);
          default:
            return (b.downloads_count || 0) - (a.downloads_count || 0);
        }
      });
  }, [allWorkflows, filters, sortBy]);

  // Sync category from URL mỗi lần đổi
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters(prev => ({
        ...prev,
        categoryIds: [categoryFromUrl]
      }));
    }
  }, [searchParams]);

  // Show list
  const visibleWorkflows = filteredWorkflows.slice(0, visibleCount);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading workflows...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 font-medium mb-2">Error Loading Workflows</div>
            <div className="text-red-500 text-sm">{error}</div>
          </div>
        </div>
      </div>
    );
  }
  const showLoadMore = visibleCount < filteredWorkflows.length;

  const handleLoadMore = () => setVisibleCount(prev => prev + 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="relative bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] border-b border-gray-100 top-0 z-30 animate-gradient-move"
        style={{
          backgroundSize: "300% 300%",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-white md:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Workflow Marketplace
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Discover professional automation workflows designed to streamline your business operations
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="space-y-6">
          <SearchBar
            defaultValue={filters.search}
            onSearch={(q) => setFilters((prev) => ({ ...prev, search: q }))}
          />
          <TagPills
            selectedTags={filters.categoryIds}
            categories={categories}
            onTagToggle={(tag) =>
              setFilters((prev) => ({
                ...prev,
                categoryIds: prev.categoryIds.includes(tag)
                  ? prev.categoryIds.filter((t) => t !== tag)
                  : [...prev.categoryIds, tag],
              }))
            }
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              {[
                { key: EFilter.FREE, label: "Free" },
                { key: EFilter.UNDER_50, label: "Under 1,200,000₫" },
                { key: EFilter._50_100, label: "1,200,000₫ - 2,400,000₫" },
                { key: EFilter.OVER_100, label: "Over 2,400,000₫" },
              ].map((r) => {
                const active = filters.priceRange.includes(r.key);
                return (
                  <button
                    key={r.label}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: active
                          ? prev.priceRange.filter((v) => v !== r.key)
                          : [...prev.priceRange, r.key],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
                      active
                        ? "bg-[#E6F0FF] text-[#002B6B] border-[#BBD4FF]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
              {filters.priceRange.length > 0 && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, priceRange: [] }))}
                  className="text-xs text-gray-500 underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Min Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, minRating: prev.minRating === n ? 0 : n }))
                    }
                    className="cursor-pointer"
                    aria-label={`Minimum ${n} star`}
                  >
                    <Star className={`w-5 h-5 ${filters.minRating >= n ? "text-yellow-500" : "text-gray-300"}`} fill={filters.minRating >= n ? "#F59E0B" : "none"} />
                  </button>
                ))}
              </div>
              {filters.minRating > 0 && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, minRating: 0 }))}
                  className="text-xs text-gray-500 underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div>
            {/* Active Filters */}
            {filters.categoryIds.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-blue-800">Active filters:</span>
                  {filters.categoryIds.map((categoryId) => (
                    <span
                      key={categoryId}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {categories.find(category => category.id === categoryId)?.name}
                      <button
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            categoryIds: prev.categoryIds.filter(c => c !== categoryId)
                          }));
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sort bar */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-700">
                {filteredWorkflows.length} workflow
                {filteredWorkflows.length !== 1 ? "s" : ""} found
              </p>
              <SortDropdown
                className="text-sm text-gray-600"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Bỏ workflow vô đây nè cu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>

            {showLoadMore && (
              <div className="text-center mt-16">
                <Button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-sm transition-colors"
                >
                  Load More Workflows ↓
                </Button>
              </div>
            )}

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No workflows found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      search: "",
                      categoryIds: [],
                      priceRange: [],
                      minRating: 0,
                    })
                  }
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}