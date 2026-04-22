import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function BlogCard({ title, description, date, slug, tags }: PostMeta) {
  const formatted = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col gap-3 p-6 rounded-[var(--radius-lg)] border border-[var(--color-dark-700)] bg-[var(--color-dark-800)] hover:border-[var(--color-dark-500)] hover:bg-[var(--color-dark-700)] transition-all duration-200"
    >
      <div className="flex items-center gap-2 flex-wrap">
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--color-orange-tint)] text-[var(--color-orange)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-base font-semibold text-[var(--color-off-white)] font-[family-name:var(--font-display)] leading-snug group-hover:text-white transition-colors">
        {title}
      </h2>

      <p className="text-sm text-[var(--color-gray-400)] leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-xs text-[var(--color-gray-500)]">{formatted}</span>
        <span className="text-xs font-medium text-[var(--color-orange)] opacity-0 group-hover:opacity-100 transition-opacity">
          Read →
        </span>
      </div>
    </Link>
  );
}
