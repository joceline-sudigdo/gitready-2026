"use client";

import { motion } from "framer-motion";

export function GitVisualization() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] select-none lg:max-w-[680px]">
      {/* Floating 3D Artwork */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full"
      >
        <img
          src="/images/Git-Hero.png"
          alt="Visualisasi interaktif GitReady dengan maskot BNCC bersantai di atas Git branch"
          className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.18)]"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}