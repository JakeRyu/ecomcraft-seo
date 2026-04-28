"use client";

// Preserved for later re-integration into ReportForm.
//
// This module owns everything needed to render the "About your business"
// section that was previously Section 1 of ReportForm: the required
// business basics (name, website, postcode with auto-uppercase) plus the
// collapsible "+60% Match" panel for optional GBP URL, phone, and category.
//
// To re-enable in ReportForm:
//   1. const biz = useBusinessIdentity();
//   2. Render <BusinessIdentityFields {...biz} /> above the analyse section.
//   3. In the submit handler, merge `biz.validate()` into the errors object.

import { useState } from "react";
import type { ReactNode } from "react";

const BUSINESS_CATEGORIES = [
  "Restaurant / Café",
  "Retail shop",
  "Trades (plumber, electrician, builder)",
  "Beauty & wellness",
  "Professional services (legal, accounting)",
  "Health & medical",
  "Auto services",
  "Home services",
  "Other",
] as const;

export type BusinessIdentityErrors = {
  bizName?: string;
  website?: string;
  postcode?: string;
};

export type BusinessIdentityState = {
  bizName: string;
  website: string;
  postcode: string;
  gbpUrl: string;
  phone: string;
  category: string;
  showOptional: boolean;
  errors: BusinessIdentityErrors;
  setBizName: (v: string) => void;
  setWebsite: (v: string) => void;
  setPostcode: (v: string) => void;
  setGbpUrl: (v: string) => void;
  setPhone: (v: string) => void;
  setCategory: (v: string) => void;
  setShowOptional: (v: boolean | ((prev: boolean) => boolean)) => void;
  clearError: (field: keyof BusinessIdentityErrors) => void;
  validate: () => BusinessIdentityErrors;
};

