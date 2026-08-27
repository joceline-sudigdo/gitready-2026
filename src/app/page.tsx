import { HeroSection } from "@/components/hero/hero-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <HeroSection />

      {/* Section lain akan ditambahkan nanti */}

      <Footer />
    </main>
  );
}

