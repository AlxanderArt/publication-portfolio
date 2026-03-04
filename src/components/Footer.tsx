import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[.08] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Maxwell Willis. All rights reserved.
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/#about"
            className="py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            About
          </Link>
          <Link
            href="/#publications"
            className="py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Publications
          </Link>
          <Link
            href="/resume"
            className="py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Resume
          </Link>
          <Link
            href="/#contact"
            className="py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
