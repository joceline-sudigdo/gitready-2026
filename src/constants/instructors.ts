import type { Instructor } from "@/types/content.types";

// Sumber: Isi Konten Website GitReady with LnT — Bagian 3. Instruktur
// Ada 2 instruktur. Setiap slot bisa diisi Instructor atau null (= placeholder "Coming Soon").
// Urutan array menentukan urutan tampil di halaman.
export const instructors: (Instructor | null)[] = [
  {
    id: "hisam",
    name: "Hisam",
    role: "Chief Information Officer",
    photoUrl: "/images/instructors/hisam.png",
    photoScale: 1,

  },
  {
    id: "lexy-samuel",
    name: "Lexy Samuel",
    role: "Developer Relations BlockDev",
    photoUrl: "/images/instructors/lexy-samuel.png",
    photoScale: 1.2,
  },
];
