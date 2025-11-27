"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/components/simulator/phone-input-styles.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NestedSelect } from "@/components/ui/nested-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LeadFormData,
  LeadFormSchema,
  howDidYouHearAboutUsOptions,
} from "@/schemas/lead-schema";
import { ArrowLeft } from "lucide-react";
import { parsePhoneData } from "@/lib/phone-utils";
import {
  createSimulationAction,
  createQuiivenContactAction,
  sendFirstMessageAction,
} from "@/actions/simulator-actions";
import { upsertLeadAction } from "@/actions/user-action";
import { useSimulatorStore } from "@/store/simulator-store";
import { useUtmStore } from "@/store/utm-store";
import { useAuthStore } from "@/store/auth-store";
import { ProjectCard } from "@/schemas/project-card-schema";

interface WindowWithDataLayer extends Window {
  dataLayer: Record<string, any>[];
}

export interface HeroLeadFormProps {
  currentProject: ProjectCard;
  heroInvestmentAmount: number;
  onBack: () => void;
}

export default function HeroLeadForm({
  currentProject,
  heroInvestmentAmount,
  onBack,
}: HeroLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSelectedProject, setInvestmentAmount, setInstallments, setPrefetchedSimulationData } =
    useSimulatorStore();
  const { user } = useAuthStore();
  const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();

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

  const handleHeroFormSubmit = async (formData: LeadFormData) => {
    if (!currentProject) return;

    setIsSubmitting(true);

    try {
      setSelectedProject(currentProject);
      setInvestmentAmount(heroInvestmentAmount);
      setInstallments(1);

      const installmentsToSend = 0;
      const simulationResponse = await createSimulationAction({
        projectId: currentProject.id,
        investmentValue: heroInvestmentAmount,
        installmentsNumber: installmentsToSend,
      });

      if (simulationResponse.success && simulationResponse.data) {
        setPrefetchedSimulationData(simulationResponse.data);

        if (typeof window !== "undefined") {
          const w = window as unknown as WindowWithDataLayer;
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: "lead_projection_submit",
            form_name: "proyeccion_rapida",
            form_location: "hero_home",
          });
        }

        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const isAuthenticated = !!user;
        const phoneData = parsePhoneData(formData.phone);

        const leadData = {
          email: formData.email,
          firstName: formData.firstName,
          project: currentProject.name,
          ...(phoneData.phoneNumber && { phone: phoneData.phoneNumber }),
          ...(formData.howDidYouHearAboutUs && { leadOrigin: formData.howDidYouHearAboutUs }),
          ...(utmSource && { utmSource }),
          ...(utmMedium && { utmMedium }),
          ...(utmCampaign && { utmCampaign }),
          ...(utmTerm && { utmTerm }),
          ...(utmContent && { utmContent }),
          origin: "Simulador Hero",
          status: isAuthenticated ? "Interesado" : "Interesado",
        };

        console.log("Guardando lead desde hero:", leadData);
        const leadResponse = await upsertLeadAction(leadData);

        if (leadResponse.success) {
          console.log("✅ Lead guardado exitosamente desde hero");
        } else {
          console.error("❌ Error al guardar lead:", leadResponse.message);
        }

        const quiivenData = {
          name: fullName,
          email: formData.email,
          investmentValue: heroInvestmentAmount.toString(),
          shares: simulationResponse.data.unitsAmount,
          numberInstallments: installmentsToSend,
          phone: phoneData.phoneNumber || "",
          termsAccepted: formData.termsAccepted,
          leadOrigin: formData.howDidYouHearAboutUs || "Simulador Hero",
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
        };

        console.log("Enviando datos a Quiiven desde hero:", quiivenData);
        const quiivenResponse = await createQuiivenContactAction(quiivenData);

        if (quiivenResponse.success) {
          console.log("✅ Contacto creado exitosamente en Quiiven");
        } else {
          console.error("❌ Error al crear contacto en Quiiven:", quiivenResponse.error);
        }

        if (phoneData.phoneNumber) {
          const whatsappData = {
            name: fullName,
            projectId: currentProject.id,
            email: formData.email,
            numberToSend: phoneData.phoneNumber,
          };

          console.log("📱 Enviando mensaje de WhatsApp desde hero:", whatsappData);
          const whatsappResponse = await sendFirstMessageAction(whatsappData);

          if (whatsappResponse.success) {
            if (whatsappResponse.skipped) {
              console.log("⏱️ Mensaje de WhatsApp omitido:", whatsappResponse.message);
            } else {
              console.log("✅ Mensaje de WhatsApp enviado exitosamente");
            }
          } else {
            console.error("❌ Error al enviar mensaje de WhatsApp:", whatsappResponse.error);
          }
        }

        const isDesktop =
          typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
        const targetId = isDesktop ? "simulador-desktop" : "simulador-mobile";

        const tryScroll = (attemptsLeft: number) => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (attemptsLeft > 0) {
            setTimeout(() => tryScroll(attemptsLeft - 1), 200);
          }
        };

        tryScroll(5);
      }
    } catch (error) {
      console.error("Error al procesar simulación desde hero:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xs mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <Form {...form}>
        <form id="lead_projection_id" onSubmit={form.handleSubmit(handleHeroFormSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-white/90">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-white/90">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pérez"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-white/90">Correo</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="juan@ejemplo.com"
                    {...field}
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-200 text-xs" />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-xs text-white/90">Teléfono</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="CO"
                    international
                    countryCallingCodeEditable={false}
                    disabled={isSubmitting}
                    className="phone-input-custom flex h-9 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50"
                    placeholder="300 123 4567"
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-xs font-medium text-red-200">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="howDidYouHearAboutUs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-white/90">¿Por dónde nos conociste?</FormLabel>
                <FormControl>
                  <NestedSelect
                    options={howDidYouHearAboutUsOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecciona"
                    disabled={isSubmitting}
                    className="w-full text-sm h-9"
                  />
                </FormControl>
                <FormMessage className="text-red-200 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#5352F6] mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs text-white/90">
                    Acepto los{" "}
                    <a href="/terminos-y-condiciones" target="_blank" className="underline">
                      términos
                    </a>
                  </FormLabel>
                  <FormMessage className="text-red-200 text-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5352F6] hover:bg-[#5352F6]/90 text-white font-semibold h-10 text-sm"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Procesando...
              </>
            ) : (
              "Ver mi proyección"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

