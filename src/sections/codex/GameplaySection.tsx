import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import { seasons } from '@/data/seasons';
import styles from './codex-shared.module.css';

export default function GameplaySection() {
  return (
    <div>
      <SectionLabel
        num="09 // GAMEPLAY"
        title="Core Loop"
        subtitle="Vertical extraction, pyramid PvPvE, and AI memory-driven narrative."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">Pyramid Extraction</div>
        <p className={styles.body} style={{ marginBottom: 16 }}>
          Navigate MetaXity1&rsquo;s vertical maze. Risk scales with altitude.
        </p>
        <div className={styles.gridTwo}>
          <Mini variant="cyan" title="Vertical Risk/Reward" body="Premium loot at height · Security scales · Multiple escape routes" />
          <Mini variant="yellow" title="Dynamic Events" body="Corporate sweeps · Elevator lockdowns · Resistance assists" />
        </div>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Meta-Seasons</div>
        <div className={styles.gridTwo} style={{ marginTop: 12 }}>
          {seasons.map((s) => (
            <Mini key={s.id} variant={s.colorKey} title={s.title} body={s.body} />
          ))}
        </div>
      </Card>
    </div>
  );
}
