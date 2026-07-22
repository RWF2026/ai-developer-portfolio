import { FloatingAssistant } from "@/components/ai/FloatingAssistant";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AIPlayground } from "@/components/sections/AIPlayground";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Internships } from "@/components/sections/Internships";
import { ProjectsAndCerts } from "@/components/sections/ProjectsAndCerts";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <BentoGrid />
          <ProjectsAndCerts />
          <AIPlayground />
          <Internships />
          <Education />
        </main>
        <Footer />
        <FloatingAssistant />
      </div>
    </SmoothScroll>
  );
}
