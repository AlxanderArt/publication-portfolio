"use client";

import AnimatedSection from "./AnimatedSection";
import GlassCard from "./GlassCard";

export default function About() {
  return (
    <AnimatedSection id="about" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
          About
        </h2>
        <GlassCard className="mx-auto max-w-3xl p-8 md:p-12" hover={false}>
          <p className="text-base font-light leading-relaxed text-[var(--muted)] md:text-lg">
            Maxwell Willis is a visual designer specializing in publication
            design, infographics, and data visualization. His work focuses on
            translating complex research, policy, and analytical information
            into clear, engaging visuals that support effective communication
            and decision-making.
          </p>
          <p className="mt-6 text-base font-light leading-relaxed text-[var(--muted)] md:text-lg">
            With experience in report design, digital media, motion graphics,
            and branded publications, Maxwell develops visual materials that
            help organizations communicate insights to both technical and
            public audiences. His design approach combines strategic thinking
            with strong visual storytelling to produce publications that are
            clear, accessible, and visually compelling.
          </p>
          <p className="mt-6 text-base font-light leading-relaxed text-[var(--muted)] md:text-lg">
            Based in the Dallas–Fort Worth metroplex, Maxwell works at the
            intersection of design, information, and communication to help
            organizations present their ideas with clarity and impact.
          </p>
        </GlassCard>
      </div>
    </AnimatedSection>
  );
}
