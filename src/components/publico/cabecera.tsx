import Link from "next/link";
import { Menu } from "lucide-react";
import { nombresPareja, type WeddingLocale } from "@/config/boda";
import { Monograma } from "@/components/publico/adornos";
import { SelectorIdioma } from "@/components/publico/selector-idioma";
import { menuPublico, rutaPublica, textosWeb } from "@/lib/textos-web";

/**
 * Cabecera de la web de invitados. En escritorio enseña el menú en línea; en
 * móvil lo pliega en un <details>, que funciona sin JavaScript.
 */
export function Cabecera({ locale }: { locale: WeddingLocale }) {
  const t = textosWeb[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-gold/25 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        <Link href={rutaPublica(locale, "inicio")} className="flex items-center gap-3" aria-label={nombresPareja}>
          <Monograma tamano={40} className="text-gold-ink" />
          <span className="hidden whitespace-nowrap font-display text-lg font-normal tracking-wide xl:inline">{nombresPareja}</span>
        </Link>

        <nav aria-label={t.abrirMenu} className="hidden items-center gap-5 md:flex lg:gap-7">
          {menuPublico.map((seccion) => (
            <Link
              key={seccion}
              href={rutaPublica(locale, seccion)}
              className="eyebrow enlace-dorado whitespace-nowrap pb-1 text-[0.68rem] text-foreground/80 hover:text-foreground"
            >
              {t.menu[seccion]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SelectorIdioma locale={locale} etiqueta={t.idioma} />
          <Link
            href={rutaPublica(locale, "rsvp")}
            className="eyebrow hidden h-10 items-center whitespace-nowrap border border-primary bg-primary px-5 text-[0.65rem] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary lg:inline-flex"
          >
            {t.menu.rsvp}
          </Link>
          <details className="relative md:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center border border-gold/50 text-gold-ink [&::-webkit-details-marker]:hidden">
              <Menu className="size-4" aria-hidden />
              <span className="sr-only">{t.abrirMenu}</span>
            </summary>
            <nav
              aria-label={t.abrirMenu}
              className="absolute right-0 mt-3 grid w-64 gap-1 border border-gold/30 bg-card p-3 shadow-float"
            >
              {[...menuPublico, "rsvp" as const].map((seccion) => (
                <Link
                  key={seccion}
                  href={rutaPublica(locale, seccion)}
                  className="eyebrow px-3 py-3 text-[0.68rem] hover:bg-muted"
                >
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
