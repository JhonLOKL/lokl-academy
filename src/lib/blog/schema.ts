// Blog Schema para validación y tipado
// Este esquema define la estructura completa para blogs con enfoque SEO

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  author?: string;
  language?: string; // Por ejemplo: "es-CO", "es-ES", etc.
  
  // Open Graph
  ogImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  ogType: "article" | "website";
  ogSiteName?: string;
  ogLocale?: string; // Por ejemplo: "es_CO", "es_ES", etc.
  
  // Twitter Cards
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  
  // Robots
  robots?: {
    index?: boolean;
    follow?: boolean;
    maxSnippet?: number;
    maxImagePreview?: "none" | "standard" | "large";
    maxVideoPreview?: number;
  };
  
  // Colores de tema
  themeColor?: string;
  msTileColor?: string;
  
  // Recursos críticos para precargar
  preloadResources?: Array<{
    href: string;
    as: "font" | "image" | "style" | "script";
    type?: string;
    crossOrigin?: "anonymous" | "use-credentials";
  }>;
  
  // Datos estructurados (Schema.org)
  structuredData?: Record<string, unknown>;
  
  // Breadcrumbs para Schema.org
  breadcrumbs?: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}

export type ContentBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "gallery"
  | "video"
  | "quote"
  | "list"
  | "code"
  | "table"
  | "callout"
  | "columns"
  | "divider"
  | "embed"
  | "cta"
  | "faq"
  | "testimonial"
  | "statistic"
  | "timeline"
  | "chart";

// Interfaces para cada tipo de bloque de contenido
export interface BaseBlock {
  id: string;
  type: ContentBlockType;
  anchor?: string; // Para enlaces internos y navegación
  className?: string; // Para estilos personalizados
  animation?: {
    type: string;
    delay?: number;
    duration?: number;
  };
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  highlight?: boolean;
  highlightColor?: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: string;
  dropCap?: boolean;
  size?: "small" | "medium" | "large";
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  loading?: "lazy" | "eager";
  responsive?: boolean;
  sizes?: string;
}

export interface GalleryBlock extends BaseBlock {
  type: "gallery";
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  layout?: "grid" | "carousel" | "masonry";
  columns?: number;
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  provider?: "youtube" | "vimeo" | "self-hosted";
  transcript?: string; // Para SEO y accesibilidad
}

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  content: string;
  author?: string;
  citation?: string;
  style?: "default" | "large" | "bordered";
}

export interface ListBlock extends BaseBlock {
  type: "list";
  style: "unordered" | "ordered" | "checked";
  items: Array<{
    content: string;
    checked?: boolean; // Para listas de verificación
    subItems?: Array<{
      content: string;
      checked?: boolean;
    }>;
  }>;
}

export interface CodeBlock extends BaseBlock {
  type: "code";
  code: string;
  language: string;
  showLineNumbers?: boolean;
  highlight?: number[];
  caption?: string;
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
  responsive?: boolean;
}

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  content: string;
  icon?: string;
  variant: "info" | "warning" | "success" | "error" | "tip";
}

export interface ColumnsBlock extends BaseBlock {
  type: "columns";
  columns: Array<{
    width: string; // Por ejemplo: "1/2", "1/3", "2/3", etc.
    blocks: ContentBlock[];
  }>;
  gap?: string;
  stackBelow?: "sm" | "md" | "lg" | "xl";
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
  style?: "solid" | "dashed" | "dotted" | "double";
  width?: string;
  color?: string;
}

export interface EmbedBlock extends BaseBlock {
  type: "embed";
  url: string;
  title?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  provider?: "twitter" | "instagram" | "tiktok" | "other";
}

export interface CTABlock extends BaseBlock {
  type: "cta";
  heading: string;
  content?: string;
  buttonText: string;
  buttonUrl: string;
  buttonVariant?: "primary" | "secondary" | "outline";
  background?: string;
}

export interface FAQBlock extends BaseBlock {
  type: "faq";
  items: Array<{
    question: string;
    answer: string;
  }>;
  schema?: boolean; // Incluir schema.org para FAQ
}

export interface TestimonialBlock extends BaseBlock {
  type: "testimonial";
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface StatisticBlock extends BaseBlock {
  type: "statistic";
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  items: Array<{
    date: string;
    title: string;
    content: string;
    icon?: string;
  }>;
}

export interface ChartBlock extends BaseBlock {
  type: "chart";
  chartType: "bar" | "line" | "pie" | "radar" | "area";
  data: Record<string, unknown>;
  options?: Record<string, unknown>;
  height?: number;
  width?: number;
}

// Tipo unión para todos los bloques de contenido
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | GalleryBlock
  | VideoBlock
  | QuoteBlock
  | ListBlock
  | CodeBlock
  | TableBlock
  | CalloutBlock
  | ColumnsBlock
  | DividerBlock
  | EmbedBlock
  | CTABlock
  | FAQBlock
  | TestimonialBlock
  | StatisticBlock
  | TimelineBlock
  | ChartBlock;

// Estructura principal del blog
export interface BlogPost {
  id: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  status: "draft" | "published" | "archived";
  featured?: boolean;
  
  // Metadatos SEO
  seo: SEOMetadata;
  
  // Información del autor
  author: Author;
  
  // Categorización
  category?: string; // Categoría simplificada para el componente
  categoryFull?: {
    id: string;
    name: string;
    slug: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  
  // Contenido del blog
  title: string;
  subtitle?: string;
  excerpt: string;
  estimatedReadTime: number;
  coverImage: {
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
  };
  
  // Bloques de contenido
  content: ContentBlock[];
  
  // Relacionados
  relatedPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    coverImage: {
      src: string;
      alt: string;
    };
  }>;
  
  // Analítica y engagement
  views?: number;
  likes?: number;
  shares?: number;
  
  // Configuración de comentarios
  commentsEnabled?: boolean;
}
