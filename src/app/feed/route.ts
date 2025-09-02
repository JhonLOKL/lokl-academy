import { NextResponse } from 'next/server';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://academy.lokl.life' : 'http://localhost:3000');

const PAGE_SIZE = 20;

export async function GET() {
  try {
    const params = new URLSearchParams({
      page: '1',
      limit: String(PAGE_SIZE),
      status: 'published',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    });
    const res = await fetch(`${SITE_URL}/api/academy/blog/lite?${params.toString()}`, { next: { revalidate: 600 } });
    const json = await res.json();
    const posts: any[] = json?.data?.posts || [];

    const items = posts.map((p) => ({
      id: p.id,
      url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
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
  } catch (e) {
    return NextResponse.json({ version: 'https://jsonfeed.org/version/1', title: 'LOKL Academy' });
  }
}


