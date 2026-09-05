import type { LucideIcon } from "lucide-react";
import { Award, Code2, Smile, Users } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Tentang", href: "#tentang" },
  { label: "Detail", href: "#detail-acara" },
  { label: "Viva Run", href: "#viva-run" },
  { label: "FAQ", href: "#faq" },
  { label: "Panduan", href: "#buku-panduan" },
];

export type MiniFeature = {
  icon: LucideIcon;
  label: string;
  description: string;
  command: string;
};

export const MINI_FEATURES: MiniFeature[] = [
  { icon: Code2, label: "Praktik langsung", description: "Pelajari alur Git lewat latihan yang bisa langsung dicoba, bukan sekadar teori.", command: "git commit" },
  { icon: Users, label: "Belajar bersama", description: "Pahami cara tim menyatukan perubahan dan menjaga riwayat kerja tetap rapi.", command: "git merge" },
  { icon: Award, label: "Alur terstruktur", description: "Ikuti urutan kerja yang jelas dari perubahan lokal sampai repository bersama.", command: "git push" },
  { icon: Smile, label: "Ramah pemula", description: "Istilah teknis dijelaskan dengan bahasa Indonesia yang langsung dan kontekstual.", command: "git status" },
];

export const TERMINAL_LINES: { command: string; args: string }[] = [
  { command: "git clone", args: "repository" },
  { command: "git checkout -b", args: "feature/login" },
  { command: "git commit -m", args: '"Add login page"' },
  { command: "git push origin", args: "feature/login" },
];
