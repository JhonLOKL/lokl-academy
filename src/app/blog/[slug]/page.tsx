import React from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/design-system";
import { getBlogBySlugAction, getRelatedBlogsAction } from "@/actions/blog-action";
import { 
  BlogHeader, 
  BlogCover, 
  AuthorProfile, 
  RelatedPosts,
  BlogContentClient
} from "@/components/lokl-academy/components";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resp = await getBlogBySlugAction(slug);
  const blog = resp?.blog;
  
  if (!blog) {
    notFound();
  }
  
  // Formatear la fecha de publicación
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  return (
    <>
      <main>
        <article>
          {/* Hero section */}
          <section className="bg-gradient-to-b from-[#F7F7FB] to-white py-16">
            <div className="container mx-auto px-4">
              <BlogHeader
                title={blog.title}
                subtitle={blog.subtitle}
                category={blog.category}
                publishDate={formatDate(blog.publishedAt)}
                readTime={blog.estimatedReadTime}
              />
              
              <div className="mt-8 flex items-center justify-center">
                <AuthorProfile author={blog.author} variant="compact" />
              </div>
            </div>
          </section>
          
          {/* Cover image */}
          <div className="container mx-auto -mt-8 px-4">
            <BlogCover
              src={blog.coverImage.src}
              alt={blog.coverImage.alt}
              caption={blog.coverImage.caption}
              credit={blog.coverImage.credit}
            />
          </div>
          
          {/* Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <BlogContentClient 
                content={blog.content}
                tags={blog.tags}
                author={blog.author}
              />
            </div>
          </section>
          
          {/* Related posts */}
          {blog.id && (
            <section className="bg-gradient-to-b from-white to-[#F7F7FB] py-16">
              <div className="container mx-auto px-4">
                {await (async () => {
                  const { blogs: related } = await getRelatedBlogsAction(blog.id, 3);
                  return related && related.length > 0 ? (
                    <RelatedPosts posts={related} />
                  ) : null;
                })()}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}