"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { GitVisualization } from "@/components/hero/git-visualization";
import { HeroFeatures } from "@/components/hero/hero-features";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#D7E0E8] pt-24 sm:pt-28 lg:pt-50"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Subtle blue glow */}
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,rgba(37,99,235,0)_70%)]" />

        {/* Subtle purple glow */}
        <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.07)_0%,rgba(124,92,252,0)_70%)]" />

        {/* Dots */}
        <svg
          className="absolute right-8 top-24 hidden opacity-[0.35] lg:block"
          width="140"
          height="140"
          aria-hidden="true"
        >
          <pattern
            id="hero-dots"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1.5"
              cy="1.5"
              r="1.5"
              fill="#AAB8C5"
            />
          </pattern>

          <rect
            width="140"
            height="140"
            fill="url(#hero-dots)"
          />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 pb-14 pt-8 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-10 lg:pb-12 lg:pt-20">
        {/* Left content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="relative z-10 flex flex-col items-start"
        >
          {/* Invisible spacer untuk mempertahankan jarak dari navbar */}
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 block h-[100px] w-full sm:h-[110px] lg:h-[120px]"
            aria-hidden="true"
          >
            space
          </motion.span>

          {/* Presented by */}
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-3.5 py-1.5 text-[12.5px] font-medium text-[#0054A5] shadow-[0_8px_30px_rgba(37,99,235,0.08)] backdrop-blur-md backdrop-saturate-150"
          >
            <Sparkles
              className="h-3.5 w-3.5 text-[#2788CE]"
              aria-hidden="true"
            />

            Presented by BNCC Learning &amp; Training
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[42px] font-extrabold leading-[1.02] tracking-tight text-[#111827] sm:text-[54px] lg:text-[64px]"
          >
            <span className="bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-transparent">

              GitReady 2.0
            </span>
            <br />
            <span className="text-[36px] sm:text-[46px] lg:text-[54px]">
              Future Career Preparation
              <br />
              Through Digital Portfolio
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{
              duration: 0.6,
              delay: 0.05,
            }}
            className="mt-5 max-w-[460px] text-[16px] leading-[1.6] text-[#405575]"
          >
            Workshop hybrid yang membekali mahasiswa dengan keterampilan Git
            &amp; GitHub serta digital portfolio untuk berkolaborasi dalam
            proyek dan mempersiapkan diri menghadapi dunia industri secara
            profesional.
          </motion.p>

          {/* Hero Features */}
          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-10 w-full"
          >
            <HeroFeatures />
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-0 lg:-mr-6 lg:scale-[1.05]"
        >
          <GitVisualization />
        </motion.div>
      </div>
    </section>
  );
}