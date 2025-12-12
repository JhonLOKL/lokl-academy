"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RewardModal } from './rewardmodal';
import { RegistrationModal } from './registrationmodal';
import { ThankYouPopup } from './thankyoupopup';
import { CountdownCalendar } from './countdowncalendar';
import { Gift, Snowflake, Star, TreePine, Candy, Sparkles, Heart, Bell, Check } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { claimRewardAction } from '@/actions/EnrollPageAction';
import { getEnrollPageService } from '@/services/EnrollPageService';

// Mock types and data since they are missing
interface Reward {
    day: number;
    title: string;
    description: string;
    imageUrl: string;
    ctaButton: string;
}

// Mock rewards data for testing - replace with actual data later
const rewards: Reward[] = [
    {
        day: 1,
        title: 'Clase Magistral con Camilo',
        description: 'La Mejor Inversión es el Conocimiento. Aprende la estrategia LOKL para evaluar proyectos con propósito y oportunidades reales con Camilo y expertos.',
        imageUrl: 'https://lokl-assets.s3.us-east-1.amazonaws.com/advent+calendar/Banner+Dia+1+.webp',
        ctaButton: 'Acceder GRATIS a la Masterclass',
    },
    {
        day: 2,
        title: 'Granizado Ilimitado x 1 Día (*cupos limitados)',
        description: 'Energía Ilimitada para tu Propósito. Disfruta de todos los granizados que quieras durante un día completo en el Café INDIE. Porque la creatividad también necesita sabor.',
        imageUrl: 'https://lokl-assets.s3.us-east-1.amazonaws.com/advent+calendar/Banner+Dia+2+.webp',
        ctaButton: '¡Activar mi Granizado Ilimitado!',
    },
    {
        day: 3,
        title: 'Cashback 1% en Créditos INDIE (*cupos limitados)',
        description: 'El Retorno Inteligente. Invierte en Units LOKL y recibe 1% de cashback en créditos para usar en todo el ecosistema: hotel, café, labs, cowork. Tu inversión te beneficia hoy.',
        imageUrl: 'https://lokl-assets.s3.us-east-1.amazonaws.com/advent+calendar/Banner+Dia+3+.webp',
        ctaButton: 'Quiero Invertir y Ganar Créditos INDIE',
    },
    {
        day: 4,
        title: '10% OFF Membresía Mensual Cowork (*cupos limitados)',
        description: 'Invertir en tu Entorno. El espacio que te hace crecer. 10% OFF en tu primera mensualidad de Cowork INDIE. Construye patrimonio con hábitos, no con impulsos.',
        imageUrl: 'https://images.unsplash.com/photo-1659044537787-a2ac4ce1d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBtZW1iZXJzaGlwJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2NDc4OTM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Asegurar Mi Descuento (Válido 72 Horas)',
    },
    {
        day: 5,
        title: 'Cowork Day Pass Gratis (*cupos limitados)',
        description: 'Cambia tu Entorno, Cambia tu Mente. Trabaja un día completo en INDIE sin pagar un peso. El entorno es la infraestructura de tu éxito.',
        imageUrl: 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NjQ2OTc0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Agendar Mi Día de Coworking LOKL',
    },
    {
        day: 6,
        title: 'Ebook: Guía de Inversión Consciente 2025',
        description: 'La Herramienta Esencial. Descarga la Guía de Inversión Consciente 2025 con herramientas prácticas para evaluar proyectos y alinear tu dinero con tus valores.',
        imageUrl: 'https://images.unsplash.com/photo-1674664985250-4d023c679b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYm9vayUyMGRpZ2l0YWwlMjBndWlkZXxlbnwxfHx8fDE3NjQ3ODkzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Descargar Mi Guía Completa GRATIS',
    },
    {
        day: 7,
        title: '1 Hora Gratis en Content Lab (*cupos limitados)',
        description: 'Invierte en tu Marca. Un espacio para materializar tu valor. 1 hora GRATIS en cualquiera de nuestros Content Labs (audio, video, foto). Crea el activo que te hará crecer.',
        imageUrl: 'https://images.unsplash.com/photo-1616412875447-096e932d893c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjBzdHVkaW98ZW58MXx8fHwxNzY0NzQzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Reservar Mi Hora en el Content Lab',
    },
    {
        day: 8,
        title: 'Pase Semanal de Café',
        description: 'Haz de esto un Hábito. 1 bebida diaria por 7 días en INDIE. Cada día una taza, cada taza una oportunidad de crear algo grande. La excelencia está en la repetición consciente.',
        imageUrl: 'https://images.unsplash.com/photo-1622647306301-176abdc3f209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB3ZWVrbHklMjBwYXNzfGVufDF8fHx8MTc2NDc4OTM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Activar Mi Pase Semanal de Café',
    },
    {
        day: 9,
        title: 'Pase Visionario LOKL',
        description: 'Sube el Nivel de tu Visión. Acceso exclusivo a 3 webinars premium sobre inversión consciente, tendencias 2025 y proyectos que están redefiniendo el mercado + material descargable.',
        imageUrl: 'https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwYnVzaW5lc3MlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjQ3ODkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Obtener Mi Pase Visionario GRATIS',
    },
    {
        day: 10,
        title: 'Bono de Equity +0.5%',
        description: 'Más que Inversión. Por cada inversión realizada en Units este diciembre, recibes un Bono de Equity Extra de +0.5% en tu participación. El regalo que no se deprecia.',
        imageUrl: 'https://images.unsplash.com/photo-1740818576518-0c873d356122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcXVpdHklMjBib251cyUyMGdyb3d0aHxlbnwxfHx8fDE3NjQ3ODkzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Asegurar Mi Bono de Equity Extra',
    },
    {
        day: 11,
        title: 'Acceso Prioritario Evento con Camilo (*cupos limitados)',
        description: 'La Comunidad Primero. Acceso prioritario y garantizado al próximo evento exclusivo en INDIE. Un asiento asegurado junto a los líderes que redefinen la inversión.',
        imageUrl: 'https://images.unsplash.com/photo-1678483789476-14cd5debd709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBldmVudCUyMGFjY2Vzc3xlbnwxfHx8fDE3NjQ3ODkzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: 'Confirmar Mi Acceso Prioritario',
    },
    {
        day: 12,
        title: 'Descuento -2%/-3% en Units (48h)',
        description: 'DÍA FINAL: El Incentivo que SÍ Vale la Pena. Descuento Especial de -2% a -3% en Units de Inversión. Válido solo por 48 horas. Haz que tu dinero trabaje para tu propósito.',
        imageUrl: 'https://images.unsplash.com/photo-1653378972336-103e1ea62721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZGlzY291bnQlMjBvcHBvcnR1bml0eXxlbnwxfHx8fDE3NjQ3ODkzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ctaButton: '¡Invertir con Descuento Ahora!',
    },
];

