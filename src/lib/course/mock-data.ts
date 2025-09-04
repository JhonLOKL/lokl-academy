// ===================================================================
// LOKL ACADEMY - MOCK DATA COMPLETO
// Datos de ejemplo para desarrollo y testing
// ===================================================================

import {
    Course,
    LearningPath,
    Instructor,
    Category,
    Tag,
    UserProfile,
    UserProgress,
    LearningProfile,
    SubscriptionPlan,
    PlatformReview,
    ExternalTool,
    NewsletterItem,
    CourseReview
  } from './schema';
  
  // ===================================================================
  // CATEGORÍAS BASE
  // ===================================================================
  
  export const mockCategories: Category[] = [
    {
      id: 'cat-1',
      name: 'Inversión Inmobiliaria',
      slug: 'inversion-inmobiliaria',
      description: 'Aprende a invertir en bienes raíces de manera profesional',
      color: '#3B82F6',
      icon: '🏢',
      courseCount: 12,
      pathCount: 3,
      keywords: ['bienes raices', 'inversión', 'propiedades', 'rentas']
    },
    {
      id: 'cat-2',
      name: 'Inteligencia Artificial',
      slug: 'inteligencia-artificial',
      description: 'Domina la IA aplicada a finanzas e inversiones',
      color: '#8B5CF6',
      icon: '🤖',
      courseCount: 8,
      pathCount: 2,
      keywords: ['IA', 'machine learning', 'automatización', 'análisis']
    },
    {
      id: 'cat-3',
      name: 'Fintech y Crowdfunding',
      slug: 'fintech-crowdfunding',
      description: 'Tecnología financiera y financiamiento colectivo',
      color: '#10B981',
      icon: '💰',
      courseCount: 6,
      pathCount: 2,
      keywords: ['fintech', 'crowdfunding', 'blockchain', 'criptomonedas']
    },
    {
      id: 'cat-4',
      name: 'Análisis de Mercados',
      slug: 'analisis-mercados',
      description: 'Análisis técnico y fundamental para inversiones',
      color: '#F59E0B',
      icon: '📊',
      courseCount: 10,
      pathCount: 2,
      keywords: ['análisis', 'mercados', 'trading', 'economía']
    }
  ];
  
  // ===================================================================
  // TAGS POPULARES
  // ===================================================================
  
  export const mockTags: Tag[] = [
    { id: 'tag-1', name: 'Principiante', slug: 'principiante', color: '#10B981', usageCount: 25 },
    { id: 'tag-2', name: 'Avanzado', slug: 'avanzado', color: '#EF4444', usageCount: 12 },
    { id: 'tag-3', name: 'REITs', slug: 'reits', color: '#3B82F6', usageCount: 8 },
    { id: 'tag-4', name: 'Machine Learning', slug: 'machine-learning', color: '#8B5CF6', usageCount: 15 },
    { id: 'tag-5', name: 'Blockchain', slug: 'blockchain', color: '#F59E0B', usageCount: 10 },
    { id: 'tag-6', name: 'Análisis Técnico', slug: 'analisis-tecnico', color: '#6366F1', usageCount: 18 },
    { id: 'tag-7', name: 'Crowdfunding', slug: 'crowdfunding', color: '#10B981', usageCount: 7 },
    { id: 'tag-8', name: 'Certificado', slug: 'certificado', color: '#F59E0B', usageCount: 20 }
  ];
  
  // ===================================================================
  // INSTRUCTORES
  // ===================================================================
  
  export const mockInstructors: Instructor[] = [
    {
      id: 'inst-1',
      name: 'Ana María Rodríguez',
      slug: 'ana-maria-rodriguez',
      bio: 'Especialista en inversión inmobiliaria con más de 15 años de experiencia. Ha asesorado la compra de más de $50M en propiedades y es autora del bestseller "Invierte como un Pro".',
      avatar: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
      title: 'Directora de Inversiones Inmobiliarias',
      company: 'LOKL Academy',
      expertise: ['REITs', 'Análisis de propiedades', 'Financiamiento inmobiliario', 'Gestión de portafolios'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ana-maria-rodriguez-lokl',
        twitter: 'https://twitter.com/anamaria_lokl',
        website: 'https://anamariarodriguez.com'
      },
      stats: {
        totalCourses: 8,
        totalStudents: 2400,
        averageRating: 4.8,
        yearsExperience: 15
      }
    },
    {
      id: 'inst-2',
      name: 'Dr. Carlos Mendoza',
      slug: 'carlos-mendoza',
      bio: 'PhD en Ciencias de la Computación con especialización en Machine Learning aplicado a finanzas. Ex-director de IA en Goldman Sachs, ahora enfocado en democratizar la tecnología financiera.',
      avatar: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
      title: 'Director de IA y Fintech',
      company: 'LOKL Academy',
      expertise: ['Machine Learning', 'Algoritmos de trading', 'Python', 'Análisis predictivo'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carlos-mendoza-ai',
        website: 'https://carlosmendoza.ai'
      },
      stats: {
        totalCourses: 6,
        totalStudents: 1800,
        averageRating: 4.9,
        yearsExperience: 12
      }
    },
    {
      id: 'inst-3',
      name: 'Laura Fernández',
      slug: 'laura-fernandez',
      bio: 'Especialista en fintech y crowdfunding con experiencia en más de 20 plataformas digitales. Ha facilitado el financiamiento de $30M+ en proyectos inmobiliarios a través de crowdfunding.',
      avatar: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
      title: 'Experta en Crowdfunding Inmobiliario',
      company: 'LOKL Academy',
      expertise: ['Crowdfunding', 'Fintech', 'Evaluación de riesgos', 'Regulación financiera'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/laura-fernandez-fintech',
        twitter: 'https://twitter.com/laura_fintech'
      },
      stats: {
        totalCourses: 4,
        totalStudents: 1200,
        averageRating: 4.7,
        yearsExperience: 8
      }
    }
  ];
  
  // ===================================================================
  // CURSOS COMPLETOS
  // ===================================================================
  
  export const mockCourses: Course[] = [
    {
      id: 'course-1',
      slug: 'fundamentos-inversion-inmobiliaria-2024',
      title: 'Fundamentos de Inversión Inmobiliaria 2024',
      subtitle: 'Tu primera inversión inmobiliaria paso a paso',
      description: 'Aprende los fundamentos esenciales para invertir en bienes raíces de manera exitosa. Este curso te guiará desde cero hasta tu primera inversión rentable.',
      excerpt: 'Domina los conceptos básicos de inversión inmobiliaria, análisis de propiedades, financiamiento y gestión de rentas en este curso completo para principiantes.',
      
      seo: {
        title: 'Curso de Inversión Inmobiliaria 2024 - Aprende desde Cero | LOKL Academy',
        description: 'Aprende inversión inmobiliaria desde cero con nuestro curso completo 2024. ROI, análisis de propiedades, financiamiento y más. ¡Comienza hoy!',
        keywords: ['inversión inmobiliaria', 'curso bienes raices', 'ROI inmobiliario', 'análisis propiedades', 'financiamiento hipotecario'],
        canonicalUrl: 'https://academy.lokl.life/cursos/fundamentos-inversion-inmobiliaria-2024',
        ogImage: {
          url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
          alt: 'Curso de Fundamentos de Inversión Inmobiliaria 2024',
          width: 1200,
          height: 630
        },
        ogType: 'course',
        twitterCard: 'summary_large_image'
      },
  
      content: {
        modules: [
          {
            id: 'mod-1',
            title: 'Introducción a la Inversión Inmobiliaria',
            description: 'Conceptos básicos y tipos de inversión inmobiliaria',
            order: 1,
            duration: 120,
            lessons: [
              {
                id: 'lesson-1-1',
                title: '¿Por qué invertir en bienes raíces?',
                description: 'Ventajas y beneficios de la inversión inmobiliaria',
                order: 1,
                duration: 25,
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/tuGviQOfMQU?start=1',
                thumbnail: {
                  url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
                  alt: 'Introducción a la inversión inmobiliaria'
                },
                isPreview: true
              },
              {
                id: 'lesson-1-2',
                title: 'Tipos de inversión inmobiliaria',
                description: 'REITs, propiedades directas, crowdfunding y más',
                order: 2,
                duration: 30,
                type: 'video',
                videoUrl: 'https://www.youtube.com/watch?time_continue=1&v=tuGviQOfMQU&embeds_referring_euri=https%3A%2F%2Flokl.life%2F&source_ve_path=MjM4NTE',
                thumbnail: {
                  url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
                  alt: 'Tipos de inversión inmobiliaria'
                }
              }
            ],
            quiz: {
              id: 'quiz-1',
              title: 'Evaluación Módulo 1',
              description: 'Demuestra tu comprensión de los conceptos básicos',
              questions: [
                {
                  id: 'q1',
                  question: '¿Cuál es la principal ventaja de los REITs sobre la inversión directa?',
                  type: 'multiple-choice',
                  options: ['Mayor control', 'Mayor liquidez', 'Menores impuestos', 'Mayor rentabilidad'],
                  correctAnswer: 'Mayor liquidez',
                  explanation: 'Los REITs se pueden comprar y vender fácilmente en el mercado, ofreciendo mayor liquidez que las propiedades físicas.',
                  points: 10
                }
              ],
              passingScore: 70,
              maxAttempts: 3
            }
          },
          {
            id: 'mod-2',
            title: 'Análisis de Propiedades',
            description: 'Cómo evaluar el potencial de una inversión inmobiliaria',
            order: 2,
            duration: 180,
            lessons: [
              {
                id: 'lesson-2-1',
                title: 'Métricas clave: ROI, Cap Rate, Cash Flow',
                order: 1,
                duration: 35,
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/tuGviQOfMQU?start=1'
              },
              {
                id: 'lesson-2-2',
                title: 'Análisis de mercado local',
                order: 2,
                duration: 40,
                type: 'video',
                videoUrl: 'https://www.youtube.com/watch?time_continue=1&v=tuGviQOfMQU&embeds_referring_euri=https%3A%2F%2Flokl.life%2F&source_ve_path=MjM4NTE'
              }
            ]
          }
        ],
        totalLessons: 8,
        totalDuration: 480,
        difficulty: 'principiante',
        requirements: [
          'Conocimientos básicos de finanzas personales',
          'Interés en inversiones inmobiliarias',
          'Acceso a calculadora o Excel'
        ],
        learningObjectives: [
          'Entender los fundamentos de la inversión inmobiliaria',
          'Calcular ROI, Cap Rate y Cash Flow de propiedades',
          'Evaluar mercados locales para inversión',
          'Identificar oportunidades de inversión rentables'
        ],
        skillsYouWillLearn: [
          'Análisis de propiedades',
          'Cálculo de métricas financieras',
          'Investigación de mercados',
          'Evaluación de riesgos'
        ],
        targetAudience: [
          'Nuevos inversores inmobiliarios',
          'Profesionales buscando ingresos pasivos',
          'Estudiantes de finanzas'
        ]
      },
  
      category: mockCategories[0],
      tags: [mockTags[0], mockTags[2], mockTags[7]],
      instructor: mockInstructors[0],
  
      pricing: {
        type: 'free'
      },
  
      accessRequirements: {
        plan: 'investor'
      },
  
      thumbnail: {
        url: '/images/buildings-bw.jpg',
        alt: 'Fundamentos de Inversión Inmobiliaria'
      },
      previewVideo: {
        url: 'https://www.youtube.com/embed/tuGviQOfMQU?start=1',
        duration: 180,
        alt: 'Vista previa del curso'
      },
  
      stats: {
        enrolledCount: 1247,
        completedCount: 892,
        completionRate: 71.5,
        averageRating: 4.8,
        reviewsCount: 234,
        totalViews: 3420,
        averageTimeToComplete: 16
      },
  
      certificate: {
        available: true,
        criteria: {
          completionRequired: true,
          minimumScore: 80
        }
      },
  
      publishedAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-11-20T15:30:00Z',
      status: 'published',
      featured: true,
      isNew: false,
  
      settings: {
        allowDownloads: true,
        allowDiscussions: true,
        showProgress: true,
        enforceOrder: true
      }
    },
    {
      id: 'course-2',
      slug: 'ia-analisis-inmobiliario-avanzado',
      title: 'IA para Análisis Inmobiliario Avanzado',
      subtitle: 'Utiliza Machine Learning para predecir precios y tendencias',
      description: 'Aprende a implementar algoritmos de inteligencia artificial para análisis predictivo en el mercado inmobiliario. Desde Python hasta modelos de ML avanzados.',
      excerpt: 'Domina las técnicas de IA más avanzadas para análisis inmobiliario. Predice precios, identifica tendencias y automatiza análisis con Machine Learning.',
  
      seo: {
        title: 'Curso IA para Análisis Inmobiliario - Machine Learning | LOKL Academy',
        description: 'Aprende a usar IA y Machine Learning para análisis inmobiliario avanzado. Python, predicción de precios, tendencias del mercado. Curso avanzado.',
        keywords: ['IA inmobiliaria', 'machine learning', 'análisis predictivo', 'python inmobiliario', 'algoritmos ML'],
        canonicalUrl: 'https://academy.lokl.life/cursos/ia-analisis-inmobiliario-avanzado',
        ogImage: {
          url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
          alt: 'Curso de IA para Análisis Inmobiliario Avanzado',
          width: 1200,
          height: 630
        },
        ogType: 'course',
        twitterCard: 'summary_large_image'
      },
  
      content: {
        modules: [
          {
            id: 'mod-ai-1',
            title: 'Introducción a IA en Bienes Raíces',
            order: 1,
            duration: 90,
            lessons: [
              {
                id: 'lesson-ai-1',
                title: 'Configuración del entorno Python',
                order: 1,
                duration: 30,
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/tuGviQOfMQU?start=1'
              }
            ]
          }
        ],
        totalLessons: 12,
        totalDuration: 720,
        difficulty: 'avanzado',
        requirements: [
          'Conocimientos básicos de programación',
          'Experiencia previa en inversión inmobiliaria',
          'Matemáticas de nivel universitario'
        ],
        learningObjectives: [
          'Implementar modelos de ML para análisis inmobiliario',
          'Predecir precios de propiedades con alta precisión',
          'Automatizar análisis de mercado con Python'
        ],
        skillsYouWillLearn: [
          'Python para finanzas',
          'Machine Learning',
          'Análisis de datos',
          'Modelos predictivos'
        ],
        targetAudience: [
          'Desarrolladores con interés en finanzas',
          'Analistas de datos',
          'Inversores inmobiliarios avanzados'
        ]
      },
  
      category: mockCategories[1],
      tags: [mockTags[1], mockTags[3], mockTags[7]],
      instructor: mockInstructors[1],
  
      pricing: {
        type: 'free'
      },
  
      accessRequirements: {
        plan: 'basic'
      },
  
      thumbnail: {
        url: '/images/modern-building.jpg',
        alt: 'IA para Análisis Inmobiliario'
      },
  
      stats: {
        enrolledCount: 342,
        completedCount: 198,
        completionRate: 57.9,
        averageRating: 4.9,
        reviewsCount: 87,
        totalViews: 890,
        averageTimeToComplete: 28
      },
  
      certificate: {
        available: true,
        criteria: {
          completionRequired: true,
          minimumScore: 85,
          timeRequirement: 25
        }
      },
  
      publishedAt: '2024-06-10T14:00:00Z',
      updatedAt: '2024-11-25T09:15:00Z',
      status: 'published',
      featured: true,
  
      settings: {
        allowDownloads: true,
        allowDiscussions: true,
        showProgress: true,
        enforceOrder: true
      }
    },
    {
      id: 'course-3',
      slug: 'crowdfunding-inmobiliario-masterclass',
      title: 'Crowdfunding Inmobiliario Masterclass',
      subtitle: 'Invierte en proyectos inmobiliarios con capital mínimo',
      description: 'Descubre cómo el crowdfunding inmobiliario puede democratizar tu acceso a grandes proyectos de inversión. Aprende a evaluar plataformas, riesgos y oportunidades.',
      excerpt: 'Masterclass completa sobre crowdfunding inmobiliario: plataformas, evaluación de proyectos, diversificación de riesgo y construcción de portafolio.',
  
      seo: {
        title: 'Masterclass Crowdfunding Inmobiliario - Invierte desde $100 | LOKL Academy',
        description: 'Aprende crowdfunding inmobiliario profesional. Evalúa plataformas, proyectos y riesgos. Invierte en bienes raíces desde capital mínimo.',
        keywords: ['crowdfunding inmobiliario', 'inversión colectiva', 'plataformas inmobiliarias', 'capital mínimo', 'fintech'],
        canonicalUrl: 'https://academy.lokl.life/cursos/crowdfunding-inmobiliario-masterclass',
        ogImage: {
          url: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
          alt: 'Masterclass de Crowdfunding Inmobiliario',
          width: 1200,
          height: 630
        },
        ogType: 'course',
        twitterCard: 'summary_large_image'
      },
  
      content: {
        modules: [
          {
            id: 'mod-cf-1',
            title: 'Fundamentos del Crowdfunding',
            order: 1,
            duration: 150,
            lessons: [
              {
                id: 'lesson-cf-1',
                title: '¿Qué es el crowdfunding inmobiliario?',
                order: 1,
                duration: 25,
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/tuGviQOfMQU?start=1',
                isPreview: true
              }
            ]
          }
        ],
        totalLessons: 6,
        totalDuration: 360,
        difficulty: 'intermedio',
        requirements: [
          'Conocimientos básicos de inversión',
          'Capital mínimo de $100 USD'
        ],
        learningObjectives: [
          'Entender el ecosistema de crowdfunding inmobiliario',
          'Evaluar plataformas y proyectos',
          'Diversificar riesgo efectivamente'
        ],
        skillsYouWillLearn: [
          'Evaluación de plataformas',
          'Análisis de proyectos',
          'Gestión de riesgo',
          'Due diligence'
        ],
        targetAudience: [
          'Inversores con capital limitado',
          'Profesionales interesados en fintech',
          'Inversores que buscan diversificación'
        ]
      },
  
      category: mockCategories[2],
      tags: [mockTags[0], mockTags[6], mockTags[7]],
      instructor: mockInstructors[2],
  
      pricing: {
        type: 'premium',
        price: 147,
        originalPrice: 197,
        currency: 'USD'
      },
  
      accessRequirements: {
        plan: 'investor'
      },
  
      thumbnail: {
        url: '/images/skyscraper-bw.jpg',
        alt: 'Crowdfunding Inmobiliario Masterclass'
      },
  
      stats: {
        enrolledCount: 823,
        completedCount: 654,
        completionRate: 79.5,
        averageRating: 4.7,
        reviewsCount: 156,
        totalViews: 1850,
        averageTimeToComplete: 12
      },
  
      certificate: {
        available: true,
        criteria: {
          completionRequired: true,
          minimumScore: 75
        }
      },
  
      publishedAt: '2024-08-20T11:00:00Z',
      updatedAt: '2024-11-30T16:45:00Z',
      status: 'published',
      featured: false,
  
      settings: {
        allowDownloads: true,
        allowDiscussions: true,
        showProgress: true,
        enforceOrder: false
      }
    },
    
  ];
  
  // ===================================================================
  // RUTAS DE APRENDIZAJE
  // ===================================================================
  
  export const mockLearningPaths: LearningPath[] = [
    {
      id: 'path-1',
      slug: 'inversionista-explorador-completo',
      title: 'Inversionista Explorador - Ruta Completa',
      description: 'La ruta perfecta para comenzar tu camino como inversionista inmobiliario. Desde los fundamentos hasta estrategias avanzadas.',
      excerpt: 'Ruta estructurada para nuevos inversores: fundamentos, análisis, financiamiento y primeras inversiones rentables.',
  
      seo: {
        title: 'Ruta Inversionista Explorador - De Principiante a Experto | LOKL Academy',
        description: 'Ruta de aprendizaje completa para inversores inmobiliarios. Desde fundamentos hasta estrategias avanzadas. Certificación profesional incluida.',
        keywords: ['ruta inversión inmobiliaria', 'curso completo bienes raices', 'certificación inversor', 'aprendizaje estructurado'],
        canonicalUrl: 'https://academy.lokl.life/rutas/inversionista-explorador-completo',
        ogImage: {
          url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
          alt: 'Ruta Inversionista Explorador Completa',
          width: 1200,
          height: 630
        },
        ogType: 'course',
        twitterCard: 'summary_large_image'
      },
  
      structure: {
        totalCourses: 3,
        totalModules: 8,
        totalLessons: 26,
        totalDuration: 1560, // 26 horas
        estimatedCompletionTime: '3 meses',
        difficulty: 'principiante',
        learningObjectives: [
          'Dominar fundamentos de inversión inmobiliaria',
          'Realizar tu primera inversión rentable',
          'Construir un portafolio diversificado',
          'Generar ingresos pasivos consistentes'
        ],
        skillsYouWillLearn: [
          'Análisis de propiedades',
          'Estrategias de financiamiento',
          'Gestión de portafolios',
          'Evaluación de riesgos',
          'Crowdfunding inmobiliario'
        ]
      },
  
      courses: [
        {
          courseId: 'course-1',
          course: mockCourses[0],
          order: 1,
          description: 'Establece las bases sólidas de tu conocimiento inmobiliario'
        },
        {
          courseId: 'course-3',
          course: mockCourses[2],
          order: 2,
          description: 'Aprende a invertir con capital mínimo usando crowdfunding'
        },
        {
          courseId: 'course-2',
          course: mockCourses[1],
          order: 3,
          isOptional: true,
          prerequisites: ['course-1'],
          description: 'Módulo avanzado para automatizar análisis con IA'
        }
      ],
  
      milestones: [
        {
          id: 'milestone-1',
          title: 'Fundamentos Dominados',
          description: 'Has completado los conceptos básicos de inversión inmobiliaria',
          requiredCourses: ['course-1'],
          order: 1,
          certificate: {
            available: true
          }
        },
        {
          id: 'milestone-2',
          title: 'Primera Inversión',
          description: 'Has realizado tu primera inversión inmobiliaria',
          requiredCourses: ['course-1', 'course-3'],
          order: 2,
          certificate: {
            available: true
          }
        }
      ],
  
      category: mockCategories[0],
      tags: [mockTags[0], mockTags[7]],
  
      pricing: {
        type: 'free',
        price: 0,
        originalPrice: 0,
        currency: 'USD',
        individualCoursesPrice: 0,
        savings: 0
      },
  
      accessRequirements: {
        plan: 'any'
      },
  
      thumbnail: {
        url: '/images/buildings-bw.jpg',
        alt: 'Ruta Inversionista Explorador'
      },
  
      stats: {
        enrolledCount: 567,
        completedCount: 234,
        completionRate: 41.3,
        averageRating: 4.8,
        reviewsCount: 89,
        averageTimeToComplete: 12 // semanas
      },
  
      publishedAt: '2024-02-01T08:00:00Z',
      updatedAt: '2024-11-15T12:00:00Z',
      status: 'published',
      featured: true,
  
      settings: {
        enforceOrder: true,
        allowSkipping: false,
        showDetailedProgress: true
      }
    },
    {
      id: 'path-2',
      slug: 'maestro-fintech-inmobiliario',
      title: 'Maestro en Fintech Inmobiliario',
      description: 'Domina las tecnologías financieras más avanzadas aplicadas al sector inmobiliario. IA, blockchain, y análisis predictivo.',
      excerpt: 'Ruta avanzada combinando IA, fintech y bienes raíces para profesionales que buscan liderar la innovación inmobiliaria.',
  
      seo: {
        title: 'Maestro en Fintech Inmobiliario - IA y Blockchain | LOKL Academy',
        description: 'Ruta avanzada en fintech inmobiliario. IA, blockchain, análisis predictivo y tecnologías disruptivas para el sector inmobiliario.',
        keywords: ['fintech inmobiliario', 'IA bienes raices', 'blockchain propiedades', 'análisis predictivo', 'tecnología inmobiliaria'],
        canonicalUrl: 'https://academy.lokl.life/rutas/maestro-fintech-inmobiliario',
        ogImage: {
          url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
          alt: 'Maestro en Fintech Inmobiliario',
          width: 1200,
          height: 630
        },
        ogType: 'course',
        twitterCard: 'summary_large_image'
      },
  
      structure: {
        totalCourses: 2,
        totalModules: 6,
        totalLessons: 18,
        totalDuration: 1080, // 18 horas
        estimatedCompletionTime: '4 meses',
        difficulty: 'avanzado',
        learningObjectives: [
          'Implementar IA en análisis inmobiliario',
          'Utilizar blockchain para transacciones',
          'Desarrollar modelos predictivos',
          'Liderar innovación en PropTech'
        ],
        skillsYouWillLearn: [
          'Machine Learning avanzado',
          'Python para finanzas',
          'Blockchain inmobiliario',
          'Análisis de big data',
          'Desarrollo de PropTech'
        ]
      },
  
      courses: [
        {
          courseId: 'course-2',
          order: 1,
          description: 'Domina IA y ML para análisis inmobiliario avanzado'
        },
        {
          courseId: 'course-3',
          order: 2,
          description: 'Comprende las plataformas fintech más innovadoras'
        }
      ],
  
      milestones: [
        {
          id: 'milestone-ft-1',
          title: 'Experto en IA Inmobiliaria',
          description: 'Dominas la implementación de IA en análisis inmobiliario',
          requiredCourses: ['course-2'],
          order: 1
        }
      ],
  
      category: mockCategories[1],
      tags: [mockTags[1], mockTags[3], mockTags[4]],
  
      pricing: {
        type: 'exclusive',
        price: 697,
        originalPrice: 994,
        currency: 'USD'
      },
  
      accessRequirements: {
        plan: 'any'
      },
  
      thumbnail: {
        url: '/images/modern-building.jpg',
        alt: 'Maestro en Fintech Inmobiliario'
      },
  
      stats: {
        enrolledCount: 123,
        completedCount: 45,
        completionRate: 36.6,
        averageRating: 4.9,
        reviewsCount: 28,
        averageTimeToComplete: 16
      },
  
      publishedAt: '2024-07-15T10:00:00Z',
      updatedAt: '2024-12-01T14:30:00Z',
      status: 'published',
      featured: true,
  
      settings: {
        enforceOrder: true,
        allowSkipping: false,
        showDetailedProgress: true
      }
    }
  ];
  
  // ===================================================================
  // PERFILES DE APRENDIZAJE
  // ===================================================================
  
  export const mockLearningProfiles: LearningProfile[] = [
    {
      id: 'profile-1',
      slug: 'inversionista-explorador',
      title: 'Inversionista Explorador',
      description: 'Para quienes dan sus primeros pasos en el mundo de las inversiones inmobiliarias. Perfil ideal para principiantes.',
      level: 'explorer',
  
      paths: [
        {
          pathId: 'path-1',
          path: mockLearningPaths[0],
          order: 1,
          isCore: true,
          description: 'Ruta fundamental que establece las bases sólidas'
        }
      ],
  
      aggregatedStats: {
        totalCourses: 3,
        totalDuration: 26,
        estimatedCompletionTime: '3 meses',
        averageRating: 4.8,
        totalEnrolled: 567
      },
  
      benefits: [
        'Certificación oficial de Inversionista Explorador',
        'Acceso a comunidad exclusiva de nuevos inversores',
        'Mentorías grupales mensuales',
        'Templates y calculadoras descargables'
      ],
  
      thumbnail: {
        url: '/images/buildings-bw.jpg',
        alt: 'Perfil Inversionista Explorador'
      },
  
      seo: {
        title: 'Perfil Inversionista Explorador - Comienza tu Camino | LOKL Academy',
        description: 'Perfil de aprendizaje para nuevos inversores inmobiliarios. Fundamentos, primeras inversiones y construcción de portafolio paso a paso.',
        keywords: ['inversionista principiante', 'perfil explorador', 'primeras inversiones', 'fundamentos inmobiliarios'],
        canonicalUrl: 'https://academy.lokl.life/perfiles/inversionista-explorador',
        ogImage: {
          url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
          alt: 'Perfil Inversionista Explorador',
          width: 1200,
          height: 630
        },
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    },
    {
      id: 'profile-2',
      slug: 'inversionista-aventurero',
      title: 'Inversionista Aventurero',
      description: 'Para inversores con experiencia básica que buscan estrategias más avanzadas y diversificación de portafolio.',
      level: 'adventurer',
  
      paths: [
        {
          pathId: 'path-1',
          order: 1,
          isCore: true,
          description: 'Base sólida requerida'
        },
        {
          pathId: 'path-2',
          order: 2,
          isCore: false,
          description: 'Especialización en tecnología'
        }
      ],
  
      aggregatedStats: {
        totalCourses: 5,
        totalDuration: 44,
        estimatedCompletionTime: '6 meses',
        averageRating: 4.85,
        totalEnrolled: 234
      },
  
      benefits: [
        'Certificación Inversionista Aventurero',
        'Acceso a oportunidades de inversión exclusivas',
        'Mentorías 1:1 trimestrales',
        'Análisis de mercado personalizado'
      ],
  
      thumbnail: {
        url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
        alt: 'Perfil Inversionista Aventurero'
      },
  
      seo: {
        title: 'Perfil Inversionista Aventurero - Estrategias Avanzadas | LOKL Academy',
        description: 'Perfil intermedio para inversores inmobiliarios. Estrategias avanzadas, tecnología fintech y diversificación profesional.',
        keywords: ['inversionista intermedio', 'estrategias avanzadas', 'fintech inmobiliario', 'diversificación'],
        canonicalUrl: 'https://academy.lokl.life/perfiles/inversionista-aventurero',
        ogImage: {
          url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
          alt: 'Perfil Inversionista Aventurero',
          width: 1200,
          height: 630
        },
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    },
    {
      id: 'profile-3',
      slug: 'inversionista-heroe',
      title: 'Inversionista Héroe',
      description: 'El nivel más alto para expertos que buscan dominar todas las facetas de la inversión inmobiliaria moderna.',
      level: 'hero',
  
      paths: [
        {
          pathId: 'path-1',
          order: 1,
          isCore: true
        },
        {
          pathId: 'path-2',
          order: 2,
          isCore: true
        }
      ],
  
      aggregatedStats: {
        totalCourses: 5,
        totalDuration: 44,
        estimatedCompletionTime: '8 meses',
        averageRating: 4.9,
        totalEnrolled: 89
      },
  
      benefits: [
        'Certificación Máster Inversionista Héroe',
        'Acceso VIP a todos los proyectos LOKL',
        'Mentorías 1:1 mensuales',
        'Invitación a eventos exclusivos',
        'Red de networking de élite'
      ],
  
      thumbnail: {
        url: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
        alt: 'Perfil Inversionista Héroe'
      },
  
      seo: {
        title: 'Perfil Inversionista Héroe - Máximo Nivel de Experticia | LOKL Academy',
        description: 'Perfil experto para másters en inversión inmobiliaria. Domina IA, fintech, análisis avanzado y estrategias institucionales.',
        keywords: ['inversionista experto', 'máster inmobiliario', 'estrategias institucionales', 'IA inmobiliaria'],
        canonicalUrl: 'https://academy.lokl.life/perfiles/inversionista-heroe',
        ogImage: {
          url: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
          alt: 'Perfil Inversionista Héroe',
          width: 1200,
          height: 630
        },
        ogType: 'website',
        twitterCard: 'summary_large_image'
      }
    }
  ];
  
  // ===================================================================
  // PLANES DE SUSCRIPCIÓN
  // ===================================================================
  
  export const mockSubscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'plan-basic',
      name: 'Básico',
      slug: 'basico',
      description: 'Perfecto para comenzar tu educación financiera con contenido fundamental y acceso a la comunidad.',
  
      pricing: {
        monthly: 0,
        yearly: 0,
        currency: 'USD'
      },
  
      features: {
        basicCourses: true,
        premiumCourses: false,
        exclusiveCourses: false,
        allBlogs: false,
        podcasts: true,
        dedicatedSupport: false,
        liveConferences: false,
        communityAccess: true,
        earlyProjectAccess: false,
        exclusiveProjects: false,
        investmentTools: false,
        maxConcurrentCourses: 2,
        certificatesIncluded: false
      },
  
      targetAudience: [
        'Personas nuevas en inversiones',
        'Estudiantes y jóvenes profesionales',
        'Quienes buscan contenido gratuito de calidad'
      ],
  
      isPopular: false,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'plan-investor',
      name: 'Inversionista',
      slug: 'inversionista',
      description: 'El plan más popular para inversores serios que buscan acceso completo a contenido premium y beneficios exclusivos.',
  
      pricing: {
        monthly: 97,
        yearly: 970,
        currency: 'USD',
        yearlyDiscount: 17
      },
  
      features: {
        basicCourses: true,
        premiumCourses: true,
        exclusiveCourses: false,
        allBlogs: true,
        podcasts: true,
        dedicatedSupport: true,
        liveConferences: true,
        communityAccess: true,
        earlyProjectAccess: true,
        exclusiveProjects: false,
        investmentTools: true,
        certificatesIncluded: true
      },
  
      targetAudience: [
        'Inversores activos y serios',
        'Profesionales del sector financiero',
        'Emprendedores inmobiliarios'
      ],
  
      isPopular: true,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-06-15T00:00:00Z'
    },
    {
      id: 'plan-premium',
      name: 'Premium',
      slug: 'premium',
      description: 'La experiencia más exclusiva con acceso VIP a todos los contenidos, proyectos exclusivos y soporte personalizado.',
  
      pricing: {
        monthly: 197,
        yearly: 1970,
        currency: 'USD',
        yearlyDiscount: 17
      },
  
      features: {
        basicCourses: true,
        premiumCourses: true,
        exclusiveCourses: true,
        allBlogs: true,
        podcasts: true,
        dedicatedSupport: true,
        liveConferences: true,
        communityAccess: true,
        earlyProjectAccess: true,
        exclusiveProjects: true,
        investmentTools: true,
        certificatesIncluded: true
      },
  
      targetAudience: [
        'Inversores institucionales',
        'High net worth individuals',
        'Desarrolladores de PropTech'
      ],
  
      isPopular: false,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-09-20T00:00:00Z'
    }
  ];
  
  // ===================================================================
  // HERRAMIENTAS EXTERNAS
  // ===================================================================
  
  export const mockExternalTools: ExternalTool[] = [
    {
      id: 'tool-1',
      name: 'Simulador de Inversiones LOKL',
      description: 'Simula diferentes escenarios de inversión inmobiliaria y proyecta retornos futuros con datos de mercado reales.',
      url: 'https://www.lokl.life',
      category: 'simulator',
  
      thumbnail: {
        url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
        alt: 'Simulador de Inversiones LOKL'
      },
  
      isActive: true,
      requiresLogin: false,
      isPremium: false,
  
      stats: {
        totalClicks: 15420,
        averageTimeSpent: 8.5,
        userRating: 4.7
      }
    },
    {
      id: 'tool-2',
      name: 'Simulador de Libertad Financiera',
      description: 'Proyecta tu camino hacia la libertad financiera considerando diferentes fuentes de ingresos y estrategias de ahorro.',
      url: 'https://www.lokl.life/landing/financial-freedom-simulator',
      category: 'calculator',
  
      thumbnail: {
        url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
        alt: 'Simulador de Libertad Financiera'
      },
  
      isActive: true,
      requiresLogin: false,
      isPremium: false,
  
      stats: {
        totalClicks: 8930,
        averageTimeSpent: 12.3,
        userRating: 4.8
      }
    },
    {
      id: 'tool-3',
      name: 'Comparador de Proyectos',
      description: 'Compara diferentes proyectos inmobiliarios lado a lado para tomar la mejor decisión de inversión.',
      url: 'https://www.lokl.life/#newprojects',
      category: 'comparator',
  
      thumbnail: {
        url: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
        alt: 'Comparador de Proyectos'
      },
  
      isActive: true,
      requiresLogin: true,
      isPremium: true,
  
      stats: {
        totalClicks: 5670,
        averageTimeSpent: 15.7,
        userRating: 4.9
      }
    }
  ];
  
  // ===================================================================
  // REVIEWS Y TESTIMONIOS
  // ===================================================================
  
  export const mockCourseReviews: CourseReview[] = [
    {
      id: 'review-1',
      userId: 'user-1',
      userName: 'María González',
      userAvatar: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
      courseId: 'course-1',
      rating: 5,
      title: 'Excelente curso para principiantes',
      comment: 'Como alguien completamente nueva en inversiones inmobiliarias, este curso me dio las bases perfectas. Ana María explica todo de manera muy clara y los ejemplos son súper prácticos.',
      helpful: 23,
      createdAt: '2024-11-15T14:30:00Z',
      verified: true
    },
    {
      id: 'review-2',
      userId: 'user-2',
      userName: 'Carlos Ruiz',
      userAvatar: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
      courseId: 'course-1',
      rating: 4,
      title: 'Muy completo y bien estructurado',
      comment: 'El contenido está muy bien organizado. Me gustó especialmente la parte de análisis de métricas. Ya pude aplicar lo aprendido en mi primera inversión.',
      helpful: 18,
      createdAt: '2024-11-10T09:15:00Z',
      verified: true
    },
    {
      id: 'review-3',
      userId: 'user-3',
      userName: 'Ana Sofía López',
      courseId: 'course-2',
      rating: 5,
      title: 'Increíble nivel técnico',
      comment: 'Dr. Mendoza es un genio. El curso de IA es súper avanzado pero bien explicado. Los modelos de ML que enseña son realmente útiles para análisis inmobiliario.',
      helpful: 31,
      createdAt: '2024-11-20T16:45:00Z',
      verified: true
    }
  ];
  
  export const mockPlatformReviews: PlatformReview[] = [
    {
      id: 'platform-review-1',
      userId: 'user-4',
      userName: 'Roberto Jiménez',
      userAvatar: 'https://realestatemarket.com.mx/images/2019/05-Mayo/0605/rascacielos_grandes.jpg',
      userTitle: 'CEO, InvestProp',
      rating: 5,
      title: 'La mejor plataforma de educación inmobiliaria',
      comment: 'He probado muchas plataformas y LOKL Academy es superior. La combinación de teoría sólida con casos prácticos reales es excepcional. Mis equipos han mejorado significativamente.',
      userPlan: 'premium',
      coursesCompleted: 8,
      timeOnPlatform: 14,
      helpful: 45,
      featured: true,
      createdAt: '2024-10-25T11:30:00Z',
      status: 'approved'
    },
    {
      id: 'platform-review-2',
      userId: 'user-5',
      userName: 'Isabella Morales',
      userTitle: 'Inversora Independiente',
      rating: 4,
      comment: 'Comencé sin saber nada de inversiones y ahora tengo un portafolio diversificado de 5 propiedades. La educación que recibí aquí fue clave para mi éxito.',
      userPlan: 'investor',
      coursesCompleted: 6,
      timeOnPlatform: 8,
      helpful: 28,
      featured: true,
      createdAt: '2024-11-05T08:20:00Z',
      status: 'approved'
    }
  ];
  
  // ===================================================================
  // NEWSLETTER Y CONTENIDO DE TENDENCIAS
  // ===================================================================
  
  export const mockNewsletterItems: NewsletterItem[] = [
    {
      id: 'newsletter-1',
      title: 'El impacto de la IA en el mercado inmobiliario 2025',
      excerpt: 'Cómo los algoritmos de machine learning están transformando la valuación de propiedades y la toma de decisiones de inversión.',
      content: 'La inteligencia artificial está revolucionando el análisis inmobiliario...',
      type: 'trend',
      featuredImage: {
        url: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
        alt: 'IA en el mercado inmobiliario'
      },
      publishedAt: '2024-12-01T10:00:00Z',
      author: mockInstructors[1],
      tags: [mockTags[3], mockTags[0]],
      views: 2840,
      likes: 156,
      shares: 89,
      featured: true,
      status: 'published'
    },
    {
      id: 'newsletter-2',
      title: 'Nuevos proyectos de crowdfunding inmobiliario disponibles',
      excerpt: 'Tres nuevos proyectos inmobiliarios han abierto sus rondas de financiamiento colectivo con rentabilidades proyectadas del 12-15% anual.',
      content: 'El crowdfunding inmobiliario sigue creciendo...',
      type: 'news',
      featuredImage: {
        url: 'https://teranarq.com/wp-content/uploads/10-edificios-altos-panama.jpg',
        alt: 'Nuevos proyectos de crowdfunding'
      },
      publishedAt: '2024-11-28T15:30:00Z',
      author: mockInstructors[2],
      tags: [mockTags[6]],
      views: 1920,
      likes: 94,
      shares: 67,
      featured: false,
      status: 'published'
    }
  ];
  
  // ===================================================================
  // PROGRESO DE USUARIO EJEMPLO
  // ===================================================================
  
  export const mockUserProgress: UserProgress[] = [
    {
      userId: 'user-1',
      courseId: 'course-1',
      overallProgress: 75,
      completedLessons: 6,
      totalLessons: 8,
      timeSpent: 380,
      moduleProgress: [
        {
          moduleId: 'mod-1',
          progress: 100,
          completedAt: '2024-11-10T14:20:00Z'
        },
        {
          moduleId: 'mod-2',
          progress: 50
        }
      ],
      startedAt: '2024-11-01T09:00:00Z',
      lastAccessedAt: '2024-11-29T16:45:00Z',
      quizScores: [
        {
          quizId: 'quiz-1',
          score: 85,
          attempts: 1,
          bestScore: 85
        }
      ]
    },
    {
      userId: 'user-1',
      pathId: 'path-1',
      overallProgress: 45,
      completedLessons: 8,
      totalLessons: 18,
      timeSpent: 720,
      moduleProgress: [
        {
          moduleId: 'course-1',
          progress: 100,
          completedAt: '2024-11-15T10:30:00Z'
        },
        {
          moduleId: 'course-3',
          progress: 35
        }
      ],
      startedAt: '2024-11-01T09:00:00Z',
      lastAccessedAt: '2024-11-29T16:45:00Z'
    }
  ];
  
  // ===================================================================
  // PERFIL DE USUARIO EJEMPLO
  // ===================================================================
  
  export const mockUserProfile: UserProfile = {
    id: 'user-1',
    email: 'maria.gonzalez@email.com',
    name: 'María González',
    avatar: 'https://img.freepik.com/fotos-premium/arquitectura-corporativa-moderna-puede-ver-edificios-oficinas-paisaje-urbano_410516-276.jpg?w=2000',
    
    plan: 'investor',
    permissions: ['access_premium_courses', 'download_materials', 'community_access'],
    subscriptionEndsAt: '2025-11-01T00:00:00Z',
    
    preferences: {
      language: 'es-CO',
      timezone: 'America/Bogota',
      emailNotifications: true,
      pushNotifications: false,
      preferredLearningTime: 'evening'
    },
    
    learningStats: {
      totalCoursesEnrolled: 5,
      totalCoursesCompleted: 2,
      totalTimeSpent: 1420, // 23.7 horas
      currentStreak: 7,
      longestStreak: 15,
      certificatesEarned: 2
    },
    
    enrolledCourses: ['course-1', 'course-3'],
    enrolledPaths: ['path-1'],
    wishlist: ['course-2', 'path-2'],
    completedCourses: ['course-1'],
    completedPaths: []
  };
  
  // ===================================================================
  // EXPORT ALL MOCK DATA
  // ===================================================================
  
