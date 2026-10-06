"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const hasPlayed = useRef(false);

  useEffect(() => {
    if (hasPlayed.current) return;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const frame = frameRef.current;
    const sweep = sweepRef.current;

    if (!overlay || !logo || !line || !frame || !sweep) return;

    hasPlayed.current = true;

    const ctx = gsap.context(() => {
      gsap.set(logo, {
        opacity: 0,
        y: 24,
        scale: 0.94,
        letterSpacing: "0.55em",
      });

      gsap.set(line, {
        scaleX: 0,
      });

      gsap.set(frame, {
        opacity: 0,
        scale: 0.94,
      });

      gsap.set(sweep, {
        xPercent: -120,
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: () => {
          gsap.set(overlay, {
            display: "none",
          });
        },
      });

      tl.to(frame, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      })
        .to(logo, {
          opacity: 1,
          y: 0,
          scale: 1,
          letterSpacing: "0.28em",
          duration: 0.9,
          ease: "power3.out",
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
          sweep,
          {
            xPercent: 120,
            opacity: 1,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "-=0.2",
        )
        .to(sweep, {
          opacity: 0,
          duration: 0.2,
        })
        .to(
          {},
          {
            duration: 0.35,
          },
        )
        .to(logo, {
          opacity: 0,
          y: -12,
          letterSpacing: "0.4em",
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          line,
          {
            scaleX: 0,
            duration: 0.35,
          },
          "<",
        )
        .to(
          frame,
          {
            opacity: 0,
            scale: 1.04,
            duration: 0.4,
          },
          "-=0.2",
        )
        .to(overlay, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
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
        ref={frameRef}
        className="absolute inset-[7%] border border-white/[0.08]"
      />

      <div className="absolute left-[7%] top-[7%] h-8 w-8 border-l border-t border-white/20" />

      <div className="absolute right-[7%] top-[7%] h-8 w-8 border-r border-t border-white/20" />

      <div className="absolute bottom-[7%] left-[7%] h-8 w-8 border-b border-l border-white/20" />

      <div className="absolute bottom-[7%] right-[7%] h-8 w-8 border-b border-r border-white/20" />

      <div className="relative flex flex-col items-center">
        <div
          ref={logoRef}
          className="relative whitespace-nowrap text-[clamp(1.1rem,2.2vw,1.55rem)] font-medium uppercase text-white"
        >
          SM BUILDERS
          <div
            ref={sweepRef}
            className="pointer-events-none absolute inset-y-[-50%] left-[-30%] w-[20%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[3px]"
          />
        </div>

        <div
          ref={lineRef}
          className="mt-5 h-px w-28 origin-center bg-white/50"
        />

        <p className="mt-4 text-[9px] uppercase tracking-[0.45em] text-white/35">
          Real Estate · Development
        </p>
      </div>
    </div>
  );
}
