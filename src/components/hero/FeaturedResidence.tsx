"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const residences = [
  {
    image: "/images/properties/property-06.avif",
    number: "01",
    label: "The House of Light",
    location: "Gulshan · Dhaka",
    type: "Private Residence",
    size: "7,200 SQ FT",
    statement: "A residence defined by light, proportion and quiet detail.",
    description:
      "A considered composition where generous spaces, natural light and contemporary living come together with restraint.",
  },
  {
    image: "/images/properties/property-07.avif",
    number: "02",
    label: "Architectural Perspective",
    location: "Gulshan · Dhaka",
    type: "Contemporary Residence",
    size: "Private Collection",
    statement: "Space shaped around a calmer way of living.",
    description:
      "A refined residential perspective built around openness, balance and an effortless relationship between space and light.",
  },
  {
    image: "/images/properties/property-08.avif",
    number: "03",
    label: "A Considered Residence",
    location: "Dhaka · Bangladesh",
    type: "Private Residence",
    size: "By Enquiry",
    statement: "Quiet architecture with a sense of permanence.",
    description:
      "An understated residence presented through proportion, material and the details that make a property feel distinctly its own.",
  },
];

export default function FeaturedResidence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cinematicRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroShadeRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cinematic = cinematicRef.current;

    if (!section || !cinematic) return;

    const ctx = gsap.context(() => {
      const galleryItems = Array.from(
        section.querySelectorAll<HTMLElement>(".residence-item"),
      );

      gsap.set(heroImageRef.current, {
        width: "52vw",
        height: "60vh",
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(heroMediaRef.current, {
        scale: 1.1,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(heroShadeRef.current, {
        opacity: 0,
      });

      gsap.set(introRef.current, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(statementRef.current, {
        autoAlpha: 0,
        scale: 0.52,
        y: 24,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(closingRef.current, {
        autoAlpha: 0,
        y: 24,
      });

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      galleryItems.forEach((item) => {
        const image = item.querySelector<HTMLElement>(".gallery-image");
        const content = item.querySelector<HTMLElement>(".gallery-content");

        if (image) {
          gsap.set(image, {
            scale: 1.06,
            y: 20,
            force3D: true,
          });
        }

        if (content) {
          gsap.set(content, {
            autoAlpha: 0,
            y: 20,
          });
        }
      });

      /* CINEMATIC — PRESERVED */

      const cinematicTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cinematic,
          start: "top top",
          end: "+=1200",
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cinematicTimeline
        .to(
          introRef.current,
          {
            autoAlpha: 0,
            y: -25,
            duration: 0.18,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          heroImageRef.current,
          {
            width: "72vw",
            height: "70vh",
            duration: 0.38,
            ease: "power3.inOut",
          },
          0.04,
        )
        .to(
          heroMediaRef.current,
          {
            scale: 1,
            duration: 0.38,
            ease: "power2.out",
          },
          0.04,
        )
        .to(
          statementRef.current,
          {
            autoAlpha: 1,
            scale: 0.72,
            y: 0,
            duration: 0.28,
            ease: "power3.out",
          },
          0.28,
        )
        .to(
          heroImageRef.current,
          {
            width: "100vw",
            height: "100vh",
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.46,
        )
        .to(
          heroMediaRef.current,
          {
            scale: 1.025,
            duration: 0.42,
            ease: "none",
          },
          0.46,
        )
        .to(
          statementRef.current,
          {
            scale: 1,
            duration: 0.72,
            ease: "power3.inOut",
          },
          0.48,
        )
        .to(
          heroShadeRef.current,
          {
            opacity: 0.045,
            duration: 0.18,
            ease: "none",
          },
          0.86,
        )
        .to(
          heroMediaRef.current,
          {
            scale: 1.045,
            duration: 0.34,
            ease: "none",
          },
          1.02,
        )
        .to(
          ".hero-label",
          {
            autoAlpha: 0,
            duration: 0.18,
            ease: "power2.out",
          },
          1.16,
        );

      /* PROPERTY PRESENTATION */

      galleryItems.forEach((item, index) => {
        const image = item.querySelector<HTMLElement>(".gallery-image");
        const content = item.querySelector<HTMLElement>(".gallery-content");

        if (!image || !content) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            end: "top 58%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            image,
            {
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            0,
          )
          .to(
            content,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            0.12,
          );

        if (index === 1) {
          gsap.to(item, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (index === 2) {
          gsap.to(item, {
            y: -55,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      /* CLOSING */

      if (closingRef.current) {
        gsap.to(closingRef.current, {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 88%",
            end: "top 62%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
      }

      /* PROGRESS */

      if (progressRef.current) {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (!progressRef.current) return;

            gsap.set(progressRef.current, {
              scaleX: self.progress,
            });
          },
        });
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#eee8dc] text-[#171717]"
    >
      {/* CINEMATIC */}

      <div
        ref={cinematicRef}
        className="relative h-[100svh] min-h-[620px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#eee8dc]" />

        <div className="hero-label absolute left-6 top-7 z-30 sm:left-8 md:left-10 md:top-9">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/50">
            SM BUILDERS
          </p>
        </div>

        <div className="hero-label absolute right-6 top-7 z-30 sm:right-8 md:right-10 md:top-9">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/50">
            Featured Residence
          </p>
        </div>

        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-5 text-[8px] uppercase tracking-[0.4em] text-[#171717]/45">
            Private Collection · 01
          </p>

          <h2 className="font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[0.88] tracking-[-0.045em]">
            Featured Residence
          </h2>

          <p className="mt-6 text-[8px] uppercase tracking-[0.34em] text-[#171717]/45">
            The House of Light
          </p>
        </div>

        <div
          ref={heroImageRef}
          className="absolute left-1/2 top-1/2 z-10 overflow-hidden bg-[#d7d0c3]"
        >
          <div ref={heroMediaRef} className="absolute inset-0">
            <Image
              src="/images/properties/image-04.avif"
              alt="The House of Light"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            ref={heroShadeRef}
            className="pointer-events-none absolute inset-0 bg-black"
          />
        </div>

        <div
          ref={statementRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center sm:px-8"
        >
          <h3 className="max-w-[1100px] font-serif text-[clamp(2.8rem,7vw,7.5rem)] leading-[0.86] tracking-[-0.055em] text-white">
            Where light becomes
            <br />
            architecture.
          </h3>
        </div>

        <div className="hero-label absolute bottom-7 left-6 z-30 sm:left-8 md:bottom-9 md:left-10">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/50">
            Gulshan · Dhaka
          </p>
        </div>

        <div className="hero-label absolute bottom-7 right-6 z-30 sm:right-8 md:bottom-9 md:right-10">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/50">
            Scroll to explore
          </p>
        </div>
      </div>

      {/* PROPERTY PRESENTATION */}

      <div className="relative px-5 pb-28 pt-16 sm:px-8 sm:pb-36 sm:pt-24 md:px-12 lg:px-16 lg:pb-44 lg:pt-32">
        <div className="mx-auto max-w-[1500px]">
          {/* INTRO */}

          <div className="grid grid-cols-1 gap-10 border-b border-[#171717]/15 pb-12 md:grid-cols-12 md:gap-12 md:pb-16">
            <div className="md:col-span-8">
              <p className="mb-5 text-[9px] uppercase tracking-[0.38em] text-[#171717]/45">
                The House of Light
              </p>

              <h3 className="max-w-[900px] font-serif text-[clamp(3rem,6.5vw,7rem)] leading-[0.84] tracking-[-0.055em]">
                A residence defined
                <br />
                by light and proportion.
              </h3>
            </div>

            <div className="flex items-end md:col-span-4">
              <p className="max-w-[360px] text-[14px] leading-7 text-[#171717]/55 md:text-[15px] md:leading-8">
                A considered composition of space, material and natural light,
                presented as part of ESTORA&apos;s private property collection.
              </p>
            </div>
          </div>

          {/* RESIDENCES */}

          <div className="mt-16 space-y-28 sm:mt-24 sm:space-y-36 md:mt-32 md:space-y-48 lg:space-y-46">
            {residences.map((residence, index) => (
              <article
                key={residence.number}
                className={`residence-item relative ${
                  index === 1 ? "md:ml-[8%]" : index === 2 ? "md:ml-[8%]" : ""
                }`}
              >
                {/* IMAGE */}

                <div
                  className={`relative overflow-hidden bg-[#d7d0c3] ${
                    index === 0
                      ? "aspect-[1.35] w-full md:w-[42%] h-[90vh]"
                      : index === 1
                        ? "aspect-[1.45] w-full md:ml-auto md:w-[41%] h-[90vh]"
                        : "aspect-[1.28] w-full md:w-[46%] h-[90vh]"
                  }`}
                >
                  <div className="gallery-image absolute inset-0">
                    <Image
                      src={residence.image}
                      alt={residence.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 72vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* CONTENT */}

                <div
                  className={`gallery-content mt-5 md:absolute md:top-[34%] md:mt-0 md:w-[38%] ${
                    index === 0
                      ? "md:right-[8%]"
                      : index === 1
                        ? "md:left-[8%]"
                        : "md:right-[7%]"
                  }`}
                >
                  <div className="border-t border-[#171717]/20 pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.32em] text-[#171717]/45">
                        Residence
                      </span>

                      <span className="text-[9px] tracking-[0.25em] text-[#171717]/40">
                        {residence.number} / 03
                      </span>
                    </div>

                    <h4 className="mt-7 font-serif text-[clamp(2.2rem,3.8vw,4.2rem)] leading-[0.88] tracking-[-0.05em]">
                      {residence.label}
                    </h4>

                    <p className="mt-6 max-w-[430px] text-[14px] leading-7 text-[#171717]/55">
                      {residence.statement}
                    </p>

                    <div className="mt-8 grid grid-cols-3 border-y border-[#171717]/15">
                      <div className="py-4 pr-3">
                        <p className="text-[8px] uppercase tracking-[0.25em] text-[#171717]/40">
                          Location
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-[#171717]/75">
                          {residence.location}
                        </p>
                      </div>

                      <div className="border-x border-[#171717]/15 px-3 py-4">
                        <p className="text-[8px] uppercase tracking-[0.25em] text-[#171717]/40">
                          Type
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-[#171717]/75">
                          {residence.type}
                        </p>
                      </div>

                      <div className="py-4 pl-3">
                        <p className="text-[8px] uppercase tracking-[0.25em] text-[#171717]/40">
                          Detail
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-[#171717]/75">
                          {residence.size}
                        </p>
                      </div>
                    </div>

                    <p className="mt-7 max-w-[390px] text-[12px] leading-6 text-[#171717]/48">
                      {residence.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
