import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { evento, nombresCompletos, nombresCortos, nombresPareja, pareja, textos } from "@/config/boda";
import { AddToCalendar } from "@/components/add-to-calendar";
import { Filete, Monograma, SelloLacre, Sobre } from "@/components/publico/adornos";
import { CuentaAtras } from "@/components/publico/cuenta-atras";
import { claseBotonDorado } from "@/components/publico/pagina";
import { resolveLocale } from "@/lib/locale";
import { rutaPublica, textosWeb } from "@/lib/textos-web";
import { getWeddingDetails } from "@/lib/wedding-details";

/** Datos estructurados del evento para buscadores (si la web es indexable). */
function EventJsonLd({ descripcion }: { descripcion: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${nombresPareja}`,
    startDate: evento.inicioIso,
    endDate: evento.finIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: descripcion,
    location: {
      "@type": "Place",
      name: evento.lugar.nombre,
      address: { "@type": "PostalAddress", addressLocality: evento.lugar.ciudad, addressCountry: evento.lugar.pais }
    },
    organizer: [
      { "@type": "Person", name: pareja.uno },
      { "@type": "Person", name: pareja.dos }
    ]
  };

  return (
    <script
      type="application/ld+json"
      // JSON serializado en el servidor a partir de la configuración (sin datos del usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as CSSProperties;

/** "27.02.2027" a partir de la fecha ISO de la boda. */
function fechaConPuntos(iso: string) {
  const [anio, mes, dia] = iso.slice(0, 10).split("-");
  return `${dia}.${mes}.${anio}`;
}

export default async function Inicio({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ estado?: string }>;
}) {
  const { lang } = await params;
  const { estado } = await searchParams;
  const locale = resolveLocale(lang);
  const d = getWeddingDetails(locale);
  const t = textosWeb[locale];
  const texto = textos[locale];

  return (
    <main id="main" lang={locale}>
      <EventJsonLd descripcion={texto.descripcionSeo} />

      {/* ─── Portada: foto con los nombres en caligrafía, enmarcada en vino ─── */}
      <section className="bg-[hsl(var(--night-deep))] px-3 pt-0 sm:px-4">
        <div className="relative isolate flex aspect-[4/3] min-h-[22rem] w-full flex-col items-center justify-center overflow-hidden text-center text-white sm:aspect-[2/1.05]">
          <Image src="/fotos/portada.jpg" alt="" fill priority sizes="(max-width: 640px) 100vw, 640px" className="-z-20 object-cover" />
          <span aria-hidden className="absolute inset-0 -z-10 bg-black/25" />

          {estado === "en-preparacion" ? (
            <p role="status" className="mx-4 mb-4 rounded-md bg-black/50 px-4 py-2 text-sm">
              {t.inicio.preparacion}
            </p>
          ) : null}

          {/* El h1 lleva los nombres completos; la caligrafía es la versión visual. */}
          <h1 className="sr-only">
            {pareja.uno} &amp; {pareja.dos}
          </h1>
          <p aria-hidden className="aparecer font-script leading-[0.8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
            <span className="block -translate-x-[18%] -rotate-[8deg] text-[clamp(4rem,15vw,5.75rem)]">{nombresCortos.uno}</span>
            <span className="block translate-x-[12%] -rotate-[8deg] text-[clamp(4rem,15vw,5.75rem)]">
              <span className="text-[0.75em]">&amp;</span>
              {nombresCortos.dos}
            </span>
          </p>
          <Filete className="aparecer mt-3 text-white/85" />
          <p className="aparecer mt-8 text-[0.68rem] uppercase tracking-[0.24em] text-white/90" style={retraso(200)}>
            {d.dateShort}
          </p>
        </div>
      </section>

      {/* ─── ¡nos casamos! ─── */}
      <section className="cielo-noche px-6 pb-16 pt-14 text-center sm:px-14">
        <h2 className="font-display text-[1.65rem]">{t.inicio.nosCasamos}</h2>
        <p className="mx-auto mt-6 max-w-md text-[0.9rem] leading-7 text-night-muted">{texto.bienvenida}</p>
        <p className="mx-auto mt-5 max-w-md text-[0.9rem] leading-7 text-night-muted">
          {nombresCompletos.uno} &amp; {nombresCompletos.dos}
        </p>
        <Monograma tamano={46} className="mt-10 text-night-muted" />
        <div className="mt-8">
          <CuentaAtras fechaIso={d.eventDateTimeIso} locale={locale} />
        </div>
      </section>

      {/* ─── Detalles ─── */}
      <section aria-labelledby="detalles" className="px-5 pb-14 pt-14 text-center sm:px-8">
        <h2 id="detalles" className="font-display text-[1.65rem] text-primary">
          {t.inicio.detalles}
        </h2>
        <dl className="mt-10 grid gap-10 text-gold-ink min-[480px]:grid-cols-3 min-[480px]:gap-4">
          <div>
            <dt className="font-display text-[1.35rem]">{t.inicio.elGranDia}</dt>
            <dd className="mt-4 text-[1.05rem]">{fechaConPuntos(evento.inicioIso)}</dd>
            <dd className="mt-5 text-[1.05rem] uppercase">{d.ceremonyTime.replace(" p. m.", " PM").replace(" a. m.", " AM")}</dd>
          </div>
          <div>
            <dt className="font-display text-[1.35rem]">{t.inicio.laCeremonia}</dt>
            <dd className="mt-4 text-[1.05rem] leading-snug">{d.ceremonyMapQuery ? d.ceremonyVenue : t.inicio.porConfirmar}</dd>
          </div>
          <div>
            <dt className="font-display text-[1.35rem]">{t.inicio.laFiesta}</dt>
            <dd className="mt-4 text-[1.05rem] leading-snug">
              {d.venueHall}
              <br />
              {d.venueName}
              <br />
              {d.venueLocation}
            </dd>
          </div>
        </dl>
        <Filete className="mt-10 text-gold-ink" />
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href={rutaPublica(locale, "mapa")} className="text-primary underline decoration-gold underline-offset-4 hover:decoration-primary">
            {t.inicio.verMapa}
          </Link>
          <Link href={rutaPublica(locale, "agenda")} className="text-primary underline decoration-gold underline-offset-4 hover:decoration-primary">
            {t.menu.agenda}
          </Link>
        </div>
      </section>

      {/* ─── Confirma tu asistencia: el sobre con el sello ─── */}
      <Sobre className="flex flex-col items-center px-6 pb-12 pt-14 text-center">
        <h2 className="font-display text-[1.75rem] text-[#e4e2cf]">{t.inicio.confirmaTitulo}</h2>
        <SelloLacre className="mt-8 w-44 sm:w-52" />
        <Link href={rutaPublica(locale, "rsvp")} className={`mt-8 ${claseBotonDorado} h-9 px-4`}>
          {t.inicio.clickAqui}
        </Link>
        <p className="mt-4 text-xs text-[#d9d7c0]">{t.inicio.nosAcompanasTexto(d.rsvpDeadline)}</p>
      </Sobre>

      {/* ─── Banda oliva: vestimenta y calendario ─── */}
      <section className="banda-oliva px-6 pb-16 pt-14 text-center sm:px-14">
        <h2 className="font-display text-[1.65rem]">{t.inicio.vestimentaTitulo}</h2>
        <p className="mt-5 text-lg">{d.dressCode}</p>
        <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-7 opacity-85">{d.dressCodeDetail}</p>
        <Monograma tamano={46} className="mt-10 opacity-80" />
        <div className="mt-8 flex justify-center text-center text-olive-foreground [&>p]:justify-center [&_a]:text-olive-foreground [&_button]:text-olive-foreground [&_span]:text-olive-foreground/80">
          <AddToCalendar
            title={nombresPareja}
            description={d.calendarDescription}
            location={`${d.venueName}, ${d.venueMapQuery}`}
            startIso={d.eventDateTimeIso}
            endIso={d.eventEndIso}
            locale={locale}
          />
        </div>
      </section>

      {/* ─── ¡Te esperamos! ─── */}
      <section className="relative isolate flex aspect-[2.3/1] min-h-[15rem] w-full items-start justify-center overflow-hidden pt-[9%]">
        <Image src="/fotos/final.jpg" alt="" fill sizes="(max-width: 640px) 100vw, 640px" className="-z-20 object-cover" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-transparent" />
        <p className="font-display text-[1.9rem] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">{t.inicio.teEsperamos}</p>
      </section>
    </main>
  );
}
