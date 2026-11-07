import Link from "next/link";
import { nombresCortos, type WeddingLocale } from "@/config/boda";
import { Filete, Monograma } from "@/components/publico/adornos";
import { getWeddingDetails } from "@/lib/wedding-details";
import { menuPublico, rutaPublica, textosWeb } from "@/lib/textos-web";

export function Pie({ locale }: { locale: WeddingLocale }) {
  const t = textosWeb[locale];
  const d = getWeddingDetails(locale);

  return (
    <footer className="cielo-noche">
      <div className="flex flex-col items-center gap-5 px-4 py-14 text-center sm:px-6">
        <Monograma tamano={46} className="text-night-muted" />
        <p className="font-script text-4xl leading-tight">
          {nombresCortos.uno} &amp; {nombresCortos.dos}
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-night-muted">
          {d.dateShort} · {d.city}
        </p>
        <Filete className="text-night-muted" />
        <nav aria-label={t.pie} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {menuPublico.map((seccion) => (
            <Link key={seccion} href={rutaPublica(locale, seccion)} className="font-display text-base text-night-muted hover:text-night-foreground">
              {t.menu[seccion]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
