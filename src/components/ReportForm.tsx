"use client";

import { useState } from "react";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PLANS = [
  { name: "Snapshot", price: "£9" },
  { name: "Insight", price: "£19" },
  { name: "Deep Dive", price: "£39" },
] as const;

const PLAN_LIMITS = {
  Snapshot: 1,
  Insight: 2,
  "Deep Dive": 5,
} as const;

type PlanName = keyof typeof PLAN_LIMITS;
const PLAN_ORDER: PlanName[] = ["Snapshot", "Insight", "Deep Dive"];
const MAX_KEYWORDS = 5;

const isPlanName = (p: string | null): p is PlanName =>
  p !== null && p in PLAN_LIMITS;

// Upgrade path: always immediate next tier (Snapshot → Insight → Deep Dive → none).
const getNextPlan = (plan: PlanName | null): PlanName | null => {
  if (!plan) return null;
  const idx = PLAN_ORDER.indexOf(plan);
  return idx < PLAN_ORDER.length - 1 ? PLAN_ORDER[idx + 1] : null;
};

type FormErrors = {
  email?: string;
  keywords?: string;
  plan?: string;
  location?: string;
};

type ReportFormProps = {
  selectedPlan: string | null;
  onSelectPlan: (plan: string) => void;
};

export function ReportForm({ selectedPlan, onSelectPlan }: ReportFormProps) {
  const [email, setEmail] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const planName: PlanName | null = isPlanName(selectedPlan)
    ? selectedPlan
    : null;
  const limit = planName ? PLAN_LIMITS[planName] : MAX_KEYWORDS;
  const nextPlan = getNextPlan(planName);
  const atCap = keywords.length >= limit;
  const overCount = planName ? Math.max(0, keywords.length - limit) : 0;
  const isOverLimit = overCount > 0;

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const tryAddKeyword = (raw: string) => {
    const kw = raw.trim();
    if (!kw || keywords.length >= limit || keywords.includes(kw)) return;
    setKeywords([...keywords, kw]);
    setKwInput("");
    clearError("keywords");
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const onKwKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    tryAddKeyword(e.currentTarget.value);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!email || !email.includes("@")) {
      next.email = "Please enter a valid email address";
    }
    if (keywords.length === 0) {
      next.keywords = "Please add at least one keyword";
    } else if (planName && keywords.length > limit) {
      const over = keywords.length - limit;
      next.keywords = `Your ${planName} plan supports ${limit} keyword set${
        limit === 1 ? "" : "s"
      }. Remove ${over} to continue.`;
    }
    if (!selectedPlan) {
      next.plan = "Please choose a plan";
    }
    if (!location.trim()) {
      next.location = "Please enter your service area";
    }
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate());
  };

  const inputBase =
    "w-full rounded-full border-[1.5px] bg-canvas px-5 py-3 text-[15px] font-normal text-ink outline-none transition-colors";
  const inputBorder = (err?: string) =>
    err ? "border-error focus:border-error" : "border-ink/15 focus:border-ink";

  return (
    <section
      id="report-form"
      className="bg-lifted px-[clamp(24px,5vw,100px)] py-24"
    >
      <div className="mx-auto max-w-[680px]">
        <Eyebrow>Get your report</Eyebrow>
        <h2 className="mb-2 text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-[-0.02em] text-ink">
          Request your visibility report
        </h2>
        <p className="mb-10 text-[15px] font-normal leading-[22px] text-slate">
          Fill in your details below. Your personalised report will be
          delivered to your email.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-[40px] bg-white p-[clamp(28px,4vw,48px)] shadow-card"
        >
          <FieldGroup htmlFor="email" label="Email address">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              className={`${inputBase} ${inputBorder(errors.email)}`}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </FieldGroup>

          <FieldGroup
            htmlFor="keyword-input"
            label={
              <>
                Target keywords{" "}
                <span className="font-normal normal-case tracking-normal">
                  — up to {limit}
                </span>
              </>
            }
            trailing={
              <span
                aria-live="polite"
                className={`rounded-full bg-canvas px-2.5 py-1 text-[11px] font-medium tabular-nums normal-case tracking-normal ${
                  atCap ? "text-ink" : "text-slate"
                }`}
              >
                {keywords.length} / {limit}
                {!planName && (
                  <span className="ml-1 opacity-60">· max</span>
                )}
              </span>
            }
          >
            {keywords.length > 0 && (
              <div className="mb-2.5 flex flex-wrap gap-2">
                {keywords.map((kw, i) => {
                  const over = planName !== null && i >= limit;
                  return (
                    <div
                      key={kw}
                      className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
                        over
                          ? "border-dashed border-error bg-[#FCE8DD] text-error"
                          : "border-transparent bg-canvas text-ink"
                      }`}
                    >
                      {over && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.04em]">
                          Over limit
                        </span>
                      )}
                      {kw}
                      <button
                        type="button"
                        onClick={() => removeKeyword(kw)}
                        aria-label={`Remove ${kw}`}
                        className={`flex items-center text-sm leading-none ${
                          over
                            ? "text-error hover:opacity-70"
                            : "text-slate hover:text-ink"
                        }`}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {!atCap ? (
              <>
                <div className="flex gap-2">
                  <input
                    id="keyword-input"
                    type="text"
                    placeholder="e.g. plumber in Manchester"
                    value={kwInput}
                    onChange={(e) => {
                      setKwInput(e.target.value);
                      clearError("keywords");
                    }}
                    onKeyDown={onKwKeyDown}
                    className={`flex-1 ${inputBase} ${inputBorder(
                      errors.keywords && keywords.length === 0
                        ? errors.keywords
                        : undefined
                    )}`}
                  />
                  <button
                    type="button"
                    onClick={() => tryAddKeyword(kwInput)}
                    className="shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
                  >
                    Add
                  </button>
                </div>
                {keywords.length === 0 && (
                  <div className="mt-1.5 pl-3 text-xs text-slate">
                    Press Enter or click Add after each keyword
                  </div>
                )}
              </>
            ) : (
              <div className="mt-1 flex flex-wrap items-center gap-2 pl-3">
                <span className="text-[13px] text-slate">
                  {planName ? `${planName} plan limit reached.` : "Limit reached."}
                </span>
                {nextPlan && (
                  <>
                    <span className="text-[13px] text-slate">Need more?</span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPlan(nextPlan);
                        clearError("plan");
                      }}
                      className="rounded-full border-[1.5px] border-ink/15 px-3.5 py-1 text-[12px] font-medium text-ink transition-colors hover:border-ink/40"
                    >
                      Upgrade to {nextPlan} →
                    </button>
                  </>
                )}
              </div>
            )}

            {isOverLimit && (
              <div
                role="alert"
                className="mt-2 flex items-start gap-3 rounded-2xl border bg-[#FCE8DD] p-4"
                style={{ borderColor: "rgba(207,69,0,0.25)" }}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-base font-bold leading-none text-error"
                >
                  !
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-error">
                    {overCount} keyword{overCount === 1 ? "" : "s"} exceed your{" "}
                    {planName} plan
                  </div>
                  <p className="mt-1 text-xs text-slate">
                    Remove the highlighted ones
                    {nextPlan ? `, or upgrade to ${nextPlan} to keep them` : ""}.
                  </p>
                </div>
                {nextPlan && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPlan(nextPlan);
                      clearError("plan");
                    }}
                    className="shrink-0 self-center rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-canvas transition-opacity hover:opacity-85"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            )}

            {errors.keywords && <FieldError>{errors.keywords}</FieldError>}
          </FieldGroup>

          <FieldGroup htmlFor="location" label="Service area or target city">
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Bristol, or 'Bristol + 10 miles'"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                clearError("location");
              }}
              className={`${inputBase} ${inputBorder(errors.location)}`}
            />
            {errors.location && <FieldError>{errors.location}</FieldError>}
          </FieldGroup>

          <fieldset>
            <legend className="mb-2 block text-xs font-bold uppercase tracking-[0.04em] text-slate">
              Report plan
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map((plan) => {
                const sel = selectedPlan === plan.name;
                return (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => {
                      onSelectPlan(plan.name);
                      clearError("plan");
                    }}
                    aria-pressed={sel}
                    className={`flex flex-col items-center gap-0.5 rounded-full border-[1.5px] px-3 py-2.5 text-sm font-medium transition-colors ${
                      sel
                        ? "border-ink bg-ink text-canvas"
                        : "border-ink/15 bg-canvas text-ink hover:border-ink/40"
                    }`}
                  >
                    <span>{plan.name}</span>
                    <span className="text-xs font-normal opacity-70">
                      {plan.price}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.plan && <FieldError>{errors.plan}</FieldError>}
          </fieldset>

          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-ink py-[15px] text-base font-medium tracking-[-0.03em] text-canvas transition-opacity hover:opacity-85"
          >
            Get My Visibility Report
          </button>
        </form>
      </div>
    </section>
  );
}

function FieldGroup({
  htmlFor,
  label,
  trailing,
  children,
}: {
  htmlFor: string;
  label: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-bold uppercase tracking-[0.04em] text-slate"
        >
          {label}
        </label>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="mt-1.5 pl-3 text-xs font-medium text-error">
      {children}
    </div>
  );
}
