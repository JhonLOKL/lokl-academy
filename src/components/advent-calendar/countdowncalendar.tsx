"use client";

import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CountdownCalendar() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isCampaignActive, setIsCampaignActive] = useState(false);
    const [showCountdown, setShowCountdown] = useState(true);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const campaignStart = new Date('2025-12-13T00:00:00'); // Fecha de inicio actualizada al 13
            const campaignEnd = new Date('2025-12-24T23:59:59');

            const campaignActive = now >= campaignStart && now <= campaignEnd;
            setIsCampaignActive(campaignActive);

            let targetDate = new Date();
            targetDate.setHours(24, 0, 0, 0); // Apuntar a la siguiente medianoche por defecto

            // Si estamos antes del inicio de campaña, el target es el inicio de campaña
            if (now < campaignStart) {
                targetDate = campaignStart;
                setShowCountdown(true);
            } else if (now > campaignEnd) {
                // Campaña finalizada
                setShowCountdown(false);
            } else {
                // Estamos en fechas de campaña (13 al 24 de dic)
                // Siempre mostrar contador para el siguiente día (00:00)
                setShowCountdown(true);
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
    const campaignStart = new Date('2025-12-13T00:00:00');
    const campaignEnd = new Date('2025-12-24T23:59:59');
    
    // Si la campaña no ha empezado
    const isPreCampaign = now < campaignStart;
    // Si la campaña ya terminó
    const isPostCampaign = now > campaignEnd;

    // Calcular día actual (1 a 12)
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
                        {isPreCampaign 
                            ? '¡El calendario comienza pronto!' 
                            : isPostCampaign 
                                ? '¡Gracias por participar en el Calendario de Adviento!' 
                                : `¡El día ${dayNumber} está activo!`}
                    </h2>
                </div>

                {showCountdown && !isPostCampaign && (
                    <>
                        <p className="text-white/80 text-center mb-4 text-sm md:text-base">
                            {isPreCampaign ? 'La magia comienza en:' : 'Tu próxima sorpresa llega en:'}
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
                            {isPreCampaign 
                                ? 'Prepárate para 12 días de regalos exclusivos' 
                                : 'Los regalos se desbloquearán diariamente a las 00:00'}
                        </p>
                    </>
                )}

                {!showCountdown && !isPreCampaign && !isPostCampaign && (
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
                            Del 13 al 24 de diciembre - ¡Abre un regalo cada día!
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
