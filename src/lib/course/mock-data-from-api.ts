import { CoursesCardsResponse } from "./schema";

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
