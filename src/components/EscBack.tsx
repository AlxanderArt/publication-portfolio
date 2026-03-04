"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function EscBack() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't interfere with native fullscreen ESC
      if (document.fullscreenElement) return;

      if (e.key === "Escape" && pathname !== "/") {
        e.preventDefault();
        router.back();
      }

      // Toggle Next.js dev indicator with /
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const indicator = document.querySelector("nextjs-portal") as HTMLElement;
        if (indicator) {
          indicator.style.display = indicator.style.display === "none" ? "" : "none";
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [router, pathname]);

  return null;
}
