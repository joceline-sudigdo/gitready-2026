"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";

import { FloatingGitCard } from "@/components/hero/floating-git-card";

function GithubGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function IconBadge({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FloatingGitCard delay={delay} floatDistance={6} hideBelow="none" className={className}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-14 sm:w-14">
        {children}
      </div>
    </FloatingGitCard>
  );
}

export function GitVisualization() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] select-none lg:max-w-[680px]">
      {/* Floating 3D Artwork */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full"
      >
        <img
          src="/images/hero-git-visualization.png"
          alt="Visualisasi interaktif GitReady dengan maskot BNCC bersantai di atas Git branch"
          className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.18)]"
          draggable={false}
        />
      </motion.div>

      {/* Floating Git Orange Badge */}
      <IconBadge className="right-[4%] top-[10%] z-20 sm:right-[6%]" delay={0.3}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1EE] text-[#F05032] sm:h-10 sm:w-10">
          <GitMerge className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </span>
      </IconBadge>

      {/* Floating GitHub Badge */}
      <IconBadge className="-right-1 top-[25%] z-20 sm:right-0" delay={0.5}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#111827] sm:h-10 sm:w-10">
          <GithubGlyph className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </IconBadge>
    </div>
  );
}

