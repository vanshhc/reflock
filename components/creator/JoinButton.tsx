"use client";

import { track } from "@/lib/track";

export function JoinButton({
  accentColor,
  handle,
  offeringName,
}: {
  accentColor: string;
  handle: string;
  offeringName: string;
}) {
  return (
    <button
      onClick={() => track("product_click", handle, offeringName)}
      className="w-full text-base font-bold tracking-[0.01em] text-[var(--color-off-white)] py-3.5 rounded-full transition-opacity duration-150 hover:opacity-90 active:scale-[0.97]"
      style={{ background: accentColor }}
    >
      Join →
    </button>
  );
}
