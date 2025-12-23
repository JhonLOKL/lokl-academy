import { getBlogsActionResponseSchema } from "@/schemas/action-schemas";
import { BlogFilterSchema } from "@/schemas/blog-schema";
import { BlogLiteFilterSchema } from "@/schemas/blog-lite";
import { getBlogsService, getBlogsLiteService, getBlogBySlugService, getRelatedBlogsService } from "@/services/blog-service";
import { z } from "zod";
import type { BlogPost, SEOMetadata } from "@/lib/blog/schema";

// Tipos mínimos para respuestas de la API
type ApiTag = { id: string; name: string; slug: string };
type ApiAvatar = {
    id?: string;
    name?: string;
    avatar?: string | null;
    bio?: string | null;
    role?: string | null;
    socialLinks?: Record<string, string>;
};
type ApiCategoryFull = { id: string; name: string; slug: string };

type ApiLiteSeo = {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: { src?: string; alt?: string; caption?: string };
    ogSiteName?: string;
    ogLocale?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    ogType?: string;
    ogImage?: { url?: string; alt?: string; width?: number; height?: number };
    canonicalUrl?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterUrl?: string;
    twitterImage?: { src?: string; alt?: string; credit?: string };
    robots?: {
        index?: boolean;
        follow?: boolean;
        maxSnippet?: number;
        maxImagePreview?: string;
        maxVideoPreview?: number;
    };
    structuredData?: Record<string, unknown>;
    breadcrumbs?: Array<{ name: string; url: string; position: number }>;
    language?: string;
};

type ApiDetailSeo = ApiLiteSeo;

type ApiLitePost = {
    id: string;
    slug: string;
    title?: string;
    subtitle?: string;
    excerpt?: string;
    status?: string;
    featured?: boolean;
    views?: number;
    likes?: number;
    shares?: number;
    commentsEnabled?: boolean;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: ApiTag[];
    category?: string;
    categoryFull?: ApiCategoryFull;
    coverImage?: { src?: string; alt?: string; caption?: string };
    avatar?: ApiAvatar;
    author?: ApiAvatar;
    seo?: ApiLiteSeo;
    estimatedReadTime?: number;
    relatedPosts?: Array<{ id: string; title?: string; slug: string; coverImage?: { src: string; alt: string } }>;
};

type ApiDetailPost = ApiLitePost & {
    seo?: ApiDetailSeo;
    content?: unknown[];
};


const defaultResponse: getBlogsActionResponseSchema = {
    posts: [],
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 0,
        hasNext: false,
        hasPrevious: false,
        nextPage: 0,
        previousPage: 0,
    },
    filters: BlogFilterSchema.parse({})
}


export const getWithdrawalsAction = async (body: z.infer<typeof BlogFilterSchema>): Promise<getBlogsActionResponseSchema> => {

    try {
        const resp = await getBlogsService(body)
        if (resp && resp.success) {
            return { ...resp.data };
        }
        else return defaultResponse
    } catch (error) {
        throw error
    }
}

// ---------- Normalizadores de respuesta API → BlogPost (UI) ----------
function normalizeSeoFromLite(post: ApiLitePost): SEOMetadata {
    const imageSrc: string | undefined = post?.seo?.image?.src || post?.coverImage?.src;
    const imageAlt: string = post?.seo?.image?.alt || post?.coverImage?.alt || post?.title || "";
    return {
        title: post?.seo?.title || post?.title || "",
        description: post?.seo?.description || post?.excerpt || "",
        keywords: Array.isArray(post?.seo?.keywords) ? post.seo.keywords : [],
        canonicalUrl: post?.seo?.canonicalUrl,
        ogImage: {
            url: imageSrc || "",
            alt: imageAlt,
            width: 1200,
            height: 630,
        },
        ogType: "article",
        twitterCard: post?.seo?.twitterCard || "summary_large_image",
        ogSiteName: post?.seo?.ogSiteName,
        ogLocale: post?.seo?.ogLocale,
    } as SEOMetadata;
}

function normalizeSeoFromDetail(post: ApiDetailPost): SEOMetadata {
    const s = post?.seo || {};
    const og = s.ogImage || {};
    return {
        title: s.title || post?.title || "",
        description: s.description || post?.excerpt || "",
        keywords: Array.isArray(s.keywords) ? s.keywords : [],
        canonicalUrl: s.canonicalUrl,
        language: s.language,

        ogTitle: s.ogTitle,
        ogDescription: s.ogDescription,
        ogUrl: s.ogUrl,
        ogImage: {
            url: og.url || post?.coverImage?.src || "",
            alt: og.alt || post?.coverImage?.alt || post?.title || "",
            width: typeof og.width === "number" ? og.width : 1200,
            height: typeof og.height === "number" ? og.height : 630,
        },
        ogType: s.ogType || "article",
        ogSiteName: s.ogSiteName,
        ogLocale: s.ogLocale,

        twitterTitle: s.twitterTitle,
        twitterDescription: s.twitterDescription,
        twitterUrl: s.twitterUrl,
        twitterImage: s.twitterImage,
        twitterCard: s.twitterCard || "summary_large_image",

        robots: s.robots,
        structuredData: s.structuredData,
        breadcrumbs: s.breadcrumbs,
    } as SEOMetadata;
}

