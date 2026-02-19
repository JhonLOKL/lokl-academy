"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, AlertCircle, MessageSquareHeart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { submitSatisfactionSurveyAction } from "@/actions/SatisfactionSurvey-action";
import { SatisfactionSurveyInput } from "@/schemas/satisfaction-survey-schema";

type SatisfactionLevel = 3 | 2 | 1 | null;
type ResolutionStatus = "total" | "partial" | "none" | null;

export default function SatisfactionSurvey() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [satisfaction, setSatisfaction] = useState<SatisfactionLevel>(null);
  const [resolution, setResolution] = useState<ResolutionStatus>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Capturar parámetros de la URL
    const emailParam = searchParams.get("email");
    const phoneParam = searchParams.get("phone");
    
    if (emailParam) setEmail(emailParam);
    if (phoneParam) setPhone(phoneParam);
  }, [searchParams]);

  // Función para obtener el texto de la respuesta de satisfacción
  const getSatisfactionLabel = (level: SatisfactionLevel): string => {
    switch (level) {
      case 3:
        return "Muy satisfecho";
      case 2:
        return "Satisfecho";
      case 1:
        return "Insatisfecho";
      default:
        return "";
    }
  };

  // Función para obtener el texto de la respuesta de resolución
  const getResolutionLabel = (status: ResolutionStatus): string => {
    switch (status) {
      case "total":
        return "Sí, totalmente";
      case "partial":
        return "Parcialmente";
      case "none":
        return "No, aún tengo dudas";
      default:
        return "";
    }
  };

  const handleSatisfactionSelect = (level: SatisfactionLevel) => {
    setSatisfaction(level);
    // Avanzar automáticamente después de una breve pausa
    setTimeout(() => {
      setCurrentStep(1);
    }, 600);
  };

  const handleResolutionSelect = async (status: ResolutionStatus) => {
    setResolution(status);
    
    // Enviar datos a la API con los valores actuales
    if (!satisfaction || !status) return;

    setIsSubmitting(true);

    const surveyData: SatisfactionSurveyInput = {
      email: email || "",
      phone: phone || "",
      responses: [
        {
          question: "¿Qué tan satisfecho estás con el tiempo que tardamos en darte una respuesta definitiva?",
          answer: getSatisfactionLabel(satisfaction),
        },
        {
          question: "¿Tu requerimiento quedó completamente solucionado?",
          answer: getResolutionLabel(status),
        },
      ],
    };

    try {
      const result = await submitSatisfactionSurveyAction(surveyData);
      
      if (result.success) {
        console.log("✅ Encuesta enviada exitosamente");
        console.log("📊 Datos enviados:", JSON.stringify(surveyData, null, 2));
        if (!email && !phone) {
          console.log("ℹ️ Encuesta enviada sin email ni teléfono");
        }
      } else {
        console.error("❌ Error al enviar la encuesta:", result.error);
      }
    } catch (error) {
      console.error("❌ Error inesperado:", error);
    } finally {
      setIsSubmitting(false);
    }
    
    // Avanzar automáticamente a la pantalla final
    setTimeout(() => {
      setCurrentStep(2);
    }, 600);
  };

  const satisfactionOptions = [
    {
      value: 3 as SatisfactionLevel,
      label: "Muy satisfecho",
      icon: Star,
      color: "bg-green-500 hover:bg-green-600",
      borderColor: "border-green-500",
      emoji: "😊",
    },
    {
      value: 2 as SatisfactionLevel,
      label: "Satisfecho",
      icon: CheckCircle2,
      color: "bg-blue-500 hover:bg-blue-600",
      borderColor: "border-blue-500",
      emoji: "🙂",
    },
    {
      value: 1 as SatisfactionLevel,
      label: "Insatisfecho",
      icon: AlertCircle,
      color: "bg-orange-500 hover:bg-orange-600",
      borderColor: "border-orange-500",
      emoji: "😕",
    },
  ];

  const resolutionOptions = [
    {
      value: "total" as ResolutionStatus,
      label: "Sí, totalmente",
      icon: CheckCircle2,
      color: "bg-emerald-500 hover:bg-emerald-600",
      borderColor: "border-emerald-500",
    },
    {
      value: "partial" as ResolutionStatus,
      label: "Parcialmente",
      icon: AlertCircle,
      color: "bg-amber-500 hover:bg-amber-600",
      borderColor: "border-amber-500",
    },
    {
      value: "none" as ResolutionStatus,
      label: "No, aún tengo dudas",
      icon: AlertCircle,
      color: "bg-red-500 hover:bg-red-600",
      borderColor: "border-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="intro"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="shadow-2xl border-2">
                <CardHeader className="text-center space-y-4 pb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="inline-flex justify-center"
                  >
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl">
                      <MessageSquareHeart className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Tu opinión es fundamental
                  </CardTitle>
                  <p className="text-muted-foreground text-base md:text-lg">
                    Por favor, ayúdanos respondiendo estas 2 preguntas rápidas
                    sobre tu experiencia reciente.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-center mb-6">
                      1. ¿Qué tan satisfecho estás con el tiempo que tardamos en
                      darte una respuesta definitiva?
                    </h3>
                    <div className="grid gap-4">
                      {satisfactionOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.button
                            key={option.value}
                            custom={index + 1}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSatisfactionSelect(option.value)}
                            className={`p-6 rounded-xl border-2 ${
                              satisfaction === option.value
                                ? `${option.color} text-white ${option.borderColor} shadow-lg`
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            } transition-all duration-300 flex items-center gap-4 group`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <span className="text-4xl">{option.emoji}</span>
                              <div className="flex-1 text-left">
                                <p
                                  className={`font-semibold text-lg ${
                                    satisfaction === option.value
                                      ? "text-white"
                                      : "text-gray-900 dark:text-gray-100"
                                  }`}
                                >
                                  {option.label}
                                </p>
                              </div>
                            </div>
                            <Icon
                              className={`w-6 h-6 ${
                                satisfaction === option.value
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Indicador de progreso */}
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="h-2 w-12 rounded-full bg-purple-600"></div>
                    <div className="h-2 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="resolution"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="shadow-2xl border-2">
                <CardHeader className="text-center space-y-4 pb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="inline-flex justify-center"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ¡Excelente!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-center mb-6">
                      2. ¿Tu requerimiento quedó completamente solucionado?
                    </h3>
                    <div className="grid gap-4">
                      {resolutionOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.button
                            key={option.value}
                            custom={index + 1}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleResolutionSelect(option.value)}
                            disabled={isSubmitting}
                            className={`p-6 rounded-xl border-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""} ${
                              resolution === option.value
                                ? `${option.color} text-white ${option.borderColor} shadow-lg`
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            } transition-all duration-300 flex items-center gap-4 group`}
                          >
                            <div className="flex-1 text-left">
                              <p
                                className={`font-semibold text-lg ${
                                  resolution === option.value
                                    ? "text-white"
                                    : "text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                {option.label}
                              </p>
                            </div>
                            <Icon
                              className={`w-6 h-6 ${
                                resolution === option.value
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Indicador de progreso */}
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="h-2 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-12 rounded-full bg-purple-600"></div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(0)}
                    className="w-full"
                  >
                    ← Volver a la pregunta anterior
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="thank-you"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="shadow-2xl border-2 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="inline-flex justify-center"
                  >
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 rounded-full shadow-xl">
                      <CheckCircle2 className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ¡Muchas gracias por tus respuestas!
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Tu opinión nos ayuda a mejorar cada día y brindarte un
                      mejor servicio.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-8"
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentStep(0);
                        setSatisfaction(null);
                        setResolution(null);
                      }}
                      className="mx-auto"
                    >
                      Responder nuevamente
                    </Button>
                  </motion.div>

                  {/* Confetti effect con partículas flotantes */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
