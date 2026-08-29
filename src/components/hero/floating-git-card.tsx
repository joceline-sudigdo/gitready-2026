"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FloatingGitCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  floatDuration?: number;
  floatDistance?: number;
  /** Hide this card below the given breakpoint to declutter mobile/tablet. */
  hideBelow?: "sm" | "lg" | "none";
};

const HIDE_CLASS: Record<NonNullable<FloatingGitCardProps["hideBelow"]>, string> = {
  sm: "hidden sm:block",
  lg: "hidden lg:block",
  none: "",
};

export function FloatingGitCard({
  children,
  className = "",
  delay = 0,
  floatDuration = 4.5,
  floatDistance = 6,
  hideBelow = "none",
}: FloatingGitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${HIDE_CLASS[hideBelow]} ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatDistance, 0] }}
        transition={{
          duration: floatDuration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="rounded-2xl border border-[#E7EEF7] bg-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.18)] transition-shadow hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.28)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
