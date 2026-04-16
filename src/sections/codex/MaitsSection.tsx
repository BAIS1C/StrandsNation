import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import Callout from '@/components/Callout/Callout';
import Mini from '@/components/Mini/Mini';
import styles from './codex-shared.module.css';

export default function MaitsSection() {
  return (
    <div>
      <SectionLabel
        num="07 // COMPANIONS"
        title="My Maits"
        subtitle="Adaptive companion agents. Composable from modular Trait Shards. Acquire them, tailor them, evolve them."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">What Is a Mait?</div>
        <p className={styles.body}>
          Maits are adaptive companion agents built from composable Trait Shards. Players can acquire Maits
          and tailor them to their precise requirements: healing, combat medics, tank support, recon
          specialists, infiltration advisors, and more. Who guides you through onboarding is part of the
          narrative discovery.
        </p>
        <div className={styles.tags}>
          <Tag>Composable</Tag>
          <Tag variant="pink">Tradeable Shards</Tag>
          <Tag variant="yellow">Evolving</Tag>
        </div>
      </Card>
      <Card variant="pink">
        <div className={styles.cardTitleMd} data-variant="pink">Trait Shards</div>
        <p className={styles.body} style={{ marginBottom: 16 }}>
          Every Mait is assembled from modular Trait Shards across four categories. Each shard is
          independently tradeable and evolves through use across five mastery levels: Basic, Proficient,
          Expert, Master, and Legendary.
        </p>
        <div className={styles.gridTwo}>
          <Mini variant="cyan" title="Personality" body="16 archetypes shaping conversational style, decision-making, and loyalty patterns." />
          <Mini variant="pink" title="Skills" body="Financial analysis, creativity, planning, combat tactics, medical support, and more." />
          <Mini variant="yellow" title="Knowledge" body="Domain expertise shards. Loadable, stackable, and field-specific." />
          <Mini variant="purple" title="Aesthetic" body="Unlimited visual customisation. How your Mait looks, moves, and presents itself." />
        </div>
      </Card>
      <Card variant="yellow">
        <div className={styles.cardTitleMd} data-variant="yellow">MyMories</div>
        <p className={styles.body}>
          MyMories is the semantic memory vault powering every persistent interaction in Strands.
          Your conversations, promises, allegiance shifts, and decisions are indexed and retrievable. NPCs
          remember what you said three sessions ago. Your Mait develops genuine conversational history.
          Factions track your allegiance over time and react accordingly.
        </p>
      </Card>
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">MyMories Chrome Extension</div>
        <p className={styles.body}>
          Start building your personal memory graph outside the game. The MyMories Chrome Extension
          captures and indexes your AI chat context across ChatGPT, Claude, and more. Sovereign,
          portable, yours.
        </p>
        <p className={styles.body}>
          <a
            href="https://github.com/BAIS1C/MyMories-ChromeExtension.git"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--c-accent)' }}
          >
            Download from GitHub
          </a>
        </p>
        <p className={styles.body} style={{ fontSize: '0.85rem', opacity: 0.8 }}>
          <strong>Manual Installation (Developer Mode):</strong><br />
          1. Download or pull the latest code.<br />
          2. Open Chrome and navigate to chrome://extensions/<br />
          3. Enable &ldquo;Developer mode&rdquo; in the top right.<br />
          4. If updating: click &ldquo;Remove&rdquo; on the old version of MyMories.<br />
          5. Click &ldquo;Load unpacked&rdquo; and select the extension folder.<br />
          6. Refresh your AI chat tabs (ChatGPT, Claude, etc.) for the new script to load.
        </p>
      </Card>
      <Callout
        variant="yellow"
        label="GENERATIVE DIALOGUE"
        text="Dialogue is generative, not branching trees. The world adapts to how you think, without you ever filling out a questionnaire."
      />
    </div>
  );
}
