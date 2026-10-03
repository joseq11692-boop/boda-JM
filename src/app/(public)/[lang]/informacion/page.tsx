import type { Metadata } from "next";
import { preguntas } from "@/config/boda";
import { Bloque, ListaDatos, Pagina } from "@/components/publico/pagina";
import { getWeddingSettings } from "@/lib/data";
import { resolveLocale } from "@/lib/locale";
import { textosWeb } from "@/lib/textos-web";
import { getWeddingDetails } from "@/lib/wedding-details";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return { title: textosWeb[locale].informacion.titulo };
}

export default async function InformacionPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = resolveLocale((await params).lang);
  const t = textosWeb[locale];
  const d = getWeddingDetails(locale);
  // Teléfono, email y hoteles salen de las variables de entorno (o de Ajustes
  // en modo demo): no se publican desde el código.
  const settings = await getWeddingSettings();

  const contacto = [
    ...(settings.contactPhone
      ? [{ etiqueta: t.informacion.telefono, valor: <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}>{settings.contactPhone}</a> }]
      : []),
    ...(settings.contactEmail
      ? [{ etiqueta: t.informacion.email, valor: <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a> }]
      : [])
  ];

  return (
    <Pagina titulo={t.informacion.titulo} intro={t.informacion.intro} locale={locale}>
      <ListaDatos
        items={[
          { etiqueta: t.inicio.fecha, valor: d.dateLabel },
          { etiqueta: t.inicio.ceremonia, valor: `${d.ceremonyTime} · ${d.ceremonyMapQuery ? d.ceremonyVenue : t.inicio.porConfirmar}` },
          { etiqueta: t.inicio.recepcion, valor: `${d.venueName} · ${d.venueLocation}` },
          {
            etiqueta: t.inicio.vestimenta,
            valor: (
              <>
                {d.dressCode}
                <span className="mt-1 block font-sans text-sm leading-6 text-muted-foreground">{d.dressCodeDetail}</span>
              </>
            )
          },
          { etiqueta: t.inicio.confirmarAntes, valor: d.rsvpDeadline }
        ]}
      />

      <Bloque titulo={t.informacion.preguntas}>
        <div className="divide-y divide-gold/25 border-y border-gold/40">
          {preguntas[locale].map((item) => (
            <details key={item.pregunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl [&::-webkit-details-marker]:hidden">
                {item.pregunta}
                <span
                  aria-hidden
                  className="text-2xl font-light leading-none text-gold-ink transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-10 leading-7 text-muted-foreground">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </Bloque>

      {settings.hotelSuggestions ? (
        <Bloque titulo={t.informacion.alojamiento}>
          <p className="whitespace-pre-line leading-7">{settings.hotelSuggestions}</p>
        </Bloque>
      ) : null}

      {contacto.length > 0 ? (
        <Bloque titulo={t.informacion.contacto}>
          <ListaDatos items={contacto} />
        </Bloque>
      ) : null}
    </Pagina>
  );
}
