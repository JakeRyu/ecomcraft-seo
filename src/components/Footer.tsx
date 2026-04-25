import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Sample Report", href: "#sample-report" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
] as const;

const META_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink px-[clamp(24px,5vw,100px)] pb-9 pt-14 text-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="dark" size="sm" />
            </div>
            <p className="max-w-[280px] text-sm font-normal leading-5 text-white/50">
              Affordable online visibility reports for UK small businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.05em] text-white/35">
                  {col.heading}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-normal leading-5 text-white/75 transition-opacity hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-7 h-px bg-white/10" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-normal text-white/35">
            © 2026 ecomcraft Ltd. All rights reserved. Registered in England
            &amp; Wales.
          </span>
          <div className="flex gap-5">
            {META_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-normal text-white/40 transition-opacity hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
