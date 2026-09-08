"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { CONTACT_PERSONS, FOOTER_COPYRIGHT, SOCIAL_LINKS } from "@/constants/footer-config";
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
  const primaryContact = CONTACT_PERSONS[0];

  return (
    <footer data-navbar-theme="light" className="overflow-hidden bg-white px-5 pb-7 pt-12 text-ink sm:px-8 sm:pt-16 lg:min-h-[100dvh] lg:px-14 lg:py-6">
      <div className="mx-auto w-full max-w-[112rem] lg:grid lg:min-h-[calc(100dvh-3rem)] lg:grid-rows-[auto_1fr_auto]">
        <div className="overflow-hidden border-b border-line pb-7 sm:pb-10 lg:pb-5">
          <a
            href="#top"
            aria-label="Kembali ke awal halaman"
            className="flex justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image
              src="/images/logo-git.png"
              alt="GitReady"
              width={1000}
              height={200}
              priority={false}
              className="h-[clamp(3rem,min(15vw,20vh),22rem)] w-auto object-contain"
            />
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
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              {CONTACT_PERSONS.map((person) => (
                <a
                  key={person.name}
                  href={person.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-5 border-b border-navy pb-2 text-xl font-semibold tracking-[-0.04em] text-navy transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:text-2xl"
                >
                  Hubungi {person.name}
                  <span className="relative block size-5 overflow-hidden" aria-hidden="true">
                    <ArrowRight className="absolute inset-0 size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]" />
                    <ArrowUpRight className="absolute inset-0 size-5 -translate-x-[140%] translate-y-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </a>
              ))}
            </div>
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

        <div className="flex flex-col gap-10 py-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:py-5">
          <p className="max-w-md text-2xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-3xl">
            GitReady adalah ruang belajar Git dan GitHub bersama BNCC.
          </p>

          <div className="flex flex-col items-start lg:items-end">
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