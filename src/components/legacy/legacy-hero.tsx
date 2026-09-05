"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, ChevronDown, Code2, Smile, Sparkles, Star, Users } from "lucide-react";

const MINI_FEATURES = [
  { icon: Code2, label: "Hands-on Workshop" },
  { icon: Users, label: "Mentor Profesional" },
  { icon: Award, label: "E-Certificate" },
  { icon: Smile, label: "Beginner Friendly" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function HeroFeatures() {
  return (
    <motion.ul initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }} className="grid grid-cols-4 gap-3 sm:gap-4">
      {MINI_FEATURES.map(({ icon: Icon, label }) => (
        <motion.li key={label} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF5FF] text-[#2788CE]"><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
          <span className="text-[12px] font-medium leading-tight text-[#374151] sm:text-[13px]">{label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function SocialProof() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E7EEF7] bg-white p-4 shadow-[0_8px_24px_-12px_rgba(37,99,235,0.2)] sm:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2.5" aria-hidden="true">
          {["A", "F", "R", "+"].map((initial, index) => (
            <span key={`${initial}-${index}`} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-[11px] font-semibold text-white">{initial}</span>
          ))}
        </div>
        <div className="leading-tight"><p className="text-[15px] font-bold text-[#111827]">500+</p><p className="text-[12px] text-[#6B7280]">Peserta telah bergabung</p></div>
      </div>
      <div className="h-8 w-px bg-[#E7EEF7]" aria-hidden="true" />
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF3C7]"><Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" /></span>
        <div className="leading-tight"><p className="text-[15px] font-bold text-[#111827]">4.9/5</p><p className="text-[12px] text-[#6B7280]">Rating Workshop</p></div>
      </div>
    </motion.div>
  );
}

function GitVisualization() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] select-none lg:max-w-[680px]">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-full">
        <img src="/images/Git-Hero.png" alt="Visualisasi interaktif GitReady dengan maskot BNCC bersantai di atas Git branch" className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.18)]" draggable={false} />
      </motion.div>
    </div>
  );
}

export function LegacyHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#D7E0E8] pt-[70px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,rgba(37,99,235,0)_70%)]" />
        <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.07)_0%,rgba(124,92,252,0)_70%)]" />
        <svg className="absolute right-8 top-24 hidden opacity-[0.35] lg:block" width="140" height="140" aria-hidden="true">
          <pattern id="legacy-hero-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#AAB8C5" /></pattern>
          <rect width="140" height="140" fill="url(#legacy-hero-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 pb-14 pt-8 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-10 lg:pb-12 lg:pt-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="relative z-10 flex flex-col items-start">
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[12.5px] font-medium text-[#0054A5]">
            <Sparkles className="h-3.5 w-3.5 text-[#2788CE]" aria-hidden="true" />Presented by BNCC Learning &amp; Training
          </motion.span>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-[42px] font-extrabold leading-[1.02] tracking-tight text-[#111827] sm:text-[54px] lg:text-[64px]">
            GitReady<br />with <span className="bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-transparent">LnT</span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-[#405575]">Pelatihan Git &amp; GitHub untuk meningkatkan kolaborasi dalam proyek pengembangan software secara profesional.</motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#daftar" className="group inline-flex h-[46px] items-center gap-2 rounded-[9px] bg-gradient-to-r from-[#2788CE] to-[#0054A5] px-6 text-[14px] font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:from-[#217DBE] hover:to-[#00478E] hover:shadow-lg">Daftar Sekarang<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
            <a href="#tentang" className="inline-flex h-[46px] items-center rounded-[9px] border border-[#BFD2F5] bg-transparent px-6 text-[14px] font-semibold text-[#374151] transition-all hover:-translate-y-0.5 hover:bg-white">Pelajari Lebih Lanjut</a>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 w-full"><HeroFeatures /></motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.25 }} className="mt-8 w-full"><SocialProof /></motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative z-0 lg:-mr-6 lg:scale-[1.05]"><GitVisualization /></motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="relative z-10 flex flex-col items-center gap-2 pb-10">
        <p className="text-[12.5px] font-medium text-[#6B7280]">Scroll untuk mengeksplorasi</p>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C2CDD6] text-[#6B7280]"><ChevronDown className="h-4 w-4" aria-hidden="true" /></motion.span>
      </motion.div>
    </section>
  );
}
