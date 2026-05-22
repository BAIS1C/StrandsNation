import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/everywear');

export default function EveryWearLayout({ children }: { children: React.ReactNode }) {
  return children;
}
