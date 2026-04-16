import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'STRANDS // SIGNAL',
  description: 'Enter the signal',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * /app layout — redirects to game.strandsnation.xyz.
 * Stripped: no site chrome, no third-party scripts.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--c-bg, #0A0B0D)',
      color: 'var(--c-text, #E2E8F0)',
    }}>
      {children}
    </div>
  );
}
