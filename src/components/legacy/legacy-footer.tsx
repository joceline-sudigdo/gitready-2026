"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Globe, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";

type SocialLink = {
  label: string;
  href: string;
  icon: "Globe" | "Instagram" | "Facebook" | "Twitter" | "Linkedin";
  username: string;
};

const CONTACT_PERSON = {
  name: "Jildzian Christian",
  phone: "+62 813-4305-8784",
  whatsappUrl: "https://wa.me/6281343058784",
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Website BNCC", href: "http://bncc.net/", icon: "Globe", username: "bncc.net" },
  { label: "Instagram BNCC Malang", href: "http://instagram.com/bnccmalang", icon: "Instagram", username: "@bnccmalang" },
  { label: "Instagram BNCC Binus", href: "http://instagram.com/bnccbinus", icon: "Instagram", username: "@bnccbinus" },
  { label: "Facebook", href: "https://www.facebook.com/bina.nusantara.computer.club", icon: "Facebook", username: "@bnccbinus" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bnccbinus/posts/", icon: "Linkedin", username: "@bnccbinus" },
];

const SOCIAL_ICON_MAP: Record<SocialLink["icon"], ElementType> = {
  Globe,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Twitter: XIcon,
  Linkedin: LinkedinIcon,
};

function SocialColumn({ items }: { items: SocialLink[] }) {
  return (
    <ul className="space-y-3">
      {items.map((social) => {
        const Icon = SOCIAL_ICON_MAP[social.icon];
        return (
          <li key={social.label}>
            <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex items-center gap-3 text-sm text-blue-100/80 transition-colors hover:text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20"><Icon className="h-4 w-4" aria-hidden="true" /></span>
              <span>{social.username}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function LegacyFooter() {
  const splitIndex = Math.ceil(SOCIAL_LINKS.length / 2);
  const leftColumn = SOCIAL_LINKS.slice(0, splitIndex);
  const rightColumn = SOCIAL_LINKS.slice(splitIndex);

  return (
    <motion.footer initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="mt-auto rounded-t-[2.5rem] bg-[#0B3B7A] px-6 py-14 sm:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">GitReady</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200/70">Contact Person:</p>
            <p className="text-lg font-semibold text-white">{CONTACT_PERSON.name}</p>
            <a href={CONTACT_PERSON.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Hubungi ${CONTACT_PERSON.name} lewat WhatsApp di ${CONTACT_PERSON.phone}`} className="inline-flex items-center gap-2 text-sm text-blue-100/80 transition-colors hover:text-white"><Phone className="h-4 w-4" aria-hidden="true" />{CONTACT_PERSON.phone}</a>
          </div>
          <div className="space-y-3"><p className="max-w-xs text-sm text-blue-100/70">Workshop belajar Git &amp; GitHub dari nol sampai terbiasa dengan alur kerja kolaboratif tim development.</p></div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200/70">Media Sosial</p>
            <div className="flex gap-10"><SocialColumn items={leftColumn} /><SocialColumn items={rightColumn} /></div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6"><p className="text-center text-xs text-blue-100/60">© 2025 BNCC Learning &amp; Training. Hak Cipta Dilindungi.</p></div>
      </div>
    </motion.footer>
  );
}
