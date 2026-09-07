"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { EndlessRunnerGame } from "@/components/game/viva-run";
import { GitWorkflowSimulator } from "@/components/git/GitWorkflowSim";

export function ExperienceSections() {
  return (
    <>
      <SimulatorSection />
      <VivaRunSection />
    </>
  );
}

export function SimulatorSection() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? false : { opacity: 0, y: 28 };
  return (
    <section id="simulator-git" data-navbar-theme="dark" className="bg-navy-deep py-28 text-white sm:py-36 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="font-mono text-sm text-brand-bright">git status</p>
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Coba alurnya, lihat perubahannya.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100/75">Pindahkan perubahan dari working directory sampai GitHub dan pahami fungsi setiap perintah.</p>
          </div>
          </motion.div>
        <GitWorkflowSimulator />
      </div>
    </section>
  );
}

export function VivaRunSection() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? false : { opacity: 0, y: 28 };
  return (
    <section id="viva-run" data-navbar-theme="dark" className="bg-[#020814] py-28 text-white sm:py-36 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div initial={reveal} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="mb-12 ml-auto max-w-4xl text-right">
          <p className="font-mono text-sm tracking-[0.16em] text-blue-300">Viva Run</p>
          <h2 className="mt-4 text-balance text-4xl font-medium italic tracking-[-0.045em] sm:text-6xl">Berpindah branch. Kumpulkan commit.</h2>
        </motion.div>

        {/* Frame ala VivaRunThree */}
        <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#020814] shadow-[0_28px_90px_rgba(1,8,24,0.42)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <GitBranch className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-200/45">branch / main</p>
                <p className="text-sm font-semibold text-white">Viva Run: commit trail</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <EndlessRunnerGame variant="head" />
          </div>
        </div>
      </div>
    </section>
  );
}