"use client";

import React, { useState } from "react";
import {
  Navbar,
  Footer,
  Button,
  Modal,
  ConfirmDialog,
  SideDrawer,
  useToast,
  NotificationToaster,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  InfoTooltip,
  Input,
  FormField,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/design-system";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  MessageSquare,
  PanelRight,
  Settings,
  X,
} from "lucide-react";

export default function ModalsPage() {
  // Estados para controlar la apertura de los modales
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  
  // Hook para mostrar notificaciones
  const { toast } = useToast();

  // Función para mostrar diferentes tipos de notificaciones
  const showToast = (variant: "default" | "destructive" | "success" | "info" | "warning") => {
    const toastConfig = {
      default: {
        title: "Notificación",
        description: "Esta es una notificación estándar",
        icon: <MessageSquare className="h-4 w-4" />,
      },
      destructive: {
        title: "Error",
        description: "Ha ocurrido un error en la operación",
        variant: "destructive" as const,
        icon: <X className="h-4 w-4" />,
      },
      success: {
        title: "Éxito",
        description: "La operación se ha completado correctamente",
        variant: "success" as const,
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      info: {
        title: "Información",
        description: "Aquí tienes información importante",
        variant: "info" as const,
        icon: <Info className="h-4 w-4" />,
      },
      warning: {
        title: "Advertencia",
        description: "Ten cuidado con esta acción",
        variant: "warning" as const,
        icon: <AlertCircle className="h-4 w-4" />,
      },
    };

    const config = toastConfig[variant];
    toast({
      ...config,
      action: variant !== "destructive" ? (
        <Button variant="outline" size="sm" onClick={() => toast({ description: "Acción ejecutada" })}>
          Acción
        </Button>
      ) : undefined,
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar
          logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
          items={[
            { label: "Componentes", href: "/design-system" },
            { label: "Botones", href: "/design-system/buttons" },
            { label: "Formularios", href: "/design-system/forms" },
            { label: "Tarjetas", href: "/design-system/cards" },
            { label: "Gráficos", href: "/design-system/charts" },
            { label: "Layouts", href: "/design-system/layouts" },
            { label: "Colores", href: "/design-system/colors" },
            { label: "Iconos", href: "/design-system/icons" },
            { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
            { label: "Tipografía", href: "/design-system/typography" },
            { label: "Dashboard", href: "/design-system/dashboard" },
            { label: "Modales", href: "/design-system/modals", active: true },
          ]}
        />

        <main className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Modales y Pop-ups LOKL</h1>
            <p className="text-[#6D6C6C] max-w-3xl">
              Componentes interactivos para mostrar información, formularios y confirmaciones en capas superpuestas.
            </p>
          </div>

          {/* Modales Básicos */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Modales Básicos</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Simple</CardTitle>
                  <CardDescription>Modal básico con título y contenido</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Utiliza este modal para mostrar información simple al usuario.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setBasicModalOpen(true)}>Abrir Modal</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modal con Formulario</CardTitle>
                  <CardDescription>Modal con campos de entrada</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Ideal para formularios cortos que no requieren una página completa.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setFormModalOpen(true)}>Abrir Modal</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modal de Éxito</CardTitle>
                  <CardDescription>Modal con estilo de éxito</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Muestra confirmación visual de una acción completada.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setSuccessModalOpen(true)}>Abrir Modal</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Modales */}
            <Modal
              open={basicModalOpen}
              onOpenChange={setBasicModalOpen}
              title="Información del Proyecto"
              description="Detalles sobre el proyecto inmobiliario"
              footer={
                <div className="flex justify-end">
                  <Button onClick={() => setBasicModalOpen(false)}>Cerrar</Button>
                </div>
              }
            >
              <div className="space-y-4">
                <p>
                  Este proyecto inmobiliario ofrece una oportunidad única de inversión con un retorno estimado del 15% anual.
                </p>
                <p>
                  Ubicado en una zona de alto crecimiento, cuenta con todas las características para convertirse en una inversión exitosa.
                </p>
              </div>
            </Modal>

            <Modal
              open={formModalOpen}
              onOpenChange={setFormModalOpen}
              title="Registrar Interés"
              description="Complete el formulario para recibir más información"
              size="md"
              footer={
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setFormModalOpen(false)}>Cancelar</Button>
                  <Button onClick={() => {
                    setFormModalOpen(false);
                    showToast("success");
                  }}>Enviar</Button>
                </div>
              }
            >
              <div className="space-y-4">
                <FormField label="Nombre completo" htmlFor="name">
                  <Input id="name" placeholder="Ingrese su nombre" />
                </FormField>
                <FormField label="Correo electrónico" htmlFor="email">
                  <Input id="email" type="email" placeholder="ejemplo@correo.com" />
                </FormField>
                <FormField label="Monto de inversión" htmlFor="amount">
                  <Input id="amount" type="number" placeholder="$" />
                </FormField>
              </div>
            </Modal>

            <Modal
              open={successModalOpen}
              onOpenChange={setSuccessModalOpen}
              title="¡Inversión Exitosa!"
              description="Tu inversión ha sido procesada correctamente"
              variant="success"
              footer={
                <Button onClick={() => setSuccessModalOpen(false)}>Entendido</Button>
              }
            >
              <div className="flex flex-col items-center py-4">
                <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
                <p className="text-center">
                  Hemos recibido tu inversión de $500,000. Pronto recibirás un correo con todos los detalles.
                </p>
              </div>
            </Modal>
          </section>

          {/* Diálogos de Confirmación */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Diálogos de Confirmación</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Confirmación Estándar</CardTitle>
                  <CardDescription>Diálogo para confirmar acciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Solicita confirmación al usuario antes de proceder con una acción importante.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setConfirmDialogOpen(true)}>Confirmar Acción</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confirmación de Eliminación</CardTitle>
                  <CardDescription>Diálogo para acciones destructivas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Solicita confirmación adicional para acciones que no se pueden deshacer.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="border-[#ff5c5c] text-[#ff5c5c] hover:bg-red-50" onClick={() => setDeleteDialogOpen(true)}>Eliminar Proyecto</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Diálogos de confirmación */}
            <ConfirmDialog
              open={confirmDialogOpen}
              onOpenChange={setConfirmDialogOpen}
              title="Confirmar Inversión"
              description="¿Estás seguro de que deseas proceder con esta inversión?"
              confirmText="Confirmar"
              cancelText="Cancelar"
              onConfirm={() => {
                setConfirmDialogOpen(false);
                showToast("success");
              }}
            />

            <ConfirmDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              title="Eliminar Proyecto"
              description="Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este proyecto?"
              confirmText="Eliminar"
              cancelText="Cancelar"
              variant="destructive"
              confirmVariant="destructive"
              onConfirm={() => {
                setDeleteDialogOpen(false);
                showToast("destructive");
              }}
            />
          </section>

          {/* Drawers (Paneles) */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Drawers (Paneles)</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Panel Inferior</CardTitle>
                  <CardDescription>Panel que se desliza desde abajo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Ideal para acciones contextuales en dispositivos móviles.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setBottomDrawerOpen(true)}>Abrir Panel</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Panel Derecho</CardTitle>
                  <CardDescription>Panel que se desliza desde la derecha</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Perfecto para mostrar detalles adicionales o configuraciones.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setRightDrawerOpen(true)}>Abrir Panel</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Panel Izquierdo</CardTitle>
                  <CardDescription>Panel que se desliza desde la izquierda</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Ideal para menús de navegación o filtros.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setLeftDrawerOpen(true)}>Abrir Panel</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Drawers */}
            <SideDrawer
              open={bottomDrawerOpen}
              onOpenChange={setBottomDrawerOpen}
              title="Opciones Rápidas"
              description="Selecciona una acción para continuar"
              side="bottom"
              footer={
                <Button onClick={() => setBottomDrawerOpen(false)}>Cerrar</Button>
              }
            >
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2">
                  <CheckCircle2 className="h-6 w-6" />
                  <span>Confirmar</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2">
                  <Settings className="h-6 w-6" />
                  <span>Configurar</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2">
                  <Info className="h-6 w-6" />
                  <span>Información</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center gap-2">
                  <HelpCircle className="h-6 w-6" />
                  <span>Ayuda</span>
                </Button>
              </div>
            </SideDrawer>

            <SideDrawer
              open={rightDrawerOpen}
              onOpenChange={setRightDrawerOpen}
              title="Configuración"
              description="Ajusta las preferencias de tu cuenta"
              side="right"
              size="lg"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Perfil</h3>
                  <FormField label="Nombre de usuario" htmlFor="username">
                    <Input id="username" defaultValue="usuario_lokl" />
                  </FormField>
                  <FormField label="Correo electrónico" htmlFor="email-settings">
                    <Input id="email-settings" defaultValue="usuario@lokl.com" />
                  </FormField>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notificaciones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Correos electrónicos</p>
                        <p className="text-sm text-[#6D6C6C]">Recibe actualizaciones por correo</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificaciones push</p>
                        <p className="text-sm text-[#6D6C6C]">Alertas en tiempo real</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </SideDrawer>

            <SideDrawer
              open={leftDrawerOpen}
              onOpenChange={setLeftDrawerOpen}
              title="Navegación"
              side="left"
              size="sm"
            >
              <div className="space-y-4">
                <div className="py-2">
                  <h3 className="mb-2 px-4 text-lg font-semibold">Menú</h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">Inicio</Button>
                    <Button variant="ghost" className="w-full justify-start">Proyectos</Button>
                    <Button variant="ghost" className="w-full justify-start">Inversiones</Button>
                    <Button variant="ghost" className="w-full justify-start">Perfil</Button>
                    <Button variant="ghost" className="w-full justify-start">Configuración</Button>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <h3 className="mb-2 text-lg font-semibold">Filtros</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">Todos</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">Residencial</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">Comercial</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">Mixto</Button>
                  </div>
                </div>
              </div>
            </SideDrawer>
          </section>

          {/* Notificaciones (Toasts) */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Notificaciones (Toasts)</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
              <Card>
                <CardHeader>
                  <CardTitle>Notificación Estándar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Notificación básica con título y descripción.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => showToast("default")}>Mostrar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificación de Éxito</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Confirma que una acción se completó correctamente.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => showToast("success")}>Mostrar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificación de Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Alerta sobre un error o problema.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => showToast("destructive")}>Mostrar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificación de Información</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Proporciona información adicional al usuario.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => showToast("info")}>Mostrar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificación de Advertencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6D6C6C]">
                    Advierte sobre posibles problemas.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => showToast("warning")}>Mostrar</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Tooltips */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Tooltips</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip Básico</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Pasa el cursor</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Información adicional
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tooltip Informativo</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                  <InfoTooltip
                    trigger={
                      <Button variant="outline" className="gap-2">
                        <Info className="h-4 w-4" />
                        <span>Ayuda</span>
                      </Button>
                    }
                    title="Información Importante"
                    description="Este tooltip proporciona detalles adicionales sobre la funcionalidad."
                    icon={<Info className="h-4 w-4" />}
                    variant="info"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tooltip de Advertencia</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                  <InfoTooltip
                    trigger={
                      <Button variant="outline" className="gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Advertencia</span>
                      </Button>
                    }
                    title="¡Atención!"
                    description="Esta acción podría tener consecuencias importantes."
                    icon={<AlertCircle className="h-4 w-4" />}
                    variant="warning"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Tooltips en Contexto</h3>
              <div className="flex flex-wrap items-center gap-4">
                <InfoTooltip
                  trigger={<Info className="h-5 w-5 text-[#5352F6] cursor-help" />}
                  title="ROI"
                  description="Retorno de Inversión: Porcentaje que indica la rentabilidad de tu inversión."
                />

                <span className="text-[#6D6C6C]">|</span>

                <InfoTooltip
                  trigger={<span className="text-[#5352F6] underline cursor-help">Términos y condiciones</span>}
                  description="Al invertir, aceptas nuestros términos y condiciones de servicio."
                />

                <span className="text-[#6D6C6C]">|</span>

                <InfoTooltip
                  trigger={<Button size="sm" variant="ghost" className="gap-2"><Settings className="h-4 w-4" /> Configuración</Button>}
                  title="Configuración"
                  description="Ajusta tus preferencias de notificaciones y perfil."
                  side="bottom"
                />
              </div>
            </div>
          </section>
        </main>

        <Footer variant="simple" />
      </div>
      
      {/* Toaster para las notificaciones */}
      <NotificationToaster />
    </TooltipProvider>
  );
}

