import Script from 'next/script';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'STRANDS // SIGNAL',
  description: 'Enter the signal',
};

// Next.js 14: viewport must be a separate export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * /app layout — Mini App specific.
 * 
 * NO site Nav. NO site chrome. Full viewport.
 * The TG WebApp script MUST load before the page renders
 * so window.Telegram.WebApp is available on mount.
 * 
 * Uses the same design tokens as the site (via global CSS).
 * Background set to --c-bg for consistency.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <div style={{
        minHeight: '100vh',
        background: 'var(--c-bg, #0A0B0D)',
        color: 'var(--c-text, #E2E8F0)',
      }}>
        {children}
      </div>
    </>
  );
}
