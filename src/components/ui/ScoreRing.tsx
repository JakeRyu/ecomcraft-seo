type ScoreRingProps = {
  score: number;
  size?: number;
  stroke?: number;
  labelSize?: number;
  ringClassName?: string;
  trackClassName?: string;
  textClassName?: string;
};

export function ScoreRing({
  score,
  size = 120,
  stroke = 10,
  labelSize = 28,
  ringClassName = "stroke-signal",
  trackClassName = "stroke-ghost",
  textClassName = "fill-ink",
}: ScoreRingProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const c = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
    >
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        strokeWidth={stroke}
        className={trackClassName}
      />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${c} ${c})`}
        className={`${ringClassName} transition-[stroke-dashoffset] duration-1000 ease-out`}
      />
      <text
        x={c}
        y={c + labelSize * 0.35}
        textAnchor="middle"
        fontFamily="inherit"
        fontSize={labelSize}
        fontWeight={500}
        letterSpacing="-0.5"
        className={textClassName}
      >
        {score}
      </text>
      <text
        x={c}
        y={c + labelSize * 0.35 + 14}
        textAnchor="middle"
        fontFamily="inherit"
        fontSize={10}
        fontWeight={450}
        opacity={0.5}
        className={textClassName}
      >
        / 100
      </text>
    </svg>
  );
}
