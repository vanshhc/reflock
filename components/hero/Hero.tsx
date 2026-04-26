import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroStorefronts } from "./HeroStorefronts";
import { HeroSearch } from "./HeroSearch"; // typewriter search

export function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-[32px] md:pt-[48px] pb-[60px] md:pb-[100px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
      <div className="rf-rise">
        <p
          className="text-xs font-semibold uppercase text-[var(--color-orange)] mb-6"
          style={{ letterSpacing: "0.08em" }}
        >
          India&apos;s creator marketplace
        </p>

        <h1
          className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-off-white)] mb-6"
          style={{
            fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textWrap: "pretty",
          }}
        >
          Where{" "}
          <span className="not-italic text-[var(--color-orange)]">
            India
          </span> does business <span className="not-italic text-[var(--color-orange)]">
            online.
          </span>

        </h1>

        <p
          className="text-lg text-[var(--color-gray-500)] leading-[1.65] max-w-[440px] mb-10"
          style={{ textWrap: "pretty" }}
        >
          The best paid communities, cohorts, templates, and AI tools — built
          by India&apos;s top creators, all in one place.
        </p>

        <div className="flex flex-col gap-4">
          <HeroSearch />
          <Link
            href="#"
            className="group text-base font-medium text-[var(--color-gray-400)] hover:text-[var(--color-off-white)] flex items-center gap-2 transition-colors duration-200 w-fit"
          >
            Start selling
            <ChevronRight size={16} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex gap-8 mt-14 pt-10 border-t border-white/5">
          {[
            { value: "1,200+", label: "Products" },
            { value: "340+", label: "Creators" },
            { value: "18k+", label: "Buyers" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-off-white)]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs font-medium uppercase text-[var(--color-gray-600)]"
                style={{ letterSpacing: "0.04em" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rf-rise rf-rise-3">
        <HeroStorefronts />
      </div>
    </section>
  );
}
