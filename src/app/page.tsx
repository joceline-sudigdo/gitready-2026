import type { Metadata } from "next";

import { EventDetailsSection } from "@/components/detail/event-details-section";
import { SimulatorSection } from "@/components/experience-sections";
import { FaqSection } from "@/components/faq/faq-section";
import { Footer } from "@/components/footer";
import { GuidebookSection } from "@/components/guidebook/guidebook-section";
import { AboutSection } from "@/components/hero/about-section";
import { HeroNavbar } from "@/components/hero/hero-navbar";
import { HeroSection } from "@/components/hero/hero-section";
import SpeakerSection from "@/components/hero/portfolio-about-section";
import { MentorSection } from "@/components/mentor/mentor-section";
import { RegistrationStatusSection } from "@/components/registration/registration-status-section";

export const metadata: Metadata = {
  title: "GitReady 2026 | Eksperimen",
  robots: { index: false, follow: false },
};

export default function CobaPage() {
  return (
    <>
      <HeroNavbar />
      <main id="top" className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-canvas">
        <div className="relative isolate bg-[#020814]">
          <HeroSection />
          <AboutSection />
          <SpeakerSection />
          <MentorSection />
        </div>
        <EventDetailsSection />
        <SimulatorSection />
        <GuidebookSection />
        {/* <RegistrationStatusSection /> */}
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
