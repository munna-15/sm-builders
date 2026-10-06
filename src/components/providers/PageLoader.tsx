"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroSlides } from "@/data/hero";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loader = loaderRef.current;
    const content = contentRef.current;
    const progress = progressRef.current;

    if (!loader || !content || !progress) return;

    let cancelled = false;

    const preloadHero = async () => {
      const image = new Image();

      image.src = heroSlides[0].image;

      if (image.decode) {
        try {
          await image.decode();
        } catch {
          // Image can still be usable if decoding fails.
        }
      } else {
        await new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          image.onload = () => resolve();
          image.onerror = () => resolve();
        });
      }
    };

    const ctx = gsap.context(() => {
      gsap.set(loader, {
        yPercent: 0,
        opacity: 1,
      });

      gsap.set(content, {
        y: 0,
        opacity: 1,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const intro = gsap.timeline();

      intro.to(progress, {
        scaleX: 1,
        duration: 1.65,
        ease: "power2.inOut",
      });

      const animationReady = new Promise<void>((resolve) => {
        intro.call(() => {
          resolve();
        });
      });

      Promise.all([preloadHero(), animationReady]).then(() => {
        if (cancelled) return;

        const exit = gsap.timeline({
          onComplete: () => {
            if (!cancelled) {
              setVisible(false);
            }
          },
        });

        exit.to(loader, {
          yPercent: -100,
          duration: 1.05,
          ease: "power4.inOut",
        });
      });
    }, loader);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#ebe7df]"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-[8%] top-0 h-full w-px bg-[#171717]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#171717]" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-[#171717]" />

        <div className="absolute left-0 top-[18%] h-px w-full bg-[#171717]" />
        <div className="absolute left-0 top-[82%] h-px w-full bg-[#171717]" />
      </div>

      {/* Corner Marks */}
      <div className="pointer-events-none absolute left-8 top-8 h-9 w-9 border-l border-t border-[#171717]/15 md:left-12 md:top-12" />

      <div className="pointer-events-none absolute right-8 top-8 h-9 w-9 border-r border-t border-[#171717]/15 md:right-12 md:top-12" />

      <div className="pointer-events-none absolute bottom-8 left-8 h-9 w-9 border-b border-l border-[#171717]/15 md:bottom-12 md:left-12" />

      <div className="pointer-events-none absolute bottom-8 right-8 h-9 w-9 border-b border-r border-[#171717]/15 md:bottom-12 md:right-12" />

      {/* Top Information */}
      <div className="absolute left-8 right-8 top-8 flex items-center justify-between md:left-12 md:right-12 md:top-12">
        <span className="text-[7px] uppercase tracking-[0.35em] text-[#171717]/30">
          Property
        </span>

        <span className="text-[7px] uppercase tracking-[0.35em] text-[#171717]/30">
          2026
        </span>
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="w-[min(420px,80vw)]">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.52em] text-[#171717]">
              SM BUILDERS
            </p>
          </div>

          {/* Progress */}
          <div className="h-px w-full overflow-hidden bg-[#171717]/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-[#171717]"
            />
          </div>

          {/* Meta */}
          <div className="mt-4 flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-[3px] rounded-full bg-[#171717]/40" />

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/45">
                Real Estate
              </span>
            </div>

            <span className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/45">
              Mymensingh
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between md:bottom-12 md:left-12 md:right-12">
        <span className="text-[7px] uppercase tracking-[0.35em] text-[#171717]/25">
          Development · Quality · Trust
        </span>

        <span className="text-[7px] uppercase tracking-[0.35em] text-[#171717]/25">
          SM
        </span>
      </div>
    </div>
  );
}
