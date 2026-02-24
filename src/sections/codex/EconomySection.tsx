import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import styles from './codex-shared.module.css';

export default function EconomySection() {
  return (
    <div>
      <SectionLabel
        num="05 // ECONOMY"
        title="The Three Primitives"
        subtitle="In Year 555, compute isn't just power — it's control. The economy runs on three primitives, priced by two competing systems."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">Energy / Process Power / Storage</div>
        <div className={styles.gridThree}>
          <Mini variant="cyan" title="ENERGY (UBC)" body="Universal Basic Calories. The base survival resource. SOVcorp rations it. Every action costs energy." />
          <Mini variant="pink" title="PROCESS POWER (UBComp)" body="Universal Basic Compute. For AI, crafting, hacking, Mait operation. Corporate allocation is surveilled." />
          <Mini variant="yellow" title="STORAGE" body="Block Gang + Holoshard facilities. Personal inventory is tiny. Gang storage requires political alignment." />
        </div>
      </Card>

      <div className={styles.vsGrid}>
        <Card variant="cyan">
          <div className={styles.cardTitleMd} data-variant="cyan">Corporate Credits (SOVComp)</div>
          <p className={styles.body}>Issued by SOVcorp. Stable. Tracked. Every transaction builds your compliance profile. Safe, surveilled, and limiting.</p>
        </Card>
        <div className={styles.vsDivider}>
          <div className={styles.vsLineTop} />
          <span className={styles.vsLabel}>VS</span>
          <div className={styles.vsLineBottom} />
        </div>
        <Card variant="pink">
          <div className={styles.cardTitleMd} data-variant="pink">Underground Tokens</div>
          <p className={styles.body}>Decentralised. Earned through contribution, not compliance. Usage builds underground reputation while avoiding corporate surveillance.</p>
        </Card>
      </div>
    </div>
  );
}
