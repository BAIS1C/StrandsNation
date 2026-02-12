import HeroSection from '@/sections/home/HeroSection';
import Marquee from '@/components/Marquee/Marquee';
import ArchitectsSection from '@/sections/home/ArchitectsSection';
import GameSection from '@/sections/home/GameSection';
import EcosystemSection from '@/sections/home/EcosystemSection';
import FoundersSection from '@/sections/home/FoundersSection';
import RoadmapSection from '@/sections/home/RoadmapSection';
import ConnectSection from '@/sections/home/ConnectSection';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <Marquee />
      <ArchitectsSection />
      <GameSection />
      <EcosystemSection />
      <FoundersSection />
      <RoadmapSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
