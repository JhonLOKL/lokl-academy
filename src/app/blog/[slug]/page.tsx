"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar, Footer, H1, Paragraph } from "@/components/design-system";
import { motion } from "framer-motion";
import mockBlogPosts from "@/lib/blog/mock-data";
import { ContentBlock } from "@/lib/blog/schema";
import BlogCard from "@/components/lokl-academy/components/blog-card";

// Componente para renderizar los diferentes tipos de bloques de contenido
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "heading":
      const HeadingTag = (`h${block.level}`) as React.ElementType;
      return (
        <HeadingTag 
          id={block.anchor} 
          className={`mb-4 mt-8 font-bold ${
            block.level === 1 ? "text-3xl md:text-4xl" : 
            block.level === 2 ? "text-2xl md:text-3xl" : 
            block.level === 3 ? "text-xl md:text-2xl" : 
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
        } ${block.dropCap ? "first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold" : ""}`}>
          {block.content}
        </p>
      );
    
    case "image":
      return (
        <figure className={`mb-8 ${block.className || ""}`}>
          <div className="relative h-[300px] w-full md:h-[400px]">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="rounded-lg object-cover"
              sizes={block.sizes || "100vw"}
              loading={block.loading || "lazy"}
            />
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
              <div key={index} className="relative h-[200px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="rounded-lg object-cover"
                />
                {image.caption && (
                  <div className="absolute bottom-0 w-full bg-black/50 p-2 text-center text-sm text-white">
                    {image.caption}
                  </div>
                )}
              </div>
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
        <blockquote className={`mb-8 border-l-4 border-[#5352F6] bg-[#F7F7FB] p-6 ${
          block.style === "large" ? "text-xl" : "text-base"
        } ${block.className || ""}`}>
          <p className="italic">{block.content}</p>
          {(block.author || block.citation) && (
            <footer className="mt-2 text-right text-sm">
              {block.author && <strong>{block.author}</strong>}
              {block.author && block.citation && ", "}
              {block.citation && <cite>{block.citation}</cite>}
            </footer>
          )}
        </blockquote>
      );
    
    case "list":
      if (block.style === "ordered") {
        return (
          <ol className={`mb-8 list-decimal space-y-2 pl-6 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <li key={index}>
                {item.content}
                {item.subItems && item.subItems.length > 0 && (
                  <ol className="mt-2 list-decimal space-y-2 pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem.content}</li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        );
      } else if (block.style === "checked") {
        return (
          <ul className={`mb-8 space-y-2 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <li key={index} className="flex items-start">
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
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <ul className={`mb-8 list-disc space-y-2 pl-6 ${block.className || ""}`}>
            {block.items.map((item, index) => (
              <li key={index}>
                {item.content}
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="mt-2 list-disc space-y-2 pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem.content}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      }
    
    case "table":
      return (
        <div className={`mb-8 overflow-x-auto ${block.className || ""}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E5E5E5]">
                {block.headers.map((header, index) => (
                  <th key={index} className="p-3 text-left font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-[#E5E5E5]">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            {block.caption && (
              <caption className="mt-2 text-sm text-[#6D6C6C]">{block.caption}</caption>
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
        tip: "bg-purple-50 border-purple-200 text-purple-800"
      };
      
      return (
        <div className={`mb-8 rounded-lg border-l-4 p-4 ${calloutColors[block.variant]} ${block.className || ""}`}>
          {block.icon && (
            <div className="mb-2">
              {/* Aquí se podría agregar un icono según el tipo de callout */}
            </div>
          )}
          <p>{block.content}</p>
        </div>
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
              <div key={index} className={colSpan}>
                {column.blocks.map((nestedBlock, blockIndex) => (
                  <ContentBlockRenderer key={blockIndex} block={nestedBlock} />
                ))}
              </div>
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
        <div className={`mb-8 rounded-lg p-8 ${block.background || "bg-[#F7F7FB]"} ${block.className || ""}`}>
          <h3 className="mb-4 text-xl font-bold md:text-2xl">{block.heading}</h3>
          {block.content && <p className="mb-6">{block.content}</p>}
          <Link
            href={block.buttonUrl}
            className={`inline-block rounded-md px-6 py-3 font-medium ${
              block.buttonVariant === "secondary" ? "bg-[#0F0F0F] text-white" :
              block.buttonVariant === "outline" ? "border border-[#5352F6] bg-transparent text-[#5352F6]" :
              "bg-[#5352F6] text-white"
            }`}
          >
            {block.buttonText}
          </Link>
        </div>
      );
    
    case "faq":
      return (
        <div className={`mb-8 ${block.className || ""}`}>
          <div className="space-y-4">
            {block.items.map((item, index) => (
              <details key={index} className="rounded-lg border border-[#E5E5E5]">
                <summary className="cursor-pointer p-4 font-medium">{item.question}</summary>
                <div className="border-t border-[#E5E5E5] p-4">
                  <p>{item.answer}</p>
                </div>
              </details>
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
          <section className="bg-[#F7F7FB] py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                  <Link href="/blog" className="flex items-center text-sm font-medium text-[#5352F6]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                    </svg>
                    Volver al blog
                  </Link>
                </div>
                
                <div className="mb-4 flex items-center gap-2 text-sm text-[#6D6C6C]">
                  <span>{formatDate(blog.publishedAt)}</span>
                  <span>•</span>
                  <span>{blog.estimatedReadTime} min de lectura</span>
                </div>
                
                <H1 className="mb-4">{blog.title}</H1>
                {blog.subtitle && (
                  <Paragraph variant="lead" className="mb-6">
                    {blog.subtitle}
                  </Paragraph>
                )}
                
                <div className="flex items-center">
                  <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{blog.author.name}</p>
                    <p className="text-sm text-[#6D6C6C]">{blog.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Cover image */}
          <div className="container mx-auto -mt-8 px-4">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={blog.coverImage.src}
                  alt={blog.coverImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {blog.coverImage.caption && (
                <p className="mt-2 text-center text-sm text-[#6D6C6C]">
                  {blog.coverImage.caption}
                  {blog.coverImage.credit && ` - ${blog.coverImage.credit}`}
                </p>
              )}
            </div>
          </div>
          
          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                {blog.content.map((block, index) => (
                  <motion.div
                    key={block.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ContentBlockRenderer block={block} />
                  </motion.div>
                ))}
                
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mb-8 mt-12">
                    <p className="mb-2 font-semibold">Etiquetas:</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map(tag => (
                        <Link
                          key={tag.id}
                          href={`/blog?tag=${tag.slug}`}
                          className="rounded-full bg-[#F7F7FB] px-3 py-1 text-sm text-[#5352F6] hover:bg-[#EAEAFC]"
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Author bio */}
                <div className="mb-12 mt-12 rounded-lg bg-[#F7F7FB] p-6">
                  <div className="flex items-center">
                    <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{blog.author.name}</p>
                      <p className="text-sm text-[#6D6C6C]">{blog.author.role}</p>
                    </div>
                  </div>
                  <p className="mt-4">{blog.author.bio}</p>
                  
                  {blog.author.socialLinks && Object.keys(blog.author.socialLinks).length > 0 && (
                    <div className="mt-4 flex gap-4">
                      {blog.author.socialLinks.twitter && (
                        <a href={blog.author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[#5352F6]">
                          Twitter
                        </a>
                      )}
                      {blog.author.socialLinks.linkedin && (
                        <a href={blog.author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#5352F6]">
                          LinkedIn
                        </a>
                      )}
                      {blog.author.socialLinks.instagram && (
                        <a href={blog.author.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#5352F6]">
                          Instagram
                        </a>
                      )}
                      {blog.author.socialLinks.website && (
                        <a href={blog.author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-[#5352F6]">
                          Sitio web
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Related posts */}
          {blog.relatedPosts && blog.relatedPosts.length > 0 && (
            <section className="bg-[#F7F7FB] py-12">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                  <h2 className="mb-8 text-2xl font-bold md:text-3xl">Artículos relacionados</h2>
                  
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blog.relatedPosts.map(relatedPost => {
                      const fullPost = mockBlogPosts.find(p => p.id === relatedPost.id);
                      return fullPost ? (
                        <BlogCard key={relatedPost.id} blog={fullPost} variant="default" />
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}
