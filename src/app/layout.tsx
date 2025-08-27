import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOKL Academy | Cursos de Inversiones Inmobiliarias y Bienes Raíces",
  description: "Aprende a invertir en bienes raíces con cursos, blogs, podcasts y recursos premium. Domina el mundo de las inversiones inmobiliarias con LOKL Academy.",
  keywords: "inversiones inmobiliarias, bienes raíces, cursos de inversión, podcasts inmobiliarios, blogs financieros, LOKL Academy",
  authors: [{ name: "LOKL Academy" }],
  creator: "LOKL",
  publisher: "LOKL",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://lokl.life"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LOKL Academy | Plataforma de Aprendizaje en Inversiones Inmobiliarias",
    description: "Cursos, blogs, podcasts y recursos premium para convertirte en un experto en inversiones inmobiliarias.",
    url: "https://lokl.life",
    siteName: "LOKL Academy",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/buildings-bw.jpg",
        width: 1200,
        height: 630,
        alt: "LOKL Academy - Inversiones Inmobiliarias",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKL Academy | Aprende a Invertir en Bienes Raíces",
    description: "Domina el mundo de las inversiones inmobiliarias con cursos, blogs y podcasts de expertos.",
    images: ["/images/buildings-bw.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
