"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Konten sumber: Isi Konten Website GitReady with LnT — Bagian 2. Tentang Workshop
export function AboutSection() {
  return (
    <section id="tentang" className="relative overflow-hidden py-16 sm:py-20">
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

          {/* RIGHT — mascot showcase panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(145deg, #1B3A6B 0%, #0A1628 100%)",
              boxShadow:
                "0 24px 64px rgba(6,56,126,0.35), 0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            {/* Dot-grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #4DC8F5 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* Radial cyan glow behind mascot */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(77,200,245,0.22) 0%, transparent 70%)",
              }}
            />

            {/* Corner accent — top-left */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-br-full opacity-20"
              style={{ background: "radial-gradient(circle at 0% 0%, #4DC8F5, transparent)" }}
            />

            {/* Robot Happy — floating animation */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
              style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.45))" }}
            >
              <Image
                src="/images/Robot Happy.png"
                alt="GitReady mascot"
                width={200}
                height={220}
                priority
              />
            </motion.div>

            {/* Bottom label */}
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3 px-8">
              <div
                className="h-px flex-1 rounded"
                style={{ backgroundColor: "rgba(77,200,245,0.25)" }}
              />
              <span
                className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#4DC8F5" }}
              >
                Workshop GitReady 2.0
              </span>
              <div
                className="h-px flex-1 rounded"
                style={{ backgroundColor: "rgba(77,200,245,0.25)" }}
              />
            </div>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #4DC8F5, transparent)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
