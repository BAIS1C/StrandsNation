import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import TierGrid from '@/components/TierGrid/TierGrid';
import Callout from '@/components/Callout/Callout';
import { foundersTiers } from '@/data/tiers';
import styles from './codex-shared.module.css';

export default function CodexFoundersSection() {
  return (
    <div>
      <SectionLabel
        num="14 // FOUNDERS"
        title="Founders Pass"
        subtitle="6,000 unique citizens. Your PFP. Proof you existed before the pyramid opened."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">What Is a Founders Pass?</div>
        <p className={styles.body}>
          Your Founders Pass is your PFP: a unique AI-generated citizen portrait proving early adoption
          and commitment to the Strands ecosystem. It grants early access, priority SIGOPS allocation,
          exclusive cosmetic lines, and governance weight within the network.
        </p>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Tier Breakdown</div>
        <p className={styles.body} style={{ marginBottom: 16 }}>
          Rarity determines access depth, cosmetic exclusivity, and governance influence. Lower supply
          tiers carry higher weight across all three dimensions.
        </p>
        <TierGrid tiers={foundersTiers} />
      </Card>
      <Callout
        variant="pink"
        label="PERSONALISATION PASS: COMING"
        text="Your face. Your citizen. The Personalisation Pass uses an AI pipeline to generate a unique animated 1-of-1 with your likeness. You become the character in your own game PFP."
      />
    </div>
  );
}
