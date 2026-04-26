type Props = {
  size?: "nav" | "footer";
  muted?: boolean;
};

export function Wordmark({ size = "nav", muted = false }: Props) {
  const height = size === "nav" ? "h-8" : "h-6";
  const opacity = muted ? "opacity-50" : "";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/wordmark.png"
      alt="Reflock"
      className={`${height} w-auto ${opacity}`}
    />
  );
}
