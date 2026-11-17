import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  dark?: boolean;
}

export function SectionTitle({ children, dark = false }: SectionTitleProps) {
  return (
    <h2
      className={`reveal max-w-[20ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[56px] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      {children}
    </h2>
  );
}
