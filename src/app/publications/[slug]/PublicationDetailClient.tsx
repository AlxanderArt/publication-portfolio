"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { MediaItem } from "@/types";
import GlassCard from "@/components/GlassCard";

interface Props {
  media: MediaItem[];
}

const VIEWABLE_TYPES = new Set(["pdf", "video", "image"]);

/* ── PDF preloader hook ── */
function usePdfDoc(url: string) {
  const docRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    async function load() {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const doc = await pdfjsLib.getDocument(url).promise;
      if (cancelled) return;
      docRef.current = doc;
      setReady(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { docRef, ready };
}

/* ── PDF Presenter ── */
function PdfPresenter({
  docRef,
  onExit,
}: {
  docRef: React.RefObject<any>;
  onExit: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const totalPages = docRef.current?.numPages ?? 0;

  // Render current page
  useEffect(() => {
    if (!docRef.current || page < 1) return;

    async function renderPage() {
      const pdfPage = await docRef.current.getPage(page);
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const unscaledViewport = pdfPage.getViewport({ scale: 1 });

      const scale = Math.min(
        containerWidth / unscaledViewport.width,
        (containerHeight - 48) / unscaledViewport.height
      );
      const viewport = pdfPage.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const ctx = canvas.getContext("2d")!;
      await pdfPage.render({ canvasContext: ctx, viewport }).promise;
    }

    renderPage();
  }, [page, docRef]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setPage((p) => Math.min(p + 1, totalPages));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setPage((p) => Math.max(p - 1, 1));
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [totalPages]);

  // Exit when leaving fullscreen
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) onExit();
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [onExit]);

  // Enter fullscreen immediately
  useEffect(() => {
    containerRef.current?.requestFullscreen?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-screen flex-col items-center justify-center bg-black"
    >
      <canvas ref={canvasRef} className="max-h-[calc(100%-3rem)] max-w-full" />
      <div className="flex items-center gap-4 py-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          aria-label="Previous page"
          className="rounded-full px-4 py-3 text-sm text-white/50 transition-colors hover:text-white disabled:opacity-30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="text-xs text-white/50">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="rounded-full px-4 py-3 text-sm text-white/50 transition-colors hover:text-white disabled:opacity-30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Media card ── */
function MediaCard({ item }: { item: MediaItem }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [presenting, setPresenting] = useState(false);
  const canPreview = VIEWABLE_TYPES.has(item.type);

  // Preload PDF in background as soon as card mounts
  const isPdf = item.type === "pdf";
  const { docRef, ready: pdfReady } = usePdfDoc(isPdf ? item.url : "");

  const enterFullscreen = useCallback(() => {
    if (item.type === "pdf" && pdfReady) {
      setPresenting(true);
    } else if (item.type !== "pdf") {
      contentRef.current?.requestFullscreen?.();
    }
  }, [item.type, pdfReady]);

  const exitPresenting = useCallback(() => {
    setPresenting(false);
  }, []);

  return (
    <GlassCard className="overflow-hidden p-6" hover={false}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--fg)]">
          {item.label}
        </span>
        <div className="flex items-center gap-3">
          {canPreview && (
            <button
              onClick={enterFullscreen}
              disabled={isPdf && !pdfReady}
              className="inline-flex items-center gap-2 rounded-full border border-white/[.12] px-4 py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:border-white/[.2] hover:text-[var(--fg)] disabled:opacity-40"
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
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
              Fullscreen
            </button>
          )}
          {item.downloadable && (
            <a
              href={item.url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/[.12] px-4 py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:border-white/[.2] hover:text-[var(--fg)]"
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
              Download
            </a>
          )}
        </div>
      </div>

      {/* PDF present mode */}
      {isPdf && presenting && (
        <PdfPresenter docRef={docRef} onExit={exitPresenting} />
      )}

      {/* Inline preview */}
      <div ref={contentRef} className="[&:fullscreen]:bg-black">
        {item.type === "pdf" && (
          <iframe
            src={item.url}
            className="h-[400px] md:h-[600px] w-full rounded-xl border border-white/[.08]"
            title={item.label}
          />
        )}

        {item.type === "video" && (
          <video
            controls
            className="w-full rounded-xl [div:fullscreen_&]:h-screen [div:fullscreen_&]:rounded-none [div:fullscreen_&]:object-contain"
            preload="metadata"
          >
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {item.type === "image" && (
          <div className="overflow-hidden rounded-xl bg-white/[.03] p-4 [div:fullscreen_&]:flex [div:fullscreen_&]:h-screen [div:fullscreen_&]:items-center [div:fullscreen_&]:justify-center [div:fullscreen_&]:rounded-none [div:fullscreen_&]:bg-black [div:fullscreen_&]:p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.label}
              className="w-full rounded-lg object-contain [div:fullscreen_&]:max-h-full [div:fullscreen_&]:w-auto [div:fullscreen_&]:rounded-none"
            />
          </div>
        )}
      </div>

      {item.type === "presentation" && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/[.06] bg-white/[.02] py-12">
          <svg
            className="h-12 w-12 text-[var(--muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
            />
          </svg>
          <p className="text-sm text-[var(--muted)]">
            PowerPoint presentation — download to view
          </p>
        </div>
      )}
    </GlassCard>
  );
}

export default function PublicationDetailClient({ media }: Props) {
  if (media.length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Media</h2>
      {media.map((item, i) => (
        <MediaCard key={item.url} item={item} />
      ))}
    </div>
  );
}
