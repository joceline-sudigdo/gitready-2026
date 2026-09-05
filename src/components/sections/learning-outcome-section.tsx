"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  GitMerge,
  FlaskConical,
  Layers,
  Users,
} from "lucide-react";
import Image from "next/image";
import { learningPoints } from "@/constants/learning-points";

// Konten sumber: Isi Konten Website GitReady with LnT — Bagian 4. Materi Workshop
const ICONS = [GitBranch, GitMerge, FlaskConical, Layers, Users];

export function LearningOutcomeSection() {
  return (
    <section id="materi" className="relative overflow-hidden py-16 sm:py-20">
      <div className="gr-container relative z-10">

        {/* Heading — black title with navy bar */}
        <div className="mb-10">
          <div className="mb-2 h-1 w-10 rounded-full" style={{ backgroundColor: "#003F7A" }} />
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Apa yang Akan Anda Pelajari?
          </h2>
        </div>

        {/* 5-col grid: left 3 cols wider, right 2 cols */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* LEFT — vertical stacked cards */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            {learningPoints.map((point, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(0,63,122,0.1)", color: "#003F7A" }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-sm font-bold text-ink">{point.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{point.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — dark blue card with laptop photo + Robot Cookie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col gap-4 overflow-hidden rounded-2xl px-6 py-8 text-white lg:col-span-2"
            style={{ backgroundColor: "#003F7A" }}
          >
            {/* Dot-grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #4DC8F5 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Cyan top glow */}
            <div
              className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(77,200,245,0.15) 0%, transparent 70%)",
              }}
            />

            {/* Laptop image */}
            <div className="relative z-10 w-full overflow-hidden rounded-xl" style={{ backgroundColor: "#003F7A" }}>
              <Image
                src="/laptop-mockup.png"
                alt="Laptop GitReady with LnT"
                width={600}
                height={420}
                className="w-full object-contain"
                style={{ backgroundColor: "#003F7A" }}
                priority
              />
            </div>

            {/*
              Bottom row: text on the left, Robot Cookie on the right.
              Side-by-side so the robot never sits on top of the text.
            */}
            <div className="relative z-10 flex items-end justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Siap Menjadi Developer?</h3>
                <p className="text-sm text-white/60">
                  Mulai langkahmu hari ini bersama GitReady 2.0.
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none shrink-0"
                style={{ filter: "drop-shadow(0 6px 16px rgba(77,200,245,0.4))" }}
              >
                <Image
                  src="/images/Robot Cookie.png"
                  alt=""
                  width={80}
                  height={88}
                  aria-hidden
                />
              </motion.div>
            </div>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #4DC8F5, transparent)",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
