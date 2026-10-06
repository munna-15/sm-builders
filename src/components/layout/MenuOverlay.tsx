"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { site } from "@/data/site";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#f3f1eb] text-[#171717]"
        >
          <div className="flex h-full flex-col px-8 py-7 md:px-12">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-[0.3em]">SM BUILDERS</span>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center gap-2 text-xs tracking-[0.25em]"
              >
                CLOSE
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 items-center">
              <div className="flex flex-col gap-5">
                {site.navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-5xl font-light tracking-[-0.04em] transition-opacity hover:opacity-50 md:text-7xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <div className="flex justify-between text-[10px] tracking-[0.25em] text-black/50">
              <span>{site.tagline}</span>
              <span>SM Builders / 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
