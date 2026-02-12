import type { TierEntry } from '@/types/data';
import { foundersPortraits } from '@/data/founders-portraits';
import Card from '@/components/Card/Card';
import styles from './TierGrid.module.css';

interface TierGridProps {
  tiers: TierEntry[];
  showPortraits?: boolean;
}

export default function TierGrid({ tiers, showPortraits = true }: TierGridProps) {
  // Flatten all portraits and limit to exactly 12
  const allPortraits = Object.entries(foundersPortraits)
    .flatMap(([, portraits]) => portraits)
    .slice(0, 12);

  return (
    <>
      {showPortraits && (
        <div className={styles.portraitGrid}>
          {allPortraits.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={`${p.tier} #${p.id}`}
              className={styles.portrait}
              loading="lazy"
            />
          ))}

          {/* Fill remaining cells to force exactly 2 rows × 6 columns */}
          {Array.from({ length: 12 - allPortraits.length }).map((_, i) => (
            <div key={`empty-${i}`} className={styles.emptyPortrait} />
          ))}
        </div>
      )}

      {/* Tier count cards */}
      <div className={styles.grid}>
        {tiers.map((tier) => (
          <Card key={tier.label} variant="glass" compact>
            <div className={styles.label} data-variant={tier.colorKey}>
              {tier.label}
            </div>
            <div className={styles.count}>{tier.count}</div>
          </Card>
        ))}
      </div>
    </>
  );
}