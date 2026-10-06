"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition() {
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = transitionRef.current;

    if (!el) return;

    gsap.set(el, {
      yPercent: 100,
    });

    gsap.to(el, {
      yPercent: 0,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(el, {
          yPercent: -100,
        });

        gsap.to(el, {
          yPercent: 0,
          duration: 0.75,
          ease: "power3.inOut",
        });
      },
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;
      if (href.startsWith("http")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;
      if (link.target === "_blank") return;

      const currentPath = window.location.pathname;
      const targetPath = new URL(href, window.location.origin).pathname;

      if (currentPath === targetPath) return;

      event.preventDefault();

      const el = transitionRef.current;

      if (!el) {
        window.location.href = href;
        return;
      }

      gsap.killTweensOf(el);

      gsap.to(el, {
        yPercent: 0,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => {
          window.location.href = href;
        },
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={transitionRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] bg-[#171717]"
    />
  );
}
