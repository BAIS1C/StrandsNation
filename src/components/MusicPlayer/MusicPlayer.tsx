'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { soundtrack, type Track } from '@/data/soundtrack';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const track: Track = soundtrack[trackIdx];

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
    setPlaying(!playing);
  }, [playing]);

  const skip = useCallback((dir: 1 | -1) => {
    setTrackIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return soundtrack.length - 1;
      if (next >= soundtrack.length) return 0;
      return next;
    });
  }, []);

  const selectTrack = useCallback((idx: number) => {
    setTrackIdx(idx);
    setExpanded(false);
  }, []);

  // Auto-play on track change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) {
      a.play().catch(() => {});
    }
  }, [trackIdx]);

  // Progress updates
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => skip(1);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
    };
  }, [skip]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={track.file} type="audio/mpeg" />
      </audio>

      {/* Expanded track list */}
      {expanded && (
        <div className={styles.trackList}>
          <div className={styles.trackListHeader}>
            <span className={styles.trackListTitle}>SOUNDTRACK</span>
            <button className={styles.closeBtn} onClick={() => setExpanded(false)}>✕</button>
          </div>
          <div className={styles.trackListScroll}>
            {soundtrack.map((t, i) => (
              <button
                key={i}
                className={`${styles.trackItem} ${i === trackIdx ? styles.trackItemActive : ''}`}
                onClick={() => selectTrack(i)}
              >
                <span className={styles.trackNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.trackName}>{t.title}</span>
                <span className={styles.trackDur}>{t.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mini player bar */}
      <div className={styles.player}>
        <div className={styles.progressBar} onClick={seek}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>

        <div className={styles.controls}>
          <button className={styles.listBtn} onClick={() => setExpanded(!expanded)}>☰</button>
          <button className={styles.skipBtn} onClick={() => skip(-1)}>⏮</button>
          <button className={styles.playBtn} onClick={toggle}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={styles.skipBtn} onClick={() => skip(1)}>⏭</button>

          <div className={styles.info}>
            <span className={styles.title}>{track.title}</span>
            <span className={styles.artist}>{track.artist}</span>
          </div>

          <span className={styles.time}>
            {fmt(progress)} / {fmt(duration || 0)}
          </span>
        </div>
      </div>
    </>
  );
}
