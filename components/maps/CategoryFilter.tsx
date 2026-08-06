"use client";

interface Category {
  id: string;
  label: string;
  icon: string;
}

const categories: Category[] = [
  { id: "all", label: "All", icon: "📍" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "shop", label: "Shops", icon: "🛍️" },
  { id: "fashion", label: "Fashion", icon: "👔" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "transport", label: "Transport", icon: "🚗" },
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="absolute left-6 top-24 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`
            flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2
            text-sm font-medium transition-all duration-300
            ${
              selected === category.id
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                : "bg-white/90 text-gray-700 backdrop-blur hover:bg-white"
            }
          `}
        >
          <span>{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}