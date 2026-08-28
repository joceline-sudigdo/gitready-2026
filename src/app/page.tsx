import { AboutSection } from "@/components/sections/about-section";
import { InstructorSection } from "@/components/sections/instructor-section";
import { LearningOutcomeSection } from "@/components/sections/learning-outcome-section";

// NOTE: Halaman ini hanya merender bagian yang menjadi tanggung jawab
// developer ini: (2) Tentang Workshop, (3) Temui Instruktur Kami,
// (4) Apa yang Akan Anda Pelajari. Section lain (Navbar, Hero, Git
// Simulator, Game, FAQ, Detail Acara, Registrasi, Footer) dikerjakan
// oleh anggota tim lain dan akan disusun bersama di app/page.tsx utama
// sesuai urutan pada dokumen guideline (Bagian 5).
export default function Home() {
  return (
    <main>
      <AboutSection />
      <InstructorSection />
      <LearningOutcomeSection />
    </main>
  );
}
