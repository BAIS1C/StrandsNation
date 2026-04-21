'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function GameComingSoon() {
  const [visible, setVisible] = useState(true);

  // CRT cursor blink
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.screen}>
      {/* Scanline overlay */}
      <div className={styles.scanlines} />

      {/* CRT vignette */}
      <div className={styles.vignette} />

      {/* Content */}
      <div className={styles.terminal}>
        <p className={styles.systemLine}>
          <span className={styles.prompt}>&gt;</span> STRANDS_GAME.exe
        </p>

        <h1 className={styles.title}>
          COMING SOON
        </h1>

        <p className={styles.quarter}>Q3 2026</p>

        <div className={styles.statusBlock}>
          <p className={styles.statusLine}>
            <span className={styles.label}>STATUS</span>
            <span className={styles.dot}> .............. </span>
            <span className={styles.val}>IN DEVELOPMENT</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>PLATFORM</span>
            <span className={styles.dot}> ............ </span>
            <span className={styles.val}>TELEGRAM MINI APP</span>
          </p>
          <p className={styles.statusLine}>
            <span className={styles.label}>NETWORK</span>
            <span className={styles.dot}> ............. </span>
            <span className={styles.val}>TON BLOCKCHAIN</span>
          </p>
        </div>

        <p className={styles.cursor}>
          <span className={styles.prompt}>&gt;</span>{' '}
          <span style={{ opacity: visible ? 1 : 0 }}>█</span>
        </p>
      </div>
    </div>
  );
}
