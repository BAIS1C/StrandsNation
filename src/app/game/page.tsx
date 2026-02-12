import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import { seasons } from '@/data/seasons';
import styles from './page.module.css';

export default function GamePage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      <SectionWrapper>
        <SectionLabel
          num="THE EXPERIENCE"
          title="Strands: The Game"
          subtitle="A post-capitalist MMORPG where the world remembers your choices, NPCs adapt to how you think, and the community builds the civilisation they play in."
        />

        <Card variant="cyan">
          <div className={styles.cardTitle} data-variant="cyan">Pyramid Extraction</div>
          <p className={styles.body}>
            Navigate MetaXity1&rsquo;s vertical maze. Risk scales with altitude — so do rewards.
          </p>
          <div className={styles.grid2} style={{ marginTop: 16 }}>
            <Mini variant="cyan" title="Vertical Risk/Reward" body="Premium loot · Scaling security · Multiple escape routes" />
            <Mini variant="yellow" title="Dynamic Events" body="Corporate sweeps · Elevator lockdowns · Faction territory shifts" />
          </div>
        </Card>

        <Card variant="pink">
          <div className={styles.cardTitle} data-variant="pink">Instanced PvPvE</div>
          <p className={styles.body}>
            Team-based encounters. Skill-based combat emphasises positioning and timing.
          </p>
        </Card>

        <Card variant="yellow">
          <div className={styles.cardTitle} data-variant="yellow">Meta-Seasons — The World Evolves</div>
          <div className={styles.grid2} style={{ marginTop: 12 }}>
            {seasons.map((s) => (
              <Mini key={s.id} variant={s.colorKey} title={s.title} body={s.body} />
            ))}
          </div>
        </Card>

        <Card variant="green">
          <div className={styles.cardTitle} data-variant="green">Skin the World™</div>
          <p className={styles.body}>
            Generate your own aesthetics using AI tools — then see them live in the shared MMO
            world. Your vision becomes part of MetaXity1 for everyone.
          </p>
        </Card>
      </SectionWrapper>
    </div>
  );
}
