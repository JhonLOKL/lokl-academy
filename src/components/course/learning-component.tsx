"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/design-system";
import { Progress } from "@/components/ui/progress";
import QuizComponent from "@/components/course/quiz-component";
import { markLessonCompletedAction } from "@/actions/course-action";
import { ensureLoginOrRedirect } from "@/lib/auth-utils";
import { useRouter } from "next/navigation";
import type { Course, Module as CourseModule, Lesson, Quiz, QuizQuestion } from "@/lib/course/schema";
import { 
  Clock, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  Download,
  FileText,
  MessageCircle,
  CheckSquare
} from "lucide-react";

// Declarar tipos para la API de YouTube
type YTPlayer = {
  getDuration: () => number;
  getCurrentTime: () => number;
};

type YTPlayerCtor = new (
  elementId: string,
  opts: {
    videoId: string;
    events?: { onStateChange?: (event: { data: number }) => void };
  }
) => YTPlayer;

declare global {
  interface Window {
    YT: {
      Player: YTPlayerCtor;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface LearningComponentProps {
  course: Course;
  currentLesson?: Lesson | null;
  currentModule: CourseModule;
  userProgress?: Course["progress"];
  isQuizMode?: boolean;
}

interface LessonRef {
  lesson: Lesson;
  module: CourseModule;
}

export default function LearningComponent({
  course,
  currentLesson = null,
  currentModule,
  userProgress,
  isQuizMode = false
}: LearningComponentProps) {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(isQuizMode);
  const [showDebugInfo, setShowDebugInfo] = useState(true);
  const [videoDebugInfo, setVideoDebugInfo] = useState<{
    currentTime: number;
    duration: number;
    progress: number;
    remaining: number;
    target95Percent: number;
  } | null>(null);
  const [hasMarkedByVideo, setHasMarkedByVideo] = useState(false);
  const [, setRenderBump] = useState(0);
  const [autoplayCountdown, setAutoplayCountdown] = useState<number | null>(null);
  const [pauseAutoplay, setPauseAutoplay] = useState(false);
  const [showCourseCompleted, setShowCourseCompleted] = useState(false);
  
  // Calcular el progreso del curso
  // Usamos el progreso del usuario si existe, o el progreso centralizado del curso
  const progressPercentage = userProgress?.overallProgress || course?.progress?.overallProgress || 0;
  
  // Determinar lecciones previas y siguientes
  let previousLesson: LessonRef | null = null;
  let nextLesson: LessonRef | null = null;
  
  if (currentLesson) {
    const currentModuleIndex = course.content.modules.findIndex(m => m.id === currentModule.id);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentLessonIndex > 0) {
      // Hay una lección anterior en el mismo módulo
      previousLesson = {
        lesson: currentModule.lessons[currentLessonIndex - 1],
        module: currentModule
      };
    } else if (currentModuleIndex > 0) {
      // Hay que ir al módulo anterior
      const prevModule = course.content.modules[currentModuleIndex - 1];
      previousLesson = {
        lesson: prevModule.lessons[prevModule.lessons.length - 1],
        module: prevModule
      };
    }
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Hay una lección siguiente en el mismo módulo
      nextLesson = {
        lesson: currentModule.lessons[currentLessonIndex + 1],
        module: currentModule
      };
    } else if (currentModuleIndex < course.content.modules.length - 1) {
      // Hay que ir al siguiente módulo
      const nextModule = course.content.modules[currentModuleIndex + 1];
      nextLesson = {
        lesson: nextModule.lessons[0],
        module: nextModule
      };
    }
  }
  
  // Estado para controlar cuando el quiz ha sido completado
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  // Se mantienen por si se requiere feedback visual en el futuro
  const [, setQuizScore] = useState<number | null>(null);
  const [, setQuizPassed] = useState<boolean | null>(null);
  
  // Verificar si el curso está completado
  const isCourseCompleted = React.useMemo(() => {
    if (!course) return false;
    return course.content.modules.every(m => 
      m.lessons.every(l => l.isCompleted) && 
      (!m.quiz || m.quiz.isCompleted)
    );
  }, [course]);

  // Efecto para el contador de reproducción automática
  useEffect(() => {
    if (autoplayCountdown === null || pauseAutoplay || !nextLesson) return;
    
    if (autoplayCountdown <= 0) {
      // Navegar a la siguiente lección
      router.push(`/course/${course.slug}/${nextLesson.lesson.slug || nextLesson.lesson.id}`);
      setAutoplayCountdown(null);
      return;
    }
    
    const timer = setTimeout(() => {
      setAutoplayCountdown(prev => prev !== null ? prev - 1 : null);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [autoplayCountdown, pauseAutoplay, nextLesson, course, router]);

  // Función para marcar una lección como completada
  const markLessonCompleted = async () => {
    if (!currentLesson) return;
    
    // Requerir login, guardar intención
    const ok = ensureLoginOrRedirect(`/course/${course.slug}/${currentLesson.slug || currentLesson.id}`, router.push);
    if (!ok) return;

    try {
      const res = await markLessonCompletedAction({ courseId: course.id, lessonId: currentLesson.id });
      if (res.success) {
        // Actualizar estado local
        currentLesson.isCompleted = true;
        setRenderBump(v => v + 1);
        
        // Iniciar contador para siguiente lección si existe
        if (nextLesson) {
          setAutoplayCountdown(10); // 10 segundos
        } else if (isCourseCompleted) {
          setShowCourseCompleted(true);
        }
      } else {
        alert(res.error || "No se pudo marcar la clase como completada");
      }
    } catch (e) {
      console.error("Error al completar la clase", e);
      alert("Error al completar la clase");
    }
  };
  
  // Manejar la finalización del quiz
  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizScore(score);
    setQuizPassed(passed);
    setQuizCompleted(true);
    
    // Si el quiz no fue aprobado, no permitir avanzar al siguiente módulo
    if (!passed) {
      console.log("Quiz no aprobado. No se desbloqueará el siguiente módulo.");
    } else {
      console.log("Quiz aprobado. Se desbloqueará el siguiente módulo.");
    }
  };
  
  // Volver a la lección desde el quiz
  const handleQuizBack = () => {
    if (quizCompleted) {
      // Si ya completó el quiz, permitimos volver a la lección
      if (isQuizMode) {
        // Redirigir a la primera lección del módulo
        window.location.href = `/course/${slug}/${currentModule.lessons[0].slug || currentModule.lessons[0].id}`;
      } else {
        // Si estamos en modo normal, solo ocultamos el quiz
        setShowQuiz(false);
      }
    } else {
      // Si no ha completado el quiz, mostrar confirmación
      if (confirm("¿Seguro que deseas salir? Perderás tu progreso en el quiz.")) {
        if (isQuizMode) {
          window.location.href = `/course/${slug}/${currentModule.lessons[0].slug || currentModule.lessons[0].id}`;
        } else {
          setShowQuiz(false);
        }
      }
    }
  };
  
  // Simular quiz del módulo actual
  const currentQuiz: Quiz | null = currentModule.quiz ? ({
    ...currentModule.quiz,
    questions: currentModule.quiz.questions && currentModule.quiz.questions.length > 0 ? currentModule.quiz.questions : ([
      {
        id: "q1",
        question: "¿Cuál es el principal beneficio de invertir en bienes raíces?",
        type: "multiple-choice",
        options: [
          "Generación de ingresos pasivos",
          "Apreciación del valor",
          "Protección contra la inflación",
          "Todas las anteriores"
        ],
        correctAnswer: "Todas las anteriores",
        explanation: "Los bienes raíces ofrecen múltiples beneficios: ingresos pasivos a través de rentas, apreciación del valor a largo plazo y protección contra la inflación.",
        points: 10
      },
      {
        id: "q2",
        question: "¿Qué método de evaluación es más adecuado para propiedades de alquiler?",
        type: "multiple-choice",
        options: [
          "Método de comparación de mercado",
          "Método de flujo de caja descontado",
          "Método de capitalización de ingresos",
          "Método de costo de reposición"
        ],
        correctAnswer: "Método de capitalización de ingresos",
        explanation: "El método de capitalización de ingresos es ideal para evaluar propiedades de alquiler porque se basa en los ingresos que genera la propiedad.",
        points: 10
      },
      {
        id: "q3",
        question: "¿Cuál de las siguientes afirmaciones sobre el crowdfunding inmobiliario es correcta?",
        type: "true-false",
        options: ["Verdadero", "Falso"],
        correctAnswer: "Verdadero",
        explanation: "El crowdfunding inmobiliario permite a inversores pequeños participar en proyectos grandes que tradicionalmente requerían grandes capitales.",
        points: 5
      }
    ] as QuizQuestion[])
  }) : null;
  
  // Formatear la duración
  // Utilidad local (posible uso futuro)
  /* const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} h`;
    return `${hours} h ${mins} min`;
  }; */
  
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-[#E5E5E5] bg-white px-4">
        <div className="flex items-center">
          <Link href={`/course/${course.slug}`} className="mr-4 flex items-center text-[#6D6C6C] hover:text-[#5352F6]">
            <ChevronLeft size={20} />
            <span className="ml-1 hidden md:inline">Volver al curso</span>
          </Link>
          <div className="flex items-center">
            <h1 className="truncate text-lg font-medium mr-4">
              {isQuizMode && currentModule.quiz 
                ? `Quiz: ${currentModule.quiz.title}` 
                : course.title
              }
            </h1>
            {!isQuizMode && currentLesson && !currentLesson.isCompleted && (
              <Button 
                onClick={markLessonCompleted}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <CheckCircle className="mr-2" size={14} />
                Marcar completada
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Progress value={progressPercentage} className="h-2 w-32" />
            <div className="mt-1 text-xs text-[#6D6C6C]">{progressPercentage}% completado</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-x-hidden">
        {/* Sidebar - Lista de módulos y lecciones */}
        <aside 
          className={`w-full border-r border-[#E5E5E5] bg-white md:w-80 ${
            sidebarOpen ? "block absolute md:relative z-10 h-full" : "hidden md:block"
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b border-[#E5E5E5] px-4">
            <h2 className="font-medium">Contenido del curso</h2>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="overflow-y-auto" style={{ height: "calc(100% - 3.5rem)" }}>
            {course.content.modules.map((module, moduleIndex) => (
              <div key={module.id} className="border-b border-[#E5E5E5]">
                <div 
                  className={`flex items-center justify-between p-4 ${
                    module.id === currentModule.id ? "bg-[#EEEEFE]" : ""
                  }`}
                >
                  <h3 className="font-medium">
                    {moduleIndex + 1}. {module.title}
                  </h3>
                  {module.lessons.every(l => l.isCompleted) && (
                    <CheckCircle size={16} className="text-[#5352F6]" />
                  )}
                </div>
                
                <div className="border-t border-[#E5E5E5]">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isActive = currentLesson && lesson.id === currentLesson.id;
                    
                    // Determinar si la lección está completada
                    // Usamos la propiedad isCompleted de la lección directamente
                    const isCompleted = lesson.isCompleted || false;
                    
                    // Determinar si la lección anterior está completada
                    const isPreviousCompleted = lessonIndex > 0
                      ? module.lessons[lessonIndex - 1].isCompleted || false
                      : true; // La primera lección siempre está disponible
                    
                    // Determinar si el módulo anterior está completado
                    // Un módulo está completado si todas sus lecciones están completadas
                    const isPreviousModuleCompleted = moduleIndex > 0
                      ? course.content.modules[moduleIndex - 1].lessons.every(l => l.isCompleted)
                      : true;
                    
                    const isFirstLesson = moduleIndex === 0 && lessonIndex === 0;
                    
                    // Una lección está disponible si:
                    // 1. Ya está completada
                    // 2. La lección anterior está completada
                    // 3. Es la primera lección del curso
                    // 4. El módulo anterior está completado y es la primera lección del módulo
                    const isAvailable = isCompleted || 
                                       isPreviousCompleted || 
                                       isFirstLesson || 
                                       (isPreviousModuleCompleted && lessonIndex === 0);
                    
                    return (
                      <div key={lesson.id} className={`${lessonIndex < module.lessons.length - 1 ? "border-b border-[#E5E5E5]" : ""}`}>
                        {isAvailable ? (
                          <Link
                            href={`/course/${course.slug}/${lesson.slug || lesson.id}`}
                            className={`flex items-center justify-between p-4 ${
                              isActive ? "bg-[#F5F5F5]" : ""
                            } hover:bg-gray-50 transition-colors`}
                          >
                            <div className="flex items-center">
                              {isCompleted ? (
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6]">
                                  <CheckCircle size={14} className="text-white" />
                                </div>
                              ) : isActive ? (
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6]">
                                  <Play size={14} className="text-white" />
                                </div>
                              ) : (
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                                  <span className="text-xs">{moduleIndex + 1}.{lessonIndex + 1}</span>
                                </div>
                              )}
                              <div>
                                <div className={`text-sm ${isActive ? "font-medium" : ""}`}>
                                  {lesson.title}
                                </div>
                                <div className="flex items-center text-xs text-[#6D6C6C]">
                                  {lesson.type === 'video' && <Play size={12} className="mr-1" />}
                                  {lesson.type === 'text' && <FileText size={12} className="mr-1" />}
                                  {lesson.type === 'interactive' && <MessageCircle size={12} className="mr-1" />}
                                  {lesson.duration} min
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div 
                            className="flex items-center justify-between p-4 opacity-50 cursor-not-allowed"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                                <span className="text-xs">{moduleIndex + 1}.{lessonIndex + 1}</span>
                              </div>
                              <div>
                                <div className="text-sm">{lesson.title}</div>
                                <div className="flex items-center text-xs text-[#6D6C6C]">
                                  {lesson.type === 'video' && <Play size={12} className="mr-1" />}
                                  {lesson.type === 'text' && <FileText size={12} className="mr-1" />}
                                  {lesson.type === 'interactive' && <MessageCircle size={12} className="mr-1" />}
                                  {lesson.duration} min
                                </div>
                              </div>
                            </div>
                            <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Bloqueado</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Quiz del módulo si existe */}
                  {module.quiz && (() => {
                    // Determinar si el quiz está disponible
                    const isQuizCompleted = !!module.quiz && (module.quiz.isCompleted || false);
                    
                    // Verificar si todas las lecciones del módulo están completadas
                    // Solo miramos la propiedad isCompleted de cada lección
                    const areAllLessonsCompleted = module.lessons.every(lesson => lesson.isCompleted);
                    
                    // El quiz está disponible ÚNICAMENTE si todas las lecciones del módulo están completadas
                    // Eliminamos la condición de "quiz ya completado" para forzar que siempre se completen todas las lecciones
                    const isQuizAvailable = areAllLessonsCompleted;
                    
                    // Debug info para el estado del quiz
                    const quizDebugInfo = {
                      quizId: module.quiz ? module.quiz.id : '',
                      quizTitle: module.quiz ? module.quiz.title : '',
                      isQuizCompleted, // Ya no se usa para determinar disponibilidad
                      areAllLessonsCompleted,
                      isQuizAvailable,
                      blockReason: !areAllLessonsCompleted ? "Faltan lecciones por completar" : null,
                      lessonsStatus: module.lessons.map(l => ({
                        id: l.id,
                        title: l.title,
                        isCompleted: l.isCompleted || false
                      })),
                      lessonsCompleted: module.lessons.filter(l => l.isCompleted).length,
                      totalLessons: module.lessons.length
                    };
                    
                    // Mostrar en consola la información de depuración del quiz
                    console.log("QUIZ AVAILABILITY DEBUG:", JSON.stringify(quizDebugInfo, null, 2));
                    
                    return (
                      <div className="border-t border-[#E5E5E5]">
                        {isQuizAvailable ? (
                          <Link
                            href={`/course/${course.slug}/${module.quiz ? (module.quiz.slug || module.quiz.id) : ''}`}
                            className={`flex items-center justify-between p-4 ${
                              isQuizMode && module.id === currentModule.id ? "bg-[#F5F5F5]" : ""
                            } hover:bg-gray-50 transition-colors`}
                            onMouseEnter={() => console.log("Quiz disponible", module.quiz ? module.quiz.title : '')}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                <CheckSquare size={14} className="text-green-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  Quiz: {module.quiz ? module.quiz.title : ''}
                                </div>
                                <div className="flex items-center text-xs text-[#6D6C6C]">
                                  {(module.quiz && module.quiz.questions ? module.quiz.questions.length : 0)} preguntas
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div 
                            className="flex items-center justify-between p-4 opacity-50 cursor-not-allowed"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                <CheckSquare size={14} className="text-gray-400" />
                              </div>
                              <div>
                                <div className="text-sm">
                                  Quiz: {module.quiz ? module.quiz.title : ''}
                                </div>
                                <div className="flex items-center text-xs text-[#6D6C6C]">
                                  {(module.quiz && module.quiz.questions ? module.quiz.questions.length : 0)} preguntas
                                </div>
                              </div>
                            </div>
                            <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Bloqueado</div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* Contenido principal */}
        <main className="flex-1 bg-white">
          {/* Si estamos en modo quiz, mostrar solo el quiz */}
          {(isQuizMode || showQuiz) ? (
            <QuizComponent 
              quiz={currentQuiz!}
              courseId={course.id}
              onComplete={handleQuizComplete}
              onBack={handleQuizBack}
            />
          ) : (
            <>
              {/* Reproductor de video */}
              {currentLesson && currentLesson.type === 'video' && (
                <div className="bg-black">
                  {/* Botón para mostrar/ocultar la depuración */}
                  <div className="bg-black p-1 flex justify-end">
                    <button 
                      onClick={() => setShowDebugInfo(!showDebugInfo)}
                      className="text-xs text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                    >
                      {showDebugInfo ? "Ocultar depuración" : "Mostrar depuración"}
                    </button>
                  </div>
                  
                  {/* Barra de depuración del video */}
                  {videoDebugInfo && showDebugInfo && (
                    <div className="bg-black text-white p-2 text-xs font-mono">
                      <div className="flex justify-between mb-1">
                        <span>Tiempo actual: {videoDebugInfo.currentTime}s</span>
                        <span>Duración total: {videoDebugInfo.duration}s</span>
                        <span>Restante: {videoDebugInfo.remaining}s</span>
                        <span>Meta 95%: {videoDebugInfo.target95Percent}s</span>
                        <span className={videoDebugInfo.progress >= 95 ? "text-green-400 font-bold" : videoDebugInfo.progress >= 90 ? "text-yellow-400 font-bold" : ""}>
                          Progreso: {videoDebugInfo.progress}% {videoDebugInfo.progress >= 90 && videoDebugInfo.progress < 95 ? "¡Casi completado!" : videoDebugInfo.progress >= 95 ? "¡COMPLETADO!" : ""}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300 ease-out"
                          style={{ width: `${videoDebugInfo.progress}%` }}
                        ></div>
                      </div>
                      <div className="w-full bg-gray-700 h-1 mt-1 rounded-full overflow-hidden relative">
                        <div 
                          className="absolute h-full bg-red-500 w-1"
                          style={{ left: `${95}%` }}
                        ></div>
                        <div 
                          className="h-full bg-green-500 transition-all duration-300 ease-out"
                          style={{ width: `${videoDebugInfo.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="aspect-video w-full">
                    {currentLesson && currentLesson.videoUrl ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={`${currentLesson.videoUrl}?enablejsapi=1`}
                          title={currentLesson.title}
                          className="h-full w-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          frameBorder="0"
                          id="lesson-video"
                          onLoad={() => {
                            // Implementación de la API de YouTube para detectar el progreso
                            if (typeof window !== 'undefined') {
                              // Cargar la API de YouTube si no está cargada
                              if (!window.YT) {
                                const tag = document.createElement('script');
                                tag.src = 'https://www.youtube.com/iframe_api';
                                const firstScriptTag = document.getElementsByTagName('script')[0];
                                if (firstScriptTag && firstScriptTag.parentNode) {
                                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                                } else {
                                  document.head.appendChild(tag);
                                }
                              }
                              
                              // Función que se ejecutará cuando la API de YouTube esté lista
                              window.onYouTubeIframeAPIReady = () => {
                                // Extraer el ID del video de YouTube de la URL
                                const getYoutubeVideoId = (url: string) => {
                                  // Para URLs de embed
                                  if (url.includes('embed/')) {
                                    const parts = url.split('embed/');
                                    if (parts.length > 1) {
                                      const idPart = parts[1].split('?')[0];
                                      return idPart;
                                    }
                                  }
                                  
                                  // Para URLs normales
                                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                  const match = url.match(regExp);
                                  return (match && match[2].length === 11) ? match[2] : null;
                                };
                                
                                const videoId = getYoutubeVideoId(currentLesson?.videoUrl || '');
                                
                                if (videoId) {
                                  // Crear una instancia del reproductor de YouTube
                                  const player = new window.YT.Player('lesson-video', {
                                    videoId: videoId,
                                    events: {
                                      'onStateChange': (event) => {
                                        // Verificar el estado del reproductor
                                        if (event.data === window.YT.PlayerState.PLAYING) {
                                          // Iniciar un temporizador para verificar el progreso
                                          const checkProgress = setInterval(() => {
                                            // Obtener la duración total y el tiempo actual
                                            const duration = player.getDuration();
                                            const currentTime = player.getCurrentTime();
                                            
                                            // Calcular el porcentaje de progreso
                                            const progress = (currentTime / duration) * 100;
                                            
                                            // Mostrar información de depuración
                                            const debugInfo = {
                                              currentTime: Math.round(currentTime),
                                              duration: Math.round(duration),
                                              progress: Math.round(progress),
                                              remaining: Math.round(duration - currentTime),
                                              target95Percent: Math.round(duration * 0.95)
                                            };
                                            
                                            // Actualizar el estado con la información de depuración
                                            setVideoDebugInfo(debugInfo);
                                            
                                            // Mostrar en consola cada 10 segundos
                                            if (Math.floor(currentTime) % 10 === 0) {
                                              console.log("Video progress:", JSON.stringify(debugInfo, null, 2));
                                            }
                                            
                                            // Si el progreso es >= 95%, marcar completado (una sola vez)
                                            if (progress >= 95 && !hasMarkedByVideo && currentLesson) {
                                              setHasMarkedByVideo(true);
                                              (async () => {
                                                try {
                                                  const ok = ensureLoginOrRedirect(`/course/${course.slug}/${currentLesson?.slug || currentLesson?.id}`, router.push);
                                                  if (!ok) {
                                                    clearInterval(checkProgress);
                                                    return;
                                                  }
                                                  const res = await markLessonCompletedAction({ courseId: course.id, lessonId: currentLesson.id });
                                                  if (res.success) {
                                                    // Actualizar estado local
                                                    currentLesson.isCompleted = true;
                                                    
                                                    // Iniciar contador para siguiente lección si existe
                                                    if (nextLesson) {
                                                      setAutoplayCountdown(10); // 10 segundos
                                                    }
                                                    
                                                    setRenderBump(v => v + 1);
                                                  }
                                                } catch (e) {
                                                  console.error('Error marcando clase completa por video', e);
                                                } finally {
                                                  clearInterval(checkProgress);
                                                }
                                              })();
                                            }
                                          }, 5000); // Verificar cada 5 segundos
                                        }
                                      }
                                    }
                                  });
                                }
                              };
                            }
                          }}
                        ></iframe>
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-black text-white">
                        <div className="text-center">
                          <Play size={48} className="mx-auto mb-2 text-[#5352F6]" />
                          <p>Video no disponible</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Contenido de texto */}
              {currentLesson && currentLesson.type === 'text' && (
                <div className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">{currentLesson.title}</h2>
                  <div className="prose max-w-none">
                    {currentLesson.textContent || (
                      <>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl.
                        </p>
                        <p>
                          Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl.
                        </p>
                        <h3>Subtítulo de la lección</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl.
                        </p>
                        <ul>
                          <li>Punto importante 1</li>
                          <li>Punto importante 2</li>
                          <li>Punto importante 3</li>
                        </ul>
                        <p>
                          Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies aliquam, nunc nisl ultricies nunc, quis ultricies nisl.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Contenido interactivo */}
              {currentLesson && currentLesson.type === 'interactive' && (
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center">
                    <MessageCircle size={48} className="mx-auto mb-4 text-[#5352F6]" />
                    <h2 className="mb-2 text-xl font-bold">Contenido interactivo</h2>
                    <p className="text-[#6D6C6C]">Este tipo de contenido requiere interacción del usuario.</p>
                  </div>
                </div>
              )}
              
              {/* Información de la lección */}
              <div className="border-t border-[#E5E5E5] p-6">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold">{currentLesson ? currentLesson.title : "Lección"}</h2>
                    <div className="flex items-center gap-4 text-sm text-[#6D6C6C]">
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {currentLesson ? currentLesson.duration : 0} minutos
                      </span>
                      <span>
                        Lección {currentLesson ? currentModule.lessons.findIndex(l => l.id === currentLesson.id) + 1 : 0} de {currentModule.lessons.length}
                      </span>
                    </div>
                  </div>
                  
                  {currentLesson && !currentLesson.isCompleted && (
                    <Button 
                      onClick={markLessonCompleted}
                      className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                      size="sm"
                    >
                      <CheckCircle className="mr-2" size={16} />
                      Marcar como completada
                    </Button>
                  )}
                </div>
                
                {/* Contador de reproducción automática */}
                {autoplayCountdown !== null && nextLesson && (
                  <div className="mb-6 p-3 bg-[#EEEEFE] rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-[#5352F6] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                        {autoplayCountdown}
                      </div>
                      <div>
                        <p className="font-medium">Reproduciendo siguiente lección en {autoplayCountdown}s</p>
                        <p className="text-sm text-[#6D6C6C]">{nextLesson.lesson.title}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPauseAutoplay(!pauseAutoplay)}
                    >
                      {pauseAutoplay ? "Reanudar" : "Pausar"}
                    </Button>
                  </div>
                )}
                
                {/* Mensaje de felicitación al completar el curso */}
                {showCourseCompleted && (
                  <div className="mb-6 p-6 bg-[#F0FDF4] border border-[#86EFAC] rounded-lg text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">¡Felicidades! Has completado el curso</h3>
                        <p className="text-[#6D6C6C] mb-4">
                      Has finalizado todas las lecciones y evaluaciones de &quot;{course.title}&quot;. 
                      Continúa tu aprendizaje con más cursos de LOKL Academy.
                    </p>
                    <div className="flex justify-center gap-3">
                      <Link href="/course">
                        <Button variant="outline">Ver más cursos</Button>
                      </Link>
                      <Link href="/">
                        <Button>Volver al inicio</Button>
                      </Link>
                    </div>
                  </div>
                )}
                
                {currentLesson && (
                  <div className="prose max-w-none">
                    <p>
                      {currentLesson.description || "Descripción de la lección no disponible."}
                    </p>
                  </div>
                )}
                
                {/* Recursos adicionales */}
                {currentModule.resources && currentModule.resources.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-bold">Recursos adicionales</h3>
                    <div className="space-y-3">
                      {currentModule.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center rounded-md border border-[#E5E5E5] p-3 hover:border-[#5352F6] hover:bg-[#FAFAFA]"
                        >
                          <div className="mr-3 rounded-md bg-[#EEEEFE] p-2">
                            <Download size={20} className="text-[#5352F6]" />
                          </div>
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-[#6D6C6C]">{resource.type.toUpperCase()}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quiz del módulo */}
                {currentModule.quiz && !isQuizMode && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-bold">Evaluación del módulo</h3>
                    <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{currentModule.quiz.title}</div>
                          <div className="text-sm text-[#6D6C6C]">
                            {currentModule.quiz.questions?.length || 0} preguntas • Puntaje mínimo: {currentModule.quiz.passingScore}%
                          </div>
                        </div>
                        <Button onClick={() => setShowQuiz(true)}>
                          Iniciar quiz
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Botón para marcar como completada ya está arriba */}

                {/* Navegación entre lecciones */}
                <div className="mt-8 flex items-center justify-between border-t border-[#E5E5E5] pt-6">
                  {previousLesson ? (
                    <Link
                      href={`/course/${course.slug}/${previousLesson.lesson.slug || previousLesson.lesson.id}`}
                      className="flex items-center text-[#6D6C6C] hover:text-[#5352F6]"
                    >
                      <ChevronLeft size={20} className="mr-1" />
                      <div>
                        <div className="text-xs">Anterior</div>
                        <div className="font-medium">{previousLesson.lesson.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  
                  {nextLesson ? (
                    <Link
                      href={`/course/${course.slug}/${nextLesson.lesson.slug || nextLesson.lesson.id}`}
                      className="flex items-center text-right text-[#6D6C6C] hover:text-[#5352F6]"
                    >
                      <div>
                        <div className="text-xs">Siguiente</div>
                        <div className="font-medium">{nextLesson.lesson.title}</div>
                      </div>
                      <ChevronRight size={20} className="ml-1" />
                    </Link>
                  ) : (
                    <Button onClick={() => setShowCourseCompleted(true)}>Finalizar curso</Button>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
