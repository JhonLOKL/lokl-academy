"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface BlogTagsProps {
  tags: Tag[];
  className?: string;
}

const BlogTags: React.FC<BlogTagsProps> = ({ tags, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {tags.map((tag, index) => (
        <motion.div
          key={tag.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Link
            href={`/blog?tag=${tag.slug}`}
            className="group relative inline-flex items-center overflow-hidden rounded-full border border-[#5352F6]/10 bg-gradient-to-br from-[#F7F7FB] to-white px-4 py-2 text-sm font-medium text-[#5352F6] shadow-sm transition-all duration-300 hover:border-[#5352F6]/30 hover:shadow-md"
          >
            {/* Hover background effect */}
            <span className="absolute inset-0 translate-y-full bg-[#5352F6] transition-transform duration-300 group-hover:translate-y-0" />

            <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-white">
              <span className="mr-1 opacity-50 transition-opacity duration-300 group-hover:opacity-100">#</span>
              {tag.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogTags;
