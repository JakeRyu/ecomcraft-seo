"use client";

type PricingCardProps = {
  name: string;
  price: string;
  period: string;
  subtitle?: string;
  features: readonly string[];
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
};

export function PricingCard({
  name,
  price,
  period,
  subtitle,
  features,
  recommended = false,
  selected,
  onSelect,
}: PricingCardProps) {
  const handleClick = () => {
    onSelect();
    document
      .getElementById("report-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (recommended) {
    return (
      <div className="relative rounded-[40px] bg-ink px-8 py-10 shadow-lifted min-[900px]:-translate-y-3">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-signal px-4 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-white">
          Most Popular
        </div>
        <PricingHeader name={name} price={price} period={period} inverse />
        {subtitle && (
          <p className="mb-7 -mt-3 text-[14px] font-normal leading-5 text-canvas/70">
            {subtitle}
          </p>
        )}
        <PricingFeatures features={features} inverse />
        <button
          type="button"
          aria-pressed={selected}
          onClick={handleClick}
          className="mt-1 w-full rounded-full bg-canvas py-[13px] text-[15px] font-medium tracking-[-0.03em] text-ink transition-opacity hover:opacity-85"
        >
          {selected ? "Selected ✓" : "Choose Plan"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-[40px] border-2 bg-lifted px-7 py-8 transition-colors ${
        selected ? "border-ink" : "border-transparent"
      }`}
    >
      <PricingHeader name={name} price={price} period={period} />
      {subtitle && (
        <p className="mb-7 -mt-3 text-[14px] font-normal leading-5 text-slate">
          {subtitle}
        </p>
      )}
      <PricingFeatures features={features} />
      <button
        type="button"
        aria-pressed={selected}
        onClick={handleClick}
        className="mt-1 w-full rounded-full bg-ink py-[13px] text-[15px] font-medium tracking-[-0.03em] text-canvas transition-opacity hover:opacity-85"
      >
        {selected ? "Selected ✓" : "Choose Plan"}
      </button>
    </div>
  );
}

function PricingHeader({
  name,
  price,
  period,
  inverse = false,
}: {
  name: string;
  price: string;
  period: string;
  inverse?: boolean;
}) {
  return (
    <>
      <div className="mb-2">
        <span
          className={`text-[13px] font-bold uppercase tracking-[0.04em] ${
            inverse ? "text-canvas/50" : "text-slate"
          }`}
        >
          {name}
        </span>
      </div>
      <div className="mb-1 flex items-baseline gap-1">
        <span
          className={`text-[42px] font-medium leading-none tracking-[-0.02em] ${
            inverse ? "text-canvas" : "text-ink"
          }`}
        >
          {price}
        </span>
      </div>
      <div
        className={`mb-7 text-xs font-normal ${
          inverse ? "text-canvas/40" : "text-slate"
        }`}
      >
        {period}
      </div>
    </>
  );
}

function PricingFeatures({
  features,
  inverse = false,
}: {
  features: readonly string[];
  inverse?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2.5">
      {features.map((f) => (
        <div key={f} className="flex items-start gap-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="8"
              className={inverse ? "fill-white/15" : "fill-ghost"}
            />
            <path
              d="M4.5 8l2.5 2.5 4-4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className={inverse ? "stroke-canvas" : "stroke-ink"}
            />
          </svg>
          <span
            className={`text-sm font-normal leading-5 ${
              inverse ? "text-canvas/80" : "text-charcoal"
            }`}
          >
            {f}
          </span>
        </div>
      ))}
    </div>
  );
}
