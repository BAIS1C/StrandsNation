import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/codex');

export default function CodexLayout({ children }: { children: React.ReactNode }) {
  return children;
}
