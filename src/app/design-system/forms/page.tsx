"use client";

import React, { useState } from "react";
import { 
  Navbar, 
  Footer, 
  Input, 
  FormField, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem, 
  Textarea,
  Button,
  RadioGroup,
  RadioItem,
  Checkbox,
  CheckboxItem,
  Switch,
  SwitchItem,
  DatePicker,
  DateRangePicker,
  Slider,
  RangeSlider
} from "@/components/design-system";
import { Mail, Search, Building, Home, Hotel, Briefcase } from "lucide-react";

export default function FormsPage() {
  // Estados para los componentes interactivos
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<number[]>([25, 75]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons" },
          { label: "Formularios", href: "/design-system/forms", active: true },
          { label: "Tarjetas", href: "/design-system/cards" },
          { label: "Gráficos", href: "/design-system/charts" },
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Formularios LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de formulario diseñados para una experiencia de usuario intuitiva y accesible, con diferentes variantes y estados.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Campos de Texto</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-md space-y-6">
              <FormField label="Nombre" htmlFor="name">
                <Input id="name" placeholder="Ingresa tu nombre" />
              </FormField>
              
              <FormField label="Email" htmlFor="email" required>
                <Input id="email" type="email" placeholder="ejemplo@lokl.com" icon={<Mail size={18} />} />
              </FormField>
              
              <FormField label="Contraseña" htmlFor="password" required>
                <Input id="password" type="password" placeholder="********" />
              </FormField>

              <FormField label="Búsqueda" htmlFor="search">
                <Input id="search" placeholder="Buscar..." icon={<Search size={18} />} />
              </FormField>

              <FormField label="Deshabilitado" htmlFor="disabled-input">
                <Input id="disabled-input" placeholder="Campo deshabilitado" disabled />
              </FormField>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Campos de texto con diferentes configuraciones: estándar, con iconos, requeridos y deshabilitados.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Radio Buttons</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Tipo de Inversión Preferida</h3>
                <RadioGroup defaultValue="residential" className="space-y-4">
                  <RadioItem 
                    id="residential" 
                    value="residential" 
                    label="Residencial" 
                    description="Apartamentos, casas y condominios para vivir"
                  />
                  <RadioItem 
                    id="commercial" 
                    value="commercial" 
                    label="Comercial" 
                    description="Oficinas, locales comerciales y centros empresariales"
                  />
                  <RadioItem 
                    id="hospitality" 
                    value="hospitality" 
                    label="Hospitalario" 
                    description="Hoteles, resorts y proyectos turísticos"
                  />
                  <RadioItem 
                    id="mixed" 
                    value="mixed" 
                    label="Mixto" 
                    description="Desarrollos que combinan múltiples usos"
                  />
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Perfil de Riesgo</h3>
                <RadioGroup defaultValue="moderate" className="space-y-4">
                  <RadioItem 
                    id="conservative" 
                    value="conservative" 
                    label="Conservador" 
                    description="Rentabilidad estable con bajo riesgo (8-12% anual)"
                  />
                  <RadioItem 
                    id="moderate" 
                    value="moderate" 
                    label="Moderado" 
                    description="Balance entre rentabilidad y riesgo (12-16% anual)"
                  />
                  <RadioItem 
                    id="aggressive" 
                    value="aggressive" 
                    label="Agresivo" 
                    description="Alta rentabilidad con mayor riesgo (16-24% anual)"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Radio buttons para selección única entre múltiples opciones, con etiquetas y descripciones.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Checkboxes</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Preferencias de Comunicación</h3>
                <div className="space-y-4">
                  <CheckboxItem 
                    id="push-notifications" 
                    label="Notificaciones Push" 
                    description="Recibe alertas sobre nuevas oportunidades de inversión"
                    defaultChecked
                  />
                  <CheckboxItem 
                    id="email-updates" 
                    label="Actualizaciones por Email" 
                    description="Reportes mensuales y análisis de mercado"
                    defaultChecked
                  />
                  <CheckboxItem 
                    id="sms-alerts" 
                    label="Alertas SMS" 
                    description="Notificaciones urgentes por mensaje de texto"
                    defaultChecked
                  />
                  <CheckboxItem 
                    id="auto-invest" 
                    label="Inversión Automática" 
                    description="Invierte automáticamente según tus criterios preestablecidos"
                  />
                  <CheckboxItem 
                    id="decentralized" 
                    label="Opción Descentralizada" 
                    description="Esta función estará disponible próximamente"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Documentos Requeridos</h3>
                <div className="space-y-4">
                  <CheckboxItem 
                    id="id-document" 
                    label="Documento de Identidad" 
                    description="Cédula, pasaporte o documento equivalente"
                    defaultChecked
                  />
                  <CheckboxItem 
                    id="income-proof" 
                    label="Comprobante de Ingresos" 
                    description="Últimos 3 recibos de nómina o declaración de renta"
                  />
                  <CheckboxItem 
                    id="bank-statements" 
                    label="Estados de Cuenta" 
                    description="Estados bancarios de los últimos 3 meses"
                  />
                  <CheckboxItem 
                    id="terms-conditions" 
                    label="Términos y Condiciones" 
                    description="Acepto los términos y condiciones del servicio"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Checkboxes para selección múltiple, con diferentes estados y descripciones detalladas.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Switches / Toggles</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <SwitchItem 
                  id="dark-mode" 
                  label="Modo Oscuro" 
                  description="Cambiar a tema oscuro para mejor visualización nocturna"
                />
                
                <SwitchItem 
                  id="two-factor" 
                  label="Autenticación de Dos Factores" 
                  description="Aumenta la seguridad de tu cuenta"
                  defaultChecked
                />
                
                <SwitchItem 
                  id="auto-invest" 
                  label="Inversión Automática" 
                  description="Invierte automáticamente según tus criterios"
                />
              </div>
              
              <div className="space-y-6">
                <SwitchItem 
                  id="market-alerts" 
                  label="Alertas de Mercado" 
                  description="Recibe notificaciones sobre cambios importantes"
                  defaultChecked
                />
                
                <SwitchItem 
                  id="premium" 
                  label="Función Premium" 
                  description="Disponible solo para usuarios premium"
                  disabled
                />
                
                <SwitchItem 
                  id="notifications" 
                  label="Notificaciones" 
                  description="Recibe actualizaciones sobre tus inversiones"
                  defaultChecked
                />
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Switches para activar o desactivar funciones, con diseño moderno y estados visuales claros.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Selects</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-md space-y-6">
              <FormField label="Tipo de inversión" htmlFor="investment-type">
                <Select>
                  <SelectTrigger id="investment-type">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Inmobiliaria</SelectItem>
                    <SelectItem value="bonds">Bonos</SelectItem>
                    <SelectItem value="stocks">Acciones</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              
              <FormField label="Plazo de inversión" htmlFor="investment-term">
                <Select>
                  <SelectTrigger id="investment-term">
                    <SelectValue placeholder="Selecciona un plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Corto plazo (1-3 años)</SelectItem>
                    <SelectItem value="medium">Mediano plazo (3-5 años)</SelectItem>
                    <SelectItem value="long">Largo plazo (5+ años)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              
              <FormField label="Select Deshabilitado" htmlFor="disabled-select">
                <Select disabled>
                  <SelectTrigger id="disabled-select">
                    <SelectValue placeholder="No disponible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Opción 1</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Componentes Select para selección de opciones en diferentes estados.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Calendario / Date Picker</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Fecha de Inicio de Inversión</h3>
                <DatePicker 
                  date={date} 
                  setDate={setDate} 
                  placeholder="Selecciona una fecha"
                />
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Rango de Fechas</h3>
                <DateRangePicker 
                  dateRange={dateRange} 
                  setDateRange={setDateRange} 
                  placeholder="Selecciona un rango de fechas"
                />
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Selectores de fecha con calendario integrado, para fechas individuales o rangos.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Sliders / Controles Deslizantes</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="space-y-12">
              <div>
                <RangeSlider
                  label="Monto de Inversión"
                  min={10000}
                  max={500000}
                  step={10000}
                  defaultValue={[50000]}
                  value={[sliderValue]}
                  onValueChange={(value) => setSliderValue(value[0])}
                  valuePrefix="$"
                  valueSuffix=" COP"
                  minLabel="$10.000 COP"
                  maxLabel="$500.000 COP"
                  className="max-w-xl"
                />
              </div>
              
              <div>
                <RangeSlider
                  label="Rango de Edad Objetivo"
                  min={18}
                  max={65}
                  step={1}
                  defaultValue={[25, 45]}
                  value={rangeValue}
                  onValueChange={setRangeValue}
                  valueSuffix=" años"
                  minLabel="18 años"
                  maxLabel="65 años"
                  className="max-w-xl"
                />
              </div>
              
              <div>
                <RangeSlider
                  label="Nivel de Riesgo"
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={[5]}
                  minLabel="Bajo"
                  maxLabel="Alto"
                  className="max-w-xl"
                />
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Controles deslizantes para selección de valores numéricos o rangos, con etiquetas y valores mostrados.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Áreas de Texto</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-md space-y-6">
              <FormField label="Mensaje" htmlFor="message">
                <Textarea id="message" placeholder="Escribe tu mensaje aquí" />
              </FormField>
              
              <FormField label="Descripción" htmlFor="description">
                <Textarea 
                  id="description" 
                  placeholder="Describe tu proyecto de inversión" 
                  rows={5}
                />
              </FormField>
              
              <FormField label="Textarea Deshabilitado" htmlFor="disabled-textarea">
                <Textarea 
                  id="disabled-textarea" 
                  placeholder="No disponible" 
                  disabled
                />
              </FormField>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Áreas de texto para entrada de contenido extenso, con diferentes alturas y estados.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Formulario Completo de Perfil de Inversión</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold">Perfil de Inversión</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField label="Nombre completo" htmlFor="full-name" required>
                    <Input id="full-name" placeholder="Ingresa tu nombre completo" />
                  </FormField>
                  
                  <FormField label="Email" htmlFor="register-email" required>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="ejemplo@lokl.com" 
                      icon={<Mail size={18} />} 
                    />
                  </FormField>
                </div>
                
                <div>
                  <h4 className="mb-3 text-base font-medium">Tipo de Inversión Preferida</h4>
                  <RadioGroup defaultValue="residential" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <RadioItem 
                      id="residential-option" 
                      value="residential" 
                      label="Residencial" 
                      description="Apartamentos, casas y condominios"
                    />
                    <RadioItem 
                      id="commercial-option" 
                      value="commercial" 
                      label="Comercial" 
                      description="Oficinas y locales comerciales"
                    />
                    <RadioItem 
                      id="hospitality-option" 
                      value="hospitality" 
                      label="Hospitalario" 
                      description="Hoteles y proyectos turísticos"
                    />
                    <RadioItem 
                      id="mixed-option" 
                      value="mixed" 
                      label="Mixto" 
                      description="Desarrollos de uso múltiple"
                    />
                  </RadioGroup>
                </div>
                
                <div>
                  <h4 className="mb-3 text-base font-medium">Preferencias de Comunicación</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CheckboxItem 
                      id="push-notifications-option" 
                      label="Notificaciones Push" 
                      defaultChecked
                    />
                    <CheckboxItem 
                      id="email-updates-option" 
                      label="Actualizaciones por Email" 
                      defaultChecked
                    />
                    <CheckboxItem 
                      id="sms-alerts-option" 
                      label="Alertas SMS" 
                    />
                    <CheckboxItem 
                      id="auto-invest-option" 
                      label="Inversión Automática" 
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 text-base font-medium">Configuración</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SwitchItem 
                      id="two-factor-option" 
                      label="Autenticación de Dos Factores" 
                      defaultChecked
                    />
                    <SwitchItem 
                      id="market-alerts-option" 
                      label="Alertas de Mercado" 
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 text-base font-medium">Monto de Inversión</h4>
                  <RangeSlider
                    min={10000}
                    max={500000}
                    step={10000}
                    defaultValue={[50000]}
                    valuePrefix="$"
                    valueSuffix=" COP"
                    minLabel="$10.000 COP"
                    maxLabel="$500.000 COP"
                  />
                </div>
                
                <div>
                  <h4 className="mb-3 text-base font-medium">Fecha de Inicio</h4>
                  <DatePicker 
                    date={date} 
                    setDate={setDate} 
                    placeholder="Selecciona una fecha de inicio"
                  />
                </div>
                
                <FormField label="Objetivos de Inversión" htmlFor="investment-goals">
                  <Textarea 
                    id="investment-goals" 
                    placeholder="Describe tus objetivos de inversión" 
                    rows={3}
                  />
                </FormField>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar Perfil</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}