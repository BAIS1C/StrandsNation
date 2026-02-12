import SectionWrapper from '@/sections/shared/SectionWrapper';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Tag from '@/components/Tag/Tag';
import Callout from '@/components/Callout/Callout';
import styles from './GameSection.module.css';

export default function GameSection() {
  return (
    <SectionWrapper bordered>
      <SectionLabel
        num="02 // THE EXPERIENCE"
        title="Strands: The Game"
        subtitle="A post-capitalist MMORPG where the world remembers your choices, NPCs adapt to how you think, and the community builds the civilisation they play in. This isn't a game you consume. It's a civilisation you shape."
      />

      {/* Row 1: Main pitch + Skin the World */}
      <div className={styles.gridTwoOne}>
        <Card variant="cyan">
          <div className={styles.cardTitle} data-variant="cyan">
            Your World. Your Rules. Your Playstyle.
          </div>
          <p className={styles.body}>
            Strands is tailored to you. Personality-driven profiling shapes every NPC interaction, every dialogue
            branch, every companion behaviour. Your AI Mait evolves based on your decisions. The narrative
            isn&rsquo;t scripted — it&rsquo;s generated around who you actually are. No two playthroughs can
            be the same, because no two players think the same way.
          </p>
          <div className={styles.tags}>
            <Tag>Persistent Memory</Tag>
            <Tag variant="pink">Generative Narrative</Tag>
            <Tag variant="yellow">AI Companions</Tag>
          </div>
        </Card>

        <Card variant="pink">
          <div className={styles.cardTitle} data-variant="pink">
            Skin the World™
          </div>
          <p className={styles.body}>
            Generate your own skins, characters, environments, and aesthetic layers using AI creation
            tools — then see them live in the shared MMO world. Your vision doesn&rsquo;t stay in your
            inventory. It becomes part of MetaXity1 for everyone.
          </p>
        </Card>
      </div>

      {/* Row 2: Three feature cards */}
      <div className={styles.gridThree}>
        <Card variant="purple">
          <div className={styles.cardTitleSm} data-variant="purple">Dual Economy</div>
          <p className={styles.bodySm}>
            Three primitives — Energy, Process Power, Storage — priced by two competing systems.
            Corporate credits for compliance. Underground tokens for resistance. Your Cover Identity
            forces you into both.
          </p>
        </Card>

        <Card variant="yellow">
          <div className={styles.cardTitleSm} data-variant="yellow">Pyramid Extraction</div>
          <p className={styles.bodySm}>
            Ascend MetaXity1&rsquo;s single pyramid arcology. Risk increases with altitude — so do
            rewards. Corporate security sweeps, faction warfare, elevator lockdowns, and dynamic events.
          </p>
        </Card>

        <Card variant="green">
          <div className={styles.cardTitleSm} data-variant="green">Built By Players</div>
          <p className={styles.bodySm}>
            SIGOPS missions are real development tasks disguised as resistance operations. Write
            dialogue. Design assets. Fix code. Earn reputation. The fourth wall isn&rsquo;t broken —
            it&rsquo;s dissolved.
          </p>
        </Card>
      </div>

      <Callout
        variant="cyan"
        label="EXPLORE THE FULL WORLD"
        text="MetaXity1, the factions, the skill systems, the seasonal narrative arcs — it's all documented in the Codex."
      />
    </SectionWrapper>
  );
}
