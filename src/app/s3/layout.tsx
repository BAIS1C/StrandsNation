import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('/s3');

export default function S3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
