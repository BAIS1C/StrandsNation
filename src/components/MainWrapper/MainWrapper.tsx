'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Wraps {children} in <main>. On site routes adds paddingBottom
 * for the MusicPlayer. On game routes renders clean with no padding.
 */
export default function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isGame = pathname?.startsWith('/game') || pathname?.startsWith('/app');

  return (
    <main style={isGame ? undefined : { paddingBottom: 52 }}>
      {children}
    </main>
  );
}
