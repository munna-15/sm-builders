"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CompanyDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const composition = compositionRef.current;
    const mainImage = mainImageRef.current;
    const secondaryImage = secondaryImageRef.current;
    const ring = ringRef.current;

    if (!section || !composition || !mainImage || !secondaryImage || !ring) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (context) => {
          const { desktop } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
          };

          gsap.set(composition, {
            transformPerspective: 1800,
            transformStyle: "preserve-3d",
          });

          gsap.set(mainImage, {
            transformStyle: "preserve-3d",
            zIndex: 10,
          });

          gsap.set(secondaryImage, {
            transformStyle: "preserve-3d",
            zIndex: 20,
            z: 30,
          });

          gsap.set(ring, {
            transformStyle: "preserve-3d",
            zIndex: 30,
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            })
            .to(
              composition,
              {
                y: desktop ? -20 : -10,
                rotateX: desktop ? 1.5 : 0.7,
                rotateY: desktop ? -1.8 : -0.8,
                ease: "none",
              },
              0,
            )
            .to(
              mainImage,
              {
                y: desktop ? -28 : -16,
                z: 15,
                ease: "none",
              },
              0,
            )
            .to(
              secondaryImage,
              {
                y: desktop ? -5 : 0,
                x: desktop ? -12 : -5,
                z: 45,
                rotateZ: desktop ? -1 : -0.5,
                ease: "none",
              },
              0,
            )
            .to(
              ring,
              {
                y: desktop ? -75 : -45,
                x: desktop ? 20 : 10,
                rotateZ: desktop ? 15 : 8,
                z: 55,
                ease: "none",
              },
              0,
            );
        },
      );

      return () => {
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#eee8dc] text-[#171717]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-4">
          {/* TEXT */}
          <div className="relative z-30 max-w-[650px] lg:-translate-y-8">
            <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.42em] text-black/40 sm:mb-10">
              SM BUILDERS
            </p>

            <h2 className="text-[clamp(3.1rem,6.1vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Shaping
              <br />
              Dreams with
              <br />
              Quality
              <br />
              Construction
            </h2>

            <div className="mt-10 max-w-[330px] border-t border-black/15 pt-5">
              <p className="text-[11px] leading-[1.8] tracking-[0.02em] text-black/55">
                Thoughtfully presented properties shaped around quality, lasting
                value and a better way of living.
              </p>
            </div>
          </div>

          {/* IMAGE COMPOSITION */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              ref={compositionRef}
              className="relative h-[500px] w-full max-w-[760px] sm:h-[610px] lg:h-[680px]"
            >
              {/* MAIN IMAGE */}
              <div
                ref={mainImageRef}
                className="absolute right-0 top-0 z-10 h-[430px] w-[72%] overflow-hidden rounded-[2px] sm:h-[535px] sm:w-[64%] lg:h-[650px] lg:w-[61%]"
              >
                <Image
                  src="/images/details-05.jpg"
                  alt="BD BUILDERS"
                  fill
                  priority
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 64vw, 42vw"
                  className="object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/[0.035]" />
              </div>

              {/* CIRCLE IMAGE */}
              <div
                ref={secondaryImageRef}
                className="absolute bottom-[4%] left-[3%] z-20 h-[205px] w-[205px] overflow-hidden rounded-full border-[8px] border-[#eee8dc] sm:bottom-[5%] sm:left-[2%] sm:h-[285px] sm:w-[285px] lg:bottom-[4%] lg:left-[1%] lg:h-[315px] lg:w-[315px]"
              >
                <Image
                  src="/images/details-03.jpg"
                  alt="Estora interior"
                  fill
                  sizes="(max-width: 640px) 205px, (max-width: 1024px) 285px, 315px"
                  className="object-cover"
                />
              </div>

              {/* ARCHITECTURAL LINE */}
              <div className="pointer-events-none absolute bottom-[17%] left-[28%] z-10 hidden h-px w-[25%] bg-black/15 sm:block" />

              {/* SMALL LABEL */}
              <div
                ref={ringRef}
                className="absolute right-[4%] top-[4%] z-30 hidden lg:block"
              >
                <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full border border-black/20 bg-[#eee8dc]/80 backdrop-blur-sm">
                  <span className="text-center text-[8px] font-medium uppercase leading-[1.5] tracking-[0.2em] text-black/55">
                    SM
                    <br />
                    Builders
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
