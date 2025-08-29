"use client";

import React from "react";
import { motion } from "framer-motion";
import { Author } from "@/lib/blog/schema";
import { AuthorProfile } from "./index";

interface BlogHeaderClientProps {
  author: Author;
}

export default function BlogHeaderClient({ author }: BlogHeaderClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="mt-8 flex items-center justify-center"
    >
      <AuthorProfile author={author} variant="compact" />
    </motion.div>
  );
}
