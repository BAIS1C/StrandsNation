import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import SocialGrid from '@/components/SocialGrid/SocialGrid';
import { socials } from '@/data/socials';

export default function ConnectSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel num="06 // JOIN THE NETWORK" title="Connect" />
      <SocialGrid socials={socials} />
    </SectionWrapper>
  );
}
