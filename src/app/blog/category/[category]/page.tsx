import React from "react";
import Link from "next/link";
import { Footer, H1, Paragraph, Button } from "@/components/design-system";
import { BlogCard } from "@/components/lokl-academy/components";
import { getBlogsLiteAction } from "@/actions/blog-action";
import type { BlogPost } from "@/lib/blog/schema";

export default async function BlogCategoryPage({ params, searchParams }: { params: Promise<{ category: string }>, searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { category: rawCategory } = await params;
  const sp = (searchParams && await searchParams) || {};
  const category = decodeURIComponent(rawCategory);
  const currentPage = Number(sp.page || 1);
  const limit = 10;
  const resp = await getBlogsLiteAction({ page: currentPage, limit, status: "published", category, sortBy: "createdAt", sortOrder: "DESC" });
  const blogs: BlogPost[] = resp?.blogs || [];
  const totalCount: number = resp?.totalCount || blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <>
      <main>
        <section className="bg-[#F7F7FB] py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <H1 className="mb-4">Categoría: {category}</H1>
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

            <div className="mt-12 flex justify-center gap-4">
              {currentPage > 1 && (
                <Link href={`/blog/category/${category}?page=${currentPage - 1}`}>
                  <Button variant="secondary">Anterior</Button>
                </Link>
              )}
              {currentPage < totalPages && (
                <Link href={`/blog/category/${category}?page=${currentPage + 1}`}>
                  <Button>Siguiente</Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer variant="default" />
    </>
  );
}

