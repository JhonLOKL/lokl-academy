"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegistrationComplete?: (data: { name: string; email: string; phone: string }) => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const router = useRouter();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                        className="relative bg-white rounded-2xl shadow-2xl max-w-[90%] md:max-w-md w-full overflow-hidden border-4"
                        style={{ borderColor: '#5352f6' }}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        {/* Header con gradiente */}
                        <div
                            className="p-6 md:p-8 text-white text-center"
                            style={{ background: 'linear-gradient(135deg, #5352f6 0%, #8b8af8 100%)' }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    <Gift className="text-white" size={32} />
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                ¡Únete al Reto Navideño!
                            </h2>
                            <p className="text-white/90 text-sm md:text-base">
                                Inicia sesión o crea una cuenta para desbloquear todos los regalos
                            </p>
                        </div>

                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-white rounded-full p-2 transition-colors"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'}
                        >
                            <X size={20} />
                        </button>

                        {/* Contenido */}
                        <div className="p-6 md:p-8 text-center">
                            <p className="text-gray-700 mb-6">
                                Para ver las recompensas del calendario de adviento necesitas tener una cuenta en LOKL.
                            </p>

                            <div className="flex flex-col gap-3 mb-4">
                                {/* Botón para ir a login */}
                                <motion.button
                                    onClick={() => {
                                        router.push('/login');
                                        onClose();
                                    }}
                                    className="w-full text-white py-3.5 rounded-lg font-bold text-base md:text-lg shadow-lg transition-all"
                                    style={{ backgroundColor: '#5352f6' }}
                                    whileHover={{ scale: 1.02, backgroundColor: '#4242d6' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Iniciar Sesión
                                </motion.button>

                                {/* Botón para ir a registro */}
                                <motion.button
                                    onClick={() => {
                                        router.push('/register');
                                        onClose();
                                    }}
                                    className="w-full text-[#5352f6] py-3.5 rounded-lg font-bold text-base md:text-lg shadow-md border-2 transition-all"
                                    style={{ borderColor: '#5352f6', backgroundColor: 'white' }}
                                    whileHover={{ scale: 1.02, backgroundColor: '#f0f0ff' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Crear Cuenta
                                </motion.button>
                            </div>

                            <p className="text-gray-500 text-xs">
                                Al inscribirte, aceptas participar en el calendario de adviento LOKL
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
