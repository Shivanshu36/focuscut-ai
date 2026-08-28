import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  /** Background shown behind the cut-out side. */
  afterBackground?: "checkerboard" | "none";
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Original image",
  afterAlt = "Image with background removed",
  className,
  afterBackground = "checkerboard",
}: Props) {
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden rounded-3xl border border-border bg-surface",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className={cn("absolute inset-0", afterBackground === "checkerboard" && "checkerboard")}>
        <img
          src={afterSrc}
          alt={afterAlt}
          loading="lazy"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          loading="lazy"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary-foreground/90"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full gradient-brand shadow-brand">
          <MoveHorizontal className="h-5 w-5 text-primary-foreground" aria-hidden />
        </span>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Compare original and result
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
        Original
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
        SnapCut AI
      </span>
    </div>
  );
}
