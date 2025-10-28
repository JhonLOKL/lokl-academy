"use client";

import { UserPlus, Search, TrendingUp, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      titleItalic: '1. REGÍSTRATE EN',
      titleBold: 'LOKL',
      description: 'Obtén acceso a oportunidades únicas de primera mano y herramientas para aprender acerca de inversiones',
      icon: UserPlus,
      cardStyle: 'white', // Tarjeta blanca
      badge: 'Fácil y rápido',
      badgeIcon: Zap
    },
    {
      number: '2',
      titleItalic: '2. EXPLORA',
      titleBold: 'PROYECTOS',
      description: 'Conoce cada proyecto, simula tu inversión y modela tu suscripción para pagos por cuotas y sin recargos.',
      icon: Search,
      cardStyle: 'dark', // Tarjeta negra
      badge: 'Sin compromiso',
      badgeIcon: Sparkles
    },
    {
      number: '3',
      titleItalic: '3. CRECE TU',
      titleBold: 'PORTAFOLIO',
      description: 'Obtén altas rentabilidades y disfruta de sus beneficios únicos que tenemos para todos los inversionistas.',
      icon: TrendingUp,
      cardStyle: 'primary', // Tarjeta azul
      badge: 'Rentabilidad alta',
      badgeIcon: CheckCircle2
    }
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#F3F3F3] relative overflow-hidden">
      {/* Decoraciones de fondo mejoradas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradiente superior mejorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5352F6]/8 via-transparent to-[#5352F6]/8" />
        
        {/* Círculos decorativos con blur y efectos mejorados */}
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#5352F6]/15 to-[#5352F6]/5 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 -right-20 w-[450px] h-[450px] bg-gradient-to-tl from-[#5352F6]/15 to-[#5352F6]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-[#5352F6]/8 rounded-full blur-[100px]" />
        
        {/* Patrón de puntos mejorado */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        
        {/* Grid sutil de fondo */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(83, 82, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(83, 82, 246, 0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header premium mejorado */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="text-foreground">¿CÓMO </span>
            <span className="text-[#5352F6]">FUNCIONA?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tres simples pasos para comenzar a invertir en proyectos inmobiliarios
          </p>
        </div>

                 {/* Patrón escalonado diagonal premium mejorado */}
         <div className="relative min-h-[1400px] md:min-h-[1500px] lg:min-h-[1300px]">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const BadgeIconComponent = step.badgeIcon;
            
                         // Posicionamiento escalonado diagonal
             const positions = [
               'top-0 left-0 lg:left-8',
               'top-[28rem] md:top-[32rem] right-0 lg:top-[26rem] lg:right-8',
               'top-[56rem] md:top-[64rem] left-0 lg:top-[52rem] lg:left-8'
             ];

            // Estilos dinámicos premium mejorados
            const getCardStyles = () => {
              switch(step.cardStyle) {
                case 'white':
                  return {
                    container: 'bg-white backdrop-blur-2xl border-2 border-gray-200 shadow-[0_10px_40px_rgb(0,0,0,0.1),0_2px_8px_rgb(0,0,0,0.06)]',
                    titleMain: 'text-gray-900',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-gray-600',
                    iconBg: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 shadow-lg',
                    iconColor: 'text-gray-700',
                    iconRing: 'ring-2 ring-gray-200/50',
                    numberBg: 'bg-gradient-to-br from-[#5352F6] via-[#5352F6] to-[#5352F6]/90 shadow-lg shadow-[#5352F6]/30',
                    numberColor: 'text-white',
                    hoverEffect: 'hover:shadow-[0_20px_60px_rgb(0,0,0,0.15),0_4px_12px_rgb(0,0,0,0.1)] hover:border-gray-300 hover:-translate-y-2',
                    glow: 'group-hover:shadow-[0_0_30px_rgba(83,82,246,0.15)]',
                    badgeBg: 'bg-[#5352F6]/10 border-[#5352F6]/20 text-[#5352F6]',
                    badgeGlow: '',
                    decorativeGradient: 'from-[#5352F6]/5 to-transparent'
                  };
                case 'dark':
                  return {
                    container: 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 backdrop-blur-2xl border-2 border-gray-700/60 shadow-[0_10px_50px_rgb(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]',
                    titleMain: 'text-white',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-gray-300',
                    iconBg: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-2xl',
                    iconColor: 'text-gray-100',
                    iconRing: 'ring-2 ring-gray-600/40',
                    numberBg: 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 shadow-xl shadow-gray-900/50',
                    numberColor: 'text-gray-100',
                    hoverEffect: 'hover:shadow-[0_20px_80px_rgb(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:border-gray-600 hover:-translate-y-2',
                    glow: 'group-hover:shadow-[0_0_40px_rgba(83,82,246,0.2)]',
                    badgeBg: 'bg-gray-800/80 border-gray-600/50 text-gray-200',
                    badgeGlow: 'shadow-lg shadow-gray-900/50',
                    decorativeGradient: 'from-[#5352F6]/10 to-transparent'
                  };
                case 'primary':
                  return {
                    container: 'bg-gradient-to-br from-[#5352F6] via-[#5352F6] to-[#4241d4] backdrop-blur-2xl border-2 border-[#5352F6]/40 shadow-[0_10px_50px_rgba(83,82,246,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]',
                    titleMain: 'text-white',
                    titleHighlight: 'text-white font-extrabold drop-shadow-lg',
                    description: 'text-white/95',
                    iconBg: 'bg-white/20 backdrop-blur-xl shadow-2xl',
                    iconColor: 'text-white drop-shadow-lg',
                    iconRing: 'ring-2 ring-white/30',
                    numberBg: 'bg-white/25 backdrop-blur-md shadow-2xl shadow-[#5352F6]/50',
                    numberColor: 'text-white',
                    hoverEffect: 'hover:shadow-[0_25px_80px_rgba(83,82,246,0.6),0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:scale-[1.02] hover:-translate-y-3',
                    glow: 'group-hover:shadow-[0_0_60px_rgba(83,82,246,0.5)]',
                    badgeBg: 'bg-white/20 border-white/30 text-white',
                    badgeGlow: 'shadow-lg shadow-[#5352F6]/30',
                    decorativeGradient: 'from-white/10 to-transparent'
                  };
                default:
                  return {
                    container: 'bg-card/80 backdrop-blur-xl border-2 border-border/50 shadow-lg',
                    titleMain: 'text-foreground',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-muted-foreground',
                    iconBg: 'bg-[#5352F6]/10',
                    iconColor: 'text-[#5352F6]',
                    iconRing: '',
                    numberBg: 'bg-gradient-to-br from-[#5352F6]/10 to-[#5352F6]/5',
                    numberColor: 'text-[#5352F6]',
                    hoverEffect: 'hover:shadow-xl hover:border-border',
                    glow: '',
                    badgeBg: 'bg-[#5352F6]/10 border-[#5352F6]/20 text-[#5352F6]',
                    badgeGlow: '',
                    decorativeGradient: 'from-[#5352F6]/5 to-transparent'
                  };
              }
            };

            const styles = getCardStyles();

            return (
              <div 
                key={step.number} 
                className={`absolute w-full max-w-xl lg:max-w-2xl group ${positions[index]}`}
              >
                {/* Líneas conectoras mejoradas con animación y glow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-24 left-1/2 transform -translate-x-1/2 z-0">
                    {/* Línea principal con gradiente y glow */}
                    <div className="relative">
                      <div className="w-1 h-16 bg-gradient-to-b from-[#5352F6]/40 via-[#5352F6]/20 to-transparent rounded-full" />
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-1 h-16 bg-gradient-to-b from-[#5352F6]/60 via-[#5352F6]/30 to-transparent rounded-full blur-sm" />
                      {/* Punto animado que viaja por la línea */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#5352F6] rounded-full shadow-lg shadow-[#5352F6]/50 animate-bounce" style={{ animationDuration: '2s', animationDelay: `${index * 0.5}s` }} />
                    </div>
                    {/* Flechas decorativas mejoradas */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[#5352F6]/40">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="drop-shadow-sm">
                        <path d="M8 0L16 8H0L8 0Z" transform="rotate(180 8 8)" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Glow de fondo mejorado */}
                <div className={`absolute inset-0 rounded-[2.5rem] ${styles.glow} transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl`} />

                {/* Tarjeta premium con glassmorphism mejorado */}
                <div className={`${styles.container} ${styles.hoverEffect} rounded-[2.5rem] p-10 md:p-12 lg:p-16 transition-all duration-500 relative overflow-hidden`}>
                  
                  {/* Efectos de fondo internos mejorados */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.decorativeGradient} pointer-events-none`} />
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${styles.decorativeGradient} rounded-full blur-3xl`} />
                  <div className={`absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tl ${styles.decorativeGradient} rounded-full blur-2xl`} />
                  
                  {/* Badge de número premium mejorado con ring y glow */}
                  <div className="absolute -top-4 -right-4 z-20">
                    <div className={`w-20 h-20 rounded-full ${styles.numberBg} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${styles.iconRing}`}>
                      <span className={`${styles.numberColor} font-extrabold text-2xl`}>{step.number}</span>
                    </div>
                    {/* Ring decorativo animado */}
                    <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-[#5352F6]/30 transition-all duration-300 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>

                  {/* Layout horizontal mejorado */}
                  <div className="flex flex-col relative z-10 mt-6 bg-[rgba(74,35,35,0)]">
                    
                    {/* Ícono y título en la misma fila */}
                    <div className="flex flex-row gap-4 md:gap-6 items-center mb-6">
                      {/* Ícono premium con animación mejorada */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-20 h-20 lg:w-24 lg:h-24 ${styles.iconBg} ${styles.iconRing} rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
                          {/* Gradient overlay animado */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <IconComponent className={`w-10 h-10 lg:w-12 lg:h-12 ${styles.iconColor} group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                          {/* Shine effect interno */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: 'all 1s ease-in-out' }} />
                        </div>
                        {/* Círculo decorativo externo con pulso */}
                        <div className="absolute -inset-2 rounded-[1.5rem] border-2 border-transparent group-hover:border-[#5352F6]/20 transition-all duration-500 opacity-0 group-hover:opacity-100 bg-[rgba(95,20,20,0)]" />
                      </div>

                      {/* Título con animación en hover mejorado */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:translate-x-2 transition-transform duration-300 flex-1">
                        {step.number === '1' ? (
                          <a href="/register" className="hover:opacity-80 transition-opacity">
                            <span className={`font-normal ${styles.titleMain}`}>
                              {step.titleItalic.replace(/^\d+\.\s*/, '')}
                            </span>
                            {' '}
                            <span className={`font-bold ${styles.titleHighlight}`}>
                              {step.titleBold}
                            </span>
                          </a>
                        ) : step.number === '2' ? (
                          <a href="https://lokl.life/project/nido-de-agua" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <span className={`font-normal ${styles.titleMain}`}>
                              {step.titleItalic.replace(/^\d+\.\s*/, '')}
                            </span>
                            {' '}
                            <span className={`font-bold ${styles.titleHighlight}`}>
                              {step.titleBold}
                            </span>
                          </a>
                        ) : (
                          <>
                            <span className={`font-normal ${styles.titleMain}`}>
                              {step.titleItalic.replace(/^\d+\.\s*/, '')}
                            </span>
                            {' '}
                            <span className={`font-bold ${styles.titleHighlight}`}>
                              {step.titleBold}
                            </span>
                          </>
                        )}
                      </h3>
                    </div>

                    {/* Descripción mejorada - Abajo con más espacio */}
                    <div className="space-y-6">
                      <p className={`text-lg lg:text-xl leading-relaxed ${styles.description} max-w-3xl`}>
                        {step.description}
                      </p>

                      {/* Línea decorativa inferior mejorada con gradiente */}
                      <div className="pt-2">
                        <div className="h-1.5 w-0 group-hover:w-32 bg-gradient-to-r from-[#5352F6] via-[#5352F6]/80 to-[#5352F6]/50 rounded-full transition-all duration-700 shadow-lg shadow-[#5352F6]/30" />
                      </div>


                    </div>


                  </div>

                  {/* Efecto de brillo animado en hover mejorado */}
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Shine effect que recorre la tarjeta mejorado */}
                  <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500" />
                  </div>

                  {/* Partículas decorativas (solo visible en hover) */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#5352F6]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 blur-sm" />
                  <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#5352F6]/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 blur-sm" />
                  
                  {/* Borde interno con brillo */}
                  <div className="absolute inset-0 rounded-[2.5rem] border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}




