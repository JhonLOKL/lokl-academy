import React from "react";
import { getBlogsLiteAction } from "@/actions/blog-action";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://loklacademy.com";

export default async function Head({ params, searchParams }: { params: Promise<{ category: string }>, searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { category: rawCategory } = await params;
  const sp = (searchParams && await searchParams) || {};
  const category = decodeURIComponent(rawCategory);
  const page = Math.max(1, Number(sp.page || 1));
  const limit = 10;

  const resp = await getBlogsLiteAction({ page, limit, status: "published", category, sortBy: "createdAt", sortOrder: "DESC" });
  const totalCount: number = resp?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const canonical = `${SITE_URL}/blog/category/${encodeURIComponent(category)}${page > 1 ? `/page/${page}` : ""}`;
  const prevHref = page > 2
    ? `${SITE_URL}/blog/category/${encodeURIComponent(category)}/page/${page - 1}`
    : page === 2
      ? `${SITE_URL}/blog/category/${encodeURIComponent(category)}`
      : undefined;
  const nextHref = page < totalPages
    ? `${SITE_URL}/blog/category/${encodeURIComponent(category)}/page/${page + 1}`
    : undefined;

  return (
    <>
      <link rel="canonical" href={canonical} />
      {prevHref && <link rel="prev" href={prevHref} />}
      {nextHref && <link rel="next" href={nextHref} />}
      <meta name="robots" content="index,follow" />
    </>
  );
}


