"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { EVENT_INFO, GITREADY_EVENT } from "@/constants/event-config";

const DETAIL_ITEMS = [
  { label: "Tahun", value: String(GITREADY_EVENT.year) },
  ...EVENT_INFO.map(({ label, value }) => ({ label, value })),
];

const EASE = [0.16, 1, 0.3, 1] as const;

function RegistrationArrow() {
  return (
    <span
      aria-hidden="true"
      className="relative block size-11 overflow-hidden text-ink transition-colors duration-500 group-hover:text-white"
    >
      <ArrowRight className="absolute inset-0 m-auto size-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%] group-hover:-translate-y-[140%] motion-reduce:transition-none" />
      <ArrowUpRight className="absolute inset-0 m-auto size-7 -translate-x-[140%] translate-y-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
    </span>
  );
}

export function EventDetailsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="detail-acara"
      aria-labelledby="event-details-title"
      data-navbar-theme="light"
      className="bg-white py-8 sm:py-10 lg:py-12"
    >
      <div className="grid w-full gap-14 pl-2 pr-5 sm:pl-4 sm:pr-8 lg:grid-cols-[minmax(15rem,0.42fr)_minmax(0,1.58fr)] lg:gap-8 lg:pl-3 lg:pr-12 xl:pr-16">
        <div className="self-start lg:flex lg:self-stretch lg:items-stretch lg:justify-start">
          <h2
            id="event-details-title"
            aria-label="Detail event"
            className="w-fit font-display leading-none text-navy lg:flex lg:h-full lg:items-end"
          >
            <span aria-hidden="true" className="text-[clamp(4rem,13vw,7rem)] tracking-[-0.08em] lg:hidden">
              DETAIL EVENT
            </span>
            <span aria-hidden="true" className="hidden items-end gap-2 lg:flex">
              <span className="-translate-y-3 rotate-180 text-[clamp(9rem,min(21vw,28vh),18rem)] tracking-[-0.08em] [writing-mode:vertical-rl]">
                DETAIL
              </span>
              <span className="-translate-y-5 rotate-180 text-[clamp(3.5rem,min(7vw,10vh),7rem)] tracking-[-0.04em] text-brand [writing-mode:vertical-rl]">
                EVENT
              </span>
            </span>
          </h2>
        </div>

        <dl className="border-t border-navy">
          {DETAIL_ITEMS.map(({ label, value }, index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : index * 0.07, ease: EASE }}
              className="group relative grid min-h-36 overflow-hidden border-b border-line px-1 py-8 sm:min-h-40 sm:grid-cols-[10rem_1fr] sm:items-center sm:px-5 lg:min-h-44 lg:grid-cols-[13rem_1fr] lg:px-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-[101%] bg-navy transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none"
              />
              <dt className="relative z-10 font-display text-[clamp(1.15rem,1.7vw,1.75rem)] font-semibold leading-none tracking-[-0.035em] text-brand transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-blue-100 motion-reduce:transform-none motion-reduce:transition-none">
                {label}
              </dt>
              <dd className="relative z-10 mt-3 text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.045em] text-ink transition-colors duration-500 group-hover:text-white motion-reduce:transition-none sm:mt-0">
                {value}
              </dd>
            </motion.div>
          ))}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : DETAIL_ITEMS.length * 0.07, ease: EASE }}
            className="group relative grid min-h-36 overflow-hidden border-b border-navy px-1 py-8 sm:min-h-40 sm:grid-cols-[10rem_1fr] sm:items-center sm:px-5 lg:min-h-44 lg:grid-cols-[13rem_1fr] lg:px-6"
          >
            <a
              href="https://bncc.in/REGISTGITREADY2.0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka formulir pendaftaran"
              className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-[101%] bg-navy transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none"
            />
            <dt className="relative z-10 font-display text-[clamp(1.15rem,1.7vw,1.75rem)] font-semibold leading-none tracking-[-0.035em] text-brand transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-blue-100 motion-reduce:transform-none motion-reduce:transition-none">
              Pendaftaran
            </dt>
            <dd className="relative z-10 mt-3 flex justify-end sm:mt-0">
              <span
                aria-hidden="true"
                className="relative block size-11 overflow-hidden text-ink transition-colors duration-500 group-hover:text-white"
              >
                <ArrowRight className="absolute inset-0 m-auto size-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%] group-hover:-translate-y-[140%] motion-reduce:transition-none" />
                <ArrowUpRight className="absolute inset-0 m-auto size-7 -translate-x-[140%] translate-y-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
              </span>
            </dd>
          </motion.div>
        </dl>
      </div>
    </section>
  );
}
