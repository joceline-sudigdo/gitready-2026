"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownToLine } from "lucide-react";

const PDF_PATH =
  "/ConvNeXt-2U_A_3-D_Deep_Learning-Based_Segmentation_Model_for_Unified_and_Automatic_Segmentation_of_Lungs_Normal_Liver_and_Tumors_in_Y-90_Radioembolization_Dosimetry.pdf";

type BookPage = {
  imageSrc: string;
  alt: string;
};

const BOOK_PAGES: BookPage[] = Array.from({ length: 10 }, (_, index) => {
  const pageNumber = index + 1;

  return {
    imageSrc: `/images/guidebook/convnext/page-${String(pageNumber).padStart(2, "0")}.jpg`,
    alt: `Halaman ${pageNumber} dari paper ConvNeXt-2U`,
  };
});

const BOOK_LEAVES = Array.from({ length: 5 }, (_, index) => ({
  front: BOOK_PAGES[index * 2],
  back: BOOK_PAGES[index * 2 + 1],
}));

function BookFace({ page, back, priority }: { page: BookPage; back?: boolean; priority?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden border border-line bg-surface shadow-[10px_22px_45px_rgba(7,41,85,0.22)] [backface-visibility:hidden] ${back ? "[transform:rotateY(180deg)]" : ""}`}
    >
      <Image
        src={page.imageSrc}
        alt={page.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 48vw, 32rem"
        draggable={false}
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-[5%] ${back ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-navy-deep/15 to-transparent`}
      />
    </div>
  );
}

function ScrollBookLeaf({
  leaf,
  index,
  progress,
  reduceMotion,
}: {
  leaf: (typeof BOOK_LEAVES)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const turnStart = 0.08 + index * 0.145;
  const turnEnd = turnStart + 0.105;
  const rotateY = useTransform(progress, [turnStart, turnEnd], [0, -180]);
  const zIndex = useTransform(progress, (value) =>
    value >= turnEnd ? index + 1 : BOOK_LEAVES.length - index + 10,
  );

  return (
    <motion.div
      style={{
        rotateY: reduceMotion ? -180 : rotateY,
        zIndex: reduceMotion ? index + 1 : zIndex,
      }}
      className="absolute left-1/2 top-0 h-full w-1/2 origin-left [transform-style:preserve-3d]"
    >
      <BookFace page={leaf.front} priority={index === 0} />
      <BookFace page={leaf.back} back />
    </motion.div>
  );
}

function InteractiveBook() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.32,
  });
  const bookX = useTransform(smoothProgress, [0.08, 0.185], ["-25%", "0%"]);
  const bookRotateX = useTransform(smoothProgress, [0.01, 0.1], [3, 1.5]);

  return (
    <div
      ref={scrollRef}
      aria-label="Dokumen berbentuk buku yang terbuka saat halaman digulir"
      className={reduceMotion ? "relative" : "relative h-[420dvh]"}
    >
      <div className={reduceMotion ? "relative flex min-h-[70dvh] items-center justify-center py-6 sm:py-10" : "sticky top-20 flex min-h-[calc(100dvh-5rem)] items-center justify-center lg:items-start lg:pt-6"}>
        <div
          className="relative aspect-[17/11] w-[min(96vw,64rem)]"
          style={{ perspective: "1800px" }}
        >
          <motion.div
            aria-hidden="true"
            style={{
              x: reduceMotion ? "0%" : bookX,
              rotateX: reduceMotion ? 0 : bookRotateX,
            }}
            className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
          >
            <div className="absolute left-1/2 top-0 h-full w-1/2 border border-line bg-surface shadow-[12px_28px_65px_rgba(7,41,85,0.24)]">
              <div className="absolute inset-y-0 left-0 w-3 bg-[linear-gradient(90deg,rgba(7,41,85,0.16),transparent)]" aria-hidden="true" />
            </div>

            {BOOK_LEAVES.map((leaf, index) => (
              <ScrollBookLeaf
                key={leaf.front.imageSrc}
                leaf={leaf}
                index={index}
                progress={smoothProgress}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}

            <span aria-hidden="true" className="absolute left-1/2 top-0 z-30 h-full w-px -translate-x-1/2 bg-navy-deep/30 shadow-[0_0_12px_rgba(7,41,85,0.35)]" />
          </motion.div>
        </div>
      </div>

      <p className="sr-only">
        Gulir halaman untuk membuka dan membalik halaman dokumen.
      </p>
    </div>
  );
}

export function GuidebookSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="buku-panduan" data-navbar-theme="light" className="overflow-x-clip bg-white py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[100rem] px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-6xl flex-col items-center text-center"
        >
          <h2 className="font-display text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.82] tracking-[-0.06em] text-ink">
            PANDUAN GIT
          </h2>
        </motion.div>

        <div className="mt-6 min-w-0 sm:mt-8">
          <InteractiveBook />
          <div className="mx-auto flex w-[min(96vw,64rem)] justify-end pt-6 sm:pt-8">
            <a
              href={PDF_PATH}
              download="ConvNeXt-2U.pdf"
              className="group inline-flex min-h-11 items-center gap-3 border-b border-navy pb-1 text-sm font-semibold text-navy transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:text-base"
            >
              Download PDF
              <ArrowDownToLine
                className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
