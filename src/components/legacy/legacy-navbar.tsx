"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQ", href: "#faq" },
  { label: "Gallery", href: "#gallery" },
];

function BNCCLogo({ isScrolled }: { isScrolled: boolean }) {
  return (
    <a href="#top" className="flex items-center" aria-label="BNCC Beranda">
      <Image
        src={isScrolled ? "/images/BNCC_White.png" : "/images/BNCC_Black.png"}
        alt="BNCC"
        width={isScrolled ? 718 : 642}
        height={isScrolled ? 209 : 185}
        priority
        className="h-7 w-auto object-contain transition-all duration-300 sm:h-8"
        style={{ width: "auto" }}
      />
    </a>
  );
}

export function LegacyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = Math.max(window.scrollY || 0, window.pageYOffset || 0, document.documentElement.scrollTop || 0, document.body.scrollTop || 0);
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
      style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 9999 }}
      className={`fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-300 ${isScrolled ? "border-b border-white/10 bg-[#0B3B7A] shadow-lg shadow-black/20" : "bg-[#D7E0E8]/95 backdrop-blur-md"}`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <BNCCLogo isScrolled={isScrolled} />
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={`text-[13.5px] font-medium transition-colors duration-300 ${isScrolled ? "text-white/90 hover:text-white" : "text-[#374151] hover:text-[#2563EB]"}`}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center lg:flex">
          <a href="#daftar" className={`rounded-[9px] px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${isScrolled ? "border border-white/80 bg-[#0B3B7A] text-white shadow-sm hover:border-white hover:bg-white hover:text-[#0B3B7A]" : "border border-transparent bg-gradient-to-r from-[#2788CE] to-[#0054A5] text-white shadow-sm shadow-blue-500/20 hover:from-[#217DBE] hover:to-[#00478E] hover:shadow-md"}`}>Daftar Sekarang</a>
        </div>
        <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"} className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 lg:hidden ${isScrolled ? "text-white hover:bg-white/10" : "text-[#111827] hover:bg-black/5"}`}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className={`overflow-hidden border-t transition-colors duration-300 lg:hidden ${isScrolled ? "border-white/10 bg-[#0B3B7A]" : "border-black/5 bg-[#D7E0E8]"}`}>
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setIsMenuOpen(false)} className={`block rounded-lg px-2 py-2.5 text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-[#374151] hover:bg-[#F7FAFF] hover:text-[#2563EB]"}`}>{link.label}</a>
                </li>
              ))}
            </ul>
            <div className={`border-t px-6 py-4 transition-colors duration-300 ${isScrolled ? "border-white/10" : "border-black/5"}`}>
              <a href="#daftar" onClick={() => setIsMenuOpen(false)} className={`block rounded-[9px] px-4 py-2.5 text-center text-[13.5px] font-semibold transition-all duration-300 ${isScrolled ? "border border-white/80 bg-[#0B3B7A] text-white hover:bg-white hover:text-[#0B3B7A]" : "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"}`}>Daftar Sekarang</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
