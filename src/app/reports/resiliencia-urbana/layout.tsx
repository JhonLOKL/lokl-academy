import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MarketingFooter } from '@/components/footer/marketing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'El Futuro es una Ciudad Esponja - Resiliencia Urbana | LOKL',
    description: 'Investigación técnica sobre la gestión de inundaciones en valles profundos. Una propuesta para transformar a Medellín en un ecosistema que respira y absorbe.',
    alternates: {
        canonical: 'https://lokl.life/reports/resiliencia-urbana',
    },
    openGraph: {
        title: 'El Futuro es una Ciudad Esponja - Resiliencia Urbana',
        description: 'Investigación técnica sobre infraestructura verde vs gris en Medellín. Estrategia 2024-2034 para gestión hídrica urbana.',
        url: 'https://lokl.life/reports/resiliencia-urbana',
        siteName: 'LOKL Life',
        images: [
            {
                url: '/images/reports/resiliencia-urbana-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Ciudad Esponja - Resiliencia Urbana Medellín',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'El Futuro es una Ciudad Esponja - Resiliencia Urbana',
        description: 'Investigación sobre gestión de inundaciones y infraestructura verde en Medellín.',
        images: ['/images/reports/resiliencia-urbana-og.jpg'],
    },
};

export default function ResilienciaUrbanaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white text-[#444444] font-sans selection:bg-[#A1A0FB]">
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
