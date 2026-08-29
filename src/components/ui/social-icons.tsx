// components/shared/social-icons.tsx
// lucide-react removed brand/logo icons (Facebook, Instagram, Linkedin,
// Twitter/X) from its core set — see https://lucide.dev, brand icons are
// out of scope for that project. These are small hand-rolled replacements
// that follow the same props API (className, size) so they drop in next
// to any remaining lucide-react icon.
import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 24, ...props }: IconProps) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": true,
    ...props,
  };
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M13.5 21v-7.9h2.65l.4-3.08H13.5V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.83A21.7 21.7 0 0 0 14.5 3.7c-2.2 0-3.7 1.34-3.7 3.8v2.52H8.13v3.08H10.8V21h2.7Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.93V21h-4V9Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M18.24 3H21l-6.4 7.31L22 21h-6.13l-4.8-6.28L5.6 21H2.83l6.86-7.84L2 3h6.28l4.33 5.73L18.24 3Zm-1.07 16.17h1.5L7.9 4.75H6.29l10.88 14.42Z" />
    </svg>
  );
}