"use client";

import { useEffect, useRef, useState } from "react";

const TRANSITION_DELAY = 2750;
const TRANSITION_DURATION = 1150;

export function PageTransition() {
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const completeTransition = () => {
      if (completedRef.current) {
        return;
      }

      completedRef.current = true;

      const transitionState = window as Window & {
        __smBuildersTransitionComplete?: boolean;
      };

      transitionState.__smBuildersTransitionComplete = true;

      window.dispatchEvent(new CustomEvent("sm-builders-transition-complete"));

      document.body.style.overflow = "";

      setVisible(false);
    };

    const timer = window.setTimeout(
      completeTransition,
      TRANSITION_DELAY + TRANSITION_DURATION,
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="sm-builders-transition fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#11110f]">
      {/* Ambient light */}
      <div className="sm-transition-glow pointer-events-none absolute left-1/2 top-1/2 h-[42vw] w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

      {/* Main architectural frame */}
      <div className="sm-transition-frame pointer-events-none absolute inset-[6.5%] border border-white/[0.085]" />

      {/* Inner frame */}
      <div className="sm-transition-inner-frame pointer-events-none absolute inset-[7%] border border-white/[0.025]" />

      {/* Corner details */}
      <div className="sm-transition-corner sm-corner-1 absolute left-[6.5%] top-[6.5%] h-10 w-10 border-l border-t border-white/25" />

      <div className="sm-transition-corner sm-corner-2 absolute right-[6.5%] top-[6.5%] h-10 w-10 border-r border-t border-white/25" />

      <div className="sm-transition-corner sm-corner-3 absolute bottom-[6.5%] left-[6.5%] h-10 w-10 border-b border-l border-white/25" />

      <div className="sm-transition-corner sm-corner-4 absolute bottom-[6.5%] right-[6.5%] h-10 w-10 border-b border-r border-white/25" />

      {/* Architectural horizontal guides */}
      <div className="sm-guide sm-guide-left absolute left-[6.5%] top-1/2 h-px w-[12%] bg-white/[0.06]" />

      <div className="sm-guide sm-guide-right absolute right-[6.5%] top-1/2 h-px w-[12%] bg-white/[0.06]" />

      {/* Center */}
      <div className="relative flex flex-col items-center">
        <div className="sm-transition-brand relative whitespace-nowrap text-[clamp(1.05rem,2vw,1.55rem)] font-medium uppercase tracking-[0.65em] text-white">
          SM BUILDERS
          <div className="sm-transition-sweep pointer-events-none absolute inset-y-[-100%] left-[-35%] w-[16%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-[5px]" />
        </div>

        <div className="sm-transition-divider relative mt-6 h-px w-32 overflow-hidden bg-white/[0.09]">
          <div className="sm-transition-divider-fill absolute inset-0 origin-left bg-white/60" />
        </div>

        <p className="sm-transition-subtitle mt-4 text-[8px] uppercase tracking-[0.5em] text-white/35">
          Real Estate · Development
        </p>
      </div>

      {/* Progress */}
      <div className="absolute bottom-[6.5%] left-1/2 h-px w-24 -translate-x-1/2 overflow-hidden bg-white/[0.06]">
        <div className="sm-transition-progress h-full origin-left bg-white/30" />
      </div>

      <style jsx>{`
        .sm-builders-transition {
          animation: sm-builders-transition-out ${TRANSITION_DURATION}ms
            cubic-bezier(0.76, 0, 0.16, 1) ${TRANSITION_DELAY}ms forwards;
        }

        .sm-transition-glow {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.65);
          animation: sm-glow-in 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s
            forwards;
        }

        .sm-transition-frame {
          opacity: 0;
          transform: scale(0.94);
          animation:
            sm-frame-in 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards,
            sm-frame-out 0.65s ease 2.5s forwards;
        }

        .sm-transition-inner-frame {
          opacity: 0;
          transform: scale(1.06);
          animation:
            sm-inner-frame-in 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards,
            sm-inner-frame-out 0.65s ease 2.5s forwards;
        }

        .sm-transition-corner {
          opacity: 0;
          animation:
            sm-corner-in 0.85s ease 0.25s forwards,
            sm-corner-out 0.5s ease 2.45s forwards;
        }

        .sm-corner-1 {
          transform: translate(-14px, -14px);
        }

        .sm-corner-2 {
          transform: translate(14px, -14px);
        }

        .sm-corner-3 {
          transform: translate(-14px, 14px);
        }

        .sm-corner-4 {
          transform: translate(14px, 14px);
        }

        .sm-guide {
          transform: scaleX(0);
          animation:
            sm-guide-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards,
            sm-guide-out 0.45s ease 2.45s forwards;
        }

        .sm-guide-left {
          transform-origin: right center;
        }

        .sm-guide-right {
          transform-origin: left center;
        }

        .sm-transition-brand {
          opacity: 0;
          transform: translateY(28px) scale(0.92);
          filter: blur(10px);
          animation:
            sm-brand-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards,
            sm-brand-out 0.6s cubic-bezier(0.76, 0, 0.16, 1) 2.35s forwards;
        }

        .sm-transition-divider {
          transform: scaleX(0);
          opacity: 0;
          animation:
            sm-divider-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.95s forwards,
            sm-divider-out 0.45s ease 2.4s forwards;
        }

        .sm-transition-divider-fill {
          transform: scaleX(0);
          animation: sm-divider-fill 0.85s ease 1.05s forwards;
        }

        .sm-transition-subtitle {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(4px);
          animation:
            sm-subtitle-in 0.8s ease 1.2s forwards,
            sm-subtitle-out 0.5s ease 2.35s forwards;
        }

        .sm-transition-sweep {
          transform: translateX(-120%);
          animation: sm-sweep 1.05s cubic-bezier(0.16, 1, 0.3, 1) 0.95s forwards;
        }

        .sm-transition-progress {
          transform: scaleX(0);
          animation: sm-progress 2.75s linear forwards;
        }

        @keyframes sm-glow-in {
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes sm-frame-in {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sm-frame-out {
          to {
            opacity: 0;
            transform: scale(1.035);
          }
        }

        @keyframes sm-inner-frame-in {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sm-inner-frame-out {
          to {
            opacity: 0;
            transform: scale(1.02);
          }
        }

        @keyframes sm-corner-in {
          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        @keyframes sm-corner-out {
          to {
            opacity: 0;
          }
        }

        @keyframes sm-guide-in {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes sm-guide-out {
          to {
            transform: scaleX(0);
            opacity: 0;
          }
        }

        @keyframes sm-brand-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
            letter-spacing: 0.3em;
          }
        }

        @keyframes sm-brand-out {
          to {
            opacity: 0;
            transform: translateY(-18px) scale(0.97);
            filter: blur(4px);
          }
        }

        @keyframes sm-divider-in {
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes sm-divider-fill {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes sm-divider-out {
          to {
            transform: scaleX(0);
            opacity: 0;
          }
        }

        @keyframes sm-subtitle-in {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
            letter-spacing: 0.5em;
          }
        }

        @keyframes sm-subtitle-out {
          to {
            opacity: 0;
            transform: translateY(-9px);
            filter: blur(3px);
          }
        }

        @keyframes sm-sweep {
          to {
            transform: translateX(720%);
          }
        }

        @keyframes sm-progress {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes sm-builders-transition-out {
          to {
            transform: translateY(-100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sm-builders-transition,
          .sm-transition-glow,
          .sm-transition-frame,
          .sm-transition-inner-frame,
          .sm-transition-corner,
          .sm-guide,
          .sm-transition-brand,
          .sm-transition-divider,
          .sm-transition-divider-fill,
          .sm-transition-subtitle,
          .sm-transition-sweep,
          .sm-transition-progress {
            animation: none !important;
          }

          .sm-builders-transition {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
}
