import { BlogPost } from "./schema";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "guia-completa-inversion-inmobiliaria-2024",
    publishedAt: "2024-06-15T08:00:00Z",
    updatedAt: "2024-06-18T10:30:00Z",
    status: "published",
    featured: true,

    seo: {
      title: "Guía Completa de Inversión Inmobiliaria 2024 | LOKL Academy",
      description: "Aprende las mejores estrategias de inversión inmobiliaria para 2024. Análisis de mercado, financiamiento, propiedades rentables y más.",
      keywords: ["inversión inmobiliaria", "bienes raíces", "propiedades rentables", "financiamiento inmobiliario", "análisis de mercado inmobiliario"],
      canonicalUrl: "https://loklacademy.com/blog/guia-completa-inversion-inmobiliaria-2024",
      ogImage: {
        url: "/images/modern-building.jpg",
        alt: "Guía de Inversión Inmobiliaria 2024",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Guía Completa de Inversión Inmobiliaria 2024",
        "image": "/images/blog/inversion-inmobiliaria-guia-2024.jpg",
        "datePublished": "2024-06-15T08:00:00Z",
        "dateModified": "2024-06-18T10:30:00Z",
        "author": {
          "@type": "Person",
          "name": "Ana Martínez"
        }
      }
    },

    author: {
      id: "author1",
      name: "Ana Martínez",
      role: "Especialista en Inversión Inmobiliaria",
      avatar: "/images/couple-investing.jpg",
      bio: "Ana Martínez cuenta con más de 15 años de experiencia en el sector inmobiliario. Ha asesorado a más de 500 inversionistas y es autora del bestseller 'Invierte en Bienes Raíces como un Profesional'.",
      socialLinks: {
        twitter: "https://twitter.com/anamartinezinmobiliaria",
        linkedin: "https://linkedin.com/in/anamartinezinmobiliaria"
      }
    },

    category: "Mercado",
    categoryFull: {
      id: "cat1",
      name: "Inversión Inmobiliaria",
      slug: "inversion-inmobiliaria"
    },

    tags: [
      {
        id: "tag1",
        name: "Bienes Raíces",
        slug: "bienes-raices"
      },
      {
        id: "tag2",
        name: "Inversión",
        slug: "inversion"
      },
      {
        id: "tag3",
        name: "Finanzas Personales",
        slug: "finanzas-personales"
      }
    ],

    title: "Guía Completa de Inversión Inmobiliaria 2024",
    subtitle: "Todo lo que necesitas saber para invertir con éxito en el mercado actual",
    excerpt: "Descubre las estrategias más efectivas para invertir en bienes raíces en 2024. Desde análisis de mercado hasta financiamiento y gestión de propiedades, esta guía cubre todo lo que necesitas para tomar decisiones informadas.",
    estimatedReadTime: 12,

    coverImage: {
      src: "/images/modern-building.jpg",
      alt: "Edificio moderno con inversores analizando planos",
      caption: "El mercado inmobiliario ofrece oportunidades únicas para inversores en 2024",
      credit: "Foto por LOKL Media"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Guía Completa de Inversión Inmobiliaria 2024",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "El mercado inmobiliario sigue siendo una de las opciones más sólidas para inversores que buscan estabilidad y rendimientos a largo plazo. En esta guía completa, exploraremos las estrategias más efectivas para invertir en bienes raíces en 2024, considerando las tendencias actuales del mercado y las proyecciones económicas.",
        dropCap: true
      },
      {
        id: "toc-heading",
        type: "heading",
        level: 2,
        content: "Contenido de esta guía"
      },
      {
        id: "toc-list",
        type: "list",
        style: "unordered",
        items: [
          { content: "Análisis del mercado inmobiliario actual" },
          { content: "Estrategias de financiamiento" },
          { content: "Tipos de propiedades más rentables" },
          { content: "Gestión de propiedades" },
          { content: "Consideraciones fiscales" },
          { content: "Tecnología y bienes raíces" }
        ]
      },
      {
        id: "market-analysis-heading",
        type: "heading",
        level: 2,
        content: "Análisis del mercado inmobiliario actual",
        anchor: "analisis-mercado"
      },
      {
        id: "market-analysis-paragraph-1",
        type: "paragraph",
        content: "El mercado inmobiliario de 2024 presenta características únicas influenciadas por factores macroeconómicos como las tasas de interés, la inflación y las políticas gubernamentales. Entender estos factores es crucial antes de realizar cualquier inversión."
      },
      {
        id: "market-image",
        type: "image",
        src: "/images/digital-charts.jpg",
        alt: "Gráficos de tendencias del mercado inmobiliario",
        caption: "Tendencias de precios y tasas de interés en el mercado inmobiliario 2024",
        width: 800,
        height: 500
      },
      {
        id: "market-analysis-paragraph-2",
        type: "paragraph",
        content: "Como podemos observar en el gráfico, los precios de la vivienda continúan su tendencia alcista mientras que las tasas de interés hipotecario han comenzado a descender gradualmente, creando una ventana de oportunidad para nuevos inversores."
      },
      {
        id: "financing-heading",
        type: "heading",
        level: 2,
        content: "Estrategias de financiamiento",
        anchor: "financiamiento"
      },
      {
        id: "financing-paragraph",
        type: "paragraph",
        content: "El financiamiento adecuado puede marcar la diferencia entre una inversión exitosa y una problemática. Existen diversas opciones disponibles para los inversores inmobiliarios en 2024."
      },
      {
        id: "financing-columns",
        type: "columns",
        columns: [
          {
            width: "1/2",
            blocks: [
              {
                id: "traditional-financing",
                type: "heading",
                level: 3,
                content: "Financiamiento tradicional"
              },
              {
                id: "traditional-financing-paragraph",
                type: "paragraph",
                content: "Los préstamos hipotecarios convencionales siguen siendo la opción más común. Con tasas que oscilan entre el 5.5% y 6.5% para préstamos a 30 años, es importante comparar ofertas de diferentes entidades financieras."
              }
            ]
          },
          {
            width: "1/2",
            blocks: [
              {
                id: "alternative-financing",
                type: "heading",
                level: 3,
                content: "Financiamiento alternativo"
              },
              {
                id: "alternative-financing-paragraph",
                type: "paragraph",
                content: "El crowdfunding inmobiliario, los préstamos privados y las asociaciones con otros inversores están ganando popularidad como alternativas flexibles a los préstamos bancarios tradicionales."
              }
            ]
          }
        ],
        gap: "4rem",
        stackBelow: "md"
      },
      {
        id: "financing-callout",
        type: "callout",
        content: "Recuerda: Una regla general es no destinar más del 30% de tus ingresos al pago de préstamos inmobiliarios para mantener una situación financiera saludable.",
        variant: "tip",
        icon: "lightbulb"
      },
      {
        id: "properties-heading",
        type: "heading",
        level: 2,
        content: "Tipos de propiedades más rentables",
        anchor: "propiedades-rentables"
      },
      {
        id: "properties-paragraph",
        type: "paragraph",
        content: "No todas las propiedades ofrecen el mismo retorno de inversión. En 2024, ciertos tipos de propiedades destacan por su potencial de rentabilidad."
      },
      {
        id: "properties-gallery",
        type: "gallery",
        images: [
          {
            src: "/images/buildings-bw.jpg",
            alt: "Edificio de apartamentos multifamiliares",
            caption: "Propiedades multifamiliares: ofrecen múltiples fuentes de ingresos"
          },
          {
            src: "/images/skyscraper-bw.jpg",
            alt: "Local comercial en zona céntrica",
            caption: "Propiedades comerciales: contratos a largo plazo con empresas estables"
          },
          {
            src: "/images/house-model.jpg",
            alt: "Casa de alquiler vacacional",
            caption: "Alquileres vacacionales: alta rentabilidad en ubicaciones turísticas"
          }
        ],
        layout: "grid",
        columns: 3
      },
      {
        id: "properties-table",
        type: "table",
        headers: ["Tipo de propiedad", "ROI promedio", "Nivel de riesgo", "Mantenimiento"],
        rows: [
          ["Multifamiliar", "8-12%", "Medio", "Moderado"],
          ["Comercial", "6-10%", "Medio-Alto", "Bajo"],
          ["Residencial", "5-8%", "Bajo", "Moderado"],
          ["Vacacional", "10-15%", "Alto", "Alto"]
        ],
        caption: "Comparativa de tipos de propiedades inmobiliarias",
        responsive: true
      },
      {
        id: "management-heading",
        type: "heading",
        level: 2,
        content: "Gestión de propiedades",
        anchor: "gestion"
      },
      {
        id: "management-paragraph",
        type: "paragraph",
        content: "La gestión eficiente de tus propiedades es fundamental para maximizar la rentabilidad y minimizar los dolores de cabeza."
      },
      {
        id: "management-quote",
        type: "quote",
        content: "La diferencia entre una inversión inmobiliaria exitosa y una problemática a menudo radica en la calidad de la gestión de la propiedad.",
        author: "Carlos Vega",
        citation: "Fundador de LOKL Property Management",
        style: "large"
      },
      {
        id: "management-list",
        type: "list",
        style: "checked",
        items: [
          {
            content: "Contratar un administrador profesional de propiedades",
            checked: true
          },
          {
            content: "Implementar software de gestión inmobiliaria",
            checked: true
          },
          {
            content: "Establecer procesos claros para el mantenimiento",
            checked: true
          },
          {
            content: "Realizar inspecciones periódicas",
            checked: false,
            subItems: [
              { content: "Inspección trimestral del exterior", checked: true },
              { content: "Inspección semestral del interior", checked: false }
            ]
          }
        ]
      },
      {
        id: "tax-heading",
        type: "heading",
        level: 2,
        content: "Consideraciones fiscales",
        anchor: "impuestos"
      },
      {
        id: "tax-paragraph",
        type: "paragraph",
        content: "Los aspectos fiscales pueden tener un impacto significativo en la rentabilidad de tus inversiones inmobiliarias. Es importante conocer las deducciones y estrategias disponibles."
      },
      {
        id: "tax-video",
        type: "video",
        src: "https://www.youtube.com/embed/tax-real-estate-2024",
        poster: "/images/blog/tax-strategies-poster.jpg",
        caption: "Estrategias fiscales para inversores inmobiliarios en 2024",
        provider: "youtube",
        width: 800,
        height: 450,
        transcript: "En este video, nuestra experta fiscal María Gómez explica las principales deducciones disponibles para inversores inmobiliarios en 2024, incluyendo depreciación, gastos operativos, intereses hipotecarios y estrategias de intercambio 1031."
      },
      {
        id: "tech-heading",
        type: "heading",
        level: 2,
        content: "Tecnología y bienes raíces",
        anchor: "tecnologia"
      },
      {
        id: "tech-paragraph",
        type: "paragraph",
        content: "La tecnología está transformando el sector inmobiliario, ofreciendo nuevas herramientas y oportunidades para los inversores."
      },
      {
        id: "tech-image",
        type: "image",
        src: "/images/digital-charts.jpg",
        alt: "Innovaciones tecnológicas en el sector inmobiliario",
        caption: "Las PropTech están revolucionando la forma de invertir y gestionar propiedades",
        width: 800,
        height: 500,
        loading: "lazy"
      },
      {
        id: "tech-paragraph-2",
        type: "paragraph",
        content: "Desde plataformas de análisis de datos hasta aplicaciones de gestión de propiedades y soluciones de smart home, la tecnología ofrece ventajas competitivas a los inversores que saben aprovecharla."
      },
      {
        id: "conclusion-heading",
        type: "heading",
        level: 2,
        content: "Conclusión",
        anchor: "conclusion"
      },
      {
        id: "conclusion-paragraph",
        type: "paragraph",
        content: "La inversión inmobiliaria sigue siendo una estrategia sólida para construir patrimonio a largo plazo. Con el conocimiento adecuado del mercado, estrategias de financiamiento inteligentes, selección cuidadosa de propiedades y una gestión eficiente, puedes maximizar tus posibilidades de éxito en el panorama inmobiliario de 2024."
      },
      {
        id: "faq-section",
        type: "faq",
        items: [
          {
            question: "¿Es buen momento para invertir en bienes raíces en 2024?",
            answer: "Sí, especialmente considerando la estabilización de las tasas de interés y las proyecciones de crecimiento en ciertas áreas metropolitanas. Sin embargo, es importante realizar un análisis detallado del mercado local específico donde planeas invertir."
          },
          {
            question: "¿Cuánto capital inicial necesito para invertir en bienes raíces?",
            answer: "Depende del tipo de inversión. Para propiedades residenciales tradicionales, generalmente necesitarás entre un 20-25% del valor de la propiedad como pago inicial. Sin embargo, existen estrategias como el house hacking o las inversiones en REITs que requieren menos capital inicial."
          },
          {
            question: "¿Debo gestionar mis propiedades personalmente o contratar un administrador?",
            answer: "Depende de tu disponibilidad de tiempo, conocimientos y la ubicación de las propiedades. Si tienes múltiples propiedades o están lejos de tu residencia, un administrador profesional puede ser una inversión que vale la pena, típicamente cobrando entre 8-12% de los ingresos por alquiler."
          }
        ],
        schema: true
      },
      {
        id: "cta-block",
        type: "cta",
        heading: "¿Listo para comenzar tu viaje de inversión inmobiliaria?",
        content: "Comienza a invertir en bienes raíces con LOKL, revisa nuestros cursos y proyectos",
        buttonText: "Ver nuestros proyectos",
        buttonUrl: "https://lokl.life/#newprojects",
        buttonVariant: "primary",
        background: "#F7F7FB"
      }
    ],

    relatedPosts: [
      {
        id: "2",
        title: "5 Estrategias de Financiamiento para Inversores Inmobiliarios",
        slug: "estrategias-financiamiento-inversores-inmobiliarios",
        coverImage: {
          src: "/images/house-model.jpg",
          alt: "Persona analizando opciones de financiamiento"
        }
      },
      {
        id: "3",
        title: "Cómo Analizar el Potencial de Rentabilidad de una Propiedad",
        slug: "analizar-potencial-rentabilidad-propiedad",
        coverImage: {
          src: "/images/skyscraper-bw.jpg",
          alt: "Calculadora y documentos de análisis inmobiliario"
        }
      },
      {
        id: "4",
        title: "Tendencias del Mercado Inmobiliario para los Próximos 5 Años",
        slug: "tendencias-mercado-inmobiliario-proximos-5-anos",
        coverImage: {
          src: "/images/digital-charts.jpg",
          alt: "Gráfico de tendencias inmobiliarias"
        }
      }
    ],

    views: 3450,
    likes: 187,
    shares: 92,
    commentsEnabled: true
  },

  // Segundo blog post
  {
    id: "2",
    slug: "5-estrategias-financiamiento-inversores-inmobiliarios",
    publishedAt: "2024-06-10T09:30:00Z",
    status: "published",

    seo: {
      title: "5 Estrategias de Financiamiento para Inversores Inmobiliarios | LOKL Academy",
      description: "Descubre las 5 mejores estrategias de financiamiento para inversores inmobiliarios en 2024. Opciones tradicionales y alternativas explicadas paso a paso.",
      keywords: ["financiamiento inmobiliario", "préstamos hipotecarios", "crowdfunding inmobiliario", "estrategias financiamiento", "inversión inmobiliaria"],
      ogImage: {
        url: "/images/house-model.jpg",
        alt: "Estrategias de Financiamiento Inmobiliario",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author2",
      name: "Roberto Sánchez",
      role: "Asesor Financiero Inmobiliario",
      avatar: "/images/buildings-bw.jpg",
      bio: "Roberto Sánchez es asesor financiero especializado en el sector inmobiliario con más de 10 años de experiencia ayudando a inversores a optimizar sus estrategias de financiamiento."
    },

    category: "Finanzas",
    categoryFull: {
      id: "cat1",
      name: "Inversión Inmobiliaria",
      slug: "inversion-inmobiliaria"
    },

    tags: [
      {
        id: "tag2",
        name: "Inversión",
        slug: "inversion"
      },
      {
        id: "tag4",
        name: "Financiamiento",
        slug: "financiamiento"
      }
    ],

    title: "5 Estrategias de Financiamiento para Inversores Inmobiliarios",
    subtitle: "Opciones tradicionales y alternativas para financiar tus inversiones",
    excerpt: "Explora las cinco estrategias de financiamiento más efectivas para inversores inmobiliarios en 2024. Desde préstamos convencionales hasta opciones creativas como el crowdfunding y el seller financing.",
    estimatedReadTime: 8,

    coverImage: {
      src: "/images/house-model.jpg",
      alt: "Persona analizando opciones de financiamiento inmobiliario",
      caption: "El financiamiento adecuado es clave para el éxito en inversiones inmobiliarias"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "5 Estrategias de Financiamiento para Inversores Inmobiliarios",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "El financiamiento es uno de los aspectos más críticos de la inversión inmobiliaria. La estrategia que elijas puede determinar tu flujo de caja, tu capacidad para escalar y, en última instancia, tu éxito como inversor. En este artículo, exploraremos cinco estrategias de financiamiento que todo inversor inmobiliario debería considerar en 2024."
      },
      {
        id: "strategy1-heading",
        type: "heading",
        level: 2,
        content: "1. Préstamos Hipotecarios Convencionales",
        anchor: "prestamos-convencionales"
      },
      {
        id: "strategy1-paragraph",
        type: "paragraph",
        content: "Los préstamos hipotecarios convencionales siguen siendo la opción más común para los inversores inmobiliarios, especialmente para aquellos que están comenzando."
      },
      {
        id: "strategy1-callout",
        type: "callout",
        content: "Ventaja clave: Las tasas de interés para préstamos convencionales suelen ser más bajas que las de otras opciones de financiamiento, especialmente si tienes un buen historial crediticio.",
        variant: "info"
      },
      {
        id: "strategy2-heading",
        type: "heading",
        level: 2,
        content: "2. Financiamiento del Vendedor (Seller Financing)",
        anchor: "seller-financing"
      },
      // Contenido truncado para brevedad
    ],

    views: 2180,
    likes: 134,
    commentsEnabled: true
  },

  // Tercer blog post
  {
    id: "3",
    slug: "analizar-potencial-rentabilidad-propiedad",
    publishedAt: "2024-06-05T14:15:00Z",
    status: "published",

    seo: {
      title: "Cómo Analizar el Potencial de Rentabilidad de una Propiedad | LOKL Academy",
      description: "Aprende a evaluar correctamente el potencial de rentabilidad de una propiedad inmobiliaria. Métodos de cálculo, indicadores clave y herramientas para inversores.",
      keywords: ["rentabilidad inmobiliaria", "ROI inmobiliario", "análisis de propiedades", "cash flow inmobiliario", "cap rate"],
      ogImage: {
        url: "/images/skyscraper-bw.jpg",
        alt: "Análisis de Rentabilidad Inmobiliaria",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author3",
      name: "Elena Torres",
      role: "Analista de Inversiones Inmobiliarias",
      avatar: "/images/digital-charts.jpg",
      bio: "Elena Torres es analista de inversiones inmobiliarias con experiencia en evaluación de propiedades para fondos de inversión y particulares. Certificada en análisis financiero inmobiliario."
    },

    category: "Análisis",
    categoryFull: {
      id: "cat1",
      name: "Inversión Inmobiliaria",
      slug: "inversion-inmobiliaria"
    },

    tags: [
      {
        id: "tag2",
        name: "Inversión",
        slug: "inversion"
      },
      {
        id: "tag5",
        name: "Análisis",
        slug: "analisis"
      },
      {
        id: "tag6",
        name: "Rentabilidad",
        slug: "rentabilidad"
      }
    ],

    title: "Cómo Analizar el Potencial de Rentabilidad de una Propiedad",
    excerpt: "Aprende a evaluar correctamente el potencial de rentabilidad de una propiedad inmobiliaria utilizando métricas clave como el ROI, Cash-on-Cash Return, Cap Rate y más.",
    estimatedReadTime: 10,

    coverImage: {
      src: "/images/skyscraper-bw.jpg",
      alt: "Calculadora y documentos de análisis inmobiliario",
      caption: "El análisis detallado es fundamental antes de invertir en una propiedad"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Cómo Analizar el Potencial de Rentabilidad de una Propiedad",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "Invertir en bienes raíces puede ser altamente rentable, pero solo si sabes cómo identificar las propiedades con mayor potencial. El análisis de rentabilidad es una habilidad fundamental que todo inversor inmobiliario debe dominar."
      },
      // Contenido truncado para brevedad
    ],

    views: 1890,
    likes: 112,
    commentsEnabled: true
  }
];

export default mockBlogPosts;
