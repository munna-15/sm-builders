"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurApproach() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const architectureRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      !backgroundRef.current ||
      !imageRef.current ||
      !frameRef.current ||
      !gridRef.current ||
      !architectureRef.current ||
      !materialRef.current ||
      !experienceRef.current ||
      !progressRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const background = backgroundRef.current!;
      const image = imageRef.current!;
      const frame = frameRef.current!;
      const grid = gridRef.current!;
      const architecture = architectureRef.current!;
      const material = materialRef.current!;
      const experience = experienceRef.current!;
      const progress = progressRef.current!;

      gsap.set(background, {
        scale: 1.12,
        x: 0,
        y: 0,
        force3D: true,
      });

      gsap.set(image, {
        scale: 0.8,
        x: 0,
        y: 55,
        rotationY: isMobile ? 0 : -8,
        rotationX: isMobile ? 0 : 3,
        transformPerspective: 1400,
        force3D: true,
      });

      gsap.set(frame, {
        scale: 0.84,
        x: 0,
        y: 0,
        rotationY: isMobile ? 0 : 6,
        rotationX: isMobile ? 0 : -2,
        transformPerspective: 1400,
        force3D: true,
      });

      gsap.set(grid, {
        scale: 1.08,
        x: 0,
        y: 0,
        rotation: 0,
        force3D: true,
      });

      /*
       * Initial heading states
       */

      gsap.set(architecture, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotationY: 0,
        force3D: true,
      });

      gsap.set(material, {
        autoAlpha: 0,
        x: isMobile ? 70 : 220,
        y: isMobile ? 20 : 40,
        scale: isMobile ? 0.9 : 0.82,
        rotationY: isMobile ? 0 : -10,
        transformPerspective: 1400,
        force3D: true,
      });

      gsap.set(experience, {
        autoAlpha: 0,
        x: isMobile ? -70 : -220,
        y: isMobile ? 20 : 40,
        scale: isMobile ? 0.9 : 0.82,
        rotationY: isMobile ? 0 : 10,
        transformPerspective: 1400,
        force3D: true,
      });

      /*
       * MASTER TIMELINE
       */

      const tl = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=1350" : "+=1650",
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * 00 — OPENING CAMERA
       */

      tl.to(
        background,
        {
          scale: 1.035,
          x: isMobile ? -10 : -28,
          y: -12,
          duration: 1.2,
          ease: "none",
        },
        0,
      );

      tl.to(
        image,
        {
          scale: 1,
          x: isMobile ? 8 : 55,
          y: 0,
          rotationY: isMobile ? 0 : -2,
          rotationX: isMobile ? 0 : 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        frame,
        {
          scale: 1,
          x: isMobile ? -5 : -38,
          y: -10,
          rotationY: isMobile ? 0 : 2.5,
          rotationX: isMobile ? 0 : -1,
          duration: 1.2,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        grid,
        {
          x: isMobile ? 4 : 28,
          y: -8,
          scale: 1.02,
          duration: 1.2,
          ease: "none",
        },
        0,
      );

      /*
       * 01 — ARCHITECTURE
       *
       * Architecture stays visible first.
       */

      tl.to(
        architecture,
        {
          x: isMobile ? -90 : -260,
          y: isMobile ? -25 : -70,
          scale: isMobile ? 0.88 : 0.76,
          rotationY: isMobile ? 0 : 10,
          autoAlpha: 0,
          duration: 0.16,
          ease: "power3.in",
        },
        0.28,
      );

      /*
       * Small completely-empty transition gap.
       *
       * Architecture is already at autoAlpha 0.
       * Material has NOT started yet.
       */

      /*
       * 02 — MATERIAL ENTER
       *
       * Starts only after Architecture is completely gone.
       */

      tl.to(
        material,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.12,
          ease: "power3.out",
        },
        0.46,
      );

      /*
       * MATERIAL HOLD
       *
       * Gives the heading a clean readable moment.
       */

      tl.to(
        material,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "none",
        },
        0.58,
      );

      /*
       * CAMERA MOVEMENT — MATERIAL
       *
       * Kept exactly as before.
       */

      tl.to(
        background,
        {
          scale: isMobile ? 1.01 : 1,
          x: isMobile ? 8 : 35,
          y: 8,
          duration: 0.8,
          ease: "none",
        },
        0.42,
      );

      tl.to(
        image,
        {
          x: isMobile ? -12 : -72,
          y: isMobile ? 8 : 28,
          scale: isMobile ? 1.045 : 1.08,
          rotationY: isMobile ? 0 : 5,
          rotationX: isMobile ? 0 : -1.5,
          duration: 0.8,
          ease: "none",
        },
        0.42,
      );

      tl.to(
        frame,
        {
          x: isMobile ? 8 : 58,
          y: 25,
          scale: isMobile ? 1.025 : 1.07,
          rotationY: isMobile ? 0 : -4,
          duration: 0.8,
          ease: "none",
        },
        0.42,
      );

      tl.to(
        grid,
        {
          x: isMobile ? -8 : -48,
          y: 18,
          scale: 1.07,
          rotation: isMobile ? 0 : -1.5,
          duration: 0.8,
          ease: "none",
        },
        0.42,
      );

      /*
       * 02 — MATERIAL EXIT
       *
       * Material fully disappears.
       */

      tl.to(
        material,
        {
          x: isMobile ? 100 : 290,
          y: isMobile ? -30 : -80,
          scale: isMobile ? 0.88 : 0.76,
          rotationY: isMobile ? 0 : -11,
          autoAlpha: 0,
          duration: 0.14,
          ease: "power3.in",
        },
        0.78,
      );

      /*
       * IMPORTANT:
       *
       * Material finishes at 0.92.
       * Experience starts at 0.94.
       *
       * Therefore there is NO overlap.
       */

      /*
       * 03 — EXPERIENCE ENTER
       */

      tl.to(
        experience,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.12,
          ease: "power3.out",
        },
        0.94,
      );

      /*
       * FINAL CAMERA
       */

      tl.to(
        background,
        {
          scale: 0.99,
          x: isMobile ? 15 : 48,
          y: 18,
          duration: 0.9,
          ease: "none",
        },
        0.82,
      );

      tl.to(
        image,
        {
          x: isMobile ? 15 : 82,
          y: isMobile ? -4 : -40,
          scale: isMobile ? 1 : 0.97,
          rotationY: isMobile ? 0 : -4,
          rotationX: isMobile ? 0 : 1.5,
          duration: 0.9,
          ease: "none",
        },
        0.82,
      );

      tl.to(
        frame,
        {
          x: isMobile ? -8 : -72,
          y: -14,
          scale: isMobile ? 1 : 0.95,
          rotationY: isMobile ? 0 : 4,
          duration: 0.9,
          ease: "none",
        },
        0.82,
      );

      tl.to(
        grid,
        {
          x: isMobile ? 12 : 60,
          y: -22,
          scale: 1.03,
          duration: 0.9,
          ease: "none",
        },
        0.82,
      );

      /*
       * EXPERIENCE FINAL DEPTH
       */

      tl.to(
        experience,
        {
          x: isMobile ? -20 : -70,
          y: isMobile ? -8 : -25,
          scale: isMobile ? 0.97 : 0.92,
          rotationY: isMobile ? 0 : 4,
          duration: 0.75,
          ease: "none",
        },
        0.9,
      );

      /*
       * PROGRESS
       */

      tl.to(
        progress,
        {
          scaleX: 1,
          duration: 1,
          ease: "none",
        },
        0,
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#11110f] text-white"
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* BACKGROUND */}

        <div
          ref={backgroundRef}
          className="absolute inset-[-8%] z-0 will-change-transform"
        >
          <Image
            src="/images/properties/image-02.avif"
            alt="Estora architectural residence"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_25%,rgba(0,0,0,0.5)_100%)]" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50" />
        </div>

        {/* IMAGE */}

        <div
          ref={imageRef}
          className="absolute bottom-[16%] left-[9%] right-[9%] top-[17%] z-10 overflow-hidden will-change-transform sm:left-[13%] sm:right-[13%] md:left-[18%] md:right-[18%]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/images/properties/image-05.avif"
            alt="SM architecture"
            fill
            sizes="(max-width: 768px) 82vw, 64vw"
            className="object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* GRID */}

        <div
          ref={gridRef}
          className="pointer-events-none absolute inset-[-5%] z-20 will-change-transform"
        >
          <div className="absolute left-[8%] top-[15%] h-px w-[84%] bg-white/20" />

          <div className="absolute bottom-[15%] left-[8%] h-px w-[84%] bg-white/20" />

          <div className="absolute left-[8%] top-[15%] h-[70%] w-px bg-white/15" />

          <div className="absolute right-[8%] top-[15%] h-[70%] w-px bg-white/15" />

          <div className="absolute left-1/2 top-[15%] h-[70%] w-px bg-white/[0.08]" />

          <div className="absolute left-[20%] top-[28%] h-px w-[60%] bg-white/[0.06]" />

          <div className="absolute left-[20%] top-[72%] h-px w-[60%] bg-white/[0.06]" />
        </div>

        {/* TOP */}

        <div className="pointer-events-none absolute left-6 right-6 top-6 z-50 flex justify-between text-[8px] uppercase tracking-[0.32em] text-white/65 sm:left-9 sm:right-9 sm:top-8 sm:text-[9px] md:left-12 md:right-12">
          <span>Estora Properties</span>

          <span className="hidden sm:block">
            Architecture · Material · Experience
          </span>
        </div>

        {/* CONTENT */}

        <div className="pointer-events-none absolute inset-0 z-40">
          {/* ARCHITECTURE */}

          <div
            ref={architectureRef}
            className="absolute left-[8%] top-[32%] max-w-[500px] will-change-transform sm:left-[10%] md:left-[12%]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="mb-5 text-[8px] uppercase tracking-[0.4em] text-white/55 sm:text-[9px]">
              01 · Architecture
            </p>

            <h2 className="font-serif text-[clamp(3rem,6vw,6.8rem)] leading-[0.86] tracking-[-0.055em]">
              Spaces
              <br />
              <span className="text-white/65">with intention.</span>
            </h2>

            <p className="mt-7 max-w-[350px] text-[13px] leading-6 text-white/65 sm:text-[14px]">
              Proportion, light and structure considered together to create
              spaces that feel natural and enduring.
            </p>
          </div>

          {/* MATERIAL */}

          <div
            ref={materialRef}
            className="absolute right-[8%] top-[32%] max-w-[500px] text-right will-change-transform sm:right-[10%] md:right-[12%]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="mb-5 text-[8px] uppercase tracking-[0.4em] text-white/55 sm:text-[9px]">
              02 · Material
            </p>

            <h2 className="font-serif text-[clamp(3rem,6vw,6.8rem)] leading-[0.86] tracking-[-0.055em]">
              Details
              <br />
              <span className="text-white/65">that belong.</span>
            </h2>

            <p className="mt-7 ml-auto max-w-[350px] text-[13px] leading-6 text-white/65 sm:text-[14px]">
              Material, texture and atmosphere brought together with a restraint
              that allows every element to breathe.
            </p>
          </div>

          {/* EXPERIENCE */}

          <div
            ref={experienceRef}
            className="absolute left-1/2 top-[32%] w-[88%] -translate-x-1/2 text-center will-change-transform"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="mb-6 text-[8px] uppercase tracking-[0.42em] text-white/55 sm:text-[9px]">
              03 · Experience
            </p>

            <h2 className="font-serif text-[clamp(3.2rem,8vw,8.5rem)] leading-[0.82] tracking-[-0.065em]">
              Designed
              <br />
              <span className="text-white/65">to feel lived in.</span>
            </h2>
          </div>
        </div>

        {/* FRAME */}

        <div
          ref={frameRef}
          className="pointer-events-none absolute bottom-[13%] left-[7%] right-[7%] top-[13%] z-30 border border-white/20 will-change-transform sm:left-[9%] sm:right-[9%] md:left-[12%] md:right-[12%]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute left-[-1px] top-[-1px] h-6 w-6 border-l border-t border-white/70" />

          <div className="absolute right-[-1px] top-[-1px] h-6 w-6 border-r border-t border-white/70" />

          <div className="absolute bottom-[-1px] left-[-1px] h-6 w-6 border-b border-l border-white/70" />

          <div className="absolute bottom-[-1px] right-[-1px] h-6 w-6 border-b border-r border-white/70" />
        </div>

        {/* BOTTOM */}

        <div className="pointer-events-none absolute bottom-8 left-6 right-6 z-50 flex items-end justify-between text-[8px] uppercase tracking-[0.32em] text-white/60 sm:bottom-9 sm:left-9 sm:right-9 sm:text-[9px] md:left-12 md:right-12">
          <span>Our Approach</span>

          <span>Scroll to explore</span>
        </div>

        {/* PROGRESS */}

        <div className="pointer-events-none absolute bottom-0 left-0 z-[60] h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-white/75"
          />
        </div>
      </div>
    </section>
  );
}
