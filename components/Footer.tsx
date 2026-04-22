import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between">
      <Wordmark size="footer" muted />
      <span className="text-xs text-[var(--color-gray-700)]">
        © 2025 Reflock Technologies. Made in India.
      </span>
    </footer>
  );
}
