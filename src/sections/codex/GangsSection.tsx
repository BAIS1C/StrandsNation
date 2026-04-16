import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Callout from '@/components/Callout/Callout';
import { gangs } from '@/data/gangs';
import styles from './codex-shared.module.css';

export default function GangsSection() {
  return (
    <div>
      <SectionLabel
        num="04 // BLOCK GANGS"
        title="Block Gang Territories"
        subtitle="Street-level organisations controlling specific districts. Gang membership provides essential storage security."
      />
      {gangs.map((g) => (
        <Card key={g.name} variant={g.colorKey}>
          <div className={styles.cardTitleMd} data-variant={g.colorKey}>{g.name}</div>
          <p className={styles.body}>{g.description}</p>
        </Card>
      ))}
      <Callout
        variant="red"
        label="ANTI-LONE WOLF"
        text="Limited personal storage forces reliance on gang facilities. Limited inventory isn't a bug; it's a political mechanic. Where you store your gear says who you trust."
      />
    </div>
  );
}
