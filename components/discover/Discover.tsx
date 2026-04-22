"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Category, Store } from "@/lib/types";
import { CreatorCard } from "./CreatorCard";

type Filter = "all" | Category;

const FILTERS: Array<{ label: string; value: Filter }> = [
  { label: "All", value: "all" },
  { label: "AI & Automation", value: "ai" },
  { label: "Communities", value: "community" },
  { label: "Courses", value: "course" },
  { label: "Cohorts", value: "cohort" },
  { label: "Coaching", value: "coaching" },
  { label: "Templates", value: "template" },
];

export function Discover({ stores }: { stores: Store[] }) {
  const [active, setActive] = useState<Filter>("all");
  const visible =
    active === "all" ? stores : stores.filter((s) => s.cat === active);

  return (
    <section
      id="discover"
      className="max-w-[1200px] mx-auto px-6 md:px-12 pt-20 pb-[100px]"
    >
      <div className="flex items-baseline justify-between mb-8">
        <h2
          className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-off-white)]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Featured storefronts
        </h2>
        <a
          href="#"
          className="group text-sm font-medium text-[var(--color-gray-500)] hover:text-[var(--color-off-white)] flex items-center gap-1 hover:gap-2 transition-all duration-150"
        >
          See all
          <ArrowRight size={14} strokeWidth={2} />
        </a>
      </div>

      <div className="flex gap-2 mb-9 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              type="button"
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-sm font-medium px-4 py-[7px] min-h-11 md:min-h-0 rounded-full cursor-pointer transition-all duration-150 border ${
                isActive
                  ? "text-[var(--color-off-white)] border-[var(--color-gray-500)] bg-white/[0.07]"
                  : "text-[var(--color-gray-500)] bg-[var(--color-dark-700)] border-[var(--color-dark-600)] hover:text-[var(--color-off-white)] hover:border-[var(--color-dark-500)]"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((s) => (
          <CreatorCard key={s.id} store={s} />
        ))}
      </div>
    </section>
  );
}
