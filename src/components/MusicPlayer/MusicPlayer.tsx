'use client';

import React from 'react';
import styles from './MusicPlayer.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

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

    shuffle,
    toggleShuffle,
  } = useAudioPlayer();

  if (!track || tracks.length === 0) return null;

  const pct = durationSec ? (progress / durationSec) * 100 : 0;

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!durationSec) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekToPct(ratio);
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={track.file} type="audio/mpeg" />
      </audio>

      {/* Expanded track list — pops up from the nav */}
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

      {/* Compact inline player */}
      <div className={styles.player}>
        {/* Transport controls */}
        <button className={styles.btn} onClick={() => skip(-1)} aria-label="Previous track">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" transform="scale(-1,1) translate(-24,0)" /></svg>
        </button>
        <button className={styles.playBtn} onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <button className={styles.btn} onClick={() => skip(1)} aria-label="Next track">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm10 0h2V6h-2v12z" /></svg>
        </button>

        {/* Shuffle */}
        <button
          className={`${styles.btn} ${shuffle ? styles.btnActive : ''}`}
          onClick={toggleShuffle}
          aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
          title={shuffle ? 'Shuffle on' : 'Shuffle off'}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
        </button>

        {/* Track info — scrolling marquee */}
        <div className={styles.trackInfo} onClick={toggleExpanded} title="Open track list">
          <div className={styles.marqueeWrap}>
            <span className={styles.marquee}>
              {track.title}{track.artist ? ` / ${track.artist}` : ''}
            </span>
          </div>
          <div className={styles.miniProgress} onClick={(e) => { e.stopPropagation(); seek(e); }}>
            <div className={styles.miniProgressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Volume / mute */}
        <button
          className={styles.btn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : Math.round(volume * 100)}
          onChange={(e) => setVolumePct(Number(e.target.value) / 100)}
          aria-label="Volume"
          className={styles.volumeSlider}
        />

        <span className={styles.time}>{fmt(progress)}</span>
      </div>
    </>
  );
}
