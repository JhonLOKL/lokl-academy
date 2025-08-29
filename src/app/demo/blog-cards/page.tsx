"use client";

import React from "react";
import BlogCard from "@/components/lokl-academy/components/blog-card";
import { H1, H2, Paragraph } from "@/components/design-system";

// Datos de ejemplo
const mockBlog = {
  id: "1",
  title: "Tendencias del Mercado Inmobiliario 2025",
  slug: "tendencias-mercado-inmobiliario-2025",
  excerpt: "Análisis profundo de las tendencias emergentes en el sector inmobiliario. Exploramos las oportunidades de inversión más prometedoras para el próximo año y cómo aprovecharlas.",
  content: [],
  publishedAt: "2024-06-10T00:00:00.000Z",
  estimatedReadTime: 8,
  category: "Mercado",
  featured: true,
  status: "published" as const,
  seo: {
    title: "Tendencias del Mercado Inmobiliario 2025",
    description: "Análisis profundo de las tendencias emergentes en el sector inmobiliario",
    keywords: ["mercado inmobiliario", "tendencias", "inversión"],
    ogImage: {
      url: "/images/digital-charts.jpg",
      alt: "Análisis de mercado inmobiliario",
      width: 1200,
      height: 630
    },
    ogType: "article" as const,
    twitterCard: "summary_large_image" as const
  },
  tags: [
    { id: "1", name: "Mercado", slug: "mercado" },
    { id: "2", name: "Tendencias", slug: "tendencias" }
  ],
  coverImage: {
    src: "/images/digital-charts.jpg",
    alt: "Análisis de mercado inmobiliario",
  },
  author: {
    id: "1",
    name: "Carlos Rodríguez",
    role: "Analista de Mercado",
    avatar: "/images/authors/carlos-rodriguez.jpg",
    bio: "Experto en análisis de mercado inmobiliario con más de 10 años de experiencia."
  },
};

const mockBlog2 = {
  id: "2",
  title: "Financiamiento Inteligente para Propiedades",
  slug: "financiamiento-inteligente-propiedades",
  excerpt: "Estrategias avanzadas de financiamiento que todo inversionista inmobiliario debe conocer. Aprende a optimizar tu apalancamiento financiero y maximizar el retorno de inversión.",
  content: [],
  publishedAt: "2024-06-05T00:00:00.000Z",
  estimatedReadTime: 15,
  category: "Finanzas",
  featured: false,
  status: "published" as const,
  seo: {
    title: "Financiamiento Inteligente para Propiedades",
    description: "Estrategias avanzadas de financiamiento que todo inversionista inmobiliario debe conocer",
    keywords: ["financiamiento", "propiedades", "inversión"],
    ogImage: {
      url: "/images/skyscraper-bw.jpg",
      alt: "Estrategias de financiamiento inmobiliario",
      width: 1200,
      height: 630
    },
    ogType: "article" as const,
    twitterCard: "summary_large_image" as const
  },
  tags: [
    { id: "3", name: "Finanzas", slug: "finanzas" },
    { id: "4", name: "Financiamiento", slug: "financiamiento" }
  ],
  coverImage: {
    src: "/images/skyscraper-bw.jpg",
    alt: "Estrategias de financiamiento inmobiliario",
  },
  author: {
    id: "2",
    name: "María González",
    role: "Asesora Financiera",
    avatar: "/images/authors/maria-gonzalez.jpg",
    bio: "Especialista en financiamiento inmobiliario con amplia experiencia en estrategias de inversión."
  },
};

export default function BlogCardsDemo() {
  return (
    <div className="container mx-auto py-12 px-4">
      <H1 variant="page-title" className="mb-8">Demo de Tarjetas de Blog</H1>
      
      <section className="mb-16">
        <H2 variant="section" className="mb-4">Variante Default</H2>
        <Paragraph variant="lead" className="mb-8">
          La variante default muestra una tarjeta de blog estándar con imagen, título, extracto y autor.
        </Paragraph>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Paragraph className="mb-2">Con hover:</Paragraph>
            <BlogCard blog={mockBlog} hovered={true} />
          </div>
          <div>
            <Paragraph className="mb-2">Sin hover:</Paragraph>
            <BlogCard blog={mockBlog2} />
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <H2 variant="section" className="mb-4">Variante Featured</H2>
        <Paragraph variant="lead" className="mb-8">
          La variante featured muestra una tarjeta de blog destacada con diseño horizontal en pantallas medianas y grandes.
        </Paragraph>
        
        <div className="space-y-8">
          <div>
            <Paragraph className="mb-2">Con hover:</Paragraph>
            <BlogCard blog={mockBlog} variant="featured" hovered={true} />
          </div>
          <div>
            <Paragraph className="mb-2">Sin hover:</Paragraph>
            <BlogCard blog={mockBlog2} variant="featured" />
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <H2 variant="section" className="mb-4">Variante Compact</H2>
        <Paragraph variant="lead" className="mb-8">
          La variante compact muestra una versión reducida de la tarjeta de blog, ideal para barras laterales o listas compactas.
        </Paragraph>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Paragraph className="mb-2">Con hover:</Paragraph>
            <div className="space-y-4">
              <BlogCard blog={mockBlog} variant="compact" hovered={true} />
              <BlogCard blog={mockBlog2} variant="compact" hovered={true} />
            </div>
          </div>
          <div>
            <Paragraph className="mb-2">Sin hover:</Paragraph>
            <div className="space-y-4">
              <BlogCard blog={mockBlog} variant="compact" />
              <BlogCard blog={mockBlog2} variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
