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
        subtitle="Real development contributions, diegetically delivered as missions within your personalised game narrative."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">How SIGOPS Works</div>
        <p className={styles.body}>
          SIGOPS are real development tasks woven into the fabric of your game experience. Design
          environments. Forge equipment. Compose audio. Prototype mechanics. Create new armour hybrids and
          weapon classes through the Weaver path. Every validated contribution earns reputation, $KREDS
          allocation weight, and shapes the world for every player.
        </p>
      </Card>
      <div className={styles.gridTwo}>
        <Card variant="cyan">
          <Mini variant="purple" title="Asset Architect" body="Environments, equipment, audio, and visual assets. The building blocks of MetaXity1." />
          <div className={styles.miniSpacer}>
            <Mini variant="yellow" title="System Designer" body="Mechanics, balance, prototyping. Shaping how the world plays." />
          </div>
        </Card>
        <Card variant="pink">
          <Mini variant="cyan" title="Weaver Forge" body="New armour hybrids, new weapon classes, new Trait Shard configurations. Creative R&D delivered as gameplay." />
          <div className={styles.miniSpacer}>
            <Mini variant="green" title="Field Tester" body="Live playtesting, balance validation, stress testing in production environments." />
          </div>
        </Card>
      </div>
    </div>
  );
}
