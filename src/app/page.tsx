import HeroSection from '@/sections/home/HeroSection';
import Marquee from '@/components/Marquee/Marquee';
import NationSection from '@/sections/home/NationSection';
import EcosystemSection from '@/sections/home/EcosystemSection';
import GameSection from '@/sections/home/GameSection';
import ArchitectsSection from '@/sections/home/ArchitectsSection';
import FoundersSection from '@/sections/home/FoundersSection';
import RoadmapSection from '@/sections/home/RoadmapSection';
import SignupSection from '@/sections/home/SignupSection';
import ConnectSection from '@/sections/home/ConnectSection';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <Marquee />
      <NationSection />
      <EcosystemSection />
      <GameSection />
      <ArchitectsSection />
      <FoundersSection />
      <RoadmapSection />
      <SignupSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
