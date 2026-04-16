'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Hides its children on game routes (/game, /app) and in embed mode.
 * Used in root layout to suppress MusicPlayer, Scanlines, etc.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isGame = pathname?.startsWith('/game') || pathname?.startsWith('/app');
  const isEmbed = searchParams?.get('embed') === 'true';
  if (isGame || isEmbed) return null;
  return <>{children}</>;
}
