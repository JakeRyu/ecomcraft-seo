"use client";

import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PLANS = [
  { name: "Snapshot", price: "£9" },
  { name: "Insight", price: "£19" },
  { name: "Deep Dive", price: "£39" },
] as const;

const MAX_KEYWORDS = 5;

type FormErrors = {
  email?: string;
  keywords?: string;
  location?: string;
  plan?: string;
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

  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const addKeyword = () => {
    const kw = kwInput.trim();
    if (!kw || keywords.length >= MAX_KEYWORDS || keywords.includes(kw)) return;
    setKeywords([...keywords, kw]);
    setKwInput("");
    clearError("keywords");
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const onKwKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!email || !email.includes("@")) {
      next.email = "Please enter a valid email address";
    }
    if (keywords.length === 0) {
      next.keywords = "Please add at least one keyword";
    }
    if (!location.trim()) {
      next.location = "Please enter your location or postcode";
    }
    if (!selectedPlan) {
      next.plan = "Please choose a plan";
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
                  — up to 5
                </span>
              </>
            }
          >
            {keywords.length > 0 && (
              <div className="mb-2.5 flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <div
                    key={kw}
                    className="flex items-center gap-2 rounded-full bg-canvas px-3.5 py-1.5 text-[13px] font-medium text-ink"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      aria-label={`Remove ${kw}`}
                      className="flex items-center text-sm leading-none text-slate hover:text-ink"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {keywords.length < MAX_KEYWORDS && (
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
                    errors.keywords && keywords.length === 0 ? errors.keywords : undefined
                  )}`}
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
                >
                  Add
                </button>
              </div>
            )}
            {keywords.length === 0 && (
              <div className="mt-1.5 pl-3 text-xs text-slate">
                Press Enter or click Add after each keyword
              </div>
            )}
            {errors.keywords && <FieldError>{errors.keywords}</FieldError>}
          </FieldGroup>

          <FieldGroup htmlFor="location" label="Location or postcode">
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Bristol or BS1 4EJ"
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
  children,
}: {
  htmlFor: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.04em] text-slate"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="mt-1.5 pl-3 text-xs font-medium text-error">
      {children}
    </div>
  );
}
