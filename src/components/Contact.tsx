"use client";

import AnimatedSection from "./AnimatedSection";
import GlassCard from "./GlassCard";

export default function Contact() {
  return (
    <AnimatedSection id="contact" className="section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          Get in Touch
        </h2>
        <p className="mb-10 text-base font-light text-[var(--muted)] md:text-lg">
          Interested in collaboration or have questions about my work? Feel free
          to reach out.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <GlassCard className="inline-flex items-center gap-3 px-6 py-3">
            <svg
              className="h-5 w-5 text-[var(--muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <a
              href="mailto:contact@maxwellwillis.com"
              className="text-sm font-medium text-[var(--fg)]"
            >
              contact@maxwellwillis.com
            </a>
          </GlassCard>

          <GlassCard className="inline-flex items-center gap-3 px-6 py-3">
            <svg
              className="h-5 w-5 text-[var(--muted)]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <a
              href="https://linkedin.com/in/maxwellwillis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--fg)]"
            >
              LinkedIn
            </a>
          </GlassCard>
        </div>
      </div>
    </AnimatedSection>
  );
}
