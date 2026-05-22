import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/whitepaper');

export default function WhitepaperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
