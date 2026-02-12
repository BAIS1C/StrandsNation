import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Tag from '@/components/Tag/Tag';
import Callout from '@/components/Callout/Callout';
import styles from './codex-shared.module.css';

export default function MaitsSection() {
  return (
    <div>
      <SectionLabel
        num="07 // COMPANIONS"
        title="Maits & Persistent Memory"
        subtitle="Your AI companion — part advisor, part friend, part potential spy. Powered by persistent memory."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">What Is a Mait?</div>
        <p className={styles.body}>
          Every citizen is assigned a Mait (My AI Teammate) at birth. Corporate Maits report to
          SOVcorp by default. Mod through Layer U at risk of detection. During onboarding,
          you&rsquo;re guided by Kasai — created by BASIC, founder of the Strands undernet.
        </p>
        <div className={styles.tags}>
          <Tag>Personality-Driven</Tag>
          <Tag>Persistent Memory</Tag>
          <Tag variant="pink">Moddable</Tag>
          <Tag variant="yellow">Compute-Dependent</Tag>
        </div>
      </Card>
      <Callout
        variant="yellow"
        label="GENERATIVE DIALOGUE"
        text="Dialogue isn't branching trees — it's generative. The world adapts to how you think — without you ever filling out a questionnaire."
      />
    </div>
  );
}
