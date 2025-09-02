import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://academy.lokl.life' : 'http://localhost:3000');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general: todo permitido salvo áreas privadas
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
      // Permitir bots de IA explícitamente
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
