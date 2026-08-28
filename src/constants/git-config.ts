import {
  Folder,
  Package,
  BookMarked,
  Cloud,
  Pencil,
  FilePlus2,
  GitCommitHorizontal,
  ArrowUpFromLine,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Warna / design tokens — mengikuti mockup (wrapper lavender terang,  */
/* card navy gelap, box & tombol abu-kebiruan, terminal hitam)         */
/* ------------------------------------------------------------------ */

export const COLORS = {
  // wrapper terluar (lavender terang)
  wrapperBg: "#dbe2f0",

  // card utama (navy gelap)
  cardBg: "#173257",
  cardBorder: "#0f2643",

  // kotak stage (gradient abu-kebiruan)
  boxGradientFrom: "#aebbd0",
  boxGradientTo: "#dde3ee",
  boxBorder: "#c3cddc",

  // teks di dalam kotak stage
  boxTitle: "#1c3a63",
  boxSubtitle: "#4c5f7d",

  // tombol aksi (pill abu-kebiruan, teks navy)
  buttonBg: "#d9e1ee",
  buttonBgHover: "#c7d2e4",
  buttonText: "#1c3a63",

  // terminal
  terminalBg: "#0a0a0a",
  terminalBarBg: "#161616",
  terminalPrompt: "#22c55e",
  terminalText: "#e5e7eb",
  terminalError: "#f87171",
} as const;

export const FILE_NAME = "app.js";

/* ------------------------------------------------------------------ */
/* Stage (4 kotak horizontal)                                          */
/* ------------------------------------------------------------------ */

export type StageKey = "working" | "staging" | "local" | "github";

export type StageConfig = {
  key: StageKey;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export const STAGES: StageConfig[] = [
  { key: "working", icon: Folder, title: "Working Directory", subtitle: "File yang sedang kamu edit" },
  { key: "staging", icon: Package, title: "Staging Area", subtitle: "Siap untuk di-commit" },
  { key: "local", icon: BookMarked, title: "Local Repository", subtitle: "Riwayat commit lokal" },
  { key: "github", icon: Cloud, title: "GitHub", subtitle: "Sudah ter-push ke remote" },
];

/* ------------------------------------------------------------------ */
/* Tombol aksi                                                          */
/* ------------------------------------------------------------------ */

export type ActionKey = "edit" | "add" | "commit" | "push";

export type ActionConfig = {
  key: ActionKey;
  icon: LucideIcon;
  label: string;
};

export const ACTIONS: ActionConfig[] = [
  { key: "edit", icon: Pencil, label: "Edit File" },
  { key: "add", icon: FilePlus2, label: "git add" },
  { key: "commit", icon: GitCommitHorizontal, label: "git commit" },
  { key: "push", icon: ArrowUpFromLine, label: "git push" },
];

/* ------------------------------------------------------------------ */
/* Tone warna untuk badge file / commit di dalam kotak stage           */
/* ------------------------------------------------------------------ */

export const TONE_STYLES = {
  amber: "border-amber-400/40 bg-amber-400/15 text-amber-700",
  blue: "border-blue-500/40 bg-blue-500/15 text-blue-800",
  violet: "border-violet-500/40 bg-violet-500/15 text-violet-800",
  emerald: "border-emerald-500/40 bg-emerald-500/15 text-emerald-800",
} as const;

export type Tone = keyof typeof TONE_STYLES;