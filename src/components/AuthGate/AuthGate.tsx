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
  onReady: (mode: 'browser' | 'miniapp') => void;
}

export default function AuthGate({ onReady }: AuthGateProps) {
  const [phase, setPhase] = useState<'detect' | 'entry' | 'choose' | 'booting'>('detect');
  const [user, setUser] = useState<TGUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const scriptLoaded = useRef(false);

  // ═══ DETECT ENVIRONMENT ═══
  useEffect(() => {
    async function detect() {
      const inTG = isTelegramMiniApp();
      const state = await loadState();

      if (inTG) {
        const tgUser = initMiniApp();
        if (tgUser) {
          setUser(tgUser);
          if (!state.authed) {
            const auth = await validateAuth();
            if (auth) await setAuthed(auth.playerID, tgUser);
          }
          runBootSequence(tgUser.first_name, 'miniapp');
        } else {
          setError('Signal lost. Could not authenticate.');
        }
      } else {
        if (state.authed && state.tgUser) {
          setUser(state.tgUser);
          setPhase('choose');
        } else {
          // Only load TG script on production (HTTPS) — localhost will use dev bypass
          const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
          if (!isLocalhost) loadTGScript();
          setPhase('entry');
        }
      }
    }
    detect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ═══ LOAD TG WIDGET SCRIPT (hidden, for popup API) ═══
  function loadTGScript() {
    if (scriptLoaded.current) return;
    if (typeof window === 'undefined') return;
    const s = document.createElement('script');
    s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.async = true;
    s.onload = () => { scriptLoaded.current = true; };
    document.head.appendChild(s);
  }

  // ═══ TG AUTH CALLBACK ═══
  const handleTGAuth = useCallback(async (widgetUser: any) => {
    const tgUser: TGUser = {
      id: widgetUser.id,
      first_name: widgetUser.first_name,
      last_name: widgetUser.last_name,
      username: widgetUser.username,
      photo_url: widgetUser.photo_url,
    };
    setUser(tgUser);

    try {
      // Dev bypass doesn't need server validation
      if (widgetUser.hash === 'dev_bypass') {
        await setAuthed(`dev-${widgetUser.id}`, tgUser);
      } else {
        const res = await fetch('/api/auth/telegram-widget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(widgetUser),
        });
        if (res.ok) {
          const data = await res.json();
          await setAuthed(data.playerID, tgUser);
        }
      }
    } catch {}

    setPhase('choose');
  }, []);

  // ═══ CONNECT BUTTON: opens TG popup ═══
  const handleConnect = useCallback(() => {
    // DEV BYPASS: on localhost, skip TG auth entirely
    const isDev = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (isDev) {
      // Simulate auth with dev user
      handleTGAuth({
        id: 999999999,
        first_name: 'Dev',
        last_name: 'User',
        username: 'dev_blank',
        photo_url: '',
        auth_date: Math.floor(Date.now() / 1000),
        hash: 'dev_bypass',
      });
      return;
    }

    (window as any).onTGAuth = handleTGAuth;

    try {
      const TG = (window as any).Telegram;
      if (TG?.Login?.auth) {
        TG.Login.auth(
          { bot_id: TG_BOT_USERNAME, request_access: 'write' },
          (data: any) => { if (data) handleTGAuth(data); }
        );
      } else {
        // Fallback: open TG directly for auth
        window.open(
          `https://t.me/${TG_BOT_USERNAME}?start=auth`,
          '_blank'
        );
      }
    } catch (err) {
      // Cross-origin errors from TG widget — fallback to redirect
      console.warn('TG widget cross-origin error, using redirect fallback');
      const authUrl = `https://oauth.telegram.org/auth?bot_id=${TG_BOT_USERNAME}&origin=${encodeURIComponent(window.location.origin)}&request_access=write&return_to=${encodeURIComponent(window.location.href)}`;
      window.location.href = authUrl;
    }
  }, [handleTGAuth]);

  // ═══ BOOT SEQUENCE ═══
  function runBootSequence(name: string, mode: 'browser' | 'miniapp') {
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
    setTimeout(() => onReady(mode), lines.length * 350 + 400);
  }

  const handleContinueBrowser = useCallback(() => {
    runBootSequence(user?.first_name || 'BLANK', 'browser');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, onReady]);

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

  if (phase === 'entry') {
    return (
      <div className={styles.gate}>
        <div className={styles.entryPanel}>
          <div className={styles.entryGlow} />
          <div className={styles.terminalLines}>
            <span className={styles.termLine}>{'>'} signal_detected</span>
            <span className={styles.termLine}>{'>'} source: unknown</span>
            <span className={styles.termLine}>{'>'} authentication_required</span>
          </div>
          <h2 className={styles.entryTitle}>SYNC YOUR SIGNAL</h2>
          <p className={styles.entryDesc}>
            Something is broadcasting from inside MetaXity1.
            To receive the transmission, connect your Telegram identity.
          </p>
          <button className={styles.connectBtn} onClick={handleConnect}>
            <span className={styles.connectIcon}>✈</span>
            <span className={styles.connectLabel}>CONNECT VIA TELEGRAM</span>
          </button>
          <p className={styles.entryNote}>
            Opens Telegram for one-tap verification.
            No wallet. No email. No password.
          </p>
          {error && <p className={styles.entryError}>{error}</p>}
          <p className={styles.entryFallback}>
            Don't have Telegram?{' '}
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              Get it here
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'choose') {
    return (
      <div className={styles.gate}>
        <div className={styles.choosePanel}>
          <div className={styles.terminalLines}>
            <span className={styles.termLineGreen}>{'>'} signal_verified</span>
            <span className={styles.termLine}>{'>'} identity: {user?.first_name || 'BLANK'}</span>
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
              <span className={styles.chooseSub}>Native app. Haptics. Cross-device sync.</span>
            </button>
          </div>
          <p className={styles.chooseNote}>Your progress syncs between both.</p>
        </div>
      </div>
    );
  }

  return null;
}
