import React from "react";
import {
  Button,
  HeroSection,
  Navbar,
  Footer,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  BenefitCard,
  InvestmentCard,
  UserCard,
  StepsSection,
  StepsContainer,
  StepItem,
  Input,
  FormField,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  ProgressCircle,
  BarChart,
} from "@/components/design-system";
import {
  ArrowRight,
  Check,
  CreditCard,
  Home,
  Mail,
  Search,
  User,
  Users,
  Building,
  PieChart,
  LineChart,
  BarChart as BarChartIcon,
  Wallet,
  DollarSign,
  ChevronRight,
  Settings,
  Bell,
  Calendar,
  Clock,
  Star,
  Heart,
  Share,
  Bookmark,
  Trash,
  Edit,
  Plus,
  Minus,
  X,
} from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "#components", active: true },
          { label: "Tipografía", href: "#typography" },
          { label: "Colores", href: "#colors" },
          { label: "Iconos", href: "#icons" },
          { label: "Layouts", href: "#layouts" },
        ]}
        actions={
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm">Iniciar sesión</Button>
            <Button size="sm">Registrarse</Button>
          </div>
        }
      />

      <HeroSection
        title={
          <span>
            LOKL <span className="text-[#5352F6]">Design System</span>
          </span>
        }
        subtitle="Un sistema de diseño moderno, minimalista y profesional para la plataforma LOKL"
        className="bg-[#F5F5F5] text-black"
      >
        <Button>Explorar componentes</Button>
        <Button variant="secondary">Ver documentación</Button>
      </HeroSection>

      <section id="components" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Componentes UI</h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Componentes reutilizables diseñados para crear interfaces consistentes y de alta calidad
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Buttons Section */}
          <Card>
            <CardHeader>
              <CardTitle>Botones</CardTitle>
              <CardDescription>
                Diferentes variantes y tamaños para todas las necesidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 font-semibold">Variantes</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>Primario</Button>
                  <Button variant="secondary">Secundario</Button>
                  <Button variant="dark">Oscuro</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Tamaños</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Pequeño</Button>
                  <Button>Mediano</Button>
                  <Button size="lg">Grande</Button>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Con iconos</h4>
                <div className="flex flex-wrap gap-4">
                  <Button leftIcon={<Check />}>Con icono izquierdo</Button>
                  <Button rightIcon={<ArrowRight />}>Con icono derecho</Button>
                  <Button variant="secondary" leftIcon={<User />}>Perfil</Button>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold">Estados</h4>
                <div className="flex flex-wrap gap-4">
                  <Button>Normal</Button>
                  <Button className="opacity-90 hover:opacity-90">Hover</Button>
                  <Button disabled>Deshabilitado</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forms Section */}
          <Card>
            <CardHeader>
              <CardTitle>Formularios</CardTitle>
              <CardDescription>
                Campos de entrada y controles de formulario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 font-semibold">Inputs</h4>
                <div className="space-y-4">
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

                  <FormField label="Con error" htmlFor="error-input" error helperText="Este campo es obligatorio">
                    <Input id="error-input" placeholder="Campo con error" error />
                  </FormField>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Selects</h4>
                <div className="space-y-4">
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
                  
                  <FormField label="Con error" htmlFor="error-select" error helperText="Debes seleccionar una opción">
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
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Textarea</h4>
                <FormField label="Mensaje" htmlFor="message">
                  <Textarea id="message" placeholder="Escribe tu mensaje aquí" />
                </FormField>
                
                <FormField label="Con error" htmlFor="error-textarea" error helperText="Este campo no puede estar vacío">
                  <Textarea id="error-textarea" placeholder="Campo con error" error />
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Cards Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tarjetas</CardTitle>
              <CardDescription>
                Diferentes tipos de tarjetas para mostrar información
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h4 className="mb-3 font-semibold">Tarjeta básica</h4>
                <Card>
                  <CardHeader>
                    <CardTitle>Título de la tarjeta</CardTitle>
                    <CardDescription>Descripción de la tarjeta que explica su contenido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Contenido principal de la tarjeta con información relevante para el usuario.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost">Cancelar</Button>
                    <Button>Continuar</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Tarjeta de beneficio</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <BenefitCard
                    icon={<Home size={32} />}
                    title="Inversiones accesibles"
                    description="Comienza con montos desde $100.000 COP"
                  />
                  
                  <BenefitCard
                    icon={<PieChart size={32} />}
                    title="Rentabilidad garantizada"
                    description="Retornos anuales de hasta 14%"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Tarjeta de inversión</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InvestmentCard
                    price="$500.000"
                    title="Bono Estándar"
                    description="Rentabilidad anual del 12%"
                  />
                  
                  <InvestmentCard
                    price="$1.000.000"
                    title="Bono Premium"
                    description="Rentabilidad anual del 14%"
                    ctaText="Invertir ahora"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Tarjeta de usuario</h4>
                <div className="space-y-4">
                  <UserCard
                    avatar={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5352F6] text-white"><User /></div>}
                    name="Carlos Rodríguez"
                    role="Inversionista"
                    actions={<Button variant="outline" size="sm">Ver perfil</Button>}
                  />
                  
                  <UserCard
                    avatar={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"><Users /></div>}
                    name="María González"
                    role="Administradora"
                    actions={
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Mensaje</Button>
                        <Button size="sm">Seguir</Button>
                      </div>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Gráficos</CardTitle>
              <CardDescription>
                Visualización de datos y progreso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h4 className="mb-3 font-semibold">Círculos de progreso</h4>
                <div className="flex flex-wrap items-center justify-around gap-6">
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={75}
                      label={<span className="text-lg font-bold">75%</span>}
                    />
                    <p className="mt-2 text-sm text-[#6D6C6C]">Progreso estándar</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={40}
                      size={80}
                      strokeWidth={6}
                      color="#000000"
                      label={<span className="text-sm font-bold">40%</span>}
                    />
                    <p className="mt-2 text-sm text-[#6D6C6C]">Tamaño pequeño</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={90}
                      size={150}
                      strokeWidth={10}
                      color="#5352F6"
                      backgroundColor="#E5E5E5"
                      label={<span className="text-2xl font-bold">90%</span>}
                    />
                    <p className="mt-2 text-sm text-[#6D6C6C]">Tamaño grande</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-semibold">Gráficos de barras</h4>
                <div className="space-y-8">
                  <div>
                    <h5 className="mb-2 text-sm font-medium">Rendimiento mensual</h5>
                    <BarChart
                      data={[
                        { label: "Ene", value: 45, color: "#5352F6" },
                        { label: "Feb", value: 60, color: "#7A79F9" },
                        { label: "Mar", value: 30, color: "#A1A0FB" },
                        { label: "Abr", value: 80, color: "#5352F6" },
                        { label: "May", value: 55, color: "#7A79F9" },
                        { label: "Jun", value: 70, color: "#A1A0FB" },
                      ]}
                    />
                  </div>
                  
                  <div>
                    <h5 className="mb-2 text-sm font-medium">Comparativa de inversiones</h5>
                    <BarChart
                      data={[
                        { label: "Proyecto A", value: 85, color: "#5352F6" },
                        { label: "Proyecto B", value: 65, color: "#000000" },
                        { label: "Proyecto C", value: 45, color: "#7A79F9" },
                        { label: "Proyecto D", value: 90, color: "#5352F6" },
                      ]}
                      height={180}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="layouts" className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Componentes de Layout</h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Secciones y estructuras para construir páginas completas
            </p>
          </div>
          
          <div className="space-y-16">
            <div>
              <h3 className="mb-6 text-2xl font-bold">Hero Sections</h3>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Hero con fondo de color</h4>
                  <div className="overflow-hidden rounded-lg">
                    <HeroSection
                      title={<span>Invierte en el <span className="text-[#5352F6]">futuro inmobiliario</span></span>}
                      subtitle="Accede a las mejores oportunidades de inversión con montos accesibles"
                      className="min-h-[40vh] bg-[#F5F5F5]"
                    >
                      <Button>Comenzar ahora</Button>
                      <Button variant="secondary">Conocer más</Button>
                    </HeroSection>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 font-semibold">Hero con fondo oscuro</h4>
                  <div className="overflow-hidden rounded-lg">
                    <HeroSection
                      title={<span className="text-white">Sé parte de la <span className="text-[#5352F6]">revolución inmobiliaria</span></span>}
                      subtitle={<span className="text-white">Democratizando el acceso a inversiones de alto rendimiento</span>}
                      className="min-h-[40vh] bg-black"
                      align="center"
                    >
                      <Button>Invertir ahora</Button>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        Ver proyectos
                      </Button>
                    </HeroSection>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-6 text-2xl font-bold">Secciones de pasos</h3>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Pasos horizontales</h4>
                  <StepsSection
                    title={<span>Cómo <span className="text-[#5352F6]">funciona</span></span>}
                    subtitle="Proceso simple y transparente para invertir en LOKL"
                    variant="default"
                  >
                    <StepsContainer>
                      <StepItem
                        number={1}
                        title="Regístrate"
                        description="Crea tu cuenta en menos de 2 minutos"
                      />
                      <StepItem
                        number={2}
                        title="Selecciona un proyecto"
                        description="Explora las diferentes opciones de inversión"
                      />
                      <StepItem
                        number={3}
                        title="Invierte"
                        description="Realiza tu inversión de forma segura"
                      />
                    </StepsContainer>
                  </StepsSection>
                </div>
                
                <div>
                  <h4 className="mb-3 font-semibold">Pasos con iconos</h4>
                  <StepsSection
                    title="Proceso de inversión"
                    subtitle="Tres simples pasos para comenzar"
                    variant="gray"
                  >
                    <StepsContainer>
                      <StepItem
                        icon={<User size={24} />}
                        title="Crea tu perfil"
                        description="Completa tu información personal"
                      />
                      <StepItem
                        icon={<Building size={24} />}
                        title="Elige un proyecto"
                        description="Selecciona el que mejor se adapte a tus objetivos"
                      />
                      <StepItem
                        icon={<Wallet size={24} />}
                        title="Financia"
                        description="Realiza tu inversión y comienza a ganar"
                      />
                    </StepsContainer>
                  </StepsSection>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-6 text-2xl font-bold">Footer</h3>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold">Footer completo</h4>
                  <div className="overflow-hidden rounded-lg">
                    <Footer variant="default" />
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 font-semibold">Footer simple</h4>
                  <div className="overflow-hidden rounded-lg">
                    <Footer variant="simple" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="typography" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Tipografía</h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Sistema tipográfico basado en Inter con diferentes pesos y tamaños
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="mb-2 text-5xl font-black tracking-tight">Heading 1</h1>
            <p className="text-[#6D6C6C]">Inter Black / 56px / -38 tracking</p>
          </div>
          
          <div>
            <h2 className="mb-2 text-4xl font-extrabold tracking-tight">Heading 2</h2>
            <p className="text-[#6D6C6C]">Inter ExtraBold / 48px / -38 tracking</p>
          </div>
          
          <div>
            <h3 className="mb-2 text-3xl font-bold tracking-tight">Heading 3</h3>
            <p className="text-[#6D6C6C]">Inter Bold / 40px / -38 tracking</p>
          </div>
          
          <div>
            <h4 className="mb-2 text-2xl font-semibold tracking-tight">Heading 4</h4>
            <p className="text-[#6D6C6C]">Inter SemiBold / 32px / -38 tracking</p>
          </div>
          
          <div>
            <h5 className="mb-2 text-xl font-semibold tracking-tight">Heading 5</h5>
            <p className="text-[#6D6C6C]">Inter SemiBold / 24px / -38 tracking</p>
          </div>
          
          <div>
            <p className="mb-2 text-lg">Body Large</p>
            <p className="text-[#6D6C6C]">Inter Regular / 20px / normal</p>
          </div>
          
          <div>
            <p className="mb-2">Body</p>
            <p className="text-[#6D6C6C]">Inter Regular / 16px / normal</p>
          </div>
          
          <div>
            <p className="mb-2 text-sm">Small</p>
            <p className="text-[#6D6C6C]">Inter Regular / 14px / normal</p>
          </div>
          
          <div>
            <p className="mb-2 text-xs">Caption</p>
            <p className="text-[#6D6C6C]">Inter Regular / 12px / normal</p>
          </div>
        </div>
      </section>

      <section id="colors" className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Paleta de colores</h2>
            <p className="mx-auto max-w-2xl text-[#6D6C6C]">
              Colores principales y secundarios que definen la identidad visual de LOKL
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#5352F6]"></div>
              <p className="font-semibold">Púrpura primario</p>
              <p className="text-sm text-[#6D6C6C]">#5352F6</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-black"></div>
              <p className="font-semibold">Negro</p>
              <p className="text-sm text-[#6D6C6C]">#000000</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#FAFAFA] border border-[#E5E5E5]"></div>
              <p className="font-semibold">Blanco</p>
              <p className="text-sm text-[#6D6C6C]">#FAFAFA</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#0F0F0F]"></div>
              <p className="font-semibold">Gris oscuro</p>
              <p className="text-sm text-[#6D6C6C]">#0F0F0F</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#444444]"></div>
              <p className="font-semibold">Gris medio</p>
              <p className="text-sm text-[#6D6C6C]">#444444</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#6D6C6C]"></div>
              <p className="font-semibold">Gris</p>
              <p className="text-sm text-[#6D6C6C]">#6D6C6C</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#919090]"></div>
              <p className="font-semibold">Gris claro</p>
              <p className="text-sm text-[#6D6C6C]">#919090</p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 h-24 rounded-md bg-[#D1D1D1]"></div>
              <p className="font-semibold">Gris muy claro</p>
              <p className="text-sm text-[#6D6C6C]">#D1D1D1</p>
            </div>
          </div>
        </div>
      </section>

      <section id="icons" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Iconografía</h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Iconos lineales minimalistas para una experiencia visual coherente
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {[
            User, Users, Home, Building, CreditCard, Wallet, 
            DollarSign, PieChart, LineChart, BarChartIcon, 
            Search, Mail, Calendar, Clock, Settings, Bell,
            Star, Heart, Share, Bookmark, Edit, Trash,
            Plus, Minus, X, ChevronRight, ArrowRight, Check
          ].map((Icon, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F5]">
                <Icon size={32} className="text-[#5352F6]" />
              </div>
              <p className="text-sm font-medium">{Icon.displayName || `Icon ${index + 1}`}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer variant="default" />
    </div>
  );
}