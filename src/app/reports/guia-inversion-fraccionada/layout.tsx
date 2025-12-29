import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guía de Inversión LOKL: Inmuebles Fraccionados',
    description: 'Tu mapa estratégico para construir patrimonio inmobiliario con LOKL, desde la primera fracción hasta la libertad financiera.',
    alternates: {
        canonical: 'https://lokl.life/reports/guia-inversion-fraccionada',
    },
};

export default function GuiaInversionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            <div className="p-4 md:p-10 max-w-7xl mx-auto">
                {/* Back Navigation */}
                <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 text-[#5352F6] hover:text-[#4241C5] transition-colors mb-8 font-medium"
                >
                    <ArrowLeft size={20} />
                    Volver a Reportes
                </Link>
                {children}
            </div>
            <MarketingFooter />
        </div>
    );
}
