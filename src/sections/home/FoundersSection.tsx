import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Callout from '@/components/Callout/Callout';
import styles from './FoundersSection.module.css';

export default function FoundersSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="05 // FOUNDING CITIZENS"
        title="Founders Pass"
        subtitle="Founding citizenship in the Strands Nation. Not a speculative asset. Not early access to a single product. A permanent credential for the people who arrived before the pyramid opened."
      />

      <Card variant="cyan">
        <p className={styles.body}>
          The Founders Pass releases in waves as each module ships. The first
          wave arrives with S³ Studio. Each wave carries a different visual
          identity reflecting the door you came through, but the citizenship
          weight is the same: founding status, priority access when the network
          launches, governance weight in Nation decisions, and an identity that
          travels with you across every product on the rails.
        </p>
        <p className={styles.bodyEmph}>
          Everyone can claim one. The window is what makes it scarce. You were
          here at the founding. That is the credential.
        </p>
      </Card>

      {/* Gallery collapsed 2026-04-18 SGT — portraits to be replaced with
          module-specific wave art. Restore by re-importing TierGrid and
          foundersTiers, then <TierGrid tiers={foundersTiers} /> */}
      <Callout
        variant="yellow"
        label="SOVEREIGN TIER: COMING SOON"
        text="Your face. Your citizen. AI pipeline generates a unique animated 1-of-1 with your likeness from curated blueprints. You become the identity, fully embodied."
      />
    </SectionWrapper>
  );
}
