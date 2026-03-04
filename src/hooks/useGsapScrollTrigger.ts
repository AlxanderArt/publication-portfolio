"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: ScrollTrigger.Vars;
}

export function useGsapScrollTrigger<T extends HTMLElement>(
  options: ScrollTriggerOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          ...options.from,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          ...options.to,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
            ...options.trigger,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
