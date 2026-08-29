"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { SOCIAL_PROOF } from "@/constants/hero-config";

export function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E7EEF7] bg-white p-4 shadow-[0_8px_24px_-12px_rgba(37,99,235,0.2)] sm:gap-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2.5" aria-hidden="true">
          {SOCIAL_PROOF.avatarInitials.map((initial, index) => (
            <span
              key={`${initial}-${index}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#2563EB] text-[11px] font-semibold text-white"
            >
              {initial}
            </span>
          ))}
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-[#111827]">
            {SOCIAL_PROOF.participants}
          </p>
          <p className="text-[12px] text-[#6B7280]">{SOCIAL_PROOF.participantsLabel}</p>
        </div>
      </div>

      <div className="h-8 w-px bg-[#E7EEF7]" aria-hidden="true" />

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF3C7]">
          <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-[#111827]">{SOCIAL_PROOF.rating}</p>
          <p className="text-[12px] text-[#6B7280]">{SOCIAL_PROOF.ratingLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}
