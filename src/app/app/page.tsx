'use client';

import { useState, useCallback } from 'react';
import AuthGate from '@/components/AuthGate/AuthGate';
import GameDesktop from '@/components/GameDesktop/GameDesktop';

/**
 * /app — TG Mini App entry point.
 * 
 * IDENTICAL to /game. The only difference is layout.tsx:
 * - /game/layout.tsx → includes site Nav
 * - /app/layout.tsx  → no Nav, loads telegram-web-app.js
 * 
 * Same AuthGate, same GameDesktop, same everything.
 * AuthGate auto-detects TG vs browser and adapts.
 */
export default function MiniAppPage() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<'browser' | 'miniapp'>('browser');

  const handleReady = useCallback((selectedMode: 'browser' | 'miniapp') => {
    setMode(selectedMode);
    setReady(true);
  }, []);

  if (!ready) {
    return <AuthGate onReady={handleReady} />;
  }

  return <GameDesktop mode={mode} />;
}
