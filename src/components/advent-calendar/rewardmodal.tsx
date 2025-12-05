"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star } from 'lucide-react';
import Image from 'next/image';

interface Reward {
    day: number;
    title: string;
    description: string;
    imageUrl: string;
    ctaButton: string;
}

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    reward: Reward | null;
}

export function RewardModal({ isOpen, onClose, reward }: RewardModalProps) {
    if (!reward) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-[90%] md:max-w-lg w-full overflow-hidden border-4"
                        style={{ borderColor: '#5352f6' }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        {/* Estrellas decorativas */}
                        <div className="absolute top-4 left-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            >
                                <Star className="fill-current" style={{ color: '#5352f6' }} size={20} />
                            </motion.div>
                        </div>
                        <div className="absolute top-4 right-16">
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            >
                                <Star className="fill-current" style={{ color: '#5352f6' }} size={14} />
                            </motion.div>
                        </div>

                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-white rounded-full p-2 transition-colors shadow-lg"
                            style={{ backgroundColor: '#5352f6' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4242d6'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5352f6'}
                        >
                            <X size={20} />
                        </button>

                        {/* Contenido */}
                        <div className="p-6 md:p-8 text-center">
                            {/* Número del día */}
                            <motion.div
                                className="inline-flex items-center gap-2 text-white px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6 shadow-lg"
                                style={{ backgroundColor: '#5352f6' }}
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Gift size={20} />
                                <span className="text-lg md:text-xl font-semibold">Día {reward.day}</span>
                            </motion.div>

                            {/* Imagen */}
                            <motion.div
                                className="mb-4 md:mb-6 rounded-xl overflow-hidden shadow-xl relative w-full h-48 md:h-64"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Image
                                    src={reward.imageUrl}
                                    alt={reward.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </motion.div>

                            {/* Título */}
                            <motion.h2
                                className="text-gray-900 mb-3 md:mb-4 text-xl md:text-2xl font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {reward.title}
                            </motion.h2>

                            {/* Descripción */}
                            <motion.p
                                className="text-gray-800 mb-4 md:mb-6 text-sm md:text-base"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {reward.description}
                            </motion.p>

                            {/* Botón de CTA */}
                            <motion.button
                                className="text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transition-all hover:shadow-xl"
                                style={{ backgroundColor: '#5352f6' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4242d6'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5352f6'}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="font-bold text-base md:text-lg">{reward.ctaButton}</span>
                            </motion.button>
                        </div>

                        {/* Barra decorativa en la parte inferior */}
                        <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: `linear-gradient(to right, #5352f6, #7b7bff, #5352f6)` }} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
