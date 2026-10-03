import type { CSSProperties } from "react";
import Link from "next/link";
import { evento, nombresCompletos, nombresPareja, pareja, textos } from "@/config/boda";
import { AddToCalendar } from "@/components/add-to-calendar";
import { Filete, Monograma, SkylineBahia } from "@/components/publico/adornos";
import { CuentaAtras } from "@/components/publico/cuenta-atras";
import { claseBotonClaro, claseBotonDorado } from "@/components/publico/pagina";
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
  const [diaSemana, ...restoFecha] = d.dateLabel.split(", ");

  const momentos = [
    {
      numero: "I",
      titulo: t.inicio.ceremonia,
      hora: d.ceremonyTime,
      lugar: d.ceremonyMapQuery ? d.ceremonyVenue : t.inicio.porConfirmar,
      detalle: d.ceremonyMapQuery ? d.ceremonyMapQuery : d.city
    },
    {
      numero: "II",
      titulo: t.inicio.recepcion,
      hora: t.inicio.aContinuacion,
      lugar: d.venueName,
      detalle: d.venueLocation
    }
  ];

  return (
    <main id="main" lang={locale}>
      <EventJsonLd descripcion={texto.descripcionSeo} />

      {/* ─── Portada nocturna ─── */}
      <section className="cielo-noche grano relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-10 pt-14 text-center sm:px-6">
          {estado === "en-preparacion" ? (
            <p role="status" className="mb-10 border border-gold/40 px-5 py-3 text-sm text-night-foreground">
              {t.inicio.preparacion}
            </p>
          ) : null}

          <Monograma tamano={96} className="aparecer" />

          <p className="eyebrow aparecer mt-10 text-gold" style={retraso(150)}>
            {texto.antetitulo}
          </p>

          <h1
            className="aparecer mt-6 font-display text-[clamp(2.9rem,9vw,6.75rem)] font-light leading-[0.95] tracking-tight"
            style={retraso(300)}
          >
            <span className="block">{pareja.uno}</span>{" "}
            <span className="my-2 block font-normal italic text-gold sm:my-3">&amp;</span>{" "}
            <span className="block">{pareja.dos}</span>
          </h1>

          <div className="aparecer mt-10 flex items-center gap-4 sm:gap-6" style={retraso(450)}>
            <span aria-hidden className="hidden h-px w-16 bg-gold/60 sm:block" />
            <p className="eyebrow text-night-foreground">
              {diaSemana}
              <span aria-hidden className="mx-3 text-gold">
                ·
              </span>
              <span className="sr-only">, </span>
              {restoFecha.join(", ")}
            </p>
            <span aria-hidden className="hidden h-px w-16 bg-gold/60 sm:block" />
          </div>
          <p className="aparecer mt-3 font-display text-lg italic text-night-muted" style={retraso(500)}>
            {d.city}
          </p>

          <div className="aparecer mt-12" style={retraso(650)}>
            <CuentaAtras fechaIso={d.eventDateTimeIso} locale={locale} />
          </div>

          <Link href={rutaPublica(locale, "rsvp")} className={`aparecer mt-12 ${claseBotonDorado}`} style={retraso(800)}>
            {t.inicio.confirmar}
          </Link>
        </div>

        <SkylineBahia className="h-32 sm:h-44" />
      </section>

      {/* ─── Invitación ─── */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <Filete />
        <h2 className="eyebrow mt-8 text-gold-ink">{t.inicio.invitacionTitulo}</h2>
        <p className="mt-8 font-display text-2xl font-light italic leading-relaxed sm:text-3xl sm:leading-relaxed">
          {texto.bienvenida}
        </p>
        <p className="mt-12 font-display text-xl tracking-wide sm:text-2xl">
          {nombresCompletos.uno}
          <span className="mx-3 block font-normal italic text-gold-ink sm:inline">&amp;</span>
          {nombresCompletos.dos}
        </p>
      </section>

      {/* ─── El gran día ─── */}
      <section aria-labelledby="gran-dia" className="border-y border-gold/30 bg-card">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 id="gran-dia" className="text-center font-display text-4xl font-light sm:text-5xl">
            {t.inicio.elGranDia}
          </h2>
          <p className="eyebrow mt-4 text-center text-gold-ink">{d.dateLabel}</p>

          <ol className="mt-16 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-gold/30">
            {momentos.map((momento) => (
              <li key={momento.numero} className="flex flex-col items-center px-6 text-center">
                <span aria-hidden className="font-display text-2xl italic text-gold-ink">
                  {momento.numero}
                </span>
                <h3 className="mt-4 font-display text-3xl font-light">{momento.titulo}</h3>
                <p className="eyebrow mt-5 text-gold-ink">{momento.hora}</p>
                <p className="mt-5 font-display text-2xl">{momento.lugar}</p>
                <p className="mt-1 text-sm text-muted-foreground">{momento.detalle}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex justify-center">
            <Link href={rutaPublica(locale, "mapa")} className={claseBotonClaro}>
              {t.inicio.verMapa}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Detalles ─── */}
      <section aria-labelledby="detalles" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <h2 id="detalles" className="sr-only">
          {t.inicio.detalles}
        </h2>
        <dl className="grid gap-12 text-center md:grid-cols-3">
          <div>
            <dt className="eyebrow text-gold-ink">{t.inicio.fecha}</dt>
            <dd className="mt-4 font-display text-2xl">{d.dateLabel}</dd>
            <dd className="mt-1 text-muted-foreground">{d.ceremonyTime}</dd>
          </div>
          <div>
            <dt className="eyebrow text-gold-ink">{t.inicio.vestimenta}</dt>
            <dd className="mt-4 font-display text-2xl">{d.dressCode}</dd>
            <dd className="mx-auto mt-2 max-w-xs text-[0.95rem] leading-7 text-muted-foreground">{d.dressCodeDetail}</dd>
          </div>
          <div>
            <dt className="eyebrow text-gold-ink">{t.inicio.confirmarAntes}</dt>
            <dd className="mt-4 font-display text-2xl">{d.rsvpDeadline}</dd>
          </div>
        </dl>
        <div className="mt-14 flex justify-center text-center [&>p]:justify-center">
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

      {/* ─── Confirmación ─── */}
      <section className="px-4 sm:px-6">
        <div className="cielo-noche grano mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
          <Monograma tamano={56} />
          <h2 className="mt-8 font-display text-4xl font-light sm:text-5xl">{t.inicio.nosAcompanas}</h2>
          <p className="mx-auto mt-5 max-w-md font-display text-xl italic text-night-muted">
            {t.inicio.nosAcompanasTexto(d.rsvpDeadline)}
          </p>
          <Link href={rutaPublica(locale, "rsvp")} className={`mt-10 ${claseBotonDorado}`}>
            {t.inicio.confirmar}
          </Link>
        </div>
      </section>

      <nav aria-label={t.inicio.masInfo} className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {(["agenda", "informacion", "regalo"] as const).map((seccion) => (
            <li key={seccion}>
              <Link href={rutaPublica(locale, seccion)} className="eyebrow enlace-dorado pb-1 text-gold-ink">
                {t.menu[seccion]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
