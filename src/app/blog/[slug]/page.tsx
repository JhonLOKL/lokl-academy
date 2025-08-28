"use client";

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar, Footer, Paragraph } from "@/components/design-system";
import mockBlogPosts from "@/lib/blog/mock-data";
import { ContentBlock } from "@/lib/blog/schema";
import { 
  BlogHeader, 
  BlogCover, 
  BlogTags, 
  BlogCTA,
  AuthorProfile, 
  RelatedPosts 
} from "@/components/lokl-academy/components";

// Componente para renderizar los diferentes tipos de bloques de contenido
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "heading":
      const HeadingTag = (`h${block.level}`) as React.ElementType;
      return (
        <HeadingTag 
          id={block.anchor} 
          className={`mb-4 mt-8 font-bold ${
            block.level === 1 ? "text-3xl md:text-4xl text-[#5352F6]" : 
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
        <p className={`mb-6 leading-relaxed ${block.className || ""} ${
          block.size === "small" ? "text-sm" : 
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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-500"
                loading={block.loading || "lazy"}
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
      return (
        <div className={`mb-8 ${block.className || ""}`}>
          <div className={`grid gap-4 ${
            block.layout === "carousel" ? "flex overflow-x-auto" :
            block.columns === 2 ? "grid-cols-1 md:grid-cols-2" :
            block.columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
            block.columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
            "grid-cols-1 md:grid-cols-3"
          }`}>
            {block.images.map((image, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-[200px]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-500"
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
      if (block.provider === "youtube") {
        return (
          <div className={`mb-8 ${block.className || ""}`}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={block.src}
                title={block.caption || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
      } else {
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
          className={`mb-8 border-l-4 border-[#5352F6] bg-gradient-to-r from-[#F7F7FB] to-white p-6 ${
            block.style === "large" ? "text-xl" : "text-base"
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
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
                    </svg>
                  )}
                </span>
                <span>{item.content}</span>
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
        <div className={`mb-8 grid gap-6 ${
          block.stackBelow === "sm" ? "grid-cols-1 sm:grid-cols-12" :
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
      return (
        <hr className={`my-8 border-0 border-t ${
          block.style === "dashed" ? "border-dashed" :
          block.style === "dotted" ? "border-dotted" :
          block.style === "double" ? "border-double border-t-2" :
          "border-solid"
        } ${block.color || "border-[#E5E5E5]"} ${block.width || "w-full"} ${block.className || ""}`} />
      );
    
    case "cta":
      return (
        <BlogCTA
          heading={block.heading}
          content={block.content}
          buttonText={block.buttonText}
          buttonUrl={block.buttonUrl}
          buttonVariant={block.buttonVariant as "primary" | "secondary" | "outline"}
          className="mb-8"
        />
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
    
    // Implementar otros tipos de bloques según sea necesario
    
    default:
      return null;
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = mockBlogPosts.find(post => post.slug === params.slug);
  
  if (!blog) {
    notFound();
  }
  
  // Formatear la fecha de publicación
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  return (
    <>
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Academy</span></span>}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Cursos", href: "#courses" },
          { label: "Blogs", href: "/blog" },
          { label: "Podcasts", href: "#podcasts" },
        ]}
        actions={
          <div className="flex items-center space-x-4">
            <a
              href="#login"
              className="text-sm font-medium text-[#0F0F0F] transition-colors hover:text-[#5352F6]"
            >
              Inicia sesión
            </a>
            <a
              href="#register"
              className="rounded-md bg-[#5352F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A4AE5]"
            >
              Regístrate
            </a>
          </div>
        }
      />

      <main>
        <article>
          {/* Hero section */}
          <section className="bg-gradient-to-b from-[#F7F7FB] to-white py-16">
            <div className="container mx-auto px-4">
              <BlogHeader
                title={blog.title}
                subtitle={blog.subtitle}
                category={blog.category}
                publishDate={formatDate(blog.publishedAt)}
                readTime={blog.estimatedReadTime}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-8 flex items-center justify-center"
              >
                <AuthorProfile author={blog.author} variant="compact" />
              </motion.div>
            </div>
          </section>
          
          {/* Cover image */}
          <div className="container mx-auto -mt-8 px-4">
            <BlogCover
              src={blog.coverImage.src}
              alt={blog.coverImage.alt}
              caption={blog.coverImage.caption}
              credit={blog.coverImage.credit}
            />
          </div>
          
          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                {blog.content.map((block, index) => (
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
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mb-8 mt-12">
                    <Paragraph weight="semibold" className="mb-3">Etiquetas:</Paragraph>
                    <BlogTags tags={blog.tags} />
                  </div>
                )}
                
                {/* Author bio */}
                <div className="mb-12 mt-16">
                  <AuthorProfile author={blog.author} />
                </div>
              </div>
            </div>
          </section>
          
          {/* Related posts */}
          {blog.relatedPosts && blog.relatedPosts.length > 0 && (
            <section className="bg-gradient-to-b from-white to-[#F7F7FB] py-16">
              <div className="container mx-auto px-4">
                {blog.relatedPosts.map(relatedPost => {
                  const fullPost = mockBlogPosts.find(p => p.id === relatedPost.id);
                  return fullPost;
                }).filter(Boolean).length > 0 && (
                  <RelatedPosts 
                    posts={blog.relatedPosts
                      .map(relatedPost => mockBlogPosts.find(p => p.id === relatedPost.id))
                      .filter(Boolean) as typeof mockBlogPosts}
                  />
                )}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}