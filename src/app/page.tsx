// app/page.tsx
import type { Metadata } from "next";

import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "GitReady — Workshop Git & GitHub",
  description:
    "Belajar Git & GitHub dari nol: workflow simulator interaktif, mini game, dan sesi bareng instruktur.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#DCE3ED]">
      {/* Konten section lain nanti ditaruh di sini, di atas Footer */}
      <Footer />
    </div>
  );
}