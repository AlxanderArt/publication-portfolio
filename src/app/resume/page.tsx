import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Maxwell Willis",
  description: "Resume and professional background of Maxwell Willis.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
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
          Home
        </Link>

        <h1 className="mb-8 text-3xl font-black tracking-tight md:text-5xl">
          Resume
        </h1>

        <div className="mb-6 flex items-center gap-4">
          <a
            href="/resume/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/[.12] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:border-white/[.2] hover:bg-white/[.06]"
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download PDF
          </a>
        </div>

        {/* PDF viewer */}
        <div className="glass overflow-hidden rounded-3xl">
          <iframe
            src="/resume/resume.pdf"
            className="h-[65vh] md:h-[80vh] w-full"
            title="Resume"
          />
        </div>
      </div>
    </main>
  );
}
