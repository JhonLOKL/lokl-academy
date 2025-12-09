"use client";

import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CountdownCalendar() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isCampaignActive, setIsCampaignActive] = useState(false); // Si la campaña global ya empezó (10 Dic 10 AM)
    const [showCountdown, setShowCountdown] = useState(true); // Si debemos mostrar el contador (antes de las 10 AM o antes de campaña)

    // Fecha de inicio de campaña: 10 de diciembre de 2025 a las 10:00 AM
    //const startDate = useMemo(() => new Date('2025-12-10T10:00:00'), []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const campaignStart = new Date('2025-12-10T10:00:00');

            // Determinar si la campaña ya empezó globalmente
            const campaignActive = now >= campaignStart;
            setIsCampaignActive(campaignActive);

            let targetDate = new Date();
            targetDate.setHours(10, 0, 0, 0);

            // Si es antes de las 10 AM de hoy, el objetivo es hoy a las 10 AM.
            // Si es después de las 10 AM de hoy, el objetivo es mañana a las 10 AM.
            // PERO si estamos en campaña activa y son mas de las 10 AM, mostramos "Activo", no contador para mañana.

            if (now.getTime() >= targetDate.getTime()) {
                // Ya pasaron las 10 AM de hoy
                targetDate.setDate(targetDate.getDate() + 1);
            }

            // Si estamos antes del inicio de campaña, el target es el inicio de campaña
            if (now < campaignStart) {
                targetDate = campaignStart;
                setShowCountdown(true);
            } else {
                // Estamos en fechas de campaña
                // Si es antes de las 10 AM, mostramos contador para las 10 AM de hoy
                if (now.getHours() < 10) {
                    setShowCountdown(true);
                    // El target ya se seteo correctamente arriba (hoy 10 AM)
                    targetDate.setHours(10, 0, 0, 0); // Re-asegurar que es hoy
                } else {
                    // Es después de las 10 AM, mostramos "Activo"
                    setShowCountdown(false);
                }
            }

            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const now = new Date();
    // Calculo de día actual para mostrar msj "Día X ACTIVO"
    const campaignStart = new Date('2025-12-10T10:00:00');
    const dayNumber = Math.min(Math.floor((now.getTime() - campaignStart.getTime()) / (1000 * 60 * 60 * 24)) + 1, 12);

    return (
        <motion.div
            className="relative z-10 max-w-2xl mx-auto mb-12 md:mb-16 px-4 md:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white/25 backdrop-blur-xl px-4 py-6 md:px-8 md:py-8 border border-white/30 rounded-2xl md:rounded-[19px]">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                    <TreePine className="text-white" size={24} />
                    <h2 className="text-white text-lg md:text-2xl font-bold text-center">
                        {!showCountdown ? '¡El calendario está activo!' : 'El calendario comienza pronto'}
                    </h2>
                </div>

                {showCountdown && (
                    <>
                        <p className="text-white/80 text-center mb-4 text-sm md:text-base">
                            {isCampaignActive ? 'Siguiente regalo en:' : 'Activo en:'}
                        </p>

                        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto">
                            {[
                                { label: 'DÍAS', value: timeLeft.days },
                                { label: 'HORAS', value: timeLeft.hours },
                                { label: 'MIN', value: timeLeft.minutes },
                                { label: 'SEG', value: timeLeft.seconds },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 text-center border border-white/10"
                                    animate={{
                                        scale: item.label === 'SEG' ? [1, 1.02, 1] : 1
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: item.label === 'SEG' ? Infinity : 0
                                    }}
                                >
                                    <div className="text-white text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-white/70 text-[10px] md:text-xs uppercase tracking-wider">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-white/60 text-center mt-4 md:mt-6 text-xs md:text-sm">
                            Los regalos se desbloquearán del 10 al 22 de diciembre
                        </p>
                    </>
                )}

                {!showCountdown && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
                                <div className="relative w-2 h-2 bg-green-400 rounded-full" />
                            </div>
                            <span className="text-white text-sm font-bold">
                                Día {dayNumber} ACTIVO
                            </span>
                        </div>
                        <p className="text-white/80 mt-3 text-xs md:text-sm">
                            Del 10 al 22 de diciembre - ¡Abre un regalo cada día!
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
