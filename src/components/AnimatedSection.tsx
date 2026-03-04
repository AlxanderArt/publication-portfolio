"use client";

import { useGsapScrollTrigger } from "@/hooks/useGsapScrollTrigger";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useGsapScrollTrigger<HTMLElement>({
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, delay },
  });

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
