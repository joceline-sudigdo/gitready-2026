"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function GitVisualization() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.15 }} className="relative mx-auto w-full max-w-[58rem] select-none">
      <Image src="/images/Git-Hero.png" alt="Maskot BNCC berada di atas visualisasi alur branch Git" width={1120} height={920} priority draggable={false} className="h-auto w-full object-contain drop-shadow-[0_2rem_3rem_rgba(3,28,64,0.32)]" />
    </motion.div>
  );
}