export function CalendarGrid() {
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [pendingReward, setPendingReward] = useState<Reward | null>(null);
    const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

    // Get authentication state
    const { token, user } = useAuthStore();

    // Cargar recompensas reclamadas al iniciar
    useEffect(() => {
        const fetchClaimedRewards = async () => {
            if (token) {
                const response = await getEnrollPageService();
                if (response && response.success && response.data && response.data.notes) {
                    const claimed = response.data.notes.claimedRewards || [];
                    setClaimedRewards(claimed);
                }
            }
        };
        fetchClaimedRewards();
    }, [token]);

    const handleGiftClick = async (day: number) => {
        const reward = rewards.find((r) => r.day === day);
        if (reward && isUnlocked(day)) {
            // Verificar si el usuario está autenticado (tiene token)
            if (!token) {
                // Si no está autenticado, guardar el regalo pendiente y mostrar formulario de registro
                setPendingReward(reward);
                setShowRegistration(true);
            } else {
                // Si está autenticado, mostrar el regalo
                setSelectedReward(reward);
                setIsModalOpen(true);

                // Reclamar recompensa (la acción maneja la lógica de verificar si ya existe)
                try {
                    await claimRewardAction(day, {
                        title: reward.title,
                        claimedAt: new Date().toISOString()
                    }, user?.id || "", user?.email || "");

                    // Actualizar estado local
                    setClaimedRewards(prev => [...prev, day]);
                } catch (error) {
                    console.error("Error claiming reward:", error);
                }
            }
        } else {
            console.log(`Day ${day} clicked (Reward missing or locked)`);
        }
    };

    const handleRegistrationComplete = (data: { name: string; email: string; phone: string }) => {
        console.log('Registro completado:', data);
        localStorage.setItem('userRegistered', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
        setShowRegistration(false);

        // Mostrar el regalo que estaba pendiente
        if (pendingReward) {
            setSelectedReward(pendingReward);
            setIsModalOpen(true);
            setPendingReward(null);
        }
    };

    // Verificar si un regalo está desbloqueado
    const isUnlocked = (day: number) => {
        const now = new Date();
        // Fecha de inicio: 13 de Diciembre de 2025
        const startDate = new Date('2025-12-13T00:00:00');

        // Si aún no es la fecha de inicio, todo está bloqueado
        if (now < startDate) return false;

        // Calcular cuántos días han pasado desde el inicio
        const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const currentDay = daysSinceStart + 1;

        // Solo permitir ver el día actual. Días pasados y futuros bloqueados.
        return day === currentDay;
    };

    // Verificar si un regalo es el día activo
    const isActiveDay = (day: number) => {
        const now = new Date();
        const startDate = new Date('2025-12-13T00:00:00');

        if (now < startDate) return false;

        const currentDay = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return day === currentDay && day <= 12;
    };

    // Iconos para cada día - más navideños
    const dayIcons = [
        Gift,        // Día 1
        TreePine,    // Día 2  
        Snowflake,   // Día 3
        Star,        // Día 4
        Candy,       // Día 5
        Gift,        // Día 6
        Heart,       // Día 7
        TreePine,    // Día 8
        Sparkles,    // Día 9
        Snowflake,   // Día 10
        Star,        // Día 11
        Bell         // Día 12
    ];

    // Colores de fondo: morado principal, morado claro, blanco, blanco grisáceo
    const bgColors = ['#5352f6', '#8b8af8', '#ffffff', '#f5f5f5'];

    // Patrón de colores intercalados - evita morados consecutivos
    const colorPattern = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3]; // morado oscuro, blanco, morado claro, gris claro (repetir)

    // Grid de 12 días (3 + 3 + 3 + 3)
    const days = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div id="calendar" className="relative py-12 px-4 overflow-hidden">
            {/* Temporizador/Calendario */}
            <CountdownCalendar />

            {/* Grid de calendario */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {days.map((day, index) => {
                        const Icon = dayIcons[index];
                        const bgColor = bgColors[colorPattern[index]];
                        const isLight = bgColor === '#ffffff' || bgColor === '#f5f5f5';
                        const textColor = isLight ? '#1a1a1a' : '#ffffff';
                        const iconColor = isLight ? '#5352f6' : '#ffffff';
                        const unlocked = isUnlocked(day);
                        const active = isActiveDay(day);
                        const isClaimed = claimedRewards.includes(day);

                        return (
                            <motion.button
                                key={day}
                                onClick={() => handleGiftClick(day)}
                                disabled={!unlocked}
                                className="relative aspect-square rounded-2xl shadow-xl border-4 overflow-hidden transition-all"
                                style={{
                                    backgroundColor: bgColor,
                                    borderColor: active ? '#FFD600' : (isClaimed ? '#5352f6' : 'rgba(255,255,255,0.3)'),
                                    opacity: unlocked ? 1 : 0.4,
                                    cursor: unlocked ? 'pointer' : 'not-allowed',
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: unlocked ? 1 : 0.4,
                                    scale: 1
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05
                                }}
                                whileHover={unlocked ? {
                                    scale: 1.05,
                                    boxShadow: '0 20px 40px rgba(83, 82, 246, 0.3)'
                                } : {}}
                            >
                                {/* Número del día e indicador de reclamado */}
                                <div className="absolute top-2 left-1 md:top-3 md:left-3 z-20 flex items-center gap-1">
                                    <div
                                        className="w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg relative"
                                        style={{
                                            backgroundColor: isLight ? 'rgba(83, 82, 246, 0.15)' : 'rgba(255,255,255,0.2)',
                                            color: textColor
                                        }}
                                    >
                                        {day}
                                        {isClaimed && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                                                <Check size={12} className="text-white" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Punto activo */}
                                {active && (
                                    <motion.div
                                        className="absolute top-3 right-3 w-3 h-3 rounded-full shadow-lg z-20"
                                        style={{ backgroundColor: '#FFD600' }}
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}

                                {/* Icono central */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Icon
                                        size={64}
                                        style={{ color: iconColor }}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Efecto de brillo en hover */}
                                {unlocked && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Modal de recompensas */}
            <RewardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reward={selectedReward}
                onRewardClaimed={() => setShowThankYou(true)}
            />

            {/* Popup de agradecimiento */}
            <ThankYouPopup 
                isOpen={showThankYou} 
                onClose={() => setShowThankYou(false)} 
            />

            {/* Modal de registro */}
            <RegistrationModal
                isOpen={showRegistration}
                onClose={() => setShowRegistration(false)}
                onRegistrationComplete={handleRegistrationComplete}
            />
        </div>
    );
}
