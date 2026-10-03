import type { ReactNode } from "react";
import { Filete } from "@/components/publico/adornos";
import { cn } from "@/lib/utils";

/** Contenedor estándar de una página de invitados: título + contenido. */
export function Pagina({
  titulo,
  intro,
  antetitulo,
  locale,
  children,
  className
}: {
  titulo: string;
  intro?: string;
  /** Rótulo pequeño encima del título. */
  antetitulo?: string;
  locale: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main id="main" lang={locale} className={cn("mx-auto w-full max-w-3xl px-4 pt-16 sm:px-6 sm:pt-24", className)}>
      <header className="aparecer text-center">
        {antetitulo ? <p className="eyebrow mb-5 text-gold-ink">{antetitulo}</p> : null}
        <h1 className="font-display text-5xl font-light tracking-tight sm:text-6xl">{titulo}</h1>
        <Filete className="mt-7" />
        {intro ? (
          <p className="mx-auto mt-7 max-w-xl font-display text-xl italic leading-relaxed text-muted-foreground sm:text-2xl">
            {intro}
          </p>
        ) : null}
      </header>
      <div className="aparecer mt-14 space-y-14" style={{ "--retraso": "150ms" } as React.CSSProperties}>
        {children}
      </div>
    </main>
  );
}

/** Bloque con subtítulo dentro de una página. */
export function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="flex items-center gap-4 font-display text-3xl font-light">
        {titulo}
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
      </h2>
      {children}
    </section>
  );
}

/** Lista de pares etiqueta/valor (fecha, lugar, hora...). */
export function ListaDatos({ items }: { items: Array<{ etiqueta: string; valor: ReactNode }> }) {
  return (
    <dl className="divide-y divide-gold/20 border-y border-gold/40">
      {items.map((item) => (
        <div key={item.etiqueta} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:gap-6">
          <dt className="eyebrow text-[0.65rem] text-gold-ink">{item.etiqueta}</dt>
          <dd className="font-display text-xl">{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Botón-enlace de la web de invitados (versalitas, esquinas rectas). */
export const claseBoton =
  "eyebrow inline-flex h-12 items-center justify-center gap-2 border px-8 text-[0.68rem] transition-colors duration-300";
export const claseBotonOscuro = cn(claseBoton, "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary");
export const claseBotonClaro = cn(claseBoton, "border-gold-ink/60 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground");
export const claseBotonDorado = cn(claseBoton, "border-gold bg-gold text-night-deep hover:bg-transparent hover:text-gold");
