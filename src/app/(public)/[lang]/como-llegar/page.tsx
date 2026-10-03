import type { Metadata } from "next";
import { Bloque, ListaDatos, Pagina, claseBotonClaro } from "@/components/publico/pagina";
import { resolveLocale } from "@/lib/locale";
import { textosWeb } from "@/lib/textos-web";
import { getWeddingDetails } from "@/lib/wedding-details";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return { title: textosWeb[locale].mapa.titulo };
}

function enlacesMapa(direccion: string) {
  const query = encodeURIComponent(direccion);
  return [
    { nombre: "Google Maps", href: `https://www.google.com/maps/dir/?api=1&destination=${query}` },
    { nombre: "Waze", href: `https://www.waze.com/ul?q=${query}&navigate=yes` },
    { nombre: "Apple Maps", href: `https://maps.apple.com/?q=${query}` }
  ];
}

/** Mapa incrustado + botones para abrir la ruta en la app de cada uno. */
function Mapa({ direccion, abrirEn, titulo }: { direccion: string; abrirEn: string; titulo: string }) {
  return (
    <div className="space-y-5">
      <div className="border border-gold/40 p-2">
        <iframe
          title={titulo}
          src={`https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`}
          className="h-[340px] w-full grayscale-[35%] sepia-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow mr-2 text-[0.65rem] text-muted-foreground">{abrirEn}</span>
        {enlacesMapa(direccion).map((enlace) => (
          <a
            key={enlace.nombre}
            href={enlace.href}
            target="_blank"
            rel="noreferrer"
            className={`${claseBotonClaro} h-10 px-5`}
          >
            {enlace.nombre}
          </a>
        ))}
      </div>
    </div>
  );
}

export default async function MapaPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = resolveLocale((await params).lang);
  const t = textosWeb[locale];
  const d = getWeddingDetails(locale);

  return (
    <Pagina titulo={t.mapa.titulo} intro={t.mapa.intro} locale={locale}>
      <Bloque titulo={t.inicio.ceremonia}>
        <p className="eyebrow text-gold-ink">{d.ceremonyTime}</p>
        {d.ceremonyMapQuery ? (
          <>
            <p className="font-display text-2xl">{d.ceremonyVenue}</p>
            <Mapa
              direccion={d.ceremonyMapQuery}
              abrirEn={t.mapa.abrirEn}
              titulo={t.mapa.mapaDe(d.ceremonyVenue)}
            />
          </>
        ) : (
          <div className="border border-dashed border-gold/50 px-6 py-10 text-center">
            <p className="font-display text-2xl">{t.inicio.porConfirmar}</p>
            <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">{t.mapa.iglesiaPendiente}</p>
          </div>
        )}
      </Bloque>

      <Bloque titulo={t.inicio.recepcion}>
        <p className="eyebrow text-gold-ink">{t.inicio.aContinuacion}</p>
        <div>
          <p className="font-display text-2xl">{d.venueName}</p>
          <p className="mt-1 text-muted-foreground">{d.venueLocation}</p>
          <p className="mt-4 max-w-xl leading-7">{d.venueCopy}</p>
        </div>
        <Mapa direccion={d.venueMapQuery} abrirEn={t.mapa.abrirEn} titulo={t.mapa.mapaDe(d.venueName)} />
      </Bloque>

      {d.busEnabled ? (
        <Bloque titulo={d.transportLabel}>
          <ListaDatos
            items={[
              { etiqueta: t.mapa.parada, valor: d.busStopLabel },
              { etiqueta: t.mapa.salida, valor: d.busDeparture },
              { etiqueta: t.mapa.regresos, valor: d.busReturns.join(" · ") }
            ]}
          />
          <p className="text-sm text-muted-foreground">{d.busStopDetail}</p>
        </Bloque>
      ) : null}
    </Pagina>
  );
}