export function useBusinessIdentity(): BusinessIdentityState {
  const [bizName, setBizName] = useState("");
  const [website, setWebsite] = useState("");
  const [postcode, setPostcode] = useState("");
  const [gbpUrl, setGbpUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState<BusinessIdentityErrors>({});

  const clearError = (field: keyof BusinessIdentityErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validate = (): BusinessIdentityErrors => {
    const next: BusinessIdentityErrors = {};
    if (!bizName.trim()) next.bizName = "Please enter your business name";
    if (!website.trim()) next.website = "Please enter your website";
    if (!postcode.trim()) next.postcode = "Please enter your postcode";
    setErrors(next);
    return next;
  };

  return {
    bizName,
    website,
    postcode,
    gbpUrl,
    phone,
    category,
    showOptional,
    errors,
    setBizName,
    setWebsite,
    setPostcode,
    setGbpUrl,
    setPhone,
    setCategory,
    setShowOptional,
    clearError,
    validate,
  };
}

const inputBase =
  "w-full rounded-full border-[1.5px] bg-canvas px-5 py-3 text-[15px] font-normal text-ink outline-none transition-colors";
const inputBorder = (err?: string) =>
  err ? "border-error focus:border-error" : "border-ink/15 focus:border-ink";

const optionalSuffix = (
  <span className="font-normal normal-case tracking-normal text-dust">
    · optional
  </span>
);

export function BusinessIdentityFields(props: BusinessIdentityState) {
  const {
    bizName,
    website,
    postcode,
    gbpUrl,
    phone,
    category,
    showOptional,
    errors,
    setBizName,
    setWebsite,
    setPostcode,
    setGbpUrl,
    setPhone,
    setCategory,
    setShowOptional,
    clearError,
  } = props;

  return (
    <>
      <SectionHeader num={1} label="About your business" />

      <FieldGroup htmlFor="bizName" label="Business name">
        <input
          id="bizName"
          name="bizName"
          type="text"
          placeholder="e.g. Smith & Sons Plumbing Ltd"
          value={bizName}
          onChange={(e) => {
            setBizName(e.target.value);
            clearError("bizName");
          }}
          className={`${inputBase} ${inputBorder(errors.bizName)}`}
        />
        {errors.bizName ? (
          <FieldError>{errors.bizName}</FieldError>
        ) : (
          <FieldHelper>
            Use the exact name on your Google Business Profile for best
            matching
          </FieldHelper>
        )}
      </FieldGroup>

      <div className="grid grid-cols-1 gap-3 min-[541px]:grid-cols-2">
        <FieldGroup htmlFor="website" label="Website">
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://yourbusiness.co.uk"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              clearError("website");
            }}
            className={`${inputBase} ${inputBorder(errors.website)}`}
          />
          {errors.website && <FieldError>{errors.website}</FieldError>}
        </FieldGroup>

        <FieldGroup htmlFor="postcode" label="Postcode">
          <input
            id="postcode"
            name="postcode"
            type="text"
            placeholder="BS1 4EJ"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value.toUpperCase());
              clearError("postcode");
            }}
            className={`${inputBase} ${inputBorder(errors.postcode)}`}
          />
          {errors.postcode && <FieldError>{errors.postcode}</FieldError>}
        </FieldGroup>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowOptional((v) => !v)}
          aria-expanded={showOptional}
          aria-controls="optional-fields"
          className="block w-full rounded-2xl border border-dashed px-5 py-3.5 text-left transition-colors hover:border-ink/30"
          style={{ borderColor: "rgba(20,20,19,0.2)" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-ink">
                Improve report accuracy
              </span>
              {!showOptional && (
                <span
                  className="rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{ letterSpacing: "0.4px" }}
                >
                  +60% Match
                </span>
              )}
            </div>
            <span
              aria-hidden="true"
              className={`text-slate transition-transform duration-200 ${
                showOptional ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate">
            Add your Google Business Profile link, phone, and category —
            optional
          </p>
        </button>

        {showOptional && (
          <div
            id="optional-fields"
            className="mt-3 flex flex-col gap-3 border-l-2 border-ghost py-1 pl-4"
          >
            <FieldGroup
              htmlFor="gbpUrl"
              label={<>Google Business Profile URL {optionalSuffix}</>}
            >
              <input
                id="gbpUrl"
                name="gbpUrl"
                type="url"
                placeholder="https://maps.app.goo.gl/..."
                value={gbpUrl}
                onChange={(e) => setGbpUrl(e.target.value)}
                className={`${inputBase} ${inputBorder(undefined)}`}
              />
              <FieldHelper>
                Find yours at{" "}
                <a
                  href="https://google.com/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link-blue underline"
                >
                  google.com/business
                </a>{" "}
                → Share
              </FieldHelper>
            </FieldGroup>

            <div className="grid grid-cols-1 gap-3 min-[541px]:grid-cols-2">
              <FieldGroup htmlFor="phone" label={<>Phone {optionalSuffix}</>}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 117 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${inputBase} ${inputBorder(undefined)}`}
                />
              </FieldGroup>

              <FieldGroup
                htmlFor="category"
                label={<>Category {optionalSuffix}</>}
              >
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full appearance-none rounded-full border-[1.5px] border-ink/15 bg-canvas px-5 py-3 pr-10 text-[15px] font-normal outline-none transition-colors focus:border-ink ${
                      category === "" ? "text-slate" : "text-ink"
                    }`}
                  >
                    <option value="" disabled>
                      Select category…
                    </option>
                    {BUSINESS_CATEGORIES.map((c) => (
                      <option key={c} value={c} className="text-ink">
                        {c}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate"
                  >
                    <path
                      d="M1 1l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
              </FieldGroup>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SectionHeader({ num, label }: { num: 1 | 2; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[12px] font-bold leading-none text-canvas">
        {num}
      </span>
      <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-ink">
        {label}
      </span>
    </div>
  );
}

function FieldGroup({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: ReactNode;
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

function FieldHelper({ children }: { children: ReactNode }) {
  return <div className="mt-1.5 pl-3 text-xs text-slate">{children}</div>;
}
