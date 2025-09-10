"use client";

import React from "react";
import SafeImage from "@/components/ui/safe-image";
import { motion } from "framer-motion";

interface BlogCoverProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
}

const BlogCover: React.FC<BlogCoverProps> = ({
  src,
  alt,
  caption,
  credit,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(src);
  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg"
      >
        <SafeImage
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          priority
          fallbackSrc="/images/modern-building.jpg"
          onError={() => setImgSrc("/images/modern-building.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
      </motion.div>
      
      {(caption || credit) && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-3 text-center text-sm italic text-[#6D6C6C]"
        >
          {caption}
          {caption && credit && " — "}
          {credit && <span className="font-medium">{credit}</span>}
        </motion.p>
      )}
    </div>
  );
};

export default BlogCover;
