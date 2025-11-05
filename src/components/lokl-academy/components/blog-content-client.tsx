"use client";

import React, { useState } from "react";
import SafeImage from "@/components/ui/safe-image";
import { motion } from "framer-motion";
import { Paragraph } from "@/components/design-system";
import { ContentBlock, Author } from "@/lib/blog/schema";
import { BlogTags, AuthorProfile, LoklCTABanner } from "./index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
// CSS de Swiper movido a globals.css para optimizar la carga y reducir la cadena de solicitudes críticas
import { ChevronLeft, ChevronRight, Copy, Check, Star, ChevronUp, ChevronDown } from "lucide-react";
import { LineChart } from "@/components/design-system/ui/charts/line-chart";
import { BarChart } from "@/components/design-system/ui/charts/bar-chart";
import { AreaChart } from "@/components/design-system/ui/charts/area-chart";
import { PieChart } from "@/components/design-system/ui/charts/pie-chart";
import { RadarChart } from "@/components/design-system/ui/charts/radar-chart";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

function CodeBlockView({
  code,
  caption,
  highlight,
  showLineNumbers,
  className,
}: {
  code: string;
  caption?: string;
  highlight?: number[];
  showLineNumbers?: boolean;
  className?: string;
}) {
  const lines = (code || "").split("\n");
  const highlighted = new Set<number>(highlight || []);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <div className={`mb-8 ${className || ""}`}>
      <div className="mb-2 flex items-center justify-between">
        {caption ? <div className="text-sm text-[#6D6C6C]">{caption}</div> : <div />}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md border border-[#E5E5E5] bg-white px-2 py-1 text-xs text-[#0F0F0F] hover:bg-[#F7F7FB]"
          aria-label={copied ? "Copiado" : "Copiar código"}
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-[#6D6C6C]" />}
          <span>{copied ? "Copiado" : "Copiar"}</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#E5E5E5] bg-white">
        <pre className="m-0 p-4 text-sm leading-6 text-[#0F0F0F] font-mono">
          {lines.map((line, idx) => {
            const lineNo = idx + 1;
            const isHL = highlighted.has(lineNo);
            return (
              <div key={idx} className={`flex ${isHL ? "bg-[#EEEEFE]" : ""}`}>
                {showLineNumbers && (
                  <span className="mr-4 select-none pr-3 text-[#6D6C6C]">{lineNo}</span>
                )}
                <code className="whitespace-pre">{line.length ? line : "\u00A0"}</code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

function GalleryCarousel({
  images,
  className,
}: {
  images: Array<{ src: string; alt: string; caption?: string; width?: number; height?: number }>;
  className?: string;
}) {
  return (
    <div className={`mb-8 ${className || ""}`}>
      <div className="mb-3 flex justify-end gap-2">
        <button
          className="blog-gallery-prev inline-flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white p-2 text-[#0F0F0F] shadow-sm hover:bg-[#F7F7FB]"
          type="button"
          aria-label="Anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="blog-gallery-next inline-flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white p-2 text-[#0F0F0F] shadow-sm hover:bg-[#F7F7FB]"
          type="button"
          aria-label="Siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{ prevEl: ".blog-gallery-prev", nextEl: ".blog-gallery-next" }}
        pagination={{ el: ".blog-gallery-pagination", clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "grayscale(1)" }}
              whileInView={{ opacity: 1, y: 0, filter: "grayscale(0)" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[220px] md:h-[280px]"
            >
              <SafeImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                fallbackSrc="/images/modern-building.jpg"
              />
              {image.caption && (
                <div className="absolute bottom-0 w-full bg-black/50 p-2 text-center text-sm text-white">
                  {image.caption}
                </div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-3 flex justify-center">
        <div className="blog-gallery-pagination"></div>
      </div>
    </div>
  );
}

// Componente para renderizar los diferentes tipos de bloques de contenido
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "heading":
      const HeadingTag = (`h${block.level}`) as React.ElementType;
      return (
        <HeadingTag
          id={block.anchor}
          className={`mb-4 mt-8 font-bold ${block.level === 1 ? "text-3xl md:text-4xl text-[#5352F6]" :
              block.level === 2 ? "text-2xl md:text-3xl border-b border-[#E5E5E5] pb-2" :
                block.level === 3 ? "text-xl md:text-2xl text-[#5352F6]/80" :
                  "text-lg md:text-xl"
            } ${block.className || ""}`}
        >
          {block.content}
        </HeadingTag>
      );

    case "paragraph":
      return (
        <p className={`mb-6 leading-relaxed ${block.className || ""} ${block.size === "small" ? "text-sm" :
            block.size === "large" ? "text-lg" :
              "text-base"
          } ${block.dropCap ? "first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-[#5352F6]" : ""}`}>
          {block.content}
        </p>
      );

    case "image":
      return (
        <figure className={`mb-8 ${block.className || ""}`}>
          <div className="relative h-[300px] w-full md:h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "grayscale(1)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "grayscale(0)" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
              <SafeImage
                src={block.src}
                alt={block.alt}
                fill
                className="rounded-lg object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                loading={block.loading || "lazy"}
                fallbackSrc="/images/modern-building.jpg"
              />
            </motion.div>
          </div>
          {(block.caption || block.credit) && (
            <figcaption className="mt-2 text-center text-sm text-[#6D6C6C]">
              {block.caption}
              {block.caption && block.credit && " - "}
              {block.credit && <span className="italic">{block.credit}</span>}
            </figcaption>
          )}
        </figure>
      );

    case "gallery":
      if (block.layout === "carousel") {
        return <GalleryCarousel images={block.images} className={block.className} />;
      }
      if (block.layout === "masonry") {
        return (
          <div className={`mb-8 ${block.className || ""}`}>
            <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
              {block.images.map((image, index) => (
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "grayscale(1)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "grayscale(0)" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="mb-4 overflow-hidden rounded-lg"
                  style={{ breakInside: "avoid" }}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width || 1200}
                    height={image.height || 800}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-auto w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-[1.02]"
                    fallbackSrc="/images/modern-building.jpg"
                  />
                  {image.caption && (
                    <figcaption className="mt-2 text-center text-sm text-[#6D6C6C]">
                      {image.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className={`mb-8 ${block.className || ""}`}>
          <div className={`grid gap-4 ${block.columns === 2 ? "grid-cols-1 md:grid-cols-2" :
              block.columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
                block.columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
                  "grid-cols-1 md:grid-cols-3"
            }`}>
            {block.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, filter: "grayscale(1)" }}
                whileInView={{ opacity: 1, y: 0, filter: "grayscale(0)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-[200px]"
              >
                <div className="relative h-full w-full">
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="rounded-lg object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                    fallbackSrc="/images/modern-building.jpg"
                  />
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 w-full bg-black/50 p-2 text-center text-sm text-white">
                    {image.caption}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "video":
      {
        const toYouTubeEmbed = (url: string): string | null => {
          try {
            const u = new URL(url);
            if (u.hostname.includes("youtube.com")) {
              // https://www.youtube.com/watch?v=VIDEO_ID → /embed/VIDEO_ID
              const id = u.searchParams.get("v");
              if (id) return `https://www.youtube.com/embed/${id}`;
              // already /embed/
              if (u.pathname.startsWith("/embed/")) return url;
            }
            if (u.hostname === "youtu.be") {
              const id = u.pathname.replace("/", "");
              if (id) return `https://www.youtube.com/embed/${id}`;
            }
          } catch { }
          return null;
        };

        const toVimeoEmbed = (url: string): string | null => {
          try {
            const u = new URL(url);
            if (u.hostname.includes("vimeo.com")) {
              // https://vimeo.com/VIDEO_ID → https://player.vimeo.com/video/VIDEO_ID
              const match = u.pathname.match(/\/(\d+)/);
              if (match?.[1]) return `https://player.vimeo.com/video/${match[1]}`;
              if (u.hostname === "player.vimeo.com" && u.pathname.startsWith("/video/")) return url;
            }
          } catch { }
          return null;
        };

        const provider = block.provider || (toYouTubeEmbed(block.src) ? "youtube" : toVimeoEmbed(block.src) ? "vimeo" : "self-hosted");

        if (provider === "youtube") {
          const embedUrl = toYouTubeEmbed(block.src) || block.src;
          return (
            <div className={`mb-8 ${block.className || ""}`}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={embedUrl}
                  title={block.caption || "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute left-0 top-0 h-full w-full border-0"
                />
              </div>
              {block.caption && (
                <p className="mt-2 text-center text-sm text-[#6D6C6C]">{block.caption}</p>
              )}
              {block.transcript && (
                <details className="mt-4 rounded-lg border border-[#E5E5E5] p-4">
                  <summary className="cursor-pointer font-medium">Transcripción</summary>
                  <div className="mt-2 text-sm">{block.transcript}</div>
                </details>
              )}
            </div>
          );
        }

        if (provider === "vimeo") {
          const embedUrl = toVimeoEmbed(block.src) || block.src;
          return (
            <div className={`mb-8 ${block.className || ""}`}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={embedUrl}
                  title={block.caption || "Video"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute left-0 top-0 h-full w-full border-0"
                />
              </div>
              {block.caption && (
                <p className="mt-2 text-center text-sm text-[#6D6C6C]">{block.caption}</p>
              )}
            </div>
          );
        }

        // Self-hosted or other providers
        return (
          <div className={`mb-8 ${block.className || ""}`}>
            <video
              src={block.src}
              poster={block.poster}
              controls={block.controls !== false}
              autoPlay={block.autoplay}
              loop={block.loop}
              muted={block.muted}
              className="w-full rounded-lg"
            />
            {block.caption && (
              <p className="mt-2 text-center text-sm text-[#6D6C6C]">{block.caption}</p>
            )}
          </div>
        );
      }

    case "quote":
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={`mb-8 border-l-4 border-[#5352F6] bg-gradient-to-r from-[#F7F7FB] to-white p-6 ${block.style === "large" ? "text-xl" : "text-base"
            } ${block.className || ""}`}
        >
          <p className="italic">{block.content}</p>
          {(block.author || block.citation) && (
            <footer className="mt-2 text-right text-sm">
              {block.author && <strong className="text-[#5352F6]">{block.author}</strong>}
              {block.author && block.citation && ", "}
              {block.citation && <cite>{block.citation}</cite>}
            </footer>
          )}
        </motion.blockquote>
      );

    case "statistic":
      return (
        <div className={`mb-8 ${block.className || ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#5352F6] to-[#7A79F9] p-6 shadow-md"
          >
            <div className="flex flex-col items-center justify-center text-center">
              {/* Valor principal con prefijo/sufijo */}
              <div className="mb-3 flex items-center justify-center">
                {block.prefix && (
                  <span className="mr-1 text-4xl md:text-5xl font-medium text-white/80">{block.prefix}</span>
                )}
                <span className="text-4xl font-bold text-white md:text-5xl">
                  {block.value}
                </span>
                {block.suffix && (
                  <span className="ml-2 text-xl font-medium text-white/80">{block.suffix}</span>
                )}
              </div>
              
              {/* Etiqueta/título */}
              <h3 className="mb-4 text-lg font-bold text-white md:text-xl">{block.label}</h3>
              
              {/* Tendencia (si existe) */}
              {block.trendValue && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div 
                    className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      block.trend === "up" 
                        ? "bg-white/20 text-white border border-white/30" 
                        : block.trend === "down" 
                        ? "bg-white/10 text-white/90 border border-white/20" 
                        : "bg-white/30 text-white border border-white/40"
                    }`}
                  >
                    {block.trend === "up" && <ChevronUp className="mr-1 h-4 w-4" />}
                    {block.trend === "down" && <ChevronDown className="mr-1 h-4 w-4" />}
                    {block.trendValue}
                  </div>
                </div>
              )}
              
              {/* Icono (si existe) */}
              {block.icon && (
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-white">{block.icon}</span>
                </div>
              )}
            </div>
            
            {/* Decoración de fondo */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white/5"></div>
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/5"></div>
          </motion.div>
        </div>
      );

    case "timeline":
      return (
        <div className={`mb-12 ${block.className || ""}`}>
          {/* Timeline moderno con estilo LOKL */}
          <div className="relative">
            {/* Controles de navegación para desktop */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0F0F0F] md:text-2xl">
                <span className="bg-gradient-to-r from-[#5352F6] to-[#7A79F9] bg-clip-text text-transparent">
                  Cronología
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="blog-timeline-prev inline-flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white p-2 text-[#0F0F0F] shadow-sm transition-colors hover:border-[#5352F6] hover:text-[#5352F6]"
                  type="button"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="blog-timeline-next inline-flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white p-2 text-[#0F0F0F] shadow-sm transition-colors hover:border-[#5352F6] hover:text-[#5352F6]"
                  type="button"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Mobile: Timeline vertical con tarjetas modernas */}
            <div className="md:hidden">
              <div className="relative space-y-10 pb-10">
                {block.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative"
                  >
                    {/* Línea conectora */}
                    {idx < block.items.length - 1 && (
                      <div className="absolute bottom-0 left-4 top-0 w-0.5 translate-x-1/2 bg-gradient-to-b from-[#5352F6] to-[#E5E5E5]"></div>
                    )}
                    
                    {/* Tarjeta con contenido */}
                    <div className="relative ml-12">
                      {/* Marcador de fecha con número */}
                      <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5352F6] to-[#7A79F9] text-white shadow-md">
                        <span className="text-xs font-bold">{idx + 1}</span>
                      </div>
                      
                      {/* Contenido de la tarjeta */}
                      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                        <div className="border-b border-[#E5E5E5] bg-[#F7F7FB] px-4 py-2">
                          <div className="text-sm font-medium text-[#5352F6]">{item.date}</div>
                        </div>
                        <div className="p-4">
                          <h4 className="mb-2 text-lg font-bold text-[#0F0F0F]">{item.title}</h4>
                          <p className="text-sm text-[#6D6C6C]">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Timeline horizontal con tarjetas modernas */}
            <div className="relative hidden md:block">
              <Swiper
                modules={[Navigation, A11y, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  prevEl: ".blog-timeline-prev",
                  nextEl: ".blog-timeline-next"
                }}
                pagination={{
                  el: ".blog-timeline-pagination",
                  clickable: true
                }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="timeline-swiper"
              >
                {block.items.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="h-full"
                    >
                      {/* Tarjeta con contenido */}
                      <div className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                        {/* Barra superior con fecha y número */}
                        <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-[#F7F7FB] px-4 py-3">
                          <div className="text-sm font-medium text-[#5352F6]">{item.date}</div>
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white group-hover:bg-[#7A79F9]">
                            <span className="text-xs font-bold">{idx + 1}</span>
                          </div>
                        </div>
                        
                        {/* Contenido principal */}
                        <div className="flex flex-1 flex-col p-5">
                          <h4 className="mb-3 text-lg font-bold text-[#0F0F0F]">{item.title}</h4>
                          <p className="text-sm text-[#6D6C6C]">{item.content}</p>
                        </div>
                        
                        {/* Borde inferior decorativo */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#5352F6] to-[#7A79F9]"></div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Paginación */}
              <div className="mt-6 flex justify-center">
                <div className="blog-timeline-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "chart":
      {
        const height = (block.height as number) || 350; // Altura aumentada por defecto
        const options = (block.options as Record<string, unknown>) || {};
        const chartType = block.chartType as string;
        
        // Procesar opciones comunes para gráficos
        const showLegend = options.legend !== false;
        const legendPosition = options.legendPosition as "right" | "bottom" || "bottom";
        const showGrid = options.grid !== false;
        const showTooltip = options.tooltip !== false;
        const showLabels = options.labels === true;
        const innerRadius = options.innerRadius as number || 0;
        const outerRadius = options.outerRadius as number || 100;

        type Dataset = { data: number[]; label?: string; color?: string; colors?: string[] };
        type ChartDatasetShape = { labels: string[]; datasets: Dataset[] };
        const rawUnknown = block.data as unknown;
        const isDatasetFormat = !!(rawUnknown as ChartDatasetShape)?.labels && !!(rawUnknown as ChartDatasetShape)?.datasets;

        // Paleta LOKL mejorada con tonos más variados
        const defaultColors = [
          "#5352F6", // Azul LOKL principal
          "#7A79F9", // Azul LOKL secundario
          "#A1A0FB", // Azul LOKL claro
          "#3B3A9D", // Azul LOKL oscuro
          "#FF6B6B", // Rojo complementario
          "#4ECDC4", // Verde-azulado complementario
          "#FFD166", // Amarillo complementario
          "#0F0F0F", // Negro
          "#6D6C6C", // Gris oscuro
          "#919090"  // Gris claro
        ];

        let chart: React.ReactNode = null;
        const metricTitle = (options as { title?: string }).title || "";

        // Preparar datos para gráficos
        if (chartType === "pie") {
          let pieData: { name: string; value: number; color?: string }[] = [];
          if (isDatasetFormat) {
            const { labels, datasets } = rawUnknown as ChartDatasetShape;
            const dataset = datasets[0] || { data: [] };
            pieData = labels.map((label: string, idx: number) => ({
              name: label,
              value: Number(dataset.data[idx] ?? 0),
              color: dataset.colors?.[idx] || defaultColors[idx % defaultColors.length],
            }));
          } else if (Array.isArray(rawUnknown)) {
            pieData = (rawUnknown as Array<{ name: string; value: number; color?: string }>);
          }
          chart = <PieChart 
            data={pieData} 
            height={height}
            showTooltip={showTooltip}
            showLabels={showLabels}
            innerRadius={chartType === "pie" ? innerRadius : 70}
            outerRadius={outerRadius}
            legendPosition={legendPosition}
          />;
        } else if (chartType === "line" || chartType === "bar" || chartType === "area") {
          let data: Array<Record<string, number | string>> = [];
          let series: Array<{ key: string; name: string; color: string }> = [];
          if (isDatasetFormat) {
            const { labels, datasets } = rawUnknown as ChartDatasetShape;
            // Build keys s0, s1, ...
            series = datasets.map((ds, sIdx) => ({
              key: `s${sIdx}`,
              name: ds.label || `Serie ${sIdx + 1}`,
              color: ds.color || defaultColors[sIdx % defaultColors.length],
            }));
            data = labels.map((label: string, i: number) => {
              const row: Record<string, number | string> = { name: label };
              datasets.forEach((ds, sIdx) => {
                row[`s${sIdx}`] = Number(ds.data[i] ?? 0);
              });
              return row;
            });
          } else if (Array.isArray(rawUnknown)) {
            data = (rawUnknown as Array<Record<string, number | string>>);
            series = (options as { series?: Array<{ key: string; name: string; color: string }> })?.series || [];
          }
          if (chartType === "line") {
            chart = <LineChart 
              data={data as Array<{ name: string;[k: string]: number | string }>} 
              series={series} 
              height={height}
              showGrid={showGrid}
              showLegend={showLegend}
              showTooltip={showTooltip}
            />;
          } else if (chartType === "bar") {
            chart = <BarChart 
              data={data as Array<{ name: string;[k: string]: number | string }>} 
              series={series} 
              height={height}
              showGrid={showGrid}
              showLegend={showLegend}
              showTooltip={showTooltip}
            />;
          } else {
            chart = <AreaChart 
              data={data as Array<{ name: string;[k: string]: number | string }>} 
              series={series} 
              height={height}
              showGrid={showGrid}
              showLegend={showLegend}
              showTooltip={showTooltip}
            />;
          }
        } else if (chartType === "radar") {
          // Expect labels + single dataset
          let data: Array<{ subject: string; value: number }> = [];
          if (isDatasetFormat) {
            const { labels, datasets } = rawUnknown as ChartDatasetShape;
            const dataset = datasets[0] || { data: [] };
            data = labels.map((label: string, i: number) => ({ subject: label, value: Number(dataset.data[i] ?? 0) }));
          } else if (Array.isArray(rawUnknown)) {
            data = (rawUnknown as Array<{ subject: string; value: number }>);
          }
          const radarSeriesName = (isDatasetFormat ? ((rawUnknown as ChartDatasetShape).datasets?.[0]?.label) : undefined) || "Serie";
          chart = <RadarChart 
            data={data} 
            series={[{ key: "value", name: radarSeriesName, color: defaultColors[0] }]} 
            height={height}
            showLegend={showLegend}
            showTooltip={showTooltip}
          />;
        }

        // Renderizar gráfico con diseño mejorado
        return chart ? (
          <motion.div 
            className={`mb-10 ${block.className || ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-md">
              {/* Encabezado del gráfico (solo si hay título personalizado) */}
              {metricTitle && (
                <div className="border-b border-[#E5E5E5] bg-[#F7F7FB] p-4">
                  <h3 className="text-lg font-bold text-[#0F0F0F]">
                    {metricTitle}
                  </h3>
                </div>
              )}
              
              {/* Contenedor del gráfico con padding */}
              <div className="p-5">
                {chart}
              </div>
              
              {/* Borde inferior decorativo */}
              <div className="h-1 w-full bg-gradient-to-r from-[#5352F6] to-[#7A79F9]"></div>
            </div>
          </motion.div>
        ) : null;
      }

    case "list":
      if (block.style === "ordered") {
        return (
          <ol className={`mb-8 list-decimal space-y-2 pl-6 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {item.content}
                {item.subItems && item.subItems.length > 0 && (
                  <ol className="mt-2 list-decimal space-y-2 pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem.content}</li>
                    ))}
                  </ol>
                )}
              </motion.li>
            ))}
          </ol>
        );
      } else if (block.style === "checked") {
        return (
          <ul className={`mb-8 space-y-2 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="mr-2 mt-1 text-[#5352F6]">
                  {item.checked ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor" />
                    </svg>
                  )}
                </span>
                <div>
                  <span>{item.content}</span>
                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="mt-2 space-y-1 pl-6">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-start text-sm">
                          <span className="mr-2 mt-0.5 text-[#5352F6]">
                            {subItem.checked ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c-1.1 0-2-.9-2-2z" fill="currentColor" />
                              </svg>
                            )}
                          </span>
                          <span>{subItem.content}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        );
      } else {
        return (
          <ul className={`mb-8 list-disc space-y-2 pl-6 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {item.content}
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="mt-2 list-disc space-y-2 pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem.content}</li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ul>
        );
      }

    case "table":
      return (
        <div className={`mb-8 overflow-x-auto rounded-lg border border-[#E5E5E5] ${block.className || ""}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E5E5E5] bg-[#F7F7FB]">
                {block.headers.map((header, index) => (
                  <th key={index} className="p-3 text-left font-semibold text-[#5352F6]">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-[#E5E5E5] hover:bg-[#F7F7FB]/50 transition-colors">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            {block.caption && (
              <caption className="mt-2 p-2 text-sm text-[#6D6C6C] caption-bottom">{block.caption}</caption>
            )}
          </table>
        </div>
      );

    case "code":
      return (
        <CodeBlockView
          code={block.code}
          caption={block.caption}
          highlight={block.highlight as number[] | undefined}
          showLineNumbers={block.showLineNumbers}
          className={block.className}
        />
      );

    case "callout":
      const calloutColors = {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        tip: "bg-[#F7F7FB] border-[#5352F6]/20 text-[#5352F6]"
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={`mb-8 rounded-lg border-l-4 p-4 ${calloutColors[block.variant]} ${block.className || ""}`}
        >
          {block.icon && (
            <div className="mb-2">
              {/* Aquí se podría agregar un icono según el tipo de callout */}
            </div>
          )}
          <p>{block.content}</p>
        </motion.div>
      );

    case "columns":
      return (
        <div className={`mb-8 grid gap-6 ${block.stackBelow === "sm" ? "grid-cols-1 sm:grid-cols-12" :
            block.stackBelow === "md" ? "grid-cols-1 md:grid-cols-12" :
              block.stackBelow === "lg" ? "grid-cols-1 lg:grid-cols-12" :
                block.stackBelow === "xl" ? "grid-cols-1 xl:grid-cols-12" :
                  "grid-cols-1 md:grid-cols-12"
          } ${block.className || ""}`}>
          {block.columns.map((column, index) => {
            const colSpan = {
              "1/2": "md:col-span-6",
              "1/3": "md:col-span-4",
              "2/3": "md:col-span-8",
              "1/4": "md:col-span-3",
              "3/4": "md:col-span-9",
              "full": "md:col-span-12"
            }[column.width] || "md:col-span-6";

            return (
              <motion.div
                key={index}
                className={colSpan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {column.blocks.map((nestedBlock, blockIndex) => (
                  <ContentBlockRenderer key={blockIndex} block={nestedBlock} />
                ))}
              </motion.div>
            );
          })}
        </div>
      );

    case "divider":
      {
        const styleClass = (
          block.style === "dashed" ? "border-dashed" :
            block.style === "dotted" ? "border-dotted" :
              block.style === "double" ? "border-double border-t-2" :
                "border-solid"
        );

        const isTailwindBorderColor = typeof block.color === "string" && block.color.startsWith("border-");
        const borderColorClass = isTailwindBorderColor ? String(block.color) : "border-[#E5E5E5]";
        const borderColorStyle = !isTailwindBorderColor && block.color ? { borderColor: block.color as string } : undefined;

        const isTailwindWidth = typeof block.width === "string" && block.width.startsWith("w-");
        const widthClass = isTailwindWidth ? String(block.width) : "w-full";
        const widthStyle = !isTailwindWidth && block.width ? { width: block.width as string } : undefined;

        return (
          <hr
            className={`my-8 border-0 border-t ${styleClass} ${borderColorClass} ${widthClass} ${block.className || ""}`}
            style={{ ...(borderColorStyle || {}), ...(widthStyle || {}) }}
          />
        );
      }

    case "cta":
      return (
        <div className={`mb-8 rounded-lg p-8 ${block.background || "bg-[#F7F7FB]"} ${block.className || ""}`}>
          <h3 className="mb-4 text-xl font-bold md:text-2xl">{block.heading}</h3>
          {block.content && <p className="mb-6">{block.content}</p>}
          <a
            href={block.buttonUrl}
            className={`inline-block rounded-md px-6 py-3 font-medium ${block.buttonVariant === "secondary" ? "bg-[#0F0F0F] text-white" :
                block.buttonVariant === "outline" ? "border border-[#5352F6] bg-transparent text-[#5352F6]" :
                  "bg-[#5352F6] text-white"
              }`}
          >
            {block.buttonText}
          </a>
        </div>
      );

    case "faq":
      return (
        <div className={`mb-8 ${block.className || ""}`}>
          <div className="space-y-4">
            {block.items.map((item, index) => (
              <motion.details
                key={index}
                className="rounded-lg border border-[#E5E5E5] overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <summary className="cursor-pointer p-4 font-medium bg-[#F7F7FB] hover:bg-[#F0F0FF] transition-colors">
                  {item.question}
                </summary>
                <div className="border-t border-[#E5E5E5] p-4 bg-white">
                  <p>{item.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      );

    case "embed":
      {
        const { url, title, width, height, responsive = true, provider = "other" } = block;
        
        // Determinar el tipo de embed basado en la URL o el provider especificado
        const getEmbedType = () => {
          if (provider !== "other") return provider;
          
          if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
          if (url.includes("instagram.com")) return "instagram";
          if (url.includes("tiktok.com")) return "tiktok";
          if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
          if (url.includes("vimeo.com")) return "vimeo";
          if (url.includes("spotify.com")) return "spotify";
          if (url.includes("codepen.io")) return "codepen";
          if (url.includes("maps.google.com") || url.includes("google.com/maps")) return "google-maps";
          
          return "other";
        };
        
        const embedType = getEmbedType();
        
        // Función para sanitizar y transformar URLs a formato embed cuando sea necesario
        const getEmbedUrl = () => {
          try {
            // Validar URL
            new URL(url);
            
            // Twitter/X
            if (embedType === "twitter") {
              // Convertir URL normal de tweet a formato embed
              const tweetMatch = url.match(/twitter\.com\/[^\/]+\/status\/(\d+)/);
              const xMatch = url.match(/x\.com\/[^\/]+\/status\/(\d+)/);
              const tweetId = tweetMatch?.[1] || xMatch?.[1];
              
              if (tweetId) {
                return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
              }
            }
            
            // Instagram
            if (embedType === "instagram" && !url.includes("embed")) {
              // Convertir URL normal de Instagram a formato embed
              const postMatch = url.match(/instagram\.com\/p\/([^\/]+)/);
              const postId = postMatch?.[1];
              
              if (postId) {
                return `https://www.instagram.com/p/${postId}/embed`;
              }
            }
            
            // YouTube
            if (embedType === "youtube") {
              // Convertir URL normal de YouTube a formato embed
              const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]+)/);
              const videoId = videoIdMatch?.[1];
              
              if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
              }
            }
            
            // Vimeo
            if (embedType === "vimeo") {
              // Convertir URL normal de Vimeo a formato embed
              const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
              const vimeoId = vimeoMatch?.[1];
              
              if (vimeoId) {
                return `https://player.vimeo.com/video/${vimeoId}`;
              }
            }
            
            // Spotify
            if (embedType === "spotify") {
              // Convertir URL normal de Spotify a formato embed
              const spotifyMatch = url.match(/spotify\.com\/(track|playlist|album|episode|show)\/([^\/\?]+)/);
              if (spotifyMatch) {
                const [, type, id] = spotifyMatch;
                return `https://open.spotify.com/embed/${type}/${id}`;
              }
            }
            
            // Para otros tipos, devolver la URL original
            return url;
          } catch {
            return url; // Si hay algún error, devolver la URL original
          }
        };
        
        const embedUrl = getEmbedUrl();
        const aspectRatio = height && width ? (height / width) * 100 : 56.25; // Default a 16:9 si no se especifica
        
        return (
          <div className={`mb-8 ${block.className || ""}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm"
            >
              {title && (
                <div className="border-b border-[#E5E5E5] bg-[#F7F7FB] p-3">
                  <h3 className="text-sm font-medium text-[#0F0F0F]">{title}</h3>
                </div>
              )}
              
              <div className={responsive ? "relative w-full" : ""} 
                style={responsive ? { paddingBottom: `${aspectRatio}%` } : {}}>
                <iframe
                  src={embedUrl}
                  title={title || "Contenido embebido"}
                  width={responsive ? "100%" : width || 600}
                  height={responsive ? "100%" : height || 400}
                  className={responsive ? "absolute left-0 top-0 h-full w-full border-0" : "border-0"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>
          </div>
        );
      }
      
    case "testimonial":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={`mb-8 rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm ${block.className || ""}`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {block.avatar && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <SafeImage src={block.avatar} alt={block.author} fill className="object-cover" fallbackSrc="/images/modern-building.jpg" />
                </div>
              )}
              <div>
                <div className="font-medium text-[#0F0F0F]">{block.author}</div>
                {block.role && <div className="text-xs text-[#6D6C6C]">{block.role}</div>}
              </div>
            </div>
            {typeof block.rating === "number" && (
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < (block.rating as number) ? "text-yellow-400" : "text-gray-300"}
                    fill={i < (block.rating as number) ? "currentColor" : "none"}
                  />
                ))}
              </div>
            )}
          </div>
          <p className="italic text-[#0F0F0F]">&ldquo;{block.quote}&rdquo;</p>
        </motion.div>
      );

    default:
      return null;
  }
};

interface BlogContentClientProps {
  content: ContentBlock[];
  tags?: Tag[];
  author: Author;
}

export default function BlogContentClient({ content, tags, author }: BlogContentClientProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {content.map((block, index) => (
        <motion.div
          key={block.id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.05, 1) }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ContentBlockRenderer block={block} />
        </motion.div>
      ))}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-8 mt-12">
          <Paragraph weight="semibold" className="mb-3">Etiquetas:</Paragraph>
          <BlogTags tags={tags} />
        </div>
      )}

      {/* Author bio */}
      <div className="mb-12 mt-16">
        <AuthorProfile author={author} />
      </div>

      {/* Banner CTA de LOKL */}
      <div className="mb-12 mt-16">
        <LoklCTABanner />
      </div>
    </div>
  );
}
