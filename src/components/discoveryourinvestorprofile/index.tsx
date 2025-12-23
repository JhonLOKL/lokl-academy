"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "./HeroSection";
import { ProfileCardsSection } from "./ProfileCardsSection";
import { BenefitsSection } from "./BenefitsSection";
import { CTASection } from "./CTASection";
import { MarketingFooter } from "@/components/footer/marketing-footer";
import { InvestorProfileForm } from "./InvestorProfileForm";

const FloatingWhatsAppButton = dynamic(
    () => import("@/components/shared/floating-whatsapp-button"),
    { ssr: false }
);

export default function DiscoverYourInvestorProfile() {
    const [showForm, setShowForm] = useState(false);

    // Scroll to top when form is shown
    useEffect(() => {
        if (showForm) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [showForm]);

    const handleShowForm = () => {
        setShowForm(true);
    };

    if (showForm) {
        return <InvestorProfileForm onBack={() => setShowForm(false)} />;
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <HeroSection onShowForm={handleShowForm} />
            <ProfileCardsSection onShowForm={handleShowForm} />
            <BenefitsSection />
            <CTASection onShowForm={handleShowForm} />
            <MarketingFooter />

            <FloatingWhatsAppButton />
        </div>
    );
}
