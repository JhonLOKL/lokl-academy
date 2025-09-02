import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://academy.lokl.life' : 'http://localhost:3000');
const PAGE_SIZE = 10;
// Opcional: mantenemos una lista inicial; idealmente trae esto desde la API
const CATEGORIES = ['Trading', 'Finanzas', 'Tecnología'];

async function getTotalPages(category?: string) {
  const params = new URLSearchParams({
    page: '1',
    limit: String(PAGE_SIZE),
    status: 'published',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });
  if (category) params.set('category', category);

  const res = await fetch(`${SITE_URL}/api/academy/blog/lite?${params.toString()}`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  return json?.data?.pagination?.totalPages || 1;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home/blog principales
  entries.push({ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 });
  entries.push({ url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });

  // URLs importantes adicionales (no eliminar)
  entries.push({ url: `https://academy.lokl.life`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
  entries.push({ url: `https://academy.lokl.life/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });

  // Blog global paginado
  const totalBlogPages = await getTotalPages();
  for (let i = 2; i <= totalBlogPages; i++) {
    entries.push({ url: `${SITE_URL}/blog/page/${i}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 });
  }

  // Categorías paginadas
  for (const cat of CATEGORIES) {
    const totalCatPages = await getTotalPages(cat);
    const base = `${SITE_URL}/blog/category/${encodeURIComponent(cat)}`;
    entries.push({ url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 });
    for (let i = 2; i <= totalCatPages; i++) {
      entries.push({ url: `${base}/page/${i}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 });
    }
  }

  return entries;
}
