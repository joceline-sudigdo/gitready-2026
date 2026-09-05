"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { RegistrationCta } from "@/components/hero/registration-cta";
import { GITREADY_EVENT } from "@/constants/event-config";
import { NAV_LINKS } from "@/constants/hero-config";

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

function BNCCLogo({ isOnDarkSection }: { isOnDarkSection: boolean }) {
  return (
    <a href="#top" className="relative flex h-8 w-[130px] items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright" aria-label="Kembali ke awal halaman">
      <Image src="/images/BNCC_Black.png" alt="BNCC" width={642} height={185} priority className={`h-7 w-auto object-contain transition-opacity duration-300 sm:h-8 ${isOnDarkSection ? "opacity-0" : "opacity-100"}`} style={{ width: "auto" }} />
      <Image src="/images/BNCC_White.png" alt="" width={718} height={209} priority className={`absolute left-0 h-7 w-auto object-contain transition-opacity duration-300 sm:h-8 ${isOnDarkSection ? "opacity-100" : "opacity-0"}`} style={{ width: "auto" }} />
    </a>
  );
}

export function HeroNavbar() {
  const [isOnDarkSection, setIsOnDarkSection] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const registrationHref = GITREADY_EVENT.registrationUrl ?? "#daftar";
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
      <nav aria-label="Navigasi utama" className="relative z-30 flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-14">
        <BNCCLogo isOnDarkSection={navbarOnDark} />
        <ul className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 rounded-2xl border px-6 py-3 backdrop-blur-md transition-colors lg:flex ${isOnDarkSection ? "border-white/10 bg-[#061225]/45" : "border-navy/10 bg-canvas/55"}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} aria-label={link.label} className="group block rounded-sm text-base font-medium leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright">
                <VerticalSwapText className="h-[1.25em] whitespace-nowrap" children={link.label} />
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <RegistrationCta
            href={registrationHref}
            target={GITREADY_EVENT.registrationUrl ? "_blank" : undefined}
            rel={GITREADY_EVENT.registrationUrl ? "noopener noreferrer" : undefined}
            onDark={navbarOnDark}
          />
        </div>
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
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-10 min-h-[100dvh] overflow-y-auto bg-[#020814] text-white lg:hidden"
          >
            <Image
              src="/images/Git-Hero.png"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none object-cover object-[60%_center] opacity-[0.12]"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,20,0.58)_0%,rgba(2,8,20,0.9)_48%,#020814_100%)]" />

            <div className="relative flex min-h-[100dvh] flex-col px-5 pb-7 pt-28 sm:px-8">
              <ul className="ml-auto flex w-full flex-col items-end border-b border-white/20 pb-7 text-right">
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

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto flex justify-end pt-8"
              >
              <RegistrationCta
                href={registrationHref}
                target={GITREADY_EVENT.registrationUrl ? "_blank" : undefined}
                rel={GITREADY_EVENT.registrationUrl ? "noopener noreferrer" : undefined}
                onClick={() => setIsMenuOpen(false)}
                onDark
                className="w-fit"
              />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
