"use client";

import { useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import gsap from "gsap";

const properties = [
  {
    image: "/images/properties/property-01.jpg",
    address: "Mymensingh",
    details:
      "A refined residence shaped around light, space and contemporary living.",
  },
  {
    image: "/images/properties/property-02.jpg",
    address: "Upazila office, Akua Mymensingh",
    details:
      "Contemporary urban living defined by proportion, privacy and calm.",
  },
  {
    image: "/images/properties/property-03.jpg",
    address: "Mymensingh",
    details:
      "A private residence where generous spaces meet considered architecture.",
  },
  {
    image: "/images/properties/property-04.jpg",
    address: "Aqua uno office, Mymensingh",
    details:
      "An elegant city residence designed for effortless everyday living.",
  },
  {
    image: "/images/properties/property-05.jpg",
    address: "Mymensingh",
    details:
      "Modern residential architecture balanced with warmth and natural light.",
  },
  {
    image: "/images/properties/property-06.avif",
    address: "Bashundhara, Dhaka",
    details:
      "A spacious contemporary home with a strong sense of openness and privacy.",
  },
  {
    image: "/images/properties/property-07.avif",
    address: "Dhaka, Bangladesh",
    details:
      "A distinctive residence created around space, light and refined details.",
  },
];

const slots = [
  {
    width: "clamp(210px, 23vw, 370px)",
    height: "clamp(330px, 52vh, 540px)",
  },
  {
    width: "clamp(340px, 34vw, 580px)",
    height: "clamp(460px, 67vh, 730px)",
  },
  {
    width: "clamp(210px, 23vw, 370px)",
    height: "clamp(330px, 52vh, 540px)",
  },
];

export default function LatestWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const imageLayers = useRef<(HTMLImageElement | null)[][]>([
    [null, null],
    [null, null],
    [null, null],
  ]);

  const infoLayers = useRef<(HTMLDivElement | null)[][]>([
    [null, null],
    [null, null],
    [null, null],
  ]);

  const visibleLayer = useRef([0, 0, 0]);

  const getProperty = (slot: number, index: number) => {
    return properties[(index + slot) % properties.length];
  };

  const preloadImage = (src: string) => {
    return new Promise<void>((resolve) => {
      const image = new Image();

      image.onload = () => resolve();
      image.onerror = () => resolve();

      image.src = src;

      if (image.complete) {
        resolve();
      }
    });
  };

  const changeProperty = async (direction: 1 | -1) => {
    if (animating) return;

    const nextIndex =
      (activeIndex + direction + properties.length) % properties.length;

    const nextProperties = [0, 1, 2].map((slot) =>
      getProperty(slot, nextIndex),
    );

    setAnimating(true);

    try {
      await Promise.all(
        nextProperties.map((property) => preloadImage(property.image)),
      );

      const timeline = gsap.timeline({
        onComplete: () => {
          setActiveIndex(nextIndex);
          setAnimating(false);
        },
      });

      [0, 1, 2].forEach((slot) => {
        const images = imageLayers.current[slot];
        const infos = infoLayers.current[slot];

        const currentLayer = visibleLayer.current[slot];
        const nextLayer = currentLayer === 0 ? 1 : 0;

        const currentImage = images[currentLayer];
        const nextImage = images[nextLayer];

        const currentInfo = infos[currentLayer];
        const nextInfo = infos[nextLayer];

        if (!currentImage || !nextImage || !currentInfo || !nextInfo) {
          return;
        }

        const nextProperty = nextProperties[slot];

        nextImage.src = nextProperty.image;

        gsap.set(nextImage, {
          opacity: 1,
          scale: 1.045,
          clipPath: "inset(0 0 100% 0)",
        });

        gsap.set(currentImage, {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
        });

        const address = nextInfo.querySelector("[data-address]");
        const description = nextInfo.querySelector("[data-description]");

        if (address) {
          address.textContent = nextProperty.address;
        }

        if (description) {
          description.textContent = nextProperty.details;
        }

        gsap.set(nextInfo, {
          opacity: 0,
          y: 24,
        });

        gsap.set(currentInfo, {
          opacity: 1,
          y: 0,
        });

        timeline.to(
          nextImage,
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0,
        );

        timeline.to(
          currentImage,
          {
            opacity: 0,
            scale: 0.985,
            duration: 1,
            ease: "power2.inOut",
          },
          0.08,
        );

        timeline.to(
          currentInfo,
          {
            opacity: 0,
            y: -16,
            duration: 0.4,
            ease: "power2.inOut",
          },
          0.05,
        );

        timeline.to(
          nextInfo,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.48,
        );

        timeline.call(
          () => {
            visibleLayer.current[slot] = nextLayer;
          },
          [],
          1.2,
        );
      });

      timeline.call(() => {
        imageLayers.current.forEach((images, slot) => {
          const visible = visibleLayer.current[slot];
          const hidden = visible === 0 ? 1 : 0;

          const visibleImage = images[visible];
          const hiddenImage = images[hidden];

          if (!visibleImage || !hiddenImage) return;

          hiddenImage.src = nextProperties[slot].image;

          gsap.set(hiddenImage, {
            opacity: 0,
            scale: 1.045,
            clipPath: "inset(0 0 100% 0)",
          });

          gsap.set(visibleImage, {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0 0 0% 0)",
          });
        });
      });
    } catch {
      setAnimating(false);
    }
  };

  const visibleProperties = [
    getProperty(0, activeIndex),
    getProperty(1, activeIndex),
    getProperty(2, activeIndex),
  ];

  return (
    <section className="relative overflow-hidden bg-[#eee8dc] text-[#161616]">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-16 lg:py-32">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[760px]">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-black/45 sm:mb-7 sm:text-[12px] sm:tracking-[0.3em]">
              Estora Properties
            </p>

            <h2 className="font-serif text-[clamp(3.4rem,13vw,6.5rem)] leading-[0.82] tracking-[-0.055em] sm:text-[clamp(4.2rem,9vw,7rem)] lg:text-[clamp(52px,6.5vw,100px)]">
              Selected
              <br />
              Properties.
            </h2>
          </div>

          <p className="max-w-[420px] text-[14px] leading-6 text-black/50 sm:text-[15px] sm:leading-7 lg:pb-3 lg:text-[16px]">
            A curated collection of residences defined by thoughtful
            architecture, generous space and an enduring sense of place.
          </p>
        </div>

        {/* IMAGE SHOWCASE */}
        <div>
          <div className="overflow-visible">
            <div className="mx-auto flex items-end justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-10">
              {[0, 1, 2].map((slot) => {
                const property = visibleProperties[slot];

                return (
                  <div
                    key={slot}
                    className={`relative flex-shrink-0 ${
                      slot === 0
                        ? "order-1"
                        : slot === 1
                          ? "order-2"
                          : "order-3"
                    } ${
                      slot === 0 || slot === 2 ? "hidden sm:block" : "block"
                    }`}
                    style={{
                      width:
                        slot === 1
                          ? "clamp(300px, 42vw, 580px)"
                          : "clamp(190px, 23vw, 370px)",
                    }}
                  >
                    <div
                      className="relative overflow-hidden bg-black/10"
                      style={{
                        height:
                          slot === 1
                            ? "clamp(410px, 67vh, 730px)"
                            : "clamp(290px, 52vh, 540px)",
                      }}
                    >
                      {/* IMAGE LAYER 0 */}
                      <img
                        ref={(el) => {
                          imageLayers.current[slot][0] = el;
                        }}
                        src={property.image}
                        alt={property.address}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      {/* IMAGE LAYER 1 */}
                      <img
                        ref={(el) => {
                          imageLayers.current[slot][1] = el;
                        }}
                        src={property.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{
                          opacity: 0,
                          scale: 1.045,
                          clipPath: "inset(0 0 100% 0)",
                        }}
                      />

                      {/* ATMOSPHERE */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/[0.03]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-7 flex items-center justify-center sm:mt-8">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => changeProperty(-1)}
                disabled={animating}
                aria-label="Previous property"
                className="group flex h-12 w-12 items-center justify-center border border-black/15 transition-all duration-500 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-13 sm:w-13"
              >
                <ArrowLeft
                  size={17}
                  strokeWidth={1.2}
                  className="transition-transform duration-500 group-hover:-translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => changeProperty(1)}
                disabled={animating}
                aria-label="Next property"
                className="group flex h-12 w-12 items-center justify-center border border-black/15 transition-all duration-500 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-13 sm:w-13"
              >
                <ArrowRight
                  size={17}
                  strokeWidth={1.2}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div className="mt-8 sm:mt-10">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
              {[0, 1, 2].map((slot) => {
                const property = visibleProperties[slot];

                return (
                  <div
                    key={slot}
                    className={
                      slot === 0 || slot === 2 ? "hidden lg:block" : "block"
                    }
                  >
                    <div className="relative min-h-[175px] sm:min-h-[185px] lg:min-h-[205px]">
                      {[0, 1].map((layer) => {
                        const layerProperty = property;

                        return (
                          <div
                            key={layer}
                            ref={(el) => {
                              infoLayers.current[slot][layer] = el;
                            }}
                            className="absolute inset-0"
                            style={{
                              opacity: layer === 0 ? 1 : 0,
                              transform:
                                layer === 0
                                  ? "translateY(0)"
                                  : "translateY(24px)",
                            }}
                          >
                            <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                              <span className="h-px w-8 bg-black/25 sm:w-12" />

                              <span
                                data-address
                                className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/60 sm:text-[12px] sm:tracking-[0.2em] md:text-[14px]"
                              >
                                {layerProperty.address}
                              </span>
                            </div>

                            <p
                              data-description
                              className={`leading-[1.7] tracking-[-0.01em] text-black/70 ${
                                slot === 1
                                  ? "max-w-[620px] text-[17px] sm:text-[19px] md:text-[22px]"
                                  : "max-w-[390px] text-[16px] sm:text-[17px] md:text-[19px]"
                              }`}
                            >
                              {layerProperty.details}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-7 flex items-center justify-between border-t border-black/10 pt-6 sm:mt-10 sm:pt-7">
            <span className="text-[9px] uppercase tracking-[0.25em] text-black/45 sm:text-[11px] sm:tracking-[0.3em]">
              Private Residences
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-serif text-2xl sm:text-3xl">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span className="text-black/25">/</span>

              <span className="text-[9px] uppercase tracking-[0.18em] text-black/40 sm:text-[11px] sm:tracking-[0.2em]">
                {String(properties.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
