import type { TimelineEntry } from '@/types/data';
import styles from './Timeline.module.css';

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      <div className={styles.line} />
      {entries.map((entry, i) => (
        <div key={i} className={styles.entry}>
          <div
            className={`${styles.dot} ${entry.active ? styles.dotActive : ''}`}
            data-variant={entry.colorKey}
          />
          <span className={styles.year} data-variant={entry.colorKey}>
            {entry.year}{entry.subtitle ? ` — ${entry.subtitle}` : ''}
          </span>
          <div className={styles.title}>{entry.title}</div>
          <p className={styles.description}>{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
