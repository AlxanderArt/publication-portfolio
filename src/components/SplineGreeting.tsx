"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const SPLINE_URL = "https://my.spline.design/untitled-1nDuiu7uBg6Y5jG8u0T6naqf-aLO/";
const PLAY_DURATION = 4500;
const MAX_WAIT = 8000;

// Module-level flag: resets on full page refresh, persists on client-side nav
let hasPlayedThisPageLoad = false;

type GreetingState = "loading" | "playing" | "exiting" | "done";

interface SplineGreetingProps {
  onComplete: () => void;
}

export default function SplineGreeting({ onComplete }: SplineGreetingProps) {
  const [state, setState] = useState<GreetingState>(() => {
    if (hasPlayedThisPageLoad) return "done";
    return "loading";
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fallbackRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startExit = useCallback(() => {
    if (state === "exiting" || state === "done") return;
    setState("exiting");
    hasPlayedThisPageLoad = true;

    const overlay = overlayRef.current;
    if (!overlay) {
      setState("done");
      onComplete();
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.05,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        setState("done");
        onComplete();
      },
    });
  }, [state, onComplete]);

  const handleIframeLoad = useCallback(() => {
    if (state !== "loading") return;
    setState("playing");
    timerRef.current = setTimeout(startExit, PLAY_DURATION);
  }, [state, startExit]);

  // Fallback: if iframe never loads, transition after MAX_WAIT
  useEffect(() => {
    if (state === "done") {
      onComplete();
      return;
    }
    if (state === "loading") {
      fallbackRef.current = setTimeout(startExit, MAX_WAIT);
    }
    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, [state, startExit, onComplete]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0b0b0b" }}
    >
      <iframe
        src={SPLINE_URL}
        onLoad={handleIframeLoad}
        className="h-full w-full border-0"
        style={{ background: "#0b0b0b" }}
        title="Welcome"
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin"
      />
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" role="status" aria-label="Loading" />
        </div>
      )}
    </div>
  );
}
