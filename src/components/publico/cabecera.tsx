import Link from "next/link";
import { Menu } from "lucide-react";
import { nombresPareja, type WeddingLocale } from "@/config/boda";
import { Monograma } from "@/components/publico/adornos";
import { SelectorIdioma } from "@/components/publico/selector-idioma";
import { menuPublico, rutaPublica, textosWeb } from "@/lib/textos-web";

/**
 * Cabecera de la web de invitados: una franja vino con el monograma, el
 * botón de confirmar y el menú plegado en un <details> (funciona sin
 * JavaScript). La columna es estrecha, así que el menú va plegado siempre.
 */
export function Cabecera({ locale }: { locale: WeddingLocale }) {
  const t = textosWeb[locale];

  return (
    <header className="cielo-noche sticky top-0 z-30 border-b border-night-foreground/10">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={rutaPublica(locale, "inicio")} aria-label={nombresPareja} className="text-night-muted hover:text-night-foreground">
          <Monograma tamano={34} />
        </Link>

        <div className="flex items-center gap-3">
          <SelectorIdioma locale={locale} etiqueta={t.idioma} />
          <Link
            href={rutaPublica(locale, "rsvp")}
            className="inline-flex h-9 items-center rounded-md bg-[#efeae2] px-4 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#474431] transition-colors hover:bg-white"
          >
            {t.menu.rsvp}
          </Link>
          <details className="relative">
            <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-night-foreground/30 [&::-webkit-details-marker]:hidden">
              <Menu className="size-4" aria-hidden />
              <span className="sr-only">{t.abrirMenu}</span>
            </summary>
            <nav
              aria-label={t.abrirMenu}
              className="absolute right-0 mt-3 grid w-60 gap-1 rounded-md bg-background p-2 text-foreground shadow-float"
            >
              {[...menuPublico, "rsvp" as const].map((seccion) => (
                <Link key={seccion} href={rutaPublica(locale, seccion)} className="rounded px-3 py-2.5 font-display text-lg hover:bg-muted">
                  {t.menu[seccion]}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
