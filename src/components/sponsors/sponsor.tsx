"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Sponsor = {
  name: string;
  logoSrc: string;
  href?: string;
};

const TOP_SPONSOR: Sponsor = {
  name: "Sponsor Utama",
  logoSrc: "/images/Logo_horizontal.png",
  href: "https://www.rumahweb.com/promo-hosting-murah/?utm_campaign=hostbprot&utm_medium=gosem&gad_source=1&gad_campaignid=1655722765&gbraid=0AAAAAD-fuB3NTg5YVFa2FmnkwUdePIXsu&gclid=Cj0KCQjw5P7UBhDaARIsAOSlS1O4YSeBC57HMwWfO4rP6wlZf7zb1Foe8nOhkcAGIW8H17Jq0P73NzcaAkzaEALw_wcB",
};

const BOTTOM_SPONSORS: Sponsor[] = [
  {
    name: "Sponsor Kedua",
    logoSrc: "/images/dunia-coding.png",
    href: "https://duniacoding.id/",
  },
  {
    name: "Sponsor Ketiga",
    logoSrc: "/images/logo-telkom.png",
    href: "https://www.telkomsel.com/",
  },
];

function SponsorLogo({
  sponsor,
  priority = false,
  size = "default",
}: {
  sponsor: Sponsor;
  priority?: boolean;
  size?: "default" | "large";
}) {
  const sizeClasses =
    size === "large"
      ? "h-40 w-80 p-8 sm:h-48 sm:w-96 lg:h-56 lg:w-[32rem]"
      : "h-24 w-48 p-6 sm:h-28 sm:w-56 lg:h-32 lg:w-64";

  const content = (
    <div
      className={`flex items-center justify-center border border-line bg-white shadow-[8px_16px_36px_rgba(7,41,85,0.10)] transition-transform duration-300 hover:-translate-y-1 ${sizeClasses}`}
    >
      <Image
        src={sponsor.logoSrc}
        alt={sponsor.name}
        width={400}
        height={160}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </div>
  );

  if (sponsor.href) {
    return (
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white"
      >
        {content}
      </a>
    );
  }

  return content;
}

export function SponsorsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sponsor" data-navbar-theme="light" className="overflow-x-clip bg-white py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[100rem] px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
          className="mx-auto flex max-w-6xl flex-col items-center text-center"
        >
          <h2 className="font-display text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.82] tracking-[-0.06em] text-ink">
            SPONSOR
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Terima kasih kepada mitra yang sudah mendukung GitReady 2.0
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: reduceMotion ? 0 : 0.1 }}
          className="mt-16 flex flex-col items-center gap-8 sm:mt-20 sm:gap-10 lg:mt-24 lg:gap-12"
        >
          {/* Baris atas: 1 logo tengah */}
          <SponsorLogo sponsor={TOP_SPONSOR} priority size="large" />

          {/* Baris bawah: 2 logo kiri & kanan */}
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-10 lg:gap-16">
            {BOTTOM_SPONSORS.map((sponsor) => (
              <SponsorLogo key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}