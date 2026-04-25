import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { ReportForm } from "@/components/ReportForm";
import { SampleReport } from "@/components/SampleReport";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Pricing />
        <ReportForm />
        <SampleReport />
      </main>
      <Footer />
    </div>
  );
}
