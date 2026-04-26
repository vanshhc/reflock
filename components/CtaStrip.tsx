function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

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
          Join largest marketplace of Indian creators already selling courses, communities,
          coaching and all types of digital products on Reflock.
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
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="https://x.com/reflockHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-gray-300)] transition-colors"
            aria-label="Reflock on X"
          >
            <XIcon size={16} />
          </a>
          <a
            href="https://instagram.com/reflockHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-gray-300)] transition-colors"
            aria-label="Reflock on Instagram"
          >
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
