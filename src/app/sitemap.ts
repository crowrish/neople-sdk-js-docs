import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://crowrish.github.io/neople-sdk-js-docs'
      : 'http://localhost:3000';

  const pages = source.getPages().map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority:
      page.url === '/docs' ? 0.9 : page.url.includes('/docs/') ? 0.8 : 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...pages,
  ];
}
