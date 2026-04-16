import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import Tag from '@/components/Tag/Tag';
import styles from './codex-shared.module.css';

export default function LayerUSection() {
  return (
    <div>
      <SectionLabel
        num="10 // ATTENTION"
        title="Layer U and the A.R.E."
        subtitle="The spatial attention economy. Advertising inverted. Revenue returned to the people who generate it."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">The Attention Redistribution Engine</div>
        <p className={styles.body}>
          The A.R.E. inverts the advertising model. Users opt in. Attention is measured transparently. Revenue splits 60/40: sixty percent to the user, forty percent to the ecosystem. No surveillance. No dark patterns. Consent is explicit, informed, granular, and revocable.
        </p>
        <div className={styles.tags}>
          <Tag>Opt-In</Tag>
          <Tag variant="pink">60/40 Split</Tag>
          <Tag variant="yellow">Transparent</Tag>
        </div>
      </Card>
      <Card variant="pink">
        <div className={styles.cardTitleMd} data-variant="pink">Watch to Earn</div>
        <p className={styles.body}>
          Attention has value. The A.R.E. measures it and pays you for it. Pre-chain, revenue settles in USDT/TON. Post-chain, it settles in $KREDS. This is not passive income from staking or speculation; it is compensation for a scarce cognitive resource you choose to allocate.
        </p>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">Signal Reclamation</div>
        <p className={styles.body}>
          In-game, Signal Reclamation trains you on the mechanics. Proper Gander broadcasts within MetaXity1 are the diegetic layer: corporate propaganda you can accept, reject, or subvert. Every interaction teaches consent-based attention economics before the real-world A.R.E. activates.
        </p>
      </Card>
      <Card variant="purple">
        <div className={styles.cardTitleMd} data-variant="purple">Volumetric Parcels</div>
        <p className={styles.body}>
          Layer U operates through investible SPVs per jurisdiction. Physical space is divided into volumetric parcels (10m&sup3; units) leased for XR advertising overlays. Pilot cities: Kuala Lumpur, Bangkok, Jakarta, Singapore. Each city activates independently through its own SPV.
        </p>
      </Card>
      <Callout
        variant="cyan"
        label="DIEGETIC FIRST"
        text="Every Layer U mechanic is proven inside the game before it touches the real world. The game validates the economics. The economics validates the infrastructure. Nothing launches on faith."
      />
    </div>
  );
}
