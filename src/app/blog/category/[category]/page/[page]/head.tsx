import React from "react";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://loklacademy.com";

export default async function Head({ params }: { params: Promise<{ category: string; page: string }> }) {
  const { category, page } = await params;
  const p = Math.max(1, Number(page || 1));
  const canonical = `${SITE_URL}/blog/category/${encodeURIComponent(category)}${p > 1 ? `/page/${p}` : ""}`;
  const prevHref = p > 2 ? `${SITE_URL}/blog/category/${encodeURIComponent(category)}/page/${p - 1}` : p === 2 ? `${SITE_URL}/blog/category/${encodeURIComponent(category)}` : undefined;
  const nextHref = `${SITE_URL}/blog/category/${encodeURIComponent(category)}/page/${p + 1}`;
  return (
    <>
      <link rel="canonical" href={canonical} />
      {prevHref && <link rel="prev" href={prevHref} />}
      <link rel="next" href={nextHref} />
      <meta name="robots" content="index,follow" />
    </>
  );
}


