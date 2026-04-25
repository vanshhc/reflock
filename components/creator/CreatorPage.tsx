"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  Check,
  Share2,
  Users,
  PlayCircle,
  GraduationCap,
  Video,
  Star,
  Layout,
  Zap,
  Box,
  Youtube,
  Linkedin,
  Instagram,
  Globe,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Store, Offering, OfferingType } from "@/lib/types";
import { track } from "@/lib/track";
import { slugify } from "@/lib/slugify";

function toUrl(val: string): string {
  return val.startsWith("http") ? val : `https://${val}`;
}

const TYPE_ICONS: Record<OfferingType, React.ReactNode> = {
  Course: <PlayCircle size={16} />,
  Cohort: <GraduationCap size={16} />,
  Community: <Users size={16} />,
  Coaching: <Video size={16} />,
  Template: <Layout size={16} />,
  "AI Tool": <Zap size={16} />,
};

function lowestPrice(offerings: Offering[]): string {
  const priced = offerings
    .map((o) => ({
      price: o.price,
      num: parseFloat(o.price.replace(/[^0-9.]/g, "")),
    }))
    .filter((p) => !isNaN(p.num) && p.num > 0);
  if (!priced.length) return offerings[0]?.price ?? "—";
  return priced.sort((a, b) => a.num - b.num)[0].price;
}


function hexAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

export function CreatorPage({ store }: { store: Store }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "about">("products");
  const [showClaim, setShowClaim] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    track("share_click", store.handle, shareUrl);
    setTimeout(() => setCopied(false), 1500);
  };

  const avatarBg = hexAlpha(store.color, 0.15);
  const avatarBorder = hexAlpha(store.color, 0.2);

  const baseMembers = parseInt(store.buyers.split(" ")[0].replace(/,/g, ""), 10) || 0;
  const stats = [
    { value: String(baseMembers + (isFollowing ? 1 : 0)), label: "Members" },
    { value: String(store.offerings.length), label: "Products" },
  ];

  return (
    <>
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
          Stores
        </Link>
        <ChevronRight size={12} className="text-[var(--color-gray-700)]" />
        <span className="text-[var(--color-gray-500)]">{store.businessName}</span>
      </div>

      {/* Creator hero */}
      <div className="mt-7 max-w-[1200px] mx-auto px-6 md:px-12">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: "var(--color-dark-800)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Banner inner */}
          <div className="p-8 md:p-12 grid gap-8 grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-start">
            {/* Avatar */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0 font-[family-name:var(--font-display)] font-extrabold text-2xl md:text-[2rem]"
              style={{
                background: avatarBg,
                color: store.color,
                border: `2px solid ${avatarBorder}`,
                letterSpacing: "-0.04em",
              }}
            >
              {store.avatar ? (
                <img src={store.avatar} alt={store.businessName} className="w-full h-full object-cover rounded-full" />
              ) : (
                store.abbr
              )}
            </div>

            {/* Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1
                  className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-off-white)]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
                >
                  {store.businessName}
                </h1>
                <button
                  onClick={() => setShowClaim(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-600)] hover:text-[var(--color-gray-400)] px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "transparent",
                  }}
                >
                  <ShieldCheck size={11} />
                  Claim profile
                </button>
              </div>
              <p className="text-sm text-[var(--color-gray-600)] mb-2">
                by {store.ownerName}
              </p>
              {store.socials && (
                <div className="flex items-center gap-3.5 mb-3.5">
                  {store.socials.twitter && (
                    <a href={toUrl(store.socials.twitter)} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", store.handle, "twitter")} className="transition-opacity duration-150 hover:opacity-70" style={{ color: "rgba(255,255,255,0.28)" }}>
                      <X size={14} />
                    </a>
                  )}
                  {store.socials.youtube && (
                    <a href={toUrl(store.socials.youtube)} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", store.handle, "youtube")} className="transition-opacity duration-150 hover:opacity-70" style={{ color: "rgba(255,255,255,0.28)" }}>
                      <Youtube size={14} />
                    </a>
                  )}
                  {store.socials.linkedin && (
                    <a href={toUrl(store.socials.linkedin)} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", store.handle, "linkedin")} className="transition-opacity duration-150 hover:opacity-70" style={{ color: "rgba(255,255,255,0.28)" }}>
                      <Linkedin size={14} />
                    </a>
                  )}
                  {store.socials.instagram && (
                    <a href={toUrl(store.socials.instagram)} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", store.handle, "instagram")} className="transition-opacity duration-150 hover:opacity-70" style={{ color: "rgba(255,255,255,0.28)" }}>
                      <Instagram size={14} />
                    </a>
                  )}
                  {store.socials.website && (
                    <a href={toUrl(store.socials.website)} target="_blank" rel="noopener noreferrer" onClick={() => track("social_click", store.handle, "website")} className="transition-opacity duration-150 hover:opacity-70" style={{ color: "rgba(255,255,255,0.28)" }}>
                      <Globe size={14} />
                    </a>
                  )}
                </div>
              )}
              <p
                className="text-sm text-[var(--color-gray-400)] leading-relaxed max-w-[540px] mb-5"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {store.bio}
              </p>
            </div>

            {/* Actions — hidden on mobile */}
            <div className="hidden md:flex flex-col items-end gap-3 flex-shrink-0">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-150 active:scale-[0.97]"
                style={
                  isFollowing
                    ? {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "var(--color-gray-300)",
                      }
                    : {
                        background: store.color,
                        color: "var(--color-off-white)",
                        border: "none",
                      }
                }
              >
                {isFollowing ? <Check size={14} /> : <Plus size={14} />}
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-gray-500)] hover:text-[var(--color-off-white)] px-4 py-2 rounded-full transition-all duration-150"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                }}
              >
                <Share2 size={13} />
                {copied ? "Copied" : "Share"}
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="flex items-center flex-wrap border-t px-8 md:px-12 py-5 gap-y-4"
            style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 pr-8 mr-8"
                style={
                  i < stats.length - 1
                    ? { borderRight: "1px solid rgba(255,255,255,0.06)" }
                    : {}
                }
              >
                <span
                  className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-off-white)]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-gray-600)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12 mt-8 flex border-b"
        style={{ borderBottomColor: "rgba(255,255,255,0.07)" }}
      >
        {(["products", "about"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-sm font-semibold px-5 py-3.5 relative transition-colors duration-150"
            style={{
              color:
                activeTab === tab
                  ? "var(--color-off-white)"
                  : "var(--color-gray-600)",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 rounded-t-sm"
                style={{ background: store.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Products panel */}
      {activeTab === "products" && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.offerings.map((offering, i) => (
              <ProductCard
                key={i}
                offering={offering}
                accentColor={store.color}
                storeHandle={store.handle}
              />
            ))}
          </div>
        </section>
      )}

      {showClaim && (
        <ClaimModal store={store} onClose={() => setShowClaim(false)} />
      )}

      {/* About panel */}
      {activeTab === "about" && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 pb-120 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-14 items-start">
          <div>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-off-white)] mb-3"
              style={{ letterSpacing: "-0.03em" }}
            >
              About {store.businessName}
            </h2>
            {(store.about ?? "").split("\n\n").filter(Boolean).map((para, i) => (
              <p
                key={i}
                className="text-sm text-[var(--color-gray-400)] leading-relaxed mb-7"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {para}
              </p>
            ))}
          </div>
          <aside className="flex flex-col gap-3.5">
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "var(--color-dark-800)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gray-600)] mb-3.5">
                Topics
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(store.topics ?? []).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-medium text-[var(--color-gray-500)] px-3 py-1.5 rounded-full border"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>
      )}
    </>
  );
}

