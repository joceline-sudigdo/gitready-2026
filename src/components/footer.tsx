"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { CONTACT_PERSON, FOOTER_COPYRIGHT, SOCIAL_LINKS } from "@/constants/footer-config";
import { NAV_LINKS } from "@/constants/hero-config";

const EASE = [0.16, 1, 0.3, 1] as const;

function FooterLink({ href, children, external = false }: { href: string; children: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex w-fit items-center gap-2 text-lg font-semibold tracking-[-0.035em] text-ink transition-colors duration-300 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white"
    >
      {children}
      {external ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 opacity-0 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          strokeWidth={1.7}
        />
      ) : null}
    </a>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer data-navbar-theme="light" className="overflow-hidden bg-white px-5 pb-7 pt-12 text-ink sm:px-8 sm:pt-16 lg:min-h-[100dvh] lg:px-14 lg:py-6">
      <div className="mx-auto w-full max-w-[112rem] lg:grid lg:min-h-[calc(100dvh-3rem)] lg:grid-rows-[auto_1fr_auto]">
        <div className="overflow-hidden border-b border-line pb-7 sm:pb-10 lg:pb-5">
          <a
            href="#top"
            aria-label="Kembali ke awal halaman"
            className="block whitespace-nowrap text-center font-display text-[clamp(4.5rem,min(18vw,30vh),22rem)] font-semibold leading-[0.72] tracking-[-0.085em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            GITREADY
          </a>
        </div>

        <div className="grid gap-14 border-b border-line py-14 sm:py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(12rem,0.55fr)_minmax(13rem,0.65fr)] lg:items-center lg:gap-20 lg:py-7">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <h2 className="text-[clamp(2.75rem,5.2vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Mari mulai dari satu commit.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Punya pertanyaan tentang GitReady? Hubungi narahubung kami untuk informasi yang sudah dikonfirmasi.
            </p>
            <a
              href={CONTACT_PERSON.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-5 border-b border-navy pb-2 text-xl font-semibold tracking-[-0.04em] text-navy transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:text-2xl"
            >
              Hubungi {CONTACT_PERSON.name}
              <span className="relative block size-5 overflow-hidden" aria-hidden="true">
                <ArrowRight className="absolute inset-0 size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]" />
                <ArrowUpRight className="absolute inset-0 size-5 -translate-x-[140%] translate-y-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </a>
          </motion.div>

          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">Navigasi</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">Temukan BNCC</p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <FooterLink href={social.href} external>
                    {social.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.2fr_0.85fr_0.75fr] lg:items-end lg:gap-16 lg:py-5">
          <p className="max-w-md text-2xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-3xl">
            GitReady adalah ruang belajar Git dan GitHub bersama BNCC.
          </p>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">Narahubung</p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.04em]">{CONTACT_PERSON.name}</p>
            <a
              href={CONTACT_PERSON.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-lg text-ink-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {CONTACT_PERSON.phone}
            </a>
          </div>

          <div className="lg:text-right">
            <a href="https://bncc.net/" target="_blank" rel="noopener noreferrer" className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <Image
                src="/images/BNCC_Black.png"
                alt="BNCC"
                width={642}
                height={185}
                className="h-12 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </a>
            <p className="mt-5 text-sm leading-6 text-ink-muted">{FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
