import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between">
      <Link href="/" aria-label="Reflock home">
        <Wordmark size="footer" muted />
      </Link>
      <span className="text-xs text-[var(--color-gray-700)]">
        © 2025 Reflock Technologies. Made in India.
      </span>
    </footer>
  );
}
