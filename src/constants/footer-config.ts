import { GITREADY_EVENT } from "@/constants/event-config";

export const CONTACT_PERSON = {
  name: "Jildzian Christian",
  phone: "+62 813-4305-8784",
  whatsappUrl: `https://wa.me/${"+62 813-4305-8784".replace(/[^0-9]/g, "")}`,
};

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
