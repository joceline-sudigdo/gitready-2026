# GitReady 2.0 — Frontend (My Part)

Bagian yang dikerjakan di repo ini sesuai pembagian tugas:

1. **Tentang Workshop** — `src/components/sections/about-section.tsx`
2. **Temui Instruktur Kami** — `src/components/sections/instructor-section.tsx`
3. **Apa yang Akan Anda Pelajari** — `src/components/sections/learning-outcome-section.tsx`

Konten diambil dari `Isi Konten Website GitReady with LnT.pdf` (Bagian 2, 3, 4).
Desain mengikuti referensi `Main - Content Sections.png` dari `GitReady_2_0.zip`.

> Section "Instruktur" pada dokumen konten berstatus **COMING SOON**, jadi
> section ini otomatis menampilkan state "Segera Diumumkan". Setelah data
> instruktur asli tersedia, isi `src/constants/instructors.ts` (export
> `leadInstructor` dan `assistantInstructors`) — grid instruktur akan
> otomatis tampil menggantikan state coming-soon.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur relevan

```
src/
├── app/
│   ├── layout.tsx        # font + metadata
│   ├── globals.css
│   └── page.tsx          # merender 3 section di atas (sementara, sebelum digabung tim)
├── components/
│   ├── sections/
│   │   ├── about-section.tsx
│   │   ├── instructor-section.tsx
│   │   └── learning-outcome-section.tsx
│   └── shared/
│       └── section-title.tsx
├── constants/
│   ├── instructors.ts
│   └── learning-points.ts
└── types/
    └── content.types.ts
```

`app/page.tsx` di sini hanya untuk preview bagian saya. Saat digabung dengan
Navbar/Hero/Git Simulator/Game/FAQ/dll milik anggota tim lain, cukup import
ketiga komponen section di atas ke `app/page.tsx` utama sesuai urutan pada
guideline (Bagian 5).
