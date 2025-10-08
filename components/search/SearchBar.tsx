"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ defaultValue = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search workflows..."
          className="pl-10 pr-20 h-12 text-lg border-gray-200 focus:ring-2 focus:ring-[#007BFF] text-gray-900 focus:border-transparent rounded-xl"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 h-full right-12 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <Button
          type="submit"
          className="absolute inset-y-0 right-0 m-1 bg-gradient-to-r from-[#002B6B] to-[#007BFF] hover:brightness-110 text-white font-semibold px-6 rounded-lg shadow-md"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
