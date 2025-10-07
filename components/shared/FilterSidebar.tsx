import { Button } from "../ui/button";
import { Star, X } from "lucide-react";
import { workflows } from "../../lib/data";
import { EFilter } from "@/app/modal/EFilter";

export default function FilterSidebar({ filters, setFilters }: any) {
  const categories = Array.from(new Set(workflows.map((w: any) => w.category)));

  return (
    <div>

    <div
      className={`
        lg:static inset-y-0 left-0 z-10 w-80 
        border-r border-gray-100 
        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        transform transition-transform duration-300 ease-in-out 
        lg:transform-none overflow-y-auto rounded-r-3xl
        h-fit 

      `}
    >
      {/* Nền gradient động */}
      <div className="p-6 py-10 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] animate-gradient-move bg-[length:300%_300%] text-white min-h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
            Filters
          </h2>
        </div>

        {/* Category Filter */}
        <div className="mb-6 rounded-2xl border border-white/20 bg-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all duration-200">
          <div className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
              Categories
            </h3>
            <div className="space-y-3">
              {categories.map((category: string) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          categories: [...filters.categories, category],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter(
                            (c: string) => c !== category
                          ),
                        });
                      }
                    }}
                    className="rounded border-white/40 bg-transparent text-sky-300 focus:ring-sky-300"
                  />
                  <span className="ml-3 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 rounded-2xl border border-white/20 bg-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all duration-200">
          <div className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
              Price Range
            </h3>
            <div className="space-y-3">
              {Object.values(EFilter).map((price) => (
                <label
                  key={price.toString()}
                  className="flex items-center cursor-pointer group hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(price)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          priceRange: [...filters.priceRange, price],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          priceRange: filters.priceRange.filter(
                            (p: string) => p !== price.toString()
                          ),
                        });
                      }
                    }}
                    className="rounded border-white/40 bg-transparent text-sky-300 focus:ring-sky-300"
                  />
                  <span className="ml-3 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {price.toString()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8 rounded-2xl border border-white/20 bg-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all duration-200">
          <div className="p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
              Rating
            </h3>
            <div className="space-y-3">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center cursor-pointer group hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() =>
                      setFilters({ ...filters, minRating: rating })
                    }
                    className="border-white/40 bg-transparent text-sky-300 focus:ring-sky-300"
                  />
                  <span className="ml-3 text-sm flex items-center text-white/90 group-hover:text-white transition-colors">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? "text-yellow-300 fill-current"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                   
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
      </div>
    </div>
    <Button
      onClick={() =>
        setFilters({
          search: "",
          categories: [],
          priceRange: [],
          minRating: 0,
        })
      }
      className="w-full mt-10 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-sm transition-all duration-200"
    >
      Clear All Filters
    </Button>
    </div>
  );
}