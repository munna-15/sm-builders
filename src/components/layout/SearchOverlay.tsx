"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const suggestions = ["Flats", "Land", "Share Land", "Property Support"];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 450);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[#f3f1eb] text-[#171717]"
        >
          <div className="mx-auto flex min-h-[100svh] max-w-[1700px] flex-col px-5 py-6 sm:px-8 sm:py-7 md:px-12 lg:px-16">
            <div className="flex items-center justify-between border-b border-[#171717]/10 pb-5">
              <p className="text-[9px] uppercase tracking-[0.38em] text-[#171717]/45">
                SM BUILDERS
              </p>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-[#171717]/65 transition-opacity duration-300 hover:opacity-45"
              >
                Close
                <X
                  size={17}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
              </button>
            </div>

            <div className="flex flex-1 items-center">
              <div className="w-full">
                <motion.div
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="mb-5 text-[8px] uppercase tracking-[0.4em] text-[#171717]/35 sm:text-[9px]">
                    Search
                  </p>

                  <h2 className="max-w-[1100px] font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.82] tracking-[-0.065em]">
                    What are you
                    <br />
                    looking for?
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-12 max-w-[1050px] sm:mt-16 md:mt-20"
                >
                  <div className="flex items-center gap-4 border-b border-[#171717]/30 pb-4">
                    <Search
                      size={20}
                      strokeWidth={1.2}
                      className="shrink-0 text-[#171717]/45"
                    />

                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search flats, land, share land..."
                      className="min-w-0 flex-1 bg-transparent font-serif text-[clamp(1.5rem,3vw,3rem)] tracking-[-0.035em] outline-none placeholder:text-[#171717]/25"
                    />

                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="shrink-0 text-[#171717]/35 transition-opacity hover:opacity-60"
                      >
                        <X size={17} strokeWidth={1.2} />
                      </button>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.38,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-10 sm:mt-12"
                >
                  <p className="mb-5 text-[8px] uppercase tracking-[0.4em] text-[#171717]/35 sm:text-[9px]">
                    Explore
                  </p>

                  <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#171717]/65 transition-colors duration-300 hover:text-[#171717]"
                      >
                        {item}

                        <ArrowUpRight
                          size={12}
                          strokeWidth={1.1}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {query && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-14 border-t border-[#171717]/10 pt-6"
                  >
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#171717]/35">
                      Searching for
                    </p>

                    <p className="mt-3 font-serif text-[clamp(1.8rem,3vw,3rem)] tracking-[-0.04em]">
                      {query}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-[#171717]/10 pt-4">
              <p className="text-[7px] uppercase tracking-[0.3em] text-[#171717]/25 sm:text-[8px]">
                Property · Land · Support
              </p>

              <p className="text-[7px] uppercase tracking-[0.3em] text-[#171717]/25 sm:text-[8px]">
                ESC / CLOSE
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
