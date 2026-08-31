// constants/site-config.ts
// Static content config — FE only, no backend. Update values here, no CMS needed.

/**
 * 10. Narahubung (Contact Person)
 */
export const CONTACT_PERSON = {
  name: "Jildzian Christian",
  phone: "+62 813-4305-8784",
  // WhatsApp deep link built from the phone number (spaces/"+"/"-" stripped)
  whatsappUrl: `https://wa.me/${"+62 813-4305-8784".replace(/[^0-9]/g, "")}`,
};

/**
 * 11. Media Sosial
 * `icon` refers to a lucide-react icon name, resolved in the component
 * that renders this list (see components/layout/footer.tsx).
 * Hardcode the real `href` values yourself — left as placeholders below.
 */
export type SocialLink = {
  label: string;
  href: string;
  icon: "Globe" | "Instagram" | "Facebook" | "Twitter" | "Linkedin";
  username: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Website BNCC",
    href: "http://bncc.net/", // TODO: hardcode real URL
    icon: "Globe",
    username: "bncc.net",
  },
  {
    label: "Instagram BNCC Malang",
    href: "http://instagram.com/bnccmalang", // TODO: hardcode real URL
    icon: "Instagram",
    username: "@bnccmalang",
  },
  {
    label: "Instagram BNCC Binus",
    href: "http://instagram.com/bnccbinus", // TODO: hardcode real URL
    icon: "Instagram",
    username: "@bnccbinus",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bina.nusantara.computer.club", // TODO: hardcode real URL
    icon: "Facebook",
    username: "@bnccbinus",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bnccbinus/posts/", // TODO: hardcode real URL
    icon: "Linkedin",
    username: "@bnccbinus",
  },
];

/**
 * 12. Footer
 */
export const FOOTER_COPYRIGHT = "© 2026 BNCC Learning & Training. Hak Cipta Dilindungi.";

// Existing constant kept per guideline section 3 (link pendaftaran)
export const GOOGLE_FORM_URL = "https://forms.gle/xxxxxxx";