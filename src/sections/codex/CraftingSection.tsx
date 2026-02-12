import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Callout from '@/components/Callout/Callout';
import styles from './codex-shared.module.css';

export default function CraftingSection() {
  return (
    <div>
      <SectionLabel
        num="10 // CRAFTING"
        title="Crafting & Loot"
        subtitle="Crafting burns compute. Every item is a resource allocation decision."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">Holovector Blueprints &amp; 3DFab</div>
        <p className={styles.body}>
          Most items exist as digital blueprints. Fabrication through 3DFab networks — corporate
          (tracked, bound) or Layer U (expensive, unbound).
        </p>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Item Binding &amp; Degradation</div>
        <p className={styles.body}>
          Bound items: full functionality, untradeable. Unbound: reduced stats, freely traded.
          All items degrade. Repair follows diminishing returns.
        </p>
      </Card>
      <Callout
        variant="red"
        label="DEATH ≠ ITEM LOSS"
        text="Death means losing access — territorial rights, storage reputation, insurance fees. Diversify stash locations or pay the price."
      />
    </div>
  );
}
