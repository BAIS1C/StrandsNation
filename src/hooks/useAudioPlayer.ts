'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playlist as generated } from '@/constants/playlist'; // adjust path if yours differs

type GenTrack = { src?: string; ttl?: string; artst?: string; title?: string; artist?: string; file?: string };
export type Track = { file: string; title: string; artist: string; duration?: string };

const normalize = (t: GenTrack): Track => {
  const file = t.file ?? t.src ?? '';
  const title = t.title ?? t.ttl ?? 'Unknown Track';
  const artist = t.artist ?? t.artst ?? '';
  return { file, title, artist };
};

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = useMemo<Track[]>(() => {
    if (!Array.isArray(generated)) return [];
    return generated.map(normalize).filter(t => !!t.file);
  }, []);

  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const track = tracks[trackIdx];

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      a.play().catch(() => {});
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  const skip = useCallback((dir: 1 | -1) => {
    setTrackIdx(prev => {
      const next = prev + dir;
      if (next < 0) return tracks.length - 1;
      if (next >= tracks.length) return 0;
      return next;
    });
  }, [tracks.length]);

  const selectTrack = useCallback((idx: number) => {
    setTrackIdx(idx);
    setExpanded(false);
  }, []);

  const seekToPct = useCallback((pct: number) => {
    const a = audioRef.current;
    if (!a || !durationSec) return;
    const t = Math.max(0, Math.min(1, pct)) * durationSec;
    a.currentTime = t;
    setProgress(t);
  }, [durationSec]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  // Load new track, preserve your original behavior, only autoplay if already playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !track) return;

    setProgress(0);
    setDurationSec(0);

    a.load();

    if (playing) {
      a.play().catch(() => {});
    }
  }, [trackIdx]); // keep same dependency shape as your original logic

  // timeupdate, metadata, ended
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setProgress(a.currentTime || 0);
    const onMeta = () => setDurationSec(a.duration || 0);
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

  const toggleExpanded = useCallback(() => setExpanded(v => !v), []);
  const closeExpanded = useCallback(() => setExpanded(false), []);

  const toggleMute = useCallback(() => setMuted(m => !m), []);
  const setVolumePct = useCallback((pct: number) => {
    const v = Math.max(0, Math.min(1, pct));
    setVolume(v);
    if (v > 0) setMuted(false);
  }, []);

  return {
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
    muted: muted,
    toggleMute,
    setVolumePct,
  };
}
