"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Search } from "lucide-react";

import { MenuOverlay } from "./MenuOverlay";
import { SearchOverlay } from "./SearchOverlay";

import { site } from "@/data/site";

import { MenuButton } from "../ui/MenuButton";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;
      const difference = currentScrollY - previousScrollY;

      setScrolled(currentScrollY > 30);

      if (currentScrollY <= 10) {
        setVisible(true);
      } else if (difference > 2) {
        setVisible(false);
      } else if (difference < -2) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;

    const html = document.documentElement;
    const body = document.body;

    html.style.overflowY = "scroll";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflowY = "";
      body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-[94px] px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 md:px-12 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-black/55 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex h-full items-center justify-between text-white">
          <MenuButton
            open={menuOpen}
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen(true);
            }}
          />

          <button
            type="button"
            aria-label={site.name}
            onClick={() => {
              if (window.location.pathname === "/") {
                window.dispatchEvent(new Event("estora-scroll-top"));
              } else {
                window.location.href = "/";
              }
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/logo/logo-2.jpg"
              alt={site.name}
              width={170}
              height={65}
              priority
              className="h-[58px] w-[150px] object-contain object-center"
            />
          </button>

          <div className="flex items-center gap-5 text-[10px] tracking-[0.22em] sm:gap-6 sm:text-xs">
            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex items-center justify-center transition-opacity duration-300 hover:opacity-50"
            >
              <Search size={17} strokeWidth={1.25} className="sm:hidden" />

              <span className="hidden items-center gap-2 sm:flex">
                SEARCH
                <Search size={14} strokeWidth={1.5} />
              </span>
            </button>

            <a href="#contact">CONTACT</a>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
