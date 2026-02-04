import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Embajadores LOKL - Guía Visual',
    description: 'Descubre cómo convertirte en un Community Builder del ecosistema LOKL. Conoce los niveles, comisiones y beneficios del programa de embajadores.',
    alternates: {
        canonical: 'https://lokl.life/reports/embajadores-lokl',
    },
};

export default function EmbajadoresLoklLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#444444] font-sans selection:bg-[#5352F6] selection:text-white">
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
                {/* Back Navigation */}
                <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 text-[#5352F6] hover:text-[#4241C5] transition-colors mb-8 font-medium no-print"
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
