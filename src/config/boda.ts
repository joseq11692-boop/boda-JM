/**
 * ════════════════════════════════════════════════════════════════════════
 *  DATOS DE LA BODA
 *
 *  Este es el archivo que hay que editar para que la web hable de vosotros:
 *  nombres, fecha, lugar, horario, transporte y textos. El resto de la app
 *  (web de invitados, panel, correos, QR, imágenes para redes) lee de aquí.
 *
 *  Los datos privados (IBAN, teléfono, email de contacto) NO van aquí:
 *  van en las variables de entorno (.env.local / Vercel). Ver .env.example.
 * ════════════════════════════════════════════════════════════════════════
 */

/** Idiomas que existen en el código. */
export type WeddingLocale = "es" | "ca";

/**
 * Idiomas que se publican, en orden (el primero es el principal). Con un solo
 * idioma no aparece selector. Para publicar también en catalán: `["es", "ca"]`
 * (los textos en catalán ya están escritos en este archivo y en textos-web.ts).
 */
export const idiomas: readonly WeddingLocale[] = ["es"];

// ─── La pareja ───────────────────────────────────────────────────────────

export const pareja = {
  uno: "Jose Alberto",
  dos: "María Alejandra"
} as const;

/** Nombres completos, para el texto de la invitación. */
export const nombresCompletos = {
  uno: "Jose Alberto Quil Lindo",
  dos: "María Alejandra García Martínez"
} as const;

/** "Jose Alberto & María Alejandra": cabeceras, título de la web, correos, QR. */
export const nombresPareja = `${pareja.uno} & ${pareja.dos}`;

/** "Jose Alberto y María Alejandra" / "Jose Alberto i María Alejandra": para frases. */
export const nombresParejaEnFrase: Record<WeddingLocale, string> = {
  es: `${pareja.uno} y ${pareja.dos}`,
  ca: `${pareja.uno} i ${pareja.dos}`
};

/** Iniciales para el favicon, la pantalla de carga y similares. */
export const iniciales = `${pareja.uno.charAt(0)}&${pareja.dos.charAt(0)}`;

// ─── Fecha y lugar ───────────────────────────────────────────────────────

export const evento = {
  /** Hora de inicio (la de la ceremonia), con zona horaria. */
  inicioIso: "2027-02-27T19:00:00-05:00",
  /** Fin aproximado de la fiesta (para el calendario). */
  finIso: "2027-02-28T02:00:00-05:00",
  /** Último día para confirmar asistencia. */
  rsvpLimiteIso: "2027-02-01T23:59:59-05:00",
  /** Zona horaria en la que se muestran las fechas. */
  zonaHoraria: "America/Panama",
  /** Lugar de la recepción (la fiesta). */
  lugar: {
    nombre: "The Westin Panama",
    ciudad: "Costa del Este, Panamá",
    /** Dirección que se busca en Google Maps / Apple Maps / Waze. */
    direccionMapa: "The Westin Panama, Costa del Este, Panamá",
    /** Código de país para los datos estructurados de buscadores. */
    pais: "PA"
  }
} as const;

/**
 * Iglesia de la ceremonia. Mientras `direccionMapa` sea null, la web la
 * muestra como "por confirmar" y no enseña mapa.
 */
export const ceremonia: { nombre: string; direccionMapa: string | null } = {
  nombre: "Iglesia por confirmar",
  direccionMapa: null
};

/**
 * Moneda del presupuesto, proveedores y catering del panel. En Panamá se usa
 * el dólar; con "es-US" las cifras salen como $12,345.
 */
export const moneda = { codigo: "USD", formato: "es-US" } as const;

/** Horario del día (formato HH:MM, 24 h; la web lo muestra como 7:00 p. m.). */
export const horario = {
  ceremonia: "19:00",
  /** Aproximada: depende de la distancia entre la iglesia y el hotel. */
  recepcion: "20:30"
} as const;

/**
 * Autobús para invitados. Si no vais a poner autobús, `activo: false`
 * esconde el bloque de transporte y la pregunta del RSVP.
 */
export const autobus = {
  activo: false,
  salida: "18:00",
  regresos: ["01:00"]
} as const;

// ─── Textos por idioma ───────────────────────────────────────────────────

type TextosIdioma = {
  /** Frase corta encima de los nombres. */
  antetitulo: string;
  /** Párrafo de bienvenida de la portada. */
  bienvenida: string;
  /** Descripción para Google y al compartir el enlace. */
  descripcionSeo: string;
  /** Ciudad de la boda, para portada, pie e imagen al compartir. */
  ciudad: string;
  lugarDescripcion: string;
  transporteTitulo: string;
  transporteTexto: string;
  paradaAutobus: string;
  paradaAutobusDetalle: string;
  vestimenta: string;
  /** Explicación del código de vestimenta. */
  vestimentaDetalle: string;
  notaRsvp: string;
  /** Firma de los correos y mensajes. */
  firma: string;
};

