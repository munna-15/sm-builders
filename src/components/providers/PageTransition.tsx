"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SESSION_KEY = "sm-builders-entrance-seen";

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    const isReload = navigationEntry?.type === "reload";
    const hasSeenEntrance = sessionStorage.getItem(SESSION_KEY) === "true";

    // Refresh → never show entrance animation.
    if (isReload || hasSeenEntrance) {
      overlay.style.display = "none";
      return;
    }

    // Mark this browser tab/session as visited.
    sessionStorage.setItem(SESSION_KEY, "true");

    const logo = logoRef.current;
    const line = lineRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;

    if (!logo || !line || !topLine || !bottomLine) return;

    const ctx = gsap.context(() => {
      gsap.set(logo, {
        opacity: 0,
        y: 18,
        scale: 0.96,
        letterSpacing: "0.5em",
      });

      gsap.set(line, {
        scaleX: 0,
      });

      gsap.set([topLine, bottomLine], {
        scaleX: 0,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
      });

      tl.to(logo, {
        opacity: 1,
        y: 0,
        scale: 1,
        letterSpacing: "0.3em",
        duration: 0.9,
      })
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.7,
          },
          "-=0.45",
        )
        .to(
          topLine,
          {
            scaleX: 1,
            duration: 0.8,
          },
          "-=0.5",
        )
        .to(
          bottomLine,
          {
            scaleX: 1,
            duration: 0.8,
          },
          "<",
        )
        .to({}, { duration: 0.4 })
        .to(logo, {
          opacity: 0,
          y: -10,
          duration: 0.45,
          ease: "power2.in",
        })
        .to(
          line,
          {
            scaleX: 0,
            duration: 0.4,
          },
          "<",
        )
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 1.05,
            ease: "power4.inOut",
          },
          "-=0.05",
        )
        .set(overlay, {
          display: "none",
        });
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#11110f]"
    >
      <div
        ref={topLineRef}
        className="absolute left-0 top-0 h-px w-full origin-left bg-white/10"
      />

      <div
        ref={bottomLineRef}
        className="absolute bottom-0 right-0 h-px w-full origin-right bg-white/10"
      />

      <div className="relative flex flex-col items-center">
        <div
          ref={logoRef}
          className="whitespace-nowrap text-[clamp(1rem,2vw,1.4rem)] font-medium uppercase text-white"
        >
          SM BUILDERS
        </div>

        <div
          ref={lineRef}
          className="mt-5 h-px w-24 origin-center bg-white/40"
        />
      </div>
    </div>
  );
}
