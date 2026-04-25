"use client";

import type { MouseEvent, ReactNode } from "react";

type ScrollLinkProps = {
  targetId: string;
  className?: string;
  "aria-label"?: string;
  onNavigate?: () => void;
  children: ReactNode;
};

export function ScrollLink({
  targetId,
  className,
  "aria-label": ariaLabel,
  onNavigate,
  children,
}: ScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${targetId}`);
    onNavigate?.();
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
