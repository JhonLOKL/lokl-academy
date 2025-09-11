import { CourseBySlugResponse, CoursesCardsResponse } from "./schema";

export const getCoursesCards: CoursesCardsResponse = {
  success: true,
  message: 'Cursos encontrados',
  data: {
    courses: [
      {
        id: 'course-1',
        slug: 'curso-1',
        title: 'Curso 1',
        subtitle: 'Subtítulo del curso 1',
        description: 'Descripción del curso 1',
        excerpt: 'Excerpt del curso 1 hola como estas me gustasn los animlaes esta es una descripcion del curso 1, bueno un resumen',
        seo: {
          title: 'Curso 1',
          description: 'Descripción del curso 1',
          canonicalUrl: 'https://academy.lokl.life/cursos/curso-1',
          author: 'LOKL Academy',
          language: 'es',
          ogImage: {
            url: 'https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/IMAGE1757455046.webp',
            alt: 'Curso 1',
            width: 1200,
            height: 630,
          },
          ogType: 'course',
          ogLocale: 'es',
          twitterCard: 'summary_large_image',
          twitterSite: 'https://academy.lokl.life',
          twitterCreator: 'LOKL Academy',
          keywords: ['curso 1', 'curso 1', 'curso 1'],
          robots: {
            index: true,
            follow: true,
            maxSnippet: 100,
            maxImagePreview: 'standard',
            maxVideoPreview: 100,
          },
          structuredData: {
            name: 'Curso 1',
            description: 'Descripción del curso 1',
            image: 'https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/IMAGE1757455046.webp',
          },
          breadcrumbs: [{ name: 'Curso 1', url: 'https://academy.lokl.life/cursos/curso-1', position: 1 }],
        },
        instructor: {
          id: 'instructor-1',
          name: 'Instructor 1',
          slug: 'instructor-1',
          bio: 'Bio del instructor 1',
          avatar: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/maria-jose.png',
        },
        category: {
          id: 'category-1',
          name: 'Categoría 1',
          slug: 'categoria-1',
          description: 'Descripción de la categoría 1',
        },
        // Métricas resumidas
        /*  rating: 5, */
        /* studentsCount: 1247, */
        durationMinutes: 480,
        tags: [
          {
            id: 'tag-1',
            name: 'Tag 1',
            slug: 'tag-1'
          },
          {
            id: 'tag-2',
            name: 'Tag 2',
            slug: 'tag-2'
          }
        ],
        pricing: {
          type: 'free',
          price: 0,
          originalPrice: 0,
          currency: 'COP',
        },
        accessRequirements: {
          plan: 'any',
        },
        thumbnail: {
          url: 'https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/IMAGE1757455046.webp',
          alt: 'Curso 1',
        },
        progress: {
          overallProgress: 0,
          completedLessons: 0,
          totalLessons: 8
        }
      }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 1,
      itemsPerPage: 10,
      hasNext: false,
      hasPrev: false,
    }
  }
}

export const courseBySlugMock: CourseBySlugResponse = {
  success: true,
  message: 'Curso encontrado',
  course: {
      id: 'course-1',
    slug: 'fundamentos-inversion-inmobiliaria-2026',
    title: 'Fundamentos de Inversión Inmobiliaria 2026',
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
              videoUrl: 'https://www.youtube.com/embed/_fX2uSTd39E',
                thumbnail: {
                url: 'https://i.ytimg.com/vi/-RP8UDyx7dM/maxresdefault.jpg',
                  alt: 'Introducción a la inversión inmobiliaria'
                },
              /* isPreview: true, */
       /*        isCompleted: true,
              completedAt: '2024-03-15T10:00:00Z' */
              },
              {
                id: 'lesson-1-2',
                title: 'Tipos de inversión inmobiliaria',
                description: 'REITs, propiedades directas, crowdfunding y más',
                order: 2,
                duration: 30,
                type: 'video',
              videoUrl: 'https://www.youtube.com/embed/_d8QP0xZ0gA',
                thumbnail: {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjlavWkAwV1nvt9g7xbGtw1r6uobXrBcJTfA&s',
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
                points: 35
              },
              {
                id: 'q2',
                question: '¿Cuál es la principal ventaja de los REITs sobre la inversión directa? 2',
                type: 'multiple-choice',
                options: ['Mayor control', 'Mayor liquidez', 'Menores impuestos', 'Mayor rentabilidad'],
                correctAnswer: 'Mayor liquidez',
                explanation: 'Los REITs se pueden comprar y vender fácilmente en el mercado, ofreciendo mayor liquidez que las propiedades físicas.',
                points: 35
                }
              ],
              passingScore: 70,
            // maxAttempts: 3
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
              videoUrl: 'https://www.youtube.com/embed/UtqsgiBtZSM'
              },
              {
                id: 'lesson-2-2',
                title: 'Análisis de mercado local',
                order: 2,
                duration: 40,
                type: 'video',
              videoUrl: 'www.youtube.com/embed/PrJjr8sEtdM'
              }
            ]
          }
        ],
      totalLessons: 4,
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
  
    category: {
      id: 'category-1',
      name: 'Categoría 1',
      slug: 'categoria-1',
      description: 'Descripción de la categoría 1',
    },
    tags: [
      {
        id: 'tag-1',
        name: 'Tag 1',
        slug: 'tag-1'
      },
      {
        id: 'tag-2',
        name: 'Tag 2',
        slug: 'tag-2'
      }
    ],
    instructor: {
      id: 'instructor-1',
      name: 'Camilo Olarte',
      slug: 'camilo-olarte',
      bio: 'I am a creative leader with a great passion for new challenges. I firmly believe in developing products, services, and experiences from a true sense of being. I achieve my goals through creativity, structure, and teamwork.',
      avatar: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/olarte.jpg',
      expertise: ['LOKL CEO', 'Experto en inversión inmobiliaria', 'Experto en finanzas', 'Experto en mercado inmobiliario'],
      socialLinks: {
        linkedin: 'https://www.instagram.com/camilostartup',
        instagram: 'https://instagram.com/instructor1'
      }
    },
  
      pricing: {
        type: 'free'
      },
  
      accessRequirements: {
      plan: 'any'
      },
  
      thumbnail: {
      url: 'https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/IMAGE1757455046.webp',
      alt: 'Fundamentos de Inversión Inmobiliaria'
    },

    coverImage: {
      url: 'https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/IMAGE1757544727.webp',
      alt: 'Fundamentos de Inversión Inmobiliaria'
    },

    previewVideo: {
      url: 'https://www.youtube.com/embed/videoseries?list=PLz_AB_95JQszvk_NDaai9T7_NQoNf3LS8',
      duration: 180,
      alt: 'Vista previa del curso'
    },

    publishedAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-11-20T15:30:00Z',
      status: 'published',
      featured: true,
    isNew: true,
  
      settings: {
        allowDownloads: true,
        allowDiscussions: true,
        showProgress: true,
        enforceOrder: true
      }
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseBySlugResponse> {
  await new Promise((r) => setTimeout(r, 600));
  const base = courseBySlugMock.course;
  const course = {
    ...base,
    slug,
    /* stats: base.stats || {
      enrolledCount: 342,
      completedCount: 120,
      completionRate: 35.1,
        averageRating: 4.8,
      reviewsCount: 56,
      totalViews: 1450,
      averageTimeToComplete: 10,
    }, */
  };
  return { success: true, message: 'Curso encontrado', course };
}