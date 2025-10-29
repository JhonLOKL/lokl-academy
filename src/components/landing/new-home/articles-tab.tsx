"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from './image-with-fallback';
import { Clock, ChevronRight, Loader2 } from 'lucide-react';
import { getBlogsLiteAction } from '@/actions/blog-action';
import type { BlogPost } from '@/lib/blog/schema';
import Link from 'next/link';

export default function ArticulosTab() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const result = await getBlogsLiteAction({ 
          limit: 4, 
          status: 'published',
          sortBy: 'createdAt',
          sortOrder: 'DESC'
        });
        setBlogs(result.blogs || []);
        setError(null);
      } catch (err) {
        console.error('Error loading blogs:', err);
        setError('Error al cargar los artículos');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadBlogs();
  }, []);

  const getBadgeVariant = (index: number, featured: boolean) => {
    if (featured) return 'bg-[#5352F6] text-primary-foreground';
    if (index === 0) return 'bg-green-500 text-white';
    if (index === 1) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getBadgeText = (index: number, featured: boolean) => {
    if (featured) return 'Destacado';
    if (index === 0) return 'Nuevo';
    if (index === 1) return 'Tendencia';
    return 'Reciente';
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando artículos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-muted-foreground">No hay artículos disponibles en este momento.</p>
      </div>
    );
  }
  return (
    <div className="animate-fade-in space-y-8">
      {/* Grid de artículos 2x2 */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog, index) => (
          <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer p-0">
            <div className="relative h-56 overflow-hidden">
              <ImageWithFallback
                src={blog.coverImage?.src || '/images/blog/placeholder.jpg'}
                alt={blog.coverImage?.alt || blog.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className={`absolute top-3 left-3 ${getBadgeVariant(index, blog.featured || false)}`}>
                {getBadgeText(index, blog.featured || false)}
              </Badge>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(blog.publishedAt).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {blog.estimatedReadTime || 5} min
                </span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-[#5352F6] transition-colors">
                {blog.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {blog.excerpt || blog.subtitle || 'Descubre más sobre este tema en nuestro artículo completo.'}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={blog.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author?.name || 'Author'}`} />
                  <AvatarFallback>
                    {blog.author?.name ? blog.author.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {blog.author?.name || 'Autor'}
                  </p>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <Button size="sm" variant="ghost" className="text-[#5352F6]">
                    Leer
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog">
          <Button variant="outline" className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5">
            Ver todos los artículos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
