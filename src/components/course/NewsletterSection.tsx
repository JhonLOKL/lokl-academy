"use client";

import React, { useState } from "react";
import { Card, CardContent, Input, H2, Paragraph, Button } from "@/components/design-system";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");
    
    try {
      // Simular envío - reemplazar con llamada API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al suscribirte. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br bg-[#5352F6] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dot-pattern.png')] bg-repeat"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <H2 className="text-white mb-4">Mantente <span className="text-[#FFD447]">actualizado</span></H2>
          <Paragraph className="text-white/90 text-lg">
            Recibe contenido exclusivo sobre inversión inmobiliaria, estrategias financieras y oportunidades directamente en tu correo.
          </Paragraph>
        </div>
        
        <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="font-bold text-xl mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#5352F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Newsletter LOKL Academy
                </h4>
                <p className="text-[#6D6C6C]">
                  Únete a +3,500 inversionistas que ya reciben nuestro contenido exclusivo
                </p>
              </div>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">¡Gracias por suscribirte!</p>
                  <p className="text-sm mt-1">Pronto recibirás nuestro contenido exclusivo.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      type="email" 
                      placeholder="Tu correo electrónico" 
                      className="flex-1 border-[#E5E5E5] focus:border-[#5352F6]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Correo electrónico para suscripción"
                    />
                    <Button 
                      type="submit"
                      size="lg" 
                      className="bg-[#5352F6] hover:bg-[#4241E0] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#5352F6]/20"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Suscribiendo..." : "Suscribirme"}
                    </Button>
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                </form>
              )}
              
              <div className="flex items-center justify-center gap-6 pt-2 text-sm text-[#6D6C6C]">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Contenido semanal
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cancela cuando quieras
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;
