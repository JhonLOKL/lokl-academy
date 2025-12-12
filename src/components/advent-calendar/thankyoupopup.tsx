"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Check } from 'lucide-react';

interface ThankYouPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ThankYouPopup({ isOpen, onClose }: ThankYouPopupProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-sm md:max-w-md w-full overflow-hidden border-4 border-white"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#5352f6_1px,transparent_1px)] [background-size:16px_16px]" />

                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 md:p-10 text-center relative z-10">
                            {/* Icono animado */}
                            <div className="mb-6 relative inline-block">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-[#5352f6]/10 flex items-center justify-center mx-auto"
                                >
                                    <Heart className="text-[#5352f6]" size={40} fill="#5352f6" />
                                </motion.div>
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Sparkles className="text-yellow-400" size={24} />
                                </motion.div>
                            </div>

                            <motion.h2
                                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                ¡ERES PARTE DE ALGO GRANDE!
                            </motion.h2>

                            <motion.p
                                className="text-gray-600 mb-8 text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                ¡Tu registro está confirmado! El regalo de nuestro Calendario de Adviento LOKL acaba de aterrizar en tu bandeja. Ve ahora, revisa y empieza a construir un futuro con propósito. 

                                <br />
                                <span className="text-[#5352f6] font-medium">¡Disfrútala!</span>
                            </motion.p>

                            <motion.button
                                onClick={onClose}
                                className="w-full bg-[#5352f6] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-[#5352f6]/20 transition-all hover:bg-[#4242d6] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Check size={20} />
                                Entendido
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}