export const textos: Record<WeddingLocale, TextosIdioma> = {
  es: {
    antetitulo: "Nos casamos",
    bienvenida:
      "Con la bendición de Dios y el cariño de nuestras familias, tenemos el honor de invitarte a celebrar nuestro matrimonio. Será una noche para recordar, y no la imaginamos sin ti.",
    descripcionSeo: `Boda de ${nombresParejaEnFrase.es} · 27 de febrero de 2027 · Ciudad de Panamá. Información del día y confirmación de asistencia.`,
    ciudad: "Ciudad de Panamá",
    lugarDescripcion:
      "Frente a la bahía de Panamá, en Costa del Este: el escenario de nuestra recepción, con la ciudad iluminada de fondo.",
    transporteTitulo: "Transporte para invitados",
    transporteTexto: `Salida a las ${autobus.salida}. Regreso a las ${autobus.regresos.join(" y ")}.`,
    paradaAutobus: "Punto de recogida por confirmar",
    paradaAutobusDetalle: "El transporte vuelve al mismo punto.",
    vestimenta: "Formal",
    vestimentaDetalle:
      "Caballeros: traje oscuro y corbata. Damas: vestido largo o de cóctel elegante. Reservamos el blanco para la novia.",
    notaRsvp: "Guarda tu enlace personal: sirve para responder y para cambiar la respuesta.",
    firma: `Con cariño, ${nombresParejaEnFrase.es}`
  },
  ca: {
    antetitulo: "Ens casem",
    bienvenida:
      "Amb la benedicció de Déu i l'estima de les nostres famílies, tenim l'honor de convidar-te a celebrar el nostre casament.",
    descripcionSeo: `Casament de ${nombresParejaEnFrase.ca} · 27 de febrer de 2027 · Ciutat de Panamà.`,
    ciudad: "Ciutat de Panamà",
    lugarDescripcion: "Davant la badia de Panamà, a Costa del Este.",
    transporteTitulo: "Transport per als convidats",
    transporteTexto: `Sortida a les ${autobus.salida}. Tornada a les ${autobus.regresos.join(" i ")}.`,
    paradaAutobus: "Punt de recollida per confirmar",
    paradaAutobusDetalle: "El transport torna al mateix punt.",
    vestimenta: "Formal",
    vestimentaDetalle: "Cavallers: vestit fosc i corbata. Dames: vestit llarg o de còctel elegant.",
    notaRsvp: "Guarda el teu enllaç personal: serveix per respondre i per canviar la resposta.",
    firma: `Amb estima, ${nombresParejaEnFrase.ca}`
  }
};

/** Programa del día que sale en /programa. */
export const programa: Record<WeddingLocale, Array<{ hora: string; titulo: string; texto: string }>> = {
  es: [
    {
      hora: horario.ceremonia,
      titulo: "Ceremonia religiosa",
      texto: "Nos daremos el sí en la iglesia. Te confirmaremos el lugar muy pronto."
    },
    {
      hora: horario.recepcion,
      titulo: "Recepción y fiesta",
      texto: `Cóctel de bienvenida, cena, brindis y baile hasta la madrugada en ${evento.lugar.nombre}, ${evento.lugar.ciudad}.`
    }
  ],
  ca: [
    { hora: horario.ceremonia, titulo: "Cerimònia religiosa", texto: "Us confirmarem l'església molt aviat." },
    {
      hora: horario.recepcion,
      titulo: "Recepció i festa",
      texto: `Còctel, sopar i ball fins a la matinada a ${evento.lugar.nombre}.`
    }
  ]
};

/** Preguntas frecuentes de /informacion. Añade o quita las que quieras. */
export const preguntas: Record<WeddingLocale, Array<{ pregunta: string; respuesta: string }>> = {
  es: [
    {
      pregunta: "¿Cuál es el código de vestimenta?",
      respuesta:
        "Formal. Caballeros: traje oscuro y corbata. Damas: vestido largo o de cóctel elegante. Con cariño, te pedimos reservar el blanco y el marfil para la novia."
    },
    {
      pregunta: "¿Dónde será la ceremonia?",
      respuesta:
        "En una iglesia de la Ciudad de Panamá que confirmaremos muy pronto. Actualizaremos esta web y te avisaremos en cuanto la tengamos."
    },
    {
      pregunta: "¿Puedo llevar acompañante o niños?",
      respuesta:
        "Hemos preparado cada detalle pensando en nuestros invitados: tu invitación indica el nombre de cada persona invitada. Si tienes cualquier duda, escríbenos."
    },
    {
      pregunta: "¿Hasta cuándo puedo confirmar?",
      respuesta:
        "Hasta el 1 de febrero de 2027. Puedes hacerlo con el código o el QR de tu invitación, y cambiar la respuesta después si lo necesitas."
    },
    {
      pregunta: "¿Hay estacionamiento?",
      respuesta:
        "Sí, el hotel cuenta con estacionamiento para los invitados. Si vas a brindar, te recomendamos llegar en taxi o con conductor."
    },
    {
      pregunta: "Vengo de fuera de la ciudad, ¿dónde me hospedo?",
      respuesta:
        "Lo más cómodo es quedarse en el propio hotel de la recepción, en Costa del Este, a unos 20 minutos del aeropuerto de Tocumen."
    },
    {
      pregunta: "¿Qué clima hará?",
      respuesta:
        "Febrero es temporada seca en Panamá: una noche cálida, de unos 25 °C. Los salones tendrán aire acondicionado, así que un chal o una chaqueta ligera pueden venir bien."
    }
  ],
  ca: [
    {
      pregunta: "Quin és el codi de vestimenta?",
      respuesta: "Formal. Vestit fosc i corbata; vestit llarg o de còctel elegant."
    },
    {
      pregunta: "Fins quan puc confirmar?",
      respuesta: "Fins a l'1 de febrer de 2027, amb el codi o el QR de la teva invitació."
    }
  ]
};

