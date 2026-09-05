"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Sparkles } from "lucide-react";

const PDF_PATH = "/UAP ISYS6898003 AlgoProg 2520 - Tipe A (1).pdf";
const DOWNLOAD_FILENAME = "Buku-Panduan-GitReady.pdf";

export function GuidebookSection() {
  return (
    <section id="buku-panduan" className="bg-[#D7E0E8] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl"
          >
            Buku Panduan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#405575] sm:text-[16px]"
          >
            Pelajari materi workshop dan rangkuman alur kerja Git &amp; GitHub secara lengkap.
            Unduh buku panduan resmi untuk mendukung proses belajarmu.
          </motion.p>
        </div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-[900px] overflow-hidden rounded-2xl border border-[#BFD2F5] bg-white shadow-xl shadow-blue-900/5 sm:rounded-3xl"
        >
          {/* Card Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF5FF] bg-gradient-to-r from-[#F7FAFF] to-[#EEF5FF] px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#2788CE] to-[#0054A5] text-white shadow-sm">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-[#111827] sm:text-[16px]">
                  Buku Panduan GitReady
                </h3>
                <p className="text-[12px] font-medium text-[#6B7280]">
                  Dokumen Resmi Workshop • Edisi 2026
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFD2F5]/60 bg-white px-2.5 py-1 text-[12px] font-medium text-[#0054A5]">
              <FileText className="h-3.5 w-3.5 text-[#2788CE]" aria-hidden="true" />
              PDF Document
            </span>
          </div>

          {/* Preview Container */}
          <div className="relative flex flex-col items-center justify-center bg-[#F7FAFF] p-4 sm:p-6 lg:p-8">
            {/* Embedded PDF frame with responsive height */}
            <div className="relative w-full overflow-hidden rounded-xl border border-[#D7E0E8] bg-white shadow-inner">
              <iframe
                src={`${PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0`}
                title="Preview Buku Panduan GitReady"
                height="480"
                style={{
                  width: "100%",
                  height: "480px",
                  minHeight: "360px",
                }}
                className="w-full h-[380px] sm:h-[430px] md:h-[460px] lg:h-[480px] border-0"
                loading="lazy"
              />
            </div>

            {/* Download Button Area */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 text-center sm:mt-8">
              <motion.a
                href={PDF_PATH}
                download={DOWNLOAD_FILENAME}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-[9px] border border-transparent bg-gradient-to-r from-[#2788CE] to-[#0054A5] px-6 text-[14px] font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-[#217DBE] hover:to-[#00478E] hover:shadow-md"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                Download Buku Panduan
              </motion.a>

              <p className="text-[12px] text-[#6B7280]">
                Klik tombol di atas untuk langsung mengunduh file PDF ke perangkat Anda.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
