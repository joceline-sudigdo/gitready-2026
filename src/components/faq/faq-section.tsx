"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apakah saya perlu pengalaman sebelumnya?",
    answer: "Tidak perlu! Workshop ini dirancang untuk pemula yang belum pernah menggunakan Git atau GitHub sama sekali.",
  },
  {
    question: "Apa yang harus saya bawa?",
    answer: "Anda wajib membawa laptop pribadi dengan charger. Pastikan juga Git sudah ter-install di laptop Anda sebelum acara dimulai.",
  },
  {
    question: "Bagaimana cara install Git dan membuat akun GitHub?",
    answer: "Anda bisa mengikuti panduan resmi. Untuk menginstall Git, kunjungi git-scm.com/downloads. Untuk membuat akun GitHub, kunjungi github.com/signup.",
  },
  {
    question: "Apakah makan siang disediakan?",
    answer: "Ya, kami menyediakan makan siang untuk seluruh peserta.",
  }
];

function FaqRow({ item, index, open, onToggle }: { item: FaqItem; index: number; open: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const generatedId = useId().replace(/:/g, "");
  const buttonId = `faq-button-${generatedId}`;
  const panelId = `faq-panel-${generatedId}`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-blue-100/15 last:border-b"
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_2.5rem] items-start gap-5 px-0 py-7 text-left transition-colors duration-500 hover:bg-blue-950/25 active:bg-blue-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 sm:py-9"
      >
        <span className={`max-w-3xl text-xl font-medium tracking-[-0.035em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-active:translate-x-1 sm:text-3xl ${open ? "text-blue-50" : "text-blue-100/45 group-hover:text-blue-50"}`}>
          {item.question}
        </span>
        <span className="flex size-9 items-center justify-center justify-self-end border border-blue-100/20 text-blue-100 transition-colors duration-500 group-hover:border-blue-200/50 group-hover:text-white" aria-hidden="true">
          <Plus className={`size-5 transition-transform duration-500 ${open ? "rotate-45" : "rotate-0"}`} strokeWidth={1.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-9 pr-12 text-base leading-7 text-blue-100/65 sm:pb-11 sm:text-lg sm:leading-8">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function FaqSection() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" data-navbar-theme="dark" className="border-t border-blue-100/10 bg-[#020814] px-5 pb-28 text-blue-50 sm:px-8 sm:pb-36 lg:px-14 lg:pb-44">
      <div className="mx-auto grid max-w-[112rem] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="pt-20 lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="max-w-xl text-balance text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
            Pertanyaan yang sering muncul.
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-blue-100/55 sm:text-lg sm:leading-8">
            Temukan jawaban singkat sebelum mengikuti rangkaian GitReady.
          </p>
        </motion.header>

        <div className="pt-0 lg:pt-20">
          {FAQ_ITEMS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
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
