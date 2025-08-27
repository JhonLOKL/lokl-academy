"use client";

import React, { useState } from "react";
import Image from "next/image";
import { H2, H3, Paragraph, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/design-system";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState("courses");

  const courses = [
    {
      title: "Inversiones Inmobiliarias para Principiantes",
      description: "Aprende los fundamentos para iniciar tu camino como inversor inmobiliario.",
      image: "/images/house-model.jpg",
      level: "Principiante",
      duration: "8 semanas"
    },
    {
      title: "Estrategias Avanzadas de Inversión",
      description: "Maximiza tus retornos con técnicas probadas por expertos del sector.",
      image: "/images/modern-building.jpg",
      level: "Avanzado",
      duration: "12 semanas"
    },
    {
      title: "Análisis de Mercados Inmobiliarios",
      description: "Aprende a identificar oportunidades y evaluar riesgos en cualquier mercado.",
      image: "/images/skyscraper-bw.jpg",
      level: "Intermedio",
      duration: "6 semanas"
    }
  ];

  const blogs = [
    {
      title: "5 Estrategias para Invertir en Bienes Raíces en 2025",
      description: "Descubre las tendencias que definirán el mercado inmobiliario este año.",
      category: "Inversiones",
      date: "15 Ago 2025"
    },
    {
      title: "Cómo la IA está Transformando el Sector Inmobiliario",
      description: "Aplicaciones prácticas de la inteligencia artificial en bienes raíces.",
      category: "Tecnología",
      date: "10 Ago 2025"
    },
    {
      title: "Guía Fiscal para Inversores Inmobiliarios",
      description: "Todo lo que necesitas saber sobre impuestos y deducciones en tus inversiones.",
      category: "Finanzas",
      date: "5 Ago 2025"
    }
  ];

  const podcasts = [
    {
      title: "El Futuro de las Inversiones Inmobiliarias",
      description: "Entrevista con María Rodríguez, CEO de InverBienes.",
      duration: "45 min",
      date: "12 Ago 2025"
    },
    {
      title: "Cómo Construir un Portafolio Inmobiliario Diversificado",
      description: "Consejos de Carlos Méndez, inversor con más de 20 años de experiencia.",
      duration: "38 min",
      date: "8 Ago 2025"
    },
    {
      title: "Financiamiento Creativo para Proyectos Inmobiliarios",
      description: "Alternativas a los préstamos tradicionales con Ana López, experta financiera.",
      duration: "52 min",
      date: "1 Ago 2025"
    }
  ];

  const news = [
    {
      title: "Nueva Legislación Afectará a Inversores Inmobiliarios",
      description: "Cambios importantes en la regulación del sector que debes conocer.",
      source: "Real Estate Today",
      date: "Hoy"
    },
    {
      title: "El Mercado Inmobiliario Muestra Signos de Recuperación",
      description: "Análisis de los indicadores económicos más recientes.",
      source: "Economía Diaria",
      date: "Ayer"
    },
    {
      title: "Tendencias Emergentes en Propiedades Comerciales",
      description: "Nuevas oportunidades en el sector de oficinas y locales comerciales.",
      source: "Business Property",
      date: "3 días"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <H2 variant="section" className="mb-4">
          Contenido <span className="text-[#5352F6]">premium</span> para inversores
        </H2>
        <Paragraph variant="lead" color="muted" className="mx-auto max-w-2xl">
          Explora nuestra biblioteca de recursos diseñados para ayudarte a tomar mejores decisiones de inversión.
        </Paragraph>
      </div>

      <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-8 flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="news">Noticias</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses">
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {courses.map((course, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full overflow-hidden transition-transform hover:translate-y-[-4px]">
                  <div className="relative h-48 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded bg-[#F5F5F5] px-2 py-1 text-xs font-medium">
                        {course.level}
                      </span>
                      <span className="text-xs text-[#6D6C6C]">
                        {course.duration}
                      </span>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="primary" className="w-full">Ver curso</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="blogs">
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {blogs.map((blog, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full transition-transform hover:translate-y-[-4px]">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#5352F6]">
                        {blog.category}
                      </span>
                      <span className="text-xs text-[#6D6C6C]">
                        {blog.date}
                      </span>
                    </div>
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="link" className="p-0">Leer más</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="podcasts">
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {podcasts.map((podcast, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full transition-transform hover:translate-y-[-4px]">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center text-xs font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-[#5352F6]">
                          <path d="M12 6v6l4 2M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {podcast.duration}
                      </span>
                      <span className="text-xs text-[#6D6C6C]">
                        {podcast.date}
                      </span>
                    </div>
                    <CardTitle>{podcast.title}</CardTitle>
                    <CardDescription>{podcast.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" className="w-full">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
                      </svg>
                      Escuchar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="news">
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {news.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full transition-transform hover:translate-y-[-4px]">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium">
                        {item.source}
                      </span>
                      <span className="rounded bg-[#5352F6] px-2 py-1 text-xs font-medium text-white">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="link" className="p-0">Ver noticia completa</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Button size="lg">Ver todo el contenido</Button>
      </div>
    </div>
  );
};

export default ContentSection;
