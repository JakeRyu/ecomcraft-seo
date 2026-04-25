type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md";
};

export function Logo({ variant = "light", size = "md" }: LogoProps) {
  const onDark = variant === "dark";

  const wordSize = size === "sm" ? "text-[15px]" : "text-sm";
  const wordColor = onDark ? "text-white" : "text-ink";
  const badgeColor = onDark
    ? "bg-white/10 text-white/30"
    : "bg-ghost text-slate";

  return (
    <div className="flex items-center gap-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect
          width="28"
          height="28"
          rx="8"
          className={onDark ? "fill-white/15" : "fill-ink"}
        />
        <rect
          x="6"
          y="17"
          width="3.5"
          height="5"
          rx="1"
          className={onDark ? "fill-white" : "fill-canvas"}
          opacity={onDark ? 0.4 : 0.5}
        />
        <rect
          x="11"
          y="13"
          width="3.5"
          height="9"
          rx="1"
          className={onDark ? "fill-white" : "fill-canvas"}
          opacity={onDark ? 0.65 : 0.75}
        />
        <rect
          x="16.5"
          y="9"
          width="3.5"
          height="13"
          rx="1"
          className={onDark ? "fill-white" : "fill-canvas"}
        />
        <path
          d="M6 18 L12.5 13.5 L17.5 10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-signal"
          fill="none"
        />
      </svg>
      <span
        className={`${wordSize} font-semibold tracking-[-0.02em] ${wordColor}`}
      >
        ecomcraft
      </span>
      <span
        className={`rounded-full px-2 py-[2px] text-[11px] font-medium tracking-[0.02em] ${badgeColor}`}
      >
        SEO
      </span>
    </div>
  );
}
