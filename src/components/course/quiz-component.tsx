"use client";

import React, { useState } from "react";
import { Button } from "@/components/design-system";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Quiz, QuizQuestion } from "@/lib/course/schema";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete?: (score: number, passed: boolean) => void;
  onBack?: () => void;
}

export default function QuizComponent({ quiz, onComplete, onBack }: QuizComponentProps) {
  const [answers, setAnswers] = useState<{[key: string]: string | string[]}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Manejar el cambio en las respuestas
  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    if (submitted) return;
    
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  // Calcular la puntuación y evaluar el quiz
  const handleSubmit = () => {
    if (submitted) return;
    
    let totalPoints = 0;
    let earnedPoints = 0;
    
    quiz.questions.forEach(question => {
      totalPoints += question.points;
      
      const userAnswer = answers[question.id];
      if (!userAnswer) return;
      
      if (Array.isArray(question.correctAnswer)) {
        // Para respuestas múltiples
        if (Array.isArray(userAnswer)) {
          const correctCount = userAnswer.filter(a => question.correctAnswer.includes(a)).length;
          const percentage = correctCount / question.correctAnswer.length;
          earnedPoints += question.points * percentage;
        }
      } else {
        // Para respuesta única
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      }
    });
    
    const finalScore = Math.round((earnedPoints / totalPoints) * 100);
    setScore(finalScore);
    setSubmitted(true);
    
    if (onComplete) {
      onComplete(finalScore, finalScore >= quiz.passingScore);
    }
  };
  
  // Verificar si todas las preguntas están respondidas
  const allQuestionsAnswered = quiz.questions.every(q => answers[q.id] !== undefined);
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">{quiz.title}</h2>
        {quiz.description && (
          <p className="text-[#6D6C6C]">{quiz.description}</p>
        )}
        
        {!submitted && (
          <div className="mt-4 rounded-md bg-[#EEEEFE] p-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-[#5352F6]">
                <AlertCircle size={18} />
              </div>
              <div>
                <p className="font-medium text-[#5352F6]">Información importante</p>
                <p className="text-sm text-[#6D6C6C]">
                  Puntaje mínimo para aprobar: {quiz.passingScore}%
                  {quiz.maxAttempts && ` • Intentos máximos: ${quiz.maxAttempts}`}
                  {quiz.timeLimit && ` • Tiempo límite: ${quiz.timeLimit} minutos`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {submitted && (
          <div className={`mt-4 rounded-md p-4 ${score >= quiz.passingScore ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-start">
              <div className={`mr-3 mt-1 ${score >= quiz.passingScore ? 'text-green-500' : 'text-red-500'}`}>
                {score >= quiz.passingScore ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              </div>
              <div>
                <p className={`font-medium ${score >= quiz.passingScore ? 'text-green-700' : 'text-red-700'}`}>
                  {score >= quiz.passingScore ? '¡Quiz aprobado!' : 'Quiz no aprobado'}
                </p>
                <p className="text-sm text-[#6D6C6C]">
                  Tu puntaje: <span className="font-medium">{score}%</span> (Mínimo requerido: {quiz.passingScore}%)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {quiz.questions.map((question, index) => (
        <div 
          key={question.id} 
          className="mb-8 rounded-lg border border-[#E5E5E5] bg-white p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Pregunta {index + 1}</h3>
            <Badge>{question.points} puntos</Badge>
          </div>
          
          <p className="mb-6">{question.question}</p>
          
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === option;
                const isCorrect = submitted && option === question.correctAnswer;
                const isIncorrect = submitted && isSelected && option !== question.correctAnswer;
                
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
                    onClick={() => handleAnswerChange(question.id, option)}
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
          
          {question.type === 'true-false' && question.options && (
            <div className="flex gap-4">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === option;
                const isCorrect = submitted && option === question.correctAnswer;
                const isIncorrect = submitted && isSelected && option !== question.correctAnswer;
                
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
                    onClick={() => handleAnswerChange(question.id, option)}
                  >
                    <span>{option}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          {question.type === 'short-answer' && (
            <div>
              <textarea 
                className="w-full rounded-md border border-[#E5E5E5] p-3 focus:border-[#5352F6] focus:outline-none focus:ring-1 focus:ring-[#5352F6]"
                rows={3}
                placeholder="Escribe tu respuesta aquí..."
                value={answers[question.id] as string || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                disabled={submitted}
              />
            </div>
          )}
          
          {submitted && question.explanation && (
            <div className="mt-4 rounded-md bg-[#F5F5F5] p-4">
              <div className="font-medium">Explicación:</div>
              <p className="text-sm text-[#6D6C6C]">{question.explanation}</p>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-8 flex justify-between">
        {onBack && (
          <Button 
            variant="outline"
            onClick={onBack}
          >
            Volver a la lección
          </Button>
        )}
        
        {!submitted ? (
          <Button 
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
          >
            Enviar respuestas
          </Button>
        ) : (
          <div className="space-x-4">
            <Button onClick={() => window.location.href = window.location.pathname}>
              Intentar de nuevo
            </Button>
            <Button 
              variant="outline" 
              onClick={onBack || (() => {})}
            >
              Continuar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
