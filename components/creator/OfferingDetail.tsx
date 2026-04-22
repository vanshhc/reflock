import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import type { Store, Offering, OfferingType } from "@/lib/types";
import { JoinButton } from "./JoinButton";

function priceUnit(type: OfferingType, price: string): string {
  if (price.includes("/mo")) return "";
  if (type === "Coaching") return "/ session";
  if (type === "Course" || type === "Cohort") return "/ person";
  return "";
}

function hexAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `${hex}${a}`;
}

export function OfferingDetail({
  store,
  offering,
}: {
  store: Store;
  offering: Offering;
}) {
  const unit = priceUnit(offering.type, offering.price);
  const avatarBg = hexAlpha(store.color, 0.15);
  const avatarBorder = hexAlpha(store.color, 0.2);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-dark-900)" }}>
      {/* Breadcrumb */}
      <div className="pt-[84px] max-w-[1200px] mx-auto px-6 md:px-12 flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-600)]">
        <Link
          href="/"
          className="hover:text-[var(--color-gray-400)] transition-colors duration-150"
        >
          re.
        </Link>
        <ChevronRight size={12} className="text-[var(--color-gray-700)]" />
        <Link
          href="/#discover"
          className="hover:text-[var(--color-gray-400)] transition-colors duration-150"
        >
          Creators
        </Link>
        <ChevronRight size={12} className="text-[var(--color-gray-700)]" />
        <Link
          href={`/${store.handle}`}
          className="hover:text-[var(--color-gray-400)] transition-colors duration-150"
        >
          {store.businessName}
        </Link>
        <ChevronRight size={12} className="text-[var(--color-gray-700)]" />
        <span className="text-[var(--color-gray-500)] truncate max-w-[200px]">
          {offering.name}
        </span>
      </div>

      {/* Editorial split */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
        {/* Left — editorial content */}
        <div className="rf-rise">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gray-600)] mb-5">
            Overview
          </p>

          <h1
            className="font-[family-name:var(--font-display)] text-3xl md:text-[2.6rem] font-extrabold text-[var(--color-off-white)] leading-[1.08] mb-8 max-w-[540px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {offering.name}
          </h1>

          <div className="flex flex-col gap-4 max-w-[560px]">
            {offering.desc.split("\n").filter(Boolean).map((para, i) => (
              <p
                key={i}
                className="text-[15px] text-[var(--color-gray-400)] leading-[1.7]"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right — sticky sidebar */}
        <aside className="lg:sticky lg:top-24 flex flex-col gap-4 rf-rise-2">
          {/* Price + CTA card */}
          <div
            className="rounded-2xl p-6 border flex flex-col gap-5"
            style={{
              background: "var(--color-dark-800)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-off-white)]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {offering.price.includes("/mo")
                  ? offering.price.replace("/mo", "")
                  : offering.price}
              </span>
              {(offering.price.includes("/mo") || unit) && (
                <span className="text-sm text-[var(--color-gray-600)]">
                  {offering.price.includes("/mo") ? "/month" : unit}
                </span>
              )}
            </div>

            <JoinButton
              accentColor={store.color}
              handle={store.handle}
              offeringName={offering.name}
            />

            {offering.buyers && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-gray-600)]">
                <Users size={11} strokeWidth={2} />
                <strong className="text-[var(--color-gray-500)] font-medium">
                  {offering.buyers}
                </strong>{" "}
                already joined
              </div>
            )}
          </div>

          {/* Creator mini-card */}
          <div
            className="rounded-2xl p-5 border flex items-center gap-3.5"
            style={{
              background: "var(--color-dark-800)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold text-sm"
              style={{
                background: avatarBg,
                color: store.color,
                border: `1.5px solid ${avatarBorder}`,
                letterSpacing: "-0.03em",
              }}
            >
              {store.abbr}
            </div>
            <div className="min-w-0">
              <Link
                href={`/${store.handle}`}
                className="block text-sm font-semibold text-[var(--color-off-white)] hover:text-[var(--color-orange)] transition-colors duration-150"
                style={{ letterSpacing: "-0.01em" }}
              >
                {store.businessName}
              </Link>
              <p className="text-xs text-[var(--color-gray-600)] truncate mt-0.5">
                {store.role}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
