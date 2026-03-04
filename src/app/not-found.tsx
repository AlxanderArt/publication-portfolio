import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-[var(--fg)]">404</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[.12] px-6 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:border-white/[.2] hover:text-[var(--fg)]"
      >
        Back to Home
      </Link>
    </main>
  );
}
