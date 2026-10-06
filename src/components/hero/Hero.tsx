"use client";

import { preload } from "react-dom";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { heroSlides } from "@/data/hero";

const IMAGE_REVEAL = 3.6;
const IMAGE_HOLD = 4;
const FIRST_HOLD = 1;

const HEADING_ENTER = 0.8;
const HEADING_EXIT = 0.42;

const HEADING_EXIT_AT = 0.18;
const HEADING_ENTER_AT = 0.6;

const REVERSE_REVEAL = 0.32;
const CINEMATIC_SCALE = 1.045;

preload(heroSlides[0].image, {
  as: "image",
});

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;

    if (!root || !layerA || !layerB || !eyebrow || !title) {
      return;
    }

    const ctx = gsap.context(() => {
      const setHeading = (index: number) => {
        eyebrow.textContent = heroSlides[index].eyebrow;
        title.textContent = heroSlides[index].title;
        setActive(index);
      };

      const hideHeading = (tl: gsap.core.Timeline, time: number) => {
        tl.to(
          eyebrow,
          {
            y: 18,
            opacity: 0,
            duration: HEADING_EXIT,
            ease: "power3.in",
          },
          time,
        );

        tl.to(
          title,
          {
            yPercent: 105,
            opacity: 0,
            filter: "blur(5px)",
            duration: HEADING_EXIT,
            ease: "power3.in",
          },
          time,
        );
      };

      const showHeading = (
        tl: gsap.core.Timeline,
        time: number,
        duration = HEADING_ENTER,
      ) => {
        tl.to(
          eyebrow,
          {
            y: 0,
            opacity: 1,
            duration: duration * 0.65,
            ease: "power3.out",
          },
          time,
        );

        tl.to(
          title,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration,
            ease: "power3.out",
          },
          time,
        );
      };

      setHeading(0);

      gsap.set(root, {
        autoAlpha: 1,
      });

      gsap.set(layerA, {
        backgroundImage: `url(${heroSlides[0].image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 1,
        zIndex: 1,
        scale: 1,
        xPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      gsap.set(layerB, {
        backgroundImage: "none",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0,
        zIndex: 0,
        scale: 1,
        xPercent: 0,
        clipPath: "inset(0% 0% 0% 100%)",
      });

      gsap.set(eyebrow, {
        y: 24,
        opacity: 0,
      });

      gsap.set(title, {
        yPercent: 105,
        opacity: 0,
        filter: "blur(5px)",
      });

      const intro = gsap.timeline({
        onComplete: buildLoop,
      });

      showHeading(intro, 0);

      intro.to(
        {},
        {
          duration: FIRST_HOLD,
        },
      );

      function buildLoop() {
        let currentLayer = layerA;
        let nextLayer = layerB;

        const loop = gsap.timeline({
          paused: true,
          repeat: -1,
        });

        const transition = (
          index: number,
          direction: "forward" | "reverse",
          duration: number,
          hold: number,
        ) => {
          const outgoing = currentLayer;
          const incoming = nextLayer;

          const start = loop.duration();
          const forward = direction === "forward";

          loop.set(
            incoming,
            {
              backgroundImage: `url(${heroSlides[index].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              opacity: 1,
              zIndex: 2,
              scale: forward ? CINEMATIC_SCALE : 1.025,
              xPercent: forward ? 1.2 : -1.5,
              clipPath: forward
                ? "inset(0% 0% 0% 100%)"
                : "inset(0% 100% 0% 0%)",
            },
            start,
          );

          loop.set(
            outgoing,
            {
              opacity: 1,
              zIndex: 1,
            },
            start,
          );

          loop.to(
            incoming,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration,
              ease: forward ? "power3.inOut" : "power4.inOut",
            },
            start,
          );

          loop.to(
            incoming,
            {
              scale: 1,
              xPercent: 0,
              duration,
              ease: "power2.out",
            },
            start,
          );

          if (forward) {
            const headingOutTime = start + duration * HEADING_EXIT_AT;

            const headingInTime = start + duration * HEADING_ENTER_AT;

            hideHeading(loop, headingOutTime);

            loop.call(
              () => {
                setHeading(index);
              },
              [],
              headingInTime,
            );

            loop.set(
              eyebrow,
              {
                y: 24,
                opacity: 0,
              },
              headingInTime,
            );

            loop.set(
              title,
              {
                yPercent: 105,
                opacity: 0,
                filter: "blur(5px)",
              },
              headingInTime,
            );

            showHeading(loop, headingInTime);
          }

          loop.set(
            outgoing,
            {
              opacity: 0,
              zIndex: 0,
            },
            start + duration,
          );

          loop.set(
            incoming,
            {
              opacity: 1,
              zIndex: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              xPercent: 0,
            },
            start + duration,
          );

          currentLayer = incoming;
          nextLayer = outgoing;

          if (hold > 0) {
            loop.to({}, { duration: hold });
          }
        };

        loop.to(
          {},
          {
            duration: FIRST_HOLD,
          },
        );

        transition(1, "forward", IMAGE_REVEAL, IMAGE_HOLD);

        transition(2, "forward", IMAGE_REVEAL, IMAGE_HOLD);

        transition(3, "forward", IMAGE_REVEAL, IMAGE_HOLD);

        hideHeading(loop, loop.duration());

        transition(2, "reverse", REVERSE_REVEAL, 0);

        transition(1, "reverse", REVERSE_REVEAL, 0);

        const imageOneStart = loop.duration();

        const outgoing = currentLayer;
        const incoming = nextLayer;

        loop.set(
          incoming,
          {
            backgroundImage: `url(${heroSlides[0].image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 1,
            zIndex: 2,
            scale: 1.025,
            xPercent: -1.5,
            clipPath: "inset(0% 100% 0% 0%)",
          },
          imageOneStart,
        );

        loop.set(
          outgoing,
          {
            opacity: 1,
            zIndex: 1,
          },
          imageOneStart,
        );

        loop.to(
          incoming,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: REVERSE_REVEAL,
            ease: "power4.inOut",
          },
          imageOneStart,
        );

        loop.to(
          incoming,
          {
            scale: 1,
            xPercent: 0,
            duration: REVERSE_REVEAL,
            ease: "power3.out",
          },
          imageOneStart,
        );

        loop.set(
          outgoing,
          {
            opacity: 0,
            zIndex: 0,
          },
          imageOneStart + REVERSE_REVEAL,
        );

        loop.set(
          incoming,
          {
            opacity: 1,
            zIndex: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            xPercent: 0,
          },
          imageOneStart + REVERSE_REVEAL,
        );

        currentLayer = incoming;
        nextLayer = outgoing;

        const imageOneHeadingStart = imageOneStart + REVERSE_REVEAL + 0.03;

        loop.call(
          () => {
            setHeading(0);
          },
          [],
          imageOneHeadingStart,
        );

        loop.set(
          eyebrow,
          {
            y: 18,
            opacity: 0,
          },
          imageOneHeadingStart,
        );

        loop.set(
          title,
          {
            yPercent: 105,
            opacity: 0,
            filter: "blur(4px)",
          },
          imageOneHeadingStart,
        );

        showHeading(loop, imageOneHeadingStart, 0.55);

        loop.to(
          {},
          {
            duration: FIRST_HOLD,
          },
        );

        loop.play(0);
      }

      intro.play(0);
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const slide = heroSlides[active];

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          ref={layerARef}
          className="absolute inset-0"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            willChange: "transform, clip-path",
          }}
        />

        <div
          ref={layerBRef}
          className="absolute inset-0"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            willChange: "transform, clip-path",
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/15" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/20 via-transparent to-black/65" />

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center">
        <div className="relative w-full max-w-5xl">
          <div className="overflow-hidden">
            <p
              ref={eyebrowRef}
              className="mb-5 text-[9px] uppercase tracking-[0.42em] text-white/65"
            />
          </div>

          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="mx-auto max-w-4xl text-[11vw] font-light leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.3rem]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 right-6 z-30 flex items-end justify-between md:bottom-10 md:left-12 md:right-12">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/50">
            {slide.location}
          </p>

          <p className="mt-2 text-xs tracking-[0.2em] text-white/85">
            SM BUILDERS
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-[9px] tracking-[0.25em] text-white/60">
            0{active + 1}
          </span>

          <div className="flex gap-1">
            {heroSlides.map((item, index) => (
              <span
                key={item.id}
                className={`h-px transition-all duration-700 ${
                  index === active ? "w-8 bg-white" : "w-3 bg-white/30"
                }`}
              />
            ))}
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/50 sm:block">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
