import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Callout from '@/components/Callout/Callout';
import styles from './page.module.css';

export default function NetworkPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 'var(--space-nav-h)' }}>
      <SectionWrapper>
        <SectionLabel
          num="THE ECOSYSTEM"
          title="More Than a Game"
          subtitle="A post-capitalist game engine for a post-capitalist world."
        />

        <Card variant="purple">
          <span className={styles.label} data-variant="purple">COMMUNITY</span>
          <div className={styles.cardTitleLg} data-variant="purple">SIGOPS</div>
          <p className={styles.body}>
            The community architects Strands. Validated contributions earn reputation and shape
            the game&rsquo;s direction. This is what Ready Player YOU actually means.
          </p>
        </Card>

        <Card variant="pink">
          <span className={styles.label} data-variant="pink">MEMORY</span>
          <div className={styles.cardTitleLg} data-variant="pink">MyMories Engine</div>
          <p className={styles.body}>
            Semantic memory powering every AI system. NPCs remember promises. Factions track
            allegiance. Your Mait develops real conversational history.
          </p>
          <Callout
            variant="pink"
            label="DECENTRALISED PROOF OF VALUABLE MEMORY"
            text="Memory shards with cryptographic provenance. Portable. Tradeable. Governable. Memory is the runtime of sovereign AI."
          />
        </Card>

        <Card variant="cyan">
          <span className={styles.label} data-variant="cyan">BROWSER</span>
          <div className={styles.cardTitleLg} data-variant="cyan">EveryWear</div>
          <p className={styles.body}>
            Privacy-first browser. Zero Google dependencies. Local AI, local LLM. Gateway to
            Layer U&rsquo;s underground marketplace and real-world AR drops.
          </p>
        </Card>

        <Card variant="yellow">
          <span className={styles.label} data-variant="yellow">BLOCKCHAIN</span>
          <div className={styles.cardTitleLg} data-variant="yellow">Strands Chain</div>
          <p className={styles.body}>
            We use the power of decentralised ledgers to keep the game running smoothly. You
            don&rsquo;t need a wallet or keys or anything technical — just your phone. Your
            in-app wallet keeps your things yours. Ownership without friction. Infrastructure
            you never see.
          </p>
        </Card>
      </SectionWrapper>
    </div>
  );
}
