"use client";

import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { FAQSection } from "./FAQSection";
import { MarketingFooter } from "@/components/footer/marketing-footer";

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FAQSection
        activeCategory={activeCategory}
        searchQuery={searchQuery}
      />
      <MarketingFooter />
    </div>
  );
}

