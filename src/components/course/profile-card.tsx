"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/design-system";
import { Clock, ChevronDown, ChevronUp, BookOpen, Award, Users, X } from "lucide-react";
import { LearningProfile } from "@/lib/course/schema";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileCardProps {
  profile: LearningProfile;
  userProgress?: {
    completedCourses: number;
    totalCourses: number;
    overallProgress: number;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  userProgress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calcular el progreso
  const progressPercentage = userProgress?.overallProgress || 0;
  const completedCourses = userProgress?.completedCourses || 0;
  const totalCourses = profile.aggregatedStats.totalCourses;
  
  // Obtener el nivel en español
  const getLevelInSpanish = (level: string): string => {
    switch (level) {
      case "explorer": return "Explorador";
      case "adventurer": return "Aventurero";
      case "hero": return "Héroe";
      default: return level;
    }
  };
  
  // Formatear la duración (función disponible para uso futuro)
  // const formatDuration = (hours: number): string => {
  //   if (hours < 1) return "Menos de 1 hora";
  //   return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  // };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#5352F6]/30 min-h-[650px] w-full">
      {/* Imagen grande como fondo que ocupa toda la tarjeta */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={
            profile.level === 'explorer' 
              ? 'https://media.istockphoto.com/id/2194197289/photo/portrait-of-a-mid-adult-male-hiker.jpg?s=1024x1024&w=is&k=20&c=NmWmyTEFvdk4wfbZ42-tZ-CT3eJvqsdNmkRnRYhLnOc=' 
              : profile.level === 'adventurer' 
              ? 'https://media.istockphoto.com/id/2164477556/photo/low-angle-view-of-woman-climbing-on-cliff.jpg?s=2048x2048&w=is&k=20&c=IN1bZyeoGxyJLtDDBwIF-wdW8u-uxRhXjNLQF3GAzU4=' 
              : 'https://media.istockphoto.com/id/2148292077/photo/woman-exploring-ice-cave.jpg?s=2048x2048&w=is&k=20&c=_3xQGeaw2QVJ-nV_XTReVdPZMz5cnuKrdxjIIiAMAy0='
          }
          alt={profile.title}
          fill
          priority
          className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-10"></div>
      </div>

      <div className="relative flex h-full flex-col md:flex-row">
        {/* Columna izquierda con información principal (transparente sobre la imagen) */}
        <div className="w-full md:w-3/5 p-8 text-white flex flex-col justify-between z-10">
          {/* Badge de nivel */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-1.5">
              <Award className={cn(
                "h-6 w-6",
                profile.level === "explorer" ? "text-blue-500" : 
                profile.level === "adventurer" ? "text-orange-500" : 
                "text-[#5352F6]"
              )} />
            </div>
            <Badge className="bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F]">
              {getLevelInSpanish(profile.level)}
            </Badge>
          </div>
          
          {/* Título del perfil */}
          <div>
            <Link href={`/learning-profile/${profile.slug}`}>
              <h3 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#5352F6]/90">
                {profile.title}
              </h3>
            </Link>

            <p className="mb-6 text-white/80 text-sm md:text-base">
              {profile.description}
            </p>
            
            {/* Estadísticas simplificadas */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-white/90" />
                <div>
                  <p className="text-lg font-bold text-white">{totalCourses}</p>
                  <p className="text-xs text-white/70">Cursos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-white/90" />
                <div>
                  <p className="text-lg font-bold text-white">{profile.paths.length}</p>
                  <p className="text-xs text-white/70">Rutas</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barra de progreso si existe */}
          {userProgress && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{progressPercentage}% completado</span>
                <span>{completedCourses}/{totalCourses} cursos</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20" />
            </div>
          )}
          
          {/* Badge con imagen si existe */}
          {profile.badge && (
            <div className="absolute top-8 right-8 h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
              <Image
                src={profile.badge.url}
                alt={profile.badge.alt}
                fill
                className="object-contain"
              />
            </div>
          )}
          
          {/* Botones para móvil */}
          <div className="mt-6 md:hidden">
            <Link href={`/learning-profile/${profile.slug}`}>
              <Button className="w-full py-2.5">
                Explorar perfil completo
              </Button>
            </Link>
          </div>
        </div>

        {/* Columna derecha con contenido blanco */}
        <div className="hidden md:flex md:w-2/5 bg-white p-6 flex-col z-10 ml-auto rounded-l-3xl shadow-[-10px_0px_15px_rgba(0,0,0,0.1)]">
          {/* Duración estimada */}
          <div className="mb-6 flex items-center gap-2 rounded-md border border-dashed border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2">
            <Clock className="h-4 w-4 text-[#5352F6]" />
            <span className="text-sm">
              Duración estimada: <span className="font-medium">{profile.aggregatedStats.estimatedCompletionTime}</span>
            </span>
          </div>

          {/* Estadística adicional */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEEFE]">
              <Users className="h-4 w-4 text-[#5352F6]" />
            </div>
            <div>
              <p className="text-sm font-medium">{profile.aggregatedStats.totalEnrolled || 0} alumnos inscritos</p>
              <p className="text-xs text-[#6D6C6C]">Se han unido a este perfil</p>
            </div>
          </div>

          {/* Beneficios */}
          <div className="mb-6 flex-grow">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <div className="h-1 w-5 rounded-full bg-[#5352F6]"></div>
              Lo que aprenderás
            </h4>
            <ul className="space-y-2 text-sm text-[#6D6C6C]">
              {profile.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start rounded-md bg-[#F9F9F9] p-2 transition-all hover:bg-[#EEEEFE]">
                  <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5352F6]/10 text-xs font-medium text-[#5352F6]">
                    {index + 1}
                  </div>
                  <span className="text-[#444444]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contenedor de botones en la parte inferior */}
          <div className="mt-auto space-y-4">
            {/* Botón para abrir el modal de rutas */}
            {profile.paths.length > 0 && (
              <button 
                onClick={() => setIsExpanded(true)}
                className="flex w-full items-center justify-center rounded-md border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2.5 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#EEEEFE] hover:text-[#5352F6] hover:border-[#5352F6]/30"
              >
                <ChevronDown size={16} className="mr-2" />
                Ver rutas de aprendizaje ({profile.paths.length})
              </button>
            )}
            
            {/* Modal de rutas de aprendizaje con AnimatePresence para animaciones suaves */}
            <AnimatePresence>
              {isExpanded && (
                <>
                  {/* Overlay con efecto de desvanecimiento */}
                  <motion.div 
                    className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsExpanded(false)}
                  />
                  
                  {/* Modal con efecto de deslizamiento */}
                  <motion.div 
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl shadow-lg max-h-[80vh] overflow-hidden"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="text-lg font-semibold">Rutas de aprendizaje</h3>
                      <button 
                        onClick={() => setIsExpanded(false)}
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)] custom-scrollbar">
                      <div className="space-y-4">
                        {profile.paths.map((pathItem, index) => (
                          <div 
                            key={pathItem.pathId} 
                            className="group/path flex items-start overflow-hidden rounded-md border border-[#E5E5E5] bg-white p-4 transition-all hover:border-[#5352F6]/30 hover:shadow-md"
                          >
                            <div className={`mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                              pathItem.isCore 
                                ? "bg-[#EEEEFE] text-[#5352F6]" 
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center flex-wrap gap-2 mb-1">
                                <p className="text-base font-medium group-hover/path:text-[#5352F6]">
                                  {pathItem.path?.title || `Ruta ${index + 1}`}
                                </p>
                                {pathItem.isCore && (
                                  <Badge variant="outline" className="border-[#5352F6] text-xs text-[#5352F6]">
                                    Esencial
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-[#6D6C6C]">{pathItem.description}</p>
                              <div className="mt-3 flex justify-end">
                                <Link 
                                  href={`/learning-path/${pathItem.path?.slug || '#'}`}
                                  className="text-sm text-[#5352F6] hover:underline flex items-center"
                                >
                                  Ver ruta
                                  <ChevronDown size={16} className="ml-1 rotate-[-90deg]" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #c5c5c5;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #5352F6;
              }
              body:has(.fixed) {
                overflow: hidden;
              }
            `}</style>

            {/* Botón de acción */}
            <Link href={`/learning-profile/${profile.slug}`}>
              <Button className="w-full py-2.5">
                Explorar perfil completo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
