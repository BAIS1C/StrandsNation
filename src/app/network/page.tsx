import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import SocialGrid from '@/components/SocialGrid/SocialGrid';
import { socials, partners } from '@/data/socials';

export default function NetworkPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      <SectionWrapper>
        <SectionLabel
          num="THE NETWORK"
          title="Connect"
          subtitle="Every channel the resistance broadcasts on. Pick your signal."
        />
        <SocialGrid socials={socials} />
      </SectionWrapper>

      <SectionWrapper bordered>
        <SectionLabel
          num="PARTNERS"
          title="Built With"
          subtitle="Entities, studios, and protocols powering the Strands stack."
        />
        <SocialGrid socials={partners} />
      </SectionWrapper>
    </div>
  );
}
