import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { HeroScoreCard } from "./HeroScoreCard";

const PROOF_POINTS = [
  "No monthly fees",
  "UK businesses only",
  "Delivered by email",
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1280px] px-[clamp(24px,5vw,100px)] pb-24 pt-[clamp(100px,12vw,140px)]"
    >
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <Eyebrow>Online Visibility</Eyebrow>

          <div className="relative mb-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 -top-3 z-0 hidden whitespace-nowrap text-[clamp(64px,10vw,120px)] font-medium leading-none tracking-[-0.02em] text-ghost select-none md:block"
            >
              Visibility
            </div>
            <h1 className="relative z-10 max-w-[540px] text-[clamp(36px,5vw,60px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-pretty">
              Find out how visible your business is online
            </h1>
          </div>

          <p className="mb-9 max-w-[460px] text-[17px] font-normal leading-6 text-slate">
            An affordable SEO visibility report built for UK small businesses.
            Know exactly where you stand — and what to fix first.
          </p>

          <div className="flex flex-wrap gap-3">
            <ScrollLink
              targetId="report-form"
              className="rounded-full border-[1.5px] border-ink bg-ink px-7 py-3 text-[15px] font-medium tracking-[-0.03em] text-canvas transition-opacity hover:opacity-85"
            >
              Get My Visibility Report
            </ScrollLink>
            <ScrollLink
              targetId="sample-report"
              className="rounded-full border-[1.5px] border-ink/25 bg-white px-7 py-3 text-[15px] font-normal tracking-[-0.03em] text-ink transition-colors hover:border-ink/50"
            >
              See sample report
            </ScrollLink>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {PROOF_POINTS.map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-signal">✓</span>
                <span className="text-[13px] font-normal text-slate">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:block">
          <HeroScoreCard />
        </div>
      </div>
    </section>
  );
}
