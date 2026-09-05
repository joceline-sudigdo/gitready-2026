import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { EndlessRunnerGame } from "@/components/game/viva-run";
import { GitWorkflowSimulator } from "@/components/git/GitWorkflowSim";
import { LegacyEventDetails } from "@/components/legacy/legacy-event-details";
import { LegacyFooter } from "@/components/legacy/legacy-footer";
import { LegacyGuidebook } from "@/components/legacy/legacy-guidebook";
import { LegacyHero } from "@/components/legacy/legacy-hero";
import { LegacyNavbar } from "@/components/legacy/legacy-navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitReady — Workshop Git & GitHub",
  description: "Belajar Git & GitHub dari nol: workflow simulator interaktif, mini game, dan sesi bareng instruktur.",
};

export default function Home() {
  return (
    <div className={poppins.className}>
      <LegacyNavbar />
      <main className="flex min-h-screen flex-col bg-[#DCE3ED]">
        <LegacyHero />
        <LegacyEventDetails />
        <LegacyGuidebook />

        <section className="px-6 pb-24 pt-16 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl">Git Workflow Simulator</h2>
            <GitWorkflowSimulator variant="head" />
          </div>

          <div className="mx-auto mt-20 max-w-7xl sm:mt-24 lg:mt-28">
            <h2 className="mb-6 bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl">Viva Run</h2>
            <EndlessRunnerGame variant="head" />
          </div>
        </section>

        <LegacyFooter />
      </main>
    </div>
  );
}
