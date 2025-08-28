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
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <motion.div
          key={tag.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <Link
            href={`/blog?tag=${tag.slug}`}
            className="inline-block rounded-full bg-[#F7F7FB] px-3 py-1.5 text-sm font-medium text-[#5352F6] transition-all duration-300 hover:bg-[#5352F6] hover:text-white"
          >
            #{tag.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogTags;
