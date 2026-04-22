type FeaturedCreator = {
  name: string;
  role: string;
  offering: string;
  tags: string[];
  abbr: string;
  color: string;
};

const FEATURED: FeaturedCreator = {
  name: "Aarav Kapoor",
  role: "AI educator · 40k+ students",
  offering:
    "Teaching AI workflows to Indian professionals. Cohorts, self-paced courses, and prompt packs.",
  tags: ["Cohorts", "Courses", "Community"],
  abbr: "AK",
  color: "#FE5808",
};

const COMPACT: Array<{
  name: string;
  role: string;
  offering: string;
  tag: string;
  abbr: string;
  color: string;
}> = [
  {
    name: "Priya Singh",
    role: "UX Designer · Bangalore",
    offering: "Figma templates, design system kits, and portfolio review sessions.",
    tag: "Design",
    abbr: "PS",
    color: "#A78BFA",
  },
  {
    name: "Rohit Verma",
    role: "Growth Marketer · Delhi",
    offering: "Paid community for D2C founders, growth playbook, and ad templates.",
    tag: "Marketing",
    abbr: "RV",
    color: "#34D399",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-semibold uppercase text-[var(--color-gray-600)] bg-white/5 px-2 py-[3px] rounded-full"
      style={{ letterSpacing: "0.04em" }}
    >
      {children}
    </span>
  );
}

function VisitStoreBtn() {
  return (
    <button
      type="button"
      className="shrink-0 text-xs font-semibold px-3.5 py-[7px] min-h-11 md:min-h-0 rounded-full border border-[var(--color-dark-500)] bg-transparent text-[var(--color-gray-400)] hover:border-[var(--color-gray-500)] hover:text-[var(--color-off-white)] hover:bg-white/5 transition-all duration-150 whitespace-nowrap"
    >
      Visit store
    </button>
  );
}

function Avatar({
  abbr,
  color,
  size,
}: {
  abbr: string;
  color: string;
  size: "lg" | "sm";
}) {
  const dims =
    size === "lg"
      ? "w-[52px] h-[52px] text-[1.1rem]"
      : "w-10 h-10 text-[0.9rem]";
  return (
    <div
      className={`${dims} rounded-full shrink-0 flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold uppercase`}
      style={{
        background: `${color}26`,
        color,
        letterSpacing: "-0.03em",
      }}
    >
      {abbr}
    </div>
  );
}

export function HeroStorefronts() {
  return (
    <div className="flex flex-col gap-3">
      {/* Featured large card */}
      <div
        className="rounded-[16px] p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          background: "var(--color-dark-700)",
          border: "1px solid var(--color-dark-500)",
        }}
      >
        <Avatar abbr={FEATURED.abbr} color={FEATURED.color} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-off-white)] mb-[3px]">
            {FEATURED.name}
          </div>
          <div className="text-sm text-[var(--color-gray-500)] mb-2">
            {FEATURED.role}
          </div>
          <div className="text-sm text-[var(--color-gray-400)] leading-[1.4] line-clamp-2">
            {FEATURED.offering}
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {FEATURED.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
        <VisitStoreBtn />
      </div>

      {/* Two compact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {COMPACT.map((c) => (
          <div
            key={c.name}
            className="rounded-[16px] p-5 flex flex-col items-start gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            style={{
              background: "var(--color-dark-800)",
              border: "1px solid var(--color-dark-600)",
            }}
          >
            <div className="flex items-center gap-2.5 w-full">
              <Avatar abbr={c.abbr} color={c.color} size="sm" />
              <div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-off-white)]">
                  {c.name}
                </div>
                <div className="text-[11px] text-[var(--color-gray-500)]">
                  {c.role}
                </div>
              </div>
            </div>
            <div className="text-sm text-[var(--color-gray-400)] leading-[1.4] line-clamp-2">
              {c.offering}
            </div>
            <div className="flex gap-1.5 justify-between items-center w-full">
              <Tag>{c.tag}</Tag>
              <VisitStoreBtn />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
