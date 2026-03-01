'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  isTelegramMiniApp,
  initMiniApp,
  validateAuth,
  getTGUser,
  hapticLight,
  hapticMedium,
  hapticSuccess,
  hapticSelect,
  showBackButton,
  hideBackButton,
  type TGUser,
} from '@/lib/telegram';
import {
  loadState,
  getState,
  getIconStates,
  setAuthed,
  setConsent,
  setQuizProgress,
  completeQuiz,
  setArcadeScore,
  setCircuitSyncTier,
  unlockFragment,
  addMymory,
  type PlayerState,
  type IconState,
} from '@/lib/playerState';
import styles from './page.module.css';

/* ═══════════════════════════════════════════════════════
   STRANDS MINI APP — /app
   
   Telegram Mini App entry point.
   Same desktop metaphor as /sync but with:
   - Auto-auth via TG initData (no login widget)
   - CloudStorage persistence (no cookies)
   - All games embedded (2042, Circuit Sync, Proper Gander)
   - Mymories data vault
   - TG native: haptics, back button, main button, theme
   ═══════════════════════════════════════════════════════ */

type ActiveWindow = null | 'chat' | 'voice' | 'document' | 'arcade' | 'circuit' | 'gander' | 'mymories';

export default function MiniAppPage() {
  // Core state
  const [loading, setLoading] = useState(true);
  const [bootPhase, setBootPhase] = useState(0); // 0-4 boot lines
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [icons, setIcons] = useState<Record<string, IconState>>({});
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);
  const [isTG, setIsTG] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ═══ BOOT SEQUENCE ═══
  useEffect(() => {
    async function boot() {
      // Phase 0: Detect environment
      const inTG = isTelegramMiniApp();
      setIsTG(inTG);

      // Phase 1: Init TG
      setBootPhase(1);
      let tgUser: TGUser | null = null;

      if (inTG) {
        tgUser = initMiniApp();
      }

      // Phase 2: Load persisted state
      setBootPhase(2);
      const state = await loadState();

      // Phase 3: Validate auth (if in TG and not already authed)
      setBootPhase(3);
      if (inTG && !state.authed && tgUser) {
        const authResult = await validateAuth();
        if (authResult) {
          await setAuthed(authResult.playerID, tgUser);
          state.authed = true;
          state.playerID = authResult.playerID;
          state.tgUser = tgUser;
        }
      } else if (inTG && state.authed && tgUser) {
        // Already authed — just set the user in state
        state.tgUser = tgUser;
      }

      if (!inTG) {
        // Browser fallback — mark as not in TG, show notice
        // Could add TG Login Widget here in future
      }

      // Phase 4: Ready
      setBootPhase(4);
      setPlayer(state);
      setIcons(getIconStates());

      setTimeout(() => setLoading(false), 800);
    }

    boot().catch(err => {
      console.error('Boot failed:', err);
      setError('Failed to initialize. Please try again.');
      setLoading(false);
    });
  }, []);

  // ═══ REFRESH ICONS when state changes ═══
  const refreshIcons = useCallback(() => {
    setIcons(getIconStates());
    setPlayer({ ...getState() });
  }, []);

  // ═══ WINDOW MANAGEMENT ═══
  const openWindow = useCallback((win: ActiveWindow) => {
    hapticLight();
    setActiveWindow(win);
    if (win) {
      showBackButton(() => {
        setActiveWindow(null);
        hideBackButton();
      });
    }
  }, []);

  const closeWindow = useCallback(() => {
    setActiveWindow(null);
    hideBackButton();
  }, []);

  // ═══ BOOT SCREEN ═══
  if (loading) {
    return (
      <div className={styles.bootScreen}>
        <div className={styles.bootText}>
          <div className={`${styles.bootLine} ${bootPhase >= 0 ? styles.bootVisible : ''}`}>
            Initializing signal relay...
          </div>
          <div className={`${styles.bootLine} ${bootPhase >= 1 ? styles.bootVisible : ''}`}>
            {isTG ? '// TELEGRAM CHANNEL DETECTED' : '// DIRECT SIGNAL — NO RELAY'}
          </div>
          <div className={`${styles.bootLine} ${bootPhase >= 2 ? styles.bootVisible : ''}`}>
            Loading Mymories...
          </div>
          <div className={`${styles.bootLine} ${bootPhase >= 3 ? styles.bootVisible : ''}`}>
            {isTG ? `Authenticating: ${getTGUser()?.first_name || 'unknown'}` : 'Auth: standalone mode'}
          </div>
          <div className={`${styles.bootLine} ${styles.bootAccent} ${bootPhase >= 4 ? styles.bootVisible : ''}`}>
            SIGNAL LOCKED — DESKTOP READY
          </div>
        </div>
        {error && <div className={styles.bootError}>{error}</div>}
      </div>
    );
  }

  // ═══ ICON DEFINITIONS ═══
  const desktopIcons = [
    // Auth is auto-complete in TG, so SIGNAL REG shows as done
    { id: 'signalReg',    emoji: '📡', label: 'SIGNAL REG',    window: null as ActiveWindow },
    { id: 'voiceSync',    emoji: '🎙',  label: 'VOICE SYNC',   window: 'voice' as ActiveWindow },
    { id: 'messages',     emoji: '💬', label: 'Messages',      window: 'chat' as ActiveWindow },
    { id: 'document',     emoji: '📄', label: 'Document',      window: null as ActiveWindow },
    { id: 'arcade2042',   emoji: '🎮', label: '2042',          window: 'arcade' as ActiveWindow },
    { id: 'circuitSync',  emoji: '🔗', label: 'CIRCUIT SYNC',  window: 'circuit' as ActiveWindow },
    { id: 'properGander', emoji: '📺', label: 'PROPER GANDER', window: 'gander' as ActiveWindow },
    { id: 'mymories',     emoji: '📂', label: 'MYMORIES',      window: 'mymories' as ActiveWindow },
  ];

  // ═══ DESKTOP ═══
  return (
    <div className={styles.desktop}>
      {/* Scanline overlay */}
      <div className={styles.scanlines} />

      {/* Status bar */}
      <div className={styles.statusBar}>
        <span className={styles.statusSignal}>
          {player?.authed ? '● SYNCED' : '○ NO SIGNAL'}
        </span>
        <span className={styles.statusUser}>
          {player?.tgUser?.first_name || 'UNKNOWN'}
        </span>
        <span className={styles.statusTime}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Desktop workspace */}
      <div className={styles.workspace}>
        {/* Icon grid */}
        {!activeWindow && (
          <div className={styles.iconGrid}>
            {desktopIcons.map(icon => {
              const state = icons[icon.id] || 'locked';
              const isLocked = state === 'locked';
              const isAvailable = state === 'available';
              const isComplete = state === 'complete';

              return (
                <button
                  key={icon.id}
                  className={`${styles.icon} ${isLocked ? styles.iconLocked : ''} ${isAvailable ? styles.iconPulse : ''} ${isComplete ? styles.iconComplete : ''}`}
                  onClick={() => {
                    if (isLocked) {
                      hapticSelect();
                      return;
                    }
                    if (icon.window) {
                      openWindow(icon.window);
                    } else {
                      hapticSelect();
                    }
                  }}
                  disabled={isLocked}
                >
                  <div className={styles.iconEmoji}>{icon.emoji}</div>
                  <span className={styles.iconLabel}>{icon.label}</span>
                  {isAvailable && <span className={styles.iconDot} />}
                  {isComplete && <span className={styles.iconCheck}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* ═══ WINDOWS ═══ */}

        {activeWindow === 'voice' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>VOICE SYNC</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              <VoiceConsent onComplete={(level) => {
                setConsent(level);
                refreshIcons();
                hapticSuccess();
                closeWindow();
              }} />
            </div>
          </div>
        )}

        {activeWindow === 'chat' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>Messages</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              {/* Quiz chat component goes here — import from existing /sync page */}
              <div className={styles.placeholder}>
                <p>Chat quiz system</p>
                <p className={styles.placeholderSub}>Import from existing /sync components</p>
              </div>
            </div>
          </div>
        )}

        {activeWindow === 'arcade' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>2042 // DATA RECOVERY</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              {/* 2042 arcade loads as iframe pointing to the standalone HTML */}
              <iframe
                src="/games/2042.html"
                className={styles.gameFrame}
                title="2042 Arcade"
                allow="autoplay"
              />
            </div>
          </div>
        )}

        {activeWindow === 'circuit' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>CIRCUIT SYNC</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              <iframe
                src="/games/circuit-sync.html"
                className={styles.gameFrame}
                title="Circuit Sync"
                allow="autoplay"
              />
            </div>
          </div>
        )}

        {activeWindow === 'gander' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>PROPER GANDER // BROADCAST</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              <FragmentPlayer
                unlockedFragments={player?.fragmentsUnlocked || [0]}
              />
            </div>
          </div>
        )}

        {activeWindow === 'mymories' && (
          <div className={styles.window}>
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>📂 MYMORIES</span>
              <button className={styles.windowClose} onClick={closeWindow}>×</button>
            </div>
            <div className={styles.windowBody}>
              <MymoryViewer mymories={player?.mymories || []} />
            </div>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        {activeWindow && (
          <button className={styles.taskbarItem} onClick={closeWindow}>
            ← Desktop
          </button>
        )}
        <span className={styles.taskbarSignal}>
          STRANDS v0.1 // {isTG ? 'TG' : 'WEB'} // {player?.mymories.length || 0} shards
        </span>
      </div>
    </div>
  );
}

// ═══ INLINE SUB-COMPONENTS ═══

/** Voice consent modal — 3 tiers + recording */
function VoiceConsent({ onComplete }: { onComplete: (level: 1 | 2 | 3) => void }) {
  const [phase, setPhase] = useState<'choose' | 'record' | 'done'>('choose');
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  const startRecording = async () => {
    setPhase('record');
    setRecording(true);

    // Timer display
    const interval = setInterval(() => setTimer(t => t + 1), 1000);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus' : 'audio/webm'
      });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        clearInterval(interval);
        const blob = new Blob(chunks, { type: 'audio/webm' });
        // Store locally in IndexedDB — NEVER upload
        try {
          const db = await openIndexedDB();
          const tx = db.transaction('voice', 'readwrite');
          tx.objectStore('voice').put(blob, 'consent-sample');
        } catch {}
        stream.getTracks().forEach(t => t.stop());
        setRecording(false);
        setPhase('done');
      };

      recorder.start();
      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 15000);
    } catch {
      clearInterval(interval);
      setRecording(false);
      // Mic denied → fall through to no-consent
      onComplete(3);
    }
  };

  return (
    <div className={styles.voiceConsent}>
      {phase === 'choose' && (
        <>
          <p className={styles.voiceTitle}>VOICE SYNC PROTOCOL</p>
          <p className={styles.voiceDesc}>
            Your voice may be used for game personalization.
            Audio is stored locally on your device only.
          </p>
          <div className={styles.voiceOptions}>
            <button className={styles.voiceBtn} onClick={() => startRecording()}>
              ✅ I consent to voice and likeness
            </button>
            <button className={styles.voiceBtnAlt} onClick={() => startRecording()}>
              🎤 Voice only
            </button>
            <button className={styles.voiceBtnDim} onClick={() => onComplete(3)}>
              ✕ No consent
            </button>
          </div>
        </>
      )}

      {phase === 'record' && (
        <div className={styles.voiceRecord}>
          <p className={styles.voiceTitle}>SPEAK THE PHRASE</p>
          <p className={styles.voicePhrase}>"I am my own key"</p>
          <div className={styles.voiceTimer}>
            {recording ? `Recording... ${timer}s` : 'Processing...'}
          </div>
          <div className={styles.voicePulse} />
        </div>
      )}

      {phase === 'done' && (
        <div className={styles.voiceDone}>
          <p className={styles.voiceTitle}>VOICE SYNC COMPLETE</p>
          <p className={styles.voiceDesc}>Your signal has been recorded locally.</p>
          <button className={styles.voiceBtn} onClick={() => onComplete(1)}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

/** Fragment player for Proper Gander episodes */
function FragmentPlayer({ unlockedFragments }: { unlockedFragments: number[] }) {
  const fragments = [
    { id: 0, title: 'THE CELEBRATION', duration: '2:30' },
    { id: 1, title: 'ON THIS DAY', duration: '1:45' },
    { id: 2, title: 'BLOCK GANG REPORT', duration: '2:10' },
    { id: 3, title: 'UPGRADE SEASON', duration: '1:55' },
    { id: 4, title: 'SIGNAL BREACH', duration: '3:20' },
    { id: 5, title: 'PARTIAL REVEAL', duration: '1:30' },
  ];

  return (
    <div className={styles.fragmentList}>
      <p className={styles.fragmentHeader}>PROPER GANDER // RECOVERED BROADCAST</p>
      {fragments.map(f => {
        const unlocked = unlockedFragments.includes(f.id);
        return (
          <div
            key={f.id}
            className={`${styles.fragmentItem} ${unlocked ? styles.fragmentUnlocked : styles.fragmentLocked}`}
          >
            <span className={styles.fragmentIdx}>
              {unlocked ? '▶' : '▓'}
            </span>
            <span className={styles.fragmentTitle}>
              {unlocked ? f.title : '██████████'}
            </span>
            <span className={styles.fragmentDuration}>
              {unlocked ? f.duration : '--:--'}
            </span>
          </div>
        );
      })}
      <p className={styles.fragmentNote}>
        Solve Circuit Sync puzzles to recover fragments
      </p>
    </div>
  );
}

/** Mymory viewer — shows accumulated memory shards */
function MymoryViewer({ mymories }: { mymories: Array<{ id: string; type: string; label: string; createdAt: string }> }) {
  if (mymories.length === 0) {
    return (
      <div className={styles.mymoryEmpty}>
        <p>No memory shards yet.</p>
        <p className={styles.mymoryEmptySub}>Complete onboarding to create your first shard.</p>
      </div>
    );
  }

  return (
    <div className={styles.mymoryList}>
      <p className={styles.mymoryHeader}>MEMORY SHARDS // {mymories.length} ENTRIES</p>
      {mymories.map(m => (
        <div key={m.id} className={styles.mymoryItem}>
          <span className={styles.mymoryIcon}>
            {m.type === 'profile' ? '🧬' : m.type === 'voice_consent' ? '🎙' : m.type === 'arcade_score' ? '🎮' : '◈'}
          </span>
          <div className={styles.mymoryInfo}>
            <span className={styles.mymoryLabel}>{m.label}</span>
            <span className={styles.mymoryDate}>
              {new Date(m.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══ INDEXED DB HELPER ═══

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('strands-voice', 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore('voice');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
