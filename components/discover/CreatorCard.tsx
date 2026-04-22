"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import type { Store } from "@/lib/types";
import { track } from "@/lib/track";

export function CreatorCard({ store }: { store: Store }) {
  return (
    <Link
      href={`/${store.handle}`}
      onClick={() => track("store_visit", store.handle)}
      className="group rounded-[16px] p-6 cursor-pointer flex flex-col gap-0 transition-all duration-200 hover:-translate-y-[3px] hover:border-white/10 hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
      style={{
        background: "var(--color-dark-800)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-start justify-between mb-[14px]">
        <div className="flex items-center gap-3">
          <div
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold uppercase text-[1.1rem]"
            style={{
              background: `${store.color}26`,
              color: store.color,
              letterSpacing: "-0.03em",
            }}
          >
            {store.abbr}
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-off-white)]">
              {store.businessName}
            </span>
            <span className="text-xs text-[var(--color-gray-600)]">
              by {store.ownerName}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--color-gray-500)] leading-[1.55] mb-4 line-clamp-2">
        {store.bio}
      </p>

      <div className="flex items-center justify-between pt-[14px] border-t border-white/5">
        <span className="text-xs text-[var(--color-gray-600)] flex items-center gap-1">
          <Users size={11} strokeWidth={2} />
          <strong className="text-[var(--color-gray-500)] font-medium">
            {store.buyers}
          </strong>
        </span>
        <span className="text-xs font-semibold px-3.5 py-[7px] min-h-11 md:min-h-0 inline-flex items-center rounded-full border border-[var(--color-dark-500)] bg-transparent text-[var(--color-gray-400)] group-hover:border-[var(--color-gray-500)] group-hover:text-[var(--color-off-white)] group-hover:bg-white/5 transition-all duration-150 whitespace-nowrap">
          Visit store
        </span>
      </div>
    </Link>
  );
}
