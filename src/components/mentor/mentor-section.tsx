"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

type MentorSocial = {
  label: string;
  href: string;
};

type Mentor = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  socials?: MentorSocial[];
};

const MENTORS: Mentor[] = [
  {
    name: "Bintang Qurne",
    role: "Contoh visual mentor",
    bio: "Profil ini digunakan sementara untuk meninjau tampilan foto dan interaksi. Daftar mentor resmi akan diperbarui setelah dikonfirmasi.",
    imageSrc: "/images/aku.png",
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/",
      },
    ],
  },
  {
    name: "Mentor 02",
    role: "Nama segera diumumkan",
    bio: "Profil mentor akan ditampilkan setelah tim pendamping GitReady dikonfirmasi.",
  },
  {
    name: "Mentor 03",
    role: "Nama segera diumumkan",
    bio: "Profil mentor akan ditampilkan setelah tim pendamping GitReady dikonfirmasi.",
  },
];

function MentorRow({ mentor, index, open, onToggle }: { mentor: Mentor; index: number; open: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const generatedId = useId();
  const panelId = `mentor-panel-${generatedId.replace(/:/g, "")}`;
  const number = String(index + 1).padStart(2, "0");
  const linkedinProfile = mentor.socials?.find((social) => social.label.toLowerCase() === "linkedin");

  return (
    <article className="border-t border-blue-100/15 last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group grid w-full cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-start gap-4 py-7 text-left transition-colors duration-500 hover:bg-blue-950/25 active:bg-blue-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 sm:grid-cols-[3.25rem_minmax(0,1fr)_2.5rem] sm:gap-6 sm:py-8"
      >
        <span className={`pt-1 font-mono text-xs transition-colors duration-500 ${open ? "text-blue-100" : "text-blue-100/35 group-hover:text-blue-100/70"}`}>
          {number}
        </span>
        <span className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-active:translate-x-1">
          <span className="relative block w-fit overflow-hidden">
            <span className={`block text-2xl font-medium tracking-[-0.04em] transition-colors duration-500 sm:text-4xl ${open ? "text-blue-50" : "text-blue-100/30 group-hover:text-blue-50/65"}`}>
              {mentor.name}
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 block bg-gradient-to-r from-blue-100 via-[#55c8f3] to-blue-500 bg-clip-text text-2xl font-medium tracking-[-0.04em] text-transparent transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-4xl ${open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"}`}
            >
              {mentor.name}
            </span>
          </span>
          <span className={`mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 sm:text-xs ${open ? "text-blue-100/65" : "text-blue-100/30 group-hover:text-blue-100/50"}`}>
            {mentor.role}
          </span>
        </span>
        <ArrowDown
          aria-hidden="true"
          className={`mt-1 size-6 justify-self-end transition-[color,transform] duration-500 sm:size-7 ${open ? "rotate-180 text-blue-50" : "text-blue-100/35 group-hover:text-blue-100/70"}`}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 pl-[3.5rem] sm:pl-[4.75rem] lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16 lg:pb-12">
              <div className="order-2 max-w-xl lg:order-1">
                <p className="text-base leading-7 text-blue-100/65 sm:text-lg sm:leading-8">{mentor.bio}</p>
                {mentor.socials?.length ? (
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    {mentor.socials.map((social) => (
                      <li key={social.label}>
                        <a href={social.href} target="_blank" rel="noreferrer" className="group/social inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition-colors hover:text-[#55c8f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                          {social.label}
                          <ArrowUpRight className="size-4 transition-transform group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="group/mentor-photo relative order-1 flex aspect-[4/3] items-center justify-center overflow-hidden border border-blue-100/15 bg-[#061225] lg:order-2 lg:aspect-[4/5]">
                {mentor.imageSrc ? (
                  <>
                    <Image
                      src={mentor.imageSrc}
                      alt={mentor.name}
                      width={720}
                      height={900}
                      className="h-full w-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mentor-photo:scale-[1.025] group-hover/mentor-photo:grayscale motion-reduce:transition-none"
                    />
                    {linkedinProfile ? (
                      <a
                        href={linkedinProfile.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Buka profil LinkedIn ${mentor.name}`}
                        className="absolute inset-0 flex translate-y-full items-center justify-center text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mentor-photo:translate-y-0 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white motion-reduce:transition-none"
                      >
                        <span aria-hidden="true" className="text-6xl font-black leading-none tracking-[-0.08em] drop-shadow-[0_4px_16px_rgba(2,8,20,0.85)] sm:text-7xl">
                          in
                        </span>
                      </a>
                    ) : null}
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col justify-between p-5 text-blue-100/40">
                    <span className="font-mono text-xs">{number}</span>
                    <span className="max-w-36 font-mono text-xs uppercase leading-5 tracking-[0.12em]">Foto segera hadir</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export function MentorSection() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="mentor" data-navbar-theme="dark" className="bg-[#020814] px-5 py-28 text-blue-50 sm:px-8 sm:py-36 lg:px-14 lg:py-44">
      <div className="mx-auto max-w-[112rem]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 grid gap-8 sm:mb-20 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-blue-100/45">Mentor GitReady</p>
            <h2 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">Temui tim mentor</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-blue-100/55 lg:justify-self-end lg:text-right">
            Mendampingi peserta selama praktik dan membantu ketika alur Git terasa membingungkan.
          </p>
        </motion.div>

        <div>
          {MENTORS.map((mentor, index) => (
            <MentorRow
              key={mentor.name}
              mentor={mentor}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
