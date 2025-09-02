import { NextResponse } from 'next/server';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://academy.lokl.life' : 'http://localhost:3000');

const PAGE_SIZE = 20;

export async function GET() {
  try {
    type ApiLitePostForFeed = {
      id?: string;
      slug?: string;
      title?: string;
      excerpt?: string;
      publishedAt?: string;
      createdAt?: string;
      seo?: { title?: string };
    };
    const params = new URLSearchParams({
      page: '1',
      limit: String(PAGE_SIZE),
      status: 'published',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    });
    const res = await fetch(`${SITE_URL}/api/academy/blog/lite?${params.toString()}`, { next: { revalidate: 600 } });
    if (!res.ok) return NextResponse.json({ version: 'https://jsonfeed.org/version/1', title: 'LOKL Academy' });
    const json = await res.json().catch(() => null);
    const posts: ApiLitePostForFeed[] = (json?.data?.posts as ApiLitePostForFeed[]) || [];

    const items = posts.filter(p => p?.slug).map((p) => ({
      id: p.id,
      url: `${SITE_URL}/blog/${encodeURIComponent(p.slug as string)}`,
      title: p.seo?.title || p.title,
      summary: p.excerpt,
      date_published: p.publishedAt || p.createdAt,
    }));

    const feed = {
      version: 'https://jsonfeed.org/version/1',
      title: 'LOKL Academy - Últimos artículos',
      home_page_url: `${SITE_URL}/blog`,
      feed_url: `${SITE_URL}/feed`,
      items,
    };

    return NextResponse.json(feed, { headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ version: 'https://jsonfeed.org/version/1', title: 'LOKL Academy' });
  }
}


