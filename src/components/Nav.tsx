"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Sample Report", href: "#sample-report" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav
      aria-label="main navigation"
      className="fixed left-1/2 top-6 z-50 w-[calc(100%-48px)] max-w-[960px] -translate-x-1/2"
    >
      <div className="flex items-center rounded-full bg-white px-6 py-3 shadow-card">
        <Link
          href="#top"
          aria-label="ecomcraft SEO home"
          className="flex shrink-0 items-center"
          onClick={close}
        >
          <Logo />
        </Link>

        <div className="mx-auto hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-0 py-0.5 text-sm font-medium tracking-[-0.03em] text-ink/75 transition-opacity hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#report-form"
          className="hidden shrink-0 rounded-full bg-ink px-5 py-[9px] text-sm font-medium tracking-[-0.03em] text-canvas transition-opacity hover:opacity-85 sm:inline-flex"
        >
          Get My Visibility Report
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto flex shrink-0 items-center justify-center p-1 sm:hidden"
        >
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="1" x2="18" y2="1" strokeWidth="1.5" strokeLinecap="round" className="stroke-ink" />
            <line x1="0" y1="7" x2="18" y2="7" strokeWidth="1.5" strokeLinecap="round" className="stroke-ink" />
            <line x1="0" y1="13" x2="18" y2="13" strokeWidth="1.5" strokeLinecap="round" className="stroke-ink" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="mt-2 rounded-3xl bg-white px-6 py-4 shadow-lifted sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="block w-full border-b border-ghost py-3 text-left text-[17px] font-medium tracking-[-0.02em] text-ink last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#report-form"
            onClick={close}
            className="mt-4 block w-full rounded-full bg-ink py-3 text-center text-[15px] font-medium text-canvas"
          >
            Get My Visibility Report
          </Link>
        </div>
      )}
    </nav>
  );
}
