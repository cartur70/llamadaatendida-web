// Datos centrales de contenido — Llamada Atendida
// Se importa directamente donde haga falta (nada de window.__BRAND__).

export const BRAND = {
  name: "Llamada Atendida",
  legalName: "Llamada Atendida",
  tagline: "El motor comercial, operativo y legal que tu negocio necesita",
  description:
    "Convertimos la atención al cliente de tu empresa en un sistema automatizado de captación 24/7, blindado por ley y respaldado por la mejor tecnología e infraestructura.",
  url: "https://llamadaatendida.com",

  contact: {
    phone: "+34 910 971 537",
    phoneHref: "tel:+34910971537",
    whatsapp: "https://wa.me/34910971537",
    email: "hola@llamadaatendida.com",
    address: "Calle Concepción Arenal 1, 1ºA, 28924 Alcorcón (Madrid)",
  },

  ctaPrimary: "Solicitar demo",
  ctaSecondary: "Hablar con un asesor",

  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Calcula tu ahorro", href: "#cotizador" },
    { label: "Confianza", href: "#confianza" },
    { label: "Contacto", href: "/contacto" },
  ],

  // Las 4 palancas / pilares del servicio
  pilares: [
    {
      id: "captacion",
      color: "verde",
      kicker: "Pilar 01",
      title: "Captación Digital",
      short: "Visibilidad y presencia donde te buscan",
      description:
        "Diseño web de conversión, ficha de Google optimizada y gestión de reputación para que aparezcas primero y generes más contactos cualificados cada mes.",
      points: ["Webs que convierten visitas en clientes", "Google Business Profile gestionado", "Reseñas y reputación bajo control"],
      icon: "rocket",
    },
    {
      id: "atencion",
      color: "turquesa",
      kicker: "Pilar 02",
      title: "Agentes IA & Voz",
      short: "Atención híbrida que nunca cierra",
      description:
        "Un sistema híbrido de inteligencia artificial y agentes humanos responde llamadas, WhatsApp y mensajes al instante, 24 horas al día, 365 días al año.",
      points: ["Llamadas y WhatsApp atendidos al instante", "Agendamiento automático de citas", "Escalado a persona humana cuando hace falta"],
      icon: "headset",
    },
    {
      id: "proteccion",
      color: "indigo",
      kicker: "Pilar 03",
      title: "RGPD & Seguro RC",
      short: "Tu negocio, blindado por ley",
      description:
        "Cumplimiento normativo real, no de trámite: RGPD, avisos legales al día y seguro de responsabilidad civil, para que una llamada mal atendida nunca se convierta en un problema legal.",
      points: ["Cumplimiento RGPD auditado", "Avisos legales siempre actualizados", "Seguro de Responsabilidad Civil incluido"],
      icon: "shield",
    },
    {
      id: "conectividad",
      color: "morado",
      kicker: "Pilar 04",
      title: "Telecomunicaciones & Equipamiento",
      short: "La infraestructura que lo sostiene todo",
      description:
        "Fibra de alta velocidad, línea móvil B2B y equipamiento de telecomunicaciones para que la tecnología nunca sea el cuello de botella de tu negocio.",
      points: ["Fibra de alta velocidad para empresas", "Línea móvil y centralita B2B", "Equipamiento y soporte técnico"],
      icon: "wifi",
    },
  ],

  beneficios: [
    { icon: "headset", title: "Atención profesional", text: "Cada contacto se gestiona con el mismo cuidado que si respondieras tú." },
    { icon: "clock", title: "Disponibilidad total", text: "24 horas, 7 días a la semana. Tu negocio nunca deja de atender." },
    { icon: "rocket", title: "Más oportunidades", text: "Ninguna llamada ni mensaje se queda sin respuesta ni se convierte en venta perdida." },
    { icon: "coin", title: "Pago por uso", text: "Sin permanencias ni letra pequeña. Pagas por lo que realmente usas." },
  ],

  proceso: [
    { n: "01", title: "Auditoría inicial", text: "Analizamos cómo atiendes hoy y detectamos dónde estás perdiendo clientes." },
    { n: "02", title: "Configuración IA + humanos", text: "Montamos el sistema híbrido a medida de tu negocio, sin tocar tu operativa actual." },
    { n: "03", title: "Atención 24/7 activa", text: "Llamadas, WhatsApp y citas gestionadas desde el primer día, con o sin supervisión." },
    { n: "04", title: "Resultados medibles", text: "Panel con leads, llamadas atendidas y ahorro real, mes a mes." },
  ],

  confianza: [
    { title: "Cumplimiento RGPD", text: "Tratamiento de datos auditado conforme al Reglamento General de Protección de Datos." },
    { title: "Seguro de Responsabilidad Civil", text: "Tu actividad, cubierta ante cualquier incidencia en la gestión de la atención." },
    { title: "Infraestructura propia", text: "Telecomunicaciones y sistemas redundantes, sin depender de terceros críticos." },
    { title: "Sin permanencia", text: "Modelo de pago por uso: te quedas por resultados, no por contrato." },
  ],

  faqs: [
    {
      q: "¿La IA sustituye por completo a las personas?",
      a: "No. Usamos un sistema híbrido: la IA resuelve al instante lo frecuente y sencillo, y deriva a una persona en cuanto el caso lo requiere. Nunca pierdes el trato humano donde importa.",
    },
    {
      q: "¿Qué pasa con la protección de datos?",
      a: "Todo el tratamiento de llamadas, mensajes y datos de tus clientes se gestiona conforme al RGPD, con los avisos legales correspondientes actualizados en tu web.",
    },
    {
      q: "¿Hay permanencia mínima?",
      a: "No. El modelo es de pago por uso: escalas o reduces el servicio según tu actividad, sin contratos de permanencia.",
    },
    {
      q: "¿Cuánto tarda en estar operativo?",
      a: "Tras la auditoría inicial, el sistema híbrido suele quedar activo en pocos días, sin interrumpir tu atención actual mientras se configura.",
    },
  ],
};

// Parámetros del cotizador de ahorro (llamadas/mes vs. teleoperadores humanos).
// Cifras orientativas de mercado — se muestran siempre con disclaimer en el propio componente.
export const COTIZADOR = {
  minLlamadas: 100,
  maxLlamadas: 5000,
  defaultLlamadas: 1200,
  stepLlamadas: 50,

  llamadasPorEmpleado: 600, // capacidad media: 30 llamadas/día × 20 días laborables
  costeEmpleadoMes: 2200, // €/mes — coste empresa totalmente cargado (SS, formación, rotación)
  costeLlamadaIA: 1.2, // €/llamada — tarifa híbrida IA + humano
  factorCobertura247Humano: 2.5, // turnos rotativos para cubrir noches, fines de semana y festivos
  factorCobertura247IA: 1.2, // +20% sobre la tarifa por llamada en cobertura 24/7
};
