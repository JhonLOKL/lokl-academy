import React from "react";
import { Course } from "@/lib/course/schema";

interface CourseListSchemaProps {
  courses: Course[];
  organizationName?: string;
  organizationLogo?: string;
  organizationUrl?: string;
}

export const CourseListSchema: React.FC<CourseListSchemaProps> = ({
  courses,
  organizationName = "LOKL",
  organizationLogo = "https://lokl.life/images/lokl-logo.png",
  organizationUrl = "https://lokl.life",
}) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  const courseSchemas = courses.map(course => ({
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": organizationName,
      "sameAs": organizationUrl,
      "logo": {
        "@type": "ImageObject",
        "url": organizationLogo
      }
    },
    "courseCode": course.id,
    "educationalCredentialAwarded": course.certificate?.available ? "Certificado de LOKL" : null,
    "timeRequired": `PT${Math.floor(course.content.totalDuration / 60)}H${course.content.totalDuration % 60}M`,
    "image": course.thumbnail.url,
    "url": `${organizationUrl}/course/${course.slug}`,
    "inLanguage": course.seo.language || "es",
    "audience": {
      "@type": "Audience",
      "audienceType": course.content.targetAudience?.join(", ") || "Inversionistas inmobiliarios"
    },
    "teaches": course.content.skillsYouWillLearn?.join(", ") || course.content.learningObjectives?.join(", "),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": `PT${Math.floor(course.content.totalDuration / 60)}H per week`,
      "instructor": {
        "@type": "Person",
        "name": course.instructor.name,
        "description": course.instructor.bio,
        "image": course.instructor.avatar
      }
    }
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `${organizationUrl}/course/${course.slug}`,
        "name": course.title,
        "url": `${organizationUrl}/course/${course.slug}`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      {courseSchemas.map((courseSchema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseSchema)
          }}
        />
      ))}
    </>
  );
};

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  logoUrl?: string;
}

export const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({
  name = "LOKL",
  url = "https://lokl.life",
  description = "Invierte en bienes raíces con propósito. Crowdfunding inmobiliario accesible en proyectos hoteleros y sostenibles desde $1.3M mensuales. Construye patrimonio con impacto real.",
  logoUrl = "https://lokl.life/images/lokl-logo.png"
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "description": description,
    "inLanguage": "es-CO",
    "publisher": {
      "@type": "Organization",
      "name": name,
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl,
        "width": 250,
        "height": 60
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export const OrganizationSchema: React.FC<{
  name?: string;
  url?: string;
  logoUrl?: string;
  socialLinks?: string[];
  description?: string;
}> = ({
  name = "LOKL",
  url = "https://lokl.life",
  logoUrl = "https://lokl.life/images/lokl-logo.png",
  socialLinks = [
    "https://www.instagram.com/lokl.life/",
    "https://www.linkedin.com/company/lokl-life/",
    "https://www.facebook.com/lokl.life/"
  ],
  description = "Plataforma de crowdfunding inmobiliario que democratiza el acceso a inversiones en bienes raíces. Proyectos hoteleros sostenibles con impacto social y rentabilidad real."
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "alternateName": "LOKL Life",
    "url": url,
    "description": description,
    "logo": {
      "@type": "ImageObject",
      "url": logoUrl,
      "width": 250,
      "height": 60
    },
    "image": logoUrl,
    "sameAs": socialLinks,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Atención al Cliente",
      "areaServed": "CO",
      "availableLanguage": ["Spanish"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export const BreadcrumbSchema: React.FC<{
  items: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export const SEOMetadata: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};
