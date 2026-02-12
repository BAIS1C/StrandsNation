import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import styles from './codex-shared.module.css';

export default function SigopsSection() {
  return (
    <div>
      <SectionLabel
        num="08 // SIGOPS"
        title="Signal Operations"
        subtitle="Real development tasks disguised as resistance missions. Build the world you play in."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">How SIGOPS Works</div>
        <p className={styles.body}>
          Write dialogue? &ldquo;Lore Weaver&rdquo; op. Fix a bug? &ldquo;Code Scavenger.&rdquo;
          Design an asset? &ldquo;Asset Architect.&rdquo; Every validated contribution enhances the
          actual game.
        </p>
      </Card>
      <div className={styles.gridTwo}>
        <Card variant="cyan">
          <Mini variant="green" title="Code Scavenger" body="System optimisation, patches, improvements." />
          <div className={styles.miniSpacer}>
            <Mini variant="cyan" title="Lore Weaver" body="Dialogue, narrative, historical reconstruction." />
          </div>
        </Card>
        <Card variant="pink">
          <Mini variant="purple" title="Asset Architect" body="Environment, equipment, audio." />
          <div className={styles.miniSpacer}>
            <Mini variant="yellow" title="System Designer" body="Mechanics, balance, prototyping." />
          </div>
        </Card>
      </div>
    </div>
  );
}
