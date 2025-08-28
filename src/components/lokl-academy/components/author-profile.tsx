"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Author } from "@/lib/blog/schema";
import { H3, Paragraph, Text } from "@/components/design-system";

interface AuthorProfileProps {
  author: Author;
  variant?: "compact" | "full";
  className?: string;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({
  author,
  variant = "full",
  className = "",
}) => {
  const socialIcons = {
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  };

  if (variant === "compact") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center ${className}`}
      >
        <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover transition-all duration-300"
          />
        </div>
        <div>
          <Text weight="medium">{author.name}</Text>
          <Text size="sm" color="muted">{author.role}</Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl bg-gradient-to-br from-[#F7F7FB] to-white p-6 border border-gray-100 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#5352F6]/20">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover transition-all duration-300"
          />
        </div>
        <div>
          <H3 variant="feature" className="mb-1">{author.name}</H3>
          <Text size="base" color="purple" weight="medium" className="mb-2">{author.role}</Text>
          
          {author.socialLinks && Object.keys(author.socialLinks).length > 0 && (
            <div className="flex gap-3 mt-2">
              {Object.entries(author.socialLinks).map(([platform, url]) => (
                platform in socialIcons && (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6D6C6C] hover:text-[#5352F6] transition-colors"
                    aria-label={`${author.name} on ${platform}`}
                  >
                    {socialIcons[platform as keyof typeof socialIcons]}
                  </a>
                )
              ))}
            </div>
          )}
        </div>
      </div>
      <Paragraph className="mt-4" color="muted">
        {author.bio}
      </Paragraph>
    </motion.div>
  );
};

export default AuthorProfile;
