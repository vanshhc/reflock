type Props = {
  size?: "nav" | "footer";
  muted?: boolean;
};

export function Wordmark({ size = "nav", muted = false }: Props) {
  const fontSize = size === "nav" ? "text-[1.625rem]" : "text-[1.25rem]";
  const dotSize = size === "nav" ? "w-[9px] h-[9px]" : "w-[7px] h-[7px]";
  const color = muted ? "text-[var(--color-gray-600)]" : "text-[var(--color-off-white)]";
  const dotColor = muted ? "bg-[var(--color-gray-700)]" : "bg-[var(--color-gray-600)]";

  return (
    <span
      className={`font-[family-name:var(--font-display)] ${fontSize} font-extrabold leading-none ${color}`}
      style={{ letterSpacing: "-0.04em" }}
    >
      re
      <span
        className={`${dotSize} ${dotColor} inline-block rounded-[1px] ml-[2px] align-middle relative top-[2px]`}
      />
    </span>
  );
}
