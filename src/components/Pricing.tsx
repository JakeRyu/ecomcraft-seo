import { Eyebrow } from "@/components/ui/Eyebrow";
import { PricingCard } from "@/components/ui/PricingCard";

type PricingProps = {
  selectedPlan: string | null;
  onSelectPlan: (plan: string) => void;
};

const PLANS = [
  {
    name: "Starter",
    price: "£9",
    period: "one-time",
    features: [
      "Single keyword set",
      "Overall visibility score",
      "SEO & Google Presence check",
      "Email delivery",
    ],
  },
  {
    name: "Growth",
    price: "£19",
    period: "one-time",
    recommended: true,
    features: [
      "Extended keyword sets (up to 2)",
      "Deeper competitor analysis",
      "Local listings audit",
      "PDF report included",
      "Priority email delivery",
    ],
  },
  {
    name: "Pro",
    price: "£39",
    period: "one-time",
    features: [
      "Full analysis (up to 5 keyword sets)",
      "Social visibility check",
      "Actionable recommendations",
      "PDF report + raw data",
      "Priority delivery within 2hrs",
    ],
  },
] as const;

export function Pricing({ selectedPlan, onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="px-[clamp(24px,5vw,100px)] py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-[-0.02em] text-ink">
              Pay once. Know more.
            </h2>
          </div>
          <p className="max-w-[320px] text-[15px] font-normal leading-[22px] text-slate">
            No subscriptions, no monthly fees. Just a clear, honest report
            delivered to your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 items-end gap-5 min-[900px]:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              selected={selectedPlan === plan.name}
              onSelect={() => onSelectPlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
