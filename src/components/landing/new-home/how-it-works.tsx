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
      badgeIcon: Zap,
      href: '/register',
      target: '_self'
    },
    {
      number: '2',
      titleItalic: '2. EXPLORA',
      titleBold: 'PROYECTOS',
      description: 'Conoce cada proyecto, simula tu inversión y modela tu suscripción para pagos por cuotas y sin recargos.',
      icon: Search,
      cardStyle: 'dark', // Tarjeta negra
      badge: 'Sin compromiso',
      badgeIcon: Sparkles,
      href: 'https://lokl.life/project/nido-de-agua',
      target: '_blank'
    },
    {
      number: '3',
      titleItalic: '3. CRECE TU',
      titleBold: 'PORTAFOLIO',
      description: 'Obtén altas rentabilidades y disfruta de sus beneficios únicos que tenemos para todos los inversionistas.',
      icon: TrendingUp,
      cardStyle: 'primary', // Tarjeta azul
      badge: 'Rentabilidad alta',
      badgeIcon: CheckCircle2,
      href: '#',
      target: '_self'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#F3F3F3] relative overflow-hidden">
      {/* Decoraciones de fondo optimizadas para móvil */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradiente superior mejorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5352F6]/8 via-transparent to-[#5352F6]/8" />
        
        {/* Círculos decorativos - reducidos en móvil */}
        <div className="absolute top-20 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-[#5352F6]/10 to-[#5352F6]/3 md:from-[#5352F6]/15 md:to-[#5352F6]/5 rounded-full blur-[80px] md:blur-[140px]" />
        <div className="absolute bottom-40 -right-20 w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-gradient-to-tl from-[#5352F6]/10 to-[#5352F6]/3 md:from-[#5352F6]/15 md:to-[#5352F6]/5 rounded-full blur-[70px] md:blur-[120px]" />
        
        {/* Patrón de puntos - más sutil en móvil */}
        <div className="hidden md:block absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header premium mejorado */}
        <div className="text-center mb-12 md:mb-20 lg:mb-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="text-foreground">¿CÓMO </span>
            <span className="text-[#5352F6]">FUNCIONA?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tres simples pasos para comenzar a invertir en proyectos inmobiliarios
          </p>
        </div>

        {/* Layout responsive: Stack en móvil, diagonal en desktop */}
        <div className="flex flex-col gap-8 md:gap-12 lg:relative lg:min-h-[1300px]">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            // Posicionamiento escalonado diagonal solo en desktop
            const positions = [
              'lg:absolute lg:top-0 lg:left-8',
              'lg:absolute lg:top-[26rem] lg:right-8',
              'lg:absolute lg:top-[52rem] lg:left-8'
            ];

            // Estilos dinámicos optimizados
            const getCardStyles = () => {
              switch(step.cardStyle) {
                case 'white':
                  return {
                    container: 'bg-white border-2 border-gray-200 shadow-lg md:shadow-[0_10px_40px_rgb(0,0,0,0.1),0_2px_8px_rgb(0,0,0,0.06)]',
                    titleMain: 'text-gray-900',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-gray-600',
                    iconBg: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 shadow-md md:shadow-lg',
                    iconColor: 'text-gray-700',
                    iconRing: 'md:ring-2 md:ring-gray-200/50',
                    numberBg: 'bg-gradient-to-br from-[#5352F6] via-[#5352F6] to-[#5352F6]/90 shadow-md shadow-[#5352F6]/20 md:shadow-lg md:shadow-[#5352F6]/30',
                    numberColor: 'text-white',
                    hoverEffect: 'md:hover:shadow-[0_20px_60px_rgb(0,0,0,0.15),0_4px_12px_rgb(0,0,0,0.1)] md:hover:border-gray-300 md:hover:-translate-y-2',
                    glow: 'md:group-hover:shadow-[0_0_30px_rgba(83,82,246,0.15)]',
                    decorativeGradient: 'from-[#5352F6]/5 to-transparent'
                  };
                case 'dark':
                  return {
                    container: 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-2 border-gray-700/60 shadow-lg md:shadow-[0_10px_50px_rgb(0,0,0,0.5)]',
                    titleMain: 'text-white',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-gray-300',
                    iconBg: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-xl md:shadow-2xl',
                    iconColor: 'text-gray-100',
                    iconRing: 'md:ring-2 md:ring-gray-600/40',
                    numberBg: 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 shadow-lg shadow-gray-900/30 md:shadow-xl md:shadow-gray-900/50',
                    numberColor: 'text-gray-100',
                    hoverEffect: 'md:hover:shadow-[0_20px_80px_rgb(0,0,0,0.7)] md:hover:border-gray-600 md:hover:-translate-y-2',
                    glow: 'md:group-hover:shadow-[0_0_40px_rgba(83,82,246,0.2)]',
                    decorativeGradient: 'from-[#5352F6]/10 to-transparent'
                  };
                case 'primary':
                  return {
                    container: 'bg-gradient-to-br from-[#5352F6] via-[#5352F6] to-[#4241d4] border-2 border-[#5352F6]/40 shadow-lg shadow-[#5352F6]/20 md:shadow-[0_10px_50px_rgba(83,82,246,0.4)]',
                    titleMain: 'text-white',
                    titleHighlight: 'text-white font-extrabold drop-shadow-lg',
                    description: 'text-white/95',
                    iconBg: 'bg-white/20 shadow-xl md:shadow-2xl',
                    iconColor: 'text-white drop-shadow-lg',
                    iconRing: 'md:ring-2 md:ring-white/30',
                    numberBg: 'bg-white/25 shadow-xl shadow-[#5352F6]/30 md:shadow-2xl md:shadow-[#5352F6]/50',
                    numberColor: 'text-white',
                    hoverEffect: 'md:hover:shadow-[0_25px_80px_rgba(83,82,246,0.6)] md:hover:scale-[1.02] md:hover:-translate-y-3',
                    glow: 'md:group-hover:shadow-[0_0_60px_rgba(83,82,246,0.5)]',
                    decorativeGradient: 'from-white/10 to-transparent'
                  };
                default:
                  return {
                    container: 'bg-card/80 border-2 border-border/50 shadow-lg',
                    titleMain: 'text-foreground',
                    titleHighlight: 'text-[#5352F6]',
                    description: 'text-muted-foreground',
                    iconBg: 'bg-[#5352F6]/10',
                    iconColor: 'text-[#5352F6]',
                    iconRing: '',
                    numberBg: 'bg-gradient-to-br from-[#5352F6]/10 to-[#5352F6]/5',
                    numberColor: 'text-[#5352F6]',
                    hoverEffect: 'md:hover:shadow-xl md:hover:border-border',
                    glow: '',
                    decorativeGradient: 'from-[#5352F6]/5 to-transparent'
                  };
              }
            };

            const styles = getCardStyles();

            return (
              <div 
                key={step.number} 
                className={`w-full max-w-xl mx-auto lg:max-w-2xl group ${positions[index]}`}
              >
                {/* Líneas conectoras - solo en desktop */}
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

                {/* Glow de fondo - reducido en móvil */}
                <div className={`hidden md:block absolute inset-0 rounded-[2.5rem] ${styles.glow} transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl`} />

                {/* Link que cubre toda la tarjeta en desktop */}
                {step.href && step.href !== '#' && (
                  <a 
                    href={step.href} 
                    target={step.target} 
                    rel={step.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="hidden md:block absolute inset-0 z-30 rounded-2xl md:rounded-[2.5rem]"
                    aria-label={`Ir a ${step.titleBold}`}
                  />
                )}

                {/* Tarjeta optimizada para móvil */}
                <div className={`${styles.container} ${styles.hoverEffect} rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 lg:p-16 transition-all duration-300 md:duration-500 relative overflow-hidden will-change-transform`}>
                  
                  {/* Efectos de fondo internos - reducidos en móvil */}
                  <div className={`hidden md:block absolute inset-0 bg-gradient-to-br ${styles.decorativeGradient} pointer-events-none`} />
                  <div className={`hidden md:block absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${styles.decorativeGradient} rounded-full blur-3xl`} />
                  <div className={`hidden md:block absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tl ${styles.decorativeGradient} rounded-full blur-2xl`} />
                  
                  {/* Badge de número optimizado */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-20">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${styles.numberBg} flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-300 md:duration-500 ${styles.iconRing}`}>
                      <span className={`${styles.numberColor} font-extrabold text-xl md:text-2xl`}>{step.number}</span>
                    </div>
                  </div>

                  {/* Layout horizontal mejorado */}
                  <div className="flex flex-col relative z-10 mt-4 md:mt-6">
                    
                    {/* Ícono y título en la misma fila */}
                    <div className="flex flex-row gap-3 md:gap-6 items-center mb-4 md:mb-6">
                      {/* Ícono optimizado */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 ${styles.iconBg} ${styles.iconRing} rounded-xl md:rounded-[1.5rem] flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-300 md:duration-500 relative overflow-hidden`}>
                          {/* Gradient overlay animado - solo desktop */}
                          <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <IconComponent className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${styles.iconColor} md:group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                        </div>
                      </div>

                      {/* Título optimizado con subrayado completo */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl lg:text-4xl leading-tight md:group-hover:translate-x-2 transition-transform duration-300">
                          {step.href && step.href !== '#' ? (
                            <a 
                              href={step.href} 
                              target={step.target} 
                              rel={step.target === '_blank' ? 'noopener noreferrer' : undefined}
                              className={`md:pointer-events-none inline-block pb-1 md:pb-2 border-b-2 md:border-b-[3px] ${
                                step.cardStyle === 'white' 
                                  ? 'border-[#5352F6]' 
                                  : step.cardStyle === 'dark'
                                  ? 'border-[#5352F6]'
                                  : 'border-white'
                              } hover:opacity-80 transition-opacity`}
                            >
                              <span className={`font-normal ${styles.titleMain}`}>
                                {step.titleItalic.replace(/^\d+\.\s*/, '')}
                              </span>
                              {' '}
                              <span className={`font-bold ${styles.titleHighlight}`}>
                                {step.titleBold}
                              </span>
                            </a>
                          ) : (
                            <span className={`inline-block pb-1 md:pb-2 border-b-2 md:border-b-[3px] ${
                              step.cardStyle === 'white' 
                                ? 'border-[#5352F6]' 
                                : step.cardStyle === 'dark'
                                ? 'border-[#5352F6]'
                                : 'border-white'
                            }`}>
                              <span className={`font-normal ${styles.titleMain}`}>
                                {step.titleItalic.replace(/^\d+\.\s*/, '')}
                              </span>
                              {' '}
                              <span className={`font-bold ${styles.titleHighlight}`}>
                                {step.titleBold}
                              </span>
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>

                    {/* Descripción optimizada */}
                    <div className="space-y-4 md:space-y-6">
                      <p className={`text-base md:text-lg lg:text-xl leading-relaxed ${styles.description} max-w-3xl`}>
                        {step.description}
                      </p>

                      {/* Línea decorativa inferior - solo desktop */}
                      <div className="hidden md:block pt-2">
                        <div className="h-1.5 w-0 group-hover:w-32 bg-gradient-to-r from-[#5352F6] via-[#5352F6]/80 to-[#5352F6]/50 rounded-full transition-all duration-700" />
                      </div>
                    </div>
                  </div>

                  {/* Efectos de hover - solo desktop */}
                  <div className="hidden md:block absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Shine effect - solo desktop */}
                  <div className="hidden md:block absolute inset-0 rounded-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500" />
                  </div>

                  {/* Partículas decorativas - solo desktop */}
                  <div className="hidden md:block absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#5352F6]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 blur-sm" />
                  <div className="hidden md:block absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#5352F6]/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 blur-sm" />
                  
                  {/* Borde interno - solo desktop */}
                  <div className="hidden md:block absolute inset-0 rounded-[2.5rem] border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}




