import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.creed}>
        WE ARE THE ANTI-CORP PLAYING AGAINST THE GAME FROM INSIDE THE CORPO GAME
      </span>
      <span className={styles.text}>
        © 2026 STRANDSNATION · SOMOKASANE · PT METAFINTEK
      </span>
    </footer>
  );
}
