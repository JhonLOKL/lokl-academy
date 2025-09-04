"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { NewsletterItem } from "@/lib/course/schema";

interface NewsletterCardProps {
  item: NewsletterItem;
  variant?: "default" | "compact";
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({
  item,
  variant = "default",
}) => {
  // Formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Obtener etiqueta según el tipo
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case "blog":
        return "Blog";
      case "news":
        return "Noticia";
      case "trend":
        return "Tendencia";
      case "announcement":
        return "Anuncio";
      default:
        return type;
    }
  };

  // Obtener color según el tipo
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "blog":
        return "bg-blue-100 text-blue-700";
      case "news":
        return "bg-green-100 text-green-700";
      case "trend":
        return "bg-purple-100 text-purple-700";
      case "announcement":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md">
      {/* Imagen destacada */}
      {item.featuredImage && variant === "default" && (
        <div className="relative h-48 w-full">
          <Image
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 bg-black/70 px-2 py-1">
            <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${getTypeColor(item.type)}`}>
              {getTypeLabel(item.type)}
            </span>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-4">
        {/* Etiqueta de tipo (solo para variante compacta) */}
        {variant === "compact" && (
          <div className="mb-2">
            <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${getTypeColor(item.type)}`}>
              {getTypeLabel(item.type)}
            </span>
          </div>
        )}

        {/* Título */}
        <Link href={`/blog/${item.id}`} className="group-hover:text-[#5352F6]">
          <h3 className={`font-bold tracking-tight ${variant === "compact" ? "mb-2 text-base" : "mb-2 text-lg"}`}>
            {item.title}
          </h3>
        </Link>

        {/* Extracto */}
        {variant === "default" && (
          <p className="mb-3 line-clamp-2 text-sm text-[#6D6C6C]">
            {item.excerpt}
          </p>
        )}

        {/* Metadatos */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6D6C6C]">
          {/* Fecha */}
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(item.publishedAt)}
          </div>

          {/* Autor */}
          {item.author && (
            <div className="flex items-center">
              <div className="relative mr-1 h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src={item.author.avatar}
                  alt={item.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              {item.author.name}
            </div>
          )}

          {/* Estadísticas de engagement */}
          {variant === "default" && (
            <div className="flex items-center gap-3">
              <span>{item.views} vistas</span>
              <span>{item.likes} me gusta</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterCard;
