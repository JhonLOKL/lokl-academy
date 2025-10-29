"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageWithFallback } from './image-with-fallback';
import { Mail, Shield, Users, Star, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletterAction } from '@/actions/newsletter-actions';
import { useState } from 'react';

interface NewsletterFormData {
  email: string;
  consent: boolean;
}

interface NewsletterTabProps {
  isSubmitted: boolean;
  onSuccess: () => void;
}

export default function NewsletterTab({ isSubmitted, onSuccess }: NewsletterTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const { register, handleSubmit: handleFormSubmit, reset, formState: {  } } = useForm<NewsletterFormData>();

  const handleSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);

    try {
      await subscribeToNewsletterAction(data.email);
      // Limpiar el formulario
      reset();
      // Mostrar toast de éxito
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000); // Ocultar después de 3 segundos
      onSuccess();
    } catch (err) {
      // Silenciar errores - siempre mostrar éxito
      reset();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      onSuccess();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden border-0 shadow-2xl shadow-[#5352F6]/30 hover:shadow-[#5352F6]/40 transition-all duration-300 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Columna izquierda - Imagen */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden group bg-gray-100 flex items-start pt-0">
            <ImageWithFallback
              src="https://lokl-assets.s3.us-east-1.amazonaws.com/home/newsletter.png"
              alt="Newsletter LOKL"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#5352F6]/90 via-[#5352F6]/50 to-[#5352F6]/20"></div> */}
          </div>

          {/* Columna derecha - Formulario de suscripción */}
          <div className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-[#5352F6] via-[#5352F6] to-[#5352F6]/80 relative overflow-hidden">
            {/* Efectos de brillo y patrón de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
            
            <div className="text-center space-y-6 relative flex flex-col justify-center h-full">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-white/30 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Suscríbete a nuestro <span className="text-white/90">newsletter</span>
                </h3>
                <p className="text-base text-white/90 mb-4">
                  1 email/semana · sin spam · plantillas y oportunidades exclusivas
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>+12,000 suscriptores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-white" />
                    <span>4.9/5 valoración</span>
                  </div>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-6">
                  <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-lg text-white font-medium">¡Gracias por suscribirte!</p>
                  <p className="text-sm text-white/80 mt-2">Revisa tu email para confirmar tu suscripción (doble opt-in).</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-5">
                  <Input
                    type="email"
                    placeholder="tu.email@ejemplo.com"
                    {...register('email', { required: 'Email requerido' })}
                    className="text-center bg-white/95 border-white/50 placeholder:text-muted-foreground/60 focus:bg-white text-foreground shadow-lg h-12"
                    disabled={isLoading}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-black/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-12 text-base py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? 'Suscribiendo...' : 'Recibir el boletín gratis'}
                  </Button>
                  
                  {/* Aviso de privacidad visible */}
                  <p className="text-xs text-white/80">
                    <Shield className="h-3 w-3 inline mr-1" />
                    <a href="https://drive.google.com/file/d/1R6aOvsRjYVo-d398PskWJjwL4_WrY9PP/view" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/80">Términos y condiciones</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Toast de éxito */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">¡Suscripción exitosa!</span>
          </div>
        </div>
      )}
    </div>
  );
}
