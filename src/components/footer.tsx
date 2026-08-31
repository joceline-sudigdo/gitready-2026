// components/layout/footer.tsx
"use client";

import { useEffect, useRef, useState, type ElementType, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Globe } from "lucide-react";

import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";
import { CONTACT_PERSON, FOOTER_COPYRIGHT, SOCIAL_LINKS, type SocialLink } from "@/constants/footer-config";
import { QUICK_LINKS } from "@/constants/quick-links";

const SOCIAL_ICON_MAP: Record<SocialLink["icon"], ElementType> = {
  Globe,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Twitter: XIcon,
  Linkedin: LinkedinIcon,
};

function SocialIconRow({ items }: { items: SocialLink[] }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup tooltip kalau user tap/klik di luar area icon
  useEffect(() => {
    function handleOutsideInteraction(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveLabel(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, []);

  function handleIconClick(event: ReactMouseEvent<HTMLAnchorElement>, social: SocialLink) {
    // Device tanpa hover (mobile/tablet): tap pertama cuma buka tooltip,
    // tap kedua (saat tooltip sudah aktif) baru lanjut ke link.
    const isTouchDevice =
      typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

    if (isTouchDevice && activeLabel !== social.label) {
      event.preventDefault();
      setActiveLabel(social.label);
      return;
    }

    setActiveLabel(null);
  }

  return (
    <div ref={containerRef} className="flex items-center gap-3">
      {items.map((social) => {
        const Icon = SOCIAL_ICON_MAP[social.icon];
        const isActive = activeLabel === social.label;

        return (
          <div key={social.label} className="group relative">
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={(event) => handleIconClick(event, social)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-blue-100/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Tooltip bubble */}
            <span
              role="tooltip"
              className={`pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#0B3B7A] shadow-lg transition-all duration-200 ${
                isActive
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {social.username}
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-auto rounded-t-[2.5rem] bg-[#0B3B7A] px-6 py-14 sm:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Logo (hidden di mobile) */}
        <div className="hidden justify-start sm:flex">
          <Image
            src="/images/logo.png"
            alt="GitReady"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand desc + Media Sosial */}
          <div className="space-y-5">
            <p className="max-w-xs text-sm text-blue-100/70">
              Workshop belajar Git & GitHub dari nol sampai terbiasa dengan alur kerja
              kolaboratif tim development.
            </p>
            <SocialIconRow items={SOCIAL_LINKS} />
          </div>

          {/* Narahubung */}
          <div className="space-y-2">
            <p className="text-lg font-semibold uppercase tracking-wide text-white">
              Contact Person
            </p>
            <p className="text-base font-semibold text-sm text-blue-100/80 transition-colors hover:text-white cursor-pointer">{CONTACT_PERSON.name}</p>
            <a
              href={CONTACT_PERSON.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Hubungi ${CONTACT_PERSON.name} lewat WhatsApp di ${CONTACT_PERSON.phone}`}
              className="inline-flex items-center gap-2 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT_PERSON.phone}
            </a>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-lg font-semibold uppercase tracking-wide text-white">
              Quick Actions
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-100/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-blue-100/60">{FOOTER_COPYRIGHT}</p>
        </div>
      </div>
    </motion.footer>
  );
}