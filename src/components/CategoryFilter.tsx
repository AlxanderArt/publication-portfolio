"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          aria-pressed={active === cat}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-white/[.12] text-[var(--fg)] border border-white/[.2]"
              : "border border-white/[.08] text-[var(--muted)] hover:border-white/[.14] hover:text-[var(--fg)]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
