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
  },

  // Cuarto blog post
  {
    id: "4",
    slug: "tendencias-mercado-inmobiliario-proximos-5-anos",
    publishedAt: "2024-06-01T11:00:00Z",
    updatedAt: "2024-06-20T15:45:00Z",
    status: "published",
    featured: true,

    seo: {
      title: "Tendencias del Mercado Inmobiliario para los Próximos 5 Años | LOKL Academy",
      description: "Descubre las tendencias que moldearán el mercado inmobiliario en los próximos 5 años. Análisis de expertos sobre tecnología, sostenibilidad y cambios demográficos.",
      keywords: ["tendencias inmobiliarias", "mercado inmobiliario futuro", "propiedades sostenibles", "tecnología inmobiliaria", "demografía inmobiliaria"],
      canonicalUrl: "https://loklacademy.com/blog/tendencias-mercado-inmobiliario-proximos-5-anos",
      ogImage: {
        url: "/images/digital-charts.jpg",
        alt: "Tendencias del Mercado Inmobiliario 2024-2029",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Tendencias del Mercado Inmobiliario para los Próximos 5 Años",
        "image": "/images/blog/tendencias-mercado-2024-2029.jpg",
        "datePublished": "2024-06-01T11:00:00Z",
        "dateModified": "2024-06-20T15:45:00Z",
        "author": {
          "@type": "Person",
          "name": "Dr. Carlos Mendoza"
        }
      }
    },

    author: {
      id: "author4",
      name: "Dr. Carlos Mendoza",
      role: "Director de Investigación Inmobiliaria",
      avatar: "/images/modern-building.jpg",
      bio: "Dr. Carlos Mendoza es director de investigación inmobiliaria con más de 20 años de experiencia analizando tendencias del mercado. Ha publicado más de 50 estudios sobre el sector inmobiliario y es consultor de grandes fondos de inversión.",
      socialLinks: {
        twitter: "https://twitter.com/carlosmendozainmobiliaria",
        linkedin: "https://linkedin.com/in/carlosmendozainmobiliaria"
      }
    },

    category: "Tendencias",
    categoryFull: {
      id: "cat2",
      name: "Análisis de Mercado",
      slug: "analisis-mercado"
    },

    tags: [
      {
        id: "tag7",
        name: "Tendencias",
        slug: "tendencias"
      },
      {
        id: "tag8",
        name: "Futuro",
        slug: "futuro"
      },
      {
        id: "tag9",
        name: "Sostenibilidad",
        slug: "sostenibilidad"
      }
    ],

    title: "Tendencias del Mercado Inmobiliario para los Próximos 5 Años",
    subtitle: "Cómo la tecnología, la sostenibilidad y los cambios demográficos transformarán el sector",
    excerpt: "El mercado inmobiliario está en constante evolución. Analizamos las tendencias más importantes que definirán el sector en los próximos 5 años, desde la adopción de tecnología hasta la creciente demanda de propiedades sostenibles.",
    estimatedReadTime: 15,

    coverImage: {
      src: "/images/digital-charts.jpg",
      alt: "Gráficos de tendencias inmobiliarias futuras",
      caption: "Las tendencias tecnológicas y sostenibles dominarán el mercado inmobiliario",
      credit: "Análisis por LOKL Research"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Tendencias del Mercado Inmobiliario para los Próximos 5 Años",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "El sector inmobiliario se encuentra en un punto de inflexión. Los próximos cinco años traerán cambios transformadores impulsados por la tecnología, la sostenibilidad y los cambios demográficos. Como inversores, entender estas tendencias es crucial para tomar decisiones informadas y posicionarse estratégicamente en el mercado.",
        dropCap: true
      },
      {
        id: "tech-trends-heading",
        type: "heading",
        level: 2,
        content: "1. Revolución Tecnológica en Propiedades",
        anchor: "tecnologia"
      },
      {
        id: "tech-trends-paragraph",
        type: "paragraph",
        content: "La tecnología está redefiniendo cómo vivimos y trabajamos, y las propiedades no son la excepción. Las smart homes, la automatización y la conectividad IoT se convertirán en estándares del mercado."
      },
      {
        id: "tech-stats",
        type: "statistic",
        value: "85%",
        label: "de las nuevas propiedades incluirán tecnología smart home para 2029",
        trend: "up",
        trendValue: "+40% desde 2024"
      },
      {
        id: "sustainability-heading",
        type: "heading",
        level: 2,
        content: "2. Sostenibilidad como Prioridad",
        anchor: "sostenibilidad"
      },
      {
        id: "sustainability-paragraph",
        type: "paragraph",
        content: "La conciencia ambiental y las regulaciones gubernamentales están impulsando una demanda sin precedentes por propiedades sostenibles y energéticamente eficientes."
      },
      {
        id: "sustainability-quote",
        type: "quote",
        content: "Las propiedades sostenibles no solo son buenas para el planeta, sino que también ofrecen mejores retornos de inversión a largo plazo.",
        author: "María González",
        citation: "Directora de Sostenibilidad, Green Real Estate Fund",
        style: "large"
      },
      {
        id: "demographics-heading",
        type: "heading",
        level: 2,
        content: "3. Cambios Demográficos y Nuevas Demandas",
        anchor: "demografia"
      },
      {
        id: "demographics-paragraph",
        type: "paragraph",
        content: "Los millennials y la Generación Z están cambiando las preferencias de vivienda, priorizando la flexibilidad, la experiencia y la conectividad sobre la propiedad tradicional."
      },
      {
        id: "demographics-table",
        type: "table",
        headers: ["Generación", "Preferencia Principal", "Impacto en Mercado"],
        rows: [
          ["Millennials", "Flexibilidad y experiencia", "Aumento en co-living y espacios flexibles"],
          ["Gen Z", "Tecnología integrada", "Demanda de smart homes"],
          ["Baby Boomers", "Accesibilidad y servicios", "Crecimiento en senior living"]
        ],
        caption: "Preferencias por generación en el mercado inmobiliario",
        responsive: true
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
        content: "Los próximos cinco años traerán oportunidades sin precedentes para inversores que se adapten a estas tendencias. La clave del éxito será mantenerse informado y ser flexible ante los cambios del mercado."
      }
    ],

    relatedPosts: [
      {
        id: "1",
        title: "Guía Completa de Inversión Inmobiliaria 2024",
        slug: "guia-completa-inversion-inmobiliaria-2024",
        coverImage: {
          src: "/images/modern-building.jpg",
          alt: "Guía de inversión inmobiliaria"
        }
      },
      {
        id: "5",
        title: "Propiedades Sostenibles: El Futuro de la Inversión",
        slug: "propiedades-sostenibles-futuro-inversion",
        coverImage: {
          src: "/images/buildings-bw.jpg",
          alt: "Propiedades sostenibles"
        }
      }
    ],

    views: 4120,
    likes: 245,
    shares: 156,
    commentsEnabled: true
  },

  // Quinto blog post
  {
    id: "5",
    slug: "propiedades-sostenibles-futuro-inversion",
    publishedAt: "2024-05-28T10:30:00Z",
    status: "published",

    seo: {
      title: "Propiedades Sostenibles: El Futuro de la Inversión Inmobiliaria | LOKL Academy",
      description: "Descubre por qué las propiedades sostenibles son la mejor opción de inversión para el futuro. Beneficios financieros, certificaciones y casos de éxito.",
      keywords: ["propiedades sostenibles", "inversión verde", "certificaciones LEED", "energía renovable", "inversión responsable"],
      ogImage: {
        url: "/images/buildings-bw.jpg",
        alt: "Propiedades Sostenibles - Futuro de la Inversión",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author5",
      name: "Laura Fernández",
      role: "Especialista en Propiedades Sostenibles",
      avatar: "/images/couple-investing.jpg",
      bio: "Laura Fernández es especialista en propiedades sostenibles con más de 12 años de experiencia en el sector. Ha asesorado en el desarrollo de más de 50 proyectos inmobiliarios con certificaciones LEED y BREEAM."
    },

    category: "Sostenibilidad",
    categoryFull: {
      id: "cat3",
      name: "Propiedades Sostenibles",
      slug: "propiedades-sostenibles"
    },

    tags: [
      {
        id: "tag9",
        name: "Sostenibilidad",
        slug: "sostenibilidad"
      },
      {
        id: "tag10",
        name: "Energía Renovable",
        slug: "energia-renovable"
      },
      {
        id: "tag11",
        name: "Certificaciones",
        slug: "certificaciones"
      }
    ],

    title: "Propiedades Sostenibles: El Futuro de la Inversión Inmobiliaria",
    subtitle: "Por qué invertir en verde es la decisión más inteligente",
    excerpt: "Las propiedades sostenibles no solo benefician al medio ambiente, sino que también ofrecen mejores retornos financieros. Descubre cómo la inversión verde está transformando el mercado inmobiliario.",
    estimatedReadTime: 12,

    coverImage: {
      src: "/images/buildings-bw.jpg",
      alt: "Edificio sostenible con paneles solares",
      caption: "Las propiedades sostenibles ofrecen mejores retornos y menor impacto ambiental"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Propiedades Sostenibles: El Futuro de la Inversión Inmobiliaria",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "La sostenibilidad ya no es una tendencia, es el futuro del mercado inmobiliario. Los inversores que reconozcan esta realidad y se posicionen tempranamente en propiedades sostenibles obtendrán ventajas significativas en los próximos años.",
        dropCap: true
      },
      {
        id: "benefits-heading",
        type: "heading",
        level: 2,
        content: "Beneficios Financieros de las Propiedades Sostenibles",
        anchor: "beneficios"
      },
      {
        id: "benefits-paragraph",
        type: "paragraph",
        content: "Contrario a la creencia popular, las propiedades sostenibles no solo son buenas para el planeta, sino que también ofrecen ventajas financieras significativas."
      },
      {
        id: "benefits-callout",
        type: "callout",
        content: "Las propiedades con certificaciones LEED pueden obtener hasta un 20% más de valor de alquiler y un 10% más de valor de venta comparado con propiedades convencionales.",
        variant: "success",
        icon: "trending-up"
      },
      {
        id: "certifications-heading",
        type: "heading",
        level: 2,
        content: "Certificaciones Importantes",
        anchor: "certificaciones"
      },
      {
        id: "certifications-paragraph",
        type: "paragraph",
        content: "Conocer las certificaciones de sostenibilidad es fundamental para evaluar el verdadero valor de una propiedad verde."
      },
      {
        id: "certifications-list",
        type: "list",
        style: "checked",
        items: [
          {
            content: "LEED (Leadership in Energy and Environmental Design)",
            checked: true
          },
          {
            content: "BREEAM (Building Research Establishment Environmental Assessment Method)",
            checked: true
          },
          {
            content: "WELL Building Standard",
            checked: true
          },
          {
            content: "ENERGY STAR",
            checked: true
          }
        ]
      }
    ],

    views: 2980,
    likes: 178,
    commentsEnabled: true
  },

  // Sexto blog post
  {
    id: "6",
    slug: "house-hacking-estrategia-inversion-sin-dinero",
    publishedAt: "2024-05-20T09:15:00Z",
    updatedAt: "2024-06-10T16:20:00Z",
    status: "published",

    seo: {
      title: "House Hacking: La Estrategia de Inversión Sin Dinero Inicial | LOKL Academy",
      description: "Aprende cómo comenzar a invertir en bienes raíces sin dinero inicial usando la estrategia del house hacking. Guía paso a paso con casos reales.",
      keywords: ["house hacking", "inversión sin dinero", "estrategias inmobiliarias", "alquiler por habitaciones", "inversión principiantes"],
      ogImage: {
        url: "/images/house-model.jpg",
        alt: "House Hacking - Inversión Sin Dinero Inicial",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author6",
      name: "Diego Ramírez",
      role: "Experto en Estrategias de Inversión",
      avatar: "/images/skyscraper-bw.jpg",
      bio: "Diego Ramírez es experto en estrategias creativas de inversión inmobiliaria. Ha ayudado a más de 200 personas a comenzar su portafolio inmobiliario sin capital inicial."
    },

    category: "Estrategias",
    categoryFull: {
      id: "cat4",
      name: "Estrategias de Inversión",
      slug: "estrategias-inversion"
    },

    tags: [
      {
        id: "tag12",
        name: "House Hacking",
        slug: "house-hacking"
      },
      {
        id: "tag13",
        name: "Principiantes",
        slug: "principiantes"
      },
      {
        id: "tag14",
        name: "Sin Capital",
        slug: "sin-capital"
      }
    ],

    title: "House Hacking: La Estrategia de Inversión Sin Dinero Inicial",
    subtitle: "Cómo comenzar tu portafolio inmobiliario sin capital",
    excerpt: "El house hacking es una de las estrategias más efectivas para comenzar a invertir en bienes raíces sin dinero inicial. Descubre cómo puedes vivir gratis mientras construyes tu patrimonio inmobiliario.",
    estimatedReadTime: 14,

    coverImage: {
      src: "/images/house-model.jpg",
      alt: "Casa con múltiples unidades de alquiler",
      caption: "El house hacking te permite vivir gratis mientras construyes patrimonio"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "House Hacking: La Estrategia de Inversión Sin Dinero Inicial",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "¿Te imaginas vivir gratis mientras construyes tu patrimonio inmobiliario? El house hacking hace esto posible. Esta estrategia revolucionaria ha permitido a miles de personas comenzar su viaje de inversión inmobiliaria sin capital inicial.",
        dropCap: true
      },
      {
        id: "what-is-heading",
        type: "heading",
        level: 2,
        content: "¿Qué es el House Hacking?",
        anchor: "que-es"
      },
      {
        id: "what-is-paragraph",
        type: "paragraph",
        content: "El house hacking consiste en comprar una propiedad, vivir en una parte de ella y alquilar las demás unidades o habitaciones para cubrir todos o la mayoría de los gastos de la propiedad."
      },
      {
        id: "benefits-heading",
        type: "heading",
        level: 2,
        content: "Beneficios del House Hacking",
        anchor: "beneficios"
      },
      {
        id: "benefits-list",
        type: "list",
        style: "checked",
        items: [
          {
            content: "Vivir con gastos mínimos o gratis",
            checked: true
          },
          {
            content: "Construir patrimonio sin capital adicional",
            checked: true
          },
          {
            content: "Aprender gestión de propiedades",
            checked: true
          },
          {
            content: "Calificar para mejores financiamientos",
            checked: true
          }
        ]
      },
      {
        id: "strategies-heading",
        type: "heading",
        level: 2,
        content: "Estrategias de House Hacking",
        anchor: "estrategias"
      },
      {
        id: "strategies-columns",
        type: "columns",
        columns: [
          {
            width: "1/2",
            blocks: [
              {
                id: "multi-family",
                type: "heading",
                level: 3,
                content: "Propiedades Multifamiliares"
              },
              {
                id: "multi-family-paragraph",
                type: "paragraph",
                content: "Comprar un edificio de 2-4 unidades, vivir en una y alquilar las demás. Esta es la estrategia más popular y efectiva."
              }
            ]
          },
          {
            width: "1/2",
            blocks: [
              {
                id: "single-family",
                type: "heading",
                level: 3,
                content: "Alquiler por Habitaciones"
              },
              {
                id: "single-family-paragraph",
                type: "paragraph",
                content: "Comprar una casa grande y alquilar habitaciones individuales a estudiantes o profesionales."
              }
            ]
          }
        ],
        gap: "3rem",
        stackBelow: "md"
      },
      {
        id: "case-study-heading",
        type: "heading",
        level: 2,
        content: "Caso de Estudio: María y su Primer House Hack",
        anchor: "caso-estudio"
      },
      {
        id: "case-study-paragraph",
        type: "paragraph",
        content: "María, una ingeniera de 28 años, compró un duplex por $350,000 con solo 3.5% de pago inicial usando un préstamo FHA. Vive en una unidad y alquila la otra por $2,200 mensuales."
      },
      {
        id: "case-study-stats",
        type: "statistic",
        value: "$1,200",
        label: "de ahorro mensual para María",
        trend: "up",
        trendValue: "después de cubrir todos los gastos"
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
        content: "El house hacking es una estrategia probada que puede acelerar significativamente tu camino hacia la libertad financiera. Con la planificación adecuada y la mentalidad correcta, puedes comenzar tu portafolio inmobiliario sin capital inicial."
      }
    ],

    views: 3560,
    likes: 223,
    shares: 89,
    commentsEnabled: true
  },

  // Séptimo blog post
  {
    id: "7",
    slug: "reits-vs-inversion-directa-comparacion-completa",
    publishedAt: "2024-05-15T14:30:00Z",
    status: "published",

    seo: {
      title: "REITs vs Inversión Directa: Comparación Completa para Inversores | LOKL Academy",
      description: "Compara REITs vs inversión directa en bienes raíces. Ventajas, desventajas, rentabilidad y cuál elegir según tu perfil de inversor.",
      keywords: ["REITs", "inversión directa", "comparación inmobiliaria", "fondos inmobiliarios", "rentabilidad inmobiliaria"],
      ogImage: {
        url: "/images/digital-charts.jpg",
        alt: "REITs vs Inversión Directa - Comparación",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author7",
      name: "Patricia López",
      role: "Analista de Fondos Inmobiliarios",
      avatar: "/images/modern-building.jpg",
      bio: "Patricia López es analista senior de fondos inmobiliarios con más de 15 años de experiencia en el sector. Ha asesorado a inversores institucionales y particulares en estrategias de inversión inmobiliaria."
    },

    category: "Inversión",
    categoryFull: {
      id: "cat5",
      name: "Fondos Inmobiliarios",
      slug: "fondos-inmobiliarios"
    },

    tags: [
      {
        id: "tag15",
        name: "REITs",
        slug: "reits"
      },
      {
        id: "tag16",
        name: "Fondos",
        slug: "fondos"
      },
      {
        id: "tag17",
        name: "Comparación",
        slug: "comparacion"
      }
    ],

    title: "REITs vs Inversión Directa: Comparación Completa para Inversores",
    subtitle: "¿Cuál es la mejor opción para tu portafolio?",
    excerpt: "Los REITs y la inversión directa en bienes raíces ofrecen diferentes ventajas y desventajas. Esta comparación completa te ayudará a decidir cuál es la mejor opción para tu perfil de inversor.",
    estimatedReadTime: 11,

    coverImage: {
      src: "/images/digital-charts.jpg",
      alt: "Gráficos comparativos de REITs vs inversión directa",
      caption: "Cada estrategia tiene sus ventajas según tu perfil de inversor"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "REITs vs Inversión Directa: Comparación Completa para Inversores",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "Una de las decisiones más importantes que debe tomar un inversor inmobiliario es si invertir directamente en propiedades o a través de REITs (Real Estate Investment Trusts). Ambas opciones tienen sus ventajas y desventajas.",
        dropCap: true
      },
      {
        id: "reits-heading",
        type: "heading",
        level: 2,
        content: "Ventajas de los REITs",
        anchor: "reits"
      },
      {
        id: "reits-paragraph",
        type: "paragraph",
        content: "Los REITs ofrecen una forma accesible y diversificada de invertir en bienes raíces sin la necesidad de gestionar propiedades directamente."
      },
      {
        id: "reits-list",
        type: "list",
        style: "checked",
        items: [
          {
            content: "Liquidez alta - puedes vender en cualquier momento",
            checked: true
          },
          {
            content: "Diversificación automática",
            checked: true
          },
          {
            content: "Gestión profesional",
            checked: true
          },
          {
            content: "Capital inicial bajo",
            checked: true
          }
        ]
      },
      {
        id: "direct-heading",
        type: "heading",
        level: 2,
        content: "Ventajas de la Inversión Directa",
        anchor: "directa"
      },
      {
        id: "direct-paragraph",
        type: "paragraph",
        content: "La inversión directa te da control total sobre tus propiedades y puede ofrecer mayores retornos a largo plazo."
      },
      {
        id: "direct-list",
        type: "list",
        style: "checked",
        items: [
          {
            content: "Control total sobre las decisiones",
            checked: true
          },
          {
            content: "Mayor potencial de apreciación",
            checked: true
          },
          {
            content: "Beneficios fiscales directos",
            checked: true
          },
          {
            content: "Apalancamiento con deuda",
            checked: true
          }
        ]
      },
      {
        id: "comparison-table",
        type: "table",
        headers: ["Aspecto", "REITs", "Inversión Directa"],
        rows: [
          ["Capital inicial", "$100 - $10,000", "$50,000 - $500,000+"],
          ["Liquidez", "Alta", "Baja"],
          ["Control", "Ninguno", "Total"],
          ["Gestión", "Profesional", "Personal"],
          ["Diversificación", "Automática", "Manual"],
          ["Retorno potencial", "6-10% anual", "8-15% anual"]
        ],
        caption: "Comparación detallada entre REITs e inversión directa",
        responsive: true
      },
      {
        id: "recommendation-heading",
        type: "heading",
        level: 2,
        content: "¿Cuál Elegir?",
        anchor: "recomendacion"
      },
      {
        id: "recommendation-paragraph",
        type: "paragraph",
        content: "La elección entre REITs e inversión directa depende de tu perfil de inversor, capital disponible, tiempo disponible y objetivos financieros."
      },
      {
        id: "recommendation-callout",
        type: "callout",
        content: "Recomendación: Combina ambas estrategias. Usa REITs para diversificación y liquidez, e inversión directa para mayor control y potencial de retorno.",
        variant: "tip",
        icon: "lightbulb"
      }
    ],

    views: 2870,
    likes: 156,
    commentsEnabled: true
  },

  // Octavo blog post
  {
    id: "8",
    slug: "gestion-propiedades-rentables-guia-completa",
    publishedAt: "2024-05-10T12:00:00Z",
    status: "published",

    seo: {
      title: "Gestión de Propiedades Rentables: Guía Completa para Inversores | LOKL Academy",
      description: "Aprende a gestionar propiedades de manera rentable. Estrategias de marketing, selección de inquilinos, mantenimiento y maximización de ingresos.",
      keywords: ["gestión de propiedades", "propiedades rentables", "selección de inquilinos", "mantenimiento inmobiliario", "marketing inmobiliario"],
      ogImage: {
        url: "/images/buildings-bw.jpg",
        alt: "Gestión de Propiedades Rentables",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author8",
      name: "Ricardo Vega",
      role: "Gestor de Propiedades Profesional",
      avatar: "/images/skyscraper-bw.jpg",
      bio: "Ricardo Vega gestiona un portafolio de más de 200 propiedades residenciales y comerciales. Es experto en optimización de rentabilidad y gestión eficiente de propiedades."
    },

    category: "Gestión",
    categoryFull: {
      id: "cat6",
      name: "Gestión de Propiedades",
      slug: "gestion-propiedades"
    },

    tags: [
      {
        id: "tag18",
        name: "Gestión",
        slug: "gestion"
      },
      {
        id: "tag19",
        name: "Rentabilidad",
        slug: "rentabilidad"
      },
      {
        id: "tag20",
        name: "Inquilinos",
        slug: "inquilinos"
      }
    ],

    title: "Gestión de Propiedades Rentables: Guía Completa para Inversores",
    subtitle: "Maximiza tus ingresos con una gestión profesional",
    excerpt: "La gestión eficiente de propiedades puede hacer la diferencia entre una inversión exitosa y una problemática. Descubre las mejores prácticas para maximizar la rentabilidad de tus propiedades.",
    estimatedReadTime: 13,

    coverImage: {
      src: "/images/buildings-bw.jpg",
      alt: "Edificio residencial bien gestionado",
      caption: "Una gestión profesional maximiza la rentabilidad de tus inversiones"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Gestión de Propiedades Rentables: Guía Completa para Inversores",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "La gestión de propiedades es el factor determinante en el éxito de cualquier inversión inmobiliaria. Una gestión profesional puede aumentar significativamente tus ingresos y reducir los dolores de cabeza.",
        dropCap: true
      },
      {
        id: "marketing-heading",
        type: "heading",
        level: 2,
        content: "Marketing y Atracción de Inquilinos",
        anchor: "marketing"
      },
      {
        id: "marketing-paragraph",
        type: "paragraph",
        content: "El marketing efectivo es crucial para mantener tus propiedades ocupadas con inquilinos de calidad que paguen a tiempo."
      },
      {
        id: "marketing-tips",
        type: "list",
        style: "checked",
        items: [
          {
            content: "Fotografías profesionales de alta calidad",
            checked: true
          },
          {
            content: "Descripciones detalladas y atractivas",
            checked: true
          },
          {
            content: "Presencia en múltiples plataformas",
            checked: true
          },
          {
            content: "Precios competitivos basados en el mercado",
            checked: true
          }
        ]
      },
      {
        id: "screening-heading",
        type: "heading",
        level: 2,
        content: "Selección de Inquilinos",
        anchor: "seleccion"
      },
      {
        id: "screening-paragraph",
        type: "paragraph",
        content: "La selección cuidadosa de inquilinos puede prevenir problemas futuros y asegurar un flujo de caja estable."
      },
      {
        id: "screening-quote",
        type: "quote",
        content: "Es mejor tener una propiedad vacía por un mes que un inquilino problemático por un año.",
        author: "Ricardo Vega",
        citation: "Gestor de Propiedades",
        style: "default"
      },
      {
        id: "maintenance-heading",
        type: "heading",
        level: 2,
        content: "Mantenimiento Preventivo",
        anchor: "mantenimiento"
      },
      {
        id: "maintenance-paragraph",
        type: "paragraph",
        content: "El mantenimiento preventivo es más económico que las reparaciones de emergencia y mantiene el valor de tu propiedad."
      },
      {
        id: "maintenance-schedule",
        type: "table",
        headers: ["Tarea", "Frecuencia", "Costo Estimado"],
        rows: [
          ["Inspección HVAC", "Anual", "$100-200"],
          ["Limpieza de canaletas", "Semestral", "$150-300"],
          ["Pintura exterior", "Cada 5-7 años", "$3,000-8,000"],
          ["Revisión eléctrica", "Cada 3 años", "$200-500"]
        ],
        caption: "Programa de mantenimiento preventivo recomendado",
        responsive: true
      },
      {
        id: "technology-heading",
        type: "heading",
        level: 2,
        content: "Tecnología en la Gestión",
        anchor: "tecnologia"
      },
      {
        id: "technology-paragraph",
        type: "paragraph",
        content: "La tecnología moderna puede automatizar muchos aspectos de la gestión de propiedades, ahorrando tiempo y dinero."
      },
      {
        id: "tech-tools",
        type: "list",
        style: "unordered",
        items: [
          { content: "Software de gestión de propiedades" },
          { content: "Sistemas de pago online" },
          { content: "Aplicaciones de comunicación con inquilinos" },
          { content: "Sistemas de monitoreo remoto" }
        ]
      }
    ],

    views: 3240,
    likes: 198,
    shares: 67,
    commentsEnabled: true
  },

  // Noveno blog post
  {
    id: "9",
    slug: "estrategias-ahorro-inversion-inmobiliaria",
    publishedAt: "2024-05-18T09:15:00Z",
    status: "published",

    seo: {
      title: "Estrategias de Ahorro para Inversión Inmobiliaria | LOKL Academy",
      description: "Aprende a ahorrar eficientemente para tu primera inversión inmobiliaria. Métodos probados, presupuestos y consejos prácticos.",
      keywords: ["ahorro", "inversión inmobiliaria", "presupuesto", "capital inicial", "finanzas personales"],
      ogImage: {
        url: "/images/couple-investing.jpg",
        alt: "Estrategias de Ahorro para Inversión",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author9",
      name: "Laura Fernández",
      role: "Coach Financiero Personal",
      avatar: "/images/buildings-bw.jpg",
      bio: "Laura Fernández es coach financiero especializada en ayudar a personas a alcanzar sus metas de inversión inmobiliaria a través de estrategias de ahorro efectivas."
    },

    category: "Finanzas",
    categoryFull: {
      id: "cat6",
      name: "Finanzas Personales",
      slug: "finanzas-personales"
    },

    tags: [
      {
        id: "tag22",
        name: "Ahorro",
        slug: "ahorro"
      },
      {
        id: "tag23",
        name: "Presupuesto",
        slug: "presupuesto"
      },
      {
        id: "tag24",
        name: "Capital",
        slug: "capital"
      }
    ],

    title: "Estrategias de Ahorro para Inversión Inmobiliaria",
    subtitle: "Cómo construir el capital necesario para tu primera inversión",
    excerpt: "El ahorro es el primer paso hacia la inversión inmobiliaria. Descubre estrategias probadas para acumular el capital necesario y comenzar tu viaje como inversor.",
    estimatedReadTime: 12,

    coverImage: {
      src: "/images/couple-investing.jpg",
      alt: "Pareja ahorrando para inversión inmobiliaria",
      caption: "El ahorro sistemático es la base de cualquier estrategia de inversión exitosa"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Estrategias de Ahorro para Inversión Inmobiliaria",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "La inversión inmobiliaria requiere capital inicial, y la mayoría de las personas necesitan tiempo para acumularlo. Las estrategias de ahorro efectivas pueden acelerar significativamente este proceso.",
        dropCap: true
      },
      {
        id: "budget-heading",
        type: "heading",
        level: 2,
        content: "1. Crear un Presupuesto Realista",
        anchor: "presupuesto"
      },
      {
        id: "budget-paragraph",
        type: "paragraph",
        content: "El primer paso es entender exactamente cuánto dinero entra y sale cada mes. Un presupuesto detallado te permitirá identificar oportunidades de ahorro."
      },
      {
        id: "budget-callout",
        type: "callout",
        content: "Regla del 50/30/20: 50% para necesidades, 30% para deseos, 20% para ahorro e inversión.",
        variant: "tip"
      }
    ],

    views: 2760,
    likes: 145,
    shares: 78,
    commentsEnabled: true
  },

  // Décimo blog post
  {
    id: "10",
    slug: "analisis-mercado-local-inversion-inmobiliaria",
    publishedAt: "2024-05-15T14:30:00Z",
    status: "published",

    seo: {
      title: "Análisis de Mercado Local para Inversión Inmobiliaria | LOKL Academy",
      description: "Aprende a analizar mercados locales para identificar las mejores oportunidades de inversión inmobiliaria en tu área.",
      keywords: ["análisis de mercado", "mercado local", "investigación inmobiliaria", "oportunidades de inversión", "datos del mercado"],
      ogImage: {
        url: "/images/skyscraper-bw.jpg",
        alt: "Análisis de Mercado Local",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author10",
      name: "Miguel Ángel Ruiz",
      role: "Analista de Mercado Inmobiliario",
      avatar: "/images/digital-charts.jpg",
      bio: "Miguel Ángel Ruiz es analista de mercado con más de 15 años de experiencia en investigación inmobiliaria local y regional."
    },

    category: "Análisis",
    categoryFull: {
      id: "cat7",
      name: "Análisis de Mercado",
      slug: "analisis-mercado"
    },

    tags: [
      {
        id: "tag25",
        name: "Mercado Local",
        slug: "mercado-local"
      },
      {
        id: "tag26",
        name: "Investigación",
        slug: "investigacion"
      },
      {
        id: "tag27",
        name: "Oportunidades",
        slug: "oportunidades"
      }
    ],

    title: "Análisis de Mercado Local para Inversión Inmobiliaria",
    subtitle: "Cómo identificar las mejores oportunidades en tu área",
    excerpt: "El análisis de mercado local es fundamental para tomar decisiones de inversión informadas. Descubre las herramientas y métodos para evaluar mercados específicos.",
    estimatedReadTime: 13,

    coverImage: {
      src: "/images/skyscraper-bw.jpg",
      alt: "Análisis de mercado inmobiliario local",
      caption: "Conocer tu mercado local es clave para el éxito en inversión inmobiliaria"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Análisis de Mercado Local para Inversión Inmobiliaria",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "Cada mercado inmobiliario es único, con sus propias dinámicas, tendencias y oportunidades. Un análisis profundo del mercado local puede marcar la diferencia entre una inversión exitosa y una mediocre.",
        dropCap: true
      },
      {
        id: "data-sources-heading",
        type: "heading",
        level: 2,
        content: "Fuentes de Datos para el Análisis",
        anchor: "fuentes-datos"
      },
      {
        id: "data-sources-paragraph",
        type: "paragraph",
        content: "La calidad de tu análisis depende de la calidad de los datos que utilices. Es importante recopilar información de múltiples fuentes confiables."
      },
      {
        id: "data-sources-list",
        type: "list",
        style: "unordered",
        items: [
          { content: "Oficinas de registro de la propiedad" },
          { content: "Asociaciones de agentes inmobiliarios" },
          { content: "Reportes de mercado de consultoras especializadas" },
          { content: "Datos demográficos del censo" },
          { content: "Información económica local" }
        ]
      }
    ],

    views: 2340,
    likes: 167,
    shares: 89,
    commentsEnabled: true
  },

  // Undécimo blog post
  {
    id: "11",
    slug: "crowdfunding-inmobiliario-oportunidades-riesgos",
    publishedAt: "2024-05-12T11:45:00Z",
    status: "published",

    seo: {
      title: "Crowdfunding Inmobiliario: Oportunidades y Riesgos | LOKL Academy",
      description: "Explora el crowdfunding inmobiliario como alternativa de inversión. Ventajas, riesgos y cómo evaluar plataformas.",
      keywords: ["crowdfunding inmobiliario", "inversión colectiva", "plataformas inmobiliarias", "financiamiento alternativo", "inversión digital"],
      ogImage: {
        url: "/images/modern-building.jpg",
        alt: "Crowdfunding Inmobiliario",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author11",
      name: "Carmen Silva",
      role: "Especialista en Fintech Inmobiliario",
      avatar: "/images/house-model.jpg",
      bio: "Carmen Silva es especialista en tecnologías financieras aplicadas al sector inmobiliario, con experiencia en múltiples plataformas de crowdfunding."
    },

    category: "Finanzas",
    categoryFull: {
      id: "cat8",
      name: "Financiamiento Alternativo",
      slug: "financiamiento-alternativo"
    },

    tags: [
      {
        id: "tag28",
        name: "Crowdfunding",
        slug: "crowdfunding"
      },
      {
        id: "tag29",
        name: "Fintech",
        slug: "fintech"
      },
      {
        id: "tag30",
        name: "Inversión Digital",
        slug: "inversion-digital"
      }
    ],

    title: "Crowdfunding Inmobiliario: Oportunidades y Riesgos",
    subtitle: "Una guía completa para inversores digitales",
    excerpt: "El crowdfunding inmobiliario democratiza el acceso a inversiones inmobiliarias. Conoce las oportunidades, riesgos y cómo evaluar plataformas.",
    estimatedReadTime: 10,

    coverImage: {
      src: "/images/modern-building.jpg",
      alt: "Plataforma de crowdfunding inmobiliario",
      caption: "El crowdfunding permite invertir en proyectos inmobiliarios con capital mínimo"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Crowdfunding Inmobiliario: Oportunidades y Riesgos",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "El crowdfunding inmobiliario ha revolucionado la forma en que las personas pueden participar en inversiones inmobiliarias, permitiendo acceso con capital mínimo y mayor diversificación.",
        dropCap: true
      },
      {
        id: "advantages-heading",
        type: "heading",
        level: 2,
        content: "Ventajas del Crowdfunding Inmobiliario",
        anchor: "ventajas"
      },
      {
        id: "advantages-list",
        type: "list",
        style: "checked",
        items: [
          { content: "Acceso con capital mínimo", checked: true },
          { content: "Diversificación geográfica", checked: true },
          { content: "Transparencia en los proyectos", checked: true },
          { content: "Liquidez relativa", checked: true },
          { content: "Gestión profesional", checked: true }
        ]
      }
    ],

    views: 1980,
    likes: 134,
    shares: 67,
    commentsEnabled: true
  },

  // Duodécimo blog post
  {
    id: "12",
    slug: "propiedades-sostenibles-inversion-futuro",
    publishedAt: "2024-05-10T16:20:00Z",
    status: "published",

    seo: {
      title: "Propiedades Sostenibles: La Inversión del Futuro | LOKL Academy",
      description: "Descubre por qué las propiedades sostenibles son la inversión inmobiliaria del futuro. Beneficios, certificaciones y tendencias del mercado.",
      keywords: ["propiedades sostenibles", "inversión verde", "certificaciones LEED", "energía renovable", "sostenibilidad inmobiliaria"],
      ogImage: {
        url: "/images/buildings-bw.jpg",
        alt: "Propiedades Sostenibles",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author12",
      name: "Dr. Isabel Moreno",
      role: "Especialista en Sostenibilidad Inmobiliaria",
      avatar: "/images/couple-investing.jpg",
      bio: "Dr. Isabel Moreno es especialista en sostenibilidad inmobiliaria con más de 15 años de experiencia en certificaciones LEED y proyectos verdes."
    },

    category: "Sostenibilidad",
    categoryFull: {
      id: "cat9",
      name: "Inversión Sostenible",
      slug: "inversion-sostenible"
    },

    tags: [
      {
        id: "tag31",
        name: "Sostenibilidad",
        slug: "sostenibilidad"
      },
      {
        id: "tag32",
        name: "Propiedades Verdes",
        slug: "propiedades-verdes"
      },
      {
        id: "tag33",
        name: "Certificaciones",
        slug: "certificaciones"
      }
    ],

    title: "Propiedades Sostenibles: La Inversión del Futuro",
    subtitle: "Por qué las propiedades verdes dominarán el mercado",
    excerpt: "Las propiedades sostenibles no solo son mejores para el planeta, sino que también ofrecen mejores retornos de inversión. Descubre por qué son la inversión del futuro.",
    estimatedReadTime: 11,

    coverImage: {
      src: "/images/buildings-bw.jpg",
      alt: "Edificio sostenible con paneles solares",
      caption: "Las propiedades sostenibles combinan rentabilidad con responsabilidad ambiental"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Propiedades Sostenibles: La Inversión del Futuro",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "La sostenibilidad ya no es una tendencia, sino una realidad del mercado inmobiliario. Las propiedades verdes están demostrando ser no solo mejores para el medio ambiente, sino también más rentables para los inversores.",
        dropCap: true
      },
      {
        id: "benefits-heading",
        type: "heading",
        level: 2,
        content: "Beneficios Financieros de las Propiedades Sostenibles",
        anchor: "beneficios"
      },
      {
        id: "benefits-paragraph",
        type: "paragraph",
        content: "Las propiedades sostenibles ofrecen múltiples ventajas financieras que las hacen atractivas para los inversores."
      },
      {
        id: "benefits-table",
        type: "table",
        headers: ["Beneficio", "Impacto Financiero", "Plazo"],
        rows: [
          ["Menores costos operativos", "Ahorro 20-30% en servicios", "Inmediato"],
          ["Mayor valor de reventa", "Premium del 5-15%", "Mediano plazo"],
          ["Menor vacancia", "Estabilidad de ingresos", "Largo plazo"],
          ["Incentivos fiscales", "Reducción de impuestos", "Anual"]
        ],
        caption: "Beneficios financieros de las propiedades sostenibles"
      }
    ],

    views: 3120,
    likes: 223,
    shares: 145,
    commentsEnabled: true
  },

  // Decimotercero blog post
  {
    id: "13",
    slug: "estrategias-exito-inversion-inmobiliaria-largo-plazo",
    publishedAt: "2024-05-08T13:10:00Z",
    status: "published",
    featured: true,

    seo: {
      title: "Estrategias de Éxito para Inversión Inmobiliaria a Largo Plazo | LOKL Academy",
      description: "Descubre las estrategias probadas para construir un portafolio inmobiliario exitoso a largo plazo. Planificación, diversificación y gestión.",
      keywords: ["inversión a largo plazo", "portafolio inmobiliario", "estrategias de éxito", "construcción de patrimonio", "planificación financiera"],
      ogImage: {
        url: "/images/digital-charts.jpg",
        alt: "Estrategias de Éxito Inmobiliario",
        width: 1200,
        height: 630
      },
      ogType: "article",
      twitterCard: "summary_large_image"
    },

    author: {
      id: "author13",
      name: "Roberto Jiménez",
      role: "Estratega de Inversión Inmobiliaria",
      avatar: "/images/modern-building.jpg",
      bio: "Roberto Jiménez es estratega de inversión inmobiliaria con más de 25 años de experiencia construyendo portafolios exitosos para clientes institucionales y particulares."
    },

    category: "Estrategias",
    categoryFull: {
      id: "cat10",
      name: "Estrategias de Largo Plazo",
      slug: "estrategias-largo-plazo"
    },

    tags: [
      {
        id: "tag34",
        name: "Largo Plazo",
        slug: "largo-plazo"
      },
      {
        id: "tag35",
        name: "Portafolio",
        slug: "portafolio"
      },
      {
        id: "tag36",
        name: "Patrimonio",
        slug: "patrimonio"
      }
    ],

    title: "Estrategias de Éxito para Inversión Inmobiliaria a Largo Plazo",
    subtitle: "Cómo construir un portafolio inmobiliario que genere riqueza sostenible",
    excerpt: "La inversión inmobiliaria a largo plazo requiere estrategias específicas y disciplina. Descubre cómo construir un portafolio que genere riqueza sostenible durante décadas.",
    estimatedReadTime: 16,

    coverImage: {
      src: "/images/digital-charts.jpg",
      alt: "Gráfico de crecimiento de portafolio inmobiliario",
      caption: "La inversión a largo plazo requiere estrategias específicas y disciplina"
    },

    content: [
      {
        id: "intro-heading",
        type: "heading",
        level: 1,
        content: "Estrategias de Éxito para Inversión Inmobiliaria a Largo Plazo",
        anchor: "introduccion"
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        content: "La inversión inmobiliaria a largo plazo es una de las estrategias más efectivas para construir patrimonio generacional. Sin embargo, requiere planificación, disciplina y estrategias específicas para maximizar el potencial de crecimiento.",
        dropCap: true
      },
      {
        id: "mindset-heading",
        type: "heading",
        level: 2,
        content: "El Mindset del Inversor a Largo Plazo",
        anchor: "mindset"
      },
      {
        id: "mindset-paragraph",
        type: "paragraph",
        content: "El éxito en la inversión inmobiliaria a largo plazo comienza con el mindset correcto. Los inversores exitosos piensan en décadas, no en meses o años."
      },
      {
        id: "mindset-quote",
        type: "quote",
        content: "La inversión inmobiliaria es un maratón, no un sprint. Los que tienen éxito son aquellos que mantienen la disciplina durante los altibajos del mercado.",
        author: "Roberto Jiménez",
        citation: "Estratega de Inversión Inmobiliaria",
        style: "large"
      },
      {
        id: "diversification-heading",
        type: "heading",
        level: 2,
        content: "Diversificación Estratégica",
        anchor: "diversificacion"
      },
      {
        id: "diversification-paragraph",
        type: "paragraph",
        content: "La diversificación es fundamental para reducir riesgos y maximizar oportunidades de crecimiento a largo plazo."
      },
      {
        id: "diversification-list",
        type: "list",
        style: "unordered",
        items: [
          { content: "Diversificación geográfica: diferentes ciudades y regiones" },
          { content: "Diversificación por tipo de propiedad: residencial, comercial, industrial" },
          { content: "Diversificación por estrategia: renta, flipping, desarrollo" },
          { content: "Diversificación temporal: compras escalonadas en el tiempo" }
        ]
      }
    ],

    views: 4560,
    likes: 312,
    shares: 189,
    commentsEnabled: true
  }
];

export default mockBlogPosts;
