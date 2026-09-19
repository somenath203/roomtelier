"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import RoomScene from "./RoomScene";

/**
 * Drag-to-compare slider. Left = original room, right = AI redesign.
 *
 * A transparent native <input type="range"> sits on top, so mouse, touch and
 * keyboard (arrow keys) all work and screen readers get a real slider.
 *
 * Pass beforeSrc + afterSrc (paths in /public) to show real photos.
 * Without them, a themed illustration is shown as a placeholder.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Original room photo",
  afterAlt = "Room redesigned by AI",
  room = "living",
  caption,
  initial = 50,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}) {
  const [position, setPosition] = useState(initial);
  const hasImages = Boolean(beforeSrc && afterSrc);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border bg-muted shadow-xl",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background",
        className
      )}
    >
      {/* After (full width, underneath) */}
      <div className="absolute inset-0">
        {hasImages ? (
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            draggable={false}
          />
        ) : (
          <RoomScene room={room} stage="after" />
        )}
      </div>

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {hasImages ? (
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            draggable={false}
          />
        ) : (
          <RoomScene room={room} stage="before" />
        )}
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
        After
      </span>

      {caption && (
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 max-w-[70%] rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
          {caption}
        </span>
      )}

      {/* Divider and handle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-background shadow-md"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background/70">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>

      {/* Native slider: invisible, but handles input and accessibility */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare the original room with the AI redesign"
        aria-valuetext={`Showing ${position}% of the original room`}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}