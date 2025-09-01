import React from "react";
import Link from "next/link";
import { Footer, H1, Paragraph, Button } from "@/components/design-system";
import { BlogCard, LoklCTABanner } from "@/components/lokl-academy/components";
import { getBlogsLiteAction } from "@/actions/blog-action";
import type { BlogPost } from "@/lib/blog/schema";
import BlogFiltersClient from "@/components/lokl-academy/components/blog-filters-client";

export default async function BlogPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const limit = 10;
  const page = 1;
  const search = typeof searchParams?.search === 'string' ? searchParams?.search : undefined;
  const tagsCsv = typeof searchParams?.tags === 'string' ? searchParams?.tags : undefined;
  const tags = tagsCsv ? tagsCsv.split(',').map(t => t.trim()).filter(Boolean) : undefined;

  const resp = await getBlogsLiteAction({ page, limit, status: "published", sortBy: "createdAt", sortOrder: "DESC", search, tags });
  const blogs: BlogPost[] = resp?.blogs || [];
  const totalCount: number = resp?.totalCount || blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <>
      <main>
        <section className="bg-[#F7F7FB] py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <H1 className="mb-4">Blog LOKL Academy</H1>
              <Paragraph variant="lead" className="mx-auto max-w-2xl">
                Artículos, guías y recursos sobre inversión inmobiliaria, finanzas personales y desarrollo profesional.
              </Paragraph>
            </div>
            <div className="mt-6">
              <BlogFiltersClient availableTags={["fintech", "innovacion", "blockchain", "proptech", "startups"]} />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                index === 0 && page === 1 ? (
                  <div key={blog.id || blog.slug} className="col-span-1 md:col-span-2 lg:col-span-3">
                    <BlogCard blog={blog} variant="featured" />
                  </div>
                ) : (
                  <BlogCard key={blog.id || blog.slug} blog={blog} variant="default" />
                )
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="my-16 text-center">
                <Paragraph variant="lead">No se encontraron artículos.</Paragraph>
              </div>
            )}

            {page < totalPages && (
              <div className="mt-12 flex justify-center">
                <Link href={{ pathname: `/blog/page/${page + 1}`, query: { search, tags: tagsCsv } }}>
                  <Button>Mostrar más</Button>
                </Link>
              </div>
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
