import type { Metadata, Viewport } from 'next';
import { Suspense, type ReactNode } from 'react';
import Nav from '@/components/Nav/Nav';
import CursorGlow from '@/components/CursorGlow/CursorGlow';
import Scanlines from '@/components/Scanlines/Scanlines';
import CircuitBg from '@/components/CircuitBg/CircuitBg';
import SiteChrome from '@/components/SiteChrome/SiteChrome';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import SkinToggle from '@/components/SkinToggle/SkinToggle';
import { buildMetadata, organizationJsonLd, SITE_URL, videoGameJsonLd, websiteJsonLd } from '@/lib/seo';
import '@/styles/tokens.css';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata('/'),
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0B0D',
};

/* EWDS boot script — runs before first paint to swap body dataset attrs
   from localStorage, avoiding a flash of the default skin on reload. */
const ewdsBoot = `
try {
  var s = localStorage.getItem('ew-skin');
  var m = localStorage.getItem('ew-mode');
  if (s) document.body.dataset.skin = s;
  if (m) document.body.dataset.mode = m;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: ewdsBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd(), videoGameJsonLd()]),
          }}
        />
      </head>
      <body className="ew" data-skin="classic" data-mode="dark">
        <SiteChrome>
          <Scanlines />
          <CircuitBg />
          <CursorGlow />
        </SiteChrome>
        <Suspense fallback={null}>
          <Nav />
        </Suspense>
        <MainWrapper>{children}</MainWrapper>
        <SkinToggle />
      </body>
    </html>
  );
}
