import type { Metadata } from "next";

import { EndlessRunnerGame } from "@/components/game/viva-run";
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

      <section className="flex justify-center px-6 py-12 sm:px-12 lg:px-16">
        <EndlessRunnerGame />
      </section>

      <Footer />
    </div>
  );
}