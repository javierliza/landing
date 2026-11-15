"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface AccordionIndexedItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionIndexedProps {
  items?: AccordionIndexedItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  className?: string;
}

const defaultItems: AccordionIndexedItem[] = [
  {
    id: "strategy",
    title: "Strategy",
    content:
      "Every product starts with a question worth answering. We map user needs, business goals, and technical constraints into a focused direction before a single pixel is placed.",
  },
  {
    id: "design",
    title: "Design",
    content:
      "Interface decisions shaped by real usage patterns. Typography, spacing, and color are tuned until the experience feels inevitable rather than designed.",
  },
  {
    id: "engineering",
    title: "Engineering",
    content:
      "Components built for composition, not configuration. Server-first rendering, edge delivery, and zero-layout-shift interactions ship as defaults.",
  },
  {
    id: "motion",
    title: "Motion",
    content:
      "Animation as communication. Spring physics for direct manipulation, opacity curves for state transitions, and layout animations that preserve spatial context.",
  },
  {
    id: "systems",
    title: "Systems",
    content:
      "Tokens, primitives, and patterns that scale across surfaces. A single source of truth that keeps twenty screens consistent without slowing down any of them.",
  },
  {
    id: "delivery",
    title: "Delivery",
    content:
      "Incremental rollouts behind feature flags, performance budgets enforced in CI, and lighthouse scores that never regress. Production is the only environment that matters.",
  },
];

export default function AccordionIndexed({
  items = defaultItems,
  defaultValue = "engineering",
  value,
  onValueChange,
  className,
}: AccordionIndexedProps) {
  return (
    <div className={cn("w-full", className)}>
      <Accordion
        defaultValue={value ? undefined : [defaultValue]}
        value={value ? [value] : undefined}
        onValueChange={onValueChange ? (v) => onValueChange(String(v[0] ?? "")) : undefined}
      >
        {items.map((item, index) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="group/item border-b border-border first:border-t"
          >
            <AccordionTrigger className="cursor-pointer gap-6 rounded-none py-5 hover:no-underline">
              <div className="flex items-baseline gap-5">
                <span className="shrink-0 font-mono text-sm tabular-nums text-muted-foreground/60 transition-colors group-has-[[aria-expanded=true]]/item:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium tracking-tight text-foreground/80 transition-colors group-hover/item:text-foreground group-has-[[aria-expanded=true]]/item:text-foreground">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="pb-5 pl-[2.9rem] pr-8 text-[15px] leading-relaxed text-muted-foreground">
                {item.content}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
