"use client";

import { useEffect } from "react";

/** A fresh home visit starts at the storefront; back/forward keeps its position. */
export default function HomeEntryPosition() {
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "back_forward" || (location.hash && location.hash !== "#top")) return;
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    };
    reset();
    window.addEventListener("load", reset, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", reset);
    };
  }, []);
  return null;
}
