import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlugAction } from '@/actions/blog-action';

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resp = await getBlogBySlugAction(params.slug);
  const blog = resp?.blog;
  
  if (!blog) {
    notFound();
  }

  const { seo } = blog;
  
  // Construir datos estructurados para el artículo
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: seo.description,
    image: seo.ogImage.url,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      '@type': 'Person',
      name: blog.author.name,
      url: blog.author.socialLinks?.website || undefined
    },
    publisher: {
      '@type': 'Organization',
      name: 'LOKL Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://loklacademy.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://loklacademy.com/blog/${blog.slug}`
    }
  };

  // Construir datos estructurados para breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://loklacademy.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://loklacademy.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://loklacademy.com/blog/${blog.slug}`
      }
    ]
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: blog.author.name }],
    creator: blog.author.name,
    publisher: 'LOKL Academy',
    
    // Configuración de Open Graph
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://loklacademy.com/blog/${blog.slug}`,
      siteName: seo.ogSiteName || 'LOKL Academy',
      images: [
        {
          url: seo.ogImage.url,
          width: seo.ogImage.width,
          height: seo.ogImage.height,
          alt: seo.ogImage.alt,
        },
      ],
      locale: seo.ogLocale || 'es_ES',
      type: seo.ogType,
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author.name],
      tags: blog.tags.map(tag => tag.name),
    },
    
    // Configuración de Twitter
    twitter: {
      card: seo.twitterCard,
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage.url],
      creator: seo.twitterCreator || '@loklacademy',
      site: seo.twitterSite || '@loklacademy',
    },
    
    // Configuración de robots
    robots: {
      index: seo.robots?.index ?? true,
      follow: seo.robots?.follow ?? true,
      googleBot: {
        index: seo.robots?.index ?? true,
        follow: seo.robots?.follow ?? true,
        'max-video-preview': seo.robots?.maxVideoPreview ?? -1,
        'max-image-preview': seo.robots?.maxImagePreview ?? 'large',
        'max-snippet': seo.robots?.maxSnippet ?? -1,
      },
    },
    
    // URL canónica
    alternates: {
      canonical: seo.canonicalUrl || `https://loklacademy.com/blog/${blog.slug}`,
    },
    
    // Colores del tema
    themeColor: seo.themeColor || '#5352F6',
    
    // Datos estructurados
    other: {
      'application-name': 'LOKL Academy',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'LOKL Academy',
      'msapplication-TileColor': seo.msTileColor || '#5352F6',
      'msapplication-config': '/browserconfig.xml',
      'format-detection': 'telephone=no',
      structuredData: JSON.stringify([
        articleStructuredData,
        breadcrumbStructuredData
      ])
    },
  };
}
