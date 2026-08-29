import type { LucideIcon } from "lucide-react";
import { Award, Code2, Smile, Users } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Tentang", href: "#tentang" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQ", href: "#faq" },
  { label: "Gallery", href: "#gallery" },
];

export type MiniFeature = {
  icon: LucideIcon;
  label: string;
};

export const MINI_FEATURES: MiniFeature[] = [
  { icon: Code2, label: "Hands-on Workshop" },
  { icon: Users, label: "Mentor Profesional" },
  { icon: Award, label: "E-Certificate" },
  { icon: Smile, label: "Beginner Friendly" },
];

export const TERMINAL_LINES: { command: string; args: string }[] = [
  { command: "git clone", args: "repository" },
  { command: "git checkout -b", args: "feature/login" },
  { command: "git commit -m", args: '"Add login page"' },
  { command: "git push origin", args: "feature/login" },
];

export const SOCIAL_PROOF = {
  participants: "500+",
  participantsLabel: "Peserta telah bergabung",
  rating: "4.9/5",
  ratingLabel: "Rating Workshop",
  avatarInitials: ["A", "F", "R", "+"],
};

export const HERO_COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  violet: "#7C5CFC",
  dark: "#111827",
  gray: "#6B7280",
  bodyText: "#405575",
  lightBg: "#F7FAFF",
  border: "#D7E0E8",
  green: "#22C55E",
  gitOrange: "#F05032",
} as const;
