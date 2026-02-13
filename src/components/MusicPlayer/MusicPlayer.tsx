'use client';

import React from 'react';
import styles from './MusicPlayer.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

// Optional, if you want the global mute icon to appear without touching layout,
// render it from inside MusicPlayer. If your file path differs, adjust.
// import GlobalMuteToggle from '@/components/GlobalMuteToggle';

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const {
    audioRef,
    tracks,
    trackIdx,
    track,

    playing,
    toggle,

    skip,
    selectTrack,

    progress,
    durationSec,
    seekToPct,

    expanded,
    toggleExpanded,
    closeExpanded,

    volume,
    muted,
    toggleMute,
    setVolumePct,
  } = useAudioPlayer();

  if (!track || tracks.length === 0) return null;

  const pct = durationSec ? (progress / durationSec) * 100 : 0;

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!durationSec) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    seekToPct(pct);
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={track.file} type="audio/mpeg" />
      </audio>

      {/* If you want the global mute toggle visible without touching layout,
          uncomment the import above and render it here */}
      {/* <GlobalMuteToggle /> */}

      {expanded && (
        <div className={styles.trackList}>
          <div className={styles.trackListHeader}>
            <span className={styles.trackListTitle}>SOUNDTRACK</span>
            <button className={styles.closeBtn} onClick={closeExpanded}>✕</button>
          </div>

          <div className={styles.trackListScroll}>
            {tracks.map((t, i) => (
              <button
                key={`${t.file}-${i}`}
                className={`${styles.trackItem} ${i === trackIdx ? styles.trackItemActive : ''}`}
                onClick={() => selectTrack(i)}
              >
                <span className={styles.trackNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.trackName}>{t.title}</span>
                <span className={styles.trackDur}>{t.duration ?? '--:--'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.player}>
        <div className={styles.progressBar} onClick={seek}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>

        <div className={styles.controls}>
          <button className={styles.listBtn} onClick={toggleExpanded}>☰</button>
          <button className={styles.skipBtn} onClick={() => skip(-1)}>⏮</button>
          <button className={styles.playBtn} onClick={toggle}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={styles.skipBtn} onClick={() => skip(1)}>⏭</button>

          <div className={styles.info}>
            <span className={styles.title}>{track.title}</span>
            <span className={styles.artist}>{track.artist}</span>
          </div>

          {/* New, mute + volume, minimal impact on layout */}
          <button
            className={styles.skipBtn}
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? '🔇' : '🔊'}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : Math.round(volume * 100)}
            onChange={(e) => setVolumePct(Number(e.target.value) / 100)}
            aria-label="Volume"
            className={styles.volumeSlider ?? ''}
          />

          <span className={styles.time}>
            {fmt(progress)} / {fmt(durationSec || 0)}
          </span>
        </div>
      </div>
    </>
  );
}
