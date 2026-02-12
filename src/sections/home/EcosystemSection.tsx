import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import styles from './EcosystemSection.module.css';

export default function EcosystemSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="03 // THE ECOSYSTEM"
        title="More Than a Game"
        subtitle="Strands is the experience layer of a larger system. A post-capitalist game engine for a post-capitalist world."
      />

      {/* Row 1: EveryWear + MyMories */}
      <div className={styles.gridTwoOne}>
        <Card variant="cyan">
          <span className={styles.label} data-variant="cyan">BROWSER</span>
          <div className={styles.cardTitle} data-variant="cyan">EveryWear</div>
          <p className={styles.body}>
            Privacy-first browser. Zero Google dependencies. Local AI, local LLM, agentic control.
            Your digital sovereignty layer — and the gateway to Layer U&rsquo;s underground marketplace,
            where resistance gear arrives via real-world AR drops.
          </p>
          <div className={styles.tags}>
            <Tag>Ad Blocking</Tag>
            <Tag>Local LLM</Tag>
            <Tag variant="pink">AI Generation</Tag>
            <Tag variant="yellow">AR Drops</Tag>
          </div>
        </Card>

        <Card variant="pink">
          <span className={styles.label} data-variant="pink">MEMORY</span>
          <div className={styles.cardTitle} data-variant="pink">MyMories Engine</div>
          <p className={styles.bodySm}>
            Semantic memory infrastructure powering every AI system in Strands. NPCs remember your
            promises. Factions track your allegiance across sessions. Your Mait develops genuine
            conversational history. The tech that makes worlds remember.
          </p>
        </Card>
      </div>

      {/* Row 2: Strands Chain + SIGOPS */}
      <div className={styles.gridOneTwo}>
        <Card variant="yellow">
          <span className={styles.label} data-variant="yellow">BLOCKCHAIN</span>
          <div className={styles.cardTitleSm} data-variant="yellow">Strands Chain</div>
          <p className={styles.bodySm}>
            Decentralised ledgers keeping the game running smoothly. No wallet setup, no keys,
            no friction. Your phone and your in-app wallet keep your things yours.
          </p>
        </Card>

        <Card variant="purple">
          <span className={styles.label} data-variant="purple">COMMUNITY</span>
          <div className={styles.cardTitle} data-variant="purple">
            SIGOPS: Build the World You Play In
          </div>
          <p className={styles.body}>
            The community doesn&rsquo;t just play Strands — they architect it. Write lore, design
            assets, refine mechanics, fix code. Every validated contribution earns reputation, builds
            reputation, and shapes the game&rsquo;s direction. This is what Ready Player YOU actually means.
          </p>
        </Card>
      </div>
    </SectionWrapper>
  );
}
