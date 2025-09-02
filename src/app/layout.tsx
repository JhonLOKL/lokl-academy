import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/lokl-academy/layouts/site-navbar";

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
  metadataBase: new URL("https://loklacademy.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/es",
    },
  },
  openGraph: {
    title: "LOKL Academy | Plataforma de Inversión y Bienes Raíces",
    description: "Aprende a invertir en bienes raíces y administrar tus finanzas personales con nuestros cursos, blogs y podcasts especializados.",
    url: "https://loklacademy.com",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}