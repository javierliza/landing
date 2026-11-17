"use client";

import { useEffect } from "react";

/** Fallback de revelados para navegadores sin animation-timeline: view(). */
export function RevealObserver() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
