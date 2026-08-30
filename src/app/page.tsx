import { HeroSection } from "@/components/hero/hero-section";
import { EventDetailsSection } from "@/components/detail/event-details-section";
import { GuidebookSection } from "@/components/guidebook/guidebook-section";
import { GitWorkflowSimulator } from "@/components/git/GitWorkflowSim";
import { EndlessRunnerGame } from "@/components/game/viva-run";
import { Footer } from "@/components/footer";
import { HeroNavbar } from "@/components/hero/hero-navbar";

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <main className="flex min-h-screen flex-col bg-[#DCE3ED]">
        <HeroSection />
        <EventDetailsSection />
        <GuidebookSection />

        <section className="px-6 pb-24 pt-16 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl">
              Git Workflow Simulator
            </h2>
            <GitWorkflowSimulator />
          </div>

          <div className="mx-auto max-w-7xl mt-20 sm:mt-24 lg:mt-28">
            <h2 className="mb-6 bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl">
              Viva Run
            </h2>

            <EndlessRunnerGame />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}