// ─── Panel privado ───────────────────────────────────────────────────────

/**
 * Quién se encarga de cada tarea. La base de datos guarda la clave
 * (uno / dos / ambos); aquí decides cómo se muestra.
 */
export const responsables = {
  uno: pareja.uno,
  dos: pareja.dos,
  ambos: "Ambos"
} as const;

export type Responsable = keyof typeof responsables;

export const RESPONSABLES = Object.keys(responsables) as Responsable[];

/** Nombre a mostrar para la clave guardada en la base de datos. */
export function etiquetaResponsable(valor: string) {
  return (responsables as Record<string, string>)[valor] ?? valor;
}

/**
 * A quién avisar si el acceso al panel falla (aparece en los mensajes de
 * error del login). Suele ser quien ha montado la web.
 */
export const contactoTecnico = pareja.uno;

// ─── Mensajes que se envían desde el panel ───────────────────────────────

/**
 * Textos de WhatsApp y correo. Huecos que se rellenan solos:
 *   {nombre} invitado · {enlace} su enlace personal · {pareja} · {fecha} · {lugar}
 * Escríbelos a vuestra manera: estos son solo un punto de partida.
 */
export const mensajes = {
  /** Botón de WhatsApp en la ficha y en la lista de invitados. */
  whatsappInvitacion:
    "¡Hola, {nombre}! Te invitamos a la boda de {pareja}: {fecha}, en {lugar}. Cuando puedas, cuéntanos si vienes desde aquí: {enlace}",
  /** Un único mensaje para todo un grupo (familia, pareja...). {enlace} es la lista de enlaces. */
  whatsappGrupo: "¡Hola, {nombre}! Estáis invitados a la boda de {pareja}. Cada uno tiene su enlace para responder:\n{enlace}",
  /** Recordatorio para quien aún no ha contestado. */
  whatsappRecordatorio: "{nombre}, ¿te llegó la invitación a la boda de {pareja}? Nos viene genial saber si vienes: {enlace}",
  /** Envíos masivos desde Invitados > Enviar invitaciones (se pueden editar en pantalla). */
  envios: {
    pendientes: {
      asunto: "{pareja} se casan el {fecha}",
      whatsapp: "¡Hola, {nombre}! Te invitamos a la boda de {pareja}: {fecha}, en {lugar}. Responde aquí: {enlace}",
      email:
        "Hola, {nombre}:\n\nNos casamos el {fecha} en {lugar} y nos encantaría que vinieras.\n\nPuedes responder (y cambiar la respuesta cuando quieras) en tu enlace:\n{enlace}\n\n{firma}"
    },
    sinAbrir: {
      asunto: "Tu invitación a la boda de {pareja}",
      whatsapp: "{nombre}, te reenviamos la invitación a la boda de {pareja} por si se perdió: {enlace}",
      email: "Hola, {nombre}:\n\nTe reenviamos la invitación a nuestra boda por si no te llegó:\n{enlace}\n\n{firma}"
    },
    abiertoSinResponder: {
      asunto: "¿Vienes a la boda de {pareja}?",
      whatsapp: "{nombre}, cuando tengas un momento, dinos si vienes a la boda: {enlace}",
      email:
        "Hola, {nombre}:\n\nAún nos falta tu respuesta. Con ella podemos cerrar mesas y menús:\n{enlace}\n\n{firma}"
    },
    confirmados: {
      asunto: "Detalles del día · {pareja}",
      whatsapp: "{nombre}, ¡gracias por confirmar! Aquí tienes toda la información del día: {enlace}",
      email: "Hola, {nombre}:\n\n¡Gracias por confirmar! Te recordamos lo principal:\n{detalles}\n\nTu enlace sigue activo:\n{enlace}\n\n{firma}"
    }
  },
  /** Correo de invitación individual (botón "Enviar por email" de la ficha). */
  correo: {
    asunto: "{pareja} se casan el {fecha}",
    saludo: "Hola, {nombre}:",
    texto: "Nos casamos y nos encantaría contar contigo. Puedes responder desde tu enlace personal:",
    boton: "Responder a la invitación",
    enlaceAlternativo: "Si el botón no funciona, abre esta dirección:",
    pie: "El enlace es solo tuyo y sirve también para cambiar la respuesta. Responde antes del {limite}."
  }
} as const;
