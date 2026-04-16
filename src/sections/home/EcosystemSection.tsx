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

      {/* Row 1: EveryWear Desktop OS + S³ Strands Sound Studio */}
      <div className={styles.gridTwoOne}>
        <Card variant="cyan">
          <span className={styles.label} data-variant="cyan">DESKTOP OS</span>
          <div className={styles.cardTitle} data-variant="cyan">EveryWear</div>
          <p className={styles.body}>
            Privacy-first desktop OS shell. Zero Google dependencies. Local AI, local inference,
            agentic control. Your digital sovereignty layer. The gateway to Layer U&rsquo;s
            underground marketplace, where resistance gear arrives via real-world AR drops.
          </p>
          <div className={styles.tags}>
            <Tag>Local Inference</Tag>
            <Tag>Local LLM</Tag>
            <Tag variant="pink">AI Generation</Tag>
            <Tag variant="yellow">AR Drops</Tag>
          </div>
        </Card>

        <Card variant="green">
          <span className={styles.label} data-variant="green">CREATIVE SUITE</span>
          <div className={styles.cardTitle} data-variant="green">S&sup3; Strands Sound Studio</div>
          <p className={styles.bodySm}>
            Unlimited AI music generation, stem extraction, and video synthesis.
            Running on your hardware, under your control. No copyright liability.
            No cloud dependency. No generation limits. Your GPU, your music, your rights.
          </p>
          <div className={styles.tags}>
            <Tag variant="green">Gener8</Tag>
            <Tag variant="purple">DAW</Tag>
            <Tag variant="pink">Vid</Tag>
          </div>
        </Card>
      </div>

      {/* Row 2: MyMories + SIGOPS */}
      <div className={styles.gridOneTwo}>
        <Card variant="pink">
          <span className={styles.label} data-variant="pink">MEMORY</span>
          <div className={styles.cardTitleSm} data-variant="pink">MyMories Engine</div>
          <p className={styles.bodySm}>
            Semantic memory infrastructure powering every AI system in Strands. NPCs remember your
            promises. Factions track your allegiance across sessions. Your Mait develops genuine
            conversational history. The tech that makes worlds remember.
          </p>
        </Card>

        <Card variant="purple">
          <span className={styles.label} data-variant="purple">COMMUNITY</span>
          <div className={styles.cardTitle} data-variant="purple">
            SIGOPS: Build the World You Play In
          </div>
          <p className={styles.body}>
            The community architects Strands. Write lore, design assets, refine mechanics, fix code.
            Every validated contribution earns reputation and shapes the game&rsquo;s direction. This is what Ready Player YOU actually means.
          </p>
        </Card>
      </div>

      {/* Row 3: Strands Chain (full width) */}
      <div className={styles.gridFull}>
        <Card variant="yellow">
          <span className={styles.label} data-variant="yellow">BLOCKCHAIN</span>
          <div className={styles.cardTitleSm} data-variant="yellow">Strands Chain</div>
          <p className={styles.bodySm}>
            Decentralised ledgers keeping the game running smoothly. No wallet setup, no keys,
            no friction. Your phone and your in-app wallet keep your things yours.
          </p>
        </Card>
      </div>
    </SectionWrapper>
  );
}
