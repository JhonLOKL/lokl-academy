import type { MetadataRoute } from 'next';
import { getAllCoursesAction } from "@/actions/course-action";

const SITE_URL = 'https://lokl.life'
// Usa la base pública ya existente de tu app/API
const API_BASE = process.env.NEXT_PUBLIC_BASE_PATH || SITE_URL;
const PAGE_SIZE = 10;
// Opcional: mantenemos una lista inicial; idealmente trae esto desde la API
const CATEGORIES = ['Trading', 'Finanzas', 'Tecnología'];

async function getTotalPages(category?: string) {
  try {
    const params = new URLSearchParams({
      page: '1',
      limit: String(PAGE_SIZE),
      status: 'published',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    });
    if (category) params.set('category', category);

    const url = `${API_BASE}/api/academy/blog/lite?${params.toString()}`;
    const res = await fetch(url, process.env.NODE_ENV === 'production' ? { next: { revalidate: 3600 } } : { cache: 'no-store' });
    if (!res.ok) {
      // Fallback local a /api/blogs (mock). Obtenemos todos para calcular páginas
      const res2 = await fetch(
        `${SITE_URL}/api/blogs${category ? `?category=${encodeURIComponent(category)}` : ''}`,
        process.env.NODE_ENV === 'production' ? { next: { revalidate: 3600 } } : { cache: 'no-store' }
      );
      if (!res2.ok) return 1;
      const j2 = await res2.json().catch(() => null);
      const totalItems = Array.isArray(j2?.blogs) ? j2.blogs.length : 0;
      return Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    }
    const json = await res.json().catch(() => null);
    return json?.data?.pagination?.totalPages || 1;
  } catch {
    return 1;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home/blog principales
  entries.push({ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 });
  entries.push({ url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
  entries.push({ url: `${SITE_URL}/course`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/faqs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
  entries.push({ url: `${SITE_URL}/indie-universe`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/nido-de-agua`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/discoveryourinvestorprofile`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/investment-for-freelancers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/cdt-vs-real-estate-investing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });

  // Reports
  entries.push({ url: `${SITE_URL}/reports`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/impacto-regulatorio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/lujo-consciente`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/horizonte-estrategico-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/guia-inversion-fraccionada`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/vivienda-activo-pasivo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `${SITE_URL}/reports/oriente-antioqueno-2025`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });

  // URLs importantes adicionales (no eliminar)
  entries.push({ url: `https://academy.lokl.life`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
  entries.push({ url: `https://academy.lokl.life/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
  entries.push({ url: `https://academy.lokl.life/faqs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
  entries.push({ url: `https://academy.lokl.life/indie-universe`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/nido-de-agua`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/discoveryourinvestorprofile`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/investment-for-freelancers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/cdt-vs-real-estate-investing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  
  // Reports (academy domain)
  entries.push({ url: `https://academy.lokl.life/reports`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/impacto-regulatorio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/lujo-consciente`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/horizonte-estrategico-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/guia-inversion-fraccionada`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/vivienda-activo-pasivo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  entries.push({ url: `https://academy.lokl.life/reports/oriente-antioqueno-2025`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });

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

  // Artículos individuales /blog/:slug — recorre paginado y agrega cada slug
  try {
    type ApiLitePostMin = { slug?: string; updatedAt?: string; publishedAt?: string };
    type ApiLitePagination = { hasNext?: boolean; totalPages?: number };
    type FallbackBlog = { slug: string; updatedAt?: string; publishedAt?: string };
    let page = 1;
    let hasNext = true;
    let safety = 0;
    while (hasNext && safety < 200) {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        status: 'published',
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      });
      const res = await fetch(`${API_BASE}/api/academy/blog/lite?${params.toString()}`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 3600 } } : { cache: 'no-store' });
      if (!res.ok) {
        // Fallback local a /api/blogs para incluir slugs de mock
        const res2 = await fetch(`${SITE_URL}/api/blogs?limit=1000`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 3600 } } : { cache: 'no-store' });
        if (res2.ok) {
          const j2 = await res2.json().catch(() => null);
          const blogs: FallbackBlog[] = (j2?.blogs as FallbackBlog[]) || [];
          for (const b of blogs) {
            if (b?.slug) {
              const updated = b?.updatedAt || b?.publishedAt || new Date().toISOString();
              entries.push({
                url: `${SITE_URL}/blog/${encodeURIComponent(b.slug)}`,
                lastModified: new Date(updated),
                changeFrequency: 'weekly',
                priority: 0.7,
              });
            }
          }
        }
        break;
      }
      const json = await res.json().catch(() => null);
      const data = json?.data as { posts?: ApiLitePostMin[]; pagination?: ApiLitePagination } | undefined;
      const posts: ApiLitePostMin[] = data?.posts || [];
      const pagination = data?.pagination;
      for (const p of posts) {
        const updated = p?.updatedAt || p?.publishedAt || new Date().toISOString();
        if (p?.slug) {
          entries.push({
            url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
            lastModified: new Date(updated),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }
      hasNext = Boolean(pagination?.hasNext) && page < (pagination?.totalPages || page);
      page += 1;
      safety += 1;
    }
  } catch {
    // si falla, al menos devolvemos las entradas ya agregadas
  }

  // ==============================
  // Cursos: incluir todas las URLs
  // ==============================
  try {
    const coursesRes = await getAllCoursesAction();
    if (coursesRes.success && coursesRes.data) {
      for (const c of coursesRes.data) {
        const url = `${SITE_URL}/course/${encodeURIComponent(c.slug)}`;
        const updated = c.updatedAt || c.publishedAt || new Date().toISOString();
        entries.push({
          url,
          lastModified: new Date(updated),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch {
    // noop
  }

  return entries;
}
