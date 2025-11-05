"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NestedSelect } from "@/components/ui/nested-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadFormSchema, LeadFormData, howDidYouHearAboutUsOptions, OptionType } from "@/schemas/lead-schema";
import Link from "next/link";
import { User, Phone, Mail, Users } from "lucide-react";

interface Phase2LeadCaptureProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
  onLoginRedirect?: () => void;
}


export default function Phase2LeadCaptureComponent({
  onSubmit,
  onLoginRedirect,
}: Phase2LeadCaptureProps) {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      howDidYouHearAboutUs: "",
      termsAccepted: false,
    },
  });

  const handleSubmit = async (data: LeadFormData) => {
    await onSubmit(data);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="space-y-6 bg-[#5352F6] rounded-2xl p-8 text-white">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">¡Un paso más para ver tu proyección!</h3>
        <p className="text-white/80 text-sm">
          Déjanos tus datos y accede a tu simulación personalizada
        </p>
      </div>

      {/* Opción de Login */}
      <div className="bg-white/10 rounded-xl p-4 text-center">
        <p className="text-sm text-white/80 mb-3">¿Ya tienes una cuenta?</p>
        <Link
          href="/login?redirect=%2F%23simulador"
          onClick={() => {
            onLoginRedirect?.();
          }}
        >
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white text-[#5352F6] hover:bg-white/90 border-0"
          >
            Iniciar sesión
          </Button>
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#5352F6] px-2 text-white/60">O completa tus datos</span>
        </div>
      </div>

      {/* Formulario */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-white/90">
                    <User className="w-4 h-4" />
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pérez"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />
          </div>

          {/* Teléfono */}
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-white/90">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="CO"
                    international
                    countryCallingCodeEditable={false}
                    disabled={isSubmitting}
                    className="flex h-11 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50"
                    placeholder="Ej: +57 300 123 4567"
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-sm font-medium text-red-200">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-white/90">
                  <Mail className="w-4 h-4" />
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ej: juan@ejemplo.com"
                    {...field}
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-11"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
              </FormItem>
            )}
          />

          {/* ¿Cómo nos conociste? */}
          <FormField
            control={form.control}
            name="howDidYouHearAboutUs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-white/90">
                  <Users className="w-4 h-4" />
                  ¿Por dónde nos conociste?
                </FormLabel>
                <FormControl>
                  <NestedSelect
                    options={howDidYouHearAboutUsOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecciona una opción"
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
              </FormItem>
            )}
          />

          {/* Términos y condiciones */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white/10 rounded-lg p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#5352F6]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-white/90">
                    Acepto los{" "}
                    <a
                      href="/terminos-y-condiciones"
                      target="_blank"
                      className="underline font-semibold"
                    >
                      términos y condiciones
                    </a>
                  </FormLabel>
                  <FormMessage className="text-red-200" />
                </div>
              </FormItem>
            )}
          />

          {/* Botón Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-white text-[#5352F6] hover:bg-white/90 font-semibold text-base"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5352F6] border-t-transparent mr-2"></div>
                Continuando...
              </>
            ) : (
              "Ver mi proyección"
            )}
          </Button>

          <p className="text-xs text-white/60 text-center">
            Tus datos están protegidos y solo se usarán para contactarte sobre tu inversión
          </p>
        </form>
      </Form>
    </div>
  );
}

