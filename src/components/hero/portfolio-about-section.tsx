"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// ---------------------------------------------------------------------------
// Fokus pembahasan — hanya disebut SEKALI, ditampilkan di section Hisam
// ---------------------------------------------------------------------------

const capabilities = [
  "Dasar Git dan repository",
  "Working tree dan staging",
  "Commit yang jelas",
  "Branch untuk kolaborasi",
  "Menangani merge conflict",
  "Push ke GitHub",
];

// ---------------------------------------------------------------------------
// Data pemateri
// ---------------------------------------------------------------------------

const lexySocials = [
  { label: "GitHub", href: "https://github.com/bintangqurne", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lexy-samuel/",
    icon: "linkedin",
  },
] as const;

const hisamSocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hisamhisam",
    icon: "linkedin",
  },
] as const;

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

type SocialIconName = "github" | "linkedin";

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
        <path d="M12 .7C5.65.7.5 5.85.5 12.2c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.21c.98 0 1.95.13 2.86.38 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56a11.51 11.51 0 0 0 7.88-10.91C23.5 5.85 18.35.7 12 .7Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Lexy — rata kiri (tanpa "Fokus pembahasan", supaya tidak duplikat)
// ---------------------------------------------------------------------------

function SpeakerLexy() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.45,
  });
  const gridY = useTransform(smoothProgress, [0, 1], [-70, 70]);
  const leftY = useTransform(smoothProgress, [0, 1], [55, -35]);
  const portraitY = useTransform(smoothProgress, [0, 1], [85, -85]);
  const portraitScale = useTransform(smoothProgress, [0.12, 0.5, 0.9], [1.08, 1, 0.96]);
  const rightY = useTransform(smoothProgress, [0, 1], [95, -55]);
  const accentX = useTransform(smoothProgress, [0.18, 0.72], [0.08, 1]);

  return (
    <section
      ref={sectionRef}
      id="pemateri"
      data-navbar-theme="dark"
      className="about-root relative scroll-mt-0 overflow-hidden bg-[#020814] px-4 pb-12 pt-12 text-[#eaf4ff] sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[100svh] lg:px-6 lg:pb-8 lg:pt-28 xl:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="about-progress absolute left-0 top-0 z-20 h-[3px] w-full origin-left bg-[#55c8f3]"
        style={{ scaleX: reduceMotion ? 1 : smoothProgress }}
      />
      <motion.div
        aria-hidden="true"
        className="about-grid absolute -inset-y-20 inset-x-0 hidden opacity-30 lg:block"
        style={{ y: reduceMotion ? 0 : gridY }}
      />

      <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-white/35 [writing-mode:vertical-rl]">
          Pemateri
        </span>
        <div className="h-28 w-px overflow-hidden bg-white/15">
          <motion.div
            className="h-full w-full origin-top bg-[#55c8f3]"
            style={{ scaleY: reduceMotion ? 1 : smoothProgress }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-16 lg:grid-cols-[14%_52%_31%] lg:gap-5 xl:grid-cols-[8%_53%_32%] xl:gap-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="flex min-w-0 flex-col lg:min-h-[calc(100svh-9rem)]"
          style={{ y: reduceMotion ? 0 : leftY }}
        >
          <div>
            <div className="hidden overflow-hidden lg:block">
              <motion.h2
                initial={reduceMotion ? false : { y: "105%" }}
                whileInView={reduceMotion ? undefined : { y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.08, ease }}
                className="font-fragment text-[clamp(84px,10.5vw,204px)] font-black uppercase leading-[0.72] tracking-[-0.105em] text-[#eaf4ff]"
              >
                Ini
              </motion.h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 55 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="min-w-0 lg:-ml-3 xl:-ml-4"
          style={{ y: reduceMotion ? 0 : portraitY }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
            <div className="about-portrait relative h-[460px] w-full shrink-0 overflow-hidden bg-[#061225] sm:h-auto sm:w-[62%] lg:min-h-[640px] lg:max-h-[860px] xl:w-[64%]">
              <motion.div className="absolute inset-0" style={{ scale: reduceMotion ? 1 : portraitScale }}>
                <Image
                  src="/images/Lexy.png"
                  alt="Lexy Samuel, pemateri GitReady 2026"
                  fill
                  sizes="(max-width: 639px) 100vw, 36vw"
                  className="object-cover object-[50%_34%] grayscale contrast-[1.08]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(2,8,20,.62)_100%)]" />
              <div className="about-scanlines pointer-events-none absolute inset-0 opacity-25" />
              <div className="absolute left-4 top-4 border-l border-t border-white/55 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                Pemateri
              </div>
              <div className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-white/55" />
              <motion.div
                className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#55c8f3]"
                style={{ scaleX: reduceMotion ? 1 : accentX }}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="font-figtree text-[clamp(38px,3.6vw,64px)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#55c8f3]">
                Lexy
                <br />
                Samuel
              </h3>

              <h4 className="mt-5 text-[clamp(24px,2vw,36px)] font-black uppercase leading-[0.94] tracking-[-0.06em] text-[#eaf4ff]">
                Fokus pada Web3, dari smart contract sampai developer relations.
              </h4>

              <p className="mt-5 max-w-2xl text-sm font-semibold leading-[1.08] tracking-[-0.025em] text-white/60 sm:text-base">
                Mahasiswa Computer Science di BINUS University, kini menjabat
                sebagai Developer Relations di BlockDevId dan aktif sebagai
                Smart Contract Developer lepas. Lulusan program inkubasi Lisk
                Spark dan peraih Juara 2 Lisk Builder Challenge Round 1
              </p>

              <div className="mt-7 pt-3">
                <motion.div
                  className="mb-3 h-[3px] origin-left bg-white/25"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.12, ease }}
                />
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.08em] text-white/40">
                  Profil pemateri
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {lexySocials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="about-social flex h-10 w-10 items-center justify-center border border-white/25 text-white hover:border-[#55c8f3] focus-visible:border-[#55c8f3] focus-visible:outline-none"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom ini sengaja dikosongkan — "Fokus pembahasan" hanya tampil sekali di section Hisam,
            tapi tetap dipertahankan sebagai kolom grid agar ukuran/tinggi section identik dengan section Hisam. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="flex min-w-0 flex-col lg:min-h-[calc(100svh-9rem)] lg:pl-5"
          style={{ y: reduceMotion ? 0 : rightY }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Hisam — rata kanan (satu-satunya "Fokus pembahasan", isi Git)
// ---------------------------------------------------------------------------

function SpeakerHisam() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.45,
  });
  const gridY = useTransform(smoothProgress, [0, 1], [-70, 70]);
  const rightHeadingY = useTransform(smoothProgress, [0, 1], [55, -35]);
  const portraitY = useTransform(smoothProgress, [0, 1], [85, -85]);
  const portraitScale = useTransform(smoothProgress, [0.12, 0.5, 0.9], [1.08, 1, 0.96]);
  const leftListY = useTransform(smoothProgress, [0, 1], [95, -55]);
  const accentX = useTransform(smoothProgress, [0.18, 0.72], [0.08, 1]);

  return (
    <section
      ref={sectionRef}
      id="pemateri-2"
      data-navbar-theme="dark"
      className="about-root relative scroll-mt-0 overflow-hidden bg-[#020814] px-4 pb-12 pt-12 text-[#eaf4ff] sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[100svh] lg:px-6 lg:pb-8 lg:pt-28 xl:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="about-progress absolute left-0 top-0 z-20 h-[3px] w-full origin-left bg-[#55c8f3]"
        style={{ scaleX: reduceMotion ? 1 : smoothProgress }}
      />
      <motion.div
        aria-hidden="true"
        className="about-grid absolute -inset-y-20 inset-x-0 hidden opacity-30 lg:block"
        style={{ y: reduceMotion ? 0 : gridY }}
      />

      <div className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-white/35 [writing-mode:vertical-rl]">
          Pemateri
        </span>
        <div className="h-28 w-px overflow-hidden bg-white/15">
          <motion.div
            className="h-full w-full origin-top bg-[#55c8f3]"
            style={{ scaleY: reduceMotion ? 1 : smoothProgress }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-16 lg:grid-cols-[31%_52%_14%] lg:gap-5 xl:grid-cols-[32%_53%_8%] xl:gap-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="flex min-w-0 flex-col lg:min-h-[calc(100svh-9rem)] lg:pr-5"
          style={{ y: reduceMotion ? 0 : leftListY }}
        >
          <div className="mt-16 lg:mt-auto">
            <p className="font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-white/42">
              Fokus pembahasan
            </p>
            <ul className="mt-4 border-l-[8px] border-white/20 pl-4">
              {capabilities.map((capability, index) => (
                <motion.li
                  key={capability}
                  className="cursor-default py-0.5 text-[clamp(17px,1.2vw,23px)] font-extrabold uppercase leading-[1.02] tracking-[-0.035em] text-white/80"
                  initial={reduceMotion ? false : { opacity: 0, x: -28 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  whileHover={reduceMotion ? undefined : { x: -9, color: "#55c8f3" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.055, ease }}
                >
                  {capability}
                </motion.li>
              ))}
            </ul>

            <Link
              href="#detail-acara"
              className="group mt-9 inline-flex items-center gap-3 bg-[#55c8f3] px-2 py-1 text-xl font-black uppercase leading-none tracking-[-0.05em] text-[#072955] transition-colors duration-300 hover:bg-white sm:text-2xl"
            >
              Lihat detail
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 55 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="min-w-0 lg:-mr-3 xl:-mr-4"
          style={{ y: reduceMotion ? 0 : portraitY }}
        >
          <div className="flex flex-col gap-6 sm:flex-row-reverse sm:items-stretch">
            <div className="about-portrait relative h-[460px] w-full shrink-0 overflow-hidden bg-[#061225] sm:h-auto sm:w-[62%] lg:min-h-[640px] lg:max-h-[860px] xl:w-[64%]">
              <motion.div className="absolute inset-0" style={{ scale: reduceMotion ? 1 : portraitScale }}>
                <Image
                  src="/images/Hisam.png"
                  alt="Hisam, pemateri GitReady 2026"
                  fill
                  sizes="(max-width: 639px) 100vw, 36vw"
                  className="object-cover object-[50%_34%] grayscale contrast-[1.08]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(2,8,20,.62)_100%)]" />
              <div className="about-scanlines pointer-events-none absolute inset-0 opacity-25" />
              <div className="absolute right-4 top-4 border-r border-t border-white/55 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                Pemateri
              </div>
              <div className="absolute bottom-4 left-4 h-12 w-12 border-b border-l border-white/55" />
              <motion.div
                className="absolute bottom-0 right-0 h-1 w-full origin-right bg-[#55c8f3]"
                style={{ scaleX: reduceMotion ? 1 : accentX }}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="font-figtree text-[clamp(38px,3.6vw,64px)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#55c8f3]">
                Hisam
              </h3>

              <h4 className="mt-5 text-[clamp(24px,2vw,36px)] font-black uppercase leading-[0.94] tracking-[-0.06em] text-[#eaf4ff]">
                Belasan tahun membangun web, dari kode sampai production.
              </h4>

              <p className="mt-5 max-w-2xl text-sm font-semibold leading-[1.08] tracking-[-0.025em] text-white/60 sm:text-base">
                Web Programmer di CV. Rumahweb Indonesia sejak Januari 2011,
                dengan pengalaman lebih dari 15 tahun di bidang pengembangan
                web. Berbasis di Yogyakarta, dan meraih gelar Bachelor of
                Science jurusan Elektronika dan Instrumentasi dari Universitas
                Gadjah Mada.
              </p>

              <div className="mt-7 pt-3">
                <motion.div
                  className="mb-3 h-[3px] origin-left bg-white/25"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.12, ease }}
                />
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.08em] text-white/40">
                  Profil pemateri
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hisamSocials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="about-social flex h-10 w-10 items-center justify-center border border-white/25 text-white hover:border-[#55c8f3] focus-visible:border-[#55c8f3] focus-visible:outline-none"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="flex min-w-0 flex-col items-end lg:min-h-[calc(100svh-9rem)]"
          style={{ y: reduceMotion ? 0 : rightHeadingY }}
        >
          <div>
            <div className="hidden overflow-hidden lg:block">
              <motion.h2
                initial={reduceMotion ? false : { y: "105%" }}
                whileInView={reduceMotion ? undefined : { y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.08, ease }}
                className="font-fragment text-right text-[clamp(84px,10.5vw,204px)] font-black uppercase leading-[0.72] tracking-[-0.105em] text-[#eaf4ff]"
              >
                Ini
              </motion.h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Export gabungan
// ---------------------------------------------------------------------------

export default function SpeakerSection() {
  return (
    <>
      <SpeakerLexy />
      <SpeakerHisam />
    </>
  );
}