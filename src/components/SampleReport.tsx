import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScoreRing } from "@/components/ui/ScoreRing";

const METRICS = [
  { label: "SEO Score", value: 68, widthClass: "w-[68%]" },
  { label: "Google Presence", value: 72, widthClass: "w-[72%]" },
  { label: "Local Listings", value: 81, widthClass: "w-[81%]" },
  { label: "Social Visibility", value: 44, widthClass: "w-[44%]" },
] as const;

export function SampleReport() {
  return (
    <section
      id="sample-report"
      className="px-[clamp(24px,5vw,100px)] py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <Eyebrow>Sample report</Eyebrow>
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 -top-2 z-0 whitespace-nowrap text-[clamp(48px,8vw,96px)] font-medium leading-none tracking-[-0.02em] text-ghost select-none"
            >
              Your report
            </div>
            <h2 className="relative z-10 max-w-[440px] text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-[-0.02em] text-ink">
              Here&rsquo;s what your report looks like
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 rounded-[40px] bg-white p-[clamp(32px,4vw,56px)] shadow-lifted sm:grid-cols-[auto_1fr] sm:gap-16">
          <div className="flex flex-col items-center gap-3">
            <ScoreRing score={74} size={160} stroke={14} labelSize={38} />
            <div className="text-center text-[13px] font-medium tracking-[-0.02em] text-slate">
              Overall Visibility
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {METRICS.map((m) => (
              <MetricBar
                key={m.label}
                label={m.label}
                value={m.value}
                widthClass={m.widthClass}
              />
            ))}

            <div className="mt-2 flex items-start gap-3 rounded-[20px] bg-canvas px-5 py-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
                <span className="text-sm text-canvas">!</span>
              </div>
              <div>
                <div className="mb-0.5 text-[13px] font-semibold text-ink">
                  Top recommendation
                </div>
                <div className="text-[13px] font-normal leading-[18px] text-slate">
                  Your Google Business Profile is missing key information.
                  Completing it could improve local search visibility by up to
                  35%.
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs font-normal text-dust">
          Sample report for illustration purposes only. Your report will reflect
          your actual business data.
        </p>
      </div>
    </section>
  );
}

function MetricBar({
  label,
  value,
  widthClass,
}: {
  label: string;
  value: number;
  widthClass: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium tracking-[-0.02em] text-ink">
          {label}
        </span>
        <span className="text-sm font-semibold text-ink">
          {value}
          <span className="font-normal text-slate">/100</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ghost">
        <div
          className={`h-full rounded-full bg-signal ${
            value < 50 ? "opacity-70" : ""
          } ${widthClass}`}
        />
      </div>
    </div>
  );
}
