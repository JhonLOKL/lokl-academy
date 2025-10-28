"use client";

import React from "react";
import Hero from "@/components/home/hero";

interface NewHeroSectionProps {
  onWhatIsClick?: () => void;
}

export default function NewHeroSection({ onWhatIsClick }: NewHeroSectionProps) {
  return <Hero onWhatIsClick={onWhatIsClick} />;
}


