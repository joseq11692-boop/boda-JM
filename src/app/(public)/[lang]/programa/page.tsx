import type { Metadata } from "next";
import { nombresPareja, programa } from "@/config/boda";
import { AddToCalendar } from "@/components/add-to-calendar";
import { Pagina } from "@/components/publico/pagina";
import { resolveLocale } from "@/lib/locale";
import { getTimelineEvents } from "@/lib/data";
import { textosWeb } from "@/lib/textos-web";
import { formatHora, getWeddingDetails } from "@/lib/wedding-details";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return { title: textosWeb[locale].agenda.titulo };
}

/** Minutos desde el inicio del día; la madrugada (00–04) cuenta como noche siguiente. */
function minutosDelDia(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  return ((h < 5 ? h + 24 : h) * 60) + (m || 0);
}

export default async function AgendaPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = resolveLocale((await params).lang);
  const t = textosWeb[locale];
  const d = getWeddingDetails(locale);
  // Programa fijo de la configuración + los momentos que se añadan desde el
  // panel (Cronograma), ordenados por hora.
  const eventos = await getTimelineEvents();
  const momentos = [
    ...programa[locale],
    ...eventos.map((evento) => ({
      hora: evento.hora,
      titulo: (locale === "ca" && evento.titulo_ca) || evento.titulo,
      texto: (locale === "ca" && evento.descripcion_ca) || evento.descripcion || ""
    }))
  ].sort((a, b) => minutosDelDia(a.hora) - minutosDelDia(b.hora));

  return (
    <Pagina
      titulo={t.agenda.titulo}
      antetitulo={d.dateLabel}
      intro={t.agenda.intro}
      locale={locale}
    >
      <ol className="relative mx-auto max-w-xl">
        <span aria-hidden className="absolute bottom-3 left-[5.5rem] top-3 w-px bg-gold/40 sm:left-[7.5rem]" />
        {momentos.map((momento) => (
          <li
            key={`${momento.hora}-${momento.titulo}`}
            className="relative grid grid-cols-[5.5rem_1fr] gap-x-8 pb-12 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-x-10"
          >
            <span className="eyebrow pt-2 text-right text-[0.65rem] text-gold-ink sm:text-xs">{formatHora(momento.hora)}</span>
            <span
              aria-hidden
              className="absolute left-[5.5rem] top-3 size-2.5 -translate-x-1/2 rotate-45 border border-gold bg-background sm:left-[7.5rem]"
            />
            <div>
              <p className="font-display text-3xl font-light">{momento.titulo}</p>
              {momento.texto ? <p className="mt-2 leading-7 text-muted-foreground">{momento.texto}</p> : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-center border-t border-gold/30 pt-10 text-center [&>p]:justify-center">
        <AddToCalendar
          title={nombresPareja}
          description={d.calendarDescription}
          location={`${d.venueName}, ${d.venueMapQuery}`}
          startIso={d.eventDateTimeIso}
          endIso={d.eventEndIso}
          locale={locale}
        />
      </div>
    </Pagina>
  );
}
