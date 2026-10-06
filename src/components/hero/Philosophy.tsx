"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".philosophy-word");

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(statementRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(detailsRef.current, {
        opacity: 0,
        y: 18,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 45%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0,
        )
        .to(
          words[0],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0.08,
        )
        .to(
          words[1],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0.18,
        )
        .to(
          words[2],
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          0.28,
        )
        .to(
          statementRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          },
          0.42,
        )
        .to(
          detailsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.6,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#eee8dc] text-[#171717]"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 py-7 sm:px-7 sm:py-9 md:px-10 md:py-10 lg:px-14 lg:py-11">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <p className="text-[8px] uppercase tracking-[0.32em] text-[#171717]/45 sm:text-[9px] sm:tracking-[0.38em]">
            Estora Properties
          </p>

          <p className="text-right text-[8px] uppercase tracking-[0.32em] text-[#171717]/45 sm:text-[9px] sm:tracking-[0.38em]">
            Our Philosophy
          </p>
        </div>

        {/* MAIN */}
        <div className="flex flex-1 items-center py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="w-full">
            {/* DIVIDER */}
            <div
              ref={lineRef}
              className="mb-7 h-px w-full bg-[#171717]/20 sm:mb-10 md:mb-12"
            />

            {/* HEADLINE */}
            <div className="overflow-hidden">
              <div className="philosophy-word font-serif text-[clamp(3.45rem,14vw,10.5rem)] leading-[0.8] tracking-[-0.065em] sm:text-[clamp(4.2rem,11vw,10.5rem)]">
                Property
              </div>

              <div className="philosophy-word font-serif text-[clamp(3.45rem,14vw,10.5rem)] leading-[0.8] tracking-[-0.065em] sm:text-[clamp(4.2rem,11vw,10.5rem)]">
                decisions,
              </div>

              <div className="philosophy-word max-w-[1100px] font-serif text-[clamp(3.2rem,13.2vw,10.5rem)] leading-[0.82] tracking-[-0.065em] sm:text-[clamp(4rem,10.5vw,10.5rem)]">
                made with
                <br className="sm:hidden" /> confidence.
              </div>
            </div>

            {/* IMAGE + STATEMENT */}
            <div className="mt-10 grid grid-cols-1 items-start gap-9 sm:mt-12 sm:gap-12 md:mt-16 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1fr)] md:gap-12 lg:mt-20 lg:grid-cols-[minmax(250px,0.62fr)_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-24">
              {/* IMAGE */}
              <div className="w-full">
                <div className="relative mx-auto w-[58%] min-w-[210px] max-w-[330px] md:mx-0 md:w-full md:min-w-0 md:max-w-[300px] lg:max-w-[310px] xl:max-w-[330px]">
                  <div className="relative aspect-[3/4.6] overflow-hidden bg-black/5">
                    <img
                      src="/images/properties/property-06.avif"
                      alt="Estora property"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/[0.03]" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5 sm:p-4">
                      <p className="text-[7px] uppercase tracking-[0.28em] text-white/75 sm:text-[8px]">
                        Estora Properties
                      </p>

                      <p className="text-[7px] uppercase tracking-[0.22em] text-white/65 sm:text-[8px]">
                        07 / 07
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between px-0.5">
                    <span className="text-[7px] uppercase tracking-[0.24em] text-[#171717]/35 sm:text-[8px]">
                      Space · Trust · Clarity
                    </span>

                    <span className="text-[7px] uppercase tracking-[0.2em] text-[#171717]/35 sm:text-[8px]">
                      Property
                    </span>
                  </div>
                </div>
              </div>

              {/* STATEMENT */}
              <div
                ref={statementRef}
                className="flex h-full items-center md:pt-4 lg:pt-8"
              >
                <div className="max-w-[560px]">
                  <p className="text-[15px] leading-7 text-[#171717]/65 sm:text-[16px] sm:leading-7 md:text-[19px] md:leading-8 lg:text-[22px]">
                    Whether it is a flat, land or share land, every property
                    decision deserves clarity, trust and the right support.
                  </p>

                  <p className="mt-5 text-[15px] leading-7 text-[#171717]/65 sm:mt-6 sm:text-[16px] sm:leading-7 md:mt-7 md:text-[19px] md:leading-8 lg:text-[22px]">
                    From finding the right property to completing the deal,
                    Estora is here to make the journey simpler, clearer and more
                    dependable.
                  </p>

                  <div className="mt-8 h-px w-16 bg-[#171717]/20 sm:mt-10 sm:w-20" />

                  <p className="mt-4 text-[8px] uppercase tracking-[0.28em] text-[#171717]/35 sm:text-[9px]">
                    Property decisions, made simpler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER DETAILS */}
        <div
          ref={detailsRef}
          className="grid grid-cols-1 gap-0 border-t border-[#171717]/15 pt-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 sm:pt-6 md:grid-cols-4 md:gap-x-8 md:gap-y-0"
        >
          <div className="flex items-center justify-between border-b border-[#171717]/10 py-4 sm:block sm:border-b-0 sm:py-0">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/35 sm:text-[10px]">
              01
            </p>

            <p className="text-[11px] uppercase tracking-[0.18em] text-[#171717]/60 sm:mt-2 sm:text-[13px] sm:tracking-[0.22em] md:text-[14px]">
              Flats
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-[#171717]/10 py-4 sm:block sm:border-b-0 sm:py-0">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/35 sm:text-[10px]">
              02
            </p>

            <p className="text-[11px] uppercase tracking-[0.18em] text-[#171717]/60 sm:mt-2 sm:text-[13px] sm:tracking-[0.22em] md:text-[14px]">
              Land
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-[#171717]/10 py-4 sm:block sm:border-b-0 sm:py-0">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/35 sm:text-[10px]">
              03
            </p>

            <p className="text-[11px] uppercase tracking-[0.16em] text-[#171717]/60 sm:mt-2 sm:text-[13px] sm:tracking-[0.2em] md:text-[14px]">
              Share Land
            </p>
          </div>

          <div className="flex items-center justify-between py-4 sm:block sm:py-0">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/35 sm:text-[10px]">
              04
            </p>

            <p className="text-right text-[11px] uppercase tracking-[0.13em] text-[#171717]/60 sm:mt-2 sm:text-left sm:text-[13px] sm:tracking-[0.18em] md:text-[14px]">
              Property Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
