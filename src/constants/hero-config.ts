import type { LucideIcon } from "lucide-react";
import { Award, Ticket, BadgeCheck, Code2, Wrench, Briefcase, Users, Gift } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Tentang", href: "#tentang" },
  { label: "Detail", href: "#detail-acara" },
  { label: "Git Workflow", href: "#simulator-git" },
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
  { icon: Award, label: "SAT Points", description: "Dapatkan SAT Points untuk mahasiswa Binus (Binusian) yang mengikuti workshop ini.", command: "--sat-points" },
  { icon: Ticket, label: "Learning Voucher", description: "Berkesempatan meraih Learning Voucher dari Dunia Coding. *Syarat dan ketentuan berlaku.", command: "--voucher" },
  { icon: BadgeCheck, label: "E-Certificate", description: "Sertifikat elektronik sebagai bukti partisipasi. *Syarat dan ketentuan berlaku.", command: "--certificate" },
  { icon: Code2, label: "Git & GitHub Skills", description: "Kuasai Git & GitHub dari dasar sampai siap dipakai di proyek nyata.", command: "git init" },
  { icon: Wrench, label: "Hands-on Mini Project", description: "Praktik langsung lewat mini project, bukan sekadar teori di slide.", command: "git commit" },
  { icon: Briefcase, label: "Industry & Portfolio Insights", description: "Insight langsung dari praktisi soal industri dan cara membangun portfolio.", command: "--insights" },
  { icon: Users, label: "Collaborative Development", description: "Rasakan pengalaman kolaborasi lewat workflow tim yang sesungguhnya.", command: "git merge" },
  { icon: Gift, label: "Merchandise", description: "Bawa pulang merchandise eksklusif GitReady 2.0. *Syarat dan ketentuan berlaku.", command: "--merch" },
];

export const TERMINAL_LINES: { command: string; args: string }[] = [
  { command: "git clone", args: "repository" },
  { command: "git checkout -b", args: "feature/login" },
  { command: "git commit -m", args: '"Add login page"' },
  { command: "git push origin", args: "feature/login" },
];
