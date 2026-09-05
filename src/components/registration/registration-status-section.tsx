"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { GITREADY_EVENT } from "@/constants/event-config";

export function RegistrationStatusSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="daftar" data-navbar-theme="light" aria-labelledby="registration-status-title" className="bg-canvas px-6 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduceMotion ? 0 : 0.7 }} className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-7 py-14 text-white sm:px-12 sm:py-20 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-brand-bright">GitReady {GITREADY_EVENT.year}</p>
            <h2 id="registration-status-title" className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">Siap saat pendaftaran resmi dibuka.</h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-lg leading-8 text-blue-100/75">Formulir akan aktif di sini setelah jadwal dan tautan resmi tersedia.</p>
            {GITREADY_EVENT.registrationUrl ? (
              <a href={GITREADY_EVENT.registrationUrl} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-brand-bright px-6 font-semibold text-navy-deep transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Daftar sekarang <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            ) : (
              <span aria-disabled="true" className="mt-7 inline-flex min-h-12 cursor-not-allowed items-center rounded-xl bg-white/12 px-6 font-semibold text-white/70">Pendaftaran segera dibuka</span>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
