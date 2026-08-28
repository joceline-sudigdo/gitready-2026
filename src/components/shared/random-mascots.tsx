"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ── Mascot assets ──────────────────────────────────────────────────────────
const MASCOTS = [
  { src: "/images/Robot Happy.png",   w: 130, h: 143 },
  { src: "/images/Robot Cute.png",    w: 110, h: 121 },
  { src: "/images/Robot Cookie.png",  w: 120, h: 132 },
  { src: "/images/Robot Peek.png",    w: 120, h: 132 },
  { src: "/images/Robot XX Eyes.png", w: 105, h: 116 },
];

// ── Available gutter slots (side + vertical position) ─────────────────────
// These stay inside the left/right page gutters (outside gr-container).
// "left"/"right" values are px from the viewport edge — always within the
// ~192 px gutter that exists at xl breakpoints (≥ 1280 px).
const ALL_SLOTS = [
  { side: "left"  as const, top: "6%"  },
  { side: "left"  as const, top: "28%" },
  { side: "left"  as const, top: "52%" },
  { side: "left"  as const, top: "76%" },
  { side: "right" as const, top: "14%" },
  { side: "right" as const, top: "38%" },
  { side: "right" as const, top: "62%" },
  { side: "right" as const, top: "84%" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// ── Types ──────────────────────────────────────────────────────────────────
interface SlotConfig {
  src: string;
  w: number;
  h: number;
  side: "left" | "right";
  top: string;
  edgePx: number;       // px from the viewport edge (stays in gutter)
  opacity: number;
  floatAmt: number;
  floatDur: number;
  mirrored: boolean;
  delay: number;
}

interface Props {
  /** Total number of mascots to show. Guaranteed ≥ 1 per side. Default 4. */
  count?: number;
}

// ── Component ──────────────────────────────────────────────────────────────
export function RandomMascots({ count = 4 }: Props) {
  const [configs, setConfigs] = useState<SlotConfig[] | null>(null);

  useEffect(() => {
    const clampedCount = Math.max(2, Math.min(count, ALL_SLOTS.length));

    // Shuffle mascots and slots independently each refresh
    const mascots = shuffle(MASCOTS);

    // Always pick at least 1 left + 1 right slot, then fill the rest randomly
    const leftSlots  = shuffle(ALL_SLOTS.filter(s => s.side === "left"));
    const rightSlots = shuffle(ALL_SLOTS.filter(s => s.side === "right"));

    const half        = Math.floor(clampedCount / 2);
    const pickedLeft  = leftSlots.slice(0, half);
    const pickedRight = rightSlots.slice(0, clampedCount - half);
    const picked      = shuffle([...pickedLeft, ...pickedRight]);

    const result: SlotConfig[] = picked.map((slot, i) => ({
      src:      mascots[i % mascots.length].src,
      w:        mascots[i % mascots.length].w,
      h:        mascots[i % mascots.length].h,
      side:     slot.side,
      top:      slot.top,
      edgePx:   Math.round(rand(0, 28)),     // 0–28 px from edge — safe in gutter
      opacity:  rand(0.14, 0.26),
      floatAmt: rand(8, 18),
      floatDur: rand(2.4, 4.2),
      mirrored: Math.random() > 0.5,
      delay:    i * 0.12,
    }));

    setConfigs(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once per mount (= once per page load / refresh)

  // Render nothing on the server — avoids hydration mismatch
  if (!configs) return null;

  return (
    <>
      {configs.map((c, i) => (
        <motion.div
          key={i}
          // Entrance: slide in from the edge + fade in
          initial={{ opacity: 0, x: c.side === "left" ? -36 : 36 }}
          whileInView={{ opacity: c.opacity, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          // Continuous float (y) runs independently of the entrance
          animate={{ y: [0, -c.floatAmt, 0] }}
          transition={{
            opacity: { duration: 0.9, delay: c.delay, ease: "easeOut" },
            x:       { duration: 0.9, delay: c.delay, ease: "easeOut" },
            y:       { duration: c.floatDur, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute z-0 hidden select-none xl:block"
          style={{
            [c.side]: `${c.edgePx}px`,
            top: c.top,
          }}
        >
          <Image
            src={c.src}
            alt=""
            width={c.w}
            height={c.h}
            className={c.mirrored ? "scale-x-[-1]" : ""}
            aria-hidden
          />
        </motion.div>
      ))}
    </>
  );
}
