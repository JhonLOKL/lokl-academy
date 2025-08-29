import { NextResponse } from 'next/server';
import mockBlogPosts from '@/lib/blog/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Parámetros de filtrado
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
  
  // Filtrar blogs según los parámetros
  let filteredBlogs = [...mockBlogPosts];
  
  if (category) {
    filteredBlogs = filteredBlogs.filter(blog => {
      if (typeof blog.category === 'string') {
        return blog.category === category;
      }
      return blog.categoryFull?.slug === category;
    });
  }
  
  if (tag) {
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.tags.some(blogTag => blogTag.slug === tag)
    );
  }
  
  if (featured === 'true') {
    filteredBlogs = filteredBlogs.filter(blog => blog.featured === true);
  }
  
  // Ordenar por fecha de publicación (más reciente primero)
  filteredBlogs.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  // Limitar resultados si se especifica
  if (limit && limit > 0) {
    filteredBlogs = filteredBlogs.slice(0, limit);
  }
  
  return NextResponse.json({ blogs: filteredBlogs });
}

// Para obtener un blog específico por slug
export async function POST(request: Request) {
  const body = await request.json();
  const { slug } = body;
  
  if (!slug) {
    return NextResponse.json(
      { error: 'Se requiere un slug para obtener el blog' },
      { status: 400 }
    );
  }
  
  const blog = mockBlogPosts.find(post => post.slug === slug);
  
  if (!blog) {
    return NextResponse.json(
      { error: 'Blog no encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ blog });
}
