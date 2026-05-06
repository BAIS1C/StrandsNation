import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import SocialGrid from '@/components/SocialGrid/SocialGrid';
import { socials, ecosystem, partners } from '@/data/socials';

export default function NetworkPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      <SectionWrapper>
        <SectionLabel
          num="THE NETWORK"
          title="Connect"
          subtitle="Every channel the Nation broadcasts on. Pick your signal."
        />
        <SocialGrid socials={socials} />
      </SectionWrapper>

      <SectionWrapper bordered>
        <SectionLabel
          num="THE STACK"
          title="Project Sites"
          subtitle="Every product on the rails. One door per surface."
        />
        <SocialGrid socials={ecosystem} />
      </SectionWrapper>

      <SectionWrapper bordered>
        <SectionLabel
          num="PARTNERS"
          title="Built With"
          subtitle="Entities and studios powering the Strands stack."
        />
        <SocialGrid socials={partners} />
      </SectionWrapper>
    </div>
  );
}
