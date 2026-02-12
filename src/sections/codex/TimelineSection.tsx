import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Timeline from '@/components/Timeline/Timeline';
import { worldTimeline } from '@/data/timeline';

export default function TimelineSection() {
  return (
    <div>
      <SectionLabel
        num="02 // TIMELINE"
        title="The Official Record"
        subtitle="As maintained by the SOVcorp Historical Commission. Some Layer U contributors have annotated entries where data conflicts with the official account."
      />
      <Timeline entries={worldTimeline} />
    </div>
  );
}
