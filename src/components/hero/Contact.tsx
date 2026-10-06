"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      !contentRef.current ||
      !imagesRef.current ||
      !mapRef.current ||
      !servicesRef.current ||
      !footerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const imageItems = gsap.utils.toArray<HTMLElement>(".contact-image");

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(imageItems, {
        opacity: 0,
        y: 22,
        scale: 0.985,
      });

      gsap.set(mapRef.current, {
        opacity: 0,
        x: 25,
      });

      gsap.set(servicesRef.current, {
        opacity: 0,
        y: 18,
      });

      gsap.set(footerRef.current, {
        opacity: 0,
        y: 15,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 25%",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power3.out",
        },
        0,
      )
        .to(
          imageItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.08,
        )
        .to(
          mapRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.14,
        )
        .to(
          servicesRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0.42,
        )
        .to(
          footerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.5,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f0e8] text-[#171717]"
    >
      <div className="mx-auto max-w-[1700px] px-5 py-7 sm:px-7 sm:py-8 md:px-10 md:py-10 lg:px-16 lg:py-12">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#171717]/12 pb-4 sm:pb-5">
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/42 sm:text-[11px] md:text-[12px] md:tracking-[0.4em]">
            SM BUILDERS
          </p>

          <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/30 sm:text-[11px] md:text-[12px] md:tracking-[0.4em]">
            Contact
          </p>
        </div>

        {/* MAIN */}

        <div className="grid grid-cols-1 gap-12 py-12 sm:gap-14 sm:py-14 md:gap-16 md:py-16 lg:grid-cols-[0.92fr_0.68fr_1.4fr] lg:items-center lg:gap-10 lg:py-[8vh] xl:grid-cols-[0.88fr_0.65fr_1.47fr] xl:gap-14">
          {/* CONTENT */}

          <div ref={contentRef}>
            <p className="mb-6 text-[9px] uppercase tracking-[0.38em] text-[#171717]/48 sm:mb-7 sm:text-[10px] md:mb-9 md:text-[12px] md:tracking-[0.42em]">
              Come and meet us
            </p>

            <h1 className="font-serif text-[clamp(3.8rem,11vw,9rem)] leading-[0.76] tracking-[-0.075em] sm:text-[clamp(4.5rem,8vw,9rem)]">
              Give us
              <br />a visit.
            </h1>

            <p className="mt-8 max-w-[430px] text-[13px] leading-6 text-[#171717]/58 sm:mt-9 sm:text-[14px] sm:leading-7 md:mt-12 md:text-[16px] md:leading-8">
              Visit ESTORA Properties and speak with our team about your next
              property decision. Whether you are looking to buy, sell or explore
              an opportunity, we are here to help.
            </p>

            <div className="mt-9 border-t border-[#171717]/15 pt-5 sm:mt-10 md:mt-12 md:pt-6">
              <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/38 sm:text-[10px] md:text-[11px] md:tracking-[0.38em]">
                Location
              </p>

              <p className="mt-3 font-serif text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.055em] sm:text-[clamp(2.2rem,3.5vw,3.6rem)]">
                Mymensingh
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#171717]/40 sm:text-[11px] md:text-[12px] md:tracking-[0.3em]">
                Bangladesh
              </p>

              <a
                href="tel:+8801575464185"
                className="group mt-6 flex w-fit items-center gap-3 sm:mt-7"
              >
                <div className="flex flex-col gap-5">
                  <span className="text-[15px] tracking-[0.04em] text-[#171717]/68 sm:text-[17px] md:text-[18px]">
                    +880 1931-571413
                  </span>
                  <span className="text-[15px] tracking-[0.04em] text-[#171717]/68 sm:text-[17px] md:text-[18px]">
                    smbuildersmym@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* IMAGE COMPOSITION */}

          <div
            ref={imagesRef}
            className="relative mx-auto h-[470px] w-full max-w-[285px] sm:h-[510px] sm:max-w-[300px] md:h-[540px] md:max-w-[310px] lg:h-[520px] lg:max-w-[280px] xl:h-[560px]"
          >
            {/* APARTMENT */}

            <div className="contact-image absolute left-0 top-0 z-10 w-[72%]">
              <div className="aspect-[4/5] overflow-hidden bg-[#ded8cd]">
                <img
                  src="/images/properties/property-06.avif"
                  alt="Apartment"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[7px] uppercase tracking-[0.28em] text-[#171717]/40">
                  01
                </span>

                <span className="text-[7px] uppercase tracking-[0.22em] text-[#171717]/40">
                  Apartment
                </span>
              </div>
            </div>

            {/* PROJECT */}

            <div className="contact-image absolute right-0 top-[150px] z-20 w-[67%] sm:top-[165px] md:top-[175px] lg:top-[175px]">
              <div className="aspect-[4/5] overflow-hidden bg-[#d9d3c8]">
                <img
                  src="/images/properties/property-07.avif"
                  alt="Interior"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[7px] uppercase tracking-[0.28em] text-[#171717]/40">
                  02
                </span>

                <span className="text-[7px] uppercase tracking-[0.22em] text-[#171717]/40">
                  Project
                </span>
              </div>
            </div>

            {/* DETAIL */}

            <div className="contact-image absolute bottom-0 left-[10%] z-30 w-[57%]">
              <div className="aspect-[5/4] overflow-hidden bg-[#d2ccc1]">
                <img
                  src="/images/properties/property-08.avif"
                  alt="Architectural detail"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[7px] uppercase tracking-[0.28em] text-[#171717]/40 sm:text-[8px]">
                  03
                </span>

                <span className="text-[8px] uppercase tracking-[0.22em] text-[#171717]/40 sm:text-[10px]">
                  Project
                </span>
              </div>
            </div>
          </div>

          {/* MAP */}

          <div ref={mapRef} className="relative">
            <div className="relative h-[420px] min-h-0 w-full overflow-hidden bg-[#ddd8ce] sm:h-[500px] md:h-[560px] lg:h-[68svh] lg:min-h-[520px] lg:max-h-[700px]">
              <iframe
                title="Mymensingh map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.334%2C24.70%2C90.430%2C24.775&layer=mapnik"
                className="absolute inset-0 h-full w-full border-0 grayscale"
                loading="lazy"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#e7e0d4]/20 mix-blend-multiply" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7 md:left-8 md:top-8">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#171717]/45 sm:text-[11px] md:text-[12px] md:tracking-[0.4em]">
                  SM BUilders
                </p>

                <p className="mt-2 font-serif text-[clamp(2.4rem,8vw,4.6rem)] leading-[0.82] tracking-[-0.06em] text-[#171717]/72 sm:mt-3">
                  Mymensingh
                </p>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-5 sm:bottom-7 sm:left-7 sm:right-7 sm:flex-row sm:items-end sm:justify-between md:bottom-8 md:left-8 md:right-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.26em] text-white/70 sm:text-[10px] md:text-[11px] md:tracking-[0.3em]">
                    Mymensingh · Bangladesh
                  </p>

                  <p className="mt-2 text-[10px] text-white/55 sm:text-[11px] md:text-[12px]">
                    Flat · Land · Share Land
                  </p>
                </div>

                <a
                  href="https://www.openstreetmap.org/?mlat=24.7471&mlon=90.4203#map=13/24.7471/90.4203"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/85 sm:text-[10px] md:text-[11px] md:tracking-[0.3em]"
                >
                  Open in Maps
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.1}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}

        <div
          ref={servicesRef}
          className="border-t border-[#171717]/12 py-8 sm:py-9 md:py-10"
        >
          <div className="mb-6 flex items-center justify-between sm:mb-7">
            <p className="text-[9px] uppercase tracking-[0.34em] text-[#171717]/40 sm:text-[10px] md:text-[11px] md:tracking-[0.4em]">
              What we help with
            </p>

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/25 sm:text-[10px]">
              SM BUILDERs
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[#171717]/10 sm:grid-cols-4">
            <div className="border-b border-[#171717]/10 py-5 pr-4 sm:border-b-0 sm:border-r sm:py-6 sm:pr-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/35">
                01
              </p>

              <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.04em]">
                Flats
              </p>
            </div>

            <div className="border-b border-[#171717]/10 py-5 pl-4 sm:border-b-0 sm:border-r sm:px-6 sm:py-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/35">
                02
              </p>

              <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.04em]">
                Land
              </p>
            </div>

            <div className="border-r border-[#171717]/10 py-5 pr-4 sm:px-6 sm:py-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/35">
                03
              </p>

              <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.04em]">
                Share Land
              </p>
            </div>

            <div className="py-5 pl-4 sm:py-6 sm:pl-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#171717]/35">
                04
              </p>

              <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.95] tracking-[-0.04em]">
                Property Support
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT FOOTER */}
      </div>
    </section>
  );
}
