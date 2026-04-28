import { Eyebrow } from "@/components/ui/Eyebrow";
import { StepCard } from "@/components/ui/StepCard";

const STEPS = [
  {
    number: "01",
    title: "Choose your plan",
    description:
      "Pick the report that fits your needs — pay once, no subscription.",
  },
  {
    number: "02",
    title: "Enter your keywords",
    description:
      "Tell us your business type, target keywords, and UK location.",
  },
  {
    number: "03",
    title: "Receive your report",
    description:
      "Your full SEO visibility report lands in your inbox within hours.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-lifted px-[clamp(24px,5vw,100px)] py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="max-w-[480px] text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-[-0.02em] text-ink">
            Three steps to clarity
          </h2>
        </div>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-[5%] top-8 z-0 hidden h-[60px] w-[90%] min-[900px]:block"
            viewBox="0 0 900 60"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 60 30 Q 310 -20 450 30 Q 590 80 840 30"
              strokeWidth="1.2"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.5"
              className="stroke-signal"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-8 min-[900px]:grid-cols-3">
            {STEPS.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
