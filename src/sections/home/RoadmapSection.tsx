import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Timeline from '@/components/Timeline/Timeline';
import { roadmapEntries } from '@/data/roadmap';

export default function RoadmapSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel num="05 // SIGNAL PATH" title="Roadmap" />
      <Timeline entries={roadmapEntries} />
    </SectionWrapper>
  );
}
