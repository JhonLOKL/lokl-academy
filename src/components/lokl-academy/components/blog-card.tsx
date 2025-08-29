"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog/schema";
import { Badge, Button, Paragraph, Text } from "@/components/design-system";

interface BlogCardProps {
  blog: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
  hovered?: boolean; // Para propósitos de demostración
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  blog, 
  variant = "default",
  className = "",
  hovered: initialHovered = false
}) => {
  const [isHovered, setIsHovered] = useState(initialHovered);
  
  // Formatear la fecha de publicación
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (variant === "featured") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        className={`overflow-hidden rounded-xl bg-white transition-all duration-200 ${isHovered ? 'shadow-lg border border-[#5352F6]' : 'shadow-sm border border-transparent'} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 w-full md:h-full overflow-hidden">
            <Image
              src={blog.coverImage.src}
              alt={blog.coverImage.alt}
              fill
              className={`object-cover transition-all duration-300 ${isHovered ? 'scale-105 grayscale-0' : 'grayscale'}`}
            />
            {blog.category && (
              <div className="absolute left-4 top-4 z-10">
                <Badge variant="default" className={blog.featured ? "bg-[#5352F6] text-white" : "bg-white/80 text-[#0F0F0F] border border-[#5352F6]"}>
                  {blog.category}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between p-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Text size="sm" color="muted">{formatDate(blog.publishedAt)}</Text>
                <Text size="sm" color="muted">•</Text>
                <Text size="sm" color="muted">{blog.estimatedReadTime} min de lectura</Text>
              </div>
              
              <Link href={`/blog/${blog.slug}`} className="block mb-3">
                <div className="mb-3">
                  <span className="text-2xl font-extrabold text-[#0F0F0F]">{blog.title.split(' ')[0]} </span>
                  <span className="text-2xl font-bold text-[#5352F6]">{blog.title.split(' ').slice(1).join(' ')}</span>
                </div>
              </Link>
              
              <Paragraph 
                variant="body" 
                color="muted" 
                className="mb-5 line-clamp-3">
                {blog.excerpt}
              </Paragraph>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full border border-gray-100">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Text weight="medium">{blog.author.name}</Text>
                  <Text size="sm" color="muted">{blog.author.role}</Text>
                </div>
              </div>
              
              <Link href={`/blog/${blog.slug}`}>
                <Button variant="link" className="text-sm p-0 cursor-pointer">
                  Leer artículo
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-200 ${isHovered ? 'shadow-sm border border-[#5352F6]/30' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={blog.coverImage.src}
            alt={blog.coverImage.alt}
            fill
            className={`object-cover transition-all duration-300 ${isHovered ? 'scale-105 grayscale-0' : 'grayscale'}`}
          />
        </div>
        <div>
          <Link href={`/blog/${blog.slug}`}>
            <div className="mb-1">
              <Text weight="medium" className={`transition-colors ${isHovered ? 'text-[#5352F6]' : ''}`}>
                {blog.title.length > 40 ? `${blog.title.substring(0, 40)}...` : blog.title}
              </Text>
            </div>
          </Link>
          <Text size="xs" color="muted">
            {formatDate(blog.publishedAt)}
          </Text>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      className={`overflow-hidden rounded-xl bg-white transition-all duration-200 ${isHovered ? 'shadow-lg border border-[#5352F6]' : 'shadow-sm border border-transparent'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={blog.coverImage.src}
          alt={blog.coverImage.alt}
          fill
          className={`object-cover transition-all duration-300 ${isHovered ? 'scale-105 grayscale-0' : 'grayscale'}`}
        />
        {blog.category && (
          <div className="absolute left-4 top-4 z-10">
            <Badge variant="default" className={blog.featured ? "bg-[#5352F6] text-white" : "bg-white/80 text-[#0F0F0F] border border-[#5352F6]"}>            
              {blog.category}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Text size="sm" color="muted">{formatDate(blog.publishedAt)}</Text>
          <Text size="sm" color="muted">•</Text>
          <Text size="sm" color="muted">{blog.estimatedReadTime} min de lectura</Text>
        </div>
        
        <Link href={`/blog/${blog.slug}`} className="block mb-3">
          <div className="mb-3">
            <span className="text-xl font-extrabold text-[#0F0F0F]">{blog.title.split(' ')[0]} </span>
            <span className="text-xl font-bold text-[#5352F6]">{blog.title.split(' ').slice(1).join(' ')}</span>
          </div>
        </Link>
        
        <Paragraph 
          variant="small" 
          color="muted" 
          className="mb-5 line-clamp-2">
          {blog.excerpt}
        </Paragraph>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full border border-gray-100">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <Text size="sm" weight="medium">{blog.author.name}</Text>
          </div>
          
          <Link href={`/blog/${blog.slug}`}>
            <Button variant="link" className="text-sm p-0 cursor-pointer">
              Leer artículo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;