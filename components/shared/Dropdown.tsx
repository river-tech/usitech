import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  className?: string;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function SortDropdown({ className, sortBy, setSortBy }: SortDropdownProps) {
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
  ];

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const selectedOption =
    sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

  return (
    <div
      className={`relative outline-none focus:outline-none focus:ring-0 inline-block text-left ${className || ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-md px-4 py-2 pr-4 text-sm shadow-sm cursor-pointer min-w-[180px]"
        onClick={() => setOpen((prev: boolean) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className="ml-2 w-4 h-4 text-gray-400" />
      </button>
      <div
        className="absolute z-10 mt-2 w-full"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <ul
          className={`
            bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm
            transition-all duration-300 ease-out
            ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
          `}
          style={{
            maxHeight: open ? 300 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s, transform 0.3s",
          }}
          role="listbox"
        >
          {sortOptions.map((option, idx) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-sky-50 transition-colors duration-150 ${
                sortBy === option.value ? "bg-sky-100 text-sky-700 font-semibold" : ""
              }`}
              style={{
                transitionDelay: open ? `${idx * 30}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(-8px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "0.2s, 0.2s",
                transitionTimingFunction: "ease, ease",
              }}
              onClick={() => {
                setSortBy(option.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={sortBy === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
