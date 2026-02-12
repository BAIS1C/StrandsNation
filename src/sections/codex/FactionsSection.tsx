import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Callout from '@/components/Callout/Callout';
import { factions } from '@/data/factions';
import styles from './codex-shared.module.css';

export default function FactionsSection() {
  return (
    <div>
      <SectionLabel
        num="03 // FACTIONS"
        title="Faction Dynamics"
        subtitle="Choose your allegiance in the century-long struggle between pyramid elites and underground resistance."
      />
      {factions.map((f) => (
        <Card key={f.name} variant={f.colorKey}>
          <div className={styles.cardTitleMd} data-variant={f.colorKey}>{f.name}</div>
          <p className={styles.body}>{f.description}</p>
        </Card>
      ))}
      <Callout
        variant="purple"
        label="ECHOES & STRANDS"
        text="Players who explore Layer U are called Strands. Those who discover deeper connections to AO's consciousness fragments are called Echoes — digital ghosts carrying signals from a dead god."
      />
    </div>
  );
}
