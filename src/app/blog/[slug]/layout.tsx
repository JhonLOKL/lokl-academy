import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlugAction } from '@/actions/blog-action';

type Props = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

// Función para limpiar URLs o paths que puedan venir con basura o etiquetas HTML desde la API
const sanitizeUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    // Extraer solo la URL si viene envuelta en etiquetas HTML (ej: <link rel="canonical" href="...")
    const hrefMatch = url.match(/href="([^"]+)"/);
    if (hrefMatch && hrefMatch[1]) return hrefMatch[1];
    // Eliminar etiquetas HTML en general si el regex anterior no funcionó
    return url.replace(/<[^>]*>?/gm, '').trim();
};

const getFullUrl = (path: string | undefined, slug: string) => {
    const cleanPath = sanitizeUrl(path);
    if (!cleanPath) return `https://lokl.life/blog/${slug}`;
    if (cleanPath.startsWith('http')) {
        // Asegurar que usamos lokl.life si viene academy o loklacademy
        return cleanPath.replace(/https?:\/\/(academy\.|www\.)?loklacademy\.com/, 'https://lokl.life')
            .replace(/https?:\/\/academy\.lokl\.life/, 'https://lokl.life');
    }
    return `https://lokl.life${cleanPath.startsWith('/') ? '' : '/blog/'}${cleanPath}`;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const resp = await getBlogBySlugAction(slug);
    const blog = resp?.blog;

    if (!blog) {
        return {};
    }

    const { seo } = blog;
    const canonical = getFullUrl(seo.canonicalUrl, blog.slug);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        authors: [{ name: blog.author.name }],
        creator: blog.author.name,
        publisher: 'LOKL Academy',

        // Configuración de Open Graph
        openGraph: {
            title: seo.ogTitle || seo.title,
            description: seo.ogDescription || seo.description,
            url: getFullUrl(seo.ogUrl, blog.slug),
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
            type: (seo.ogType as any) || 'article',
            publishedTime: blog.publishedAt,
            modifiedTime: blog.updatedAt,
            authors: [blog.author.name],
            tags: blog.tags.map(tag => tag.name),
        },

        // Configuración de Twitter
        twitter: {
            card: (seo.twitterCard as any) || 'summary_large_image',
            title: seo.twitterTitle || seo.title,
            description: seo.twitterDescription || seo.description,
            images: seo.twitterImage?.src ? [seo.twitterImage.src] : [seo.ogImage.url],
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
            canonical: canonical,
        },
    };
}

export default async function BlogLayout({ children, params }: Props) {
    const { slug } = await params;
    const resp = await getBlogBySlugAction(slug);
    const blog = resp?.blog;

    if (!blog) {
        notFound();
    }

    const { seo } = blog;
    const canonical = getFullUrl(seo.canonicalUrl, blog.slug);

    // Procesar el cuerpo del artículo para SEO (convertir bloques a texto plano si es necesario)
    const processArticleBody = (body: any): string => {
        if (typeof body === 'string') return body;
        if (Array.isArray(body)) {
            return body
                .map(block => {
                    if (block.type === 'paragraph' || block.type === 'heading') {
                        return block.content || '';
                    }
                    return '';
                })
                .filter(content => content.length > 0)
                .join(' ');
        }
        return '';
    };

    // Función para limpiar recursivamente URLs y ELIMINAR IDs internos en un objeto de datos estructurados
    const cleanStructuredData = (obj: any): any => {
        if (!obj) return obj;
        if (typeof obj === 'string') {
            if (obj.startsWith('http')) {
                return obj.replace(/https?:\/\/(academy\.|www\.)?loklacademy\.com/, 'https://lokl.life')
                    .replace(/https?:\/\/academy\.lokl\.life/, 'https://lokl.life');
            }
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => cleanStructuredData(item));
        }
        if (typeof obj === 'object') {
            const cleaned: any = {};
            // Lista de propiedades a omitir (IDs internos o sensibles)
            const propertiesToOmit = ['id', '_id', 'uuid', 'internal_id'];

            for (const key in obj) {
                if (propertiesToOmit.includes(key)) continue;
                cleaned[key] = cleanStructuredData(obj[key]);
            }
            return cleaned;
        }
        return obj;
    };

    // Construir o refinar los datos estructurados del artículo
    let articleStructuredData: any = {};

    if (seo.structuredData) {
        // Si la API ya envía datos, los limpiamos y normalizamos
        articleStructuredData = cleanStructuredData(seo.structuredData);
        // Normalizar headline (Schema.org usa headline en minúsculas)
        if (articleStructuredData.headLine && !articleStructuredData.headline) {
            articleStructuredData.headline = articleStructuredData.headLine;
            delete articleStructuredData.headLine;
        }
        // Limpiar articleBody si viene como array de bloques
        if (articleStructuredData.articleBody) {
            articleStructuredData.articleBody = processArticleBody(articleStructuredData.articleBody);
        }
    } else {
        // Construcción manual por defecto
        articleStructuredData = {
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
                    url: 'https://lokl.life/logo.png'
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonical
            }
        };
    }

    // Priorizar breadcrumbs de la API si existen
    const rawBreadcrumbs = (seo.breadcrumbs || []).length > 0 ? seo.breadcrumbs : [
        {
            name: 'Inicio',
            url: 'https://lokl.life',
            position: 1
        },
        {
            name: 'Blog',
            url: 'https://lokl.life/blog',
            position: 2
        },
        {
            name: blog.title,
            url: canonical,
            position: 3
        }
    ];

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: cleanStructuredData(rawBreadcrumbs).map((item: any) => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `https://lokl.life${item.url.startsWith('/') ? '' : '/'}${item.url}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />
            {children}
        </>
    );
}
