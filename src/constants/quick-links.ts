// constants/quick-links.ts

export type QuickLink = {
  label: string;
  href: string; // anchor hash ke id section terkait, mis. "#beranda"
};

export const QUICK_LINKS: QuickLink[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Workshop", href: "#tentang-workshop" },
  { label: "Instruktur", href: "#instruktur" },
  { label: "Materi Workshop", href: "#materi-workshop" },
  { label: "Buku Panduan", href: "#buku-panduan" },
  { label: "FAQ", href: "#faq" },
  { label: "Detail Acara", href: "#detail-acara" },
  { label: "Simulasi Git", href: "#simulasi-git" },
  { label: "Viva Run", href: "#viva-run" },
];