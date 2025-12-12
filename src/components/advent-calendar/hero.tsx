"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';


export function Hero() {
    const scrollToCalendar = () => {
        const calendar = document.getElementById('calendar');
        if (calendar) {
            calendar.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative overflow-hidden bg-black min-h-screen flex items-center pt-16 md:pt-20">
            {/* Imagen de fondo en blanco y negro */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/advent+calendar/Foto+banner.png"
                    alt="Christmas background"
                    fill
                    className="object-cover opacity-40 hidden md:block"
                    unoptimized
                />
                <Image
                    src="https://lokl-assets.s3.us-east-1.amazonaws.com/advent+calendar/MovilBanner.png"
                    alt="Christmas background mobile"
                    fill
                    className="object-cover opacity-40 block md:hidden"
                    unoptimized
                />
            </div>

            {/* Contenido */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">

                {/* Título */}
                <motion.div
                    className="text-center mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-white mb-3 md:mb-4 font-bold text-[40px] md:text-[60px] leading-tight" style={{ textShadow: '0 8px 40px rgba(0,0,0,1), 0 6px 30px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 0 1px 5px rgba(0,0,0,0.7)' }}>
                        Calendario de Adviento LOKL
                    </h1>
                </motion.div>

                {/* Descripción */}
                <motion.p
                    className="text-center text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ textShadow: '0 6px 30px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.95), 0 3px 15px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.75), 0 1px 5px rgba(0,0,0,0.65)' }}
                >
                    Cada día desbloquea una recompensa exclusiva diseñada para impulsar tu crecimiento profesional.
                    Del 13 al 24 de diciembre, descubre ventajas únicas que te acercan a tus objetivos.
                </motion.p>

                {/* Botón */}
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button
                        onClick={scrollToCalendar}
                        className="px-8 py-3 md:px-10 md:py-4 rounded-full text-white text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: '#5252fe' }}
                    >
                        Comenzar
                    </button>

                    {/* Términos y condiciones */}
                    <div className="mt-4 text-center">
                        <a
                            href="https://drive.google.com/file/d/1ITLVvRaMY_MG5w5uShgmO-0S3cYWJV3N/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 text-xs md:text-sm hover:text-white underline transition-colors"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                            Términos y condiciones
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
