import React from 'react';

interface ReportJsonLdProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    authorName?: string;
    image?: string;
}

export const ReportJsonLd = ({
    title,
    description,
    url,
    datePublished,
    authorName = "LOKL Research Institute",
    image = "https://academy.lokl.life/images/lokl-academy-og.jpg"
}: ReportJsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Report",
        "headline": title,
        "description": description,
        "image": image,
        "datePublished": datePublished,
        "url": url,
        "author": {
            "@type": "Organization",
            "name": authorName,
            "url": "https://academy.lokl.life"
        },
        "publisher": {
            "@type": "Organization",
            "name": "LOKL",
            "logo": {
                "@type": "ImageObject",
                "url": "https://academy.lokl.life/logo.png"
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
