'use client';

import { useState, useCallback } from 'react';
import AuthGate from '@/components/AuthGate/AuthGate';
import GameDesktop from '@/components/GameDesktop/GameDesktop';

export default function MiniAppPage() {
  const [ready, setReady] = useState(false);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <AuthGate onReady={handleReady} />;
  }

  return <GameDesktop />;
}