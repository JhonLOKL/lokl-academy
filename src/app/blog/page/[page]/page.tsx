import React from "react";
import Link from "next/link";
import { Footer, H1, Paragraph, Button } from "@/components/design-system";
import { BlogCard, LoklCTABanner } from "@/components/lokl-academy/components";
import { getBlogsLiteAction } from "@/actions/blog-action";
import type { BlogPost } from "@/lib/blog/schema";

export default async function BlogPageNumber({ params, searchParams }: { params: Promise<{ page: string }>, searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { page } = await params;
  const currentPage = Number(page) || 1;
  const limit = 10;
  const sp = (searchParams && await searchParams) || {};
  const search = typeof sp.search === 'string' ? sp.search : undefined;
  const tagsCsv = typeof sp.tags === 'string' ? sp.tags : undefined;
  const tags = tagsCsv ? tagsCsv.split(',').map(t => t.trim()).filter(Boolean) : undefined;
  const resp = await getBlogsLiteAction({ page: currentPage, limit, status: "published", sortBy: "createdAt", sortOrder: "DESC", search, tags });
  const blogs: BlogPost[] = resp?.blogs || [];
  const totalCount: number = resp?.totalCount || blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // Paginación con elipsis
  const buildPageItems = (total: number, current: number): (number | "dots")[] => {
    const delta = 1;
    const range: number[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);
    range.push(1);
    for (let i = left; i <= right; i++) range.push(i);
    if (total > 1) range.push(total);
    const sorted = Array.from(new Set(range)).sort((a, b) => a - b);
    const out: (number | "dots")[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (prev) {
        if (p - prev === 2) out.push(prev + 1);
        else if (p - prev > 2) out.push("dots");
      }
      out.push(p);
      prev = p;
    }
    return out;
  };
  const pageItems = buildPageItems(totalPages, currentPage);

  return (
    <>
      <main>
        <section className="bg-[#F7F7FB] py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <H1 className="mb-4">Blog LOKL Academy</H1>
              <Paragraph variant="lead" className="mx-auto max-w-2xl">
                Página {currentPage} de {totalPages}
              </Paragraph>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} variant="default" />
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="my-16 text-center">
                <Paragraph variant="lead">No se encontraron artículos.</Paragraph>
              </div>
            )}

            {/* Paginación completa */}
            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center" aria-label="Paginación de blogs">
                <ul className="flex items-center gap-2">
                  {/* Prev */}
                  <li>
                    {currentPage > 1 ? (
                      <Link
                        href={{ pathname: currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`, query: { search, tags: tagsCsv } }}
                        className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#0F0F0F] transition-colors hover:bg-[#F5F5F5] hover:shadow-sm"
                        aria-label="Página anterior"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
                        <span>Anterior</span>
                      </Link>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-[#E5E7EB] px-3 py-1.5 text-sm text-[#9CA3AF]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
                        <span>Anterior</span>
                      </span>
                    )}
                  </li>
                  {/* Numbers */}
                  {pageItems.map((item, idx) => (
                    <li key={`${item}-${idx}`}>
                      {item === "dots" ? (
                        <span className="px-2 text-sm text-[#6D6C6C]">…</span>
                      ) : item === currentPage ? (
                        <span className="rounded-md bg-[#5352F6] px-3 py-1 text-sm text-white">{item}</span>
                      ) : (
                        <Link
                          href={{ pathname: item === 1 ? "/blog" : `/blog/page/${item}`, query: { search, tags: tagsCsv } }}
                          className="rounded-md border px-3 py-1 text-sm hover:bg-[#F5F5F5]"
                        >
                          {item}
                        </Link>
                      )}
                    </li>
                  ))}
                  {/* Next */}
                  <li>
                    {currentPage < totalPages ? (
                      <Link
                        href={{ pathname: `/blog/page/${currentPage + 1}`, query: { search, tags: tagsCsv } }}
                        className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#0F0F0F] transition-colors hover:bg-[#F5F5F5] hover:shadow-sm"
                        aria-label="Página siguiente"
                      >
                        <span>Siguiente</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                      </Link>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-[#E5E7EB] px-3 py-1.5 text-sm text-[#9CA3AF]">
                        <span>Siguiente</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                      </span>
                    )}
                  </li>
                </ul>
              </nav>
            )}

            <div className="mt-16">
              <LoklCTABanner />
            </div>
          </div>
        </section>
      </main>

      <Footer variant="default" />
    </>
  );
}

export async function generateStaticParams() {
  const limit = 10;
  const resp = await getBlogsLiteAction({ page: 1, limit, status: "published" });
  const totalCount: number = resp?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

