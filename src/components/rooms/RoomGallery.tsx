
"use client";

import { useRef, useState } from "react";
import type { RoomImage } from "@/lib/types";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { cn } from "@/lib/utils";

export function RoomGallery({ roomName, images }: { roomName: string; images: RoomImage[] }) {
  const gallery = images.length
    ? images
    : [{ id: "placeholder", room_id: "", image_url: "", alt_text: roomName, sort_order: 0, created_at: "" }];

  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const hasMultiple = gallery.length > 1;

  function goTo(idx: number) {
    setActive((idx + gallery.length) % gallery.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    const SWIPE_THRESHOLD = 40;
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goTo(active - 1);
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goTo(active + 1);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  return (
    <div>
      <div
        className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] select-none"
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchMove={hasMultiple ? handleTouchMove : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
      >
        <ImageFallback
          src={gallery[active]?.image_url}
          alt={gallery[active]?.alt_text || roomName}
          label={roomName}
          className="h-full w-full"
        />

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/40 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/60"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/40 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/60"
            >
              <ChevronIcon direction="right" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {gallery.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    idx === active ? "w-5 bg-ivory" : "w-1.5 bg-ivory/50",
                  )}
                />
              ))}
            </div>

            <span className="absolute top-3 right-3 rounded-full bg-charcoal/40 px-2.5 py-1 text-[11px] font-label text-ivory backdrop-blur-sm">
              {active + 1} / {gallery.length}
            </span>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3">
          {gallery.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => goTo(idx)}
              className={`aspect-square rounded-lg overflow-hidden ring-2 transition-colors ${
                idx === active ? "ring-maroon" : "ring-transparent"
              }`}
              aria-label={`Show image ${idx + 1}`}
            >
              <ImageFallback src={img.image_url} alt={img.alt_text || roomName} className="h-full w-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