function normalizeAuthor(api: ApiLitePost | ApiDetailPost) {
    const a = api?.avatar || api?.author || {};
    return {
        id: a?.id || "",
        name: a?.name || "Autor",
        avatar: a?.avatar || undefined,
        role: a?.role || undefined,
        bio: a?.bio || undefined,
        socialLinks: a?.socialLinks || {},
    };
}

function normalizeLitePost(apiPost: ApiLitePost): BlogPost {
    return {
        id: apiPost?.id,
        slug: apiPost?.slug,
        publishedAt: apiPost?.publishedAt || apiPost?.createdAt || new Date().toISOString(),
        updatedAt: apiPost?.updatedAt,
        status: apiPost?.status || "published",
        featured: apiPost?.featured || false,
        seo: normalizeSeoFromLite(apiPost),
        author: normalizeAuthor(apiPost),
        // No siempre viene categoría en lite
        category: apiPost?.category || apiPost?.categoryFull?.name,
        categoryFull: apiPost?.categoryFull,
        tags: Array.isArray(apiPost?.tags) ? apiPost.tags : [],
        title: apiPost?.title || "",
        subtitle: apiPost?.subtitle,
        excerpt: apiPost?.excerpt || "",
        estimatedReadTime: apiPost?.estimatedReadTime || 8,
        coverImage: {
            src: apiPost?.coverImage?.src || apiPost?.seo?.image?.src || "",
            alt: apiPost?.coverImage?.alt || apiPost?.seo?.image?.alt || apiPost?.title || "",
            caption: apiPost?.coverImage?.caption || apiPost?.seo?.image?.caption,
        },
        content: [],
        relatedPosts: apiPost?.relatedPosts,
        views: apiPost?.views,
        likes: apiPost?.likes,
        shares: apiPost?.shares,
        commentsEnabled: apiPost?.commentsEnabled,
    } as BlogPost;
}

function normalizeDetailPost(apiPost: ApiDetailPost): BlogPost {
    return {
        id: apiPost?.id,
        slug: apiPost?.slug,
        publishedAt: apiPost?.publishedAt || apiPost?.createdAt || new Date().toISOString(),
        updatedAt: apiPost?.updatedAt,
        status: apiPost?.status || "published",
        featured: apiPost?.featured || false,
        seo: normalizeSeoFromDetail(apiPost),
        author: normalizeAuthor(apiPost),
        category: apiPost?.category,
        categoryFull: apiPost?.categoryFull,
        tags: Array.isArray(apiPost?.tags) ? apiPost.tags : [],
        title: apiPost?.title || "",
        subtitle: apiPost?.subtitle,
        excerpt: apiPost?.excerpt || "",
        estimatedReadTime: apiPost?.estimatedReadTime || 8,
        coverImage: {
            src: apiPost?.coverImage?.src || apiPost?.seo?.ogImage?.url || "",
            alt: apiPost?.coverImage?.alt || apiPost?.seo?.ogImage?.alt || apiPost?.title || "",
            caption: apiPost?.coverImage?.caption,
        },
        content: Array.isArray(apiPost?.content) ? apiPost.content : [],
        relatedPosts: apiPost?.relatedPosts,
        views: apiPost?.views,
        likes: apiPost?.likes,
        shares: apiPost?.shares,
        commentsEnabled: apiPost?.commentsEnabled,
    } as BlogPost;
}

export const getBlogsLiteAction = async (filters: z.infer<typeof BlogLiteFilterSchema>) => {
    try {
        const resp = await getBlogsLiteService(filters)
        if (!resp?.success) return { blogs: [], totalCount: 0, pagination: undefined };
        const posts = Array.isArray(resp.data?.posts) ? resp.data.posts : [];
        const blogs: BlogPost[] = posts.map(normalizeLitePost);
        const pagination = resp.data?.pagination;
        const totalCount = pagination?.totalItems || blogs.length;
        return { blogs, totalCount, pagination };
    } catch (error) {
        throw error
    }
}

export const getBlogBySlugAction = async (slug: string) => {
    try {
        const resp = await getBlogBySlugService(slug)
        if (!resp?.success) return { blog: undefined };
        const blog: BlogPost = normalizeDetailPost(resp.data);
        return { blog };
    } catch (error) {
        throw error
    }
}

export const getRelatedBlogsAction = async (id: string, limit?: number) => {
    try {
        const resp = await getRelatedBlogsService(id, limit)
        if (!resp?.success) return { blogs: [] as BlogPost[] };
        const posts: ApiLitePost[] = Array.isArray(resp.data?.posts) ? resp.data.posts : [];
        const blogs: BlogPost[] = posts.map((p: ApiLitePost) => normalizeLitePost(p));
        return { blogs };
    } catch (error) {
        throw error
    }
}
