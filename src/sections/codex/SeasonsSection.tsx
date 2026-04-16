import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import { seasons } from '@/data/seasons';
import styles from './codex-shared.module.css';

export default function SeasonsSection() {
  return (
    <div>
      <SectionLabel
        num="12 // SEASONS"
        title="The Twelve-Season Arc"
        subtitle="Each season introduces new districts, faction shifts, economy rebalances, and emergent threats. Seasons are validation gates. The story is yours to discover."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">How Seasons Work</div>
        <p className={styles.body}>
          Strands follows a twelve-season narrative arc. Player retention, economy health, and community
          engagement determine what unlocks next. Each season is a hard validation gate: if the numbers
          do not hold, the next season does not activate. Nothing advances on faith.
        </p>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Season Index</div>
        <div className={styles.gridTwo} style={{ marginTop: 12 }}>
          {seasons.map((s) => (
            <Mini key={s.id} variant={s.colorKey} title={s.title} body={s.body} />
          ))}
        </div>
      </Card>
      <Callout
        variant="pink"
        label="NO SPOILERS"
        text="We will not outline the story here. The narrative unfolds through play. What you see above is tone, not plot."
      />
    </div>
  );
}
