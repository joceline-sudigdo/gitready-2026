"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { instructors } from "@/constants/instructors";

// Sumber: Isi Konten Website GitReady with LnT — Bagian 3. Instruktur
// Setiap slot di `instructors[]` ditampilkan sebagai kartu nyata (jika ada data)
// atau kartu placeholder bergaya "Coming Soon" (jika null).
// Cukup isi slot di constants/instructors.ts — tampilan akan otomatis berubah.

const AURA_SHADOW = [
  "0 0 0 4px #06387E",
  "0 0 10px 8px rgba(6,56,126,0.55)",
  "0 0 20px 14px rgba(6,56,126,0.30)",
  "0 0 34px 20px rgba(6,56,126,0.14)",
  "0 0 50px 28px rgba(6,56,126,0.05)",
].join(", ");

export function InstructorSection() {
  return (
    <section
      id="instruktur"
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ backgroundColor: "#CBD5E1" }}
    >
      <div className="gr-container relative z-10">
        <SectionTitle
          title="Temui Instruktur Kami"
          subtitle="Belajar langsung dari praktisi berpengalaman"
          align="center"
          titleColor="#000000"
          subtitleColor="#424751"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-14 flex flex-wrap justify-center gap-12 sm:gap-16"
        >
          {instructors.map((instructor, idx) =>
            instructor ? (
              /* ── Real instructor card ── */
              <div
                key={instructor.id}
                className="flex flex-col items-center gap-6 text-center"
              >
                {/* Circle photo with aura */}
                <div
                  className="relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-full bg-white"
                  style={{ boxShadow: AURA_SHADOW }}
                >
                  <Image
                    src={instructor.photoUrl ?? ""}
                    alt={instructor.name}
                    fill
                    className="object-contain"
                    sizes="200px"
                    style={{
                      transform: `scale(${instructor.photoScale ?? 0.82}) translateY(10px)`,
                      transformOrigin: "center center",
                    }}
                  />
                </div>

                {/* Name & role */}
                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-2xl font-bold uppercase tracking-widest text-ink">
                    {instructor.name}
                  </p>
                  <p
                    className="font-heading text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "#424751" }}
                  >
                    {instructor.role}
                  </p>
                </div>
              </div>
            ) : (
              /* ── Placeholder card ── */
              <div
                key={`placeholder-${idx}`}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div
                  className="flex h-52 w-52 items-center justify-center rounded-full bg-white"
                  style={{ boxShadow: AURA_SHADOW }}
                >
                  <UserRound
                    className="h-24 w-24 text-primary/40"
                    strokeWidth={1.2}
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-heading text-2xl font-bold uppercase tracking-widest text-ink/50">
                    Coming Soon
                  </p>
                  <p
                    className="font-heading text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "#42475180" }}
                  >
                    Instruktur {idx + 1}
                  </p>
                </div>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
