import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import TierGrid from '@/components/TierGrid/TierGrid';
import Callout from '@/components/Callout/Callout';
import { foundersTiers } from '@/data/tiers';

export default function FoundersSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="04 // EARLY ACCESS"
        title="Founders Pass"
        subtitle="6,000 unique AI-generated citizen portraits. Not a speculative asset — a membership card for the people who build. Your identity in MetaXity1. Proof you existed before the pyramid opened."
      />
      <TierGrid tiers={foundersTiers} />
      <Callout
        variant="pink"
        label="SOVEREIGN TIER — COMING SOON"
        text="Your face. Your citizen. AI pipeline generates a unique animated 1-of-1 with your likeness from curated blueprints. You don't just play as a character — you become one."
      />
    </SectionWrapper>
  );
}
