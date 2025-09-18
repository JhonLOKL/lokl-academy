import React from "react";
import { Metadata } from "next";
import { Footer } from "@/components/design-system";
import { 
  HeroSection,
  BenefitsSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  BlogSection,
  FeaturedCoursesSection,
} from "@/components/lokl-academy/sections";
import { CourseListSchema, WebsiteSchema, OrganizationSchema } from "@/components/lokl-academy/components";
import { getBlogsLiteAction } from "@/actions/blog-action";
import { getAllCoursesAction } from "@/actions/course-action";

// Metadatos para SEO
export const metadata: Metadata = {
  title: "LOKL Academy - Aprende sobre inversiones inmobiliarias y crowdfunding",
  description: "Plataforma educativa para inversores inmobiliarios con cursos, blogs, podcasts y recursos para maximizar tus inversiones en bienes raíces.",
  keywords: ["inversiones inmobiliarias", "crowdfunding inmobiliario", "bienes raíces", "educación financiera", "LOKL Academy"],
  alternates: {
    canonical: "https://academy.lokl.life",
  },
  authors: [{ name: "LOKL Academy" }],
  openGraph: {
    title: "LOKL Academy - Educación para inversores inmobiliarios",
    description: "Aprende sobre inversiones inmobiliarias, crowdfunding y finanzas con expertos del sector. Cursos y recursos gratuitos y premium.",
    url: "https://academy.lokl.life",
    siteName: "LOKL Academy",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LOKL Academy - Educación para inversores inmobiliarios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKL Academy - Educación para inversores inmobiliarios",
    description: "Aprende sobre inversiones inmobiliarias, crowdfunding y finanzas con expertos del sector.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LandingPage() {
  // Cargar blogs desde la API
  const blogsResp = await getBlogsLiteAction({ page: 1, limit: 4, status: "published", sortBy: "createdAt", sortOrder: "DESC" });
  const blogs = blogsResp?.blogs || [];

  // Cargar cursos desde la API
  const coursesResp = await getAllCoursesAction();
  const allCourses = coursesResp.success ? coursesResp.data || [] : [];
  
  // Filtrar cursos destacados (máximo 6)
  const featuredCourses = allCourses
    .filter(course => course.featured)
    .slice(0, 6);

  // Obtener un curso destacado para la sección de newsletter
  const newsletterCourse = featuredCourses.length > 0 ? featuredCourses[0] : undefined;

  return (
    <>
      {/* Esquemas estructurados para SEO */}
      <WebsiteSchema />
      <OrganizationSchema 
        socialLinks={[
          "https://www.facebook.com/lokllife",
          "https://www.instagram.com/lokl.life/",
          "https://www.linkedin.com/company/lokl-life/"
        ]}
      />
      {featuredCourses.length > 0 && (
        <CourseListSchema courses={featuredCourses} />
      )}
      
      <main>
        {/* Hero Section */}
        <section id="hero" className="min-h-screen w-full">
          <HeroSection />
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-16 bg-[#F7F7FB]">
          <BenefitsSection />
        </section>

        {/* Featured Courses Section */}
        <section id="featured-courses" className="w-full py-16">
          <FeaturedCoursesSection 
            courses={featuredCourses}
            title="Aprende con nuestros cursos destacados"
            description="Domina el mundo de las inversiones inmobiliarias con contenido educativo diseñado por expertos del sector"
          />
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="w-full py-16 bg-[#F7F7FB]">
          <BlogSection blogs={blogs} />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16">
          <TestimonialsSection />
        </section>  
  
        {/* FAQ Section */}
        <article id="faq" className="w-full py-16 bg-[#F7F7FB]">
          <FaqSection />
        </article>

        {/* CTA Section */}
        <article id="cta" className="w-full py-16 bg-[#5352F6]">
          <CtaSection />
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}