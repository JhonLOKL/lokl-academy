"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "./HeroSection";
import { FAQSection } from "./FAQSection";
import { MarketingFooter } from "@/components/footer/marketing-footer";

const FloatingWhatsApp = dynamic(
  () => import("react-floating-whatsapp").then((mod) => mod.FloatingWhatsApp),
  { ssr: false }
);

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

      <FloatingWhatsApp
        phoneNumber="573017328112"
        accountName="Laura"
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar="/images/home/foto-wpp-lokl.png"
        statusMessage="En línea"
        chatMessage="Hola! Soy Laura 😊 Tu asesora en inversiones inmobiliarias. ¿Cuál es tu nombre?"
        placeholder="Escríbenos un mensaje"
      />
    </div>
  );
}

