"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { mockCourses, mockUserProgress } from "@/lib/course/mock-data";

export default function CourseLearnPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const moduleId = searchParams.get("module");
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string | string[]}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Encontrar el curso por slug
  const course = mockCourses.find((course) => course.slug === params.slug);
  
  // Si el curso no existe, mostrar 404
  if (!course) {
    notFound();
  }
  
  // Obtener progreso del usuario (si existe)
  const userProgress = mockUserProgress.find(progress => progress.courseId === course.id);
  const progressPercentage = userProgress?.overallProgress || 0;
  
  // Encontrar el módulo actual
  const currentModule = moduleId 
    ? course.content.modules.find(m => m.id === moduleId)
    : course.content.modules[0];
    
  if (!currentModule) {
    notFound();
  }
  
  // Encontrar la lección actual
  const currentLesson = lessonId 
    ? currentModule.lessons.find(l => l.id === lessonId)
    : currentModule.lessons[0];
    
  if (!currentLesson) {
    notFound();
  }
  
  // Determinar lecciones previas y siguientes
  const currentModuleIndex = course.content.modules.findIndex(m => m.id === currentModule.id);
  const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
  
  let previousLesson = null;
  let nextLesson = null;
  
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
  
  
  // Manejar el cambio en el quiz
  const handleQuizChange = (questionId: string, answer: string | string[]) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };
  
  // Enviar el quiz
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // Aquí iría la lógica para evaluar las respuestas
  };
  
  // Simular quiz del módulo actual
  const currentQuiz = currentModule.quiz ? {
    ...currentModule.quiz,
    questions: currentModule.quiz.questions || [
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
    ]
  } : null;
  
  return (
    <div className="flex h-screen flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-[#E5E5E5] bg-white px-4">
        <div className="flex items-center">
          <Link href={`/course/${course.slug}`} className="mr-4 flex items-center text-[#6D6C6C] hover:text-[#5352F6]">
            <ChevronLeft size={20} />
            <span className="ml-1 hidden md:inline">Volver al curso</span>
          </Link>
          <h1 className="truncate text-lg font-medium">{course.title}</h1>
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
      
      <div className="flex flex-1 overflow-hidden">
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
                  {userProgress?.moduleProgress.some(m => m.moduleId === module.id && m.progress === 100) && (
                    <CheckCircle size={16} className="text-[#5352F6]" />
                  )}
                </div>
                
                <div className="border-t border-[#E5E5E5]">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isActive = lesson.id === currentLesson.id;
                    const isCompleted = userProgress?.moduleProgress.some(
                      m => m.moduleId === module.id && m.progress === 100
                    );
                    
                    return (
                      <Link
                        key={lesson.id}
                        href={`/course/${course.slug}/learn?module=${module.id}&lesson=${lesson.id}`}
                        className={`flex items-center justify-between p-4 ${
                          isActive ? "bg-[#F5F5F5]" : ""
                        } ${lessonIndex < module.lessons.length - 1 ? "border-b border-[#E5E5E5]" : ""}`}
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
                    );
                  })}
                  
                  {/* Quiz del módulo si existe */}
                  {module.quiz && (
                    <Link
                      href={`/course/${course.slug}/learn?module=${module.id}&quiz=true`}
                      className={`flex items-center justify-between p-4 ${
                        showQuiz && module.id === currentModule.id ? "bg-[#F5F5F5]" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          <CheckSquare size={14} className="text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Quiz: {module.quiz.title}
                          </div>
                          <div className="flex items-center text-xs text-[#6D6C6C]">
                            {module.quiz.questions?.length || 0} preguntas
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto bg-white">
          {!showQuiz ? (
            <>
              {/* Reproductor de video */}
              {currentLesson.type === 'video' && (
                <div className="bg-black">
                  <div className="aspect-video w-full">
                    {currentLesson.videoUrl ? (
                      <iframe
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        className="h-full w-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        frameBorder="0"
                      ></iframe>
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
              {currentLesson.type === 'text' && (
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
              {currentLesson.type === 'interactive' && (
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
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold">{currentLesson.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-[#6D6C6C]">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {currentLesson.duration} minutos
                    </span>
                    <span>
                      Lección {currentLessonIndex + 1} de {currentModule.lessons.length}
                    </span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p>
                    {currentLesson.description || "Descripción de la lección no disponible."}
                  </p>
                </div>
                
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
                {currentModule.quiz && (
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
                
                {/* Navegación entre lecciones */}
                <div className="mt-8 flex items-center justify-between border-t border-[#E5E5E5] pt-6">
                  {previousLesson ? (
                    <Link
                      href={`/course/${course.slug}/learn?module=${previousLesson.module.id}&lesson=${previousLesson.lesson.id}`}
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
                      href={`/course/${course.slug}/learn?module=${nextLesson.module.id}&lesson=${nextLesson.lesson.id}`}
                      className="flex items-center text-right text-[#6D6C6C] hover:text-[#5352F6]"
                    >
                      <div>
                        <div className="text-xs">Siguiente</div>
                        <div className="font-medium">{nextLesson.lesson.title}</div>
                      </div>
                      <ChevronRight size={20} className="ml-1" />
                    </Link>
                  ) : (
                    <Button>Finalizar curso</Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Quiz */
            <div className="p-6">
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold">{currentQuiz?.title}</h2>
                <p className="text-[#6D6C6C]">
                  Completa este quiz para evaluar tu comprensión del módulo.
                </p>
              </div>
              
              {currentQuiz?.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="mb-8 rounded-lg border border-[#E5E5E5] bg-white p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Pregunta {index + 1}</h3>
                    <Badge>{question.points} puntos</Badge>
                  </div>
                  
                  <p className="mb-6">{question.question}</p>
                  
                  {question.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => {
                        const isSelected = quizAnswers[question.id] === option;
                        const isCorrect = quizSubmitted && option === question.correctAnswer;
                        const isIncorrect = quizSubmitted && isSelected && option !== question.correctAnswer;
                        
                        return (
                          <div 
                            key={optionIndex}
                            className={`flex cursor-pointer items-center rounded-md border p-3 ${
                              isSelected ? 'border-[#5352F6] bg-[#EEEEFE]' : 'border-[#E5E5E5]'
                            } ${
                              isCorrect ? 'border-green-500 bg-green-50' : ''
                            } ${
                              isIncorrect ? 'border-red-500 bg-red-50' : ''
                            }`}
                            onClick={() => !quizSubmitted && handleQuizChange(question.id, option)}
                          >
                            <div 
                              className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
                                isSelected ? 'border-[#5352F6] bg-[#5352F6] text-white' : 'border-[#6D6C6C]'
                              } ${
                                isCorrect ? 'border-green-500 bg-green-500 text-white' : ''
                              } ${
                                isIncorrect ? 'border-red-500 bg-red-500 text-white' : ''
                              }`}
                            >
                              {isSelected && <CheckCircle size={12} />}
                            </div>
                            <span>{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {question.type === 'true-false' && (
                    <div className="flex gap-4">
                      {question.options?.map((option, optionIndex) => {
                        const isSelected = quizAnswers[question.id] === option;
                        const isCorrect = quizSubmitted && option === question.correctAnswer;
                        const isIncorrect = quizSubmitted && isSelected && option !== question.correctAnswer;
                        
                        return (
                          <div 
                            key={optionIndex}
                            className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border p-3 ${
                              isSelected ? 'border-[#5352F6] bg-[#EEEEFE]' : 'border-[#E5E5E5]'
                            } ${
                              isCorrect ? 'border-green-500 bg-green-50' : ''
                            } ${
                              isIncorrect ? 'border-red-500 bg-red-50' : ''
                            }`}
                            onClick={() => !quizSubmitted && handleQuizChange(question.id, option)}
                          >
                            <span>{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {quizSubmitted && (
                    <div className="mt-4 rounded-md bg-[#F5F5F5] p-4">
                      <div className="font-medium">Explicación:</div>
                      <p className="text-sm text-[#6D6C6C]">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setShowQuiz(false)}
                >
                  Volver a la lección
                </Button>
                
                {!quizSubmitted ? (
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < (currentQuiz?.questions.length || 0)}
                  >
                    Enviar respuestas
                  </Button>
                ) : (
                  <Button onClick={() => setShowQuiz(false)}>
                    Continuar con el curso
                  </Button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
