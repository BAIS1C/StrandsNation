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
        num="11 // FOUNDERS"
        title="Founders Pass"
        subtitle="6,000 unique citizens. Proof you existed before the pyramid opened."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">What Is a Founders Pass?</div>
        <p className={styles.body}>
          Each pass is a unique AI-generated character portrait. Grants early access, priority
          SIGOPS, exclusive cosmetics, and governance weight.
        </p>
      </Card>
      <TierGrid tiers={foundersTiers} />
      <Callout
        variant="pink"
        label="SOVEREIGN TIER — COMING SOON"
        text="Your face. Your citizen. You don't just play as a character — you become one."
      />
    </div>
  );
}
