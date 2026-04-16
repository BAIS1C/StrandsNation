import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import Callout from '@/components/Callout/Callout';
import { skillPaths } from '@/data/skills';
import styles from './codex-shared.module.css';

export default function SkillsSection() {
  return (
    <div>
      <SectionLabel
        num="06 // PATHS"
        title="Operator Paths and the Desktop"
        subtitle="Operator, Weaver, and Cover Identity progress concurrently. Think of Sync as XP in other games, but much more meaningful. Every allocation is an opportunity cost."
      />
      <Card variant="cyan">
        <div className={styles.cardTitleMd} data-variant="cyan">The Strands Desktop</div>
        <p className={styles.body} style={{ marginBottom: 16 }}>
          The Desktop is your primary game interface. It operates in two phases.
        </p>
        <div className={styles.gridTwo}>
          <Mini variant="cyan" title="Phase A: Guided Narrative" body="A structured desktop OS where core systems, currency mechanics, and the world introduce themselves through guided play. You learn by doing, within the fiction." />
          <Mini variant="pink" title="Phase B: Open Desktop" body="Full personalised desktop. Open navigation, unrestricted SIGOPS access, and the freedom to shape your experience. The training wheels come off." />
        </div>
      </Card>
      {skillPaths.map((path) => (
        <Card key={path.title} variant={path.colorKey}>
          <div className={styles.cardTitleMd} data-variant={path.colorKey}>{path.title}</div>
          {path.description && (
            <p className={styles.body} style={{ marginBottom: 16 }}>{path.description}</p>
          )}
          <div className={path.columns === 3 ? styles.gridThree : styles.gridTwo} style={{ marginTop: 12 }}>
            {path.skills.map((skill) => (
              <Mini key={skill.title} variant={skill.colorKey} title={skill.title} body={skill.body} />
            ))}
          </div>
        </Card>
      ))}
      <Callout
        variant="yellow"
        label="OPPORTUNITY COST"
        text="Three paths. You cannot max everything. Specialise, generalise, or find the edge cases that give you leverage. Every build tells a story about priorities."
      />
    </div>
  );
}
