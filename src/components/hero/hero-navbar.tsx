"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/constants/hero-config";
import { RegistrationCta } from "./registration-cta"; // sesuaikan path-nya

function VerticalSwapText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`relative block overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transform-none">
        {children}
      </span>
      <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden">
        {children}
      </span>
    </span>
  );
}

function BNCCLogo() {
  return (
    <a href="#top" className="relative flex h-10 w-[160px] items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright sm:h-15 sm:w-[210px]" aria-label="Kembali ke awal halaman">
      <Image
        src="/images/logo.png"
        alt="BNCC"
        width={642}
        height={185}
        priority
        className="h-13 w-auto object-contain sm:h-30"
        style={{ width: "auto" }}
      />
    </a>
  );
}

export function HeroNavbar() {
  const [isOnDarkSection, setIsOnDarkSection] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const reduceMotion = useReducedMotion();
  const navbarOnDark = isMenuOpen || isOnDarkSection;

  useEffect(() => {
    const themedSections = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-theme]"));
    if (!themedSections.length) return;

    const probeY = 40;
    const updateNavbarTheme = () => {
      const currentSection = themedSections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= probeY && bounds.bottom > probeY;
      });

      if (currentSection) {
        setIsOnDarkSection(currentSection.dataset.navbarTheme === "dark");
      }
    };

    const bottomMargin = Math.max(window.innerHeight - probeY - 1, 0);
    const observer = new IntersectionObserver(updateNavbarTheme, {
      rootMargin: `-${probeY}px 0px -${bottomMargin}px 0px`,
      threshold: 0,
    });

    themedSections.forEach((section) => observer.observe(section));
    updateNavbarTheme();
    return () => observer.disconnect();
  }, []);

  // Deteksi kapan user udah scroll ngelewatin section hero
  useEffect(() => {
    const heroSection =
      document.querySelector<HTMLElement>("[data-hero-section]") ??
      document.querySelector<HTMLElement>("[data-navbar-theme]");

    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // dianggap "udah lewat hero" kalau hero-nya udah nggak keliatan
        // dan posisinya di atas viewport (bukan belum sampai / di bawah)
        setHasScrolledPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${navbarOnDark ? "text-white" : "text-navy"}`}>
      <nav
        aria-label="Navigasi utama"
        className={`relative z-30 flex h-20 w-full items-center justify-between border-b px-5 backdrop-blur-md transition-colors duration-300 sm:px-8 lg:px-14 ${
          navbarOnDark ? "border-[#3465A9]/15 bg-[#0755B1]/10" : "border-[#3465A9]/10 bg-[#E6F3FF]/70"
        }`}
      >
        <BNCCLogo />
        <ul className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 rounded-2xl border px-6 py-3 backdrop-blur-md transition-colors lg:flex ${isOnDarkSection ? "border-[#3465A9]/25 bg-[#0755B1]/20" : "border-[#3465A9]/15 bg-[#E6F3FF]/60"}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} aria-label={link.label} className="group block rounded-sm text-base font-medium leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright">
                <VerticalSwapText className="h-[1.25em] whitespace-nowrap" children={link.label} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* CTA di navbar cuma tampil di layar lg ke atas. Di mobile, CTA-nya dipindah ke dalam panel hamburger menu. */}
          <AnimatePresence>
            {hasScrolledPastHero && !isMenuOpen ? (
              <motion.div
                className="hidden lg:block"
                initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <RegistrationCta href="https://bncc.in/REGISTGITREADY2.0" onDark={navbarOnDark} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            className={`flex size-11 items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright lg:hidden ${navbarOnDark ? "border-white/25 hover:bg-white/10" : "border-navy/20 hover:bg-navy/10"}`}
          >
            {isMenuOpen ? <X className="size-7" strokeWidth={1.75} /> : <Menu className="size-7" strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-10 min-h-[100dvh] overflow-y-auto bg-navy-deep text-white lg:hidden"
          >
            <Image
              src="/images/Git-Hero.png"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none object-cover object-[60%_center] opacity-[0.12]"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,32,65,0.58)_0%,rgba(7,32,65,0.9)_48%,var(--navy-deep)_100%)]" />

            <div className="relative flex min-h-[100dvh] flex-col px-5 pb-7 pt-28 sm:px-8">
              <ul className="ml-auto flex w-full flex-col items-end pb-7 text-right">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.18 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <a
                      href={link.href}
                      aria-label={link.label}
                      onClick={() => setIsMenuOpen(false)}
                      className="group block py-1 font-display text-[clamp(2.65rem,13vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright"
                    >
                      <VerticalSwapText className="h-[1em] w-fit" children={link.label} />
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Tombol daftar dipindah ke sini: cuma muncul di dalam menu mobile, dan cuma kalau udah scroll ngelewatin hero */}
              {hasScrolledPastHero ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion ? 0 : 0.18 + NAV_LINKS.length * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="ml-auto w-fit"
                >
                  <RegistrationCta href="https://bncc.in/REGISTGITREADY2.0" onDark />
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}