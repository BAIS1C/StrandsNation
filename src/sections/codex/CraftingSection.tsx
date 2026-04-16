import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import styles from './codex-shared.module.css';

export default function CraftingSection() {
  return (
    <div>
      <SectionLabel
        num="13 // CRAFTING"
        title="Crafting and Loot"
        subtitle="Crafting burns compute. Every item is a resource allocation decision."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">Holovector Blueprints and 2D Fab</div>
        <p className={styles.body}>
          Most items exist as digital blueprints. Fabrication happens through two channels: corporate
          networks (surveilled, expensive) or Layer U (anonymous, higher risk). All combat gear
          fabricates unbound. Your choice of channel shapes your risk profile.
        </p>
      </Card>
      <div className={styles.gridTwo}>
        <Card variant="pink">
          <Mini variant="pink" title="Skill Tapes" body="Recorded ability sequences captured during gameplay. Slot them to replay learned techniques, trade them on the market, or burn them for Sync fragments. Rare tapes from high-tier operations command premium value." />
        </Card>
        <Card variant="purple">
          <Mini variant="purple" title="ROM Packs" body="Pre-configured shard data bundles: packaged loadouts for specific roles, missions, or combat scenarios. Assemble your own or acquire proven configurations from veteran players." />
        </Card>
      </div>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Binding and Degradation</div>
        <p className={styles.body}>
          Combat gear is always unbound: fully tradeable, fully lootable, always at risk.
          Only cosmetics can be bound to protect your identity.
          All items degrade through use. Repair reduces maximum integrity permanently.
          Terminal decay hits a floor, then it becomes salvage parts.
        </p>
      </Card>
      <Callout
        variant="red"
        label="DEATH = REAL LOSS"
        text="Your gear is on your body. Your body is on the ground. Everything you carried is lootable. Diversify stash locations, insure what matters, or accept the risk."
      />
    </div>
  );
}
