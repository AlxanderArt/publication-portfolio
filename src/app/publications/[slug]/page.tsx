import { notFound } from "next/navigation";
import Link from "next/link";
import { publications, getPublicationBySlug } from "@/data/publications";
import type { Metadata } from "next";
import PublicationDetailClient from "./PublicationDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return { title: "Not Found" };
  return {
    title: `${pub.title} | Maxwell Willis`,
    description: pub.description,
    openGraph: {
      title: pub.title,
      description: pub.description,
      type: "article",
    },
  };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  const currentIndex = publications.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? publications[currentIndex - 1] : null;
  const next =
    currentIndex < publications.length - 1
      ? publications[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link
          href="/#publications"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Publications
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/[.12] px-4 py-1 text-xs font-medium text-[var(--muted)]">
              {pub.category}
            </span>
            <span className="text-xs text-[var(--muted)]">
              {new Date(pub.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">
            {pub.title}
          </h1>
          {(pub.client || pub.role) && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              {pub.client && <span>Client: {pub.client}</span>}
              {pub.role && <span>Role: {pub.role}</span>}
            </div>
          )}
          <p className="mt-6 text-base font-light leading-relaxed text-[var(--muted)] md:text-lg">
            {pub.description}
          </p>
        </div>

        {/* Cover image */}
        <div className="glass mb-10 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pub.coverImage}
            alt={pub.title}
            className="w-full object-cover"
          />
        </div>

        {/* Media items */}
        <PublicationDetailClient media={pub.media} />

        {/* Tags */}
        {pub.tags && pub.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {pub.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[.08] px-3 py-1 text-xs text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-white/[.08] pt-8">
          {prev ? (
            <Link
              href={`/publications/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/publications/${next.slug}`}
              className="group flex items-center gap-2 text-right text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              {next.title}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
