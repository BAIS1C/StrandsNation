import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/game');

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return children;
}
