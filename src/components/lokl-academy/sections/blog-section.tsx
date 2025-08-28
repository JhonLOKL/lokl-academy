"use client";

import React from "react";
import Link from "next/link";
import { H2, Paragraph } from "@/components/design-system";
import { motion } from "framer-motion";
import BlogCard from "../components/blog-card";
import { BlogPost } from "@/lib/blog/schema";

interface BlogSectionProps {
  blogs: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  // Asegurarse de que hay al menos 3 blogs
  const displayBlogs = blogs.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <H2 variant="section" className="mb-2">
            Últimos <span className="text-[#5352F6]">artículos</span>
          </H2>
          <Paragraph variant="lead" color="muted">
            Descubre nuestros artículos más recientes sobre inversión inmobiliaria y finanzas personales.
          </Paragraph>
        </div>
        <Link
          href="/blog"
          className="rounded-md bg-white px-6 py-3 text-sm font-medium text-[#0F0F0F] shadow-sm transition-colors hover:bg-[#F7F7FB] hover:text-[#5352F6]"
        >
          Ver todos los artículos
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayBlogs.map((blog, index) => (
          <BlogCard 
            key={blog.id} 
            blog={blog} 
            variant={index === 0 ? "featured" : "default"}
            className={index === 0 ? "md:col-span-2 lg:col-span-1" : ""}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <Link
          href="/blog"
          className="rounded-md border border-[#5352F6] bg-transparent px-6 py-3 text-sm font-medium text-[#5352F6] transition-colors hover:bg-[#5352F6] hover:text-white"
        >
          Explorar más artículos
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogSection;
