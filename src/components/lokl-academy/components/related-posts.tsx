"use client";

import React from "react";
import { motion } from "framer-motion";
import { H2 } from "@/components/design-system";
import { BlogPost } from "@/lib/blog/schema";
import BlogCard from "./blog-card";

interface RelatedPostsProps {
  posts: BlogPost[];
  className?: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`mx-auto max-w-6xl ${className}`}
    >
      <div className="mb-8 flex items-center">
        <div className="mr-4 h-1 w-12 bg-[#5352F6]"></div>
        <H2 variant="section">Artículos relacionados</H2>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <BlogCard blog={post} variant="default" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPosts;
