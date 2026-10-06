"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  { label: "Properties", href: "/properties" },
  { label: "Our Approach", href: "#our-approach" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "Messenger",
    href: "https://m.me/",
    icon: "messenger",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: "facebook",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "instagram",
  },
];

function SocialIcon({ type }: { type: string }) {
  if (type === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[17px] w-[17px]"
      >
        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
        <rect
          x="2.5"
          y="5"
          width="19"
          height="14"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M10 9v6l5-3-5-3Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.51 1.32 4.75 3.48 6.19L6 21l4.13-2.27c.6.17 1.23.27 1.87.27 4.97 0 9-3.58 9-8S16.97 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.2c1.15 2.1 2.75 3.25 4.8 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-[#E7E0D4] text-[#171717]"
    >
      {/* Premium architectural artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.13]"
        style={{
          backgroundImage: "url('/images/estora-footer-graffiti.jpg')",
        }}
      />

      {/* Soft surface layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#E7E0D4]/55"
      />

      {/* Architectural line accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[#171717]/[0.035]"
      />

      <div className="relative z-10 mx-auto max-w-[1700px] px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-[72px]">
        {/* Brand / Contact / Explore */}
        <div className="footer-reveal grid grid-cols-1 gap-12 border-b border-[#171717]/15 pb-12 md:grid-cols-[1.35fr_0.75fr_0.75fr] md:gap-10 md:pb-14">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Estora Properties home"
              className="inline-block"
            >
              <div className="overflow-hidden">
                <Image
                  src="/logo/logo-2.jpg"
                  alt="ESTORA Properties"
                  width={520}
                  height={180}
                  className="
                    h-auto
                    w-[180px]
                    mix-blend-multiply
                    object-contain
                    sm:w-[205px]
                    md:w-[225px]
                  "
                  priority
                />
              </div>
            </Link>

            <div className="mt-5">
              <a
                href="tel:+8801575464185"
                className="group inline-flex items-center gap-3 text-[18px] tracking-[0.015em] text-[#171717]/78 transition-opacity duration-300 hover:opacity-55 sm:text-[20px]"
              >
                01931-571413
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <p className="py-2 text-[18px] tracking-[0.015em] text-[#171717]/78 transition-opacity duration-300 hover:opacity-55 sm:text-[20px]">
                smbuildersmym@gmail.com
              </p>

              <p className="mt-2 text-[14px] uppercase tracking-[0.25em] text-[#171717]">
                Your trusted property partner
              </p>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[14px] uppercase tracking-[0.32em] text-[#171717]/42">
              Location
            </p>

            <p className="mt-5 font-serif text-[41px] leading-none tracking-[-0.045em] text-[#171717]/82">
              Mymensingh
            </p>

            <p className="mt-3 text-[14px] uppercase tracking-[0.28em] text-[#171717]/45">
              Bangladesh
            </p>

            <div className="mt-7 h-px w-10 bg-[#171717]/20" />

            <p className="mt-5 max-w-[220px] text-[18px] leading-6 text-[#171717]/52">
              Property guidance for buying, selling and finding the right
              opportunity.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[18px] uppercase tracking-[0.32em] text-[#171717]/72">
              Explore
            </p>

            <nav className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex w-fit items-center gap-2.5 text-[12px] uppercase tracking-[0.12em] text-[#171717]/68 transition-colors duration-300 hover:text-[#171717]"
                >
                  {item.label}

                  <ArrowUpRight
                    size={11}
                    strokeWidth={1}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-65"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Services + Social */}
        <div className="footer-reveal flex flex-col gap-8 border-b border-[#171717]/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-4 text-[14px] uppercase tracking-[0.32em] text-[#171717]/38">
              Property
            </p>

            <div className="flex flex-wrap gap-x-7 gap-y-3">
              <span className="text-[13px] uppercase tracking-[0.16em] text-[#171717]/58">
                Flats
              </span>

              <span className="text-[13px] uppercase tracking-[0.16em] text-[#171717]/58">
                Land
              </span>

              <span className="text-[13px] uppercase tracking-[0.16em] text-[#171717]/58">
                Share Land
              </span>

              <span className="text-[13px] uppercase tracking-[0.14em] text-[#171717]/58">
                Property Support
              </span>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[13px] uppercase tracking-[0.32em] text-[#171717]/68 sm:text-right">
              Follow
            </p>

            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="
                    group
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#171717]/13
                    bg-[#E7E0D4]/45
                    text-[#171717]/60
                    backdrop-blur-[2px]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#171717]/25
                    hover:bg-[#171717]
                    hover:text-[#E7E0D4]
                  "
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-reveal flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#171717]/38">
            © 2026 SM BUILDERS
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#171717]/38">
              Buy
            </span>

            <span className="text-[10px] uppercase tracking-[0.18em] text-[#171717]/38">
              Sell
            </span>

            <span className="text-[10px] uppercase tracking-[0.18em] text-[#171717]/38">
              Property Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
