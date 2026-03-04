"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { publications, getAllCategories } from "@/data/publications";
import CategoryFilter from "./CategoryFilter";
import PublicationCard from "./PublicationCard";

gsap.registerPlugin(ScrollTrigger);

export default function PublicationsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = getAllCategories();
  const filtered =
    activeCategory === "All"
      ? publications
      : publications.filter((p) => p.category === activeCategory);

  // Staggered entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Re-animate cards on filter change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="publications" className="section-padding opacity-0">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          Publications
        </h2>

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        <div
          ref={gridRef}
          className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((pub, i) => (
            <PublicationCard key={pub.slug} publication={pub} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-[var(--muted)]">
            No publications in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
