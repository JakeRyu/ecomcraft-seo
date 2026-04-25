import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScoreRing } from "@/components/ui/ScoreRing";

const METRICS = [
  { label: "SEO", value: 68 },
  { label: "Local Listings", value: 81 },
  { label: "Google Presence", value: 72 },
] as const;

export function HeroScoreCard() {
  return (
    <div className="w-full max-w-[320px] rounded-[40px] bg-white px-7 pb-8 pt-8 shadow-lifted">
      <Eyebrow>Visibility Score</Eyebrow>
      <div className="mb-6 flex justify-center">
        <ScoreRing score={74} size={140} stroke={12} labelSize={34} />
      </div>
      <div className="flex flex-col gap-2">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="flex items-center justify-between rounded-full bg-canvas px-3.5 py-2"
          >
            <span className="text-[13px] font-medium tracking-[-0.02em] text-ink">
              {m.label}
            </span>
            <span className="text-[13px] font-semibold text-ink">{m.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-signal/20 bg-signal/10 px-3.5 py-2.5">
        <div className="text-xs font-medium tracking-[-0.02em] text-signal">
          Quick wins identified
        </div>
        <div className="mt-0.5 text-[11px] font-normal text-slate">
          Google Business Profile incomplete
        </div>
      </div>
    </div>
  );
}
