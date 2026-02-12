import SectionLabel from '@/components/SectionLabel/SectionLabel';
import Card from '@/components/Card/Card';
import Mini from '@/components/Mini/Mini';
import { skillPaths } from '@/data/skills';
import styles from './codex-shared.module.css';

export default function SkillsSection() {
  return (
    <div>
      <SectionLabel
        num="06 // SKILLS"
        title="Tri-Path Skill System"
        subtitle="Operator, Weaver, and Cover Identity. Choices lock out other paths — real consequence and replayability."
      />
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
    </div>
  );
}
