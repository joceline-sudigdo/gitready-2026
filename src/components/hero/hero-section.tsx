"use client";

import { useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { HorizontalSwapArrow, RegistrationCta, VerticalSwapLabel } from "@/components/hero/registration-cta";

function StackedHeroWord({
  word,
  layoutPrefix,
  staggerOffset,
  reverseStagger = false,
  onSettled,
  reduceMotion,
}: {
  word: string;
  layoutPrefix: string;
  staggerOffset: number;
  reverseStagger?: boolean;
  onSettled?: () => void;
  reduceMotion: boolean | null;
}) {
  const highlightRef = useRef<HTMLSpanElement>(null);

  const moveHighlight = (event: React.PointerEvent<HTMLSpanElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    highlightRef.current?.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    highlightRef.current?.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  const letters = Array.from(word);

  return (
    <span
      onPointerEnter={moveHighlight}
      onPointerMove={moveHighlight}
      className="group/word pointer-events-auto relative flex cursor-default flex-row items-center gap-[clamp(0.7rem,3vw,1.15rem)] font-display text-[clamp(3.25rem,15vw,4.5rem)] leading-none md:flex-col md:gap-[clamp(0.5rem,1.3vw,1.25rem)] md:text-[clamp(3.25rem,7vw,7rem)]"
    >
      <span className="flex flex-row items-center gap-[inherit] text-blue-100/35 md:flex-col">
        {letters.map((letter, index) => {
          const staggerIndex = reverseStagger ? letters.length - 1 - index : index;

          return (
            <motion.span
              key={`${letter}-base-${index}`}
              layoutId={reduceMotion ? undefined : `${layoutPrefix}-${index}`}
              transition={{
                layout: {
                  duration: reduceMotion ? 0 : 1.05,
                  delay: reduceMotion ? 0 : staggerOffset + staggerIndex * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              onLayoutAnimationComplete={staggerIndex === letters.length - 1 ? onSettled : undefined}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>
      <span
        ref={highlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-row items-center gap-[inherit] text-white opacity-0 transition-opacity duration-200 group-hover/word:opacity-100 md:flex-col"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 88px 20px at var(--spot-x, -100px) var(--spot-y, -100px), #000 0%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 88px 20px at var(--spot-x, -100px) var(--spot-y, -100px), #000 0%, transparent 100%)",
        }}
      >
        {letters.map((letter, index) => (
          <span key={`${letter}-highlight-${index}`}>{letter}</span>
        ))}
      </span>
    </span>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [splitSettled, setSplitSettled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const gitExitY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-115%"]);
  const readyExitY = useTransform(scrollYProgress, [0, 0.3], ["0%", "115%"]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.8], ["0vh", "-6vh"]);
  const registrationXTarget = useTransform(scrollYProgress, [0.08, 1], [0, -140]);
  const detailsXTarget = useTransform(scrollYProgress, [0.08, 1], [0, 140]);
  const registrationX = useSpring(registrationXTarget, { stiffness: 42, damping: 22, mass: 1.1 });
  const detailsX = useSpring(detailsXTarget, { stiffness: 42, damping: 22, mass: 1.1 });

  return (
    <section ref={heroRef} data-navbar-theme="dark" className="relative isolate min-h-[100dvh] bg-transparent text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-[-24rem] h-[37rem] w-[115vw] -translate-x-1/2 rounded-[50%] border border-blue-300/[0.07]" />
        <span className="absolute left-1/2 top-[-20rem] h-[37rem] w-[102vw] -translate-x-1/2 rounded-[50%] border border-blue-300/[0.06]" />
        <span className="absolute left-1/2 top-[-16rem] h-[37rem] w-[88vw] -translate-x-1/2 rounded-[50%] border border-blue-300/[0.05]" />
        <span className="absolute bottom-[-18rem] left-1/2 h-[42rem] w-[min(100rem,120vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(18,95,255,0.72)_0%,rgba(8,53,145,0.4)_34%,rgba(2,8,20,0)_74%)] blur-3xl" />
      </div>

      <LayoutGroup id="gitready-hero-intro">
        {!introComplete ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-5"
          >
            <div className="flex items-center gap-[0.16em] whitespace-nowrap font-display text-[clamp(2.65rem,12vw,4rem)] leading-none tracking-[-0.06em] text-white sm:text-[clamp(4.25rem,14vw,13rem)]">
              <span className="flex">
                {Array.from("GIT").map((letter, index) => (
                  <span key={letter} className="overflow-hidden">
                    <motion.span
                      layoutId={reduceMotion ? undefined : `hero-intro-git-${index}`}
                      initial={reduceMotion ? false : { opacity: 0, y: "110%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.12 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="flex">
                {Array.from("READY").map((letter, index) => (
                  <span key={`${letter}-${index}`} className="overflow-hidden">
                    <motion.span
                      layoutId={reduceMotion ? undefined : `hero-intro-ready-${index}`}
                      initial={reduceMotion ? false : { opacity: 0, y: "110%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.12 + (index + 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      onAnimationComplete={index === 4 ? () => setIntroComplete(true) : undefined}
                      className="block"
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        ) : (
          <>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center md:inset-x-auto md:left-6 md:top-1/2 md:block md:-translate-y-1/2 lg:left-10 ${splitSettled ? "overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]" : "overflow-visible"}`}
            >
              <motion.div style={reduceMotion ? undefined : { y: gitExitY }}>
                <StackedHeroWord word="GIT" layoutPrefix="hero-intro-git" staggerOffset={0} reduceMotion={reduceMotion} />
              </motion.div>
            </div>

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center md:inset-x-auto md:bottom-auto md:right-6 md:top-1/2 md:block md:-translate-y-1/2 lg:right-10 ${splitSettled ? "overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]" : "overflow-visible"}`}
            >
              <motion.div style={reduceMotion ? undefined : { y: readyExitY }}>
                <StackedHeroWord
                  word="READY"
                  layoutPrefix="hero-intro-ready"
                  staggerOffset={0.12}
                  reverseStagger
                  onSettled={() => setSplitSettled(true)}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            </div>
          </>
        )}

        <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col items-center justify-center px-5 py-28 sm:px-8 lg:px-14">
          <motion.div
            initial={false}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative z-10 flex w-full max-w-5xl flex-col items-center text-center ${introComplete ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <motion.div style={reduceMotion ? undefined : { y: heroCopyY }} className="flex w-full flex-col items-center">
              <h1 className="text-balance text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
                <span className="block">Git lebih jelas.</span>
                <span className="block">Kolaborasi lebih rapi.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-blue-100/65 sm:text-lg">
                Pelajari Git dan GitHub lewat praktik, simulasi, dan alur kerja tim.
              </p>
            </motion.div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.div style={reduceMotion ? undefined : { x: registrationX }}>
                <RegistrationCta href="#daftar" />
              </motion.div>
              <motion.div style={reduceMotion ? undefined : { x: detailsX }}>
                <a href="#detail-acara" aria-label="Lihat detail" className="group inline-flex min-h-12 items-center gap-2 border border-blue-400/55 bg-blue-950/25 px-6 font-semibold text-white transition-colors hover:border-blue-300 hover:bg-blue-900/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                  <VerticalSwapLabel>Lihat detail</VerticalSwapLabel>
                  <HorizontalSwapArrow />
                </a>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </LayoutGroup>
    </section>
  );
}
