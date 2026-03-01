'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  isTelegramMiniApp,
  initMiniApp,
  validateAuth,
  type TGUser,
} from '@/lib/telegram';
import { loadState, setAuthed } from '@/lib/playerState';
import styles from './AuthGate.module.css';

const TG_BOT_USERNAME = 'StrandsNation_bot';
const MINI_APP_URL = `https://t.me/${TG_BOT_USERNAME}/strands`;

interface AuthGateProps {
  onReady: () => void;
}

export default function AuthGate({ onReady }: AuthGateProps) {
  const [phase, setPhase] = useState<'detect' | 'entry' | 'choose' | 'booting'>('detect');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ═══ DETECT ENVIRONMENT ═══
  useEffect(() => {
    async function detect() {
      const inTG = isTelegramMiniApp();
      const state = await loadState();

      if (inTG) {
        // Mini App: use TG identity directly
        const tgUser = initMiniApp();
        if (tgUser) {
          if (!state.authed) {
            const auth = await validateAuth();
            if (auth) await setAuthed(auth.playerID, tgUser);
          }
          localStorage.setItem('strands_player_name', tgUser.first_name || 'Blank');
          localStorage.setItem('strands_player_tg', JSON.stringify(tgUser));
          runBootSequence(tgUser.first_name);
        } else {
          setPhase('entry');
        }
      } else {
        // Browser: check if returning player
        const savedName = localStorage.getItem('strands_player_name');
        if (savedName && state.authed) {
          runBootSequence(savedName);
        } else {
          setPhase('entry');
          setTimeout(() => inputRef.current?.focus(), 300);
        }
      }
    }
    detect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ═══ HANDLE NAME SUBMIT ═══
  const handleSubmit = useCallback(() => {
    const name = playerName.trim();
    if (name.length < 2) {
      setError('Handle must be at least 2 characters');
      return;
    }
    if (name.length > 20) {
      setError('Handle must be 20 characters or fewer');
      return;
    }
    if (!/^[a-zA-Z0-9_\-. ]+$/.test(name)) {
      setError('Letters, numbers, underscores, dashes only');
      return;
    }

    localStorage.setItem('strands_player_name', name);

    const pseudoID = `browser-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setAuthed(pseudoID, {
      id: 0,
      first_name: name,
      last_name: '',
      username: name.toLowerCase().replace(/\s+/g, '_'),
    });

    setPhase('choose');
  }, [playerName]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  // ═══ BOOT SEQUENCE ═══
  function runBootSequence(name: string) {
    setPhase('booting');
    const lines = [
      `// ${name.toUpperCase()} — SIGNAL LOCKED`,
      'Loading Mymories...',
      'Initializing desktop interface...',
      'CONNECTED',
    ];
    lines.forEach((line, i) => {
      setTimeout(() => setBootLines(prev => [...prev, line]), i * 350);
    });
    setTimeout(() => onReady(), lines.length * 350 + 400);
  }

  const handleContinueBrowser = useCallback(() => {
    const name = localStorage.getItem('strands_player_name') || 'Blank';
    runBootSequence(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady]);

  const handleOpenTG = useCallback(() => {
    window.open(MINI_APP_URL, '_blank');
  }, []);

  // ═══ RENDER ═══

  if (phase === 'detect') {
    return (
      <div className={styles.gate}>
        <div className={styles.detectText}>
          <span className={styles.detectLine}>Scanning signal source...</span>
        </div>
      </div>
    );
  }

  if (phase === 'booting') {
    return (
      <div className={styles.gate}>
        <div className={styles.bootSequence}>
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`${styles.bootLine} ${line === 'CONNECTED' ? styles.bootAccent : ''}`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'choose') {
    const name = localStorage.getItem('strands_player_name') || 'Blank';
    return (
      <div className={styles.gate}>
        <div className={styles.choosePanel}>
          <div className={styles.terminalLines}>
            <span className={styles.termLineGreen}>{'>'} signal_verified</span>
            <span className={styles.termLine}>{'>'} handle: {name}</span>
          </div>
          <h2 className={styles.chooseTitle}>SIGNAL LOCKED</h2>
          <p className={styles.chooseDesc}>
            Choose your interface. Same experience either way.
          </p>
          <div className={styles.chooseOptions}>
            <button className={styles.chooseBrowser} onClick={handleContinueBrowser}>
              <span className={styles.chooseIcon}>🖥</span>
              <span className={styles.chooseLabel}>CONTINUE HERE</span>
              <span className={styles.chooseSub}>Full experience in your browser</span>
            </button>
            <button className={styles.chooseTG} onClick={handleOpenTG}>
              <span className={styles.chooseIcon}>✈</span>
              <span className={styles.chooseLabel}>OPEN IN TELEGRAM</span>
              <span className={styles.chooseSub}>Native app · Haptics · Cross-device sync</span>
            </button>
          </div>
          <p className={styles.chooseNote}>Your progress syncs between both.</p>
        </div>
      </div>
    );
  }

  // Entry — name input
  return (
    <div className={styles.gate}>
      <div className={styles.entryPanel}>
        <div className={styles.entryGlow} />
        <div className={styles.terminalLines}>
          <span className={styles.termLine}>{'>'} signal_detected</span>
          <span className={styles.termLine}>{'>'} source: unknown</span>
          <span className={styles.termLineAccent}>{'>'} identity_required</span>
        </div>
        <h2 className={styles.entryTitle}>CHOOSE YOUR HANDLE</h2>
        <p className={styles.entryDesc}>
          Something is broadcasting from inside MetaXity1.
          Before we open the channel, we need to know what to call you.
        </p>
        
        <div className={styles.nameField}>
          <label className={styles.nameLabel}>SIGNAL HANDLE</label>
          <input
            ref={inputRef}
            className={styles.nameInput}
            type="text"
            value={playerName}
            onChange={e => { setPlayerName(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="Enter your handle..."
            maxLength={20}
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.nameHint}>This is how you appear in transmissions</span>
        </div>

        {error && <p className={styles.entryError}>{error}</p>}

        <button 
          className={styles.connectBtn} 
          onClick={handleSubmit}
          disabled={playerName.trim().length < 2}
        >
          <span className={styles.connectLabel}>LOCK SIGNAL</span>
        </button>

        <p className={styles.entryNote}>
          No wallet. No email. No password. Just a name.
        </p>
      </div>
    </div>
  );
}
