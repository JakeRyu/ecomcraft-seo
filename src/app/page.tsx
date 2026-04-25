import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { SampleReport } from "@/components/SampleReport";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <HomeSections />
        <SampleReport />
      </main>
      <Footer />
    </div>
  );
}
