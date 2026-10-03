// Textos fijos de la web de invitados (menú, botones, títulos de página).
// Los datos de la boda (nombres, fecha, lugar...) viven en src/config/boda.ts.
import type { WeddingLocale } from "@/config/boda";

export type SeccionPublica = "inicio" | "agenda" | "informacion" | "mapa" | "regalo" | "rsvp";

/** Rutas de la web de invitados, sin el prefijo de idioma. */
export const rutasPublicas: Record<SeccionPublica, string> = {
  inicio: "",
  agenda: "/programa",
  informacion: "/informacion",
  mapa: "/como-llegar",
  regalo: "/regalo",
  rsvp: "/rsvp"
};

/** Orden del menú (rsvp va aparte, como botón). */
export const menuPublico: SeccionPublica[] = ["inicio", "agenda", "informacion", "mapa", "regalo"];

export function rutaPublica(locale: WeddingLocale, seccion: SeccionPublica) {
  return `/${locale}${rutasPublicas[seccion]}`;
}

type TextosWeb = {
  menu: Record<SeccionPublica, string>;
  abrirMenu: string;
  idioma: string;
  saltarContenido: string;
  inicio: {
    confirmar: string;
    loEsencial: string;
    fecha: string;
    lugar: string;
    hora: string;
    transporte: string;
    vestimenta: string;
    confirmarAntes: string;
    faltan: (dias: number) => string;
    hoy: string;
    masInfo: string;
    preparacion: string;
    ceremonia: string;
    recepcion: string;
    aContinuacion: string;
    porConfirmar: string;
    invitacionTitulo: string;
    elGranDia: string;
    detalles: string;
    nosAcompanas: string;
    nosAcompanasTexto: (fecha: string) => string;
    verMapa: string;
    unidades: { dias: string; horas: string; minutos: string; segundos: string };
    cuentaAtras: string;
  };
  agenda: { titulo: string; intro: string };
  informacion: {
    titulo: string;
    intro: string;
    preguntas: string;
    alojamiento: string;
    contacto: string;
    telefono: string;
    email: string;
  };
  mapa: {
    titulo: string;
    intro: string;
    iglesiaPendiente: string;
    abrirEn: string;
    mapaDe: (lugar: string) => string;
    parada: string;
    salida: string;
    regresos: string;
  };
  regalo: {
    titulo: string;
    intro: string;
    cuenta: string;
    titular: string;
    concepto: string;
    copiar: string;
    copiado: string;
    errorCopiar: string;
    errorCopiarDetalle: string;
    sinIban: string;
  };
  calendario: string;
  pie: string;
};

