"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { EVENT_INFO, REGISTRATION_FORM_URL } from "@/constants/event-config";

export function EventDetailsSection() {
  return (
    <section id="detail-acara" className="bg-[#D7E0E8] px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[760px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[28px] font-extrabold text-[#111827] sm:text-[34px]"
        >
          Detail Acara
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-2 max-w-[440px] text-[15px] text-[#6B7280]"
        >
          Catat jadwalnya dan jangan sampai terlewat.
        </motion.p>

        {/* Grid 3 card terpisah */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {EVENT_INFO.map(({ icon: Icon, label, value }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-start gap-3 rounded-2xl border border-[#D7E0E8] bg-[#F7FAFF] p-6 text-left shadow-[0_8px_24px_-12px_rgba(37,99,235,0.15)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#2563EB] shadow-sm">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold uppercase tracking-wide text-[#6B7280]">
                  {label}
                </p>
                <p className="mt-0.5 text-[14.5px] font-semibold leading-snug text-[#111827]">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tombol di luar card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-[9px] bg-[#2563EB] px-6 text-[14px] font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg sm:w-auto"
          >
            Daftar Sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
