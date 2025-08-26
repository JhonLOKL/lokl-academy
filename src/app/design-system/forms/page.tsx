"use client";

import React from "react";
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
  Button 
} from "@/components/design-system";
import { Mail, Search } from "lucide-react";

export default function FormsPage() {
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
          <h2 className="mb-6 text-2xl font-bold">Estados de Validación</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-md space-y-6">
              <FormField label="Campo Válido" htmlFor="valid-input" helperText="Este campo es válido">
                <Input id="valid-input" placeholder="Campo válido" />
              </FormField>

              <FormField label="Campo con Error" htmlFor="error-input" error helperText="Este campo es obligatorio">
                <Input id="error-input" placeholder="Campo con error" error />
              </FormField>
              
              <FormField label="Select con Error" htmlFor="error-select" error helperText="Debes seleccionar una opción">
                <Select>
                  <SelectTrigger id="error-select" error>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Opción 1</SelectItem>
                    <SelectItem value="option2">Opción 2</SelectItem>
                    <SelectItem value="option3">Opción 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              
              <FormField label="Textarea con Error" htmlFor="error-textarea" error helperText="Este campo no puede estar vacío">
                <Textarea id="error-textarea" placeholder="Campo con error" error />
              </FormField>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Estados de validación para campos de formulario, mostrando mensajes de ayuda y errores.
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
          <h2 className="mb-6 text-2xl font-bold">Formularios Completos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="max-w-md">
              <h3 className="mb-6 text-xl font-semibold">Formulario de Registro</h3>
              <form className="space-y-6">
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
                
                <FormField label="Contraseña" htmlFor="register-password" required>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                  />
                </FormField>
                
                <FormField label="Tipo de inversionista" htmlFor="investor-type" required>
                  <Select>
                    <SelectTrigger id="investor-type">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Empresa</SelectItem>
                      <SelectItem value="institutional">Institucional</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Registrarse</Button>
                </div>
              </form>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Ejemplo de formulario completo con múltiples tipos de campos y botones de acción.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
