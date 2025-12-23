"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';

interface WelcomePopupProps {
    onOpenRegistration: () => void;
}

export function WelcomePopup({ onOpenRegistration }: WelcomePopupProps) {
    const [isOpen, setIsOpen] = useState(true);
    const { token } = useAuthStore();
    const [status, setStatus] = useState<{
        type: 'before' | 'active' | 'ended';
        daysUntilStart?: number;
        currentDay?: number;
    }>({ type: 'before' });

    useEffect(() => {
        const calculateStatus = () => {
            const now = new Date();
            const startDate = new Date('2025-12-13T00:00:00');
            const endDate = new Date('2025-12-24T23:59:59');

            if (now < startDate) {
                // Antes de que comience
                const difference = startDate.getTime() - now.getTime();
                const daysUntilStart = Math.ceil(difference / (1000 * 60 * 60 * 24));
                setStatus({ type: 'before', daysUntilStart });
            } else if (now <= endDate) {
                // Durante el evento
                const currentDay = Math.min(
                    Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
                    12
                );
                setStatus({ type: 'active', currentDay });
            } else {
                // Después de que terminó
                setStatus({ type: 'ended' });
            }
        };

        calculateStatus();
    }, []);

    const getContent = () => {
        switch (status.type) {
            case 'before':
                return {
                    title: '¡Pronto comenzará el calendario!',
                    badge: `Faltan ${status.daysUntilStart} ${status.daysUntilStart === 1 ? 'día' : 'días'}`,
                    badgeColor: '#8b8af8',
                    description: 'Del 13 al 24 de diciembre - ¡Regresa pronto para abrir tu primer regalo!',
                };
            case 'active':
                return {
                    title: '¡El calendario está activo!',
                    badge: `Día ${status.currentDay} ACTIVO`,
                    badgeColor: '#4ade80',
                    description: 'Del 13 al 24 de diciembre - ¡Abre un regalo cada día!',
                };
            case 'ended':
                return {
                    title: '¡El calendario ha finalizado!',
                    badge: 'FINALIZADO',
                    badgeColor: '#8b8af8',
                    description: 'Gracias por participar en nuestro Calendario de Adviento LOKL.',
                };
        }
    };

    const content = getContent();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[90%] md:max-w-2xl p-0 bg-transparent border-none shadow-none">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl p-8 md:p-12 backdrop-blur-md border-2"
                    style={{
                        background: 'linear-gradient(135deg, rgba(131, 138, 248, 0.95) 0%, rgba(83, 82, 254, 0.95) 100%)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    {/* Icono de regalo */}
                    <div className="flex justify-center mb-4 md:mb-6">
                        <div className="rounded-full bg-white/20 p-3 md:p-4">
                            <Gift className="text-white" size={40} />
                        </div>
                    </div>

                    {/* Título */}
                    <DialogTitle className="text-white text-center mb-4 md:mb-6 text-2xl md:text-4xl font-bold">
                        {content.title}
                    </DialogTitle>

                    {/* Badge de estado */}
                    <div className="flex justify-center mb-4 md:mb-6">
                        <div
                            className="px-4 py-2 md:px-6 md:py-3 rounded-full backdrop-blur-sm flex items-center gap-2"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                        >
                            {status.type === 'active' && (
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
                                    <div className="relative w-3 h-3 bg-green-400 rounded-full" />
                                </div>
                            )}
                            <span className="text-white font-bold text-base md:text-lg">
                                {content.badge}
                            </span>
                        </div>
                    </div>

                    {/* Descripción */}
                    <DialogDescription className="text-white/90 text-center text-base md:text-lg mb-6">
                        {content.description}
                    </DialogDescription>

                    {/* Botón de Inscripción */}
                    <motion.button
                        onClick={() => {
                            if (token) {
                                // Si ya está logueado, solo cierra el popup
                                setIsOpen(false);
                            } else {
                                // Si no está logueado, abre el registro
                                onOpenRegistration();
                                setIsOpen(false);
                            }
                        }}
                        className="w-full max-w-xs mx-auto block text-white py-3 md:py-4 px-6 rounded-full font-bold text-base md:text-lg shadow-xl transition-all"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.35)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {token ? 'Ir al Calendario' : 'Únete al Reto Navideño'}
                    </motion.button>

                    {/* Términos y condiciones */}
                    <div className="mt-4 text-center">
                        <a
                            href="https://drive.google.com/file/d/1ITLVvRaMY_MG5w5uShgmO-0S3cYWJV3N/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 text-xs md:text-sm hover:text-white underline transition-colors"
                        >
                            Términos y condiciones
                        </a>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
