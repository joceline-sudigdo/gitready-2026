import { HeroSection } from "@/components/hero/hero-section";
import { EventDetailsSection } from "@/components/detail/event-details-section";
import { EndlessRunnerGame } from "@/components/game/viva-run";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#DCE3ED]">
      <HeroSection />

      <EventDetailsSection />

      <section className="px-6 pb-24 pt-16 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 bg-gradient-to-r from-[#2788CE] to-[#0054A5] bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent sm:text-4xl">
            Viva Run
          </h2>

          <EndlessRunnerGame />
        </div>
      </section>

      <Footer />
    </main>
  );
}