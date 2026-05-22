import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/network');

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