export const textosWeb: Record<WeddingLocale, TextosWeb> = {
  es: {
    menu: {
      inicio: "Inicio",
      agenda: "Programa",
      informacion: "Información",
      mapa: "Cómo llegar",
      regalo: "Regalo",
      rsvp: "Confirmar asistencia"
    },
    abrirMenu: "Menú",
    idioma: "Idioma",
    saltarContenido: "Saltar al contenido",
    inicio: {
      confirmar: "Confirmar asistencia",
      loEsencial: "Lo esencial",
      fecha: "Fecha",
      lugar: "Lugar",
      hora: "Hora",
      transporte: "Transporte",
      vestimenta: "Vestimenta",
      confirmarAntes: "Confirmar antes del",
      faltan: (dias) => (dias === 1 ? "Queda 1 día" : `Quedan ${dias} días`),
      hoy: "Hoy es el día",
      masInfo: "Más información",
      preparacion: "Todavía no se puede responder desde la web. Lo activaremos muy pronto.",
      ceremonia: "Ceremonia religiosa",
      recepcion: "Recepción",
      aContinuacion: "A continuación",
      porConfirmar: "Lugar por confirmar",
      invitacionTitulo: "Tenemos el honor de invitarte",
      elGranDia: "El gran día",
      detalles: "Detalles",
      nosAcompanas: "¿Nos acompañas?",
      nosAcompanasTexto: (fecha) => `Te agradeceremos confirmar tu asistencia antes del ${fecha}.`,
      verMapa: "Cómo llegar",
      unidades: { dias: "Días", horas: "Horas", minutos: "Minutos", segundos: "Segundos" },
      cuentaAtras: "Cuenta atrás para la boda"
    },
    agenda: { titulo: "Programa", intro: "Horario aproximado del día." },
    informacion: {
      titulo: "Información",
      intro: "Lo práctico para el día.",
      preguntas: "Preguntas frecuentes",
      alojamiento: "Alojamiento",
      contacto: "Contacto",
      telefono: "Teléfono",
      email: "Email"
    },
    mapa: {
      titulo: "Cómo llegar",
      intro: "La ceremonia será en la iglesia y la celebración continuará en el hotel.",
      iglesiaPendiente: "Estamos cerrando los últimos detalles. Publicaremos aquí la dirección en cuanto esté confirmada.",
      abrirEn: "Abrir en",
      mapaDe: (lugar) => `Mapa de ${lugar}`,
      parada: "Punto de recogida",
      salida: "Salida",
      regresos: "Regresos"
    },
    regalo: {
      titulo: "Regalo",
      intro: "Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, te lo agradeceremos de corazón.",
      cuenta: "Número de cuenta",
      titular: "Titular",
      concepto: "Concepto",
      copiar: "Copiar número de cuenta",
      copiado: "Copiado",
      errorCopiar: "No se pudo copiar",
      errorCopiarDetalle: "Cópialo a mano, por favor.",
      sinIban: "Durante la recepción habrá lluvia de sobres para quien desee dejarnos un detalle."
    },
    calendario: "Añadir al calendario",
    pie: "Web de boda"
  },
  ca: {
    menu: {
      inicio: "Inici",
      agenda: "Programa",
      informacion: "Informació",
      mapa: "Com arribar",
      regalo: "Regal",
      rsvp: "Confirmar assistència"
    },
    abrirMenu: "Menú",
    idioma: "Idioma",
    saltarContenido: "Saltar al contingut",
    inicio: {
      confirmar: "Confirmar assistència",
      loEsencial: "L'essencial",
      fecha: "Data",
      lugar: "Lloc",
      hora: "Hora",
      transporte: "Transport",
      vestimenta: "Vestimenta",
      confirmarAntes: "Confirmar abans del",
      faltan: (dias) => (dias === 1 ? "Queda 1 dia" : `Queden ${dias} dies`),
      hoy: "Avui és el dia",
      masInfo: "Més informació",
      preparacion: "Encara no es pot respondre des de la web. Ho activarem molt aviat.",
      ceremonia: "Cerimònia religiosa",
      recepcion: "Recepció",
      aContinuacion: "A continuació",
      porConfirmar: "Lloc per confirmar",
      invitacionTitulo: "Tenim l'honor de convidar-te",
      elGranDia: "El gran dia",
      detalles: "Detalls",
      nosAcompanas: "Ens acompanyes?",
      nosAcompanasTexto: (fecha) => `Et agrairem que confirmis la teva assistència abans del ${fecha}.`,
      verMapa: "Com arribar",
      unidades: { dias: "Dies", horas: "Hores", minutos: "Minuts", segundos: "Segons" },
      cuentaAtras: "Compte enrere per al casament"
    },
    agenda: { titulo: "Programa", intro: "Horari aproximat del dia." },
    informacion: {
      titulo: "Informació",
      intro: "El més pràctic per al dia.",
      preguntas: "Preguntes freqüents",
      alojamiento: "Allotjament",
      contacto: "Contacte",
      telefono: "Telèfon",
      email: "Email"
    },
    mapa: {
      titulo: "Com arribar",
      intro: "La cerimònia serà a l'església i la celebració continuarà a l'hotel.",
      iglesiaPendiente: "Publicarem aquí l'adreça tan aviat com estigui confirmada.",
      abrirEn: "Obrir a",
      mapaDe: (lugar) => `Mapa de ${lugar}`,
      parada: "Punt de recollida",
      salida: "Sortida",
      regresos: "Tornades"
    },
    regalo: {
      titulo: "Regal",
      intro: "El més important és que vinguis. Si ens vols fer un regal, aquí tens les dades.",
      cuenta: "Número de compte",
      titular: "Titular",
      concepto: "Concepte",
      copiar: "Copiar número de compte",
      copiado: "Copiat",
      errorCopiar: "No s'ha pogut copiar",
      errorCopiarDetalle: "Copia'l a mà, si us plau.",
      sinIban: "Les dades del compte encara no estan publicades."
    },
    calendario: "Afegir al calendari",
    pie: "Web de casament"
  }
};
