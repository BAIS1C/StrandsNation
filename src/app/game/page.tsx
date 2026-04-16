'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const TARGET = new Date('2026-08-06T00:00:00+08:00').getTime(); // SGT — 120 days from 8 Apr 2026

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function GameComingSoon() {
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(getTimeLeft);

  // CRT cursor blink
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Countdown tick
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
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

        {/* ─── LED Countdown Display ─── */}
        <div className={styles.countdownFrame}>
          <div className={styles.countdownHeader}>
            ESTIMATED TIME TO LAUNCH
          </div>
          <div className={styles.countdownInner}>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>DAYS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>888</span>
                <span className={styles.countdownDigit}>{String(time.days).padStart(3, '0')}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>HOURS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.hours)}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>MINUTES</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.minutes)}</span>
              </div>
            </div>
            <span className={styles.countdownSep}>:</span>
            <div className={styles.countdownUnit}>
              <span className={styles.countdownLabel}>SECONDS</span>
              <div className={styles.digitPanel}>
                <span className={styles.digitGhost}>88</span>
                <span className={styles.countdownDigit}>{pad(time.seconds)}</span>
              </div>
            </div>
          </div>
          {/* Screw holes */}
          <div className={`${styles.screw} ${styles.screwTL}`} />
          <div className={`${styles.screw} ${styles.screwTR}`} />
          <div className={`${styles.screw} ${styles.screwBL}`} />
          <div className={`${styles.screw} ${styles.screwBR}`} />
        </div>

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
