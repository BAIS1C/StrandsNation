import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import Tag from '@/components/Tag/Tag';
import styles from './codex-shared.module.css';

export default function EveryWearSection() {
  return (
    <div>
      <SectionLabel
        num="09 // INTERFACE"
        title="EveryWear"
        subtitle="The sovereign interface layer. Your persistent shell across every device, every platform, every phase of the Strands ecosystem."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">What Is EveryWear?</div>
        <p className={styles.body}>
          EveryWear is how you interact with the Strands ecosystem. Not a single app; a sovereign runtime that evolves across five phases, from a lightweight Telegram integration to a full agentic operating system spanning desktop, mobile, and XR.
        </p>
        <div className={styles.tags}>
          <Tag>Persistent</Tag>
          <Tag variant="pink">Cross-Platform</Tag>
          <Tag variant="yellow">Sovereign</Tag>
        </div>
      </Card>
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">The Five Phases</div>
        <div className={styles.gridTwo} style={{ marginTop: 12 }}>
          <Mini variant="cyan" title="Phase 1: Telegram Mini App" body="Frictionless distribution. Zero-friction onboarding. Integrated payment rails. The entry point." />
          <Mini variant="pink" title="Phase 2: Chromium Fork" body="Persistence via the MyMories vault. Blank Sync Ledger wallet integration. My Maits interface. A.R.E. hosting." />
          <Mini variant="yellow" title="Phase 3: WebGL Bridge" body="Richer rendering. Game launcher integration. The visual fidelity step between messaging and full client." />
          <Mini variant="purple" title="Phase 4: Bifurcation" body="Separate Unity and Unreal game clients launch. EveryWear remains the persistent shell connecting everything." />
        </div>
      </Card>
      <Card variant="purple">
        <div className={styles.cardTitleMd} data-variant="purple">Phase 5: Agentic OS</div>
        <p className={styles.body}>
          The final form. A sovereign runtime across XR, desktop, and mobile. Hosts your agents, your vault, your wallet, your validation nodes, and your spatial interactions. EveryWear becomes the operating system for your digital life within the Strands network.
        </p>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">XR Gameplay</div>
        <p className={styles.body}>
          Spatial computing integration is coming. EveryWear Phase 5 bridges the game world into physical space through volumetric overlays, spatial interaction layers, and XR-native interfaces. The pyramid extends beyond your screen.
        </p>
      </Card>
      <Callout
        variant="cyan"
        label="CHROME EXTENSION"
        text="Install the MyMories Chrome Extension to begin building your persistent memory graph. Your browsing context, your preferences, your decisions: indexed and sovereign."
      />
    </div>
  );
}
