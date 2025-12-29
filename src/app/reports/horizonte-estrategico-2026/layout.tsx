import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Horizonte Estratégico 2026: Informe de Mercado LOKL',
    description: 'El año de la sincronización. Tras la estabilización de tasas, el capital global regresa a Colombia. Descubre los activos refugio de la década.',
    alternates: {
        canonical: 'https://lokl.life/reports/horizonte-estrategico-2026',
    },
    openGraph: {
        title: 'Horizonte Estratégico 2026: Informe de Mercado LOKL',
        description: 'El año de la sincronización. Análisis completo del mercado inmobiliario colombiano.',
        url: 'https://lokl.life/reports/horizonte-estrategico-2026',
        siteName: 'LOKL Life',
        images: [
            {
                url: '/images/reports/horizonte-2026-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Horizonte Estratégico 2026',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Horizonte Estratégico 2026: Informe de Mercado LOKL',
        description: 'El año de la sincronización. Análisis del mercado inmobiliario colombiano.',
        images: ['/images/reports/horizonte-2026-og.jpg'],
    },
};

export default function HorizonteEstrategicoLayout({
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

