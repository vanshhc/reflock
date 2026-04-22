import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-[200] flex items-center justify-between h-16 px-6 md:px-12 border-b"
      style={{
        background: "rgba(15,15,15,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottomColor: "rgba(255,255,255,0.06)",
      }}
    >
      <Link
        href="/"
        aria-label="re. home"
        className="flex items-center min-h-11 -mx-2 px-2"
      >
        <Wordmark />
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {[
          { href: "#discover", label: "Discover" },
          { href: "#", label: "Categories" },
          { href: "#", label: "Creators" },
          { href: "/blog", label: "Blog" },
        ].map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm font-medium text-[var(--color-gray-400)] hover:text-[var(--color-off-white)] transition-colors duration-150"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-sm font-medium text-[var(--color-gray-400)] hover:text-[var(--color-off-white)] hover:bg-white/5 px-3.5 min-h-11 md:min-h-0 py-2 rounded-[6px] transition-colors duration-150"
        >
          Sign in
        </button>
        <button
          type="button"
          className="text-sm font-semibold text-[var(--color-off-white)] bg-[var(--color-dark-600)] border border-[var(--color-dark-500)] hover:bg-[var(--color-dark-500)] active:scale-[0.97] px-5 min-h-11 md:min-h-0 py-2 rounded-full transition-all duration-150"
        >
          Start selling
        </button>
      </div>
    </nav>
  );
}
