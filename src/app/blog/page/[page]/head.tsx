import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://loklacademy.com";

export default async function Head({ params, searchParams }: { params: Promise<{ page: string }>, searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { page } = await params;
  const sp = (searchParams && await searchParams) || {};
  const p = Math.max(1, Number(page || 1));
  const canonical = `${SITE_URL}/blog/page/${p}`;
  const prevHref = p > 2 ? `${SITE_URL}/blog/page/${p - 1}` : p === 2 ? `${SITE_URL}/blog` : undefined;
  const nextHref = sp.hasNext ? `${SITE_URL}/blog/page/${p + 1}` : undefined;

  return (
    <>
      <link rel="canonical" href={canonical} />
      {prevHref && <link rel="prev" href={prevHref} />}
      {nextHref && <link rel="next" href={nextHref} />}
      <meta name="robots" content="index,follow" />
    </>
  );
}


