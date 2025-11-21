"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "./HeroSection";
import { ProfileCardsSection } from "./ProfileCardsSection";
import { BenefitsSection } from "./BenefitsSection";
import { CTASection } from "./CTASection";
import { MarketingFooter } from "@/components/footer/marketing-footer";
import { InvestorProfileForm } from "./InvestorProfileForm";

const FloatingWhatsApp = dynamic(
    () => import("react-floating-whatsapp").then((mod) => mod.FloatingWhatsApp),
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
