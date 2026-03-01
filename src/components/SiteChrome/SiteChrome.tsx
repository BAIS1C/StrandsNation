'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Hides its children on game routes (/game, /app).
 * Used in root layout to suppress MusicPlayer, Scanlines, etc.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isGame = pathname?.startsWith('/game') || pathname?.startsWith('/app');
  if (isGame) return null;
  return <>{children}</>;
}
