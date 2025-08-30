"use client";

import React from "react";
import { Footer, H1, Paragraph } from "@/components/design-system";
import { BlogCard, LoklCTABanner } from "@/components/lokl-academy/components";
import mockBlogPosts from "@/lib/blog/mock-data";

export default function BlogPage() {
  const [filter, setFilter] = React.useState<string>("all");
  const categories = [
    { id: "all", name: "Todos" },
    { id: "inversion-inmobiliaria", name: "Inversión Inmobiliaria" },
    { id: "finanzas-personales", name: "Finanzas Personales" },
    { id: "mercado-inmobiliario", name: "Mercado Inmobiliario" }
  ];

  const filteredBlogs = filter === "all" 
    ? mockBlogPosts 
    : mockBlogPosts.filter(blog => blog.categoryFull?.slug === filter);

  return (
    <>
      <main>
        <section className="bg-[#F7F7FB] py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <H1 className="mb-4">Blog LOKL Academy</H1>
              <Paragraph variant="lead" className="mx-auto max-w-2xl">
                Artículos, guías y recursos sobre inversión inmobiliaria, finanzas personales y desarrollo profesional.
              </Paragraph>
            </div>
            
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    filter === category.id
                      ? "bg-[#5352F6] text-white"
                      : "bg-white text-[#0F0F0F] hover:bg-[#EAEAFC] hover:text-[#5352F6]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, index) => (
                index === 0 && filter === "all" ? (
                  <div key={blog.id} className="col-span-1 md:col-span-2 lg:col-span-3">
                    <BlogCard
                      blog={blog}
                      variant="featured"
                    />
                  </div>
                ) : (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    variant="default"
                  />
                )
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="my-16 text-center">
                <Paragraph variant="lead">
                  No se encontraron artículos en esta categoría.
                </Paragraph>
              </div>
            )}
            
            {/* Banner CTA de LOKL */}
            <div className="mt-16">
              <LoklCTABanner />
            </div>
          </div>
        </section>
      </main>

      <Footer variant="default" />
    </>
  );
}
