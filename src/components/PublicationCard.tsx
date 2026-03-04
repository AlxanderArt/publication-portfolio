"use client";

import Link from "next/link";
import { Publication } from "@/types";
import GlassCard from "./GlassCard";

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

export default function PublicationCard({
  publication,
  index,
}: PublicationCardProps) {
  return (
    <Link href={`/publications/${publication.slug}`}>
      <GlassCard className="group cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[var(--radius-lg)] bg-white/[.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publication.thumbnail}
            alt={publication.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Category badge */}
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-[var(--fg)] backdrop-blur-md">
            {publication.category}
          </div>
          {publication.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[var(--fg)] backdrop-blur-md">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold leading-snug text-[var(--fg)] group-hover:text-white md:text-lg">
            {publication.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-light text-[var(--muted)]">
            {publication.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">
              {new Date(publication.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
            {publication.client && (
              <span className="text-xs text-[var(--muted)]">
                {publication.client}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
