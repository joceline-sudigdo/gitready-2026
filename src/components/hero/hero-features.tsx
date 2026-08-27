"use client";

import { motion } from "framer-motion";

import { MINI_FEATURES } from "@/constants/hero-config";

export function HeroFeatures() {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
      }}
      className="grid grid-cols-4 gap-3 sm:gap-4"
    >
      {MINI_FEATURES.map(({ icon: Icon, label }) => (
        <motion.li
          key={label}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF5FF] text-[#2563EB]">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="text-[12px] font-medium leading-tight text-[#374151] sm:text-[13px]">
            {label}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
