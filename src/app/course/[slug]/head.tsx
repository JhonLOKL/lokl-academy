import { getCourseBySlugAction } from "@/actions/course-action";

export default async function Head({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await getCourseBySlugAction(String(slug));

  if (!res.success || !res.data || !res.data.course) {
    return (
      <>
        <title>Curso | LOKL Academy</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const course = res.data.course;
  const seo = course.seo;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? 'https://academy.lokl.life' : 'http://localhost:3000');
  const url = `${siteUrl}/course/${course.slug}`;

  // BreadcrumbList JSON-LD
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Cursos",
        item: `${siteUrl}/course`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: course.title,
        item: url
      }
    ]
  };

  // Course JSON-LD básico
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "LOKL Academy",
      sameAs: siteUrl
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.content?.difficulty,
      startDate: course.publishedAt,
      endDate: course.updatedAt
    }
  };

  return (
    <>
      <title>{seo?.title || course.title}</title>
      {seo?.description && <meta name="description" content={seo.description} />}
      {seo?.keywords?.length ? (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={seo?.canonicalUrl || url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo?.title || course.title} />
      {seo?.description && <meta property="og:description" content={seo.description} />}
      <meta property="og:url" content={url} />
      {seo?.ogImage?.url && (
        <meta property="og:image" content={seo.ogImage.url} />
      )}
      {seo?.ogImage?.alt && (
        <meta property="og:image:alt" content={seo.ogImage.alt} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo?.twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={seo?.title || course.title} />
      {seo?.description && <meta name="twitter:description" content={seo.description} />}
      {seo?.ogImage?.url && <meta name="twitter:image" content={seo.ogImage.url} />}

      {/* Robots */}
      {seo?.robots && (
        <meta
          name="robots"
          content={`${seo.robots.index === false ? "noindex" : "index"}, ${seo.robots.follow === false ? "nofollow" : "follow"}`}
        />
      )}

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
    </>
  );
}


