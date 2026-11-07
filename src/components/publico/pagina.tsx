import type { CSSProperties, ReactNode } from "react";
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
    <main id="main" lang={locale} className={cn("w-full px-5 pb-20 pt-14 sm:px-10", className)}>
      <header className="aparecer text-center">
        {antetitulo ? <p className="mb-4 text-[0.7rem] uppercase tracking-[0.22em] text-gold-ink">{antetitulo}</p> : null}
        <h1 className="font-display text-[2.6rem] leading-tight text-primary">{titulo}</h1>
        <Filete className="mt-5 text-gold" />
        {intro ? <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">{intro}</p> : null}
      </header>
      <div className="aparecer mt-12 space-y-12" style={{ "--retraso": "150ms" } as CSSProperties}>
        {children}
      </div>
    </main>
  );
}

/** Bloque con subtítulo dentro de una página. */
export function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-center font-display text-[1.9rem] text-primary">{titulo}</h2>
      {children}
    </section>
  );
}

/** Lista de pares etiqueta/valor (fecha, lugar, hora...). */
export function ListaDatos({ items }: { items: Array<{ etiqueta: string; valor: ReactNode }> }) {
  return (
    <dl className="divide-y divide-gold/40 border-y border-gold/60">
      {items.map((item) => (
        <div key={item.etiqueta} className="grid gap-1 py-4 text-center">
          <dt className="font-display text-lg text-gold-ink">{item.etiqueta}</dt>
          <dd className="text-base">{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Botones-enlace de la web de invitados. */
export const claseBoton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300";
export const claseBotonOscuro = cn(claseBoton, "bg-primary text-primary-foreground hover:bg-primary/90");
export const claseBotonClaro = cn(claseBoton, "border border-gold-ink/50 text-gold-ink hover:border-primary hover:bg-primary hover:text-primary-foreground");
/** El botón marfil de la invitación ("CLICK AQUÍ"), para fondos vino u oliva. */
export const claseBotonDorado = cn(claseBoton, "bg-[#efeae2] text-[#474431] shadow-sm hover:bg-white");
