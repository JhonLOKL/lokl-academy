'use client';

import React, { useState } from 'react';
import {
    Download,
    Users,
    Handshake,
    Crown,
    Calculator,
    RotateCw,
    GraduationCap,
    Box,
    MessageSquare,
    Hash,
    Lightbulb,
    UserCheck,
    Volume2,
    List,
    Ban,
    Shield,
    CheckCircle2
} from 'lucide-react';
import { ReportJsonLd } from '@/components/reports/ReportJsonLd';

const EmbajadoresLoklPage = () => {
    const [investmentAmount, setInvestmentAmount] = useState<number>(20000000);

    const calculateCommission = (amount: number) => {
        // 3.0% Commission for Partner Tier
        const commission = amount * 0.03;
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(commission);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <ReportJsonLd
                title="Programa de Embajadores LOKL - Guía Visual"
                description="Descubre cómo convertirte en un Community Builder del ecosistema LOKL. Conoce los niveles, comisiones y beneficios del programa de embajadores."
                url="https://lokl.life/reports/embajadores-lokl"
                datePublished="2026-02-04"
                image="https://lokl.life/images/reports/embajadores-og.jpg"
            />

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body { background-color: white; color: black; }
                    .no-print { display: none; }
                    .print-border { border: 1px solid #ccc; box-shadow: none; page-break-inside: avoid; }
                    .bg-lokl-primary { background-color: #5352F6 !important; -webkit-print-color-adjust: exact; }
                    .text-lokl-primary { color: #5352F6 !important; -webkit-print-color-adjust: exact; }
                }
            `}</style>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50 no-print">
                <button
                    onClick={handlePrint}
                    className="bg-[#5352F6] hover:bg-[#4241C5] text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <Download size={18} />
                    Guardar como PDF
                </button>
            </div>

            {/* Main Container */}
            <div className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E5E5E5]">

                {/* Header Hero */}
                <header className="bg-[#FAFAFA] p-10 text-center border-b border-[#E5E5E5] relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#5352F6]"></div>

                    <div className="inline-block bg-[#5352F6]/10 text-[#5352F6] px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wider">
                        #CreceConLokl
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-[#0F0F0F] tracking-tight leading-tight">
                        EMBAJADOR <span className="text-[#5352F6]">LOKL</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#6D6C6C] font-light">
                        Ecosistema de Inversión Colaborativa
                    </p>
                </header>

                {/* Philosophy Section */}
                <section className="p-10 text-center bg-white">
                    <h2 className="text-2xl font-bold text-[#0F0F0F] mb-4">
                        ¿QUÉ ES UN COMMUNITY BUILDER?
                    </h2>
                    <div className="w-16 h-1 bg-[#5352F6] mx-auto mb-6 rounded-full"></div>
                    <p className="text-[#444444] max-w-3xl mx-auto leading-relaxed text-lg">
                        No eres un vendedor tradicional. Eres un arquitecto de comunidades que conecta a personas con oportunidades de inversión consciente.{' '}
                        <span className="text-[#5352F6] font-semibold">
                            Tu misión es educar, guiar y generar confianza.
                        </span>
                    </p>
                </section>

                {/* The 3 Levels */}
                <section className="p-10 bg-[#FAFAFA] border-y border-[#E5E5E5]">
                    <h2 className="text-center text-3xl font-bold mb-10 flex items-center justify-center gap-3 text-[#0F0F0F]">
                        <Users className="text-[#5352F6]" size={32} />
                        TU RUTA DE CRECIMIENTO
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Level 1: Friend */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#D1D1D1]"></div>
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-3 text-[#6D6C6C]">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F]">LOKL FRIEND</h3>
                                <p className="text-xs uppercase tracking-widest text-[#6D6C6C] mt-1">
                                    Nivel Inicial
                                </p>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="bg-[#FAFAFA] border border-[#E5E5E5] p-3 rounded-lg text-center">
                                    <p className="text-xs text-[#6D6C6C] uppercase font-semibold">Comisión</p>
                                    <p className="text-3xl font-bold text-[#5352F6]">1.5%</p>
                                </div>
                                <ul className="text-sm text-[#444444] space-y-3 mt-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Usuario activo.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Relación ocasional.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Código básico.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Level 2: Partner (Highlighted) */}
                        <div className="bg-white border-2 border-[#5352F6] rounded-xl p-6 shadow-lg flex flex-col relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#5352F6]"></div>
                            <div className="absolute top-4 right-4">
                                <span className="bg-[#5352F6] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                    Popular
                                </span>
                            </div>
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-[#5352F6]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#5352F6]">
                                    <Handshake size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#5352F6]">LOKL PARTNER</h3>
                                <p className="text-xs uppercase tracking-widest text-[#6D6C6C] mt-1">
                                    Comprometido
                                </p>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="bg-[#FAFAFA] border border-[#5352F6]/20 p-3 rounded-lg text-center">
                                    <p className="text-xs text-[#6D6C6C] uppercase font-semibold">Comisión</p>
                                    <p className="text-4xl font-bold text-[#5352F6]">3.0%</p>
                                </div>
                                <div className="bg-[#5352F6]/5 p-2 rounded-lg text-xs text-center text-[#5352F6] font-semibold border border-[#5352F6]/10">
                                    Requisito: Inversión Activa
                                    <br />
                                    <span className="opacity-75 font-normal">(Skin in the game)</span>
                                </div>
                                <ul className="text-sm text-[#444444] space-y-3 mt-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Tráfico real validado.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Acceso a Academia.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Beneficios ecosistema.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Level 3: Ambassador */}
                        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22C55E]"></div>
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#22C55E]">
                                    <Crown size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0F0F0F]">AMBASSADOR</h3>
                                <p className="text-xs uppercase tracking-widest text-[#6D6C6C] mt-1">
                                    Profesional
                                </p>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="bg-[#FAFAFA] border border-[#E5E5E5] p-3 rounded-lg text-center">
                                    <p className="text-xs text-[#6D6C6C] uppercase font-semibold">Comisión</p>
                                    <p className="text-3xl font-bold text-[#22C55E]">4.5%</p>
                                </div>
                                <div className="bg-[#22C55E]/5 p-2 rounded-lg text-xs text-center text-[#22C55E] font-semibold border border-[#22C55E]/10">
                                    Requisito: Inversión +<br />
                                    {'>'}3 Referidos/mes
                                </div>
                                <ul className="text-sm text-[#444444] space-y-3 mt-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Kits exclusivos VIP.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Formación Avanzada.
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#22C55E] mt-0.5 flex-shrink-0" size={18} />
                                        Bonos recurrentes.
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Commission Simulator */}
                    <div className="mt-8 bg-white border-2 border-[#5352F6]/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-[#0F0F0F] mb-4 flex items-center gap-2">
                            <Calculator className="text-[#5352F6]" size={20} />
                            Simulador de Comisiones
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div>
                                <label className="block text-sm font-medium text-[#444444] mb-2">
                                    Monto de Inversión del Referido (COP)
                                </label>
                                <input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                    className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-3 text-[#0F0F0F] outline-none focus:border-transparent focus:ring-2 focus:ring-[#5352F6] transition-all"
                                    placeholder="Ej. 20000000"
                                />
                            </div>

                            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-3 flex justify-between items-center h-[50px]">
                                <span className="text-sm font-medium text-[#6D6C6C]">
                                    Comisión Partner (3.0%):
                                </span>
                                <span className="text-xl font-bold text-[#5352F6]">
                                    {calculateCommission(investmentAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payment Cycle and Academy */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-[#E5E5E5]">

                    {/* Payment Cycle */}
                    <div className="p-10 bg-white border-b md:border-b-0 md:border-r border-[#E5E5E5]">
                        <h3 className="text-xl font-bold text-[#0F0F0F] mb-8 flex items-center gap-2">
                            <RotateCw className="text-[#5352F6]" size={20} />
                            CICLO DE PAGOS
                        </h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[15px] top-2 bottom-4 w-0.5 bg-[#E5E5E5]"></div>

                            {[
                                { num: 1, title: 'Corte de Resultados', desc: 'Fin de mes. Cierre de transacciones.', active: true },
                                { num: 2, title: 'Validación', desc: 'Verificación antifraude y KYC.', active: false },
                                { num: 3, title: 'Liquidación', desc: 'Cálculo de comisiones según nivel.', active: false },
                                { num: 4, title: 'Dispersión', desc: 'Pago a cuenta bancaria.', active: true, success: true }
                            ].map((step) => (
                                <div key={step.num} className="relative pl-12">
                                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm z-10 ${step.active
                                        ? step.success
                                            ? 'bg-[#22C55E] text-white'
                                            : 'bg-[#5352F6] text-white'
                                        : 'bg-white border-2 border-[#5352F6] text-[#5352F6]'
                                        }`}>
                                        {step.num}
                                    </div>
                                    <h4 className="font-bold text-[#0F0F0F] text-sm">{step.title}</h4>
                                    <p className="text-xs text-[#6D6C6C]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LOKL Academy */}
                    <div className="p-10 bg-[#FAFAFA]">
                        <h3 className="text-xl font-bold text-[#0F0F0F] mb-8 flex items-center gap-2">
                            <GraduationCap className="text-[#5352F6]" size={20} />
                            ACADEMIA LOKL
                        </h3>
                    <div className="space-y-4">
                        {[
                            { icon: <Box size={18} />, title: 'Modelo de Negocio', desc: 'Domina: Derechos Fiduciarios y Plusvalía Regenerativa.' },
                            { icon: <MessageSquare size={18} />, title: 'Venta Consultiva', desc: 'Uso del simulador financiero y manejo de objeciones.' },
                            { icon: <Hash size={18} />, title: 'Content Creation', desc: 'Masterclass de Reels y Hooks para atraer leads.' }
                        ].map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E5E5] flex items-start gap-4 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-[#5352F6]/10 rounded-lg text-[#5352F6]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F0F0F] text-sm">{item.title}</h4>
                                        <p className="text-xs text-[#6D6C6C] mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Strategy */}
                <section className="p-10 bg-white border-b border-[#E5E5E5]">
                    <h3 className="text-center text-xl font-bold text-[#0F0F0F] mb-8 flex items-center justify-center gap-2">
                        <Lightbulb className="text-[#F59E0B]" size={24} />
                        SECRETOS PARA VENDER MÁS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#FAFAFA] p-6 rounded-xl border border-[#E5E5E5]">
                            <h4 className="text-[#5352F6] font-bold mb-2 flex items-center gap-2">
                                <UserCheck size={18} />
                                Buyer Persona
                            </h4>
                            <p className="text-sm text-[#444444] leading-relaxed">
                                Busca profesionales entre <strong>30-45 años</strong>. Valoran la libertad financiera y el estilo de vida nómada, pero no tienen capital para comprar un inmueble entero de contado.
                            </p>
                        </div>
                        <div className="bg-[#FAFAFA] p-6 rounded-xl border border-[#E5E5E5]">
                            <h4 className="text-[#5352F6] font-bold mb-2 flex items-center gap-2">
                                <Volume2 size={18} />
                                El Pitch Correcto
                            </h4>
                            <p className="text-sm text-[#444444] leading-relaxed">
                                No vendas ladrillos. Di: <strong>&quot;¿Te gustaría ser dueño del hotel donde vas de vacaciones?&quot;</strong> o &quot;Pon tus ahorros a rentar en dólares&quot;.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Steps and Rules */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-10 bg-[#FAFAFA] border-b md:border-b-0 md:border-r border-[#E5E5E5]">
                        <h3 className="text-xl font-bold text-[#0F0F0F] mb-6 flex items-center gap-2">
                            <List className="text-[#5352F6]" size={20} />
                            RUTA DE ACTIVACIÓN
                        </h3>
                        <ul className="text-sm space-y-4 text-[#444444]">
                            {[
                                'Registro en lokl.life',
                                'Generación de Código Único',
                                'Firma de acuerdo y Validación KYC',
                                'Descarga de Kits en el Drive'
                            ].map((step, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#E5E5E5] text-[#6D6C6C] flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    <span dangerouslySetInnerHTML={{ __html: step.includes('lokl.life') ? step.replace('lokl.life', '<strong>lokl.life</strong>') : step }} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Red Lines */}
                    <div className="p-10 bg-[#EF4444]/5 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 left-0 h-full w-1.5 bg-[#EF4444]"></div>
                        <h3 className="text-xl font-bold text-[#EF4444] mb-6 flex items-center gap-2">
                            <Shield size={20} />
                            LÍNEAS ROJAS
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-[#444444]">
                                <Ban className="text-[#EF4444] mt-1 flex-shrink-0" size={18} />
                                <span>
                                    <strong>CERO RECAUDO:</strong> Nunca recibas dinero en tus cuentas personales. Es delito.
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-[#444444]">
                                <Shield className="text-[#EF4444] mt-1 flex-shrink-0" size={18} />
                                <span>
                                    <strong>HABEAS DATA:</strong> No registres a nadie sin su permiso explícito.
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Footer */}
                <footer className="p-6 bg-[#FAFAFA] text-center border-t border-[#E5E5E5]">
                    <p className="text-[#6D6C6C] text-xs">
                        Basado en el Manual Integral de Estrategia LOKL. Comisiones sujetas a términos y condiciones vigentes.
                    </p>
                </footer>

            </div>
        </>
    );
};

export default EmbajadoresLoklPage;
