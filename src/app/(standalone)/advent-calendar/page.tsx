"use client";

import { Hero } from '@/components/advent-calendar/hero';
import { CalendarGrid } from '@/components/advent-calendar/calendargrid';
import { HowItWorks } from '@/components/advent-calendar/howItworks';
import { FAQ } from '@/components/advent-calendar/faq';
import { SnowEffect } from '@/components/advent-calendar/snoweffect';
import { WelcomePopup } from '@/components/advent-calendar/welcomepopup';
import { RegistrationModal } from '@/components/advent-calendar/registrationmodal';
import { MarketingFooter } from '@/components/footer/marketing-footer';
// import { Header } from '@/components/advent-calendar/header'; // Or generic header
import { useState } from 'react';

export default function AdventCalendarPage() {
    const [showRegistration, setShowRegistration] = useState(false);

    const handleRegistrationComplete = (data: { name: string; email: string; phone: string }) => {
        console.log('Registro completado:', data);
        localStorage.setItem('userRegistered', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
        setShowRegistration(false);
    };

    return (
        <div className="min-h-screen">
            <WelcomePopup onOpenRegistration={() => setShowRegistration(true)} />
            {/* <Header onOpenRegistration={() => setShowRegistration(true)} /> */}
            <Hero />
            <div className="relative">
                {/* Fondo morado unificado para calendario y HowItWorks */}
                <div className="absolute inset-0 bg-[#5352f6]" />
                {/* Nieve cayendo */}
                <SnowEffect />
                <HowItWorks />
                <CalendarGrid />
            </div>

            {/* Espaciado entre calendario y FAQ */}
            <div className="bg-[#5352f6] py-16" />

            {/* FAQ y Footer con fondo negro */}
            <div className="bg-black/90">
                <FAQ />
                <MarketingFooter />
            </div>

            {/* Modal de registro centralizado */}
            <RegistrationModal
                isOpen={showRegistration}
                onClose={() => setShowRegistration(false)}
                onRegistrationComplete={handleRegistrationComplete}
            />
        </div>
    );
}
