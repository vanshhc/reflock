export function CtaStrip() {
  return (
    <div
      className="px-6 md:px-12 py-[72px] text-center"
      style={{
        background: "var(--color-dark-800)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[540px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-off-white)] mb-3.5"
          style={{ letterSpacing: "-0.03em", textWrap: "pretty" }}
        >
          Launch your product on re.
        </h2>
        <p className="text-base text-[var(--color-gray-500)] leading-[1.65] mb-8">
          Join 340+ Indian creators already selling courses, communities, and
          coaching on re.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            type="button"
            className="text-base text-[var(--color-gray-400)] border border-[var(--color-dark-500)] rounded-full px-7 py-3.5 hover:text-[var(--color-off-white)] hover:bg-white/5 transition-all duration-150"
          >
            Start selling
          </button>
          <button
            type="button"
            className="text-base text-[var(--color-gray-500)] hover:text-[var(--color-off-white)] px-7 py-3.5 transition-colors duration-150"
          >
            See how it works
          </button>
        </div>
      </div>
    </div>
  );
}
