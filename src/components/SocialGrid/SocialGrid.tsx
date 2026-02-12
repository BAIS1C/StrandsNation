import type { SocialsMap } from '@/types/design';
import Card from '@/components/Card/Card';
import styles from './SocialGrid.module.css';

interface SocialGridProps {
  socials: SocialsMap;
}

export default function SocialGrid({ socials }: SocialGridProps) {
  return (
    <div className={styles.grid}>
      {Object.values(socials).map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <Card variant="glass" compact>
            <div className={styles.icon} data-variant={social.colorKey}>
              {social.icon}
            </div>
            <div className={styles.label} data-variant={social.colorKey}>
              {social.label}
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
