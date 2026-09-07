"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { MINI_FEATURES, TERMINAL_LINES } from "@/constants/hero-config";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const commands = [...TERMINAL_LINES, ...TERMINAL_LINES];

  return (
    <section id="tentang" data-navbar-theme="dark" className="relative overflow-hidden bg-transparent pb-0 pt-12 text-white sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.65 }}
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12"
        >
          <h2 className="text-balance text-[clamp(2.4rem,5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            Dari perubahan kecil sampai kerja tim yang terarah
          </h2>
          <div className="max-w-xl lg:pt-3">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.20em] text-[#E6F3FF]">Tentang GitReady 2.0</p>
            <p className="mt-4 text-pretty text-base leading-7 text-blue-100/75 sm:text-lg sm:leading-8">
              GitReady 2.0 adalah workshop hybrid yang membekali mahasiswa dengan Git &amp; GitHub, workflow kolaboratif, dan digital portfolio preparation yang dilengkapi Industrial Lens, Portfolio Review, dan Industry Feedback langsung dari praktisi. Hasilnya: workflow kerja yang terstruktur dan portfolio profesional siap industri.
            </p>
          </div>
        </motion.div>

        <div className="mt-20 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.20em] text-[#E6F3FF]">Benefits</p>
            <h3 className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              Apa yang kamu dapatkan
            </h3>
          </div>
          <p className="hidden max-w-xs text-pretty text-sm leading-6 text-blue-100/55 lg:block">
            Klik salah satu kartu untuk lihat detailnya.
          </p>
        </div>

        <LayoutGroup>
          <div className="mt-8 grid grid-flow-dense grid-cols-1 gap-2 lg:grid-cols-12">
            {MINI_FEATURES.map(({ icon: Icon, label, description, command }, index) => {
              const active = activeIndex === index;
              return (
                <motion.button
                  layout
                  key={label}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-expanded={active}
                  aria-pressed={active}
                  style={{ zIndex: active ? 1 : 0 }}
                  transition={{
                    layout: reduceMotion ? { duration: 0 } : { duration: 0.45, ease: SMOOTH_EASE },
                  }}
                  className={`group relative min-h-36 overflow-hidden rounded-[1.4rem] border border-white/15 p-6 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-bright lg:min-h-[16rem] ${active ? "bg-brand-soft text-navy-deep lg:col-span-6" : "bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.1] lg:col-span-2"}`}
                >
                  <motion.div layout="position" className="flex h-full flex-col justify-between gap-8">
                    <div className="flex items-start justify-between gap-3">
                      <Icon className="size-6 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                      <ArrowUpRight className={`size-5 transition-transform duration-300 ${active ? "rotate-45" : "opacity-50 group-hover:-translate-y-1 group-hover:translate-x-1"}`} aria-hidden="true" />
                    </div>
                    <motion.div layout="position">
                      <p className="font-mono text-xs tracking-[0.12em] opacity-65">{command}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{label}</h3>
                      <AnimatePresence initial={false}>
                        {active ? (
                          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="mt-4 max-w-md text-base leading-7 opacity-80">
                            {description}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
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