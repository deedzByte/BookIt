"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search services..." 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`
        absolute left-6 top-6 w-80 transition-all duration-300
        ${isFocused ? 'w-96' : 'w-80'}
      `}
    >
      <div className="relative">
        <Search
          className={`
            absolute left-4 top-1/2 -translate-y-1/2
            transition-colors duration-300
            ${isFocused ? 'text-sky-500' : 'text-gray-400'}
          `}
          size={20}
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            h-12 w-full rounded-full border px-11 pr-11
            bg-white/90 backdrop-blur shadow-xl outline-none
            transition-all duration-300
            ${isFocused 
              ? 'border-sky-400 shadow-sky-500/20' 
              : 'border-white/40'
            }
          `}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-0.5 hover:bg-gray-200 transition"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}