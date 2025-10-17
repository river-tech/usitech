"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { workflows } from "../../../lib/data";
import { Search, Star } from "lucide-react";
import SearchBar from "../../../components/search/SearchBar";
import TagPills from "../../../components/search/TagPills";
import WorkflowCard from "../../../components/shared/WorkflowCard";
import SortDropdown from "../../../components/shared/Dropdown";
import { EFilter } from "@/app/modal/EFilter";

export default function WorkflowsPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    search: "",
    categories: categoryFromUrl ? [categoryFromUrl] : [] as string[],
    priceRange: [] as EFilter[],
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6); // 👈 số lượng hiện tại

  // --- 1️⃣ Lọc và sắp xếp workflows ---
  const filteredWorkflows = useMemo(() => {
	const filtered = workflows.filter((workflow) => {
	  // --- Search filter ---
	  if (
		filters.search &&
		!workflow.title.toLowerCase().includes(filters.search.toLowerCase()) &&
		!workflow.description.toLowerCase().includes(filters.search.toLowerCase())
	  ) {
		return false;
	  }
  
	  // --- Category filter ---
	  if (
		filters.categories.length > 0 &&
		!filters.categories.includes(workflow.category)
	  ) {
		return false;
	  }
  
	  // --- Price range filter ---
	  if (filters.priceRange.length > 0) {
		const price = Number(workflow.price); // đảm bảo là số
  
		// Hàm kiểm tra một workflow có nằm trong phạm vi đã chọn không
		const matchesRange = filters.priceRange.some((range) => {
		  switch (range) {
			case EFilter.FREE:
			  return price === 0;
			case EFilter.UNDER_50:
			  return price > 0 && price < 50;
			case EFilter._50_100:
			  return price >= 50 && price <= 100;
			case EFilter.OVER_100:
			  return price > 100;
			default:
			  return false;
		  }
		});
  
		if (!matchesRange) return false;
	  }
  
	  // --- Rating filter ---
	  if (filters.minRating > 0 && workflow.rating < filters.minRating) {
		return false;
	  }
  
	  return true;
	});
  
	// --- Sorting ---
	filtered.sort((a, b) => {
	  const priceA = Number(a.price);
	  const priceB = Number(b.price);
  
	  switch (sortBy) {
		case "newest":
		  // Assuming id is a number, sort descending (newest first)
		  return b.id - a.id;
		case "rating":
		  return b.rating - a.rating;
		case "price-low":
		  return priceA - priceB;
		case "price-high":
		  return priceB - priceA;
		case "name":
		  return a.title.localeCompare(b.title);
		default: // popular
		  return b.downloads - a.downloads;
	  }
	});
  
	return filtered;
  }, [filters, sortBy]);
  // Update filters when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryFromUrl]
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  // --- 2️⃣ Danh sách hiển thị ---
  const visibleWorkflows = filteredWorkflows.slice(0, visibleCount);
  const showLoadMore = visibleCount < filteredWorkflows.length;

  // --- 3️⃣ Hàm load thêm ---
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  

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
              Discover professional automation workflows designed to streamline
              your business operations
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Unified search controls */}
        <div className="space-y-6">
          <SearchBar
            defaultValue={filters.search}
            onSearch={(q) => setFilters((prev) => ({ ...prev, search: q }))}
          />
          <TagPills
            selectedTags={filters.categories}
            onTagToggle={(tag) =>
              setFilters((prev) => ({
                ...prev,
                categories: prev.categories.includes(tag)
                  ? prev.categories.filter((t) => t !== tag)
                  : [...prev.categories, tag],
              }))
            }
          />

          {/* Price & Rating filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Price filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              {[
                { key: EFilter.FREE, label: "Free" },
                { key: EFilter.UNDER_50, label: "Under $50" },
                { key: EFilter._50_100, label: "$50 – $100" },
                { key: EFilter.OVER_100, label: "Over $100" },
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

            {/* Rating filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Min Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFilters((prev) => ({ ...prev, minRating: prev.minRating === n ? 0 : n }))}
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

          {/* Results */}
          <div>
            {/* Active Filters */}
            {filters.categories.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-blue-800">Active filters:</span>
                  {filters.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {category}
                      <button
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== category)
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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>

            {/* Load more */}
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

            {/* No results */}
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
                      categories: [],
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