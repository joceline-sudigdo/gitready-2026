import type { LucideIcon } from "lucide-react";
import { Calendar, Clock, MapPin } from "lucide-react";

export type EventInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const EVENT_INFO: EventInfoItem[] = [
  {
    icon: Calendar,
    label: "Tanggal",
    value: "Jumat, 26 September 2025",
  },
  {
    icon: Clock,
    label: "Waktu",
    value: "08:00 – 11:00 WIB",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Binus@Malang (Onsite)",
  },
];

// TODO: ganti dengan link Google Form asli setelah dibuat.
export const REGISTRATION_FORM_URL = "https://forms.gle/ganti-dengan-link-gform";
