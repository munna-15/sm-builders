"use client";

import { useEffect } from "react";

import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
    });

    const handleScrollTop = () => {
      lenis.scrollTo(0, {
        duration: 1.5,
      });
    };

    window.addEventListener("sm-builders-scroll-top", handleScrollTop);

    return () => {
      window.removeEventListener("sm-builders-scroll-top", handleScrollTop);

      lenis.destroy();
    };
  }, []);

  return null;
}
