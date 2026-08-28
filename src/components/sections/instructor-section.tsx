"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { assistantInstructors, leadInstructor } from "@/constants/instructors";
import { RandomMascots } from "@/components/shared/random-mascots";

// Konten sumber: Isi Konten Website GitReady with LnT — Bagian 3. Instruktur
// Status konten asli: "COMING SOON" -> ditampilkan sebagai state coming-soon.
// Begitu leadInstructor & assistantInstructors diisi, grid instruktur akan tampil otomatis.
export function InstructorSection() {
  const hasInstructorData = leadInstructor !== null;

  return (
    <section id="instruktur" className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: "#CBD5E1" }}>
      {/* Random ambient mascots — positions change on every refresh */}
      <RandomMascots count={4} />

      <div className="gr-container relative z-10">
        <SectionTitle
          title="Temui Instruktur Kami"
          subtitle="Belajar langsung dari praktisi berpengalaman"
          align="center"
          titleColor="#000000"
          subtitleColor="#424751"
        />

        {!hasInstructorData && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-14 flex flex-col items-center gap-6 text-center"
          >
            {/* Circle photo frame with visible aura */}
            <div
              className="flex h-52 w-52 items-center justify-center rounded-full bg-white"
              style={{
                boxShadow: [
                  "0 0 0 4px #06387E",
                  "0 0 10px 8px rgba(6,56,126,0.55)",
                  "0 0 20px 14px rgba(6,56,126,0.30)",
                  "0 0 34px 20px rgba(6,56,126,0.14)",
                  "0 0 50px 28px rgba(6,56,126,0.05)",
                ].join(", "),
              }}
            >
              <UserRound className="h-24 w-24 text-primary/40" strokeWidth={1.2} />
            </div>

            {/* Placeholder name & role */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="font-heading text-2xl font-bold uppercase tracking-widest text-ink/80">
                Lorem Ipsum Dolor
              </p>
              <p className="font-heading text-sm font-semibold uppercase tracking-wider" style={{ color: "#424751" }}>
                Lead Instructor
              </p>
            </div>
          </motion.div>
        )}

        {hasInstructorData && leadInstructor && (
          <div className="mt-10 flex flex-col items-center">
            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20 bg-primary/10 shadow" />
            <h3 className="mt-4 text-lg font-semibold text-ink">
              {leadInstructor.name}
            </h3>
            <p className="text-sm font-medium text-primary">
              {leadInstructor.role}
            </p>

            {assistantInstructors.length > 0 && (
              <>
                <p className="mt-10 text-xs font-semibold uppercase tracking-wide text-muted">
                  Dibantu oleh Asisten Workshop
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-6">
                  {assistantInstructors.map((assistant) => (
                    <div
                      key={assistant.id}
                      className="flex w-24 flex-col items-center text-center"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 shadow" />
                      <span className="mt-2 text-xs font-medium text-ink">
                        {assistant.name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
