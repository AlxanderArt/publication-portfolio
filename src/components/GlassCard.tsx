"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  as: Component = "div",
}: GlassCardProps) {
  return (
    <Component
      className={twMerge(
        clsx(
          "glass",
          hover && "transition-all duration-300 hover:border-white/[.14]",
          className
        )
      )}
    >
      {children}
    </Component>
  );
}
