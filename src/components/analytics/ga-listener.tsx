"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", id: string, params?: Record<string, unknown>): void;
};

interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window === "undefined") return;
    const w = window as WindowWithGtag;
    if (!w.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    w.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      cookie_domain: ".lokl.life",
    });
  }, [pathname, searchParams]);

  return null;
}


