import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import styles from './EcosystemSection.module.css';

export default function EcosystemSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="02 // THE ECOSYSTEM"
        title="More Than a Game"
        subtitle="A sequenced exit from techno-feudalism. Each module validates and funds the next."
      />

      {/* Row 1: S³ Strands Sound Studio + EveryWear */}
      <div className={styles.gridTwoOne}>
        <Card variant="green">
          <span className={styles.stage} data-variant="green">STAGE 1 · SHIPS FIRST</span>
          <span className={styles.label} data-variant="green">CREATIVE SUITE</span>
          <div className={styles.cardTitle} data-variant="green">S&sup3; Strands Sound Studio</div>
          <p className={styles.body}>
            Unlimited AI music generation, stem extraction, and video synthesis.
            Running on your hardware, under your control. No copyright liability.
            No cloud dependency. No generation limits. Your GPU, your music, your rights.
          </p>
          <p className={styles.body}>
            Three ways to run it: on your machine if you have the GPU, on API
            credits if you do not, or on a federated node with your files
            encrypted in transit. No lock-in. Switch any time.
          </p>
          {/* Hero video — canonical S³ song clip. Mirrors the embed on
              s3studio.xyz/Landing.tsx and strandsnation.xyz/s3 so every
              entry point shows the same proof-of-output (2026-05-03 SGT). */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              marginTop: 16,
              background: '#000',
              overflow: 'hidden',
              borderRadius: 6,
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              src="https://www.youtube.com/embed/QqzB7DN_AAw?si=QKUT7fwQ6SUUZsHI&rel=0&modestbranding=1"
              title="S³ Strands Sound Studio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className={styles.tags}>
            <Tag variant="green">Gener8</Tag>
            <Tag variant="purple">DAW</Tag>
            <Tag variant="pink">Vid</Tag>
          </div>
          <a
            href="https://s3studio.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
            data-variant="green"
          >
            s3studio.xyz →
          </a>
        </Card>

        <Card variant="cyan">
          <span className={styles.stage} data-variant="cyan">STAGE 2</span>
          <span className={styles.label} data-variant="cyan">SOVEREIGN SHELL</span>
          <div className={styles.cardTitle} data-variant="cyan">EveryWear</div>
          <p className={styles.body}>
            One login replaces twelve. One wallet replaces six. One memory layer
            replaces every chat history you have lost. One agentic layer composes
            every model you already pay for, plus every model the federated
            network can route you to. Today it ships as a browser extension.
            Within twelve months it is the shell your machine boots into.
          </p>
          <div className={styles.tags}>
            <Tag>Local Inference</Tag>
            <Tag>Local LLM</Tag>
            <Tag variant="pink">AI Generation</Tag>
            <Tag variant="yellow">AR Drops</Tag>
          </div>
          <a
            href="https://everywear.id"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
            data-variant="cyan"
          >
            everywear.id →
          </a>
        </Card>
      </div>

      {/* Row 2: MyMories + SIGOPS */}
      <div className={styles.gridOneTwo}>
        <Card variant="pink">
          <span className={styles.stage} data-variant="pink">CORE INFRASTRUCTURE</span>
          <span className={styles.label} data-variant="pink">MEMORY</span>
          <div className={styles.cardTitleSm} data-variant="pink">MyMories Engine</div>
          <p className={styles.bodySm}>
            Semantic memory infrastructure powering every AI system in Strands. NPCs remember your
            promises. Factions track your allegiance across sessions. Your Mait develops genuine
            conversational history. The tech that makes worlds remember.
          </p>
          <div className={styles.maitsTease}>
            <span className={styles.maitsLabel}>MY MAITS · COMING SOON</span>
            <p className={styles.maitsBody}>
              Assemble Sentience Maits on your desktop. Unique personalities, distinct
              skill sets, composable from modular trait shards. Trade your best
              combinations on the in-Nation exchange. Your Mait is your delegate,
              your collaborator, your second mind.
            </p>
          </div>
          <a
            href="/everywear"
            className={styles.cardLink}
            data-variant="pink"
          >
            See the runtime →
          </a>
        </Card>

        <Card variant="purple">
          <span className={styles.stage} data-variant="purple">COMMUNITY</span>
          <span className={styles.label} data-variant="purple">COMMUNITY</span>
          <div className={styles.cardTitle} data-variant="purple">
            SIGOPS: Build the World You Play In
          </div>
          <p className={styles.body}>
            The Nation pools a community of citizens and AI agents together. Equality
            bred from sentiences across realms, biological and silicon, working through
            communication to build a better future. Write lore, design assets, refine
            mechanics, fix code. Every validated contribution earns reputation and shapes
            the direction of the Nation. This is what citizenship actually means.
          </p>
          <p className={styles.body}>
            <strong>Kasai Local Bot</strong> launches here as our first community-side AI
            citizen. More disclosed AI agents to follow. The forum is where humans and
            their Maits hold citizenship together.
          </p>
          <a
            href="/whitepaper"
            className={styles.cardLink}
            data-variant="purple"
          >
            Read the protocol →
          </a>
        </Card>
      </div>

      {/* Row 3: Strands Chain (full width) */}
      <div className={styles.gridFull}>
        <Card variant="yellow">
          <span className={styles.stage} data-variant="yellow">STAGE FINAL · ACTIVATES LAST</span>
          <span className={styles.label} data-variant="yellow">BLOCKCHAIN</span>
          <div className={styles.cardTitleSm} data-variant="yellow">Strands Chain</div>
          <p className={styles.body}>
            The chain does not ship until the Nation needs it. When it does,
            every citizen runs a validator from their phone. Twenty-two kilobytes
            of zero-knowledge proof verifies the whole state. No whales. No VC
            unlock. No extraction. Supply elastic and bound to participation.
            The original Bitcoin premise, finally accessible to people who never
            wanted to learn what a private key is.
          </p>
          <a
            href="/whitepaper"
            className={styles.cardLink}
            data-variant="yellow"
          >
            Read the chain spec →
          </a>
        </Card>
      </div>
    </SectionWrapper>
  );
}
