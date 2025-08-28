"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog/schema";

interface BlogCardProps {
  blog: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  blog, 
  variant = "default",
  className = "" 
}) => {
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 w-full md:h-full">
            <Image
              src={blog.coverImage.src}
              alt={blog.coverImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {blog.featured && (
              <div className="absolute left-4 top-4 rounded bg-[#5352F6] px-3 py-1 text-xs font-semibold text-white">
                Destacado
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between p-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-[#6D6C6C]">
                <span>{formatDate(blog.publishedAt)}</span>
                <span>•</span>
                <span>{blog.estimatedReadTime} min de lectura</span>
              </div>
              <Link href={`/blog/${blog.slug}`} className="group-hover:text-[#5352F6]">
                <h3 className="mb-3 text-xl font-bold transition-colors md:text-2xl">
                  {blog.title}
                </h3>
              </Link>
              <p className="mb-4 text-[#6D6C6C]">
                {blog.excerpt}
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-[#6D6C6C]">{blog.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`group flex items-center gap-4 ${className}`}
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={blog.coverImage.src}
            alt={blog.coverImage.alt}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <Link href={`/blog/${blog.slug}`} className="group-hover:text-[#5352F6]">
            <h4 className="font-medium transition-colors">
              {blog.title}
            </h4>
          </Link>
          <p className="text-sm text-[#6D6C6C]">
            {formatDate(blog.publishedAt)}
          </p>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ${className}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={blog.coverImage.src}
          alt={blog.coverImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {blog.featured && (
          <div className="absolute left-4 top-4 rounded bg-[#5352F6] px-3 py-1 text-xs font-semibold text-white">
            Destacado
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-[#6D6C6C]">
          <span>{formatDate(blog.publishedAt)}</span>
          <span>•</span>
          <span>{blog.estimatedReadTime} min de lectura</span>
        </div>
        <Link href={`/blog/${blog.slug}`} className="group-hover:text-[#5352F6]">
          <h3 className="mb-3 text-lg font-bold transition-colors">
            {blog.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-[#6D6C6C]">
          {blog.excerpt}
        </p>
        <div className="flex items-center">
          <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm font-medium">{blog.author.name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
