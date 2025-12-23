"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SnowEffect } from "@/components/advent-calendar/snoweffect";

export function TopBanner() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        const calculateTimeLeft = () => {
            const now = new Date();

            // Lógica de fechas de campaña
            // Inicio: 10 de Diciembre 2025 (aunque mostramos cuenta regresiva antes)
            // Fin: 24 de Diciembre 2025 al final del día
            const campaignEnd = new Date('2025-12-24T23:59:59');

            // Si ya pasó la fecha fin, ocultamos el banner
            if (now > campaignEnd) {
                setIsVisible(false);
                return "00h 00m 00s";
            }

            let targetDate = new Date();
            targetDate.setHours(10, 0, 0, 0);

            // Si ya pasaron las 10 AM, el objetivo es mañana a las 10 AM
            if (now.getTime() >= targetDate.getTime()) {
                targetDate.setDate(targetDate.getDate() + 1);
            }

            // Lógica específica para inicio de campaña:
            // Si estamos antes del 10 de Diciembre 10 AM, la cuenta es a esa fecha
            const campaignStart = new Date('2025-12-10T10:00:00');
            if (now.getFullYear() === 2025 && now < campaignStart) {
                targetDate = campaignStart;
            }

            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
            }
            return "00h 00m 00s";
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initial call
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, []);

    if (!isMounted || !isVisible) return null;

    return (
        <div className="bg-[#5352F6] text-white w-full py-2 px-4 z-50 relative overflow-hidden">
            <SnowEffect speedMultiplier={0.3} />
            <div className="container mx-auto flex items-center justify-center text-center text-xs md:text-sm font-medium relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Cuenta regresiva:</span>
                        <span className="font-mono bg-white/20 px-2 py-0.5 rounded min-w-[100px]">{timeLeft}</span>
                    </div>
                    <span className="hidden md:inline text-white/50">|</span>
                    <span>¡Acceso Exclusivo al Calendario LOKL! Abre tu Regalo Diario</span>
                    <Link
                        href="/advent-calendar"
                        className="flex items-center gap-1 bg-white text-[#5352F6] px-4 py-1.5 rounded-xl text-xs font-bold md:ml-2 hover:bg-white/90 transition-colors shadow-sm"
                    >
                        Ahora <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
