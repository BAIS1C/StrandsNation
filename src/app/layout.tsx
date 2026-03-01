import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Nav from '@/components/Nav/Nav';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import CursorGlow from '@/components/CursorGlow/CursorGlow';
import Scanlines from '@/components/Scanlines/Scanlines';
import CircuitBg from '@/components/CircuitBg/CircuitBg';
import SiteChrome from '@/components/SiteChrome/SiteChrome';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import '@/styles/tokens.css';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'StrandsNation — Ready Player You',
  description: 'A post-capitalist MMORPG where the world remembers your choices, NPCs adapt to how you think, and the community builds the civilisation they play in.',
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'StrandsNation — Ready Player You',
    description: 'A post-capitalist MMORPG. Your world. Your rules. Your playstyle.',
    siteName: 'StrandsNation',
    type: 'website',
    url: 'https://strandsnation.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StrandsNation — Ready Player You',
    description: 'A post-capitalist MMORPG. Your world. Your rules. Your playstyle.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>
          <Scanlines />
          <CircuitBg />
          <CursorGlow />
        </SiteChrome>
        <Nav />
        <MainWrapper>{children}</MainWrapper>
        <SiteChrome>
          <MusicPlayer />
        </SiteChrome>
      </body>
    </html>
  );
}
