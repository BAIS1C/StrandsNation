import styles from './Marquee.module.css';

interface MarqueeItem {
  text: string;
  variant: string;
}

const items: MarqueeItem[] = [
  { text: 'POST-CAPITALIST MMORPG', variant: 'cyan' },
  { text: 'PERSISTENT MEMORY', variant: 'pink' },
  { text: 'PLAYER-BUILT WORLD', variant: 'yellow' },
  { text: 'PERSONALITY-DRIVEN NPCs', variant: 'purple' },
  { text: 'SKIN THE WORLD™', variant: 'green' },
  { text: 'DUAL ECONOMY', variant: 'cyan' },
  { text: 'COOPERATIVE DEVELOPMENT', variant: 'pink' },
  { text: 'READY PLAYER YOU', variant: 'yellow' },
];

function MarqueeStrip() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i}>
          <span className={styles.word} data-variant={item.variant}>{item.text}</span>
          <span className={styles.sep}>◆</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className={styles.track}>
      <div className={styles.scroll}>
        <span className={styles.strip}><MarqueeStrip /></span>
        <span className={styles.strip} aria-hidden="true"><MarqueeStrip /></span>
      </div>
    </div>
  );
}
