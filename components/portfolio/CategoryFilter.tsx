"use client";

import { PORTFOLIO_CATEGORIES, type PortfolioCategory } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

interface Props {
  active: PortfolioCategory;
  onChange: (cat: PortfolioCategory) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {PORTFOLIO_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "whitespace-nowrap px-4 py-1.5 text-sm border transition-all duration-200 shrink-0 min-h-9",
            active === cat
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
