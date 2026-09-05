"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { MINI_FEATURES, TERMINAL_LINES } from "@/constants/hero-config";

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const commands = [...TERMINAL_LINES, ...TERMINAL_LINES];

  return (
    <section id="tentang" data-navbar-theme="dark" className="relative overflow-hidden bg-transparent pb-0 pt-12 text-white sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="max-w-5xl">
          <h2 className="text-balance text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
            Dari perubahan kecil sampai kerja tim yang terarah.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-2 lg:grid-cols-12">
          {MINI_FEATURES.map(({ icon: Icon, label, description, command }, index) => {
            const active = activeIndex === index;
            return (
              <motion.button layout={!reduceMotion} key={label} type="button" onClick={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)} aria-expanded={active} className={`group min-h-48 overflow-hidden rounded-[1.4rem] border border-white/15 p-6 text-left outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-brand-bright lg:min-h-[24rem] ${active ? "bg-brand-soft text-navy-deep lg:col-span-6" : "bg-white/[0.06] text-white hover:bg-white/[0.1] lg:col-span-2"}`}>
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="size-6 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    <ArrowUpRight className={`size-5 transition-transform duration-500 ${active ? "rotate-45" : "opacity-50 group-hover:-translate-y-1 group-hover:translate-x-1"}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] opacity-65">{command}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{label}</h3>
                    <AnimatePresence initial={false}>
                      {active ? (
                        <motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="mt-4 max-w-md text-base leading-7 opacity-80">
                          {description}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-20 border-y border-white/10 py-5">
        <motion.div aria-label="Contoh command Git" animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }} transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }} className="flex w-max whitespace-nowrap">
          {commands.map(({ command, args }, index) => (
            <span key={`${command}-${index}`} aria-hidden={index >= TERMINAL_LINES.length} className="mx-7 font-mono text-sm text-brand-soft sm:mx-10 sm:text-base">
              <span className="text-brand-bright">$</span> {command} <span className="text-white/55">{args}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
