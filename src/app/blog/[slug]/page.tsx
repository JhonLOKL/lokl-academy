import React from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/design-system";
import mockBlogPosts from "@/lib/blog/mock-data";
import { 
  BlogHeader, 
  BlogCover, 
  AuthorProfile, 
  RelatedPosts,
  BlogContentClient
} from "@/components/lokl-academy/components";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = mockBlogPosts.find(post => post.slug === slug);
  
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
          {blog.relatedPosts && blog.relatedPosts.length > 0 && (
            <section className="bg-gradient-to-b from-white to-[#F7F7FB] py-16">
              <div className="container mx-auto px-4">
                {blog.relatedPosts.map(relatedPost => {
                  const fullPost = mockBlogPosts.find(p => p.id === relatedPost.id);
                  return fullPost;
                }).filter(Boolean).length > 0 && (
                  <RelatedPosts 
                    posts={blog.relatedPosts
                      .map(relatedPost => mockBlogPosts.find(p => p.id === relatedPost.id))
                      .filter(Boolean) as typeof mockBlogPosts}
                  />
                )}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer variant="default" />
    </>
  );
}