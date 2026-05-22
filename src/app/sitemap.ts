import type { MetadataRoute } from 'next';
import { absoluteUrl, seoRoutes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return seoRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
