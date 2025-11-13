import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/lokl-academy/layouts/site-navbar";
import Script from "next/script";
import { Suspense } from "react";
import GAListener from "@/components/analytics/ga-listener";
import UtmTracker from "@/components/analytics/utm-tracker";
import { Toaster } from "@/components/design-system";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

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
  metadataBase: new URL("https://academy.lokl.life"),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' }
    ],
  },
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
    url: "https://academy.lokl.life",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect SOLO a recursos MÁS críticos - optimizado para LCP */}
        <link rel="preconnect" href="https://lokl-assets.s3.us-east-1.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos secundarios - no bloquean renderizado */}
        <link rel="dns-prefetch" href="https://lokl-academy.s3.us-east-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload imagen LCP del hero móvil - CRÍTICO para LCP */}
        <link 
          rel="preload" 
          as="image" 
          href="https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-indie-movil.png"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
        
        {/* Preload hero poster desktop para mejorar LCP */}
        <link 
          rel="preload" 
          as="image" 
          href="https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe_poster.jpg"
          fetchPriority="high"
          media="(min-width: 768px)"
        />
        
        {/* Preload de fuente crítica para mejorar FCP */}
        {/* eslint-disable-next-line @next/next/google-font-preconnect */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager - Movido a lazyOnload para no bloquear */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
        >
          {`
            try {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-59P9PHW');
            } catch (err) {
              console.error('GTM init failed', err);
            }
          `}
        </Script>

        {/* Google Analytics - Movido a lazyOnload */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-88VH2CG9LP'}`}
          strategy="lazyOnload"
        />
        <Script id="ga-config" strategy="lazyOnload">
          {`
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-88VH2CG9LP'}', {
                cookie_domain: '.lokl.life',
                linker: { domains: ['lokl.life', 'academy.lokl.life'] },
                send_page_view: true
              });
            } catch (err) {
              console.error('GA config failed', err);
            }
          `}
        </Script>

        <Suspense fallback={null}>
          <GAListener />
          <UtmTracker />
        </Suspense>
        <SiteNavbar />
        {children}
        <Toaster />

        {/* GTM NoScript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59P9PHW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}