import type { SocialsMap, EcosystemMap, PartnersMap } from '@/types/design';
import Card from '@/components/Card/Card';
import styles from './SocialGrid.module.css';

interface SocialGridProps {
  socials: SocialsMap | EcosystemMap | PartnersMap;
}

export default function SocialGrid({ socials }: SocialGridProps) {
  return (
    <div className={styles.grid}>
      {Object.values(socials).map((social) => (
        <a
          key={social.label + social.url}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <Card variant={social.colorKey} compact>
            <div className={styles.icon} data-variant={social.colorKey}>
              {social.icon}
            </div>
            <div className={styles.label} data-variant={social.colorKey}>
              {social.label}
            </div>
            {social.handle ? (
              <span className={styles.handle}>{social.handle}</span>
            ) : null}
          </Card>
        </a>
      ))}
    </div>
  );
}