function ClaimModal({
  store,
  onClose,
}: {
  store: Store;
  onClose: () => void;
}) {
  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm text-[var(--color-gray-300)] placeholder-[var(--color-gray-700)] outline-none transition-colors duration-150 focus:border-white/20";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: "var(--color-dark-800)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--color-gray-600)] hover:text-[var(--color-gray-400)] transition-colors duration-150"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${store.color}1a`, color: store.color }}
          >
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2
              className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-off-white)]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Claim this profile
            </h2>
            <p className="text-xs text-[var(--color-gray-600)] mt-0.5">
              Are you the owner of {store.businessName}? We&apos;ll review your request within 48 hours.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-gray-500)]">
              Full name
            </label>
            <input
              type="text"
              placeholder={store.ownerName}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-gray-500)]">
              Your social handle
            </label>
            <input
              type="text"
              placeholder="@handle or profile URL"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-gray-500)]">
              Why should we verify you?
            </label>
            <textarea
              rows={3}
              placeholder="Tell us a bit about yourself and why you own this profile…"
              className={inputClass}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            className="flex-1 text-sm font-semibold py-2.5 rounded-full transition-opacity duration-150 hover:opacity-90 active:scale-[0.97] text-[var(--color-off-white)]"
            style={{ background: store.color }}
          >
            Submit for review
          </button>
          <button
            onClick={onClose}
            className="text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-gray-400)] transition-colors duration-150 px-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  offering,
  accentColor,
  storeHandle,
}: {
  offering: Offering;
  accentColor: string;
  storeHandle: string;
}) {
  return (
    <Link
      href={`/${storeHandle}/${slugify(offering.name)}`}
      onClick={() => track("product_click", storeHandle, offering.name)}
      className="rounded-2xl overflow-hidden border flex flex-col cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--color-dark-800)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.11)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 36px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      {/* Cover placeholder */}
      <div
        className="w-full aspect-video relative overflow-hidden flex-shrink-0 flex items-center justify-center"
        style={{ background: hexAlpha(accentColor, 0.08) }}
      >
        <span
          className="font-[family-name:var(--font-display)] font-extrabold select-none"
          style={{
            fontSize: "2.5rem",
            lineHeight: 1,
            color: hexAlpha(accentColor, 0.06),
            letterSpacing: "-0.04em",
          }}
        >
          {offering.name.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {offering.buyers && (
          <span className="flex items-center gap-1 text-xs text-[var(--color-gray-600)] mb-2.5">
            <Users size={11} strokeWidth={2} />
            <strong className="text-[var(--color-gray-500)] font-medium">
              {offering.buyers.split(" ")[0]}
            </strong>
          </span>
        )}
        <h3
          className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-off-white)] leading-snug mb-2"
          style={{ letterSpacing: "-0.01em" }}
        >
          {offering.name}
        </h3>
        <p className="text-sm text-[var(--color-gray-500)] leading-relaxed flex-1 mb-[18px] line-clamp-2">
          {offering.desc}
        </p>
        <div
          className="flex items-center justify-between pt-3.5 border-t gap-2.5"
          style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--color-off-white)] flex items-baseline gap-0.5">
            <span>{offering.price}</span>
          </span>
          <span
            className="text-sm font-bold tracking-[0.01em] text-[var(--color-off-white)] px-4 py-2 rounded-full whitespace-nowrap transition-opacity duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{ background: accentColor }}
          >
            Join →
          </span>
        </div>
      </div>
    </Link>
  );
}

