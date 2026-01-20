export interface FAQ {
  id: number;
  category: string;
  icon: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  // Riesgos (10)
  {
    id: 51,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Qué riesgos existen en una inversión inmobiliaria?",
    answer:
      "Como toda inversión, el sector inmobiliario implica riesgos asociados al mercado, la ejecución del proyecto y la liquidez del activo. En LOKL lo entendemos bien. Por eso, antes de abrir cualquier oportunidad a nuestra comunidad, aplicamos un riguroso proceso de curaduría: analizamos el potencial del activo, su trazabilidad operativa y su impacto en el entorno. Solo trabajamos con proyectos verificados, y divulgamos de forma transparente los riesgos para que cada inversionista tome decisiones con claridad y respaldo.\n\nNuestro compromiso no es eliminar el riesgo, sino ayudarte a gestionarlo con información, acompañamiento y visión de largo plazo.",
  },
  {
    id: 52,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Puedo perder parte o la totalidad de mi inversión?",
    answer:
      "Sí, como en cualquier inversión, existe el riesgo de pérdida parcial o total del capital. Es parte natural del mundo de las inversiones.\n\n👉 ¿Qué hacemos en LOKL para reducir ese riesgo?\n\nCuraduría rigurosa:\nNo todos los proyectos entran a la plataforma. Solo trabajamos con desarrollos verificados, con alta demanda, ubicación estratégica y modelos de negocio sostenibles.\n\nTransparencia total:\nAntes de invertir, te mostramos proyecciones, riesgos, plazos y condiciones. Nada está escondido.\n\nSeguimiento y tecnología:\nPuedes monitorear en tiempo real cómo va tu inversión, desde la etapa de construcción hasta la operación.\n\nOpciones de salida anticipada:\nSi decides no continuar, puedes vender tu participación en el mercado secundario.",
  },
  {
    id: 53,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Cómo evalúan el riesgo de cada proyecto?",
    answer:
      "Antes de que un proyecto llegue a ti, pasa por un proceso de evaluación estructurado y profundo. Así es como lo hacemos:\n\n🔍 1. Análisis del activo inmobiliario\nEvaluamos la ubicación, el potencial de valorización, la demanda turística o habitacional, y la plusvalía proyectada. Si no tiene fundamentos sólidos, no entra.\n\n📊 2. Evaluación financiera y de rentabilidad\nRevisamos los flujos proyectados, costos de construcción, ingresos esperados y el retorno estimado. Solo aceptamos proyectos con márgenes saludables y escenarios realistas.\n\n🚧 3. Riesgo de ejecución\nAnalizamos los tiempos de obra, permisos legales, licencias, cronograma y plan de entregas. Verificamos que el desarrollador tenga experiencia y capacidad de ejecución comprobada.\n\n🌎 4. Riesgo de mercado\nEstudiamos las tendencias del entorno: demanda de alojamiento, turismo en la zona, competencia, ocupación histórica, y factores externos que puedan afectar el desempeño.\n\n💼 5. Riesgo operativo y reputacional\nEvaluamos al operador o desarrollador: su historial, reputación, experiencia y alineación con los valores LOKL (impacto, sostenibilidad y comunidad).\n\n📣 6. Transparencia con vos\nTodos los proyectos vienen con una ficha de riesgos divulgados claramente, para que tomes decisiones informadas, sin letras pequeñas.",
  },
  {
    id: 54,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Qué pasa si el proyecto se retrasa?",
    answer:
      "Si un proyecto se retrasa, ajustamos el cronograma y comunicamos de inmediato el impacto estimado en los tiempos de entrega y rentabilidad.\n\n📩 Recibirás la actualización directamente en tu panel de inversionista, donde podrás ver los nuevos hitos, fechas clave y cualquier cambio relevante.\n\n📊 Además, te compartimos cómo este ajuste puede afectar (o no) tu inversión, con total transparencia.\n\n💬 Y por supuesto, nuestro equipo está disponible para resolver tus dudas y acompañarte en la toma de decisiones.",
  },
  {
    id: 55,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Cómo mitigamos riesgo de mercado?",
    answer:
      "Mitigamos el riesgo de mercado desde la raíz, seleccionando proyectos que nacen con fundamentos sólidos:\n\n📍 1. Ubicaciones estratégicas con alto potencial\nSolo trabajamos en zonas con demanda comprobada, proyección de valorización y dinamismo turístico o urbano. Como Guatapé o Medellín, que combinan crecimiento económico y atractivo natural o cultural.\n\n🤝 2. Operadores con experiencia comprobada\nCada proyecto es desarrollado y operado por equipos con trayectoria real. Evaluamos su historial, ejecución en otros activos y su capacidad para adaptarse a los cambios del entorno.\n\n📉 3. Proyecciones conservadoras y escenarios realistas\nNo vendemos humo. Construimos cada proyecto con análisis financieros sólidos, contemplando escenarios conservadores que anticipan variaciones en la ocupación, tarifas o tiempos de desarrollo.\n\n🔄 Además, si el entorno cambia, te lo comunicamos a tiempo a través del panel de inversionista, con transparencia y acompañamiento constante.",
  },
  {
    id: 56,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Qué riesgos legales pueden surgir?",
    answer:
      "Los principales riesgos legales pueden estar relacionados con:\n\n📜 1. Titularidad del terreno\nQue la propiedad no esté correctamente registrada o tenga disputas jurídicas. Por eso, validamos que el título esté libre de embargos, hipotecas o conflictos.\n\n🏗️ 2. Licencias y permisos\nQue el proyecto no cuente con licencias de construcción, uso de suelo o permisos ambientales. En LOKL esto se revisa con expertos antes de lanzar cualquier oportunidad.\n\n🖋 3. Contratos poco claros o con condiciones abusivas\nRevisamos y estructuramos cada contrato con abogados especializados para garantizar que sean justos, comprensibles y seguros para el inversionista.\n\n💰 4. Obligaciones tributarias\nNos aseguramos de que el proyecto esté al día con las obligaciones fiscales y que el modelo tributario esté claro para cada tipo de inversionista (nacional o extranjero).\n\n✅ Todo este proceso lo realizamos con equipos legales especializados, antes de que cualquier proyecto llegue a la plataforma.",
  },
  {
    id: 57,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Cómo gestionan el riesgo del operador?",
    answer:
      "El operador es clave para el éxito del proyecto, y por eso lo evaluamos con lupa antes de permitir su participación. ¿Cómo lo hacemos?\n\n📂 1. Revisión de historial y experiencia\nAnalizamos su trayectoria, proyectos anteriores, cumplimiento de entregas y reputación en el sector. Solo trabajamos con operadores que tengan un historial sólido y comprobable.\n\n💰 2. Análisis de solvencia financiera\nValidamos su capacidad económica para asumir compromisos operativos y responder ante imprevistos. La estabilidad del operador es una barrera de protección para tu inversión.\n\n📊 3. Seguimiento de KPIs de gestión\nDurante la operación del proyecto, monitoreamos indicadores clave como ocupación, ingresos, eficiencia operativa y nivel de satisfacción de los usuarios. Si algo se desvía, actuamos.\n\n📑 4. Covenants y condiciones en los contratos\nLos acuerdos incluyen cláusulas que protegen al inversionista: exigencias mínimas de desempeño, reportes periódicos, y mecanismos de reemplazo del operador si no cumple con lo pactado.",
  },
  {
    id: 58,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Qué pasa si cambia la tasa o el entorno macro?",
    answer:
      "Cuando hay cambios en variables como la tasa de interés, inflación o el entorno económico general, en LOKL recalibramos los supuestos financieros del proyecto y analizamos cómo podrían afectar su desempeño.\n\n📊 ¿Qué significa eso?\n\nActualizamos las proyecciones de rentabilidad, valorización o flujo de caja.\n\nEvaluamos escenarios más conservadores según la nueva realidad.\n\nMedimos el impacto en los tiempos de salida o retorno estimado.\n\n📩 Y lo más importante:\nTe comunicamos el efecto esperado directamente en tu panel de inversionista, con total transparencia. Así, podés tomar decisiones informadas y a tiempo.",
  },
  {
    id: 59,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Riesgo de concentración?",
    answer:
      "Sí, como en cualquier inversión, si todo tu capital está en un solo proyecto o tipo de activo, podés estar más expuesto al riesgo. Pero en LOKL te ayudamos a evitarlo con estrategia.\n\n📌 ¿Cómo?\nFomentando la diversificación desde el diseño de la plataforma:\n\n🔄 1. Diversificá entre proyectos:\nPodés invertir en distintos desarrollos ubicados en zonas como Guatapé, Medellín u otros destinos emergentes, cada uno con su propio modelo de negocio.\n\n🏗️ 2. Diversificá por verticales:\nDesde hospitality sostenible como Nido de Agua, hasta co-living creativo como Indie Universe. Distintos tipos de activos responden a distintos mercados.\n\n⏳ 3. Diversificá en plazos y horizontes de inversión:\nHay proyectos con retornos proyectados en el corto, mediano o largo plazo. Eso te permite equilibrar liquidez, riesgo y rentabilidad.",
  },
  {
    id: 60,
    category: "Riesgos",
    icon: "shield-alert",
    question: "¿Dónde consulto los riesgos específicos?",
    answer:
      "📄 1. En la ficha del proyecto\nAhí vas a encontrar un resumen claro de los riesgos clave: mercado, ejecución, legales, financieros y ambientales. Todo explicado de forma directa y fácil de entender.\n\n📁 2. En el documento de riesgos dentro del data room\nEste documento detalla cada riesgo con mayor profundidad, los escenarios posibles y las estrategias de mitigación. Está disponible para que lo revises antes de invertir.\n\n✅ Todo está pensado para que tomes decisiones con información real, no con suposiciones.",
  },

  // Seguridad (10)
  {
    id: 1,
    category: "Seguridad",
    icon: "lock",
    question: "¿Cómo protegen mis datos personales?",
    answer:
      "En LOKL la seguridad de tu información no es negociable. Usamos tecnología de cifrado de nivel bancario para proteger tus datos personales y financieros. Además, operamos bajo estrictos protocolos de confidencialidad y cumplimos con la normativa colombiana de protección de datos (Ley 1581 de 2012).\n\nTu información solo se usa para lo necesario: validar tu identidad, facilitar tu inversión y mantenerte al tanto del rendimiento de tus proyectos. Jamás la compartimos con terceros sin tu autorización.\n\nInvertir tranquilo también es saber que estás en un entorno seguro. Y de eso, nos encargamos nosotros.",
  },
  {
    id: 2,
    category: "Seguridad",
    icon: "lock",
    question: "¿Mi pago es seguro?",
    answer:
      "Sí, tu pago está protegido con los más altos estándares de seguridad digital. Usamos plataformas aliadas con certificación bancaria y cifrado SSL, lo que garantiza que tu información financiera esté resguardada en todo momento.\n\nAdemás:\n\n✅ Puedes pagar con entidades reconocidas del sistema financiero colombiano.\n✅ Todas las transacciones quedan registradas y tienes comprobante digital.\n✅ Ofrecemos pagos en cuotas sin intereses, gracias a nuestros aliados financieros.\n✅ LOKL nunca accede directamente a tus datos bancarios.",
  },
  {
    id: 3,
    category: "Seguridad",
    icon: "lock",
    question: "¿Cómo validan la identidad del inversionista?",
    answer:
      "Para proteger a nuestra comunidad y garantizar un entorno seguro, aplicamos procesos de verificación de identidad (KYC) y control contra el lavado de activos (AML), tal como lo exige la normativa colombiana e internacional.\n\n🔐 ¿Qué hacemos exactamente?\n\n🪪 Verificación documental: Solicitamos tu documento de identidad (cédula o pasaporte) y lo validamos a través de tecnología antifraude.\n\n📷 Prueba de vida (biometría facial): Comprobamos que seas realmente tú con reconocimiento facial en tiempo real.\n\n📑 Controles KYC/AML automatizados: Aplicamos filtros para detectar perfiles de riesgo, listas restrictivas y posibles vínculos con actividades ilícitas.\n\n🔍 Monitoreo constante: Monitoreamos de forma continua las transacciones para detectar cualquier comportamiento sospechoso.",
  },
  {
    id: 4,
    category: "Seguridad",
    icon: "lock",
    question: "¿Los documentos del proyecto son auténticos?",
    answer:
      "✅ Sí. Todos los documentos que ves en nuestra plataforma son cargados directamente desde fuentes verificadas: desarrolladores, operadores, notarías o autoridades locales.\n\n🔍 Además, auditamos su trazabilidad, lo que significa que validamos su origen, vigencia y autenticidad antes de que estén disponibles en el data room del proyecto.\n\n📁 Desde licencias, títulos de propiedad y permisos hasta contratos y proyecciones financieras: nada se publica sin revisión previa de nuestro equipo legal y técnico.",
  },
  {
    id: 5,
    category: "Seguridad",
    icon: "lock",
    question: "¿Puedo activar autenticación en dos pasos (2FA)?",
    answer:
      "Actualmente, nuestra plataforma opera con un sistema de autenticación segura unificada (SSO) para facilitar tu acceso a las herramientas de inversión y academia. La autenticación en dos pasos (2FA) no está habilitada por el momento para cuentas de usuario, pero garantizamos la seguridad mediante protocolos estándar de encriptación y gestión de sesiones.",
  },
  {
    id: 6,
    category: "Seguridad",
    icon: "lock",
    question: "¿Cómo resguardan los fondos en tránsito?",
    answer:
      "💼 1. Custodia a través de aliados financieros verificados: Tu dinero no va directo al desarrollador. Primero pasa por cuentas de recaudo controladas por entidades aliadas, supervisadas y con protocolos antifraude.\n\n🔒 2. Proceso supervisado y trazable: Cada transacción queda registrada, y puedes seguir su avance desde tu panel.\n\n📜 3. Desembolsos condicionados: El dinero solo se entrega al proyecto cuando se cumplen ciertos hitos: firma de contratos, avance en obra o condiciones técnicas validadas.\n\n🤝 4. Aliados con experiencia en fondos fiduciarios: Trabajamos con partners del sistema financiero colombiano que cumplen normas de seguridad y compliance.",
  },
  {
    id: 7,
    category: "Seguridad",
    icon: "lock",
    question: "¿Quién tiene acceso a mi información?",
    answer:
      "🛡️ Solo áreas autorizadas dentro de LOKL tienen acceso a tu información, y siempre bajo estrictos acuerdos de confidencialidad.\n\nEso incluye únicamente a los equipos que la necesitan para gestionar tu inversión: soporte, cumplimiento legal y operaciones.\n\n🔐 Además:\n\n• Los datos están protegidos con sistemas de cifrado y protocolos de seguridad digital.\n• No compartimos tu información con terceros con fines comerciales.\n• Si alguna autoridad reguladora la solicita, solo se entrega cumpliendo la ley.",
  },
  {
    id: 8,
    category: "Seguridad",
    icon: "lock",
    question: "¿Qué hago si detecto actividad sospechosa?",
    answer:
      "🚨 1. Actuá de inmediato: Si ves algo raro —un movimiento que no hiciste, un ingreso extraño o cualquier cambio sin autorización— no esperes.\n\n🔐 2. Cambiá tu contraseña desde el panel lo antes posible para bloquear el acceso inmediato.\n\n📩 3. Escribinos por el canal de soporte oficial (chat en la plataforma o correo verificado). Nuestro equipo está preparado para ayudarte a investigar, bloquear accesos no autorizados y proteger tu inversión.\n\n🧑‍💻 4. Nuestro equipo de seguridad revisará el caso, verificará registros, y tomará medidas para asegurar tu cuenta.",
  },
  {
    id: 9,
    category: "Seguridad",
    icon: "lock",
    question: "¿Cómo se gestionan incidentes de seguridad?",
    answer:
      "En LOKL contamos con protocolos definidos para responder de forma rápida y transparente ante cualquier incidente de seguridad que pueda afectar tu información o tu inversión.\n\n🔐 ¿Qué incluye ese protocolo?\n\n⚠️ Detección inmediata: Usamos sistemas automáticos que monitorean comportamientos anómalos en tiempo real.\n\n🧑‍💻 Respuesta técnica especializada: Un equipo interno analiza el incidente, identifica su origen y toma medidas para contenerlo.\n\n📝 Registro detallado: Cada incidente queda documentado con trazabilidad completa.\n\n📩 Notificación al usuario (cuando aplica): Si el incidente afecta directamente tu cuenta o tus datos, te lo notificamos de forma clara y oportuna.",
  },
  {
    id: 10,
    category: "Seguridad",
    icon: "lock",
    question: "¿Dónde encuentro las políticas de seguridad y privacidad?",
    answer:
      "Están disponibles en todo momento al final de nuestra página web, en el footer, bajo estos enlaces:\n\n🔐 \"Seguridad\" – cómo protegemos tu información y tu inversión.\n📄 \"Privacidad\" – cómo usamos y resguardamos tus datos personales.\n📜 \"Términos\" – el marco legal de uso de la plataforma y tus derechos como inversionista.\n\nTodo explicado en lenguaje claro, sin letras pequeñas ni vueltas innecesarias.",
  },

  // Funcionamiento (10)
  {
    id: 11,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Cómo puedo invertir?",
    answer:
      "Invertir con nosotros es tan fácil como comprar algo online, pero con impacto real en tu futuro:\n\n1. Regístrate en nuestra plataforma 👉 www.lokl.life\nSolo necesitas un correo electrónico y tu cédula.\n\n2. Explora los proyectos disponibles\nEncontrarás opciones como Nido de Agua en Guatapé, todos con alto potencial de valorización y rentabilidad.\n\n3. Elige el proyecto que más te inspire\nPuedes invertir desde $1.300 USD, sin necesidad de comprar una propiedad completa.\n\n4. Firma digitalmente y realiza tu inversión\nContamos con aliados financieros que te permiten pagar hasta en 12 cuotas sin intereses.\n\n5. Hazle seguimiento a tu inversión desde cualquier parte del mundo\nRecibe reportes, sigue el progreso del proyecto y hasta negocia tu participación en el mercado secundario.",
  },
  {
    id: 12,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Qué es el panel del inversionista?",
    answer:
      "Es tu espacio personal dentro de la plataforma donde puedes ver, controlar y tomar decisiones sobre tus inversiones. Todo en un solo lugar, claro y fácil de entender.\n\nEsto es lo que encuentras ahí:\n\n📊 Resumen de tus inversiones: Ves en qué proyectos has invertido, cuánto, y cómo van.\n\n📈 Indicadores clave en tiempo real: Ocupación, rentabilidad estimada, valorización proyectada, estado del proyecto.\n\n🔁 Opciones de acción: Puedes reinvertir, retirar tus rendimientos o vender tu participación en el mercado secundario.\n\n📩 Documentos y contratos: Acceso a tus contratos firmados, certificados y reportes financieros.\n\n🔔 Notificaciones y actualizaciones: Te avisamos cada vez que hay algo relevante en tus proyectos.",
  },
  {
    id: 13,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Cómo seleccionan los proyectos?",
    answer:
      "En LOKL no esperamos a que lleguen los proyectos. Los buscamos, los analizamos y los construimos estratégicamente desde un pipeline propio que nos permite detectar oportunidades con alto potencial antes que el resto del mercado.\n\n🔍 ¿Qué pasa después? Entran a nuestro proceso de curaduría, con tres filtros clave:\n\n⚙️ Curaduría técnica: Analizamos el diseño arquitectónico, el plan constructivo, la viabilidad operativa y la experiencia del equipo desarrollador u operador.\n\n⚖️ Curaduría legal: Validamos que el proyecto tenga licencias, permisos, títulos claros y estructuras jurídicas seguras.\n\n📊 Curaduría financiera: Estudiamos proyecciones de rentabilidad, costos de desarrollo, flujos de caja y escenarios de salida.\n\n🌿 Y por supuesto, deben estar alineados con nuestro ADN: impacto social, regeneración ambiental y experiencias auténticas.",
  },
  {
    id: 14,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Qué documentos recibo al invertir?",
    answer:
      "Cuando realizás una inversión en la plataforma, accedés a una serie de documentos que respaldan y formalizan tu participación:\n\n• Contrato de inversión: Documento legal que establece los términos, condiciones, derechos y obligaciones como inversionista.\n\n• Acceso al data room: Desde tu panel podés consultar todos los documentos legales, técnicos y financieros del proyecto, siempre que lo necesites.\n\n• Certificado de participación: Prueba formal de tu inversión en el proyecto, donde se detalla la inversión, el monto adquirido y el valor de Unit.",
  },
  {
    id: 16,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Cómo recibo comunicaciones y actualizaciones?",
    answer:
      "A través de tu correo electrónico y la comunidad exclusiva en WhatsApp:\n\nTe enviamos notificaciones relevantes directamente a tu mail y WhatsApp: actualizaciones clave, cambios en cronogramas, hitos alcanzados o movimientos en tu inversión.\n\nSoporte personalizado: Si necesitás resolver algo puntual, podés escribirnos por el chat en la plataforma o a través de nuestros canales de atención. Siempre hay alguien del equipo listo para ayudarte.",
  },
  {
    id: 17,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Puedo reinvertir automáticamente?",
    answer:
      "Actualmente, la reinversión automática no está habilitada, pero podés reinvertir manualmente tus retornos o capital disponible directamente desde tu panel de inversionista.\n\nDesde ahí podés:\n• Ver los proyectos activos disponibles\n• Elegir en cuál querés volver a invertir\n• Usar los fondos acreditados sin tener que hacer una nueva consignación\n\nEstamos trabajando en herramientas que faciliten aún más la experiencia, y la reinversión automática es una de las funcionalidades en el radar.",
  },
  {
    id: 18,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Cómo funciona el seguimiento del proyecto?",
    answer:
      "Reportes periódicos: Recibes actualizaciones de forma mensual y trimestral con fotos, métricas clave y comparativos frente al plan original. Si algo cambia, se explica el impacto y el nuevo cronograma.\n\nAlertas y notificaciones por correo: Te avisamos por email cada vez que haya una novedad importante: avances, retrasos, cambios operativos o distribución de retornos.\n\nAcompañamiento directo del equipo LOKL: No solo informamos: estamos disponibles para explicarte lo que necesites, desde lo técnico hasta lo financiero.",
  },
  {
    id: 19,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Qué es el test de perfil inversionista?",
    answer:
      "Es una herramienta educativa diseñada para ayudarnos a conocerte mejor como inversionista y tomar decisiones con más criterio y confianza.\n\nA través de una serie de preguntas simples, identificamos tu nivel de experiencia, tu tolerancia al riesgo y tus objetivos financieros.\n\nEste test hace parte de LOKL Academy, nuestra guía de aprendizaje donde te acompañamos paso a paso a entender cómo funciona el mundo de la inversión en activos inmobiliarios con impacto.",
  },
  {
    id: 20,
    category: "Funcionamiento",
    icon: "laptop",
    question: "¿Puedo invertir desde el exterior?",
    answer:
      "Sí, podés invertir desde cualquier lugar del mundo, seas colombiano o extranjero. Lo importante es cómo estás registrado:\n\n• Si sos colombiano (aun viviendo fuera): Puedes invertir sin límites usando tu cédula de ciudadanía. Tu ubicación no restringe tu acceso.\n\n• Si sos extranjero con cédula de extranjería en Colombia: También puedes invertir sin límite de monto, ya que tenés identificación local válida.\n\n• Si sos extranjero sin cédula de extranjería y vivís fuera de Colombia: Puedes invertir hasta 10.000 USD, según la regulación local para inversionistas internacionales sin identificación nacional.",
  },

  // Liquidez (10)
  {
    id: 21,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Cuándo puedo salir de una inversión?",
    answer:
      "En LOKL, no te quedas atrapado en una inversión si ya cumplió su propósito para ti:\n\nMercado secundario: Puedes vender tu participación a otros inversionistas interesados o que quizás no entraron en la etapa inicial. La salida es en orden de solicitud, no inmediata; depende de que otro usuario compre tu participación. Sin embargo, LOKL facilita este \"match\" entre quien quiere salir y quien quiere entrar.\n\nCiclo natural del proyecto: También puedes esperar a que el proyecto alcance su madurez (por ejemplo, cuando entra en operación o es vendido) y recibir tu retorno completo.",
  },
  {
    id: 22,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Existe mercado secundario?",
    answer:
      "✅ Sí, y está diseñado para darte flexibilidad.\n\nEl mercado secundario te permite vender tu participación en un proyecto a otro inversionista, sin tener que esperar a que el proyecto termine o se liquide.\n\nEsto significa que:\n🔁 Puedes salir antes si lo necesitas\n💸 Recuperar tu capital parcial o total\n📈 Aprovechar valorizaciones antes del cierre del proyecto\n\n¿Y cómo funciona?\n• El inversionista solicita liquidar su participación\n• Se registra en un link para ingresar a la lista de espera\n• La venta se realiza en orden de solicitud\n• Se identifica oportunidad de match que se ajuste al inversionista\n• Se inician los trámites para la cesión de Units",
  },
  {
    id: 23,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Cómo solicito la cesión de mi participación?",
    answer:
      "La cesión de tu participación se realiza a través del mercado secundario. Así es como funciona:\n\nIngreso al mercado secundario: Solicita a través del chat personal ingresar al mercado secundario y se le envía un formulario de registro con los detalles de la cesión: monto, condiciones y motivo (si aplica). El equipo de LOKL valida que todo esté en orden.\n\nSe identifica oportunidad de match: El equipo de LOKL identifica una oportunidad de compra que se ajuste a tu solicitud.\n\nTiempo de proceso: La salida es en orden de solicitud, no inmediata; depende de que otro usuario compre tu participación. Sin embargo, LOKL facilita este \"match\" entre quien quiere salir y quien quiere entrar.\n\nSe concreta la cesión: Una vez se cierra la transacción, se actualiza la titularidad y recibís el valor acordado. Todo queda registrado legal y digitalmente.",
  },
  {
    id: 24,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Qué tan líquidas son estas inversiones?",
    answer:
      "Las inversiones en LOKL están pensadas para ser más líquidas que una inversión inmobiliaria tradicional, pero no funcionan como una cuenta de ahorros o un fondo de corto plazo.\n\nAsí funciona la liquidez:\n\nMercado secundario: Puedes vender tu participación antes de que termine el proyecto a otros inversionistas registrados en la plataforma. Se realiza un cobro de comisión del 3%, y todo el proceso se hace 100% digital.\n\nLiquidez sujeta a demanda: La velocidad de venta depende del interés de otros inversionistas y de las condiciones del mercado en ese momento. Es posible que vendas por más, igual o menos de lo que invertiste, según el desempeño del proyecto.\n\nInformación siempre disponible: Desde tu panel podés monitorear el valor de tu inversión y decidir si querés mantenerla o publicarla para cesión.",
  },
  {
    id: 25,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Cómo recibo distribuciones/retornos?",
    answer:
      "De forma digital y directa: Cuando un proyecto comienza a generar retornos (por operación o valorización), los fondos se distribuyen automáticamente a tu cuenta registrada en la plataforma.\n\nNotificación y detalle en tu panel: Recibís una notificación y podés ver el detalle completo del pago: monto, concepto, fecha y origen del retorno.\n\nPuedes reinvertir o retirar: Una vez recibís el retorno, podés elegir entre:\n• Retirarlo a tu cuenta bancaria (colombiana o internacional, según el perfil)\n• Reinvertirlo en otro proyecto directamente desde la plataforma\n\nTodo con trazabilidad: Cada distribución queda registrada en tu historial, con soporte legal y contable.",
  },
  {
    id: 26,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Hay retenciones o impuestos al distribuir?",
    answer:
      "Si eres persona natural residente en Colombia: Puede aplicarse una retención en la fuente sobre los rendimientos generados, de acuerdo con las leyes tributarias colombianas.\n\nSi eres extranjero o no residente fiscal en Colombia: Aplica una retención especial según el tipo de ingreso y convenios internacionales (cuando existan). Esta retención suele ser mayor, pero depende de tu país de residencia y si contás con cédula de extranjería.\n\nLOKL no realiza declaraciones por ti: Aunque realizamos la retención correspondiente, cada inversionista es responsable de declarar sus ingresos ante la autoridad tributaria que le corresponda.",
  },
  {
    id: 27,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Puedo fraccionar mi salida?",
    answer:
      "¡Sí, puedes vender solo una parte! En LOKL no manejamos una política de \"todo o nada\". Tu inversión está compuesta por \"unidades\" o participaciones individuales. Esto te da la flexibilidad de vender solo la cantidad de unidades que necesites para obtener liquidez.",
  },
  {
    id: 28,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Qué pasa si no hay demanda en secundario?",
    answer:
      "Si nadie ha comprado tu participación en el mercado secundario, no se pierde tu inversión, pero sí debés esperar hasta que aparezca un comprador interesado.\n\nAhora bien, no estás atado a esperar pasivamente:\n\n• Podés mantener tu inversión activa y seguir recibiendo retornos según el proyecto avance.\n• También puedes traer a un comprador interesado, como otro inversionista o alguien de tu red que quiera entrar. Si cumple con los requisitos de la plataforma, LOKL facilita el proceso de cesión legal y digital.",
  },
  {
    id: 29,
    category: "Liquidez",
    icon: "arrow-left-right",
    question: "¿Dónde veo mi cronograma de pagos?",
    answer:
      "Puedes consultarlo directamente desde tu panel de inversionista, en la sección \"Calendario\" del proyecto.\n\nAhí encontrarás:\n• Las fechas estimadas de distribución de retornos\n• Y cualquier actualización en los plazos de ejecución\n\nTodo se presenta de forma clara y actualizada, para que siempas sepas cuándo esperar cada movimiento de tu inversión.",
  },

  // Beneficios (10)
  {
    id: 31,
    category: "Beneficios",
    icon: "gift",
    question: "¿Por qué invertir con LOKL?",
    answer:
      "Porque con LOKL no solo inviertes en metros cuadrados, inviertes en el estilo de vida que quieres vivir. Aquí te damos 5 razones:\n\n🚀 Acceso desde montos bajos: Inicia desde $1.300 USD sin endeudarte ni comprar una propiedad entera.\n\n🧠 Todo verificado, todo claro: Te mostramos proyecciones, riesgos y métricas reales para que tomes decisiones con total transparencia.\n\n📈 Alta rentabilidad con propósito: Proyectos de turismo y hospitality que mezclan rentabilidad con impacto ambiental, social y cultural.\n\n🌍 100% digital, estés donde estés: Desde tu celular, puedes invertir, monitorear tus proyectos o salir de una inversión.\n\n💙 Invierte en algo que puedes vivir: No es solo retorno financiero, es una inversión que puedes disfrutar con experiencias únicas.",
  },
  {
    id: 32,
    category: "Beneficios",
    icon: "gift",
    question: "¿Qué valor obtengo además del potencial retorno?",
    answer:
      "En LOKL, invertir va mucho más allá de las cifras. Aquí, tu inversión tiene propósito, impacto y beneficios reales que puedes vivir.\n\n🌱 Impacto positivo en comunidades y el entorno: Nuestros proyectos están diseñados para transformar realidades. Por ejemplo, Nido de Agua en Guatapé impulsa la primera escuela de hospitality en la zona, genera empleo para comunidades locales, conserva más de 1.200 árboles nativos y promueve turismo sostenible.\n\n💙 Experiencias únicas como inversionista: Puedes vivir lo que apoyas: estadías exclusivas, eventos y beneficios en los mismos espacios donde invertiste.\n\n🤝 Acceso a una comunidad con visión: Conectas con otros inversionistas que también buscan generar valor más allá del retorno.",
  },
  {
    id: 33,
    category: "Beneficios",
    icon: "gift",
    question: "¿Puedo diversificar mi portafolio?",
    answer:
      "Sí. Puedes hacerlo de forma simple y estratégica, eligiendo entre distintos:\n\nVerticales: Como hospitality sostenible, coliving creativo o estadías de experiencia. Cada uno responde a una lógica de mercado distinta.\n\nUbicaciones: Puedes invertir en proyectos en lugares con dinámicas diferentes como Medellín, Guatapé u otras zonas con alto potencial de valorización.\n\nPlazos: Tienes acceso a proyectos con retornos proyectados en el corto, mediano o largo plazo. Esto te permite equilibrar liquidez y rentabilidad.",
  },
  {
    id: 34,
    category: "Beneficios",
    icon: "gift",
    question: "¿Qué tipo de acompañamiento brindan?",
    answer:
      "Antes de invertir: Te ayudamos a entender cada proyecto, evaluar si se ajusta a tu perfil y resolver todas tus dudas. Tienes acceso a guías, fichas detalladas y soporte personalizado.\n\nDurante tu inversión: Desde tu panel puedes seguir el avance, recibir actualizaciones, reportes y saber exactamente qué está pasando con tu dinero en todo momento.\n\nEn decisiones clave: Si quieres ceder tu participación, diversificar, reinvertir o entender un cambio en el proyecto, nuestro equipo está para asesorarte.\n\nEducación continua: A través de LOKL Academy, te damos herramientas para que tomes decisiones con criterio.\n\nSoporte humano real: No estás solo frente a una plataforma. Detrás hay un equipo disponible por chat, correo o llamada.",
  },
  {
    id: 35,
    category: "Beneficios",
    icon: "gift",
    question: "¿Cómo se mide el desempeño del proyecto?",
    answer:
      "Indicadores financieros clave (KPIs): Seguimos métricas como ingresos generados, tasa de ocupación, flujo de caja, rentabilidad sobre la inversión (ROI) y comparativo frente al plan inicial.\n\nAvance físico y operativo: Monitoreamos el cumplimiento del cronograma de obra, etapas entregadas, licencias aprobadas y nivel de ejecución del presupuesto.\n\nIndicadores de gestión del operador: Evaluamos cómo está gestionando el proyecto: eficiencia, cumplimiento de metas, calidad del servicio.\n\nImpacto en comunidad y sostenibilidad: También medimos el impacto social, ambiental y cultural que genera la inversión.\n\nActualizaciones periódicas: Todo ese desempeño se transforma en reportes visuales que podés consultar en tu panel.",
  },
  {
    id: 36,
    category: "Beneficios",
    icon: "gift",
    question: "¿Qué beneficios tiene invertir con propósito?",
    answer:
      "Retorno financiero con impacto real: No tenés que elegir entre rentabilidad y sentido. En LOKL, los proyectos están diseñados para generar ingresos y al mismo tiempo aportar a comunidades, territorios y economías locales.\n\nProyectos con enfoque social y ambiental: Por ejemplo, Nido de Agua en Guatapé no solo es una inversión en turismo regenerativo, también impulsa el empleo local y protege el entorno natural.\n\nParticipación activa y conexión emocional: Invertís en algo que podés visitar, compartir, y ver cómo crece.\n\nConstrucción de un portafolio alineado a tus valores: Elegís en qué tipo de impacto querés participar: cultura, sostenibilidad, regeneración, bienestar o creatividad.\n\nMayor fidelización y estabilidad: Los proyectos con propósito suelen atraer comunidades comprometidas, lo que mejora la operación.",
  },
  {
    id: 37,
    category: "Beneficios",
    icon: "gift",
    question: "¿Puedo empezar con montos flexibles?",
    answer:
      "Claro que sí. En LOKL puedes comenzar a invertir desde montos accesibles, sin necesidad de grandes capitales ni de comprar una propiedad completa.\n\nEsto te permite:\n• Probar sin comprometer todo tu capital\n• Diversificar desde el inicio, eligiendo distintos proyectos, ubicaciones o plazos\n• Construir tu portafolio paso a paso, según tu ritmo y objetivos\n\nNo necesitás ser millonario para empezar, solo tener visión y ganas de crecer con propósito.",
  },
  {
    id: 38,
    category: "Beneficios",
    icon: "gift",
    question: "¿Cómo comparo proyectos rápidamente?",
    answer:
      "Desde tu panel de usuario: Puedes ver todos los proyectos activos y comparar fácilmente variables clave como monto mínimo de inversión, horizonte de tiempo, rentabilidad proyectada, tipo de activo y ubicación.\n\nVista comparativa simplificada: LOKL está diseñado para que navegues entre proyectos sin perder contexto. Podés abrir varias fichas, revisar sus indicadores y tomar decisiones informadas.\n\nFiltros por intereses y perfil: Filtrá por vertical, plazo, tipo de impacto o rentabilidad esperada.\n\nAcompañamiento personalizado: ¿Querés una recomendación según tu perfil? Te ayudamos a comparar con criterio desde el equipo o con las herramientas educativas de LOKL Academy.",
  },
  {
    id: 39,
    category: "Beneficios",
    icon: "gift",
    question: "¿Recibo alertas de nuevos proyectos?",
    answer:
      "Sí. En LOKL, los inversionistas registrados reciben notificaciones automáticas cuando se publica un nuevo proyecto, para que puedan evaluarlo y participar desde el inicio.\n\nAsí es como funcionan las alertas:\n\nCorreo electrónico: Cada vez que un nuevo proyecto es aprobado y publicado, te enviamos un correo con el nombre del proyecto, ubicación, vertical, monto mínimo y fecha de apertura.\n\nNotificaciones dentro de la plataforma: Al ingresar a tu panel, verás un aviso destacado sobre el nuevo proyecto, con un acceso directo para revisarlo.\n\nSin spam, solo oportunidades reales: Solo te notificamos cuando hay algo relevante.",
  },
  {
    id: 40,
    category: "Beneficios",
    icon: "gift",
    question: "¿Ofrecen herramientas para tomar mejores decisiones?",
    answer:
      "Test de perfil inversionista: Te ayuda a entender tu tolerancia al riesgo, tus objetivos y qué tipo de proyectos se ajustan a vos. Está dentro de LOKL Academy.\n\nFicha técnica de cada proyecto: Con toda la información clave: rentabilidad proyectada, plazos, riesgos, ubicación, modelo de negocio y operador.\n\nDocumentos legales y financieros en el data room: Podés acceder al contrato, estudios de mercado, licencias, cronogramas y más.\n\nComparador entre proyectos: Desde tu panel podés evaluar distintos proyectos según ticket, plazo, vertical e impacto.\n\nAcompañamiento personalizado: Nuestro equipo está listo para ayudarte a entender cada opción sin presiones.",
  },

  // Proyectos (10)
  {
    id: 41,
    category: "Proyectos",
    icon: "building",
    question: "¿Qué tipos de proyectos presentan?",
    answer:
      "🌿 Proyectos turísticos con impacto positivo: Lugares únicos que conectan con la naturaleza y las comunidades. Como Nido de Agua en Guatapé, donde además de rentabilidad, apoyas educación y empleo local.\n\n🧑‍🎨 Espacios de co-living para nómadas y creativos: Como Indie Universe en Medellín: aparta-estudios diseñados para creadores, con laboratorios de contenido y espacios colaborativos.\n\n🛎️ Hospitality de nueva generación: Proyectos que mezclan hotelería, experiencias y bienestar, pensados para atraer al viajero moderno y maximizar ocupación.\n\n📊 Proyectos con data y estrategia detrás: Cada proyecto está respaldado con estudios de mercado, proyecciones de rentabilidad y un equipo experto en desarrollo inmobiliario.",
  },
  {
    id: 42,
    category: "Proyectos",
    icon: "building",
    question: "¿Cómo verifican al desarrollador/operador?",
    answer:
      "Cada desarrollador u operador pasa por un proceso de validación transparente y estructurado:\n\n🔎 1. Due Diligence completo: Revisamos su historial, trayectoria, reputación y cumplimiento en proyectos anteriores.\n\n📂 2. Revisión legal y técnica: Analizamos documentos legales, licencias, permisos de construcción y contratos de operación.\n\n📈 3. Evaluación financiera y operativa: Estudiamos su capacidad financiera, plan de negocio y modelo de ingresos.\n\n🌿 4. Alineación con el propósito LOKL: Solo trabajamos con operadores que compartan nuestra visión: impacto positivo, turismo consciente, desarrollo social.\n\n🛡️ 5. Acompañamiento y monitoreo continuo: Hacemos seguimiento constante en cada etapa para proteger tu inversión.",
  },
  {
    id: 43,
    category: "Proyectos",
    icon: "building",
    question: "¿Cómo elijo el proyecto adecuado para mí?",
    answer:
      "Conocé tu perfil de inversionista: Empezá haciendo el test de perfil en LOKL Academy. Te ayuda a identificar tu nivel de riesgo, horizonte de inversión y qué tipo de proyectos te convienen más.\n\nLeé la información del proyecto: Ahí vas a encontrar todo lo esencial: ticket mínimo, rentabilidad proyectada, duración, ubicación, operador y riesgos.\n\nEvaluá por vertical y propósito: ¿Te interesa invertir en turismo regenerativo como Nido de Agua? ¿O te llaman más proyectos de ciudad creativa como Indie Universe?\n\nDiversificá si podés: No tenés que elegir uno solo. Podés repartir tu inversión entre varios proyectos.\n\nAsesorate si lo necesitás: Nuestro equipo está para ayudarte sin presión.",
  },
  {
    id: 44,
    category: "Proyectos",
    icon: "building",
    question: "¿Hay cupos limitados?",
    answer:
      "SÍ, los cupos de inversión por proyecto son LIMITADOS.\n\nEsta es una característica fundamental del modelo de LOKL y del crowdfunding inmobiliario en general, ya que no se trata de un fondo infinito, sino de un proyecto con un activo físico real detrás.\n\n1. El límite lo define el activo\n\n2. Funciona por Etapas y Valorización: A medida que se alcanzan hitos de venta el precio del Unit puede subir para los siguientes compradores.\n\n3. ¿Qué pasa si se acaban los cupos?\n• Mercado Secundario: Esperar a que un inversionista actual quiera vender sus Units.\n• Lista de Espera: Registrarse para ser notificado si se libera algún cupo o cuando se lance el siguiente proyecto.",
  },
  {
    id: 45,
    category: "Proyectos",
    icon: "building",
    question: "¿Puedo invertir en varios proyectos a la vez?",
    answer:
      "¡Por supuesto! En LOKL puedes diversificar tu inversión participando en varios proyectos al mismo tiempo. Nuestra plataforma está diseñada para que elijas los proyectos que más conecten contigo —ya sea por su ubicación, propósito o rentabilidad— y decidas cuánto invertir en cada uno, desde montos accesibles.",
  },
  {
    id: 47,
    category: "Proyectos",
    icon: "building",
    question: "¿Cómo se reporta el avance de obra/operación?",
    answer:
      "En LOKL creemos en mantenerte siempre al tanto. Por eso, realizamos un encuentro trimestral de inversionistas virtual, donde compartimos los avances del proyecto, resultados operativos y próximos hitos.\n\nEs un espacio para que resuelvas tus dudas, veas en qué va tu inversión y sientas que haces parte activa del proceso. Además, tendrás acceso a material complementario desde nuestra plataforma, para que sigas el progreso cuando quieras y desde donde estés.",
  },
  {
    id: 48,
    category: "Proyectos",
    icon: "building",
    question: "¿Puedo visitar o conocer físicamente el activo?",
    answer:
      "¡Sí puedes! En LOKL nos encanta que los inversionistas vivan su inversión. Por eso, organizamos visitas guiadas y experiencias en algunos de nuestros proyectos para que puedas conocer el activo de primera mano, recorrer los espacios y ver cómo va tomando forma eso en lo que decidiste creer.\n\nDesde modelos piloto hasta eventos especiales para la comunidad, queremos que no solo inviertas, sino que también lo vivas, lo sientas y lo disfrutes.",
  },
  {
    id: 49,
    category: "Proyectos",
    icon: "building",
    question: "¿Dónde veo el estatus \"activo/cerrado/en operación\"?",
    answer:
      "Puedes verlo en tu panel de inversionista y en la página web de LOKL. Cada proyecto muestra su estado actual de forma clara y actualizada, para que siempre sepas en qué etapa se encuentra.",
  },
];

