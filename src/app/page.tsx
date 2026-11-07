import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PortfolioControls from '@/components/PortfolioControls';
import { readPortfolioContent } from '@/lib/portfolio-store';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects } = await readPortfolioContent();

  return (
    <PortfolioControls profile={profile} projects={projects}>
      <main className="relative min-h-screen overflow-x-hidden text-[#f1f0e9]">
        <Navbar profile={profile} />
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ProjectsSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactSection profile={profile} />
        <Footer profile={profile} />
      </main>
    </PortfolioControls>
  );
}
