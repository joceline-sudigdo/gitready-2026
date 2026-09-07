import type { LucideIcon } from "lucide-react";
import { Calendar, Clock, MapPin } from "lucide-react";

export type EventInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type EventSchedule = {
  date: string;
  time: string;
  location: string;
};

/**
 * Satu sumber kebenaran untuk detail publik GitReady. Isi properti nullable
 * saat informasi resmi telah tersedia; UI akan membuka CTA secara otomatis.
 */
export const GITREADY_EVENT = {
  year: 2026,
  eventSchedule: null as EventSchedule | null,
  registrationUrl: null as string | null,
  guidebookPath: null as string | null,
} as const;

export const EVENT_INFO: EventInfoItem[] = GITREADY_EVENT.eventSchedule
  ? [
      {
        icon: Calendar,
        label: "Tanggal",
        value: GITREADY_EVENT.eventSchedule.date,
      },
      {
        icon: Clock,
        label: "Waktu",
        value: GITREADY_EVENT.eventSchedule.time,
      },
      {
        icon: MapPin,
        label: "Lokasi",
        value: GITREADY_EVENT.eventSchedule.location,
      },
    ]
  : [
      { icon: Calendar, label: "Tanggal", value: "Sabtu, 19 September" },
      { icon: Clock, label: "Waktu", value: "08.00 - 12.40" },
      { icon: MapPin, label: "Lokasi", value: "Kampus BINUS @Malang (Onsite)" },
    ];
