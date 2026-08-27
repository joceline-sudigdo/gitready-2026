"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/constants/hero-config";

function GitReadyLogo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="GitReady beranda">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-base font-extrabold text-white">
        G
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold tracking-tight text-[#111827]">
          GitReady
        </span>
        <span className="text-[11px] font-medium text-[#6B7280]">with LnT</span>
      </span>
    </a>
  );
}

export function HeroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-md">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        <GitReadyLogo />

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[13.5px] font-medium text-[#374151] transition-colors hover:text-[#2563EB]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#masuk"
            className="rounded-[9px] px-4 py-2.5 text-[13.5px] font-semibold text-[#374151] transition-colors hover:text-[#2563EB]"
          >
            Masuk
          </a>
          <a
            href="#daftar"
            className="rounded-[9px] bg-[#2563EB] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-md"
          >
            Daftar Sekarang
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#111827] lg:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#EEF5FF] bg-white lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F7FAFF] hover:text-[#2563EB]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 border-t border-[#EEF5FF] px-6 py-4">
              <a
                href="#masuk"
                className="rounded-[9px] border border-[#D7E0E8] px-4 py-2.5 text-center text-[13.5px] font-semibold text-[#374151]"
              >
                Masuk
              </a>
              <a
                href="#daftar"
                className="rounded-[9px] bg-[#2563EB] px-4 py-2.5 text-center text-[13.5px] font-semibold text-white"
              >
                Daftar Sekarang
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
