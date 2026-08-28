"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { RandomMascots } from "@/components/shared/random-mascots";

// Konten sumber: Isi Konten Website GitReady with LnT — Bagian 2. Tentang Workshop
export function AboutSection() {
  return (
    <section id="tentang" className="relative overflow-hidden py-16 sm:py-20">
      {/* Random ambient mascots — positions change on every refresh */}
      <RandomMascots count={3} />

      <div className="gr-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Decorative heading — short bar + bold black title */}
            <div>
              {/* Short navy bar above the title */}
              <div
                className="mb-2 h-1 w-10 rounded-full"
                style={{ backgroundColor: "#06387E" }}
              />
              {/* Title */}
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Tentang Workshop
              </h2>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              <p>
                GitReady 2.0: Future Career Preparation Through Digital
                Portfolio merupakan workshop hybrid yang dirancang untuk
                membantu mahasiswa mempersiapkan kompetensi teknis sekaligus
                profesional yang dibutuhkan di industri teknologi.
              </p>
              <p>
                Workshop ini menggabungkan pembelajaran Git &amp; GitHub,
                pemahaman workflow kolaboratif dalam pengembangan proyek, serta
                digital portfolio preparation. Peserta tidak hanya belajar
                menggunakan tools yang umum digunakan di industri, tetapi juga
                mendapatkan insight langsung melalui Industrial Lens, Portfolio
                Review, dan Industry Feedback.
              </p>
              <p>
                Melalui GitReady 2.0, peserta diharapkan mampu membangun
                workflow kerja yang lebih terstruktur, mendokumentasikan
                proyek secara profesional, serta menyusun portfolio yang dapat
                merepresentasikan kemampuan dan pengalaman mereka sebagai
                bekal menghadapi dunia industri.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex aspect-[4/3] w-full items-center justify-center rounded-card border border-border bg-surface-light"
          >
            {/* TODO: ganti dengan foto dokumentasi workshop asli */}
            <div className="flex flex-col items-center gap-3 text-primary/40">
              <Code2 className="h-12 w-12" strokeWidth={1.5} />
              <span className="text-xs font-medium text-muted">
                Dokumentasi workshop
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
