import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/lokl-academy/layouts/site-navbar";
import Script from "next/script";
import { Suspense } from "react";
import GAListener from "@/components/analytics/ga-listener";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LOKL Academy | Plataforma de Inversión y Bienes Raíces",
    template: "%s | LOKL Academy"
  },
  description: "LOKL Academy es una plataforma educativa especializada en inversión inmobiliaria, bienes raíces y finanzas personales. Ofrecemos cursos, blogs, podcasts y recursos para inversores de todos los niveles.",
  keywords: ["inversión inmobiliaria", "bienes raíces", "finanzas personales", "educación financiera", "cursos de inversión", "LOKL Academy"],
  authors: [{ name: "LOKL Academy" }],
  creator: "LOKL Academy",
  publisher: "LOKL Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lokl.academy.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/es",
    },
    types: {
      "application/json": "/feed",
    },
  },
  openGraph: {
    title: "LOKL Academy | Plataforma de Inversión y Bienes Raíces",
    description: "Aprende a invertir en bienes raíces y administrar tus finanzas personales con nuestros cursos, blogs y podcasts especializados.",
    url: "https://lokl.academy.com",
    siteName: "LOKL Academy",
    images: [
      {
        url: "/images/lokl-academy-og.jpg",
        width: 1200,
        height: 630,
        alt: "LOKL Academy - Plataforma de Inversión y Bienes Raíces",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKL Academy | Plataforma de Inversión y Bienes Raíces",
    description: "Aprende a invertir en bienes raíces y administrar tus finanzas personales con nuestros cursos, blogs y podcasts especializados.",
    images: ["/images/lokl-academy-og.jpg"],
    creator: "@loklacademy",
    site: "@loklacademy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    // Organization
    'ld+json:organization': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LOKL Academy',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.lokl.life',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.lokl.life'}/logo.png`,
      sameAs: [
        'https://www.linkedin.com/company/lokl/',
        'https://twitter.com/loklacademy',
      ],
    }),
    // WebSite + SearchAction
    'ld+json:website': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.lokl.life',
      name: 'LOKL Academy',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.lokl.life'}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-88VH2CG9LP'}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-88VH2CG9LP'}', {
              cookie_domain: '.lokl.life',
              linker: { domains: ['lokl.life', 'academy.lokl.life'] },
              send_page_view: true
            });
          `}
        </Script>
        <Suspense fallback={null}>
          <GAListener />
        </Suspense>
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}