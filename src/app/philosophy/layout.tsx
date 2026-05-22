import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/philosophy');

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
