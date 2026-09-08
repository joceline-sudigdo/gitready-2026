import { GITREADY_EVENT } from "@/constants/event-config";

export const CONTACT_PERSONS = [
  {
    name: "Levi",
    phone: "0878 9504 1041",
    whatsappUrl: "https://wa.me/6287895041041",
  },
  {
    name: "Carel",
    phone: "0877 8902 2000",
    whatsappUrl: "https://wa.me/6287789022000",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  username: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Website BNCC",
    href: "https://bncc.net/",
    username: "bncc.net",
  },
  {
    label: "Instagram BNCC Malang",
    href: "https://instagram.com/bnccmalang",
    username: "@bnccmalang",
  },
  {
    label: "Instagram BNCC Binus",
    href: "https://instagram.com/bnccbinus",
    username: "@bnccbinus",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bina.nusantara.computer.club",
    username: "@bnccbinus",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bnccbinus/posts/",
    username: "@bnccbinus",
  },
];

export const FOOTER_COPYRIGHT = `© ${GITREADY_EVENT.year} BNCC Learning & Training. Hak Cipta Dilindungi.`;
