"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

/**
 * Renders /public/images/gitready-mascot.png if it exists.
 * Falls back to a simple placeholder so the page never crashes
 * or shows a broken-image icon while the real asset isn't in place yet.
 */
export function Mascot() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#2563EB] to-[#4C8DFF] shadow-lg shadow-blue-500/30 sm:h-52 sm:w-52">
        <Bot className="h-20 w-20 text-white/90 sm:h-24 sm:w-24" aria-hidden="true" />
      </div>
    );
  }

  return (
    <motion.img
      src="/images/gitready-mascot.png"
      alt="Maskot GitReady sedang duduk santai di atas Git branch"
      onError={() => setHasError(true)}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 h-40 w-40 select-none object-contain drop-shadow-[0_20px_30px_rgba(37,99,235,0.25)] sm:h-52 sm:w-52 lg:h-64 lg:w-64"
      draggable={false}
    />
  );
}
