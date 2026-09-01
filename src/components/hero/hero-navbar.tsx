"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/constants/hero-config";

function BNCCLogo({ isScrolled }: { isScrolled: boolean }) {
  return (
    <a href="#top" className="flex items-center" aria-label="BNCC Beranda">
      <Image
        src={isScrolled ? "/images/GitReady-Blue.png" : "/images/BNCC_Blue.png"}
        alt="BNCC"
        width={130}
        height={32}
        priority
        className="h-7 w-auto object-contain transition-all duration-300 sm:h-8"
      />
    </a>
  );
}

export function HeroNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );

      setIsScrolled(scrollPos > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 9999,
      }}
      className={`fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-300 ${isScrolled
        ? "border-b border-white/10 bg-[#0B3B7A] shadow-lg shadow-black/20"
        : "bg-[#D7E0E8]/95 backdrop-blur-md"
        }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        {/* Kiri: Logo */}
        <BNCCLogo isScrolled={isScrolled} />

        {/* Kanan: Menu (desktop) */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-[13.5px] font-medium transition-colors duration-300 ${isScrolled
                  ? "text-white/90 hover:text-white"
                  : "text-[#374151] hover:text-[#2563EB]"
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (kanan) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 lg:hidden ${isScrolled
            ? "text-white hover:bg-white/10"
            : "text-[#111827] hover:bg-black/5"
            }`}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`overflow-hidden border-t transition-colors duration-300 lg:hidden ${isScrolled
              ? "border-white/10 bg-[#0B3B7A]"
              : "border-black/5 bg-[#D7E0E8]"
              }`}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-lg px-2 py-2.5 text-sm font-medium transition-colors duration-300 ${isScrolled
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-[#374151] hover:bg-[#F7FAFF] hover:text-[#2563EB]"
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}