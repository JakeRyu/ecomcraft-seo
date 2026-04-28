import { Eyebrow } from "@/components/ui/Eyebrow";
import { PricingCard } from "@/components/ui/PricingCard";

type PricingProps = {
  selectedPlan: string | null;
  onSelectPlan: (plan: string) => void;
};

const PLANS = [
  {
    name: "Snapshot",
    price: "£29",
    period: "one-off",
    subtitle: "A quick visibility check to see where you stand.",
    features: [
      "One-page visibility summary",
      "Overall visibility score (out of 100)",
      "Top 3 issues detected",
      "1 keyword + 1 location",
      "Email delivery within 24 hours",
    ],
  },
  {
    name: "Insight",
    price: "£99",
    period: "one-off",
    recommended: true,
    subtitle: "The full picture, with clear next steps you can act on.",
    features: [
      "Full visibility report (PDF)",
      "Detailed scoring across SEO, Google presence, local listings, and social",
      "Up to 5 keywords + 1 location",
      "Prioritised list of recommendations",
      "Competitor comparison (top 3 local competitors)",
      "Email delivery within 3 business days",
    ],
  },
  {
    name: "Deep Dive",
    price: "£499",
    period: "one-off",
    subtitle: "The Insight report, plus we fix the issues we find.",
    features: [
      "Everything in Insight",
      "30-minute strategy call to walk through findings",
      "Hands-on resolution of identified issues (technical SEO, Google Business Profile, on-page fixes)",
      "Up to 10 keywords + multiple locations",
      "Implementation report on completion",
      "14 days of follow-up support",
      "Delivery within 10 business days",
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
