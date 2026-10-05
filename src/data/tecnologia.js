// Contenido de /soluciones/tecnologia, del resumen "Tecnología propia" de la
// home y del bloque reutilizable "Así se configura" (página de tecnología,
// home y Atención 24/7). Mismo patrón que el resto de src/data/*.js.

export const TECNOLOGIA = {
  seo: {
    title: "Tecnología propia para la atención al cliente de tu empresa | Llamada Atendida",
    description:
      "Tecnología propia que se adapta a tu negocio: saludos y horarios personalizados, música de espera, servidores de reserva y copias de seguridad. Activación en menos de 24 horas.",
  },

  hero: {
    eyebrow: "Tecnología propia",
    title: "Tecnología propia que se adapta a tu negocio",
    subtitle: "Al tener tecnología propia, podemos cubrir cualquier necesidad de atención al cliente de tu empresa.",
    chip: "Activación en menos de 24 horas",
  },

  adaptacion: {
    eyebrow: "Personalización",
    title: "Nos adaptamos a cualquier necesidad",
    items: [
      {
        title: "Saludos personalizados",
        text: "Aplicamos el saludo que nos indiques en las instrucciones. Respondemos como si fuéramos parte de tu empresa.",
        icon: "mic",
      },
      {
        title: "Horarios a tu medida",
        text: "Segmentamos tu atención al cliente en el horario que establezcas.",
        icon: "clock",
      },
      {
        title: "Música de espera",
        text: "La personalizamos o aplicamos una por defecto.",
        icon: "music",
      },
      {
        title: "Activación ultraligera",
        text: "Podemos configurar un servicio en menos de 24 horas.",
        icon: "bolt",
      },
    ],
  },

  disponibilidad: {
    eyebrow: "Fiabilidad",
    title: "Disponibilidad del servicio",
    subtitle: "Servicios siempre monitorizados",
    items: [
      {
        title: "Servidores activos",
        text: "Mantenemos servidores de reserva listos para activarse según la demanda.",
        icon: "server",
      },
      {
        title: "Canales de voz",
        text: "Dejamos canales libres para que la saturación de líneas nunca provoque llamadas perdidas.",
        icon: "phone",
      },
      {
        title: "Copia de seguridad",
        text: "Cuidamos la seguridad de los datos con los que trabajamos mediante copias de seguridad.",
        icon: "database",
      },
      {
        title: "Agentes libres",
        text: "Dimensionamos los equipos para que haya siempre disponibilidad y no se pierdan llamadas.",
        icon: "user-check",
      },
    ],
  },

  ctaFinal: {
    eyebrow: "Sin compromiso",
    title: "Cuéntanos qué necesita tu empresa y lo configuramos.",
    subtitle: "Te respondemos en menos de 24 horas.",
  },

  // Resumen breve para la home.
  resumenHome: {
    eyebrow: "Tecnología propia",
    title: "Tecnología propia que se adapta a tu negocio",
    subtitle: "Al tener tecnología propia, podemos cubrir cualquier necesidad de atención al cliente de tu empresa.",
    puntos: [
      { title: "Saludos personalizados", text: "Respondemos como si fuéramos parte de tu empresa.", icon: "mic" },
      { title: "Horarios a tu medida", text: "Segmentamos tu atención al cliente en el horario que establezcas.", icon: "clock" },
      { title: "Música de espera", text: "La personalizamos o aplicamos una por defecto.", icon: "music" },
      { title: "Activación en menos de 24 horas", text: "Podemos configurar un servicio en menos de 24 horas.", icon: "bolt" },
    ],
    cta: "Conocer nuestra tecnología",
    href: "/soluciones/tecnologia",
  },
};

export const ASI_SE_CONFIGURA = {
  eyebrow: "Puesta en marcha",
  title: "Así se configura",
  href: "/soluciones/tecnologia#asi-se-configura",
  ctaCompacto: "Ver la configuración completa",

  pasos: [
    {
      n: "1",
      title: "Número gratis",
      text: "Te asignamos un número de teléfono gratis. Puedes elegir cualquier prefijo de España y usarlo directamente, sin aplicar ningún desvío.",
      icon: "phone",
    },
    {
      n: "2",
      title: "Área privada",
      text: "Recibes por email tus datos de acceso a tu área privada, desde la que gestionas tus servicios contratados, tus agentes y tus llamadas.",
      icon: "lock",
    },
    {
      n: "3",
      title: "Instrucciones",
      text: "Indícanos en tu área privada cómo quieres que se comporten los agentes, tanto los de IA como los humanos: saludo, gestión de cada tipo de llamada y los datos a recoger, uso de tus herramientas o CRM si lo necesitas, y despedida.",
      icon: "clipboard-list",
    },
    {
      n: "4",
      title: "Desvío",
      text: "Si prefieres mantener tu número, te guiamos para desviar tu teléfono al nuestro, fijo o móvil.",
      icon: "phone-forward",
    },
  ],

  desvios: {
    title: "Desvíos de llamadas",
    text: "Aplica el desvío que más te interese para que atendamos a tus clientes cuando lo necesites.",
    items: [
      { label: "Desvío total", icon: "phone-forward" },
      { label: "Solo si estás ocupado", icon: "phone" },
      { label: "Cuando está apagado", icon: "smartphone" },
      { label: "Si estás en llamada", icon: "exchange" },
    ],
  },

  areaPrivada: {
    title: "Tu área privada",
    items: [
      "Ver todos los eventos que gestionamos",
      "Descargar los detalles de las facturas",
      "Activar nuevos servicios para la omnicanalidad",
      "Agregar o modificar tus instrucciones",
      "Chat de soporte con nuestro equipo y acceso a preguntas frecuentes",
    ],
    cta: "Acceder al área privada",
  },
};
