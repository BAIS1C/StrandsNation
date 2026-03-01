'use client';

import { useEffect, useRef, useState } from 'react';
import {
  isTelegramMiniApp,
  hapticLight,
  hapticSuccess,
  showBackButton,
  hideBackButton,
} from '@/lib/telegram';
import styles from './GameDesktop.module.css';

// ═══ GAME AUDIO CONFIG ═══
// Pick 1-2 ambient tracks from the existing playlist.
// These autoplay on game entry, loop, no visible controls.
const GAME_TRACKS = [
  '/audio/soundtrack/Strands%20Bed%20So%20Much%20tension.mp3',
  '/audio/soundtrack/Strands%20Bed%20Orbit%20foreshadowing%20(Remix).mp3',
];

interface GameDesktopProps {
  mode: 'browser' | 'miniapp';
}

export default function GameDesktop({ mode }: GameDesktopProps) {
  const inTG = mode === 'miniapp' || isTelegramMiniApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sitePlayerRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const trackIndex = useRef(0);

  // ═══ AUDIO: pause site player, start game audio ═══
  useEffect(() => {
    // Find and pause the site's media player
    const sitePlayers = document.querySelectorAll('audio');
    sitePlayers.forEach((player) => {
      if (!player.paused) {
        sitePlayerRef.current = player;
        player.pause();
      }
    });

    // Create game audio
    const audio = new Audio(GAME_TRACKS[0]);
    audio.loop = false; // we handle track switching
    audio.volume = 0.25;
    audioRef.current = audio;

    // When track ends, play next (or loop back)
    audio.addEventListener('ended', () => {
      trackIndex.current = (trackIndex.current + 1) % GAME_TRACKS.length;
      audio.src = GAME_TRACKS[trackIndex.current];
      audio.play().catch(() => {});
    });

    // Autoplay (will be blocked until user interacts)
    audio.play().then(() => setAudioReady(true)).catch(() => {
      // Autoplay blocked — start on first click anywhere
      const startOnClick = () => {
        audio.play().then(() => setAudioReady(true)).catch(() => {});
        document.removeEventListener('click', startOnClick);
      };
      document.addEventListener('click', startOnClick);
    });

    return () => {
      // Cleanup: stop game audio, resume site player
      audio.pause();
      audio.src = '';
      if (sitePlayerRef.current) {
        sitePlayerRef.current.play().catch(() => {});
      }
    };
  }, []);

  // ═══ MUTE TOGGLE (M key) ═══
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        setMuted(prev => {
          const next = !prev;
          if (audioRef.current) audioRef.current.muted = next;
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ═══ TG BACK BUTTON ═══
  useEffect(() => {
    if (!inTG) return;
    return () => hideBackButton();
  }, [inTG]);

  return (
    <div className={styles.desktop}>
      {/* 
        ═══════════════════════════════════════════════
        INTEGRATION POINT
        
        Move the entire body of src/app/sync/page.tsx here.
        The existing 820-line desktop with:
        - Boot sequence (already handled by AuthGate)
        - Chat window + quiz scenes
        - Document viewer
        - Code puzzle
        - Pattern match game
        
        Plus add the new icons:
        - 🎮 2042 (iframe /games/2042.html)
        - 🔗 CIRCUIT SYNC (iframe /games/circuit-sync.html)
        - 📺 PROPER GANDER (fragment player)
        - 📂 MYMORIES (shard viewer)
        
        Wire these at key moments:
        - hapticLight() on choice selection
        - hapticSuccess() on puzzle solved
        - setQuizProgress(scene) after each scene
        - completeQuiz(profile, nkq, choices) at reveal
        - setArcadeScore(score) from 2042 iframe postMessage
        ═══════════════════════════════════════════════
      */}

      <div className={styles.workspace}>
        {/* Status bar */}
        <div className={styles.statusBar}>
          <span className={styles.statusSignal}>
            ● SIGNAL ACTIVE
          </span>
          <span className={styles.statusMode}>
            {inTG ? 'TG' : 'BROWSER'} MODE
          </span>
          <span className={styles.statusAudio} onClick={() => {
            setMuted(prev => {
              const next = !prev;
              if (audioRef.current) audioRef.current.muted = next;
              return next;
            });
          }}>
            {muted ? '🔇' : '🔊'}
          </span>
          <span className={styles.statusClock}>
            {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Desktop icon grid — placeholder until /sync integration */}
        <div className={styles.iconGrid}>
          <button className={styles.icon}>
            <span className={styles.iconGlyph}>💬</span>
            <span className={styles.iconLabel}>Messages</span>
            <span className={styles.iconDot} />
          </button>
          <button className={`${styles.icon} ${styles.iconLocked}`}>
            <span className={styles.iconGlyph}>📄</span>
            <span className={styles.iconLabel}>Document</span>
          </button>
          <button className={`${styles.icon} ${styles.iconLocked}`}>
            <span className={styles.iconGlyph}>🎮</span>
            <span className={styles.iconLabel}>2042</span>
          </button>
          <button className={`${styles.icon} ${styles.iconLocked}`}>
            <span className={styles.iconGlyph}>🔗</span>
            <span className={styles.iconLabel}>Circuit Sync</span>
          </button>
          <button className={`${styles.icon} ${styles.iconLocked}`}>
            <span className={styles.iconGlyph}>📺</span>
            <span className={styles.iconLabel}>Proper Gander</span>
          </button>
          <button className={styles.icon}>
            <span className={styles.iconGlyph}>📂</span>
            <span className={styles.iconLabel}>Mymories</span>
          </button>
        </div>

        {/* Placeholder message */}
        <div className={styles.placeholder}>
          <p>Desktop shell active. Tap Messages to begin.</p>
          <p className={styles.placeholderSub}>
            Integration: move /sync page.tsx desktop body here
          </p>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <span className={styles.taskbarSignal}>📡 {inTG ? 'TG' : 'WEB'}</span>
        <span className={styles.taskbarClock}>
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
