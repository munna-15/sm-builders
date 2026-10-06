
"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CinematicSectionsProps = {
  children: ReactNode;
};

export function CinematicSections({
  children,
}: CinematicSectionsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-cinematic-section]"
      );

      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];

        if (!nextSection) return;

        gsap.set(section, {
          transformOrigin: "center top",
          willChange: "transform, opacity, filter",
        });

        gsap.to(section, {
          scale: 0.92,
          y: -35,
          opacity: 0.72,
          filter: "brightness(0.72)",
          ease: "none",
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(nextSection, {
          y: 0,
          scale: 1,
          transformOrigin: "center bottom",
          willChange: "transform",
        });

        gsap.fromTo(
          nextSection,
          {
            y: 90,
            scale: 0.965,
          },
          {
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: nextSection,
              start: "top bottom",
              end: "top top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {children}
    </div>
  );
}

