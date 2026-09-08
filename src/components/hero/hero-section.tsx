"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { HorizontalSwapArrow, RegistrationCta, VerticalSwapLabel } from "@/components/hero/registration-cta";

const INTRO_TEXT = "GIT READY 2.0";
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroCopyY = useTransform(scrollYProgress, [0, 0.8], ["0vh", "-6vh"]);
  const registrationXTarget = useTransform(scrollYProgress, [0.08, 1], [0, -140]);
  const detailsXTarget = useTransform(scrollYProgress, [0.08, 1], [0, 140]);
  const registrationX = useSpring(registrationXTarget, { stiffness: 42, damping: 22, mass: 1.1 });
  const detailsX = useSpring(detailsXTarget, { stiffness: 42, damping: 22, mass: 1.1 });

  const skipIntro = Boolean(reduceMotion);
  const introDone = introComplete || skipIntro;

  const introLetters = Array.from(INTRO_TEXT);

  return (
    <section ref={heroRef} data-navbar-theme="dark" className="relative isolate min-h-[100dvh] bg-transparent text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Cincin dekoratif: pakai Lapis Lazuli & Steel Blue dengan opacity rendah */}
        <span className="absolute left-1/2 top-[-24rem] h-[37rem] w-[115vw] -translate-x-1/2 rounded-[50%] border border-[#3465A9]/[0.09]" />
        <span className="absolute left-1/2 top-[-20rem] h-[37rem] w-[102vw] -translate-x-1/2 rounded-[50%] border border-[#3465A9]/[0.07]" />
        <span className="absolute left-1/2 top-[-16rem] h-[37rem] w-[88vw] -translate-x-1/2 rounded-[50%] border border-[#3775AF]/[0.06]" />
        {/* Glow bawah: Sapphire ke Green Blue */}
        <span className="absolute bottom-[-18rem] left-1/2 h-[42rem] w-[min(100rem,120vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(7,85,177,0.72)_0%,rgba(16,94,169,0.4)_34%,rgba(2,8,20,0)_74%)] blur-3xl" />
      </div>

      <AnimatePresence>
        {!introDone ? (
          <motion.div
            aria-hidden="true"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: SMOOTH_EASE }}
            className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center overflow-hidden px-5"
          >
            <div className="flex items-center gap-[0.08em] whitespace-nowrap font-display text-[clamp(2.1rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white sm:text-[clamp(3.5rem,7vw,6rem)]">
              {introLetters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 + index * 0.055, ease: SMOOTH_EASE }}
                  onAnimationComplete={index === introLetters.length - 1 ? () => setIntroComplete(true) : undefined}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col items-center justify-center px-5 py-28 sm:px-8 lg:px-14">
        <motion.div
          initial={false}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.25,
            ease: SMOOTH_EASE,
          }}
          className={`relative z-10 flex w-full max-w-5xl flex-col items-center text-center ${introDone ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <motion.div style={reduceMotion ? undefined : { y: heroCopyY }} className="flex w-full flex-col items-center">
            <h1 className="text-balance font-semibold leading-[0.92] tracking-[-0.06em] text-white">
              <span className="block text-[clamp(3rem,6vw,5.8rem)]">GitReady 2.0</span>
              <span className="block text-[clamp(1.5rem,3vw,2.75rem)]">Future Career Preparation Through Digital Portfolio</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#E6F3FF]/70 sm:text-lg">
              Kuasai Git, GitHub, dan digital portfolio untuk berkolaborasi dan siap menghadapi dunia industri.
            </p>
          </motion.div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.div style={reduceMotion ? undefined : { x: registrationX }}>
              <RegistrationCta href="https://bncc.in/REGISTGITREADY2.0" />
            </motion.div>
            <motion.div style={reduceMotion ? undefined : { x: detailsX }}>
              <a
                href="#detail-acara"
                aria-label="Lihat detail"
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#3775AF]/55 bg-[#0755B1]/20 px-6 font-semibold text-white transition-colors hover:border-[#105EA9] hover:bg-[#0755B1]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3465A9]"
              >
                <VerticalSwapLabel>Lihat detail</VerticalSwapLabel>
                <HorizontalSwapArrow />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}