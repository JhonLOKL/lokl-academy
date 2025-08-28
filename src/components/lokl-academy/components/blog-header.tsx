"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { H1, Paragraph } from "@/components/design-system";

interface BlogHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  publishDate: string;
  readTime: number;
  className?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  subtitle,
  category,
  publishDate,
  readTime,
  className = "",
}) => {
  // Divide el título para aplicar diferentes estilos
  const titleParts = title.split(' ');
  const firstPart = titleParts.slice(0, Math.ceil(titleParts.length / 3)).join(' ');
  const secondPart = titleParts.slice(Math.ceil(titleParts.length / 3)).join(' ');

  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <div className="mb-6">
        <Link href="/blog" className="group flex items-center text-sm font-medium text-[#5352F6]">
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="mr-1 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Volver al blog
          </motion.div>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {category && (
          <span className="mb-3 inline-block rounded-full bg-[#5352F6]/10 px-3 py-1 text-sm font-medium text-[#5352F6]">
            {category}
          </span>
        )}
        
        <div className="mb-4 flex items-center gap-2 text-sm text-[#6D6C6C]">
          <span>{publishDate}</span>
          <span>•</span>
          <span>{readTime} min de lectura</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <H1 className="mb-4">
          <span className="font-extrabold text-[#0F0F0F]">{firstPart} </span>
          <span className="font-bold text-[#5352F6]">{secondPart}</span>
        </H1>
        
        {subtitle && (
          <Paragraph variant="lead" className="mb-6">
            {subtitle}
          </Paragraph>
        )}
      </motion.div>
    </div>
  );
};

export default BlogHeader;
